import React, {useEffect, useState} from "react";
import axios from '../../../../api/axiosInstance';
import {useNavigate} from "react-router-dom";
import {Spinner} from "react-bootstrap";

const Materials2NoteFront = ({materialAndDrukFront, setMaterialAndDrukFront, count, setCount, prices, type, name, buttonsArr, buttonsArrDruk, buttonsArrColor, selectArr, typeUse, size}) => {
    const [paper, setPaper] = useState([]);
    const [error, setError] = useState(null);
    const [load, setLoad] = useState(true);
    const navigate = useNavigate();
    let handleSelectChange = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const selectedId = selectedOption.getAttribute('data-id') || 'default';
        const selectedValue = e.target.value || '';

        setMaterialAndDrukFront((prevMaterial) => ({
            ...prevMaterial,
            material: selectedValue,
            materialId: selectedId,
        }));
    }
    let handleSelectTypeChange = (e) => {
        const selectedValue = e.target.value || '';

        setMaterialAndDrukFront((prevMaterial) => ({
            ...prevMaterial,
            materialTypeUse: selectedValue,
        }));
    }
    let handleSelectDrukSidesChange = (e) => {
        const selectedValue = e.target.value || '';

        setMaterialAndDrukFront((prevMaterial) => ({
            ...prevMaterial,
            drukSides: selectedValue,
        }));
    }
    let handleSelectDrukColorChange = (e) => {
        const selectedValue = e.target.value || '';

        setMaterialAndDrukFront((prevMaterial) => ({
            ...prevMaterial,
            drukColor: selectedValue,
        }));
    }

    let handleClick = (e) => {
        setMaterialAndDrukFront({
            ...materialAndDrukFront,
            drukSides: e
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
            size: size,
            material: {
                type: materialAndDrukFront.materialType,
                typeUse: materialAndDrukFront.materialTypeUse,
            },
        }
        // console.log(data);
        setLoad(true)
        setError(null)
        axios.post(`/materials/NotAll`, data)
            .then(response => {
                // console.log(response.data);
                setPaper(response.data.rows)
                setLoad(false)
                if(response.data && response.data.rows && response.data.rows[0]){
                    setMaterialAndDrukFront({
                        ...materialAndDrukFront,
                        material: response.data.rows[0].name,
                        materialId: response.data.rows[0].id,
                    })
                } else {
                    setMaterialAndDrukFront({
                        ...materialAndDrukFront,
                        material: "Немає",
                        materialId: 0,
                    })
                }
            })
            .catch(error => {
                setLoad(false)
                setError(error.message)
                if(error.response.status === 403){
                    navigate('/login');
                }
                console.log(error.message);
            })
    }, [materialAndDrukFront.materialTypeUse, size]);

    return (
        <div className="d-flex allArtemElem" style={{margin: "0", padding: "0", borderBottom: '0.08vw solid gray'}}>
            <div className="d-flex align-items-center justify-content-center" style={{fontSize: "1vw", width: "9vw", fontFamily: "Gotham", fontWeight: "bold", marginBottom: "1vh"}}>Обкладинка: </div>
            <div style={{display: 'flex', alignItems: 'center', paddingBottom: "1vh"}}>
                <div style={{fontSize: "0.8vw", fontFamily: "Gotham"}}>Матеріал: </div>
                <div className="ArtemNewSelectContainer" style={{marginTop: "0", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <select
                        name="materialSelect"
                        value={materialAndDrukFront.materialTypeUse || ""}
                        onChange={(event) => handleSelectTypeChange(event)}
                        className="selectArtem"
                    >
                        <option
                            key="default"
                            className={"optionInSelectArtem"}
                            value=""
                            data-id="default"
                        >
                            <>{"Виберіть"}</>
                        </option>
                        {buttonsArr.map((item, iter) => (
                            <option
                                key={item + iter}
                                className={"optionInSelectArtem"}
                                value={item}
                                data-id={item}
                            >
                                <>{item}</>
                            </option>
                        ))}
                    </select>
                </div>
                <div className="ArtemNewSelectContainer" style={{marginTop: "0", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <select
                        name="materialSelect"
                        value={materialAndDrukFront.material || ""}
                        onChange={(event) => handleSelectChange(event)}
                        className="selectArtem"

                    >
                        <option
                            key="default"
                            className={"optionInSelectArtem"}
                            value=""
                            data-id="default"
                        >
                            <>{"Виберіть"}</>
                        </option>
                        {paper.map((item, iter) => (
                            <option
                                key={item.name + iter}
                                className={"optionInSelectArtem"}
                                value={item.name}
                                data-id={item.id}
                            >
                                {/*<>{"id:"}</>*/}
                                {/*<>{item.id}</>*/}
                                {/*<>{" "}</>*/}
                                <>{item.name}</>
                                <>{" "}</>
                                <>{item.thickness} мл</>
                                {/*<>{"id:"}</>*/}
                                {/*<>{item.typeUse}</>*/}
                                {/*<>{" "}</>*/}
                            </option>
                        ))}
                    </select>
                    {load && (
                        <Spinner animation="border" variant="danger" size="sm" />
                    )}
                    {error && (
                        <div>{error}</div>
                    )}
                </div>
                <div style={{fontSize: "0.8vw", fontFamily: "Gotham", marginLeft: "3vw"}}>Друк: </div>
                <div className="ArtemNewSelectContainer"
                     style={{marginTop: "0", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <select
                        name="materialSelect"
                        value={materialAndDrukFront.drukColor || ""}
                        onChange={(event) => handleSelectDrukColorChange(event)}
                        className="selectArtem"
                    >
                        {/*<option*/}
                        {/*    key="default"*/}
                        {/*    className={"optionInSelectArtem"}*/}
                        {/*    value=""*/}
                        {/*    data-id="default"*/}
                        {/*>*/}
                        {/*    <>{"Виберіть"}</>*/}
                        {/*</option>*/}
                        {buttonsArrColor.map((item, iter) => (
                            <option
                                key={item + iter}
                                className={"optionInSelectArtem"}
                                value={item}
                                data-id={item}
                            >
                                <>{item}</>
                            </option>
                        ))}
                    </select>
                </div>
                {materialAndDrukFront.drukColor !== "Не потрібно" &&
                    <div className="ArtemNewSelectContainer"
                         style={{marginTop: "0", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <select
                            name="materialSelect"
                            value={materialAndDrukFront.drukSides || ""}
                            onChange={(event) => handleSelectDrukSidesChange(event)}
                            className="selectArtem"
                        >
                            <option
                                key="default"
                                className={"optionInSelectArtem"}
                                value=""
                                data-id="default"
                            >
                                <>{"Виберіть"}</>
                            </option>
                            {buttonsArrDruk.map((item, iter) => (
                                <option
                                    key={item + iter}
                                    className={"optionInSelectArtem"}
                                    value={item}
                                    data-id={item}
                                >
                                    <>{item}</>
                                </option>
                            ))}
                        </select>
                    </div>
                }
                {/*<LaminationNote*/}
                {/*    materialAndDruk={materialAndDrukFront}*/}
                {/*    setMaterialAndDruk={materialAndDrukFront}*/}
                {/*    prices={prices}*/}
                {/*    size={size}*/}
                {/*    type={"Note"}*/}
                {/*    buttonsArr={["З глянцевим ламінуванням",*/}
                {/*        "З матовим ламінуванням",*/}
                {/*        "З ламінуванням Soft Touch",]}*/}
                {/*/>*/}

                {/*<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: "2vw"}}>*/}
                {/*    {buttonsArrDruk.map((item, index) => (*/}
                {/*        <button*/}
                {/*            className={item === materialAndDrukFront.drukSides ? 'buttonsArtem buttonsArtemActive' : 'buttonsArtem'}*/}
                {/*            key={index}*/}
                {/*            onClick={() => handleClick(item)}*/}
                {/*            // style={{*/}
                {/*            //     backgroundColor: item === color.sides ? 'orange' : 'transparent',*/}
                {/*            //     border: item === color.sides ? '0.13vw solid transparent' : '0.13vw solid transparent',*/}
                {/*            // }}*/}
                {/*        >*/}
                {/*            <div className="" style={{*/}
                {/*                height: "100%",*/}
                {/*                opacity: item === materialAndDrukFront.drukSides ? '100%' : '90%',*/}
                {/*                whiteSpace: "nowrap",*/}
                {/*            }}>*/}
                {/*                {item}*/}
                {/*            </div>*/}
                {/*        </button>*/}
                {/*    ))}*/}
                {/*</div>*/}
            </div>
        </div>
    )
};

export default Materials2NoteFront;