import React, {useEffect, useState} from "react";
import axios from '../../../api/axiosInstance';
import {useNavigate} from "react-router-dom";
import skoba from './skoba.svg';
import plastick from './plastick.svg';
import metall from './metall.svg';
import diplom from './diplom.svg';

const PerepletPereplet = ({pereplet, setPereplet, prices, buttonsArr, selectArr, size}) => {
    const [thisLaminationSizes, setThisLaminationSizes] = useState([]);
    const navigate = useNavigate();

    let handleSelectChange = (e) => {
        setPereplet({
            type: pereplet.type,
            material: pereplet.material,
            materialId: pereplet.materialId,
            size: e.target.value
        })
    }

    let handleToggle = (e) => {
        if (pereplet.type === "Не потрібно") {
            setPereplet({
                type: "З глянцевим ламінуванням",
                material: "З глянцевим ламінуванням",
                materialId: "92",
                size: "Брошурування до 120 аркушів"
            })
        } else {
            setPereplet({
                type: "Не потрібно",
                material: "",
                materialId: "",
                size: ""
            })
        }
    }

    let handleClickSize = (e) => {
        setPereplet({
            type: pereplet.type,
            material: pereplet.material,
            materialId: pereplet.materialId,
            size: e
        })
    }
    let handleClickType = (e) => {
        setPereplet({
            type: e,
            material: pereplet.material,
            materialId: pereplet.materialId,
            size: pereplet.size
        })
    }

    // useEffect(() => {
    //     let data = {
    //         name: "MaterialsPrices",
    //         inPageCount: 999999,
    //         currentPage: 1,
    //         search: "",
    //         columnName: {
    //             column: "id",
    //             reverse: false
    //         },
    //         material: {
    //             type: "Pereplet",
    //             material: pereplet.material,
    //             materialId: pereplet.materialId,
    //             thickness: pereplet.size,
    //         }
    //     }
    //     axios.post(`/materials/NotAll`, data)
    //         .then(response => {
    //             console.log(response.data);
    //             setThisLaminationSizes(response.data.toSend.rows)
    //         })
    //         .catch(error => {
    //             if (error.response.status === 403) {
    //                 navigate('/login');
    //             }
    //             console.log(error.message);
    //         })
    // }, [pereplet]);

    return (
        <div className="d-flex allArtemElem m-0 p-0">
            <div style={{display: 'flex', alignItems: 'center',}} className="m-0 p-0">
                {/*<div className={`toggleContainer ${pereplet.type === "Не потрібно" ? 'disabledCont' : 'enabledCont'}`}*/}
                {/*     onClick={handleToggle}*/}
                {/*     style={{transform: "scale(0.6)"}}>*/}
                {/*    <div className={`toggle-button ${pereplet.type === "Не потрібно" ? 'disabled' : 'enabledd'}`}>*/}

                {/*    </div>*/}
                {/*</div>*/}
                <div className="d-flex flex-column m-0 p-0">
                    {/*<span style={{*/}
                    {/*    fontSize: '1.273vw',*/}
                    {/*    marginRight: '0.633vw',*/}
                    {/*    fontFamily: "Gotham",*/}
                    {/*    fontWeight: "bold",*/}
                    {/*}}>*/}
                    {/*    {"Перепліт:"}*/}
                    {/*</span>*/}
                    {pereplet.type !== "Не потрібно" ? (
                        <div style={{
                            display: 'flex',
                            flexDirection: "column",
                            // justifyContent: 'center',
                            // alignItems: 'center',
                        }} className="m-0 p-0">
                            <div className="m-0 p-0" style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                // marginLeft: "2vw",
                            }}>
                                {buttonsArr.map((item, index) => (<button
                                    className={item === pereplet.size ? 'buttonsArtem buttonsArtemActive' : 'buttonsArtem'}
                                    key={index}
                                    onClick={() => handleClickSize(item)}
                                >
                                    <div className="" style={{
                                        height: "100%",
                                        opacity: item === pereplet.size ? '100%' : '90%',
                                        whiteSpace: "nowrap",
                                    }}>
                                        {item}
                                    </div>
                                </button>))}
                                {/*<div className="ArtemNewSelectContainer">*/}
                                {/*    <select*/}
                                {/*        value={pereplet.size}*/}
                                {/*        onChange={(event) => handleSelectChange(event)}*/}
                                {/*        className="selectArtem"*/}
                                {/*    >*/}
                                {/*        <option value={""}>{""}</option>*/}
                                {/*        {thisLaminationSizes.map((item, iter2) => (*/}
                                {/*            <option className="optionInSelectArtem" key={item.thickness}*/}
                                {/*                    value={item.thickness}>{item.thickness} мкм</option>))}*/}
                                {/*    </select>*/}
                                {/*</div>*/}
                            </div>
                            <div className="d-flex">
                                <button
                                    className={"На скобу" === pereplet.type ? 'buttonsArtem buttonsArtemActive' : 'buttonsArtem'}
                                    onClick={() => handleClickType("На скобу")}
                                >
                                    <div className="d-flex flex-column align-content-center align-items-center" style={{
                                        width: "5vw",
                                        height: "100%",
                                        opacity: "На скобу" === pereplet.size ? '100%' : '90%',
                                        whiteSpace: "nowrap",
                                    }}>
                                        <img src={skoba} alt="На скобу" style={{height: "5vw"}}/>
                                        {"На скобу"}
                                    </div>
                                </button>
                                <button
                                    className={"Пластик" === pereplet.type ? 'buttonsArtem buttonsArtemActive' : 'buttonsArtem'}
                                    onClick={() => handleClickType("Пластик")}
                                >
                                    <div className="d-flex flex-column align-content-center align-items-center" style={{
                                        width: "5vw",
                                        height: "100%",
                                        opacity: "Пластик" === pereplet.size ? '100%' : '90%',
                                        whiteSpace: "nowrap",
                                    }}>
                                        <img src={plastick} alt="Пластик" style={{height: "5vw"}}/>
                                        {"Пластик"}
                                    </div>
                                </button>
                                <button
                                    className={"Металл" === pereplet.type ? 'buttonsArtem buttonsArtemActive' : 'buttonsArtem'}
                                    onClick={() => handleClickType("Металл")}
                                >
                                    <div className="d-flex flex-column align-content-center align-items-center" style={{
                                        width: "5.1vw",
                                        height: "100%",
                                        opacity: "Металл" === pereplet.size ? '100%' : '90%',
                                        whiteSpace: "nowrap",
                                    }}>
                                        <img src={metall} alt="Металл" style={{height: "5vw"}}/>
                                        {"Металл"}
                                    </div>
                                </button>
                                <button
                                    className={"Диплом" === pereplet.type ? 'buttonsArtem buttonsArtemActive' : 'buttonsArtem'}
                                    onClick={() => handleClickType("Диплом")}
                                >
                                    <div className="d-flex flex-column align-content-center align-items-center"
                                         style={{
                                             width: "5vw",
                                             height: "100%",
                                             opacity: "Диплом" === pereplet.size ? '100%' : '90%',
                                             whiteSpace: "nowrap",
                                         }}>
                                        <img src={diplom} alt="Диплом" style={{height: "5vw"}}/>
                                        {"Диплом"}
                                    </div>
                                </button>
                                {/*{size.x === 297 &*/}
                                {/*    <button*/}
                                {/*        className={"Диплом" === pereplet.type ? 'buttonsArtem buttonsArtemActive' : 'buttonsArtem'}*/}
                                {/*        onClick={() => handleClickType("Диплом")}*/}
                                {/*    >*/}
                                {/*        <div className="d-flex flex-column align-content-center align-items-center"*/}
                                {/*             style={{*/}
                                {/*                 width: "5vw",*/}
                                {/*                 height: "100%",*/}
                                {/*                 opacity: "Диплом" === pereplet.size ? '100%' : '90%',*/}
                                {/*                 whiteSpace: "nowrap",*/}
                                {/*             }}>*/}
                                {/*            <img src={diplom} alt="Диплом" style={{height: "5vw"}}/>*/}
                                {/*            {"Диплом"}*/}
                                {/*        </div>*/}
                                {/*    </button>*/}
                                {/*}*/}
                            </div>
                        </div>) : (<div>

                    </div>)}
                </div>
            </div>
        </div>
    )
};

export default PerepletPereplet;
