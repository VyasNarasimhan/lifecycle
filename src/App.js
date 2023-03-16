import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
// import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
    return (
        <BrowserRouter basename="/lifecycle">
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
