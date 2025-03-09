import {BrowserRouter, Route, Routes} from "react-router-dom";
import "../../assets/styles/main.scss";

function App() {
    return (
        <BrowserRouter>
            <p>a</p>
            {/* <Routes>
                <Route path="/" element={<Navigate to="/items" replace/>}/>
                <Route path="/items" element={<ItemList/>}/>
                <Route path="/salesSummaries" element={<SalesSummaryList/>}/>
                <Route path="/salesHistories" element={<SalesHistory/>}/>
                <Route path="*" element={<div className="not-found">404 Not Found</div>}/>
            </Routes> */}
        </BrowserRouter>
    );
}

export default App;
