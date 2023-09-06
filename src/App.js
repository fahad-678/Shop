import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./Components/Navbar/Navbar";
import HomePage from "./Components/HomePage/HomePage";
import Login from "./Components/Forms/Login";
import Register from "./Components/Forms/Register";
import AccountDashboard from "./Components/Dashboard/AccountDashboard";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<AccountDashboard />} />
                <Route path="/add-transaction" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
