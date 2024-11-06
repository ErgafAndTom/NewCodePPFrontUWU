import React, {useCallback, useEffect, useState} from "react";
import './ClientArtem.css';
// import Image from "react-bootstrap/Image";
import whiteSVG from "../../components/whiteSVG.svg";
import axios from "../../api/axiosInstance";
import Form from "react-bootstrap/Form";
import ChangeClienticons from "./img/Group 1476.png";
import barcode from "./public/mask-group-10.svg";
import profile from "./public/mask-group-11@2x.png";
import telegram from "./img/Telegram-icon-on-transparent-background-PNG.png";
import FilesButton from "./img/files-icon.png";
import addclienticons from "./img/Path 13360.png";

const ClientChangerUIArtem = ({thisOrder, handleThisOrderChange, setNewThisOrder}) => {
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
    console.log(thisOrder);

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
                console.log(response.data);
                setUsers(response.data)
                // setPageCount(Math.ceil(response.data.result.count / inPageCount))
            })
            .catch(error => {
                // if(error.response.status === 403){
                //     navigate('/login');
                // }
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
                                            {thing.clientId} {thing.firstName} {thing.lastName} {thing.familyName}
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
                    <button className="ChangeClient" onClick={toggleUserList}>
                        <img src={ChangeClienticons} alt="ChangeClient" style={{width: "1.7vw", height: "1.7vw", marginLeft: "auto"}} className="ChangeClient-icons"/>
                    </button>
                    <div className="ClientsMenuu">
                        <div className="d-flex">
                            <div className="left-section">
                                <img src={barcode} alt="Штрих-код" style={{width: "1.7vw", height: "1.7vw", marginLeft: "auto"}} className="barcode" onClick={printBarcode}/>
                                <img src={profile} alt="Профіль" style={{width: "1.7vw", height: "1.7vw", marginLeft: "auto"}} className="profile-photo" onClick={openUserSettings}/>
                            </div>
                            <div className="middle-section">
                                <div className="username">
                                    {/*{thisOrder.User.username}*/}
                                </div>
                                <div className="contact-number">
                                    {thisOrder.User.phoneNumber}
                                    <div className="nicknameArtemCli">
                                        <img style={{width: "1.7vw", height: "1.7vw", marginLeft: "auto"}} src={thisOrder.User.signal} alt="Signal" className="img-fluid"
                                             onClick={() => openMessenger('signal')}/>
                                        <img style={{width: "1.7vw", height: "1.7vw", marginLeft: "auto"}} src={thisOrder.User.viber} alt="Viber" className="img-fluid"
                                             onClick={() => openMessenger('viber')}/>
                                        <img style={{width: "1.7vw", height: "1.7vw", marginLeft: "auto"}} src={thisOrder.User.watsap} alt="WhatsApp" className="img-fluid"
                                             onClick={() => openMessenger('whatsapp')}/>
                                    </div>
                                </div>
                                <div className="nicknameArtemCli">
                                    <img src={telegram} alt="Telegram" style={{width: "1.7vw", height: "1.7vw", marginLeft: "auto"}} className="img-fluid"
                                         onClick={() => openMessenger('telegram')}/>
                                    {thisOrder.User.telegramlogin}
                                </div>
                            </div>
                            <div className="right-section">
                                <button className="files-button">
                                    <img src={FilesButton} style={{width: "1.7vw", height: "1.7vw", marginLeft: "auto"}} alt="FilesButton" className="FilesButton-icons"
                                         onClick={() => window.open('https://drive.google.com', '_blank')}/>
                                </button>
                                <button className="discount-button">
                                    <div className="discountwords">-15%</div>
                                </button>
                            </div>
                            <button className="addclient">
                                <img src={addclienticons} style={{width: "1.7vw", height: "1.7vw", marginLeft: "auto"}} alt="addclients" className="addclient-icons"
                                     onClick={() => window.open('https://drive.google.com', '_blank')}/>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};

export default ClientChangerUIArtem;