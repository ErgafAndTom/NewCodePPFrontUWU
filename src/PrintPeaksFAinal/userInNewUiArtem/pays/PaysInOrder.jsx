// import React, { useEffect, useState } from "react";
// import axios from "../../../api/axiosInstance";
// import { useNavigate } from "react-router-dom";
// import {Spinner} from "react-bootstrap";
import "./styles.css"
import AddPaysInOrder from "./AddPayInOrder";
import ModalDeleteOrder from "../../Orders/ModalDeleteOrder";

// function PaysInOrder({ showPays, setShowPays, thisOrder, setThisOrder }) {
//     const [load, setLoad] = useState(false);
//     const [data, setData] = useState(null);
//
//     const [thisOrderForDelete, setThisOrderForDelete] = useState(null);
//     const [showDeleteOrderModal, setShowDeleteOrderModal] = useState(false);
//
//     const [showAddPay, setShowAddPay] = useState(false);
//     const [showAddPayView, setShowAddPayView] = useState(false);
//     const [showAddPayWriteId, setShowAddPayWriteId] = useState(false);
//     const [formData, setFormData] = useState({
//         name: '',
//         address: '',
//         bankName: '',
//         iban: '',
//         edrpou: '',
//         email: '',
//         phone: '',
//         taxSystem: '',
//         comment: '',
//     });
//     const [result, setResult] = useState(null);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();
//     const [isVisible, setIsVisible] = useState(false);
//     const [isAnimating, setIsAnimating] = useState(false);
//     const [inPageCount, setInPageCount] = useState(500);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [pageCount, setPageCount] = useState(null);
//     const [typeSelect, setTypeSelect] = useState("");
//     const [thisColumn, setThisColumn] = useState({
//         column: "id",
//         reverse: true
//     });
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');
//
//     const handleClose = () => {
//         setIsAnimating(false); // Начинаем анимацию закрытия
//         setTimeout(() => {
//             setIsVisible(false)
//             setShowPays(false);
//         }, 300); // После завершения анимации скрываем модальное окно
//     }
//
//     const openAddPay = () => {
//         setShowAddPay(!showAddPay)
//         setShowAddPayView(false)
//         setFormData({
//             name: "",
//             address: "",
//             bankName: "",
//             iban: "",
//             edrpou: "",
//             email: "",
//             phone: "",
//             taxSystem: "",
//             comment: "",
//         })
//     };
//
//     const openSeePay = (e, item) => {
//         setShowAddPay(!showAddPay)
//         setShowAddPayView(true)
//         setShowAddPayWriteId(item.id)
//         setFormData({
//                 name: item.name,
//                 address: item.address,
//                 bankName: item.bankName,
//                 iban: item.iban,
//                 edrpou: item.edrpou,
//                 email: item.email,
//                 phone: item.phone,
//                 taxSystem: item.taxSystem,
//                 comment: item.comment,
//         })
//     };
//
//     const openDeletePay = (e, item) => {
//         // setShowAddPay(!showAddPay)
//         setShowDeleteOrderModal(true)
//         setThisOrderForDelete(item)
//     };
//
//     const generateDoc = (e, item) => {
//         let dataToSend = {
//             contractorId: item.id,
//             thisOrderId: thisOrder.id,
//         };
//         axios.post(`/user/generateDoc`, dataToSend, {
//             responseType: 'blob',
//         })
//             .then(response => {
//                 console.log(response.data);
//                 setError(null);
//                 setLoad(false);
//                 setShowAddPay(false)
//                 const contentDisposition = response.headers['content-disposition'];
//                 let fileName = 'invoice.docx'; // За замовчуванням
//                 if (contentDisposition) {
//                     const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
//                     if (fileNameMatch.length === 2) fileName = fileNameMatch[1];
//                 }
//
//                 // Створюємо тимчасовий URL і клікаємо по ньому
//                 const url = window.URL.createObjectURL(new Blob([response.data]));
//                 const link = document.createElement('a');
//                 link.href = url;
//                 link.setAttribute('download', fileName);
//                 document.body.appendChild(link);
//                 link.click();
//                 link.remove();
//                 window.URL.revokeObjectURL(url);
//                 // setPageCount(Math.ceil(response.data.count / inPageCount));
//             })
//             .catch(error => {
//                 if (error.response.status === 403) {
//                     navigate('/login');
//                 }
//                 setError(error.message);
//                 setLoad(false);
//             });
//     };
import React, { useState, useEffect } from "react";
import axios from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form, Table, Spinner, Alert, Badge, Row, Col, InputGroup } from "react-bootstrap";
import { BsCashCoin, BsCreditCard, BsBank, BsCashStack, BsCurrencyExchange } from "react-icons/bs";

