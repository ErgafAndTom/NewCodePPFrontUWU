import React, {useCallback, useEffect, useState} from "react";
import './../../global.css';
import './ClientArtem.css';
import './ClientsMenuu.css';
import www from "./www.svg";
import whiteSVG from "../../components/whiteSVG.svg";
import pays from "../Pays.png";
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
import Tooltip from '../TooltipButton2';
import {useNavigate} from "react-router-dom";
import AddUserWindow from "../user/AddUserWindow";
import {Button, Modal, Spinner, ListGroup, InputGroup} from "react-bootstrap";
import {buttonStyles, containerStyles, formStyles} from './styles';
import PaysInOrderRestored from "./pays/PayInOrderRestored";

const ClientChangerUIArtem = ({thisOrder, setThisOrder}) => {
    const navigate = useNavigate();
    const [showAddUser, setShowAddUser] = useState(false);
    const [showDocGenerate, setShowDocGenerate] = useState(false);
    const [showNP, setShowNP] = useState(false);
    const [showPays, setShowPays] = useState(false);
    const [load, setLoad] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [typeSelect, setTypeSelect] = useState("");
    const [users, setUsers] = useState({rows: []});
    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);

    // Функція для закриття модального вікна
    const handleClose = () => {
        setShow(false);
    };

    // Функція для відкриття модального вікна
    const handleShow = () => {
        setShow(true);
        setSearchQuery("");
        fetchUsers();
    };

    // Завантаження списку користувачів
    const fetchUsers = async () => {
        let data = {
            name: "",
            inPageCount: 999999,
            currentPage: 1,
            search: searchQuery,
            columnName: {
                column: "id",
                reverse: false
            },
        }
        setLoad(true);
        setError(null);

        try {
            const response = await axios.post(`/user/all`, data);
            setLoad(false);
            setUsers(response.data);
            setFilteredUsers(response.data.rows);
        } catch (error) {
            setLoad(false);
            if (error.response && error.response.status === 403) {
                navigate('/login');
            }
            setError(error.message);
            console.error(error.message);
        }
    };

    // Пошук користувачів при зміні запиту
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                fetchUsers();
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [searchQuery, show]);

    // Обробник для вибору користувача
    const handleSelectUser = (userId) => {
        let data = {
            orderId: thisOrder.id,
            userId: userId,
        };

        setLoad(true);
        setError(null);

        axios.put(`/orders/OneOrder/user`, data)
            .then(response => {
                setLoad(false);
                setThisOrder(response.data);
                setShow(false);
            })
            .catch(error => {
                setLoad(false);
                if (error.response && error.response.status === 403) {
                    navigate('/login');
                }
                setError(error.message);
                console.error(error.message);
            });
    };

    // Обробник для фільтрування списку користувачів
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
    };

    // Функції для месенджерів
    const openMessenger = (messenger) => {
        if (!thisOrder.client) return;

        let url = '';
        const phoneNum = thisOrder.client.phoneNumber ? thisOrder.client.phoneNumber.replace(/\s+/g, '') : '';

        switch (messenger) {
            case 'signal':
                url = `signal://${phoneNum}`;
                break;
            case 'viber':
                url = `viber://chat?number=${phoneNum}`;
                break;
            case 'whatsapp':
                url = `https://wa.me/${phoneNum}`;
                break;
            case 'telegram':
                url = thisOrder.client.telegram ? `https://t.me/${thisOrder.client.telegram}` : '';
                break;
            default:
                break;
        }

        if (url) {
            window.open(url, '_blank');
        }
    };

    // Додавання нового користувача
    const handleAddNewUser = () => {
        setShowAddUser(true);
    };

    // Обробник успішного додавання нового користувача
    const handleUserAdded = (newUser) => {
        fetchUsers(); // Оновлюємо список після додавання

        // Автоматично обираємо нового користувача, якщо він успішно доданий
        if (newUser && newUser.id) {
            handleSelectUser(newUser.id);
        }
    };

    return (
        <>
            {/* Кнопка для відкриття модального вікна */}
            <div
                onClick={handleShow}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '4px',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    padding: '1vh',
                    textAlign: 'left',
                    borderRadius: '1vw',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'inter, sans-serif',
                    fontSize: '0.7vw',
                    backgroundColor: '#F2F0E7'
                }}
            >
                <div style={{display: 'flex', alignItems: 'center', gap: '8px', width: '100%', transition: "opacity .3s, transform .3s"}}>
                    <img src={ChangeClienticons} alt="Change Client"
                         style={{width: '20px', height: '20px', flexShrink: 0}}/>
                    {thisOrder.client ? (
                        <span className="fw-semibold">
                            {thisOrder.client.firstName} {thisOrder.client.lastName} {thisOrder.client.familyName}
                        </span>
                    ) : (
                        <span style={{background: "black"}}>Вибрати клієнта</span>
                    )}
                </div>

                {thisOrder.client && (
                    <div className="client-details" style={{fontSize: '0.85rem', width: '100%'}}>
                        <div className="d-flex flex-wrap">
                            {thisOrder.client.id && (
                                <div className="me-2">
                                    <i className="bi bi-person-badge me-1"></i>
                                    <span className="text-muted">ID: {thisOrder.client.id}</span>
                                </div>
                            )}

                            {thisOrder.client.phoneNumber && (
                                <div className="me-2">
                                    <i className="bi bi-telephone me-1"></i>
                                    <span className="text-muted fontSize0-7VW">{thisOrder.client.phoneNumber}</span>
                                </div>
                            )}

                            {thisOrder.client.email && (
                                <div className="me-2">
                                    <i className="bi bi-envelope me-1"></i>
                                    <span className="text-muted fontSize0-7VW">{thisOrder.client.email}</span>
                                </div>
                            )}
                        </div>

                        <div className="d-flex flex-wrap mt-1">
                            {thisOrder.client.address && (
                                <div className="me-2">
                                    <i className="bi bi-geo-alt me-1"></i>
                                    <span className="text-muted fontSize0-7VW">{thisOrder.client.address}</span>
                                </div>
                            )}

                            {thisOrder.client.discount && (
                                <div className="me-2">
                                    <i className="bi bi-percent me-1"></i>
                                    <span className="text-success fontSize0-7VW">Знижка: {thisOrder.client.discount}%</span>
                                </div>
                            )}

                            {thisOrder.client.telegram && (
                                <div className="me-2">
                                    <i className="bi bi-telegram me-1"></i>
                                    <span className="fontSize0-7VW" style={{color: "#000fa5"}}>{thisOrder.client.telegram}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Кнопки швидких дій з клієнтом */}
            {!show && thisOrder.client && thisOrder.client.phoneNumber && (
                <div className="d-flex gap-1 mt-2 justify-content-between">
                    <div className="d-flex gap-1">

                        {thisOrder.client.viber && (
                            <button
                                onClick={() => openMessenger('viber')}
                                title="Viber"
                                style={{...buttonStyles.base, ...buttonStyles.iconButton}}
                            >
                                <img src={viberlogo} alt="Viber" style={{width: '16px', height: '16px'}}/>
                            </button>
                        )}
                        {!thisOrder.client.viber && (
                            <button
                                title="Viber"
                                style={{...buttonStyles.base, ...buttonStyles.iconButton}}
                            >
                                <img src={viberlogo} alt="Viber" style={{width: '16px', height: '16px', filter: 'grayscale(100%)', opacity: 0.5}}/>
                            </button>
                        )}

                        {thisOrder.client.whatsapp && (
                            <button
                                onClick={() => openMessenger('whatsapp')}
                                title="WhatsApp"
                                style={{...buttonStyles.base, ...buttonStyles.iconButton}}
                            >
                                <img src={whatsapplogo} alt="WhatsApp" style={{width: '16px', height: '16px'}}/>
                            </button>
                        )}
                        {!thisOrder.client.whatsapp && (
                            <button
                                title="WhatsApp"
                                style={{...buttonStyles.base, ...buttonStyles.iconButton}}
                            >
                                <img src={whatsapplogo} alt="WhatsApp" style={{width: '16px', height: '16px', filter: 'grayscale(100%)', opacity: 0.5}}/>
                            </button>
                        )}

                        {thisOrder.client.signal && (
                            <button
                                onClick={() => openMessenger('signal')}
                                title="Signal"
                                style={{...buttonStyles.base, ...buttonStyles.iconButton}}
                            >
                                <img src={signallogo} alt="Signal" style={{width: '16px', height: '16px'}}/>
                            </button>
                        )}
                        {!thisOrder.client.signal && (
                            <button
                                title="Signal"
                                style={{...buttonStyles.base, ...buttonStyles.iconButton}}
                            >
                                <img src={signallogo} alt="Signal" style={{width: '16px', height: '16px', filter: 'grayscale(100%)', opacity: 0.5}}/>
                            </button>
                        )}

                        {thisOrder.client.telegram && (
                            <button
                                onClick={() => openMessenger('telegram')}
                                title="Telegram"
                                style={{...buttonStyles.base, ...buttonStyles.iconButton}}
                            >
                                <img src={telegram} alt="Telegram" style={{width: '16px', height: '16px'}}/>
                            </button>
                        )}
                        {!thisOrder.client.telegram && (
                            <button
                                title="Telegram"
                                style={{...buttonStyles.base, ...buttonStyles.iconButton}}
                            >
                                <img src={telegram} alt="Telegram" style={{width: '16px', height: '16px', filter: 'grayscale(100%)', opacity: 0.5}}/>
                            </button>
                        )}

                        {/*<button*/}
                        {/*    onClick={() => setShowNP(true)}*/}
                        {/*    title="Нова Пошта"*/}
                        {/*    style={{...buttonStyles.base, ...buttonStyles.iconButton}}*/}
                        {/*>*/}
                        {/*    НП*/}
                        {/*</button>*/}

                        <button
                            onClick={() => setShowPays(true)}
                            title="Платежі"
                            style={{...buttonStyles.base, ...buttonStyles.iconButton}}
                        >
                            <img src={pays} alt="Платежі" style={{width: '16px', height: '16px'}}/>
                        </button>

                        {/*<button*/}
                        {/*    onClick={() => setShowDocGenerate(true)}*/}
                        {/*    title="Генерувати документи"*/}
                        {/*    style={{...buttonStyles.base, ...buttonStyles.iconButton}}*/}
                        {/*>*/}
                        {/*    <img src={dockGenerate} alt="Документи" style={{width: '16px', height: '16px'}}/>*/}
                        {/*</button>*/}

                        <button
                            onClick={() => {
                                if (thisOrder.client && thisOrder.client.id) {
                                    window.open(`/client-files/${thisOrder.client.id}`, '_blank');
                                } else {
                                    setError('Спочатку виберіть клієнта');
                                }
                            }}
                            title="Файли клієнта"
                            style={{...buttonStyles.base, ...buttonStyles.iconButton}}
                        >
                            <img src={FilesButton} alt="Файли" style={{width: '16px', height: '16px'}}/>
                        </button>
                    </div>

                    {/*{thisOrder && (*/}
                    {/*    thisOrder.status === "Нове замовлення" ? (*/}
                    {/*        <button*/}
                    {/*            onClick={() => {*/}
                    {/*                // Логіка для взяття замовлення в роботу*/}
                    {/*                if (thisOrder && thisOrder.id) {*/}
                    {/*                    setLoad(true);*/}
                    {/*                    axios.post(`/orders/takeToWork/${thisOrder.id}`)*/}
                    {/*                        .then(response => {*/}
                    {/*                            setLoad(false);*/}
                    {/*                            setThisOrder(response.data);*/}
                    {/*                        })*/}
                    {/*                        .catch(error => {*/}
                    {/*                            setLoad(false);*/}
                    {/*                            if (error.response && error.response.status === 403) {*/}
                    {/*                                navigate('/login');*/}
                    {/*                            }*/}
                    {/*                            setError(error.message);*/}
                    {/*                            console.error(error.message);*/}
                    {/*                        });*/}
                    {/*                }*/}
                    {/*            }}*/}
                    {/*            title="Взяти в роботу"*/}
                    {/*            style={{*/}
                    {/*                ...buttonStyles.base,*/}
                    {/*                ...buttonStyles.takeWork,*/}
                    {/*                float: "right"*/}
                    {/*            }}*/}
                    {/*        >*/}
                    {/*            <i className="bi bi-briefcase me-1"></i> Взяти в роботу*/}
                    {/*        </button>*/}
                    {/*    ) : (*/}
                    {/*        <button*/}
                    {/*            disabled={thisOrder.status !== "Нове замовлення"}*/}
                    {/*            title={thisOrder.status !== "Нове замовлення" ? "Замовлення вже в роботі" : "Взяти в роботу"}*/}
                    {/*            style={{*/}
                    {/*                ...buttonStyles.base,*/}
                    {/*                ...buttonStyles.secondary,*/}
                    {/*                ...buttonStyles.actionButton,*/}
                    {/*                float: "right",*/}
                    {/*                cursor: 'default'*/}
                    {/*            }}*/}
                    {/*        >*/}
                    {/*            <i className="bi bi-briefcase me-1"></i>*/}
                    {/*            /!*{thisOrder.worker ? `В роботі: ${thisOrder.worker.firstName}` : "В роботі"}*!/*/}
                    {/*        </button>*/}
                    {/*    )*/}
                    {/*)}*/}
                </div>
            )}

            {/* Відображення помилки */}
            {error && (
                <div className="alert alert-danger alert-dismissible fade show mt-2" role="alert">
                    {error}
                    <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                </div>
            )}

            {/* Модальне вікно для вибору користувача */}
            <Modal show={show} onHide={handleClose} dialogClassName="modal-right" backgorund={"dark"} style={{borderRadius:'3vw'}}>
                <Modal.Header dialogClassName="Modal-Header" closeButton style={{background:"#f2f0e7", borderRadius: '1vw 1vw 0 0 ', fontSize:"1.2vmin", height: '3vh' }}>
                    <Modal.Title dialogClassName="Modal-Header" style={{fontSize:"1.5vmin", marginLeft:'0.3vw'}}>Вибір клієнта:</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor: "#f2f0e7", borderRadius: '0 0 1vw 1vw' , fontSize:"1.5vmin", }}>
                    {/* Відображення поточного клієнта якщо він обраний */}
                    {thisOrder.client && (
                        <div className="" style={{ background: '#f8f9fa', borderRadius: '1vw', position:'relative', padding:'1vh 0.8vw'}}>
                            <button
                                onClick={() => window.open(`/client/${thisOrder.client.id}`, '_blank')}
                                title="Відкрити профіль клієнта"
                                className="adminButtonAdd flex-right-center"
                                style={{
                                    // ...buttonStyles.base,
                                    // ...buttonStyles.primary,
                                    // ...buttonStyles.actionButton,
                                    // position: 'relative',
                                    position: 'absolute',
                                    top: '2vh',
                                    right: '1vw',
                                    background: "#3c60a6",

                                    display: 'flex',
                                    alignItems: 'flex-end'
                                    // boxShadow: "0vh 0vh 2vh #1351e6",
                                }}
                            >
                                Профіль клієнта
                            </button>
                            <div className="" >Поточний клієнт:</div>

                                <div className="" style={{width: "20vw"}}>
                                    <div className="d-flex">
                                       <div className="">
                                            <strong>ID:</strong> {thisOrder.client.id}
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="">
                                            <strong>Ім'я: </strong>{thisOrder.client.lastName} {thisOrder.client.firstName}  {thisOrder.client.familyName}
                                        </div>
                                    </div>
                                    {thisOrder.client.phoneNumber && (
                                        <div className="d-flex">

                                            <div className="">
                                                <strong className="">Телефон:</strong> {thisOrder.client.phoneNumber}
                                            </div>
                                        </div>
                                    )}

                                    {thisOrder.client.email && (
                                        <div className="d-flex ">
                                            <div className="">
                                                <strong>Email:</strong> {thisOrder.client.email}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    {thisOrder.client.address && (
                                        <div className="d-flex">
                                            <div className="">
                                                <strong>Адреса:</strong> {thisOrder.client.address}
                                            </div>
                                        </div>
                                    )}
                                    {thisOrder.client.discount && (
                                        <div className="d-flex">
                                            <div>
                                                <strong>Знижка:</strong> <span
                                                className="text-success">{thisOrder.client.discount}%</span>
                                            </div>
                                        </div>
                                    )}
                                    {thisOrder.client.telegram && (
                                        <div className="d-flex">
                                           <div>
                                                <strong>Telegram:</strong> @{thisOrder.client.telegram}
                                            </div>
                                        </div>
                                    )}
                                    {thisOrder.client.notes && (
                                        <div className="d-flex">
                                            <div>
                                                <strong>Нотатки:</strong> {thisOrder.client.notes}
                                            </div>
                                        </div>
                                    )}
                                </div>


                            {/* Кнопки для взаємодії з поточним клієнтом */}
                            <div className="d-flex flex-wrap" style={{marginTop: '1vh'}}>
                                {thisOrder.client.phoneNumber && (
                                    <>
                                        <button
                                            onClick={() => openMessenger('viber')}
                                            title="Viber"
                                            style={{...buttonStyles.base, ...buttonStyles.iconButton}}
                                        >
                                            <img src={viberlogo} alt="Viber" style={{width: '2vh', height: '2vh'}}/>
                                        </button>

                                        <button
                                            onClick={() => openMessenger('whatsapp')}
                                            title="WhatsApp"
                                            style={{...buttonStyles.base, ...buttonStyles.iconButton}}
                                        >
                                            <img src={whatsapplogo} alt="WhatsApp"
                                                 style={{width: '2vh', height: '2vh'}}/>
                                        </button>

                                        <button
                                            onClick={() => openMessenger('signal')}
                                            title="Signal"
                                            style={{...buttonStyles.base, ...buttonStyles.iconButton}}
                                        >
                                            <img src={signallogo} alt="Signal" style={{width: '2vh', height: '2vh'}}/>
                                        </button>
                                    </>
                                )}

                                {thisOrder.client.telegram && (
                                    <button
                                        onClick={() => openMessenger('telegram')}
                                        title="Telegram"
                                        style={{...buttonStyles.base, ...buttonStyles.iconButton}}
                                    >
                                        <img src={telegram} alt="Telegram" style={{width: '2vh', height: '2vh'}}/>
                                    </button>
                                )}


                            </div>
                            <button
                                onClick={handleAddNewUser}
                                className="adminButtonAdd flex-right-center"
                                style={{
                                    position: 'absolute',
                                    bottom: '2vh',
                                    right: '1vw',
                                    display: 'flex',
                                    alignItems: 'flex-end'
                                }}
                            >

                                Створити нового
                            </button>
                        </div>
                    )}

                    {/* Пошук клієнтів */}
                    <div className="mb-3">
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Пошук за ім'ям, прізвищем, номером телефону або email..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                style={{
                                    marginRight: "0.5vw",
                                    boxShadow: "0vh 0vh 4vh #ffffff"
                                }}
                            />

                            <button
                                onClick={fetchUsers}
                                style={{...buttonStyles.base,
                                    height: '4vh',
                                    fontSize: '2vh',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: "transparent",
                                    // boxShadow: "0vh 0vh 2vh #5a81bc",
                                    color: '#5a81bc',
                                    marginRight: "0.5vw",
                            }}
                                className=""
                            >
                                <i className="bi bi-search"></i>
                                🔄
                            </button>

                        </InputGroup>
                    </div>

                    {/* Відображення списку користувачів */}
                    {load ? (
                        <div className="" style={{height: '48vh', overflowY: 'auto', boxShadow: "0vh 0vh 2vh #ffffff",
                            color: "#ffffff", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Spinner animation="border" variant="primary"/>
                        </div>
                    ) : error ? (
                        <div className="" style={{height: '48vh', overflowY: 'auto', boxShadow: "0vh 0vh 2vh #ffffff",
                            color: "#ffffff"}}>{error}</div>
                    ) : (
                        <div className="user-list" style={{height: '48vh', overflowY: 'auto', boxShadow: "0vh 0vh 2vh #ffffff",
                        color: "#ffffff"}}>
                            {users.rows && users.rows.length > 0 ? (
                                <ListGroup>
                                    {users.rows.map((user) => (
                                        <ListGroup.Item
                                            key={user.id}
                                            action
                                            onClick={() => handleSelectUser(user.id)}
                                            className={`d-flex justify-content-between align-items-start ${thisOrder.client && thisOrder.client.id === user.id ? 'border-primary' : ''}`}
                                        >
                                            <div className="ms-2 me-auto w-100">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="fw-bold d-flex align-items-center">
                                                            <i className="bi bi-person-circle me-2"></i>
                                                            {user.firstName} {user.lastName} {user.familyName}
                                                        </div>
                                                        <div style={{fontSize: '0.85rem'}}>
                                                            <div><i
                                                                className="bi bi-person-badge me-1"></i> ID: {user.id}
                                                            </div>
                                                            {user.phoneNumber && <div><i
                                                                className="bi bi-telephone me-1"></i> {user.phoneNumber}
                                                            </div>}
                                                            {user.email && <div><i
                                                                className="bi bi-envelope me-1"></i> {user.email}</div>}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div style={{fontSize: '0.85rem'}}>
                                                            {user.address && <div><i
                                                                className="bi bi-geo-alt me-1"></i> {user.address}
                                                            </div>}
                                                            {user.telegram && <div><i
                                                                className="bi bi-telegram me-1"></i> {user.telegram}
                                                            </div>}
                                                            {user.discount > 0 &&
                                                                <div><i className="bi bi-percent me-1"></i> <span
                                                                    className="text-success">Знижка: {user.discount}%</span>
                                                                </div>}
                                                            {user.notes &&
                                                                <div><i className="bi bi-sticky me-1"></i> {user.notes}
                                                                </div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {thisOrder.client && thisOrder.client.id === user.id && (
                                                <span className="badge bg-primary rounded-pill" style={{boxShadow: "0vh 0vh 1vh #0b2e83"}}>Обрано</span>
                                            )}
                                            {thisOrder.executor && thisOrder.executor.id === user.id && (
                                                <span className="badge bg-success rounded-pill" style={{
                                                    boxShadow: "0vh 0vh 1vh #226012",
                                                }}>Це ви</span>
                                            )}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            ) : (
                                <div className="text-center p-4 bg-light rounded">
                                    <p>Немає клієнтів за даним запитом</p>
                                    <button
                                        onClick={handleAddNewUser}
                                        style={{
                                            ...buttonStyles.base,
                                            ...buttonStyles.createNew
                                        }}
                                    >
                                        <i className="bi bi-plus-circle me-1"></i>
                                        Створити нового клієнта
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </Modal.Body>
                {/*<Modal.Footer style={{backgroundColor: '#F2F0E7', borderRadius: '0 0 1vw 1vw', fontSize: "1.2vmin", height: '7.5vh' }}>*/}
                {/*    <button*/}
                {/*        onClick={handleClose}*/}
                {/*        style={{*/}
                {/*            ...buttonStyles.base,*/}
                {/*            ...buttonStyles.close,*/}
                {/*            position: "relative",*/}


                {/*        }}*/}
                {/*    >*/}
                {/*        Скасувати*/}
                {/*    </button>*/}
                {/*    {thisOrder.client && (*/}
                {/*        <button*/}
                {/*            onClick={() => handleSelectUser(null)}*/}
                {/*            style={{*/}
                {/*                ...buttonStyles.base,*/}
                {/*                ...buttonStyles.delete,*/}
                {/*                // color: '#d57272',*/}
                {/*                boxShadow: "0vh 0vh 2vh #d57272",*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            Видалити вибір*/}
                {/*        </button>*/}
                {/*    )}*/}
                {/*</Modal.Footer>*/}
            </Modal>

            {/* Модальне вікно для додавання нового користувача */}
            <AddUserWindow
                show={showAddUser}
                onHide={() => setShowAddUser(false)}
                onUserAdded={handleUserAdded}
            />

            {/* Інші модальні вікна, які можуть бути потрібні */}
            {/*{showNP && <NP show={showNP} onHide={() => setShowNP(false)}/>}*/}
            {showPays && <PaysInOrderRestored showPays={showPays} setShowPays={setShowPays} thisOrder={thisOrder} setThisOrder={setThisOrder}/>}


            {/* Модальне вікно для генерації документів */}
            <Modal
                show={showDocGenerate}
                onHide={() => setShowDocGenerate(false)}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Генерація документів</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!thisOrder.client ? (
                        <div className="alert alert-warning">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            Спочатку виберіть клієнта для можливості генерації документів
                        </div>
                    ) : (
                        <div className="row g-3">
                            <div className="col-md-6">
                                <div className="card h-100">
                                    <div className="card-body text-center">
                                        <img src={whiteSVG} alt="Договір"
                                             style={{width: '64px', height: '64px', marginBottom: '15px'}}/>
                                        <h5 className="card-title">Договір</h5>
                                        <p className="card-text">Створення договору для замовлення</p>
                                        <button
                                            onClick={() => {
                                                // Логіка для генерації договору
                                                if (thisOrder && thisOrder.id) {
                                                    window.open(`/api/documents/contract/${thisOrder.id}`, '_blank');
                                                }
                                            }}
                                            style={{
                                                ...buttonStyles.base,
                                                ...buttonStyles.primary,
                                                width: '100%'
                                            }}
                                        >
                                            <i className="bi bi-file-earmark-text me-2"></i>
                                            Згенерувати договір
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="card h-100">
                                    <div className="card-body text-center">
                                        <img src={barcode} alt="Накладна"
                                             style={{width: '64px', height: '64px', marginBottom: '15px'}}/>
                                        <h5 className="card-title">Накладна</h5>
                                        <p className="card-text">Створення накладної для замовлення</p>
                                        <button
                                            onClick={() => {
                                                // Логіка для генерації накладної
                                                if (thisOrder && thisOrder.id) {
                                                    window.open(`/api/documents/invoice/${thisOrder.id}`, '_blank');
                                                }
                                            }}
                                            style={{
                                                ...buttonStyles.base,
                                                ...buttonStyles.primary,
                                                width: '100%'
                                            }}
                                        >
                                            <i className="bi bi-receipt me-2"></i>
                                            Згенерувати накладну
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="card h-100">
                                    <div className="card-body text-center">
                                        <img src={profile} alt="Акт"
                                             style={{width: '64px', height: '64px', marginBottom: '15px'}}/>
                                        <h5 className="card-title">Акт виконаних робіт</h5>
                                        <p className="card-text">Створення акту виконаних робіт</p>
                                        <button
                                            onClick={() => {
                                                // Логіка для генерації акту
                                                if (thisOrder && thisOrder.id) {
                                                    window.open(`/api/documents/act/${thisOrder.id}`, '_blank');
                                                }
                                            }}
                                            style={{
                                                ...buttonStyles.base,
                                                ...buttonStyles.primary,
                                                width: '100%'
                                            }}
                                        >
                                            <i className="bi bi-file-check me-2"></i>
                                            Згенерувати акт
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="card h-100">
                                    <div className="card-body text-center">
                                        <img src={www} alt="Рахунок-фактура"
                                             style={{width: '64px', height: '64px', marginBottom: '15px'}}/>
                                        <h5 className="card-title">Рахунок-фактура</h5>
                                        <p className="card-text">Створення рахунку-фактури для замовлення</p>
                                        <button
                                            onClick={() => {
                                                // Логіка для генерації рахунку-фактури
                                                if (thisOrder && thisOrder.id) {
                                                    window.open(`/api/documents/invoice-print/${thisOrder.id}`, '_blank');
                                                    setShowDocGenerate(false);
                                                }
                                            }}
                                            style={{
                                                ...buttonStyles.base,
                                                ...buttonStyles.primary,
                                                width: '100%'
                                            }}
                                        >
                                            <i className="bi bi-cash-coin me-2"></i>
                                            Згенерувати рахунок
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <button
                        onClick={() => setShowDocGenerate(false)}
                        style={{...buttonStyles.base, ...buttonStyles.close}}
                    >
                        Закрити
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ClientChangerUIArtem;
