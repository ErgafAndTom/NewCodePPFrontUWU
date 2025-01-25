import React from "react";
import {Route, Routes} from 'react-router-dom';
import {useSelector} from "react-redux";
import Loader from "./Loader";
import MainWindow from "./main/MainWindow";
import Desktop from "../admin/crm/Desktop/Desktop";
import Files from "./files/Files";
import CreateOrder from "./createorder/CreateOrder";
import {Login} from "../../PrintPeaksFAinal/login/Login";
import {UsersTable} from "../../PrintPeaksFAinal/user/UsersTable";
// import {Admin} from "../admin/Admin";
import Profile from "../../PrintPeaksFAinal/user/Profile";
import CustomOrderTable from "../../PrintPeaksFAinal/Orders/CustomOrderTable";
import NewUIArtem from "../../PrintPeaksFAinal/NewUIArtem";
// import ClientPip from "../../PrintPeaksFAinal/ClientPip";
import {TableStorage} from "../../PrintPeaksFAinal/Storage/TableStorage";
import CustomStorageTable from "../../PrintPeaksFAinal/Storage/CustomStorageTable";
import UsersCustomTable from "../../PrintPeaksFAinal/user/UsersCustomTable";
import CustomOrderTable2 from "../../PrintPeaksFAinal/Orders/CustomOrderTable2";
import {Spinner} from "react-bootstrap";
import DataManager from "../../PrintPeaksFAinal/dataMenager/DataManager";
import TableManager from "../../PrintPeaksFAinal/dataMenager/TableManager";

const AfterNav = () => {
    const pricesIsLoading = useSelector(state => state.prices.pricesIsLoading);
    const pricesError = useSelector(state => state.prices.pricesError);
    const token = useSelector((state) => state.auth.token);

    if (pricesIsLoading) {
        return (
            <div>
                <Routes>
                    <Route path="/" element={<Loader/>} />
                    <Route path="/files" element={<Loader/>} />
                    <Route path="/createOrder" element={<Loader/>} />
                    <Route path="/login" element={<Loader/>} />
                    <Route path="/admin" element={<Loader/>} />
                    <Route path="/currentUser" element={<Loader/>} />
                </Routes>
            </div>
        )
    }
    if (pricesError) {
        return (
            <div>
                <Routes>
                    <Route path="/" element={<div>{pricesError}</div>} />
                    <Route path="/files" element={<div>{pricesError}</div>} />
                    <Route path="/createOrder" element={<div>{pricesError}</div>} />
                    <Route path="/login" element={<div>{pricesError}</div>} />
                    <Route path="/admin" element={<div>{pricesError}</div>} />
                    <Route path="/currentUser" element={<div>{pricesError}</div>} />
                </Routes>
            </div>
        )
    }
    return (
        <div>
            {/*{!token && (*/}
            {/*    <Spinner animation="border" variant="danger" size="sm" />*/}
            {/*)}*/}
            <Routes>
                <Route path="/" element={<Desktop/>} />
                <Route path="/db" element={<DataManager/>} />
                <Route path="/db2" element={<TableManager/>} />
                {/*<Route path="/" element={<Desktop/>} />*/}
                <Route path="/files" element={<Files/>} />
                <Route path="/createOrder" element={<CreateOrder/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/Users" element={<UsersCustomTable/>} />

                {/*<Route exact path="/login">*/}
                {/*    {token ? <Redirect to="/profile" /> : <Login />}*/}
                {/*</Route>*/}

                {/*<Route path="/admin" element={<Admin/>} />*/}
                <Route path="/currentUser" element={<Profile/>} />

                {/*<Route path="/Orders" element={<Orders/>} />*/}
                <Route path="/Orders" element={<CustomOrderTable2/>} />
                <Route path="/OrdersOld" element={<CustomOrderTable/>} />
                <Route path="/Orders/:id" element={<NewUIArtem/>} />

                {/*<Route path="/Desktop" element={<ClientPip/>} />*/}
                {/*<Route path="/Desktop" element={<NewUIArtem/>} />*/}
                {/*<Route path="/Desktop/:id" element={<NewUIArtem/>} />*/}

                {/*<Route path="/Cash" element={<CrmCash2/>} />*/}
                {/*<Route path="/Cash/:id" element={<CrmCash2/>} />*/}
                <Route path="/Storage" element={<CustomStorageTable name={"Склад"}/>} />
                <Route path="/Devices" element={<TableStorage name={"Devices"}/>} />
                <Route path="/Desktop" element={<Desktop/>} />
                {/*<Route path="/Desktop" element={<NewUIArtem/>} />*/}
                {/*<Route path="/CashFull" element={<Kassa/>} />*/}
                {/*<Route path="/CashFull/:id" element={<Kassa/>} />*/}

                {/*<Route path="/CashFull" element={<CrmCash2/>} />*/}
                {/*<Route path="/CashFull/:id" element={<CrmCash2/>} />*/}

                {/*<Route path="/CashFull" element={<CrmCash3Full/>} />*/}
                {/*<Route path="/CashFull/:id" element={<CrmCash3Full/>} />*/}

                {/*<Route path="/Main" element={<MainSite/>} />*/}
            </Routes>
        </div>
    );
};

export default AfterNav;