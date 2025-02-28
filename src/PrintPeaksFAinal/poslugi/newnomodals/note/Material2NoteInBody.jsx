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
                                  buttonsArrLamination,
                                  selectArr,
                                  typeUse,
                                  size
                              }) => {
    const [paperColorDruk, setPaperColorDruk] = useState([]);
    const [paperBwDruk, setPaperBwDruk] = useState([]);
    const [paperNonDruk, setPaperNonDruk] = useState([]);
    const [loadPaperColor, setLoadPaperColor] = useState(true);
    const [loadPaperBW, setLoadPaperBW] = useState(true);
    const [loadPaperNON, setLoadPaperNON] = useState(true);
    const [laminationColorDruk, setLaminationColorDruk] = useState([]);
    const [laminationBwDruk, setLaminationBwDruk] = useState([]);
    const [laminationNonDruk, setLaminationNonDruk] = useState([]);
    const [loadLaminationColor, setLoadLaminationColor] = useState(true);
    const [loadLaminationBW, setLoadLaminationBW] = useState(true);
    const [loadLaminationNON, setLoadLaminationNON] = useState(true);
    const [error, setError] = useState(null);
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

    //COLOR-------------------------------------------------------------------------------------------------------------------------
    let handleSelectTypeColorChange = (e) => {
        const selectedValue = e.target.value || '';

        setMaterialAndDrukInBody((prevMaterial) => ({
            ...prevMaterial,
            ColorDrukMaterialTypeUse: selectedValue,
        }));
    }
    let handleToggleColor = (e) => {
        if (materialAndDrukInBody.ColorDrukMaterialType === "Не потрібно") {
            setMaterialAndDrukInBody({
                ...materialAndDrukInBody,
                ColorDrukMaterialType: "Папір",
            })
        } else {
            setMaterialAndDrukInBody({
                ...materialAndDrukInBody,
                ColorDrukMaterialType: "Не потрібно",
            })
        }
    }
    let handleToggleColorLamination = (e) => {
        if (materialAndDrukInBody.ColorDrukLaminationType === "Не потрібно") {
            setMaterialAndDrukInBody({
                ...materialAndDrukInBody,
                ColorDrukLaminationType: "",
            })
        } else {
            setMaterialAndDrukInBody({
                ...materialAndDrukInBody,
                ColorDrukLaminationType: "Не потрібно",
            })
        }
    }
    let handleSelectDrukColorLamination = (e) => {
        const selectedValue = e.target.value || '';

        setMaterialAndDrukInBody((prevMaterial) => ({
            ...prevMaterial,
            ColorDrukLaminationTypeUse: selectedValue,
        }));
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
        setLoadPaperColor(true)
        setError(null)
        axios.post(`/materials/NotAll`, data)
            .then(response => {
                // console.log(response.data);
                setPaperColorDruk(response.data.rows)
                setLoadPaperColor(false)
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
                setLoadPaperColor(false)
                setError(error.message)
                if (error.response.status === 403) {
                    navigate('/login');
                }
                console.log(error.message);
            })
    }, [materialAndDrukInBody.ColorDrukMaterialType, materialAndDrukInBody.ColorDrukMaterialTypeUse, size]);
    useEffect(() => {
        let data = {
            name: "MaterialsPrices",
            inPageCount: 999999,
            currentPage: 1,
            type: "SheetCut",
            search: "",
            columnName: {
                column: "id",
                reverse: false
            },
            size: size,
            material: {
                type: "Ламінування",
                material: materialAndDrukInBody.ColorDrukLaminationTypeUse,
            },
        }
        setLoadLaminationColor(true)
        setError(null)
        axios.post(`/materials/NotAll`, data)
            .then(response => {
                // console.log(response.data);
                setLaminationColorDruk(response.data.rows)
                setLoadLaminationColor(false)
                if (response.data && response.data.rows && response.data.rows[0]) {
                    setMaterialAndDrukInBody({
                        ...materialAndDrukInBody,
                        ColorDrukLaminationMaterial: response.data.rows[0].name,
                        ColorDrukLaminationMaterialId: response.data.rows[0].id,
                    })
                } else {
                    setMaterialAndDrukInBody({
                        ...materialAndDrukInBody,
                        ColorDrukLaminationMaterial: "Немає",
                        ColorDrukLaminationMaterialId: 0,
                    })
                }
            })
            .catch(error => {
                setLoadLaminationColor(false)
                setError(error.message)
                if (error.response.status === 403) {
                    navigate('/login');
                }
                console.log(error.message);
            })
    }, [materialAndDrukInBody.ColorDrukLaminationType, materialAndDrukInBody.ColorDrukLaminationTypeUse, size]);



    //BW----------------------------------------------------------------------------------------------------------------------------------
    let handleSelectTypeBWChange = (e) => {
        const selectedValue = e.target.value || '';

        setMaterialAndDrukInBody((prevMaterial) => ({
            ...prevMaterial,
            BwDrukMaterialTypeUse: selectedValue,
        }));
    }
    let handleToggleBw = (e) => {
        if (materialAndDrukInBody.BwDrukMaterialType === "Не потрібно") {
            setMaterialAndDrukInBody({
                ...materialAndDrukInBody,
                BwDrukMaterialType: "Папір",
            })
        } else {
            setMaterialAndDrukInBody({
                ...materialAndDrukInBody,
                BwDrukMaterialType: "Не потрібно",
            })
        }
    }
    let handleToggleBwLamination = (e) => {
        if (materialAndDrukInBody.BwDrukLaminationType === "Не потрібно") {
            setMaterialAndDrukInBody({
                ...materialAndDrukInBody,
                BwDrukLaminationType: "",
            })
        } else {
            setMaterialAndDrukInBody({
                ...materialAndDrukInBody,
                BwDrukLaminationType: "Не потрібно",
            })
        }
    }
    let handleSelectDrukBwLamination = (e) => {
        const selectedValue = e.target.value || '';

        setMaterialAndDrukInBody((prevMaterial) => ({
            ...prevMaterial,
            BwDrukLaminationTypeUse: selectedValue,
        }));
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
                type: materialAndDrukInBody.BwDrukMaterialType,
                typeUse: materialAndDrukInBody.BwDrukMaterialTypeUse,
            },
        }
        setLoadPaperBW(true)
        setError(null)
        axios.post(`/materials/NotAll`, data)
            .then(response => {
                // console.log(response.data);
                setPaperBwDruk(response.data.rows)
                setLoadPaperBW(false)
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
                setLoadPaperBW(false)
                setError(error.message)
                if (error.response.status === 403) {
                    navigate('/login');
                }
                console.log(error.message);
            })
    }, [materialAndDrukInBody.BwDrukMaterialType, materialAndDrukInBody.BwDrukMaterialTypeUse, size]);





    //NON---------------------------------------------------------------------------------------------------------------------
    let handleSelectTypeNONChange = (e) => {
        const selectedValue = e.target.value || '';

        setMaterialAndDrukInBody((prevMaterial) => ({
            ...prevMaterial,
            NonDrukMaterialTypeUse: selectedValue,
        }));
    }
    let handleToggleNonDruk = (e) => {
        if (materialAndDrukInBody.NonDrukMaterialType === "Не потрібно") {
            setMaterialAndDrukInBody({
                ...materialAndDrukInBody,
                NonDrukMaterialType: "Папір",
            })
        } else {
            setMaterialAndDrukInBody({
                ...materialAndDrukInBody,
                NonDrukMaterialType: "Не потрібно",
            })
        }
    }
    let handleToggleNonDrukLamination = (e) => {
        if (materialAndDrukInBody.NonDrukLaminationType === "Не потрібно") {
            setMaterialAndDrukInBody({
                ...materialAndDrukInBody,
                NonDrukLaminationType: "",
            })
        } else {
            setMaterialAndDrukInBody({
                ...materialAndDrukInBody,
                NonDrukLaminationType: "Не потрібно",
            })
        }
    }
    let handleSelectDrukNonLamination = (e) => {
        const selectedValue = e.target.value || '';

        setMaterialAndDrukInBody((prevMaterial) => ({
            ...prevMaterial,
            NonDrukLaminationTypeUse: selectedValue,
        }));
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
                type: materialAndDrukInBody.NonDrukMaterialType,
                typeUse: materialAndDrukInBody.NonDrukMaterialTypeUse,
            },
        }
        setLoadPaperNON(true)
        setError(null)
        axios.post(`/materials/NotAll`, data)
            .then(response => {
                // console.log(response.data);
                setPaperNonDruk(response.data.rows)
                setLoadPaperNON(false)
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
                setLoadPaperNON(false)
                setError(error.message)
                if (error.response.status === 403) {
                    navigate('/login');
                }
                console.log(error.message);
            })
    }, [materialAndDrukInBody.NonDrukMaterialType, materialAndDrukInBody.NonDrukMaterialTypeUse, size]);





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

    return (
        <div className="d-flex allArtemElem" style={{margin: "0", padding: "0", borderBottom: '0.08vw solid gray', marginBottom: "0.5vw"}}>
            <div className="d-flex align-items-center justify-content-center" style={{fontSize: "1vw", width: "9vw", fontFamily: "Gotham", margin: "0", padding: "0", fontWeight: "bold"}}>Блок: </div>

            <div className="d-flex flex-column">
                <div className="d-flex blockInNoteInBody">
                    <div className="d-flex">
                        <div className={`toggleContainer scale04ForButtonToggle ${materialAndDrukInBody.ColorDrukMaterialType === "Не потрібно" ? 'disabledCont' : 'enabledCont'}`}
                             onClick={handleToggleColor}
                        >
                            <div className={`toggle-button ${materialAndDrukInBody.ColorDrukMaterialType === "Не потрібно" ? 'disabled' : 'enabledd'}`}>
                            </div>
                        </div>
                        <span style={{
                            fontSize: '0.8vw', marginRight: '0.633vw', fontFamily: "Gotham", whiteSpace: "nowrap", marginTop: "0.8vw",
                        }}>{"З цифровим Кольоровим друком:"}</span>
                    </div>
                    {materialAndDrukInBody.ColorDrukMaterialType === "Не потрібно" ? (
                        <div style={{display: 'flex', alignItems: 'center', borderBottom: '0.08vw solid gray'}}></div>
                    ) : (
                        <div className="" style={{display: 'flex', alignItems: 'center', borderBottom: '0.08vw solid gray'}}>
                            <div style={{fontSize: "0.8vw", fontFamily: "Gotham"}}>Матеріал: </div>
                            <div className="ArtemNewSelectContainer"
                                 style={{marginTop: "0", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <select
                                    name="materialSelect"
                                    value={materialAndDrukInBody.ColorDrukMaterialTypeUse || ""}
                                    onChange={(event) => handleSelectTypeColorChange(event)}
                                    className="selectArtem"

                                >
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
                                    value={materialAndDrukInBody.ColorDrukMaterial || ""}
                                    onChange={(event) => handleSelectChange(event)}
                                    className="selectArtem"

                                >
                                    {paperColorDruk.map((item, iter) => (
                                        <option
                                            key={200 + iter}
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
                                {loadPaperColor && (
                                    <Spinner animation="border" variant="danger" size="sm"/>
                                )}
                                {error && (
                                    <div>{error}</div>
                                )}
                            </div>

                            <div className={`toggleContainer scale04ForButtonToggle ${materialAndDrukInBody.ColorDrukLaminationType === "Не потрібно" ? 'disabledCont' : 'enabledCont'}`}
                                 onClick={handleToggleColorLamination}
                            >
                                <div className={`toggle-button ${materialAndDrukInBody.ColorDrukLaminationType === "Не потрібно" ? 'disabled' : 'enabledd'}`}>
                                </div>
                            </div>
                            <span style={{
                                fontSize: '0.8vw', marginRight: '0.633vw', fontFamily: "Gotham", whiteSpace: "nowrap"
                            }}>{"Ламінація:"}</span>

                            {materialAndDrukInBody.ColorDrukLaminationType !== "Не потрібно" &&
                                <>
                                    <div className="ArtemNewSelectContainer"
                                         style={{marginTop: "0", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                        <select
                                            name="materialSelect"
                                            value={materialAndDrukInBody.ColorDrukLaminationTypeUse || ""}
                                            onChange={(event) => handleSelectDrukColorLamination(event)}
                                            className="selectArtem"
                                        >
                                            {buttonsArrLamination.map((item, iter) => (
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
                                                {laminationColorDruk.map((item, iter) => (
                                                    <option
                                                        key={item.thickness + iter}
                                                        className={"optionInSelectArtem"}
                                                        value={item.thickness}
                                                        data-id={item.id}
                                                    >
                                                        <>{item.thickness} мл</>
                                                    </option>
                                                ))}
                                            </select>
                                            {loadLaminationColor && (
                                                <Spinner animation="border" variant="danger" size="sm"/>
                                            )}
                                        </div>
                                    }
                                </>
                            }
                        </div>
                    )}
                </div>


                <div className="d-flex blockInNoteInBody">
                    <div className="d-flex">
                        <div className={`toggleContainer scale04ForButtonToggle ${materialAndDrukInBody.BwDrukMaterialType === "Не потрібно" ? 'disabledCont' : 'enabledCont'}`}
                             onClick={handleToggleBw}
                        >
                            <div className={`toggle-button ${materialAndDrukInBody.BwDrukMaterialType === "Не потрібно" ? 'disabled' : 'enabledd'}`}>
                            </div>
                        </div>
                        <span style={{
                            fontSize: '0.8vw', marginRight: '0.633vw', fontFamily: "Gotham", whiteSpace: "nowrap", marginTop: "0.77vw",
                        }}>{"З цифровим Ч/Б друком:"}</span>
                    </div>
                    {materialAndDrukInBody.BwDrukMaterialType === "Не потрібно" ? (
                        <div></div>
                    ) : (
                        <div style={{display: 'flex', alignItems: 'center', borderBottom: '0.08vw solid gray'}}>
                            <div style={{fontSize: "0.8vw", fontFamily: "Gotham"}}>Матеріал: </div>
                            <div className="ArtemNewSelectContainer"
                                 style={{marginTop: "0", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <select
                                    name="materialSelect"
                                    value={materialAndDrukInBody.BwDrukMaterialTypeUse || ""}
                                    onChange={(event) => handleSelectTypeBWChange(event)}
                                    className="selectArtem"

                                >
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
                                    value={materialAndDrukInBody.BwDrukMaterial || ""}
                                    onChange={(event) => handleSelectChange(event)}
                                    className="selectArtem"

                                >
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
                                {loadPaperBW && (
                                    <Spinner animation="border" variant="danger" size="sm"/>
                                )}
                                {error && (
                                    <div>{error}</div>
                                )}
                            </div>


                            <div className={`toggleContainer scale04ForButtonToggle ${materialAndDrukInBody.BwDrukLaminationmaterial === "Не потрібно" ? 'disabledCont' : 'enabledCont'}`}
                                 onClick={handleToggleBwLamination}
                            >
                                <div className={`toggle-button ${materialAndDrukInBody.BwDrukLaminationmaterial === "Не потрібно" ? 'disabled' : 'enabledd'}`}>
                                </div>
                            </div>
                            <span style={{
                                fontSize: '0.8vw', marginRight: '0.633vw', fontFamily: "Gotham", whiteSpace: "nowrap"
                            }}>{"Ламінація:"}</span>

                            {materialAndDrukInBody.BwDrukLaminationmaterial !== "Не потрібно" &&
                                <>
                                    <div className="ArtemNewSelectContainer"
                                         style={{marginTop: "0", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                        <select
                                            name="materialSelect"
                                            value={materialAndDrukInBody.drukColor || ""}
                                            onChange={(event) => handleSelectDrukColorChange(event)}
                                            className="selectArtem"
                                        >
                                            {buttonsArrLamination.map((item, iter) => (
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
                                </>
                            }
                        </div>
                    )}
                </div>


                <div className="d-flex blockInNoteInBody">
                    <div className="d-flex">
                        <div className={`toggleContainer scale04ForButtonToggle ${materialAndDrukInBody.NonDrukMaterialType === "Не потрібно" ? 'disabledCont' : 'enabledCont'}`}
                             onClick={handleToggleNonDruk}
                        >
                            <div className={`toggle-button ${materialAndDrukInBody.NonDrukMaterialType === "Не потрібно" ? 'disabled' : 'enabledd'}`}>
                            </div>
                        </div>
                        <span style={{
                            fontSize: '0.8vw', marginRight: '0.633vw', fontFamily: "Gotham", whiteSpace: "nowrap", marginTop: "0.77vw",
                        }}>{"Без друку:"}</span>
                    </div>

                    {materialAndDrukInBody.NonDrukMaterialType === "Не потрібно" ? (
                        <div></div>
                    ) : (
                        <div style={{display: 'flex', alignItems: 'center', borderBottom: '0.08vw solid gray'}}>
                            <div style={{fontSize: "0.8vw", fontFamily: "Gotham"}}>Матеріал: </div>
                            <div className="ArtemNewSelectContainer"
                                 style={{marginTop: "0", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <select
                                    name="materialSelect"
                                    value={materialAndDrukInBody.NonDrukMaterialTypeUse || ""}
                                    onChange={(event) => handleSelectTypeNONChange(event)}
                                    className="selectArtem"

                                >
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
                                    value={materialAndDrukInBody.NonDrukMaterial || ""}
                                    onChange={(event) => handleSelectChange(event)}
                                    className="selectArtem"

                                >
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
                                {loadPaperNON && (
                                    <Spinner animation="border" variant="danger" size="sm"/>
                                )}
                                {error && (
                                    <div>{error}</div>
                                )}
                            </div>


                            <div className={`toggleContainer scale04ForButtonToggle ${materialAndDrukInBody.NonDrukLaminationType === "Не потрібно" ? 'disabledCont' : 'enabledCont'}`}
                                 onClick={handleToggleNonDrukLamination}
                            >
                                <div className={`toggle-button ${materialAndDrukInBody.NonDrukLaminationType === "Не потрібно" ? 'disabled' : 'enabledd'}`}>
                                </div>
                            </div>
                            <span style={{
                                fontSize: '0.8vw', marginRight: '0.633vw', fontFamily: "Gotham", whiteSpace: "nowrap"
                            }}>{"Ламінація:"}</span>

                            {materialAndDrukInBody.NonDrukLaminationType !== "Не потрібно" &&
                                <>
                                    <div className="ArtemNewSelectContainer"
                                         style={{marginTop: "0", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                        <select
                                            name="materialSelect"
                                            value={materialAndDrukInBody.NonDrukLaminationTypeUse || ""}
                                            onChange={(event) => handleSelectDrukColorChange(event)}
                                            className="selectArtem"
                                        >
                                            {buttonsArrLamination.map((item, iter) => (
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
                                                onChange={(event) => handleSelectDrukNonLamination(event)}
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
                                </>
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};

export default Materials2NoteInBody;
