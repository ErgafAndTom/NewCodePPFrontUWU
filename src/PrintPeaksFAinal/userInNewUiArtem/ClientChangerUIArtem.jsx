import React, {useCallback, useEffect, useState} from "react";
import './ClientArtem.css';
import  './ClientsMenuu.css'
import www from "./www.svg";
import whiteSVG from "../../components/whiteSVG.svg";
import axios from "../../api/axiosInstance";
import Form from "react-bootstrap/Form";
import ChangeClienticons from "./img/Group 1476.png";
import barcode from "./public/mask-group-10.svg";
import profile from "./public/mask-group-11@2x.png";
import viberlogo from "./img/viber.png";
import signallogo from "./img/signal.png";
import whatsapplogo from "./img/whatsapp.png";
import telegram from "./img/Telegram-icon-on-transparent-background-PNG.png";
import FilesButton from "./img/files-icon.png";
import addclienticons from "./img/Path 13360.png";
import Tooltip from '../TooltipButton2';
import {useNavigate} from "react-router-dom";
import AddUserWindow from "../user/AddUserWindow"; //

const ClientChangerUIArtem = ({thisOrder, handleThisOrderChange, setNewThisOrder}) => {
    const navigate = useNavigate();
    const [showAddUser, setShowAddUser] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [typeSelect, setTypeSelect] = useState("");
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);

    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const handleClose = () => {
        setIsAnimating(false); // Начинаем анимацию закрытия
        setTimeout(() => {
            setIsVisible(false)
            setShow(false);
        }, 300); // После завершения анимации скрываем модальное окно
    }
    useEffect(() => {
        if (show) {
            setIsVisible(true); // Сначала показываем модальное окно
            setTimeout(() => setIsAnimating(true), 100); // После короткой задержки запускаем анимацию появления
        } else {
            setIsAnimating(false); // Начинаем анимацию закрытия
            setTimeout(() => setIsVisible(false), 300); // После завершения анимации скрываем модальное окно
        }
    }, [show]);

    const handleCloseSearch = useCallback(() => {
        setShow(false);
    }, []);

    const handleSearch = useCallback(() => {
        setShow(true);
        setTypeSelect("")
    }, []);

    const preHandleThisOrderChange = (fieldName, event, value) => {
        const updatedThisOrder = thisOrder;
        updatedThisOrder[fieldName] = value;
        setNewThisOrder(updatedThisOrder)
        setShow(false);
    };

    // console.log(thisOrder);

    useEffect(() => {
        let data = {
            name: "",
            inPageCount: 500,
            currentPage: 1,
            search: typeSelect,
            columnName: "id",
        }
        axios.post(`/user/all`, data)
            .then(response => {
                // console.log(response.data);
                setUsers(response.data)
                // setPageCount(Math.ceil(response.data.result.count / inPageCount))
            })
            .catch(error => {
                if(error.response.status === 403){
                    navigate('/login');
                }
                console.log(error.message);
            })
    }, [typeSelect]);

    const openMessenger = (messenger) => {
        let url = '';
        const phoneNum = thisOrder.User.phoneNumber.replace(/\s+/g, '');
        switch (messenger) {
            case 'signal':
                url = `signal://${thisOrder.User.phoneNum}`;
                break;
            case 'viber':
                url = `viber://chat?number=${thisOrder.User.phoneNum}`;
                break;
            case 'whatsapp':
                url = `https://wa.me/${thisOrder.User.phoneNum}`;
                break;
            case 'telegram':
                url = `https://t.me/${thisOrder.User.telegramlogin}`;
                break;
            default:
                break;
        }
        window.open(url, '_blank');
    };

    const printBarcode = () => {
        // Логіка друку штрих-коду
    };

    const openUserSettings = () => {
        // Логіка відкриття налаштувань користувача
    };

    const toggleUserList = () => {
        setShow(true)
    };


    const AddNewUser = () => {
        setShowAddUser(!showAddUser)
    };

    const selectUser = (user) => {
        setShow(true)
        console.log('Вибраний користувач:', user);  // Наприклад, тут ви можете оновити стан поточного користувача.
    };

    return (
        <div>
            {isVisible === true ? (
                <div>
                    {/*<style>{keyframesStyle}</style>*/}
                    <div
                        // style={{
                        //     height: '54vh',
                        //     zIndex: "999",
                        //     position: "fixed",
                        //     background: "#dcd9ce",
                        //     // top: "17.8vh",
                        //     // left: "60vw",
                        //     // width: "40vw",
                        //     marginTop: "-40vh",
                        //     marginLeft: "-40vh",
                        //     width: "35.3vw",
                        // }}
                        style={{
                            zIndex: "100",
                            position: "fixed",
                            background: "#dcd9ce",
                            top: "50%",
                            left: "50%",
                            transform: isAnimating ? "translate(-50%, -50%) scale(1)" : "translate(-0%, -0%) scale(0.8)", // анимация масштаба
                            opacity: isAnimating ? 1 : 0, // анимация прозрачности
                            transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out", // плавная анимация
                            borderRadius: "1vw",
                            width: "90vw",
                            height: "90vh",
                            animation: "rotate-animation 2s infinite"
                            // padding: "20px"
                        }}
                        className="shadow-lg">
                        <div
                            style={{
                                height: '86vh',
                                overflow: 'auto',
                            }}
                        >
                            {users.rows.map((thing, index) => (
                                <div
                                    className="btn btn-sm btn-outline-light d-flex flex-row text-black"
                                    style={{
                                        border: "solid 1px #cccabf",
                                        borderRadius: "1vw"
                                    }}
                                    key={thing.id + index}
                                    onClick={(event) => preHandleThisOrderChange('clientId', event, thing.id)}
                                >
                                    <div className="d-flex">
                                        <div className="adminFont btn btn-sm">
                                            {thing.clientId} {thing.firstName} {thing.lastName} {thing.familyName} {thing.discount}
                                        </div>
                                        <div className="adminFont btn btn-sm">
                                            {thing.role}
                                        </div>
                                        <div className="adminFont btn btn-sm">
                                            Phone: {thing.phoneNumber}
                                        </div>
                                        <div className="adminFont btn btn-sm">
                                            Messenger: {thing.telegram}
                                        </div>
                                    </div>
                                    <img className=""
                                           style={{width: "1.7vw", height: "1.7vw", marginLeft: "auto"}}
                                           src={whiteSVG}/>
                                </div>
                            ))}
                        </div>
                        <Form.Control
                            type="text"
                            placeholder={"Search..."}
                            value={typeSelect}
                            className="adminFontTable shadow-lg bg-transparent"
                            onChange={(event) => setTypeSelect(event.target.value)}
                            style={{border: "solid 1px #cccabf", borderRadius: "0", width: "97%"}}
                        />
                    </div>
                    <div style={{
                        width: "100vw",
                        zIndex: "99",
                        height: "100vh",
                        background: "rgba(0, 0, 0, 0.5)",
                        opacity: isAnimating ? 1 : 0, // для анимации прозрачности
                        transition: "opacity 0.3s ease-in-out", // плавная анимация
                        position: "fixed",
                        left: "0",
                        bottom: "0"
                    }} onClick={handleCloseSearch}></div>
                </div>
            ) : (
                <div className="clientsproject">
                    <div className="ClientsMenuu" style={{marginTop: "3vh", width: "33.5vw"}}>
                        <div className="d-flex">
                            <div className="left-section">
                                <Tooltip text="Вибрати клієнта">
                                <button className="ChangeClient grayFonColorBackground " style={{
                                    width: "3vw",
                                    height: "3.5vw",
                                    marginLeft: "0.3vw",
                                    border: "0px",
                                    borderRadius: "0.5vw",

                                }} onClick={toggleUserList} title="Вибрати клієнта">
                                    <img src={ChangeClienticons} alt="ChangeClient "
                                         style={{width: "1.7vw", height: "1.7hw", marginLeft: "auto"}}
                                         className="ChangeClient-icons"/>
                                </button>
                                    </Tooltip>
                                <Tooltip text="Штрих-код клієнта">
                                <button className="BarcodeClientMenu" style={{
                                    width: "2.3vw",
                                    height: "3.5vw",
                                    marginLeft: "0.3vw",
                                    borderRadius: "0.5vw",
                                    background: "transparent",
                                    border: "0px",
                                    padding: "0px"
                                }}>

                                    <img src={barcode} alt="bar-code"
                                         style={{width: "3.4vw", height: "6.5vh",}}
                                         className="barcodeclientmenuimg"
                                         onClick={printBarcode}/>
                                </button>
                                    </Tooltip>
                                <img src={profile} alt="Профіль"
                                     style={{width: "3.5vw", marginLeft: "0.3vw",}}
                                     className="profile-photo" onClick={openUserSettings}/>
                            </div>
                            <div className="middle-section" style={{marginLeft: "0.3vw"}}>
                                <div className="username" style={{
                                    fontSize: "1vw",
                                    fontWeight: "bold",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxWidth: "15vw"
                                }}>
                                    {thisOrder.User.firstName} {thisOrder.User.lastName} {thisOrder.User.familyName}
                                </div>
                                <div className="contact-number" style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    height: "1vw",
                                    alignItems: "center"
                                }}>
                                    <div className="nicknameArtemCli"
                                         style={{fontSize: "1vw", display: "flex", alignItems: "center", marginTop: "0.2vw"}}>
                                        {thisOrder.User.phoneNumber}
                                        <img style={{width: "0.9vw", marginLeft: "0.3vw", alignItems: "center"}}
                                             src={signallogo}
                                             alt="Signal" className="img-fluid"
                                             onClick={() => openMessenger('signal')}/>
                                        <img style={{width: "0.9vw", marginLeft: "0.3vw", alignItems: "center"}}
                                             src={viberlogo} alt="Viber" className="img-fluid"
                                             onClick={() => openMessenger('viber')}/>
                                        <img style={{width: "0.9vw", marginLeft: "0.3vw", alignItems: "center"}}
                                             src={whatsapplogo} alt="WhatsApp" className="img-fluid"
                                             onClick={() => openMessenger('whatsapp')}/>
                                    </div>
                                </div>
                                <div className="nicknameArtemCli" style={{display: "flex", alignItems: "center", color: "#239cd7", marginTop: "0.2vw"}}>
                                    {thisOrder.User.telegram}
                                    <img src={telegram} alt="Telegram" style={{width: "0.9vw", marginLeft: "0.3vw"}}
                                         className="img-fluid"
                                         onClick={() => openMessenger('telegram')}/>
                                </div>
                            </div>

                            <div className="right-section"
                                 style={{justifyContent: 'flex-end', display: 'flex', marginLeft: 'auto'}}>
                                <Tooltip text="Знижка">
                                <div className="discount-button" data-toggle="tooltip" data-placement="top"
                                     title="Знижка" style={{
                                    transform: "rotate(360deg)",
                                    alignItems: "center",
                                    marginTop: "0.3vw",
                                    fontSize: "1.6vw"
                                }}>
                                    <div className="discountwords"
                                         style={{transform: "rotate(90deg)"}}>{thisOrder.User.discount}

                                    </div>
                                    <div className="ProzentClient" style={{transform: "rotate(90deg)", fontSize: "1vw", marginLeft: "0.5vw"}}>%</div>
                                </div>
                                </Tooltip>
                                <Tooltip text="Файли кліента"><button className="files-button d-flex grayFonColorBackground  justify-content-center align-items-center align-content-center" style={{
                                    width: "3vw",
                                    height: "3.5vw",
                                    marginLeft: "0.3vw",
                                    border: "0px",
                                    borderRadius: "0.5vw",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }} onClick={() => window.open('https://drive.google.com', '_blank')}>

                                    <img src={FilesButton} style={{
                                        // width: "1.7vw",
                                        height: "1.7vw",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        display: "flex",
                                    }} alt="FilesButton"
                                         className="FilesButton-icons d-flex justify-content-center align-items-center align-content-center"/>
                                </button> </Tooltip>

                            </div>
                            <Tooltip text="Додати кліента">
                            <button className="addclient grayFonColorBackground " style={{
                                width: "3vw",
                                height: "3.5vw",
                                marginLeft: "0.3vw",
                                border: "0px",
                                borderRadius: "0.5vw"
                            }} onClick={AddNewUser}>
                                <img src={addclienticons} style={{width: "1.5vw",  marginLeft: "auto"}} alt="addclients" className="addclient-icons"
                                     />

                            </button>
                                {showAddUser &&
                                    <div style={{ }} className="">
                                        {/*<img src={www} className="position-absolute" style={{*/}
                                        {/*    width: "35.5vw",*/}
                                        {/*    marginLeft: "-31.9vw",*/}
                                        {/*    marginTop: "-20.5vw",*/}
                                        {/*}} alt="www"/>*/}
                                        <AddUserWindow showAddUser={showAddUser} setShowAddUser={setShowAddUser} thisOrder={thisOrder}/>
                                    </div>
                                }
                            </Tooltip>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};

export default ClientChangerUIArtem;