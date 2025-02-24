import React, {useEffect, useState} from 'react';
import './CustomOrderTable.css';
import axios from "../../api/axiosInstance";
import StatusBar from "./StatusBar";
import {Link, useNavigate} from "react-router-dom";
import PaginationMy from "../../components/admin/pagination/PaginationMy";
import Loader from "../../components/calc/Loader";
import AddNewOrder from "./AddNewOrder";
import ModalDeleteOrder from "./ModalDeleteOrder";

// Основний компонент CustomOrderTable
const CustomOrderTable2 = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [thisOrderForDelete, setThisOrderForDelete] = useState(null);
    const [showDeleteOrderModal, setShowDeleteOrderModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [inPageCount, setInPageCount] = useState(500);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(null);
    const [typeSelect, setTypeSelect] = useState("");
    const [thisColumn, setThisColumn] = useState({
        column: "id",
        reverse: true
    });
    const [expandedOrders, setExpandedOrders] = useState([]);

    const handleOrderClickDelete = (Order) => {
        setShowDeleteOrderModal(true);
        setThisOrderForDelete(Order);
    };

    useEffect(() => {
        let data = {
            inPageCount: inPageCount,
            currentPage: currentPage,
            search: typeSelect,
            columnName: thisColumn
        };
        setLoading(true);
        axios.post(`/orders/all`, data)
            .then(response => {
                // console.log(response.data);
                setData(response.data);
                setError(null);
                setLoading(false);
                setPageCount(Math.ceil(response.data.count / inPageCount));
            })
            .catch(error => {
                if (error.response.status === 403) {
                    navigate('/login');
                }
                setError(error.message);
                setLoading(false);
            });
    }, [typeSelect, thisColumn]);

    const toggleOrder = (orderId) => {
        if (expandedOrders.includes(orderId)) {
            setExpandedOrders(expandedOrders.filter(id => id !== orderId));
        } else {
            setExpandedOrders([...expandedOrders, orderId]);
        }
    };

    if (data) {
        return (
            <div className="CustomOrderTable-order-list">
                <AddNewOrder
                    namem={"Order"}
                    data={data}
                    setData={setData}
                    inPageCount={inPageCount}
                    setInPageCount={setInPageCount}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageCount={pageCount}
                    setPageCount={setPageCount}
                />
                <div className="CustomOrderTable-header">
                    {/* Використання класів для відображення заголовків, як у HTML */}
                    <div className="CustomOrderTable-header-cell CustomOrderTable-left-rounded">№ замовлення</div>
                    <div className="CustomOrderTable-header-cell">Розгорнути</div>
                    <div className="CustomOrderTable-header-cell">Штрих-код</div>
                    <div className="CustomOrderTable-header-cell">Поточний статус</div>
                    <div className="CustomOrderTable-header-cell">Фото</div>
                    <div className="CustomOrderTable-header-cell">Клієнт</div>
                    <div className="CustomOrderTable-header-cell">Номер телефона</div>
                    <div className="CustomOrderTable-header-cell">Telegram</div>
                    <div className="CustomOrderTable-header-cell">Вартість</div>
                    <div className="CustomOrderTable-header-cell">Статус оплати</div>
                    <div className="CustomOrderTable-header-cell">Дата створення</div>
                    <div className="CustomOrderTable-header-cell">Дата оновлення</div>
                    <div className="CustomOrderTable-header-cell">deadline</div>
                    <div className="CustomOrderTable-header-cell">Відповідальний</div>
                    <div className="CustomOrderTable-header-cell">До каси</div>
                    <div className="CustomOrderTable-header-cell">Зробити рахунок</div>
                    <div className="CustomOrderTable-header-cell CustomOrderTable-right-rounded">Видалити</div>
                </div>
                <div className="CustomOrderTable-body">
                    {data.rows.map(order => {
                        const isExpanded = expandedOrders.includes(order.id);
                        return (
                            <div key={order.id}>
                                <div className="CustomOrderTable-row">
                                    {/* Використання класів відповідно до HTML */}
                                    <div className="CustomOrderTable-cell">{order.id}</div>
                                    <div className="CustomOrderTable-cell">
                                        <button
                                            className="toggle-btn CustomOrderTable-toggle-btn"  // Використання існуючого класу з HTML
                                            onClick={() => toggleOrder(order.id)}
                                        >
                                            {isExpanded ? 'Згорнути' : 'Розгорнути'}
                                        </button>
                                    </div>
                                    <div className="CustomOrderTable-cell">{order.barcode || '—'}</div>
                                    <div className="CustomOrderTable-cell">
                                        <div className="" style={{background: "transparent"}}>
                                            <StatusBar item={order}/>
                                        </div>
                                    </div>
                                    <div className="CustomOrderTable-cell">
                                        {order.User.photoLink ? (
                                            <img
                                                src={order.User.photoLink}
                                                alt="Фото замовлення"
                                                className="CustomOrderTable-photo"
                                            />
                                        ) : (
                                            'Фото'
                                        )}
                                    </div>
                                    <div
                                        className="CustomOrderTable-cell">{`${order.User.firstName} ${order.User.lastName} ${order.User.familyName}`}</div>
                                    <div className="CustomOrderTable-cell">{order.User.phoneNumber}</div>
                                    <div className="CustomOrderTable-cell">
                                        {order.User.telegram ? (
                                            <a
                                                href={order.User.telegram}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="CustomOrderTable-telegram-link"
                                            >
                                                @{order.User.username}
                                            </a>
                                        ) : (
                                            '—'
                                        )}
                                    </div>
                                    <div className="CustomOrderTable-cell">{order.price} грн</div>
                                    <div className="CustomOrderTable-cell">
                                        <div
                                            className={`pay-btn d-flex align-content-center justify-content-center ${
                                                order.payStatus === 'pay'
                                                    ? 'CustomOrderTable-pay-paid'
                                                    : 'CustomOrderTable-pay-pending'
                                            }`}
                                        >
                                            {order.payStatus || 'Не оплачено'}
                                        </div>
                                    </div>
                                    <div className="CustomOrderTable-cell">
                                        {`${new Date(order.createdAt).toLocaleDateString()} ${new Date(order.createdAt).toLocaleTimeString()}`}
                                    </div>
                                    <div className="CustomOrderTable-cell">
                                        {order.updatedAt
                                            ? `${new Date(order.updatedAt).toLocaleDateString()} ${new Date(order.updatedAt).toLocaleTimeString()}`
                                            : '—'}
                                    </div>
                                    <div className="CustomOrderTable-cell">
                                        {order.deadline
                                            ? `${new Date(order.deadline).toLocaleDateString()} ${new Date(order.deadline).toLocaleTimeString()}`
                                            : '—'}
                                    </div>
                                    <div
                                        className="CustomOrderTable-cell">{`${order.User.firstName} ${order.User.lastName} ${order.User.familyName}`}</div>
                                    <div className="CustomOrderTable-cell">
                                        <Link to={`/Orders/${order.id}`}>
                                            <button className="kassa-btn CustomOrderTable-toggle-btn">До каси</button> {/* Залишаємо клас "kassa-btn" */}
                                        </Link>
                                    </div>
                                    <div className="CustomOrderTable-cell">
                                        <button className="CustomOrderTable-toggle-btn">Зробити рахунок</button> {/* Залишаємо клас "invoice-btn" */}
                                    </div>
                                    <div className="CustomOrderTable-cell">
                                        <button
                                            className="CustomOrderTable-toggle-btn CustomOrderTable-delete-btn" // Використання існуючого класу з HTML
                                            onClick={(e) => handleOrderClickDelete(order)}
                                        >Видалити</button>
                                    </div>
                                </div>
                                {isExpanded && (
                                    <div className="CustomOrderTable-order-details">
                                        <div className="CustomOrderTable-order-units d-flex align-content-around justify-content-around">
                                            {order.OrderUnits.length > 0 ? (
                                                order.OrderUnits.map((orderUnit, index) => (
                                                    <div key={index} style={{backgroundColor: "#E9E6DA", borderRadius: "0.3vw", padding: "0.5vw", margin: "0.5vw"}} className="sub-order d-flex flex-column align-content-between justify-content-between">
                                                        <p className="adminFont"><strong>№ підзамовлення:</strong> {orderUnit.idKey || '—'}</p>
                                                        <p className="adminFont"><strong>Поточний статус:</strong> {orderUnit.status}</p>
                                                        <p className="adminFont"><strong>Тип продукції:</strong> {orderUnit.type} {orderUnit.typeUse}</p>
                                                        <p className="adminFont"><strong>Назва:</strong> {orderUnit.name}</p>
                                                        <p className="adminFont"><strong>Кількість:</strong> {orderUnit.name}</p>
                                                        <p className="adminFont"><strong>Ціна за одиницю:</strong> {orderUnit.newField5}</p>
                                                        <p className="adminFont"><strong>Вартість:</strong> {orderUnit.priceForThis} грн</p>
                                                        <p className="adminFont"><strong>Розмір:</strong> {`${orderUnit.newField2} x ${orderUnit.newField3}`} мм</p>
                                                        <p className="adminFont"><strong>Використано аркушів:</strong> {orderUnit.newField5} шт</p>
                                                        <p className="adminFont"><strong>Кількість виробів на аркуші:</strong> {orderUnit.newField4} шт</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="sub-order">Единиц заказа відсутні</div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                <ModalDeleteOrder
                    showDeleteOrderModal={showDeleteOrderModal}
                    setShowDeleteOrderModal={setShowDeleteOrderModal}
                    thisOrderForDelete={thisOrderForDelete}
                    setThisOrderForDelete={setThisOrderForDelete}
                    data={data}
                    setData={setData}
                />
                <PaginationMy
                    name={"Order"}
                    data={data}
                    setData={setData}
                    inPageCount={inPageCount}
                    setInPageCount={setInPageCount}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageCount={pageCount}
                    setPageCount={setPageCount}
                    typeSelect={typeSelect}
                    url={"/orders/all"}
                    thisColumn={thisColumn}
                />
            </div>
        );
    }
    if (error) {
        return (
            <h1 className="d-flex justify-content-center align-items-center">
                {error}
            </h1>
        );
    }
    return (
        <h1 className="d-flex justify-content-center align-items-center">
            <Loader />
        </h1>
    );
};

export default CustomOrderTable2;
