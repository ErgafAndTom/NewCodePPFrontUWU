import React, {useEffect, useState} from "react";
import "./Nav.css"
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {MDBContainer, MDBInputGroup, MDBNavbar,} from "mdb-react-ui-kit";
import find from "../find.svg";
import {fetchUser, logout} from "../../actions/authActions";
import {Form} from "react-bootstrap";
import './logo/Logo.css';
import Logo from "./logo/Logo";
import AddNewOrder from "../../PrintPeaksFAinal/Orders/AddNewOrder";
// import Logo from "./logo/Logo";

const Nav = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.user);
    const userIsLoading = useSelector(state => state.auth.loading);
    const userError = useSelector(state => state.auth.error);
    const allFilesForEffect = useSelector(state => state.files.allFiles);
    const [search, setSearch] = useState({ search: "" });
    const [showNav, setShowNav] = useState(false);
    const [basicActive, setBasicActive] = useState('/');
    useEffect(() => {
        dispatch(fetchUser())
    }, [])

    useEffect(() => {
        // console.log(document.location.pathname);
        setBasicActive(document.location.pathname);
    }, [document.location.pathname])

    const handleBasicClick = (value) => {
        if (value === basicActive) {
            return;
        }
        setBasicActive(value);
    };

    let logoutt = (event) => {
        dispatch(logout())
    }

    const handleChange = (e) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        });
    };

    return (
        <MDBNavbar expand='lg' light bgColor='' className="navbarMy">
            <MDBContainer fluid>
                <div className="d-flex">
                    <div className="logo">
                        <h1 className="Logo">

                            <div className="gradient-text">PRINT PEAKS <span style={{fontSize: "0.7vw"}}>ERP 7.14</span></div>
                            {/*<div style={{fontSize: "0.7vw"}}> ERP 6.1</div>*/}
                            {/*<Logo/>*/}

                        </h1>
                    </div>

                    <div className="top-menu">
                        <Link to="/Desktop" style={{textDecoration: 'none', margin: 'auto', padding: '0', background: 'transparent'}}>
                            <button
                                onClick={() => handleBasicClick('/Desktop')}
                                className={basicActive === "/Desktop" ? 'ButtonClients ButtonVimogia' : 'ButtonClients'} style={basicActive === "/Desktop" ? {background: "#FAB416"} : {}}>Головна
                            </button>
                        </Link>

                        {/*<button className="ButtonClients">Головна</button>*/}
                        <Link to="/Users" style={{textDecoration: 'none', margin: 'auto', padding: '0', background: 'transparent'}}>
                            <button
                                onClick={() => handleBasicClick('/Users')}
                                className={basicActive === "/Users" ? 'ButtonVimogi ButtonVimogia' : 'ButtonVimogi'}
                                style={basicActive === "/Users" ? {background: "#FAB416"} : {}}
                            >Клієнти
                            </button>
                        </Link>

                        {/*<button className="ButtonVimogi">Спілкування</button>*/}
                        {/*<button className="ButtonVimogi">Вимоги</button>*/}
                        {/*<button disabled className="ButtonVimogi">Постачальники</button>*/}
                        {/*<button disabled className="ButtonVimogi">Підрядники</button>*/}
                        <Link to="/Orders" style={{textDecoration: 'none', margin: 'auto', padding: '0', background: 'transparent'}}>
                            <button
                                onClick={() => handleBasicClick('/Orders')}
                                className={basicActive === "/Orders" ? 'ButtonVimogi ButtonVimogia' : 'ButtonVimogi'}
                                style={basicActive === "/Orders" ? {background: "#FAB416"} : {}}
                            >Замовлення
                            </button>
                        </Link>
                        {/*<Link to="/Devices" style={{textDecoration: 'none', margin: 'auto', padding: '0', background: 'transparent'}}>*/}
                        {/*    <button*/}
                        {/*        onClick={() => handleBasicClick('/Devices')}*/}
                        {/*        className={basicActive === "/Devices" ? 'ButtonVimogi activeChose' : 'ButtonVimogi'}>Devices*/}
                        {/*    </button>*/}
                        {/*</Link>*/}
                        <Link disabled onClick={() => handleBasicClick('/Storage')} to="/Storage"
                              style={{textDecoration: 'none', margin: 'auto', padding: '0', background: 'transparent'}}>
                            <button
                                className={basicActive === "/Storage" ? 'ButtonVimogi ButtonVimogia' : 'ButtonVimogi'}
                                style={basicActive === "/Storage" ? {background: "#FAB416"} : {}}
                            >Склад
                            </button>
                        </Link>
                        {/*<Link disabled onClick={() => handleBasicClick('/db')} to="/db"*/}
                        {/*      style={{textDecoration: 'none', margin: 'auto', padding: '0', background: 'transparent'}}>*/}
                        {/*    <button*/}
                        {/*        className={basicActive === "/db" ? 'ButtonVimogi ButtonVimogia' : 'ButtonVimogi'}*/}
                        {/*        style={basicActive === "/db" ? {background: "#FAB416"} : {}}*/}
                        {/*    >/db*/}
                        {/*    </button>*/}
                        {/*</Link>*/}
                        <Link disabled onClick={() => handleBasicClick('/db2')} to="/db2"
                              style={{textDecoration: 'none', margin: 'auto', padding: '0', background: 'transparent'}}>
                            <button
                                className={basicActive === "/db2" ? 'ButtonVimogi ButtonVimogia' : 'ButtonVimogi'}
                                style={basicActive === "/db2" ? {background: "#FAB416"} : {}}
                            >База
                            </button>
                        </Link>
                        <Link disabled onClick={() => handleBasicClick('/Trello')} to="/Trello"
                              style={{textDecoration: 'none', margin: 'auto', padding: '0', background: 'transparent'}}>
                            <button
                                className={basicActive === "/Trello" ? 'ButtonVimogi ButtonVimogia' : 'ButtonVimogi'}
                                style={basicActive === "/Trello" ? {background: "#FAB416"} : {}}
                            >Завдання
                            </button>
                        </Link>
                        <Link disabled onClick={() => handleBasicClick('/Trello2')} to="/Trello2"
                              style={{textDecoration: 'none', margin: 'auto', padding: '0', background: 'transparent'}}>
                            <button
                                className={basicActive === "/Trello2" ? 'ButtonVimogi ButtonVimogia' : 'ButtonVimogi'}
                                style={basicActive === "/Trello2" ? {background: "#FAB416"} : {}}
                            >Завдання
                            </button>
                        </Link>
                        {/*<Link disabled onClick={() => handleBasicClick('/CounterpartyList')} to="/CounterpartyList"*/}
                        {/*      style={{textDecoration: 'none', margin: 'auto', padding: '0', background: 'transparent'}}>*/}
                        {/*    <button*/}
                        {/*        className={basicActive === "/CounterpartyList" ? 'ButtonVimogi ButtonVimogia' : 'ButtonVimogi'}*/}
                        {/*        style={basicActive === "/CounterpartyList" ? {background: "#FAB416"} : {}}*/}
                        {/*    >CounterpartyList*/}
                        {/*    </button>*/}
                        {/*</Link>*/}
                        {/*<Link disabled onClick={() => handleBasicClick('/TG')} to="/TG"*/}
                        {/*      style={{textDecoration: 'none', margin: 'auto', padding: '0', background: 'transparent'}}>*/}
                        {/*    <button*/}
                        {/*        className={basicActive === "/TG" ? 'ButtonVimogi ButtonVimogia' : 'ButtonVimogi'}*/}
                        {/*        style={basicActive === "/TG" ? {background: "#FAB416"} : {}}*/}
                        {/*    >Telegram*/}
                        {/*    </button>*/}
                        {/*</Link>*/}
                        <Link to="/Vimogi" style={{textDecoration: 'none', margin: 'auto', padding: '0', background: 'transparent'}}>
                            <button
                                onClick={() => handleBasicClick('/Vimogi')}
                                className={basicActive === "/Vimogi" ? 'ButtonVimogi ButtonVimogia' : 'ButtonVimogi'}
                                style={basicActive === "/Vimogi" ? {background: "#FAB416"} : {}}
                            >Вимоги
                            </button>
                        </Link>
                        {/*<Link disabled onClick={() => handleBasicClick('/Trello2')} to="/Trello2"*/}
                        {/*      style={{textDecoration: 'none', margin: 'auto', padding: '0', background: 'transparent'}}>*/}
                        {/*    <button*/}
                        {/*        className={basicActive === "/Trello2" ? 'ButtonVimogi ButtonVimogia' : 'ButtonVimogi'}*/}
                        {/*        style={basicActive === "/Trello2" ? {background: "#FAB416"} : {}}*/}
                        {/*    >Завдання2*/}
                        {/*    </button>*/}
                        {/*</Link>*/}
                        {/*<Link disabled onClick={() => handleBasicClick('/TrelloLikeBoards1')} to="/TrelloLikeBoards1"*/}
                        {/*      style={{textDecoration: 'none', margin: 'auto', padding: '0', background: 'transparent'}}>*/}
                        {/*    <button*/}
                        {/*        className={basicActive === "/TrelloLikeBoards1" ? 'ButtonVimogi ButtonVimogia' : 'ButtonVimogi'}*/}
                        {/*        style={basicActive === "/TrelloLikeBoards1" ? {background: "#FAB416"} : {}}*/}
                        {/*    >/TrelloLikeBoards1*/}
                        {/*    </button>*/}
                        {/*</Link>*/}
                        {/*<button className="ButtonVimogi">Документи</button>*/}

                        {/*<button className="ButtonVimogi">Ціни</button>*/}
                        {/*<button className="ButtonVimogi">Нова Пошта</button>*/}
                        {/*<button className="ButtonVimogi">Звіти</button>*/}
                        {/*<button className="ButtonVimogi">Статистка</button>*/}
                        {/*<button className="ButtonVimogi">Угоди</button>*/}
                        {/*<button className="ButtonVimogi">Обладнання</button>*/}

                        {currentUser ? (
                            <div style={{marginLeft: "0vw"}}>
                                <MDBInputGroup tag="form" className='d-flex w-auto'>
                                    {currentUser.role === "admin" ? (
                                        <>
                                            <Link onClick={() => handleBasicClick('/currentUser')} to="/currentUser"
                                                  style={{textDecoration: 'none', margin: 'auto', padding: '0', background: 'transparent'}}>
                                                <button
                                                    className={basicActive === "/currentUser" ? 'ButtonVimogi' : 'ButtonVimogi'}
                                                    style={basicActive === "/currentUser" ? {background: "#FAB416"} : {}}
                                                >Налаштування: {currentUser.username}
                                                    {/*<Image className=""*/}
                                                    {/*       style={{width: "1.7vw", height: "1.7vw", marginLeft: "auto"}}*/}
                                                    {/*       src={whiteSVG} roundedCircle/>*/}
                                                </button>
                                            </Link>
                                            <button onClick={logoutt} className="ButtonVimogi ButtonSetting">Вийти</button>
                                        </>
                                    ) : (
                                        <>
                                            <Link onClick={() => handleBasicClick('/currentUser')} to="/currentUser"
                                                  style={{textDecoration: 'none', margin: 'auto', padding: '0', background: 'transparent'}}>
                                                <button
                                                    className={basicActive === "/createOrder" ? 'ButtonVimogi' : 'ButtonVimogi'}
                                                    style={basicActive === "/createOrder" ? {background: "#FAB416"} : {}}
                                                >Налаштування: {currentUser.username}
                                                    {/*<Image className=""*/}
                                                    {/*       style={{width: "1.7vw", height: "1.7vw", marginLeft: "auto"}}*/}
                                                    {/*       src={whiteSVG} roundedCircle/>*/}
                                                </button>
                                            </Link>
                                            <button onClick={logoutt} className="ButtonVimogi ButtonSetting">Вийти</button>
                                        </>
                                    )}
                                </MDBInputGroup>
                            </div>
                        ) : (
                            <Link onClick={() => handleBasicClick('/login')} to="/login"
                                  style={{textDecoration: 'none', margin: 'auto', padding: '0', background: 'transparent'}}>
                                <button
                                    className={basicActive === "/login" ? 'ButtonSetting' : 'ButtonSetting'}
                                    style={basicActive === "/login" ? {background: "#FAB416"} : {}}
                                >Логін
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
                <AddNewOrder/>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <Form.Control
                        className="Search"
                        name="search"
                        type="text"
                        onChange={handleChange}
                        placeholder="search"
                        defaultValue={""}
                        value={search.search}
                        required
                    />
                    <img style={{
                        position: 'absolute',
                        left: '85%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none',
                        width: "1.7vw", height: "1.7vw", marginLeft: "auto"
                    }} src={find} alt="Search Icon" className="Seaechicon"/>
                </div>
            </MDBContainer>
        </MDBNavbar>
    )
};

export default Nav;