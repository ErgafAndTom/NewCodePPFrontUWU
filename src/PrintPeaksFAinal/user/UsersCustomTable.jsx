import React, {useEffect, useState} from 'react';
import '../Orders/CustomOrderTable.css';
import axios from "../../api/axiosInstance";
import {Link, redirect, useNavigate} from "react-router-dom";
import PaginationMy from "../../components/admin/pagination/PaginationMy";
import Loader from "../../components/calc/Loader";
import OneItemInTable from "../Storage/OneUnitInTable";
import ModalStorageRed from "../Storage/ModalStorageRed";
import AddNewOrder from "../Orders/AddNewOrder";
import ModalDeleteInStorage from "../Storage/ModalDeleteInStorage";
import AddEditUser from "./AddEditUser";
import UserForm from "./UserForm";
import {useDispatch} from "react-redux";
import {login} from "../../actions/authActions";
import {fetchUser} from "../../actions/actions";

// Основний компонент CustomOrderTable
const UsersCustomTable = ({name}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [thisItemForModal, setThisItemForModal] = useState(null);
    const [thisMetaItemForModal, setThisMetaItemForModal] = useState(null);
    const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
    const [event, setEvent] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [inPageCount, setInPageCount] = useState(500);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(null);
    const dispatch = useDispatch();
    const [typeSelect, setTypeSelect] = useState("");
    const [thisColumn, setThisColumn] = useState({
        column: "id",
        reverse: false
    });
    const [expandedOrders, setExpandedOrders] = useState([]);
    const [showRed, setShowRed] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [show , setShow ] = useState(false);

    const setCol = (e) => {
        if (thisColumn.column === e) {
            setThisColumn({
                column: e,
                reverse: !thisColumn.reverse
            })
        } else {
            setThisColumn({
                column: e,
                reverse: false
            })
        }
    }

    const handleItemClickRed = (item, event, metaItem) => {
        setShowRed(true)
        setEvent(event)
        setThisItemForModal(item)
        setThisMetaItemForModal(metaItem)
    };

    const handleItemClickDelete2 = (item, event) => {
        setShowDeleteItemModal(true)
        setEvent(event)
        setThisItemForModal(item)
    };

    useEffect(() => {
        let data = {
            // name: "Orders",
            inPageCount: inPageCount,
            currentPage: currentPage,
            search: typeSelect,
            columnName: thisColumn
        }
        setLoading(true)
        axios.post(`/user/All`, data)
            .then(response => {
                console.log(response.data);
                setData(response.data)
                setError(null)
                setLoading(false)
                setPageCount(Math.ceil(response.data.count / inPageCount))
            })
            .catch(error => {
                if (error.response.status === 403) {
                    navigate('/login');
                }
                setError(error.message)
                console.log(error.message);
            })
    }, [typeSelect, thisColumn]);

    // useEffect(() => {
    //     dispatch(fetchUser(typeSelect))
    // }, [typeSelect]);


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
                {/*<AddNewOrder*/}
                {/*    namem={"Order"}*/}
                {/*    data={data}*/}
                {/*    setData={setData}*/}
                {/*    inPageCount={inPageCount}*/}
                {/*    setInPageCount={setInPageCount}*/}
                {/*    currentPage={currentPage}*/}
                {/*    setCurrentPage={setCurrentPage}*/}
                {/*    pageCount={pageCount}*/}
                {/*    setPageCount={setPageCount}*/}
                {/*/>*/}
                {/*<AddEditUser*/}
                {/*    data={data}*/}
                {/*    setData={setData}*/}
                {/*    selectedUser={selectedUser}*/}
                {/*    setSelectedUser={setSelectedUser}*/}
                {/*/>*/}

                <div className="CustomOrderTable-header">
                    {/*<div className="CustomOrderTable-header-cell CustomOrderTable-left-rounded">№ замовлення</div>*/}
                    {/*<div className="CustomOrderTable-header-cell">Розгорнути</div>*/}
                    {/*<div className="CustomOrderTable-header-cell">Штрих-код</div>*/}
                    {/*<div className="CustomOrderTable-header-cell">Поточний статус</div>*/}
                    {/*<div className="CustomOrderTable-header-cell">Фото</div>*/}
                    {/*<div className="CustomOrderTable-header-cell">Клієнт</div>*/}
                    {/*<div className="CustomOrderTable-header-cell">Номер телефона</div>*/}
                    {/*<div className="CustomOrderTable-header-cell">Telegram</div>*/}
                    {/*<div className="CustomOrderTable-header-cell">Вартість</div>*/}
                    {/*<div className="CustomOrderTable-header-cell">Статус оплати</div>*/}
                    {/*<div className="CustomOrderTable-header-cell">Дата створення</div>*/}
                    {/*<div className="CustomOrderTable-header-cell">Дата завершення</div>*/}
                    {/*<div className="CustomOrderTable-header-cell">Відповідальний</div>*/}
                    {/*<div className="CustomOrderTable-header-cell">До каси</div>*/}
                    {/*<div className="CustomOrderTable-header-cell">Зробити рахунок</div>*/}
                    {/*<div className="CustomOrderTable-header-cell CustomOrderTable-right-rounded">Видалити</div>*/}
                    {data.metadata.map((item, iter) => (
                        <div
                            style={{background: "#FBFAF6", borderColor: "#f4c24b"}}
                            // className="adminFontTable"
                            className="CustomOrderTable-header-cell"
                            key={item+iter}
                            onClick={(event) => setCol(item)}
                        >
                            {item === thisColumn.column ? (
                                <>
                                    {!thisColumn.reverse ? (
                                        <>
                                            ^{item}
                                        </>
                                    ) : (
                                        <>
                                            !^{item}
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    {item}
                                </>
                            )}
                        </div>
                    ))}
                </div>
                <div className="CustomOrderTable-body" style={{ maxWidth: '99.5vw', overflow: 'auto', height: "80vh", background: "transparent", }}>

                    {data.rows.map((item, iter) => (
                        <div key={item.id}>
                            <div className="CustomOrderTable-row">
                                {data.metadata.map((metaItem, iter2) => (
                                    <OneItemInTable
                                        key={`${item.id}${item[metaItem]}${iter}${iter2}`}
                                        item={item}
                                        metaItem={metaItem}
                                        itemData={item[metaItem]}
                                        tablPosition={metaItem}
                                        handleItemClickRed={handleItemClickRed}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {/*<ModalDeleteInStorage*/}
                {/*    showDeleteOrderModal={showDeleteOrderModal}*/}
                {/*    setShowDeleteOrderModal={setShowDeleteOrderModal}*/}
                {/*    thisOrderForDelete={thisOrderForDelete}*/}
                {/*    setThisOrderForDelete={setThisOrderForDelete}*/}
                {/*    data={data}*/}
                {/*    setData={setData}*/}
                {/*    url={"/materials/All"}*/}
                {/*/>*/}
                <div className="controls-row">
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
                    url={"/materials/All"}
                    thisColumn={thisColumn}
                />
                    <div className="right-group">
                <UserForm
                    data={data}
                    setData={setData}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    show={show}
                    setShow ={setShow}
                />
                    </div>
                </div>
                {showRed &&
                    <ModalStorageRed
                        dataTypeInTable={"string"}
                        setShowRed={setShowRed}
                        showRed={showRed}
                        event={event}
                        setEvent={setEvent}
                        setShowDeleteItemModal={setShowDeleteItemModal}
                        showDeleteItemModal={showDeleteItemModal}
                        thisItemForModal={thisItemForModal}
                        setThisItemForModal={setThisItemForModal}
                        tableName={name}
                        typeSelect={typeSelect}
                        data={data}
                        thisColumn={thisColumn}
                        thisMetaItemForModal={thisMetaItemForModal}
                        setData={setData}
                        inPageCount={inPageCount}
                        setInPageCount={setInPageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        pageCount={pageCount}
                        setPageCount={setPageCount}
                        url={`/user/OnlyOneField`}
                    />
                }
            </div>
        );
    }
    if (error) {
        return (
            <h1 className="d-flex justify-content-center align-items-center">
                {error}
            </h1>
        )
    }
    return (
        <h1 className="d-flex justify-content-center align-items-center">
            <Loader/>
        </h1>
    )
}

export default UsersCustomTable;