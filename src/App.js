import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./Components/Navbar/Navbar";
import HomePage from "./Components/HomePage/HomePage";
import Login from "./Components/Forms/Login";
import Register from "./Components/Forms/Register";
import AccountDashboard from "./Components/Dashboard/AccountDashboard";
import AccountDetails from "./Components/Dashboard/AccountDetails";
import AddAccount from "./Components/AddAccount";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<AccountDashboard />} />
                <Route
                    path="/account-details/:accountId"
                    element={<AccountDetails />}
                />
                <Route
                    path="/dashboard/accounts/create"
                    element={<AddAccount />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
