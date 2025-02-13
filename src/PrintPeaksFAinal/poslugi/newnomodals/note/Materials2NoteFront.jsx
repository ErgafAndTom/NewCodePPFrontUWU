import React, {useEffect, useState} from "react";
import axios from '../../../../api/axiosInstance';
import {useNavigate} from "react-router-dom";
import {Spinner} from "react-bootstrap";

const Materials2NoteFront = ({materialAndDrukFront, setMaterialAndDrukFront, count, setCount, prices, type, name, buttonsArr, selectArr, typeUse, size}) => {
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

    // let handleClick = (e) => {
    //     if(e === "Самоклеючі"){
    //         setMaterialAndDrukFront({
    //             type: "Плівка",
    //             thickness: e,
    //             material: material.material,
    //             materialId: material.materialId,
    //             typeUse: e
    //         })
    //     } else {
    //         setMaterialAndDrukFront({
    //             type: "Папір",
    //             thickness: e,
    //             material: material.material,
    //             materialId: material.materialId,
    //             typeUse: e
    //         })
    //     }
    // }

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
        <div className="d-flex allArtemElem">
            <div style={{display: 'flex', alignItems: 'center',}}>
                {/*<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>*/}
                {/*    {buttonsArr.map((item, index) => (*/}
                {/*        <div*/}
                {/*            className={item === material.thickness ? 'buttonsArtem buttonsArtemActive' : 'buttonsArtem'}*/}
                {/*            key={index}*/}
                {/*            onClick={() => handleClick(item)}*/}
                {/*            // style={{*/}
                {/*            //     backgroundColor: item === material.thickness ? 'orange' : 'transparent',*/}
                {/*            //     border: item === material.thickness ? '0.13vw solid transparent' : '0.13vw solid transparent',*/}
                {/*            // }}*/}
                {/*        >*/}
                {/*            <div className="" style={{*/}
                {/*                height: "100%",*/}
                {/*                opacity: item === material.thickness ? '100%' : '70%',*/}
                {/*                whiteSpace: "nowrap",*/}
                {/*            }}>*/}
                {/*                {item}*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    ))}*/}
                {/*</div>*/}
                <div className="ArtemNewSelectContainer" style={{marginTop: "2vw", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div>Обкладинка: </div>
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
                                {/*<>{"id:"}</>*/}
                                {/*<>{item.id}</>*/}
                                {/*<>{" "}</>*/}
                                <>{item}</>
                                {/*<>{" "}</>*/}
                                {/*<>{item.thickness} мл</>*/}
                                {/*<>{"id:"}</>*/}
                                {/*<>{item.typeUse}</>*/}
                                {/*<>{" "}</>*/}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="ArtemNewSelectContainer" style={{marginTop: "2vw", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
            </div>
        </div>
    )
};

export default Materials2NoteFront;
