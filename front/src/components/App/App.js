import {useState} from "react";
import {BrowserRouter, Link, Navigate, Route, Routes} from "react-router-dom";
import ItemList from "../pages/ItemList";
import SalesHistory from "../pages/SalesHistory";
import SalesSummaryList from "../pages/SalesSummaryList";
import "../../assets/styles/main.scss";

function App() {
    const [menuShown, setMenuShown] = useState(false);

    const toggleMenu = () => {
        setMenuShown(!menuShown);
    };

    const closeMenu = () => {
        setMenuShown(false);
    };

    return (
        <BrowserRouter>
            <header className="header">
                <div className="ham" onClick={toggleMenu}>
                    <div className="ham_inner">
                        <span className={`ham_inner_line ham_inner_line_1 ${menuShown ? "linea" : ""}`}></span>
                        <span className={`ham_inner_line ham_inner_line_2 ${menuShown ? "lineb" : ""}`}></span>
                        <span className={`ham_inner_line ham_inner_line_3 ${menuShown ? "linec" : ""}`}></span>
                    </div>
                </div>

                <div className={`nav-overlay ${menuShown ? "show" : ""}`} onClick={closeMenu}></div>

                <nav className={`ham-menu ${menuShown ? "fadein" : ""}`}>
                    <div className="close-btn" onClick={closeMenu}>
                        &times; {/* 閉じるボタンの「×」 */}
                    </div>
                    <ul>
                        <li>
                            <Link to="/items" onClick={closeMenu}>商品一覧</Link>
                        </li>
                        <li>
                            <Link to="/salesSummaries" onClick={closeMenu}>売上データ</Link>
                        </li>
                        <li>
                            <Link to="/salesHistories" onClick={closeMenu}>購買履歴</Link>
                        </li>
                    </ul>
                </nav>

                <div className="header_logo"></div>
                <nav className="header_asset">
                    <ul className="header_asset_list">
                        <li className="header_asset_list_item">
                            <Link to="/items">商品一覧</Link>
                        </li>
                        <li className="header_asset_list_item">
                            <Link to="/salesSummaries">売上データ</Link>
                        </li>
                        <li className="header_asset_list_item">
                            <Link to="/salesHistories">購買履歴</Link>
                        </li>
                    </ul>
                </nav>
            </header>

            <Routes>
                <Route path="/" element={<Navigate to="/items" replace/>}/>
                <Route path="/items" element={<ItemList/>}/>
                <Route path="/salesSummaries" element={<SalesSummaryList/>}/>
                <Route path="/salesHistories" element={<SalesHistory/>}/>
                <Route path="*" element={<div className="not-found">404 Not Found</div>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
