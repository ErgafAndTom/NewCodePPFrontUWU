import React, {useEffect, useState} from 'react';
import '../Orders/CustomOrderTable.css';
import axios from "../../api/axiosInstance";
import StatusBar from "../Orders/StatusBar";
import {Link, redirect, useNavigate} from "react-router-dom";
import PaginationMy from "../../components/admin/pagination/PaginationMy";
import Loader from "../../components/calc/Loader";
import AddNewOrder from "../Orders/AddNewOrder";
import ModalDeleteInStorage from "./ModalDeleteInStorage";
import ModalStorageRed from "./ModalStorageRed";
import NewWide from "../poslugi/newWide";
import OneItemInTable from "./OneUnitInTable";

// Основний компонент CustomOrderTable
const CustomStorageTable = ({name}) => {
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
    const [typeSelect, setTypeSelect] = useState("");
    const [thisColumn, setThisColumn] = useState({
        column: "id",
        reverse: false
    });
    const [expandedOrders, setExpandedOrders] = useState([]);
    const [showRed, setShowRed] = useState(false);

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
        axios.post(`/materials/All`, data)
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

                <div className="CustomOrderTable-header">

                    {data.metadata.map((item, iter) => (
                        <div
                            style={{background: "#F2EFE8", borderColor: "#f4c24b"}}
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
                        url={`/materials/OnlyOneField`}
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
};

export default CustomStorageTable;
