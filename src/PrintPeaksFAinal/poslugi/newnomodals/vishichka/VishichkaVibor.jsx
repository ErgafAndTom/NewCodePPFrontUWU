import React, {useEffect, useState} from "react";
import axios from '../../../../api/axiosInstance';
import {useNavigate} from "react-router-dom";
import nashichka from './nashichka.svg';
import porizka from './porizka.svg';
import porizkaOkremimi from './porizkaOkremimi.svg';

const iconArray = [
    nashichka,
    porizka,
    porizkaOkremimi,
];

const VishichkaVibor = ({vishichka, setVishichka, prices, buttonsArr, selectArr, size}) => {
    const [thisVishichka, setThisVishichka] = useState([]);
    const navigate = useNavigate();

    let handleSelectChange = (e) => {
        setVishichka({
            type: vishichka.type,
            material: vishichka.material,
            materialId: vishichka.materialId,
            size: e.target.value
        })
    }

    let handleToggle = (e) => {
        if (vishichka.type === "Не потрібно") {
            setVishichka({
                type: "З глянцевим ламінуванням",
                material: "З глянцевим ламінуванням",
                materialId: "92",
                size: "Брошурування до 120 аркушів"
            })
        } else {
            setVishichka({
                type: "Не потрібно",
                material: "",
                materialId: "",
                size: ""
            })
        }
    }

    let handleClickSize = (e) => {
        setVishichka({
            type: vishichka.type,
            material: vishichka.material,
            materialId: vishichka.materialId,
            size: e
        })
    }
    let handleClickType = (e) => {
        setVishichka({
            type: vishichka.type,
            material: e.name,
            materialId: e.id,
            size: vishichka.size
        })
    }

    useEffect(() => {
        let data = {
            name: "MaterialsPrices",
            inPageCount: 999999,
            currentPage: 1,
            search: "",
            columnName: {
                column: "id",
                reverse: false
            },
            material: {type: "Vishichka"},
        }
        axios.post(`/materials/NotAll`, data)
            .then(response => {
                console.log(response.data);
                setThisVishichka(response.data.rows)
                if(response.data && response.data.rows && response.data.rows[0]){
                    setVishichka({
                        ...vishichka,
                        material: response.data.rows[0].name,
                        materialId: response.data.rows[0].id,
                    })
                }
            })
            .catch(error => {
                if (error.response.status === 403) {
                    navigate('/login');
                }
                console.log(error.message);
            })
    }, []);

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
                    {vishichka.type !== "Не потрібно" ? (
                        <div style={{
                            display: 'flex',
                            flexDirection: "column",
                            // justifyContent: 'center',
                            // alignItems: 'center',
                        }} className="m-0 p-0">
                            {/*<div className="m-0 p-0" style={{*/}
                            {/*    display: 'flex',*/}
                            {/*    justifyContent: 'center',*/}
                            {/*    alignItems: 'center',*/}
                            {/*    // marginLeft: "2vw",*/}
                            {/*}}>*/}
                            {/*    {buttonsArr.map((item, index) => (<button*/}
                            {/*        className={item === vishichka.size ? 'buttonsArtem buttonsArtemActive' : 'buttonsArtem'}*/}
                            {/*        key={index}*/}
                            {/*        onClick={() => handleClickSize(item)}*/}
                            {/*    >*/}
                            {/*        <div className="" style={{*/}
                            {/*            height: "100%",*/}
                            {/*            opacity: item === vishichka.size ? '100%' : '90%',*/}
                            {/*            whiteSpace: "nowrap",*/}
                            {/*        }}>*/}
                            {/*            {item}*/}
                            {/*        </div>*/}
                            {/*    </button>))}*/}
                            {/*</div>*/}
                            <div className="d-flex align-content-between justify-content-lg-between">
                                {thisVishichka.map((item, index) => (
                                    <button
                                        key={item.id}
                                        className={item.id === vishichka.materialId ? 'buttonsArtem buttonsArtemActive' : 'buttonsArtem buttonsArtemNotActive'}
                                        onClick={() => handleClickType(item)}
                                    >
                                        <div className="d-flex flex-column align-content-center align-items-center" style={{
                                            // width: "10vw",
                                            height: "100%",
                                            opacity: item.id === vishichka.materialId ? '100%' : '90%',
                                            whiteSpace: "nowrap",
                                        }}>
                                            <img src={iconArray[index]} alt="З плотерною надсічкою на надрукованих аркушах" style={{height: "10vw"}}/>
                                            {/*{"З плотерною надсічкою на надрукованих аркушах"}*/}
                                            {item.name}
                                        </div>
                                    </button>
                                ))}
                                {/*<button*/}
                                {/*    className={"З плотерною надсічкою на надрукованих аркушах" === vishichka.type ? 'buttonsArtem buttonsArtemActive' : 'buttonsArtem buttonsArtemNotActive'}*/}
                                {/*    onClick={() => handleClickType("З плотерною надсічкою на надрукованих аркушах")}*/}
                                {/*>*/}
                                {/*    <div className="d-flex flex-column align-content-center align-items-center" style={{*/}
                                {/*        // width: "10vw",*/}
                                {/*        height: "100%",*/}
                                {/*        opacity: "З плотерною надсічкою на надрукованих аркушах" === vishichka.size ? '100%' : '90%',*/}
                                {/*        whiteSpace: "nowrap",*/}
                                {/*    }}>*/}
                                {/*        <img src={nashichka} alt="З плотерною надсічкою на надрукованих аркушах" style={{height: "10vw"}}/>*/}
                                {/*        {"З плотерною надсічкою на надрукованих аркушах"}*/}
                                {/*    </div>*/}
                                {/*</button>*/}
                                {/*<button*/}
                                {/*    className={"З плотерною порізкою стікерпаків" === vishichka.type ? 'buttonsArtem buttonsArtemActive' : 'buttonsArtem buttonsArtemNotActive'}*/}
                                {/*    onClick={() => handleClickType("З плотерною порізкою стікерпаків")}*/}
                                {/*>*/}
                                {/*    <div className="d-flex flex-column align-content-center align-items-center" style={{*/}
                                {/*        // width: "10vw",*/}
                                {/*        height: "100%",*/}
                                {/*        opacity: "З плотерною порізкою стікерпаків" === vishichka.size ? '100%' : '90%',*/}
                                {/*        whiteSpace: "nowrap",*/}
                                {/*    }}>*/}
                                {/*        <img src={porizka} alt="З плотерною порізкою стікерпаків" style={{height: "10vw"}}/>*/}
                                {/*        {"З плотерною порізкою стікерпаків"}*/}
                                {/*    </div>*/}
                                {/*</button>*/}
                                {/*<button*/}
                                {/*    className={"З плотерною порізкою окремими виробами" === vishichka.type ? 'buttonsArtem buttonsArtemActive' : 'buttonsArtem buttonsArtemNotActive'}*/}
                                {/*    onClick={() => handleClickType("З плотерною порізкою окремими виробами")}*/}
                                {/*>*/}
                                {/*    <div className="d-flex flex-column align-content-center align-items-center" style={{*/}
                                {/*        // width: "10vw",*/}
                                {/*        height: "100%",*/}
                                {/*        opacity: "З плотерною порізкою окремими виробами" === vishichka.size ? '100%' : '90%',*/}
                                {/*        whiteSpace: "nowrap",*/}
                                {/*    }}>*/}
                                {/*        <img src={porizkaOkremimi} alt="З плотерною порізкою окремими виробами" style={{height: "10vw"}}/>*/}
                                {/*        {"З плотерною порізкою окремими виробами"}*/}
                                {/*    </div>*/}
                                {/*</button>*/}
                            </div>
                        </div>) : (<div>

                    </div>)}
                </div>
            </div>
        </div>
    )
};

export default VishichkaVibor;
