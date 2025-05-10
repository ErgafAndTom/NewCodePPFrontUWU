import React, {useEffect, useState} from 'react';
import '../Orders/CustomOrderTable.css';
import axios from "../../api/axiosInstance";
import {useNavigate} from "react-router-dom";
import PaginationMy from "../../components/admin/pagination/PaginationMy";
import Loader from "../../components/calc/Loader";
import OneItemInTable from "../Storage/OneUnitInTable";
import ModalStorageRed from "../Storage/ModalStorageRed";
import ModalDeleteInStorage from "../Storage/ModalDeleteInStorage";
import UserForm from "./UserForm";
import {useDispatch} from "react-redux";
import Button from "react-bootstrap/Button";
import { translateColumnName } from "./translations";
import OneUnitInTable from "./OneUnitInTable";

// Основний компонент таблиці користувачів
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
    const [show, setShow] = useState(false);

    // Функція для сортування колонок
    const setCol = (e) => {
        if (thisColumn.column === e) {
            setThisColumn({
                column: e,
                reverse: !thisColumn.reverse
            });
        } else {
            setThisColumn({
                column: e,
                reverse: false
            });
        }
    };

    // Функція для обробки кліку редагування
    const handleItemClickRed = (item, event, metaItem) => {
        setShowRed(true);
        setEvent(event);
        setThisItemForModal(item);
        setThisMetaItemForModal(metaItem);
    };

    // Функція для обробки кліку видалення
    const handleItemClickDelete2 = (item, event) => {
        setShowDeleteItemModal(true);
        setEvent(event);
        setThisItemForModal(item);
    };

    // Завантаження даних користувачів
    useEffect(() => {
        let requestData = {
            inPageCount: inPageCount,
            currentPage: currentPage,
            search: typeSelect,
            columnName: thisColumn
        };
        setLoading(true);
        axios.post(`/user/All`, requestData)
            .then(response => {
                console.log(response.data);
                setData(response.data);
                setError(null);
                setLoading(false);
                setPageCount(Math.ceil(response.data.count / inPageCount));
            })
            .catch(error => {
                if (error.response && error.response.status === 403) {
                    navigate('/login');
                }
                setError(error.message);
                console.log(error.message);
                setLoading(false);
            });
    }, [typeSelect, thisColumn, inPageCount, currentPage, navigate, show, showRed]);

    const toggleOrder = (orderId) => {
        if (expandedOrders.includes(orderId)) {
            setExpandedOrders(expandedOrders.filter(id => id !== orderId));
        } else {
            setExpandedOrders([...expandedOrders, orderId]);
        }
    };

    // Функція для визначення ширини колонок - ОБОВ'ЯЗКОВО повинна бути така сама, як у OneUnitInTable.jsx
    const getColumnWidth = (columnName) => {
        switch(columnName) {
            case 'id': return '2vw';
            case 'username': return '6vw';
            case 'firstName': return '6vw';
            case 'lastName': return '6vw';
            case 'familyName': return '6vw';
            case 'email': return '8vw';
            case 'phoneNumber': return '8vw';
            case 'createdAt': return '7vw';
            case 'updatedAt': return '7vw';
            case 'role': return '4vw';
            default: return '3.55vw';
        }
    };

    if (data) {
        return (
            <div className="CustomOrderTable-order-list" style={{
                flexDirection: "column",
                width: "100%",
                height: "100%"
            }}>
                <div className="CustomOrderTable-header" style={{
                    borderRadius: "0.5rem 0.5rem 0 0",
                    display: "flex",
                    flexDirection: "row",
                    overflowX: "auto",
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    backgroundColor: "#FBFAF6",
                    width: "100%",

                }}>
                    {data.metadata.map((item, iter) => (
                        <div
                            style={{
                                background: "#FBFAF6",
                                wordBreak: "break-all",
                                cursor: "pointer",
                                fontWeight: "600",
                                fontSize: "0.6rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "auto",
                                minHeight: "3vh",
                                boxSizing: "border-box",
                                textAlign: "center",
                                width: getColumnWidth(item),
                                minWidth: getColumnWidth(item),
                                maxWidth: getColumnWidth(item),
                                overflow: "hidden",
                                whiteSpace: "pre-line",
                                lineHeight: "1",
                                flex: "0 0 auto",
                                padding: "0.2rem"
                            }}
                            className="CustomOrderTable-header-cell"
                            key={item + iter}
                            onClick={(event) => setCol(item)}
                        >
                            {item === thisColumn.column ? (
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                                    <span style={{ whiteSpace: "pre-line", lineHeight: "1" }}>{translateColumnName(item)}</span>
                                    <span style={{ color: "#FAB416", fontSize: "1.4rem" }}>
                                        {!thisColumn.reverse ? "↑" : "↓"}
                                    </span>
                                </div>
                            ) : (
                                <span style={{ whiteSpace: "pre-line", lineHeight: "1" }}>{translateColumnName(item)}</span>
                            )}
                        </div>
                    ))}
                </div>
                <div className="CustomOrderTable-body"
                     style={{
                         maxWidth: '99vw',
                         overflow: 'auto',
                         height: "81vh",
                         background: "transparent",
                         borderRadius: "0.5rem",
                         display: "flex",
                         flexDirection: "column",
                         width: "100%",


                     }}>
                    {data.rows.map((item, iter) => (
                        <div key={item.id} className="table-row-container">
                            <div className="CustomOrderTable-row" style={{
                                display: "flex",
                                width: "100%",
                                flexDirection: "row"
                            }}>
                                {data.metadata.map((metaItem, iter2) => (
                                    <OneUnitInTable
                                        key={`${item.id}${iter}${iter2}`}
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
                
                <div className="controls-row" style={{ 
                    marginTop: "0.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%"
                }}>
                    <div className="pagination-container">
                        <PaginationMy
                            name={"User"}
                            data={data}
                            setData={setData}
                            inPageCount={inPageCount}
                            setInPageCount={setInPageCount}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            pageCount={pageCount}
                            setPageCount={setPageCount}
                            typeSelect={typeSelect}
                            url={"/user/All"}
                            thisColumn={thisColumn}
                        />
                    </div>
                    <div className="right-group" style={{ display: "flex", alignItems: "center" }}>
                        <UserForm
                            data={data}
                            setData={setData}
                            selectedUser={selectedUser}
                            setSelectedUser={setSelectedUser}
                            show={show}
                            setShow={setShow}
                        />
                        <Button 
                            className="adminButtonAdd" 
                            variant="primary" 
                            onClick={() => setShow(true)}
                            style={{
                                border: "none",
                                borderRadius: "0.5rem",
                                fontWeight: "400",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                transition: "all 0.2s ease",
                                marginLeft: "1rem"
                            }}
                        >
                            Додати користувача
                        </Button>


                    </div>
                </div>
                
                {showRed && (
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
                        thisColumn={thisColumn}
                        data={data}
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
                )}
                
                {showDeleteItemModal && (
                    <ModalDeleteInStorage
                        showDeleteItemModal={showDeleteItemModal}
                        setShowDeleteItemModal={setShowDeleteItemModal}
                        thisItemForModal={thisItemForModal}
                        setThisItemForModal={setThisItemForModal}
                        data={data}
                        setData={setData}
                        url={"/user/All"}
                    />
                )}
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
            <Loader/>
        </h1>
    );
};

export default UsersCustomTable;