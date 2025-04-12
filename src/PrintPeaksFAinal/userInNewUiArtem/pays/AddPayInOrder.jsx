import React, { useEffect, useState } from "react";
import axios from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import {Spinner} from "react-bootstrap";
import "./styles.css"

function AddPaysInOrder({ showAddPay, setShowAddPay, thisOrder, setThisOrder }) {
    const [load, setLoad] = useState(false);
    const [data, setData] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        bankName: '',
        iban: '',
        edrpou: '',
        email: '',
        phone: '',
        taxSystem: '',
        comment: '',
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
                        {!load && (
                            // <form className="AddPaysInOrderContainer">
                            //     <h2 className="AddPaysInOrderTitle">Створення рахунку на оплату</h2>
                            //
                            //     <div className="AddPaysInOrderRow">
                            //         <div className="AddPaysInOrderField">
                            //             <label htmlFor="docNumber">Номер документа</label>
                            //             <input id="docNumber" type="text" value="02" className="AddPaysInOrderInput" />
                            //         </div>
                            //
                            //         <div className="AddPaysInOrderField">
                            //             <label htmlFor="ownRequisites">Власні реквізити</label>
                            //             <div className="AddPaysInOrderInputWithButton">
                            //                 <select id="ownRequisites" className="AddPaysInOrderSelect" />
                            //                 <button className="AddPaysInOrderAddBtn">+</button>
                            //             </div>
                            //         </div>
                            //     </div>
                            //
                            //     <div className="AddPaysInOrderRow">
                            //         <div className="AddPaysInOrderField">
                            //             <label htmlFor="docDate">Дата акта</label>
                            //             <input id="docDate" type="text" value="12-04-2025" className="AddPaysInOrderInput" />
                            //         </div>
                            //
                            //         <div className="AddPaysInOrderField">
                            //             <label htmlFor="contractor">Контрагент</label>
                            //             <div className="AddPaysInOrderInputWithButton">
                            //                 <select id="contractor" className="AddPaysInOrderSelect" />
                            //                 <button className="AddPaysInOrderAddBtn">+</button>
                            //             </div>
                            //         </div>
                            //     </div>
                            //
                            //     <div className="AddPaysInOrderRow">
                            //         <div className="AddPaysInOrderFieldLarge">
                            //             <label htmlFor="note">Додаткова примітка</label>
                            //             <input id="note" type="text" placeholder="Введіть примітку" className="AddPaysInOrderInput" />
                            //         </div>
                            //
                            //         <div className="AddPaysInOrderField">
                            //             <label htmlFor="paymentPurpose">Призначення платежу</label>
                            //             <input
                            //                 id="paymentPurpose"
                            //                 type="text"
                            //                 value="Оплата рахунку 0204"
                            //                 className="AddPaysInOrderInput"
                            //             />
                            //         </div>
                            //     </div>
                            //
                            //     <div className="AddPaysInOrderSearchRow">
                            //         <input type="text" placeholder="Пошук..." className="AddPaysInOrderSearchInput" />
                            //         <button className="AddPaysInOrderAddBtn">+</button>
                            //     </div>
                            //
                            //     <div className="AddPaysInOrderTableHeader">
                            //         <span>Код товару</span>
                            //         <span>Назва</span>
                            //         <span>Од. вим.</span>
                            //         <span>Кількість</span>
                            //         <span>Ціна</span>
                            //         <span>Сума</span>
                            //     </div>
                            //
                            //     <div className="AddPaysInOrderTableRow">
                            //         <input type="checkbox" checked readOnly />
                            //         <span>00001</span>
                            //         <span>Практикум для дітей та підлітків “ТВОЯ СИЛА”</span>
                            //         <span>шт</span>
                            //         <input type="number" value={1} className="AddPaysInOrderQtyInput" />
                            //         <span>325.00 грн</span>
                            //         <span>325.00</span>
                            //     </div>
                            //
                            //     <div className="AddPaysInOrderSubmit">
                            //         <button type="submit" className="AddPaysInOrderSubmitBtn">Далі</button>
                            //     </div>
                            // </form>
                            // <form onSubmit={handleSubmit} className="d-flex flex-column">
                            //     Банківські реквізити:
                            //     <label className="adminFont">
                            //         Найменування:
                            //         <input
                            //             type="text"
                            //             name="name"
                            //             placeholder="Найменування ФОП або ТОВ"
                            //             value={formData.name}
                            //             onChange={handleChange}
                            //             required
                            //         />
                            //     </label>
                            //
                            //     <label className="adminFont">
                            //         Адреса:
                            //         <input
                            //             type="text"
                            //             name="address"
                            //             placeholder="Адреса"
                            //             value={formData.address}
                            //             onChange={handleChange}
                            //         />
                            //     </label>
                            //
                            //     <label className="adminFont">
                            //         Назва банку:
                            //         <input
                            //             type="text"
                            //             name="bankName"
                            //             placeholder="Назва банку"
                            //             value={formData.bankName}
                            //             onChange={handleChange}
                            //         />
                            //     </label>
                            //
                            //     <label className="adminFont">
                            //         IBAN:
                            //         <input
                            //             type="text"
                            //             name="iban"
                            //             placeholder="IBAN"
                            //             value={formData.iban}
                            //             onChange={handleChange}
                            //         />
                            //     </label>
                            //
                            //     <label className="adminFont">
                            //         ЄДРПОУ:
                            //         <input
                            //             type="text"
                            //             name="edrpou"
                            //             placeholder="ЄДРПОУ"
                            //             value={formData.edrpou}
                            //             onChange={handleChange}
                            //         />
                            //     </label>
                            //
                            //     <label className="adminFont">
                            //         E-mail:
                            //         <input
                            //             type="email"
                            //             name="email"
                            //             placeholder="example@mail.com"
                            //             value={formData.email}
                            //             onChange={handleChange}
                            //         />
                            //     </label>
                            //
                            //     <label className="adminFont">
                            //         Номер телефону:
                            //         <input
                            //             type="tel"
                            //             name="phone"
                            //             placeholder="+380 111 111 111"
                            //             value={formData.phone}
                            //             onChange={handleChange}
                            //         />
                            //     </label>
                            //
                            //     Система оподаткування та Опис
                            //     <label className="adminFont">
                            //         Система оподаткування:
                            //         <select
                            //             name="taxSystem"
                            //             value={formData.taxSystem}
                            //             onChange={handleChange}
                            //         >
                            //             <option value="">Оберіть систему оподаткування</option>
                            //             <option value="1 група">1 група</option>
                            //             <option value="2 група">2 група</option>
                            //             <option value="3 група">3 група</option>
                            //             <option value="3 група із ПДВ">3 група із ПДВ</option>
                            //             <option value="4 група">4 група</option>
                            //             <option value="загальна система без ПДВ">загальна система без ПДВ</option>
                            //             <option value="загальна система із ПДВ">загальна система із ПДВ</option>
                            //             <option value="Дія.Сіті">Дія.Сіті</option>
                            //             <option value="Неприбуткова організація">Неприбуткова організація</option>
                            //         </select>
                            //     </label>
                            //
                            //     <label className="adminFont">
                            //         Коментар:
                            //         <textarea
                            //             name="comment"
                            //             value={formData.comment}
                            //             onChange={handleChange}
                            //         />
                            //     </label>
                            //
                            //     <button type="submit" className="requisiteFormButton">Зберегти</button>
                            // </form>
                            <form className="AddContractorInOrderContainer">
                                <h2 className="AddContractorInOrderTitle">Додати контрагента</h2>

                                <div className="AddContractorInOrderTabs">
                                    <button className="AddContractorInOrderTab AddContractorInOrderTabActive">Українська Компанія</button>
                                    <button className="AddContractorInOrderTab">Іноземна Компанія</button>
                                </div>

                                <h3 className="AddContractorInOrderSubtitle">Банківські реквізити:</h3>

                                <div className="AddContractorInOrderFieldGroup">
                                    <input type="text" placeholder="Найменування ФОП або ТОВ" className="AddContractorInOrderInput" />
                                    <input type="text" placeholder="Адреса" className="AddContractorInOrderInput" />
                                    <input type="text" placeholder="Назва банку" className="AddContractorInOrderInput" />
                                    <input type="text" placeholder="UA 123456789 123456789123456" className="AddContractorInOrderInput" />
                                    <input type="text" placeholder="123456789" className="AddContractorInOrderInput" />
                                </div>

                                <h3 className="AddContractorInOrderSubtitle">Контакти:</h3>

                                <div className="AddContractorInOrderFieldGroup">
                                    <input type="email" placeholder="example@mail.com" className="AddContractorInOrderInput" />
                                    <input type="text" placeholder="Номер телефону: +380 111 111 111" className="AddContractorInOrderInput" />
                                </div>

                                <h3 className="AddContractorInOrderSubtitle">Система оподаткування та Опис</h3>

                                <div className="AddContractorInOrderFieldGroup">
                                    <select className="AddContractorInOrderSelect">
                                        <option value="">Оберіть систему оподаткування</option>
                                    </select>
                                    <textarea placeholder="Залиште коментар" className="AddContractorInOrderTextarea" />
                                </div>

                                <div className="AddContractorInOrderSubmitBlock">
                                    <button type="submit" className="AddContractorInOrderSubmitBtn">Додати</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddPaysInOrder;
