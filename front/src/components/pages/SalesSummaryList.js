import {useEffect, useState} from "react";

const SalesSummaryList = () => {
    const [salesSummaryList, setSalesSummaryList] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedItemId, setSelectedItemId] = useState(''); // APIに送る商品ID
    const [items, setItems] = useState([]); // 商品リスト
    const [errorMessage, setErrorMessage] = useState(''); // エラーメッセージの状態
    const [filtered, setFiltered] = useState(false); // フィルターが適用されたかどうかの状態

    // 商品IDリストの取得
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const apiBaseUri = process.env.REACT_APP_API_BASE_URI || '';
                const response = await fetch(`${apiBaseUri}/items`);
                if (response.ok) {
                    const data = await response.json();
                    setItems(data.content); // 商品のリストを取得
                } else {
                    console.error('Error fetching items');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchItems();
    }, []);

    const loadSalesSummary = async () => {
        // 日付の順序チェック
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);

            if (start > end) {
                setErrorMessage("開始日が終了日よりも後になっています。日付を修正してください。");
                return; // 日付が逆順なのでリクエストを送らない
            }
        }

        // 商品IDが空または"all"の場合は日付の反映がされない
        if ((selectedItemId === "" || selectedItemId === "all") && (startDate || endDate)) {
            setErrorMessage("商品名の入力は必須です。");
            return;
        }

        try {
            const queryParams = new URLSearchParams();

            if (startDate) {
                queryParams.append('startDate', startDate);
            }

            if (endDate) {
                queryParams.append('endDate', endDate);
            }

            queryParams.append('page', currentPage);

            const apiBaseUri = process.env.REACT_APP_API_BASE_URI || '';
            let url = `${apiBaseUri}/salesSummaries?page=${currentPage}`;

            if (selectedItemId === "all") {
                // 全件照会
                url = `${apiBaseUri}/salesSummaries?${queryParams.toString()}`;
            } else if (selectedItemId) {
                // 商品ID指定で絞り込み
                url = `${apiBaseUri}/salesSummaries/${selectedItemId}?${queryParams.toString()}`;
            }

            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                setSalesSummaryList(data.content);
                setTotalPages(data.totalPages);
                setFiltered(true); // フィルターが適用されたことを記録
                setErrorMessage(""); // エラーメッセージをクリア
            } else {
                const errorData = await response.text();
                console.error('Error fetching data:', errorData);
                setErrorMessage("販売データの取得に失敗しました。");
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage("販売データの取得中にエラーが発生しました。");
        }
    };

    // 初回ロードで全件表示を行う
    useEffect(() => {
        if (!filtered) {
            loadSalesSummary();
        }
    }, [filtered]);

    useEffect(() => {
        loadSalesSummary();
    }, [currentPage]);

    const handleFilterSubmit = () => {
        setCurrentPage(0); // 絞り込み時に最初のページに戻す
        loadSalesSummary(); // フィルターを適用してデータを取得
    };

    const goToPage = (pageNumber) => {
        if (pageNumber >= 0 && pageNumber < totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="sales-summary-list">
            <h1 className="sales-summary-list_title">売上データ</h1>
            {/* 検索欄は常に表示 */}
            <div className="sales-summary-list_search">
                <div className="sales-summary-list_search_item">
                    <p className="sales-summary-list_search_item_title">商品名</p>
                    <select value={selectedItemId} onChange={(e) => setSelectedItemId(e.target.value)}>
                        <option value="all">全件照会</option>
                        {items
                            .filter(item => item.id) // item.id が存在する商品だけをフィルタリング
                            .map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="sales-summary-list_search_date">
                    <p>期間</p>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <p>～</p>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>

                <button className="sales-summary-list_search_button" onClick={handleFilterSubmit}>絞り込み</button>
            </div>

            {/* 商品情報がない場合のメッセージ表示 */}
            {salesSummaryList && salesSummaryList.length === 0 && !errorMessage && (
                <div className="no-data-message">該当する商品情報はありません。</div>
            )}

            {/* salesSummaryListが存在すれば表示 */}
            {salesSummaryList && salesSummaryList.length > 0 && !errorMessage ? (
                <div className="sales-summary-list_table-wrapper">
                    <table className="sales-summary-list_table">
                        <thead>
                        <tr className="sales-summary-list_table_title">
                            <th>商品名</th>
                            <th>価格</th>
                            <th>売上金額</th>
                            <th>売上数量</th>
                            <th>日付</th>
                        </tr>
                        </thead>
                        <tbody className="sales-summary-list_table-item">
                        {salesSummaryList.map((item) => (
                            <tr key={`${item.itemId}-${item.date}`}>
                                <td>{item.itemName}</td>
                                <td>¥{item.itemPrice}</td>
                                <td>¥{item.totalAmount}</td>
                                <td>{item.totalQuantity}</td>
                                <td>{item.date}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                salesSummaryList === null && <div className="loading"></div>
            )}

            {/* エラーメッセージがある場合に表示 */}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <div className="pagination">
                <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage <= 0}>
                    前のページ
                </button>
                <span>{currentPage + 1} / {totalPages}</span>
                <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage >= totalPages - 1}>
                    次のページ
                </button>
            </div>
        </div>
    );
};

export default SalesSummaryList;
