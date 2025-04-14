import React, { useEffect, useState } from "react";
import axios from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import {Spinner} from "react-bootstrap";
import "./styles.css"
import AddPaysInOrder from "./AddPayInOrder";

function PaysInOrder({ showPays, setShowPays, thisOrder, setThisOrder }) {
    const [load, setLoad] = useState(false);
    const [data, setData] = useState(null);
    const [showAddPay, setShowAddPay] = useState(false);
    const [showAddPayView, setShowAddPayView] = useState(false);
    const [showAddPayWriteId, setShowAddPayWriteId] = useState(false);
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
            setShowPays(false);
        }, 300); // После завершения анимации скрываем модальное окно
    }

    const openAddPay = () => {
        setShowAddPay(!showAddPay)
        setShowAddPayView(false)
        setFormData({
            name: "",
            address: "",
            bankName: "",
            iban: "",
            edrpou: "",
            email: "",
            phone: "",
            taxSystem: "",
            comment: "",
        })
    };

    const openSeePay = (e, item) => {
        setShowAddPay(!showAddPay)
        setShowAddPayView(true)
        setShowAddPayWriteId(item.id)
        setFormData({
                name: item.name,
                address: item.address,
                bankName: item.bankName,
                iban: item.iban,
                edrpou: item.edrpou,
                email: item.email,
                phone: item.phone,
                taxSystem: item.taxSystem,
                comment: item.comment,
        })
    };

    const generateDoc = (e, item) => {
        let dataToSend = {
            contractorId: item.id,
            thisOrderId: thisOrder.id,
        };
        axios.post(`/user/generateDoc`, dataToSend, {
            responseType: 'blob',
        })
            .then(response => {
                console.log(response.data);
                setError(null);
                setLoad(false);
                setShowAddPay(false)
                const contentDisposition = response.headers['content-disposition'];
                let fileName = 'invoice.docx'; // За замовчуванням
                if (contentDisposition) {
                    const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                    if (fileNameMatch.length === 2) fileName = fileNameMatch[1];
                }

                // Створюємо тимчасовий URL і клікаємо по ньому
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);
                // setPageCount(Math.ceil(response.data.count / inPageCount));
            })
            .catch(error => {
                if (error.response.status === 403) {
                    navigate('/login');
                }
                setError(error.message);
                setLoad(false);
            });
    };

    useEffect(() => {
        let data = {
            inPageCount: inPageCount,
            currentPage: currentPage,
            search: typeSelect,
            columnName: thisColumn,
            startDate: startDate,
            endDate: endDate,
            clientId: thisOrder.clientId,
        };
        setLoad(true);
        axios.post(`/user/getPayments`, data)
            .then(response => {
                console.log(response.data);
                setData(response.data.rows);
                setError(null);
                setLoad(false);
                setPageCount(Math.ceil(response.data.count / inPageCount));
            })
            .catch(error => {
                if (error.response.status === 403) {
                    navigate('/login');
                }
                setError(error.message);
                setLoad(false);
            });
    }, [typeSelect, thisColumn, startDate, endDate]);

    useEffect(() => {
        if (showPays) {
            setIsVisible(true); // Сначала показываем модальное окно
            setTimeout(() => setIsAnimating(true), 100); // После короткой задержки запускаем анимацию появления
        } else {
            setIsAnimating(false); // Начинаем анимацию закрытия
            setTimeout(() => setIsVisible(false), 300); // После завершения анимации скрываем модальное окно
        }
    }, [showPays]);

    return (
        <div>
            <div className="" onClick={handleClose} style={{
                width: "100vw",
                zIndex: "100",
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
                zIndex: "100",
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
                width: "95vw",
                height: "95vh",
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
                        <table className="ContractorTable">
                            <thead>
                            <tr className="ContractorRow" style={{}}>
                                <th>Номер</th>
                                <th>Найменування</th>
                                <th>taxSystem</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {data && (
                                <>
                                    {data.map((item, itr) => {
                                        return (
                                            <tr className="ContractorRow">
                                                <td className="ContractorCell">{itr+1}</td>
                                                <td className="ContractorCell ContractorName">{item.name}</td>
                                                <td className="ContractorCell ContractorName">{item.taxSystem}</td>
                                                <td className="ContractorCell ContractorActions">
                                                    <button className="ContractorViewBtn" style={{background: "green"}} onClick={(event) => generateDoc(event, item)}>Генерувати докі</button>
                                                    <button className="ContractorViewBtn" onClick={(event) => openSeePay(event, item)}>Переглянути/Редагувати</button>
                                                    <button className="ContractorMoreBtn">⋮</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </>
                            )}
                            </tbody>
                        </table>
                        {/*{data && (*/}
                        {/*    <>*/}
                        {/*        {data.rows.map(order => {*/}
                        {/*            return (*/}
                        {/*                <div key={order.id}>*/}
                        {/*                    <div className="CustomOrderTable-row">*/}
                        {/*                        /!* Використання класів відповідно до HTML *!/*/}
                        {/*                        <div className="CustomOrderTable-cell">{order.id}</div>*/}
                        {/*                        <div className="CustomOrderTable-cell">{order.name}</div>*/}
                        {/*                        /!*<div className="CustomOrderTable-cell">{order.address}</div>*!/*/}
                        {/*                        /!*<div className="CustomOrderTable-cell">{order.bankName}</div>*!/*/}
                        {/*                        /!*<div className="CustomOrderTable-cell">{order.iban}</div>*!/*/}
                        {/*                        /!*<div className="CustomOrderTable-cell">{order.edrpou}</div>*!/*/}
                        {/*                        /!*<div className="CustomOrderTable-cell">{order.email}</div>*!/*/}
                        {/*                        /!*<div className="CustomOrderTable-cell">{order.phone}</div>*!/*/}
                        {/*                        /!*<div className="CustomOrderTable-cell">{order.taxSystem}</div>*!/*/}
                        {/*                        /!*<div className="CustomOrderTable-cell">{order.comment}</div>*!/*/}
                        {/*                        /!*<div className="CustomOrderTable-cell">{order.userId}</div>*!/*/}
                        {/*                        <div className="CustomOrderTable-cell">*/}
                        {/*                            {`${new Date(order.createdAt).toLocaleDateString()} ${new Date(order.createdAt).toLocaleTimeString()}`}*/}
                        {/*                        </div>*/}
                        {/*                        <div className="CustomOrderTable-cell">*/}
                        {/*                            {order.updatedAt*/}
                        {/*                                ? `${new Date(order.updatedAt).toLocaleDateString()} ${new Date(order.updatedAt).toLocaleTimeString()}`*/}
                        {/*                                : '—'}*/}
                        {/*                        </div>*/}
                        {/*                    </div>*/}
                        {/*                </div>*/}
                        {/*            );*/}
                        {/*        })}*/}
                        {/*    </>*/}
                        {/*)}*/}
                        <button className="ContractorViewBtn" onClick={openAddPay}>Додати контрагента</button>
                        {showAddPay &&
                            <div style={{ }} className="">
                                <AddPaysInOrder
                                    showAddPay={showAddPay}
                                    setShowAddPay={setShowAddPay}
                                    formData={formData}
                                    setFormData={setFormData}
                                    thisOrder={thisOrder}
                                    setThisOrder={setThisOrder}
                                    data={data}
                                    setData={setData}
                                    showAddPayView={showAddPayView}
                                    setShowAddPayView={setShowAddPayView}
                                    showAddPayWriteId={showAddPayWriteId}
                                    setShowAddPayWriteId={setShowAddPayWriteId}
                                />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaysInOrder;
