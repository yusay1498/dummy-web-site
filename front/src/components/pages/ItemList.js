import {useEffect, useState} from "react";

function ItemList() {
    const [itemList, setItemList] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const loadItems = async () => {
            try {
                const apiBaseUri = process.env.REACT_APP_API_BASE_URI || '';
                const response = await fetch(`${apiBaseUri}/items?page=${currentPage}`);
                if (response.ok) {
                    const data = await response.json();
                    setItemList(data.content);
                    setTotalPages(data.totalPages); // 総ページ数を更新
                } else {
                    const data = await response.text();
                    console.error(response.status, data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        loadItems();
    }, [currentPage]); // currentPageとpageSizeが変更されたときにデータを再取得

    // ページ変更
    const goToPage = (pageNumber) => {
        if (pageNumber >= 0 && pageNumber < totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div>
            {itemList ? (
                <div className="item-list">
                    <h1>商品一覧</h1>
                    <ul>
                        {itemList.map(item => (
                            // 商品名がない場合は何も表示しない
                            item.name ? (
                                <li key={item.id}>
                                    <h2>{item.name}</h2>
                                    {/* 価格がない場合は「価格が設定されていません」と表示 */}
                                    {item.price ? <p>価格: ¥{item.price}</p> : <p>価格が設定されていません</p>}
                                    {/* 販売価格がない場合は「販売価格が設定されていません」と表示 */}
                                    {item.sellPrice ? <p>販売価格: ¥{item.sellPrice}</p> :
                                        <p>販売価格が設定されていません</p>}
                                    <button>詳細を見る</button>
                                </li>
                            ) : null
                        ))}
                    </ul>
                    {itemList.length === 0 && <p className="not-found">データが存在しません</p>}

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

export default ItemList;