import React, { useEffect, useState } from "react";
import axios from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import {Spinner} from "react-bootstrap";

function AddPaysInOrder({ showAddPay, setShowAddPay, thisOrder, setThisOrder }) {
    const [load, setLoad] = useState(false);
    const [data, setData] = useState(null);
    const [formData, setFormData] = useState({
        // Дані відправника (обов'язкові)
        SenderWarehouseIndex: '',    //Цифрова адреса відділення відправника
        // senderCity: 'Київ',         // Обов'язкове: місто відправника (наприклад, "Київ" або GUID міста)
        CitySender: 'Київ',         // Обов'язкове: місто відправника (наприклад, "Київ" або GUID міста)
        // CitySender: '8d5a980d-391c-11dd-90d9-001a92567626',         // Обов'язкове: місто відправника (наприклад, "Київ" або GUID міста)
        // Sender: '',             // Обов'язкове: GUID відділення-відправника
        SenderAddress: '',      // Опційне: адреса відправника (потрібно для адресної доставки)
        SendersPhone: '+38 065 666 66 67',       // Опційне: телефон відправника
    });
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [inPageCount, setInPageCount] = useState(500);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(null);
    const [typeSelect, setTypeSelect] = useState("");
    const [thisColumn, setThisColumn] = useState({
        column: "id",
        reverse: true
    });
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleClose = () => {
        setIsAnimating(false); // Начинаем анимацию закрытия
        setTimeout(() => {
            setIsVisible(false)
            setShowAddPay(false);
        }, 300); // После завершения анимации скрываем модальное окно
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // useEffect(() => {
    //     let data = {
    //         inPageCount: inPageCount,
    //         currentPage: currentPage,
    //         search: typeSelect,
    //         columnName: thisColumn,
    //         startDate: startDate,
    //         endDate: endDate,
    //         clientId: thisOrder.clientId,
    //     };
    //     setLoad(true);
    //     axios.post(`/user/getPayments`, data)
    //         .then(response => {
    //             // console.log(response.data);
    //             setData(response.data);
    //             setError(null);
    //             setLoad(false);
    //             setPageCount(Math.ceil(response.data.count / inPageCount));
    //         })
    //         .catch(error => {
    //             if (error.response.status === 403) {
    //                 navigate('/login');
    //             }
    //             setError(error.message);
    //             setLoad(false);
    //         });
    // }, [typeSelect, thisColumn, startDate, endDate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

    };

    useEffect(() => {
        if (showAddPay) {
            setIsVisible(true); // Сначала показываем модальное окно
            setTimeout(() => setIsAnimating(true), 100); // После короткой задержки запускаем анимацию появления
        } else {
            setIsAnimating(false); // Начинаем анимацию закрытия
            setTimeout(() => setIsVisible(false), 300); // После завершения анимации скрываем модальное окно
        }
    }, [showAddPay]);

    return (
        <div>
            <div className="" onClick={handleClose} style={{
                width: "100vw",
                zIndex: "101",
                height: "100vh",
                background: "rgba(0, 0, 0, 0.2)",
                opacity: isAnimating ? 1 : 0, // для анимации прозрачности
                transition: "opacity 0.3s ease-in-out", // плавная анимация
                position: "fixed",
                left: "0",
                bottom: "0"
            }}>
            </div>
            <div style={{
                zIndex: "101",
                display: "flex",
                flexDirection: "column",
                position: "fixed",
                backgroundColor: '#f2efe8',
                left: "50%",
                top: "50%",
                transform: isAnimating ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0.8)", // анимация масштаба
                opacity: isAnimating ? 1 : 0, // анимация прозрачности
                transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out", // плавная анимация
                borderRadius: "1vw",
                width: "50vw",
                // height: "50vh",
                cursor: "auto",
            }}>
                <div className="d-flex">
                    <div className="m-auto text-center fontProductName ">
                        Реквізити
                    </div>
                    <div
                        className="btn btn-close btn-lg"
                        style={{
                            margin: "0.5vw",
                        }}
                        onClick={handleClose}
                    >
                    </div>
                </div>
                <div style={{
                    border: "none",
                    borderRadius: "1vw",
                    marginTop: "0.3vw",
                    marginLeft: "0.3vw",
                }}>

                    <div style={{padding: "1vw"}}>
                        {error && (
                            <div>{error}</div>
                        )}
                        {load && (
                            <div className="d-flex justify-content-center align-items-center" style={{height: "100%"}}><Spinner animation="border" className="mainLoader" variant="dark" /></div>
                        )}
                        <form onSubmit={handleSubmit} className="">
                            <label className="adminFont">
                                Тип:
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className=""
                                    required
                                >
                                    <option value="">Выберите тип</option>
                                    <option value="ФОП">ФОП</option>
                                    <option value="ТОВ">ТОВ</option>
                                    <option value="ГО">ГО</option>
                                </select>
                            </label>

                            <label className="adminFont">
                                Название компании:
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    required
                                    className=""
                                />
                            </label>

                            <label className="adminFont">
                                ИНН:
                                <input
                                    type="text"
                                    name="inn"
                                    value={formData.inn}
                                    onChange={handleChange}
                                    required
                                    className=""
                                />
                            </label>

                            {/* Добавить остальные поля по аналогии */}

                            <button type="submit" className="requisiteFormButton">Сохранить</button>
                        </form>
                        <div style={{}}>
                            <span className="adminFont">Місто</span>
                            <input
                                style={{}}
                                type="text"
                                name="CitySender"
                                placeholder="Місто відправника"
                                value={formData.CitySender}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div style={{}}>
                            <span className="adminFont">Відправник</span>
                            <input
                                style={{}}
                                type="text"
                                name="Sender"
                                placeholder="Відправник"
                                value={formData.Sender}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddPaysInOrder;