const PaymentMethodIcons = {
    "Готівка": <BsCashCoin className="me-2" />,
    "Картка": <BsCreditCard className="me-2" />,
    "Банківський переказ": <BsBank className="me-2" />,
    "Термінал": <BsCreditCard className="me-2" />,
    "Передоплата": <BsCashStack className="me-2" />,
    "Інше": <BsCurrencyExchange className="me-2" />
};

function PaysInOrder({ show, onHide, orderId }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [payments, setPayments] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [orderInfo, setOrderInfo] = useState(null);
    const [showAddPayment, setShowAddPayment] = useState(false);
    const [currentPayment, setCurrentPayment] = useState(null);

    // Стан для нового платежу
    const [newPayment, setNewPayment] = useState({
        method: "Готівка",
        amount: "",
        comment: "",
        orderId: orderId
    });

    // Завантаження даних про замовлення та платежі
    useEffect(() => {
        if (show && orderId) {
            fetchPayments();
            fetchOrderInfo();
        }
    }, [show, orderId]);

    // Отримання інформації про замовлення
    const fetchOrderInfo = async () => {
        try {
            const response = await axios.get(`/orders/OneOrder/${orderId}`);
            setOrderInfo(response.data);
        } catch (error) {
            console.error("Помилка при отриманні замовлення:", error);
            if (error.response && error.response.status === 403) {
                navigate('/login');
            }
        }
    };

    // Отримання всіх платежів для замовлення
    const fetchPayments = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/orders/payments/${orderId}`);
            setPayments(response.data || []);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Помилка при отриманні платежів:", error);
            if (error.response && error.response.status === 403) {
                navigate('/login');
            }
            setError("Не вдалося отримати список платежів");
        }
    };

    // Додавання нового платежу
    const handleAddPayment = async () => {
        // Валідація
        if (!newPayment.amount || isNaN(newPayment.amount) || newPayment.amount <= 0) {
            setError("Введіть коректну суму платежу");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await axios.post("/orders/payment", newPayment);
            setSuccess("Платіж успішно додано");
            // Скидання форми
            setNewPayment({
                method: "Готівка",
                amount: "",
                comment: "",
                orderId: orderId
            });
            setShowAddPayment(false);
            // Оновлення списку платежів
            fetchPayments();
            fetchOrderInfo();
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Помилка при додаванні платежу:", error);
            if (error.response && error.response.status === 403) {
                navigate('/login');
            }
            setError(error.response?.data?.message || "Помилка при додаванні платежу");
        }
    };

    // Видалення платежу
    const handleDeletePayment = async (paymentId) => {
        if (!window.confirm("Ви впевнені, що хочете видалити цей платіж?")) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await axios.delete(`/orders/payment/${paymentId}`);
            setSuccess("Платіж успішно видалено");
            // Оновлення списку платежів
            fetchPayments();
            fetchOrderInfo();
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Помилка при видаленні платежу:", error);
            if (error.response && error.response.status === 403) {
                navigate('/login');
            }
            setError(error.response?.data?.message || "Помилка при видаленні платежу");
        }
    };

    // Форматування дати
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    // Обчислення загальної суми платежів
    const calculateTotalPaid = () => {
        return payments.reduce((total, payment) => total + parseFloat(payment.amount), 0);
    };

    // Обчислення суми до сплати
    const calculateAmountDue = () => {
        if (!orderInfo) return 0;
        const totalOrder = parseFloat(orderInfo.totalCost) || 0;
        const totalPaid = calculateTotalPaid();
        return totalOrder - totalPaid;
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>
                    Історія платежів
                    {orderInfo && (
                        <span className="ms-2 text-muted" style={{ fontSize: '0.8em' }}>
                            (Замовлення №{orderInfo.id})
                        </span>
                    )}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {/* Інформація про замовлення */}
                {orderInfo && (
                    <div className="mb-4">
                        <Row className="mb-3">
                            <Col md={4}>
                                <div className="d-flex flex-column align-items-center bg-light p-3 rounded h-100">
                                    <h5 className="mb-2">Загальна сума замовлення</h5>
                                    <span className="fs-3 fw-bold text-primary">
                                        {orderInfo.totalCost ? `${orderInfo.totalCost} грн` : "0 грн"}
                                    </span>
                                </div>
                            </Col>

                            <Col md={4}>
                                <div className="d-flex flex-column align-items-center bg-light p-3 rounded h-100">
                                    <h5 className="mb-2">Сплачено</h5>
                                    <span className="fs-3 fw-bold text-success">
                                        {`${calculateTotalPaid().toFixed(2)} грн`}
                                    </span>
                                </div>
                            </Col>

                            <Col md={4}>
                                <div className="d-flex flex-column align-items-center bg-light p-3 rounded h-100">
                                    <h5 className="mb-2">Залишок до сплати</h5>
                                    <span className={`fs-3 fw-bold ${calculateAmountDue() <= 0 ? 'text-success' : 'text-danger'}`}>
                                        {`${Math.max(0, calculateAmountDue()).toFixed(2)} грн`}
                                    </span>
                                    {calculateAmountDue() <= 0 && (
                                        <Badge bg="success" pill className="mt-1">Повністю оплачено</Badge>
                                    )}
                                </div>
                            </Col>
                        </Row>
                    </div>
                )}

                {/* Повідомлення про помилку */}
                {error && (
                    <Alert variant="danger" onClose={() => setError(null)} dismissible>
                        {error}
                    </Alert>
                )}

                {/* Повідомлення про успіх */}
                {success && (
                    <Alert variant="success" onClose={() => setSuccess(null)} dismissible>
                        {success}
                    </Alert>
                )}

                {/* Кнопка додавання нового платежу */}
                <div className="mb-3">
                    <Button
                        variant="success"
                        onClick={() => setShowAddPayment(true)}
                        disabled={loading}
                    >
                        <i className="bi bi-plus-circle me-2"></i>
                        Додати новий платіж
                    </Button>
                </div>

                {/* Форма для додавання нового платежу */}
                {showAddPayment && (
                    <div className="border rounded p-3 mb-4 bg-light">
                        <h5 className="mb-3">Новий платіж</h5>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Спосіб оплати</Form.Label>
                                    <Form.Select
                                        value={newPayment.method}
                                        onChange={(e) => setNewPayment({...newPayment, method: e.target.value})}
                                    >
                                        <option value="Готівка">Готівка</option>
                                        <option value="Картка">Картка</option>
                                        <option value="Банківський переказ">Банківський переказ</option>
                                        <option value="Термінал">Термінал</option>
                                        <option value="Передоплата">Передоплата</option>
                                        <option value="Інше">Інше</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Сума (грн)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={newPayment.amount}
                                        onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
                                        placeholder="Введіть суму"
                                        min="0"
                                        step="0.01"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Коментар</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={newPayment.comment}
                                onChange={(e) => setNewPayment({...newPayment, comment: e.target.value})}
                                placeholder="Додаткова інформація про платіж"
                                rows={2}
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end">
                            <Button
                                variant="secondary"
                                className="me-2"
                                onClick={() => setShowAddPayment(false)}
                            >
                                Скасувати
                            </Button>
                            <Button
                                variant="success"
                                onClick={handleAddPayment}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                                        Зберігаємо...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-check2-circle me-2"></i>
                                        Зберегти платіж
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                )}

                {/* Таблиця з історією платежів */}
                {loading && !showAddPayment ? (
                    <div className="text-center my-4">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : (
                    <div className="table-responsive">
                        {payments.length > 0 ? (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th width="10%">#</th>
                                        <th width="20%">Дата</th>
                                        <th width="20%">Спосіб оплати</th>
                                        <th width="15%">Сума (грн)</th>
                                        <th width="25%">Коментар</th>
                                        <th width="10%">Дії</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.map((payment, index) => (
                                        <tr key={payment.id}>
                                            <td>{index + 1}</td>
                                            <td>{formatDate(payment.createdAt)}</td>
                                            <td>
                                                {PaymentMethodIcons[payment.method]}
                                                {payment.method}
                                            </td>
                                            <td className="text-end fw-bold">{parseFloat(payment.amount).toFixed(2)}</td>
                                            <td>{payment.comment}</td>
                                            <td>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDeletePayment(payment.id)}
                                                    title="Видалити платіж"
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className="table-light">
                                        <td colSpan="3" className="text-end fw-bold">Загалом:</td>
                                        <td className="text-end fw-bold">{calculateTotalPaid().toFixed(2)}</td>
                                        <td colSpan="2"></td>
                                    </tr>
                                </tbody>
                            </Table>
                        ) : (
                            <div className="text-center p-4 bg-light rounded">
                                <p className="mb-2">Історія платежів для цього замовлення порожня</p>
                                <Button
                                    variant="success"
                                    onClick={() => setShowAddPayment(true)}
                                >
                                    <i className="bi bi-plus-circle me-2"></i>
                                    Додати перший платіж
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрити
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

// export default PaysInOrder;
//     const generateDoc1 = (e, item) => {
//         let dataToSend = {
//             contractorId: item.id,
//             thisOrderId: thisOrder.id,
//         };
//         axios.post(`/user/generateDoc1`, dataToSend, {
//             responseType: 'blob',
//         })
//             .then(response => {
//                 console.log(response.data);
//                 setError(null);
//                 setLoad(false);
//                 setShowAddPay(false)
//                 const contentDisposition = response.headers['content-disposition'];
//                 let fileName = 'invoice.docx'; // За замовчуванням
//                 if (contentDisposition) {
//                     const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
//                     if (fileNameMatch.length === 2) fileName = fileNameMatch[1];
//                 }
//
//                 // Створюємо тимчасовий URL і клікаємо по ньому
//                 const url = window.URL.createObjectURL(new Blob([response.data]));
//                 const link = document.createElement('a');
//                 link.href = url;
//                 link.setAttribute('download', fileName);
//                 document.body.appendChild(link);
//                 link.click();
//                 link.remove();
//                 window.URL.revokeObjectURL(url);
//                 // setPageCount(Math.ceil(response.data.count / inPageCount));
//             })
//             .catch(error => {
//                 if (error.response.status === 403) {
//                     navigate('/login');
//                 }
//                 setError(error.message);
//                 setLoad(false);
//             });
//     };
//
//     useEffect(() => {
//         let data = {
//             inPageCount: inPageCount,
//             currentPage: currentPage,
//             search: typeSelect,
//             columnName: thisColumn,
//             startDate: startDate,
//             endDate: endDate,
//             clientId: thisOrder.clientId,
//         };
//         setLoad(true);
//         axios.post(`/user/getPayments`, data)
//             .then(response => {
//                 console.log(response.data);
//                 setData(response.data.rows);
//                 setError(null);
//                 setLoad(false);
//                 setPageCount(Math.ceil(response.data.count / inPageCount));
//             })
//             .catch(error => {
//                 if (error.response.status === 403) {
//                     navigate('/login');
//                 }
//                 setError(error.message);
//                 setLoad(false);
//             });
//     }, [typeSelect, thisColumn, startDate, endDate]);
//
//     useEffect(() => {
//         if (showPays) {
//             setIsVisible(true); // Сначала показываем модальное окно
//             setTimeout(() => setIsAnimating(true), 100); // После короткой задержки запускаем анимацию появления
//         } else {
//             setIsAnimating(false); // Начинаем анимацию закрытия
//             setTimeout(() => setIsVisible(false), 300); // После завершения анимации скрываем модальное окно
//         }
//     }, [showPays]);
//
//     return (
//         <div>
//             <div className="" onClick={handleClose} style={{
//                 width: "100vw",
//                 zIndex: "100",
//                 height: "100vh",
//                 background: "rgba(0, 0, 0, 0.2)",
//                 opacity: isAnimating ? 1 : 0, // для анимации прозрачности
//                 transition: "opacity 0.3s ease-in-out", // плавная анимация
//                 position: "fixed",
//                 left: "0",
//                 bottom: "0"
//             }}>
//             </div>
//             <div style={{
//                 zIndex: "100",
//                 display: "flex",
//                 flexDirection: "column",
//                 position: "fixed",
//                 backgroundColor: '#FBFAF6',
//                 left: "50%",
//                 top: "50%",
//                 transform: isAnimating ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0.8)", // анимация масштаба
//                 opacity: isAnimating ? 1 : 0, // анимация прозрачности
//                 transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out", // плавная анимация
//                 borderRadius: "1vw",
//                 width: "95vw",
//                 height: "95vh",
//                 cursor: "auto",
//             }}>
//                 <div className="d-flex">
//                     <div className="m-auto text-center fontProductName ">
//                         Реквізити
//                     </div>
//                     <div
//                         className="btn btn-close btn-lg"
//                         style={{
//                             margin: "0.5vw",
//                         }}
//                         onClick={handleClose}
//                     >
//                     </div>
//                 </div>
//                 <div style={{
//                     border: "none",
//                     borderRadius: "1vw",
//                     marginTop: "0.3vw",
//                     marginLeft: "0.3vw",
//                 }}>
//
//                     <div style={{padding: "1vw"}}>
//                         {error && (
//                             <div>{error}</div>
//                         )}
//                         {load && (
//                             <div className="d-flex justify-content-center align-items-center" style={{height: "100%"}}><Spinner animation="border" className="mainLoader" variant="dark" /></div>
//                         )}
//                         <table className="ContractorTable">
//                             <thead>
//                             <tr className="ContractorRow" style={{}}>
//                                 <th>Номер</th>
//                                 <th>Найменування</th>
//                                 <th>taxSystem</th>
//                                 <th></th>
//                             </tr>
//                             </thead>
//                             <tbody>
//                             {data && (
//                                 <>
//                                     {data.map((item, itr) => {
//                                         return (
//                                             <tr className="ContractorRow">
//                                                 <td className="ContractorCell">{itr+1}</td>
//                                                 <td className="ContractorCell ContractorName">{item.name}</td>
//                                                 <td className="ContractorCell ContractorName">{item.taxSystem}</td>
//                                                 <td className="ContractorCell ContractorActions">
//                                                     <button className="ContractorViewBtn" style={{background: "green"}} onClick={(event) => generateDoc(event, item)}>Генерувати Накладна/Акт</button>
//                                                     <button className="ContractorViewBtn" style={{background: "green"}} onClick={(event) => generateDoc1(event, item)}>Генерувати Рахунок</button>
//                                                     <button className="ContractorViewBtn" onClick={(event) => openSeePay(event, item)}>Переглянути/Редагувати</button>
//                                                     <button className="ContractorMoreBtn" onClick={(event) => openDeletePay(event, item)}>⋮</button>
//                                                 </td>
//                                             </tr>
//                                         );
//                                     })}
//                                 </>
//                             )}
//                             </tbody>
//                         </table>
//                         {/*{data && (*/}
//                         {/*    <>*/}
//                         {/*        {data.rows.map(order => {*/}
//                         {/*            return (*/}
//                         {/*                <div key={order.id}>*/}
//                         {/*                    <div className="CustomOrderTable-row">*/}
//                         {/*                        /!* Використання класів відповідно до HTML *!/*/}
//                         {/*                        <div className="CustomOrderTable-cell">{order.id}</div>*/}
//                         {/*                        <div className="CustomOrderTable-cell">{order.name}</div>*/}
//                         {/*                        /!*<div className="CustomOrderTable-cell">{order.address}</div>*!/*/}
//                         {/*                        /!*<div className="CustomOrderTable-cell">{order.bankName}</div>*!/*/}
//                         {/*                        /!*<div className="CustomOrderTable-cell">{order.iban}</div>*!/*/}
//                         {/*                        /!*<div className="CustomOrderTable-cell">{order.edrpou}</div>*!/*/}
//                         {/*                        /!*<div className="CustomOrderTable-cell">{order.email}</div>*!/*/}
//                         {/*                        /!*<div className="CustomOrderTable-cell">{order.phone}</div>*!/*/}
//                         {/*                        /!*<div className="CustomOrderTable-cell">{order.taxSystem}</div>*!/*/}
//                         {/*                        /!*<div className="CustomOrderTable-cell">{order.comment}</div>*!/*/}
//                         {/*                        /!*<div className="CustomOrderTable-cell">{order.userId}</div>*!/*/}
//                         {/*                        <div className="CustomOrderTable-cell">*/}
//                         {/*                            {`${new Date(order.createdAt).toLocaleDateString()} ${new Date(order.createdAt).toLocaleTimeString()}`}*/}
//                         {/*                        </div>*/}
//                         {/*                        <div className="CustomOrderTable-cell">*/}
//                         {/*                            {order.updatedAt*/}
//                         {/*                                ? `${new Date(order.updatedAt).toLocaleDateString()} ${new Date(order.updatedAt).toLocaleTimeString()}`*/}
//                         {/*                                : '—'}*/}
//                         {/*                        </div>*/}
//                         {/*                    </div>*/}
//                         {/*                </div>*/}
//                         {/*            );*/}
//                         {/*        })}*/}
//                         {/*    </>*/}
//                         {/*)}*/}
//                         <button className="ContractorViewBtn" onClick={openAddPay}>Додати контрагента</button>
//                         {showAddPay &&
//                             <div style={{ }} className="">
//                                 <AddPaysInOrder
//                                     showAddPay={showAddPay}
//                                     setShowAddPay={setShowAddPay}
//                                     formData={formData}
//                                     setFormData={setFormData}
//                                     thisOrder={thisOrder}
//                                     setThisOrder={setThisOrder}
//                                     data={data}
//                                     setData={setData}
//                                     showAddPayView={showAddPayView}
//                                     setShowAddPayView={setShowAddPayView}
//                                     showAddPayWriteId={showAddPayWriteId}
//                                     setShowAddPayWriteId={setShowAddPayWriteId}
//                                 />
//                             </div>
//                         }
//                         <ModalDeleteOrder
//                             showDeleteOrderModal={showDeleteOrderModal}
//                             setShowDeleteOrderModal={setShowDeleteOrderModal}
//                             thisOrderForDelete={thisOrderForDelete}
//                             setThisOrderForDelete={setThisOrderForDelete}
//                             data={data}
//                             setData={setData}
//                             url={`/user/deletePayment`}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

export default PaysInOrder;
