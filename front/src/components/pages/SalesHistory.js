import {useEffect, useState} from "react";

function SalesHistory() {
    const [salesHistoryList, setSalesHistoryList] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const loadSalesHistory = async () => {
            try {
                const apiBaseUri = process.env.REACT_APP_API_BASE_URI || '';
                const response = await fetch(`${apiBaseUri}/salesHistories?page=${currentPage}`);

                if (response.ok) {
                    const data = await response.json();
                    setSalesHistoryList(data.content);
                    setTotalPages(data.totalPages);
                } else {
                    const errorData = await response.text();
                    console.error('Error fetching data:', errorData);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        loadSalesHistory();
    }, [currentPage]);

    // ページ遷移
    const goToPage = (pageNumber) => {
        if (pageNumber >= 0 && pageNumber < totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div>
            {salesHistoryList ? (
                <div className="sales-history-list">
                    <h1>購買履歴</h1>
                    <ul className="sales-history-list_box">
                        {salesHistoryList.map(salesHistory => (
                            <li key={salesHistory.id} className="sales-history-item">
                                <h2>購買履歴 ID: {salesHistory.id}</h2>
                                <p><strong>購入日時:</strong> {salesHistory.dateTime}</p>
                                <p><strong>合計金額:</strong> ¥{salesHistory.total}</p>

                                <h4>購入アイテム:</h4>
                                <ul className="sales-history-item_box">
                                    {salesHistory.items.map(item => (
                                        <li key={item.id}>
                                            <p><strong>商品ID:</strong> {item.itemId}</p>
                                            <p><strong>単価:</strong> ¥{item.unitPrice}</p>
                                            <p><strong>数量:</strong> {item.quantity}</p>
                                            <p><strong>小計:</strong> ¥{item.subtotal}</p>
                                        </li>
                                    ))}
                                </ul>
                                <hr/>
                            </li>
                        ))}
                    </ul>
                    {salesHistoryList.length === 0 && <p className="not-found">データが存在しません</p>}

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
            ) : (
                <div className="loading"></div>
            )}
        </div>
    );
}

export default SalesHistory;
