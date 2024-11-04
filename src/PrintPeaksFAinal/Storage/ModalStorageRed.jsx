import React, {useCallback, useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from '../../api/axiosInstance';
import redIcon from '../../components/redIcon.svg';
import StatusBar from "../Orders/StatusBar";
import {useNavigate} from "react-router-dom";

const ModalStorageRed = ({tableName, item, tablPosition, setData, inPageCount, currentPage, setPageCount, itemData, url, thisColumn, typeSelect}) => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [modalInput, setModalInput] = useState(itemData);
    const [modalStyle, setModalStyle] = useState({
        zIndex: "999",
        position: "fixed",
        background: "#dcd9ce",
        top: `${0}px`,
        left: `${0}px`
    });
    const [load, setLoad] = useState(false);

    const handleCloseModal = useCallback(() => {
        setShow(false);
    }, []);

    const handleOpenModal = useCallback((event) => {
        event.preventDefault();
        setModalStyle({
            zIndex: "999",
            position: "fixed",
            background: "#dcd9ce",
            top: `${event.pageY}px`,
            left: `${event.pageX}px`
        });
        setShow(true);
        setModalInput(itemData)
    }, []);

    let saveThis = (event) => {
        let data = {
            tableName: tableName,
            id: item.id,
            tablePosition: tablPosition,
            input: modalInput,
            search: typeSelect,
            inPageCount: inPageCount,
            currentPage: currentPage,
            columnName: thisColumn
        }
        if (modalInput === "") {
            data.input = 0
        }
        console.log(data);
        console.log(url);
        setLoad(true)
        axios.put(url, data)
            .then(response => {
                console.log(response.data);
                setData(response.data)
                setPageCount(Math.ceil(response.data.count / inPageCount))
                setLoad(false)
                setShow(false)
            })
            .catch(error => {
                if(error.response.status === 403){
                    navigate('/login');
                }
                console.log(error.message);
            })
    }

    if(tablPosition === "id"){
        return (
            <div style={{overflow: 'hidden', whiteSpace: "nowrap", textOverflow: "ellipsis", background: "transparent"}} className="adminFontTable d-flex align-content-center justify-content-center m-auto p-0">{itemData}</div>
        )
    }
    if(tablPosition === "password"){
        return (
            <div style={{overflow: 'hidden', whiteSpace: "nowrap", textOverflow: "ellipsis", background: "transparent", maxWidth: "2vw"}} className="adminFontTable d-flex align-content-center justify-content-center m-auto p-0">{itemData}</div>
        )
    }
    if(tablPosition === "createdAt"){
        return (
            <div style={{overflow: 'hidden', whiteSpace: "nowrap", textOverflow: "ellipsis", background: "transparent"}} className="adminFontTable d-flex align-content-center justify-content-center m-auto p-0">
                {`${new Date(itemData).toLocaleDateString()} ${new Date(itemData).toLocaleTimeString()}`}
            </div>
        )
    }
    if(tablPosition === "updatedAt"){
        return (
            <div style={{overflow: 'hidden', whiteSpace: "nowrap", textOverflow: "ellipsis", background: "transparent"}} className="adminFontTable d-flex align-content-center justify-content-center m-auto p-0">
                {`${new Date(itemData).toLocaleDateString()} ${new Date(itemData).toLocaleTimeString()}`}
            </div>
        )
    }
    if(tablPosition === "photo"){
        return (
            <div style={{overflow: 'hidden', whiteSpace: "nowrap", textOverflow: "ellipsis", background: "transparent"}} className="adminFontTable d-flex align-content-center justify-content-center m-auto p-0">{itemData}</div>
        )
    }

    if(tablPosition === "status"){
        return (
            <StatusBar item={item}/>
            )
    }

    return (
        <>
            {show === true ? (
                <div className="adminFontTable redStorageItem d-flex align-content-center justify-content-center m-auto p-0"
                     style={{
                         overflow: 'hidden',
                         whiteSpace: "nowrap",
                         textOverflow: "ellipsis",
                         height: "100%"
                         // maxWidth: "5vw"
                }}>
                    {itemData}
                    <img src={redIcon} alt="red" className="redIcon"/>


                    <div style={modalStyle} className="shadow-lg">
                        <div style={{
                            // height: '90vh',
                            // overflow: 'auto',
                        }}>
                            <Form.Control
                                type="text"
                                placeholder={"Значення..."}
                                value={modalInput}
                                className="adminFontTable shadow-lg bg-transparent"
                                onChange={(event) => setModalInput(event.target.value)}
                                style={{border: "solid 1px #cccabf", borderRadius: "0"}}
                            />
                            <button className="adminFontTable"
                                    onClick={handleCloseModal}>Закрити</button>
                            {load && (
                                <button disabled className="adminFontTable">Збереження
                                    змін</button>
                            )}
                            {!load && (
                                <button className="adminFontTable" onClick={saveThis}>Зберегти
                                    зміни</button>
                            )}
                        </div>
                    </div>
                    <div style={{
                        width: "100vw",
                        zIndex: "99",
                        height: "100vh",
                        background: "black",
                        opacity: "20%",
                        position: "fixed",
                        left: "0",
                        bottom: "0"
                    }} onClick={handleCloseModal}></div>
                </div>
            ) : (
                <div
                    className="adminFontTable redStorageItem d-flex align-content-center justify-content-center m-auto p-0"
                    style={{overflow: 'hidden', whiteSpace: "nowrap", textOverflow: "ellipsis", height: "100%"}}
                    onClick={handleOpenModal}>
                    {itemData}
                    <img src={redIcon} alt="red" className="redIcon"/>
                </div>
            )}
        </>
    )
};

export default ModalStorageRed