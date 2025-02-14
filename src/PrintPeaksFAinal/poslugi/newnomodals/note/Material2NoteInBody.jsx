import React, {useEffect, useState} from "react";
import axios from '../../../../api/axiosInstance';
import {useNavigate} from "react-router-dom";
import {Spinner} from "react-bootstrap";

const Materials2NoteInBody = ({
                                  materialAndDrukInBody,
                                  setMaterialAndDrukInBody,
                                  count,
                                  setCount,
                                  prices,
                                  type,
                                  name,
                                  buttonsArr,
                                  buttonsArrDruk,
                                  buttonsArrColor,
                                  selectArr,
                                  typeUse,
                                  size
                              }) => {
    const [paperColorDruk, setPaperColorDruk] = useState([]);
    const [paperBwDruk, setPaperBwDruk] = useState([]);
    const [paperNonDruk, setPaperNonDruk] = useState([]);
    const [error, setError] = useState(null);
    const [load, setLoad] = useState(true);
    const navigate = useNavigate();
    let handleSelectChange = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const selectedId = selectedOption.getAttribute('data-id') || 'default';
        const selectedValue = e.target.value || '';

        setMaterialAndDrukInBody((prevMaterial) => ({
            ...prevMaterial,
            material: selectedValue,
            materialId: selectedId,
        }));
    }
    let handleSelectTypeChange = (e) => {
        const selectedValue = e.target.value || '';

        setMaterialAndDrukInBody((prevMaterial) => ({
            ...prevMaterial,
            materialTypeUse: selectedValue,
        }));
    }
    let handleSelectDrukSidesChange = (e) => {
        const selectedValue = e.target.value || '';

        setMaterialAndDrukInBody((prevMaterial) => ({
            ...prevMaterial,
            drukSides: selectedValue,
        }));
    }
    let handleSelectDrukColorChange = (e) => {
        const selectedValue = e.target.value || '';

        setMaterialAndDrukInBody((prevMaterial) => ({
            ...prevMaterial,
            drukColor: selectedValue,
        }));
    }

    let handleClick = (e) => {
        setMaterialAndDrukInBody({
            ...materialAndDrukInBody,
            drukSides: e
        })
    }

    let handleToggleColor = (e) => {
        if (materialAndDrukInBody.ColorDrukMaterialType === "Не потрібно") {
            setMaterialAndDrukInBody({
                ...materialAndDrukInBody,
                ColorDrukMaterialType: "",
            })
        } else {
            setMaterialAndDrukInBody({
                ...materialAndDrukInBody,
                ColorDrukMaterialType: "Не потрібно",
            })
        }
    }
    let handleToggleBw = (e) => {
        if (materialAndDrukInBody.BwDrukMaterialType === "Не потрібно") {
            setMaterialAndDrukInBody({
                ...materialAndDrukInBody,
                BwDrukMaterialType: "",
            })
        } else {
            setMaterialAndDrukInBody({
                ...materialAndDrukInBody,
                BwDrukMaterialType: "Не потрібно",
            })
        }
    }
    let handleToggleNonDruk = (e) => {
        if (materialAndDrukInBody.NonDrukMaterialType === "Не потрібно") {
            setMaterialAndDrukInBody({
                ...materialAndDrukInBody,
                NonDrukMaterialType: "",
            })
        } else {
            setMaterialAndDrukInBody({
                ...materialAndDrukInBody,
                NonDrukMaterialType: "Не потрібно",
            })
        }
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
                type: materialAndDrukInBody.ColorDrukMaterialType,
                typeUse: materialAndDrukInBody.ColorDrukMaterialTypeUse,
            },
        }
        setLoad(true)
        setError(null)
        axios.post(`/materials/NotAll`, data)
            .then(response => {
                // console.log(response.data);
                setPaperColorDruk(response.data.rows)
                setLoad(false)
                if (response.data && response.data.rows && response.data.rows[0]) {
                    setMaterialAndDrukInBody({
                        ...materialAndDrukInBody,
                        ColorDrukMaterial: response.data.rows[0].name,
                        ColorDrukMaterialId: response.data.rows[0].id,
                    })
                } else {
                    setMaterialAndDrukInBody({
                        ...materialAndDrukInBody,
                        ColorDrukMaterial: "Немає",
                        ColorDrukMaterialId: 0,
                    })
                }
            })
            .catch(error => {
                setLoad(false)
                setError(error.message)
                if (error.response.status === 403) {
                    navigate('/login');
                }
                console.log(error.message);
            })
    }, [materialAndDrukInBody.ColorDrukMaterialType, size]);
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
                type: materialAndDrukInBody.ColorDrukMaterialType,
                typeUse: materialAndDrukInBody.ColorDrukMaterialTypeUse,
            },
        }
        setLoad(true)
        setError(null)
        axios.post(`/materials/NotAll`, data)
            .then(response => {
                // console.log(response.data);
                setPaperColorDruk(response.data.rows)
                setLoad(false)
                if (response.data && response.data.rows && response.data.rows[0]) {
                    setMaterialAndDrukInBody({
                        ...materialAndDrukInBody,
                        BwDrukMaterial: response.data.rows[0].name,
                        BwDrukMaterialId: response.data.rows[0].id,
                    })
                } else {
                    setMaterialAndDrukInBody({
                        ...materialAndDrukInBody,
                        BwDrukMaterial: "Немає",
                        BwDrukMaterialId: 0,
                    })
                }
            })
            .catch(error => {
                setLoad(false)
                setError(error.message)
                if (error.response.status === 403) {
                    navigate('/login');
                }
                console.log(error.message);
            })
    }, [materialAndDrukInBody.BwDrukMaterialType, size]);
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
                type: materialAndDrukInBody.BwDrukMaterialType,
                typeUse: materialAndDrukInBody.BwDrukMaterialTypeUse,
            },
        }
        setLoad(true)
        setError(null)
        axios.post(`/materials/NotAll`, data)
            .then(response => {
                // console.log(response.data);
                setPaperColorDruk(response.data.rows)
                setLoad(false)
                if (response.data && response.data.rows && response.data.rows[0]) {
                    setMaterialAndDrukInBody({
                        ...materialAndDrukInBody,
                        NonDrukMaterial: response.data.rows[0].name,
                        NonDrukMaterialId: response.data.rows[0].id,
                    })
                } else {
                    setMaterialAndDrukInBody({
                        ...materialAndDrukInBody,
                        NonDrukMaterial: "Немає",
                        NonDrukMaterialId: 0,
                    })
                }
            })
            .catch(error => {
                setLoad(false)
                setError(error.message)
                if (error.response.status === 403) {
                    navigate('/login');
                }
                console.log(error.message);
            })
    }, [materialAndDrukInBody.ColorDrukMaterialType, size]);

    return (
        <div className="d-flex flex-column allArtemElem" style={{margin: "0", padding: "0", height: "12vh"}}>
            <div className="" style={{fontSize: "1.2vw", fontFamily: "Gotham", margin: "0", padding: "0"}}>Блок: </div>


            <div className="d-flex">
                <div className={`toggleContainer ${materialAndDrukInBody.ColorDrukMaterialType === "Не потрібно" ? 'disabledCont' : 'enabledCont'}`}
                     onClick={handleToggleColor}
                     style={{transform: "scale(0.6)"}}>
                    <div className={`toggle-button ${materialAndDrukInBody.ColorDrukMaterialType === "Не потрібно" ? 'disabled' : 'enabledd'}`}>
                    </div>
                </div>
                <span style={{
                    fontSize: '1.273vw', marginRight: '0.633vw', fontFamily: "Gotham", whiteSpace: "nowrap"
                }}>{"Листи з цифровим Кольоровим друком:"}</span>
                {materialAndDrukInBody.ColorDrukMaterialType === "Не потрібно" ? (
                    <div></div>
                ) : (
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{fontSize: "1.2vw", fontFamily: "Gotham"}}>Матеріал: </div>
                        <div className="ArtemNewSelectContainer"
                             style={{marginTop: "0", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <select
                                name="materialSelect"
                                value={materialAndDrukInBody.materialTypeUse || ""}
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
                        <div className="ArtemNewSelectContainer"
                             style={{marginTop: "0", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <select
                                name="materialSelect"
                                value={materialAndDrukInBody.material || ""}
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
                                {paperColorDruk.map((item, iter) => (
                                    <option
                                        key={item.name + iter}
                                        className={"optionInSelectArtem"}
                                        value={item.name}
                                        data-id={item.id}
                                    >
                                        <>{item.name}</>
                                        <>{" "}</>
                                        <>{item.thickness} мл</>
                                    </option>
                                ))}
                            </select>
                            {load && (
                                <Spinner animation="border" variant="danger" size="sm"/>
                            )}
                            {error && (
                                <div>{error}</div>
                            )}
                        </div>
                        <div style={{fontSize: "1.2vw", fontFamily: "Gotham"}}>Друк: </div>
                        <div className="ArtemNewSelectContainer"
                             style={{marginTop: "0", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <select
                                name="materialSelect"
                                value={materialAndDrukInBody.drukColor || ""}
                                onChange={(event) => handleSelectDrukColorChange(event)}
                                className="selectArtem"
                            >
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
                        {materialAndDrukInBody.drukColor !== "Не потрібно" &&
                            <div className="ArtemNewSelectContainer"
                                 style={{marginTop: "0", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <select
                                    name="materialSelect"
                                    value={materialAndDrukInBody.drukSides || ""}
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
                    </div>
                )}
            </div>


            <div className="d-flex">
                <div className={`toggleContainer ${materialAndDrukInBody.BwDrukMaterialType === "Не потрібно" ? 'disabledCont' : 'enabledCont'}`}
                     onClick={handleToggleBw}
                     style={{transform: "scale(0.6)"}}>
                    <div className={`toggle-button ${materialAndDrukInBody.BwDrukMaterialType === "Не потрібно" ? 'disabled' : 'enabledd'}`}>
                    </div>
                </div>
                <span style={{
                    fontSize: '1.273vw', marginRight: '0.633vw', fontFamily: "Gotham", whiteSpace: "nowrap"
                }}>{"Листи з цифровим Ч/Б друком:"}</span>
                {materialAndDrukInBody.BwDrukMaterialType === "Не потрібно" ? (
                    <div></div>
                ) : (
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{fontSize: "1.2vw", fontFamily: "Gotham"}}>Матеріал: </div>
                        <div className="ArtemNewSelectContainer"
                             style={{marginTop: "0", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <select
                                name="materialSelect"
                                value={materialAndDrukInBody.materialTypeUse || ""}
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
                        <div className="ArtemNewSelectContainer"
                             style={{marginTop: "0", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <select
                                name="materialSelect"
                                value={materialAndDrukInBody.material || ""}
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
                                {paperBwDruk.map((item, iter) => (
                                    <option
                                        key={item.name + iter}
                                        className={"optionInSelectArtem"}
                                        value={item.name}
                                        data-id={item.id}
                                    >
                                        <>{item.name}</>
                                        <>{" "}</>
                                        <>{item.thickness} мл</>
                                    </option>
                                ))}
                            </select>
                            {load && (
                                <Spinner animation="border" variant="danger" size="sm"/>
                            )}
                            {error && (
                                <div>{error}</div>
                            )}
                        </div>
                        <div style={{fontSize: "1.2vw", fontFamily: "Gotham"}}>Друк: </div>
                        <div className="ArtemNewSelectContainer"
                             style={{marginTop: "0", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <select
                                name="materialSelect"
                                value={materialAndDrukInBody.drukColor || ""}
                                onChange={(event) => handleSelectDrukColorChange(event)}
                                className="selectArtem"
                            >
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
                        {materialAndDrukInBody.drukColor !== "Не потрібно" &&
                            <div className="ArtemNewSelectContainer"
                                 style={{marginTop: "0", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <select
                                    name="materialSelect"
                                    value={materialAndDrukInBody.drukSides || ""}
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
                    </div>
                )}
            </div>


            <div className="d-flex">
                <div className={`toggleContainer ${materialAndDrukInBody.NonDrukMaterialType === "Не потрібно" ? 'disabledCont' : 'enabledCont'}`}
                     onClick={handleToggleNonDruk}
                     style={{transform: "scale(0.6)"}}>
                    <div className={`toggle-button ${materialAndDrukInBody.NonDrukMaterialType === "Не потрібно" ? 'disabled' : 'enabledd'}`}>
                    </div>
                </div>
                <span style={{
                    fontSize: '1.273vw', marginRight: '0.633vw', fontFamily: "Gotham", whiteSpace: "nowrap"
                }}>{"Листи без друку:"}</span>
                {materialAndDrukInBody.NonDrukMaterialType === "Не потрібно" ? (
                    <div></div>
                ) : (
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{fontSize: "1.2vw", fontFamily: "Gotham"}}>Матеріал: </div>
                        <div className="ArtemNewSelectContainer"
                             style={{marginTop: "0", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <select
                                name="materialSelect"
                                value={materialAndDrukInBody.materialTypeUse || ""}
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
                        <div className="ArtemNewSelectContainer"
                             style={{marginTop: "0", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <select
                                name="materialSelect"
                                value={materialAndDrukInBody.material || ""}
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
                                {paperNonDruk.map((item, iter) => (
                                    <option
                                        key={item.name + iter}
                                        className={"optionInSelectArtem"}
                                        value={item.name}
                                        data-id={item.id}
                                    >
                                        <>{item.name}</>
                                        <>{" "}</>
                                        <>{item.thickness} мл</>
                                    </option>
                                ))}
                            </select>
                            {load && (
                                <Spinner animation="border" variant="danger" size="sm"/>
                            )}
                            {error && (
                                <div>{error}</div>
                            )}
                        </div>
                        <div style={{fontSize: "1.2vw", fontFamily: "Gotham"}}>Друк: </div>
                        <div className="ArtemNewSelectContainer"
                             style={{marginTop: "0", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <select
                                name="materialSelect"
                                value={materialAndDrukInBody.drukColor || ""}
                                onChange={(event) => handleSelectDrukColorChange(event)}
                                className="selectArtem"
                            >
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
                        {materialAndDrukInBody.drukColor !== "Не потрібно" &&
                            <div className="ArtemNewSelectContainer"
                                 style={{marginTop: "0", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <select
                                    name="materialSelect"
                                    value={materialAndDrukInBody.drukSides || ""}
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
                    </div>
                )}
            </div>
        </div>
    )
};

export default Materials2NoteInBody;
