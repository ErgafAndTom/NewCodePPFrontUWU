import React, { useEffect, useState } from "react";
import axios from "../../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const Materials2NoteFront = ({
                                 materialAndDrukFront,
                                 setMaterialAndDrukFront,
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
    const [paper, setPaper] = useState([]);
    const [error, setError] = useState(null);
    const [load, setLoad] = useState(true);
    const navigate = useNavigate();

    // Новий стан для даних ламінування
    const [lamination, setLamination] = useState([]);
    const [loadLamination, setLoadLamination] = useState(false);

    // Масив кнопок для вибору типу ламінування
    const buttonsArrLamination = [
        "З глянцевим ламінуванням",
        "З матовим ламінуванням",
        "З ламінуванням Soft Touch"
    ];

    const handleSelectChange = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const selectedId = selectedOption.getAttribute("data-id") || "default";
        const selectedValue = e.target.value || "";

        setMaterialAndDrukFront((prev) => ({
            ...prev,
            material: selectedValue,
            materialId: selectedId
        }));
    };

    const handleSelectTypeChange = (e) => {
        const selectedValue = e.target.value || "";
        setMaterialAndDrukFront((prev) => ({
            ...prev,
            materialTypeUse: selectedValue
        }));
    };

    const handleSelectDrukSidesChange = (e) => {
        const selectedValue = e.target.value || "";
        setMaterialAndDrukFront((prev) => ({
            ...prev,
            drukSides: selectedValue
        }));
    };

    const handleSelectDrukColorChange = (e) => {
        const selectedValue = e.target.value || "";
        setMaterialAndDrukFront((prev) => ({
            ...prev,
            drukColor: selectedValue
        }));
    };

    let handleClick = (e) => {
        setMaterialAndDrukFront({
            ...materialAndDrukFront,
            drukSides: e
        });
    };

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
                typeUse: materialAndDrukFront.materialTypeUse
            }
        };
        setLoad(true);
        setError(null);
        axios
            .post(`/materials/NotAll`, data)
            .then((response) => {
                setPaper(response.data.rows);
                setLoad(false);
                if (response.data && response.data.rows && response.data.rows[0]) {
                    setMaterialAndDrukFront((prev) => ({
                        ...prev,
                        material: response.data.rows[0].name,
                        materialId: response.data.rows[0].id
                    }));
                } else {
                    setMaterialAndDrukFront((prev) => ({
                        ...prev,
                        material: "Немає",
                        materialId: 0
                    }));
                }
            })
            .catch((error) => {
                setLoad(false);
                setError(error.message);
                if (error.response?.status === 403) {
                    navigate("/login");
                }
                console.log(error.message);
            });
    }, [materialAndDrukFront.materialTypeUse, size]);

    // Логіка завантаження даних для ламінування (тільки якщо ламінування увімкнено)
    useEffect(() => {
        if (materialAndDrukFront.laminationType !== "Не потрібно") {
            const data = {
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
                    material: materialAndDrukFront.laminationTypeUse
                }
            };
            setLoadLamination(true);
            setError(null);
            axios
                .post(`/materials/NotAll`, data)
                .then((response) => {
                    setLamination(response.data.rows);
                    setLoadLamination(false);
                    if (response.data && response.data.rows && response.data.rows[0]) {
                        setMaterialAndDrukFront((prev) => ({
                            ...prev,
                            laminationmaterial: response.data.rows[0].name,
                            laminationmaterialId: response.data.rows[0].id
                        }));
                    } else {
                        setMaterialAndDrukFront((prev) => ({
                            ...prev,
                            laminationmaterial: "Немає",
                            laminationmaterialId: 0
                        }));
                    }
                })
                .catch((err) => {
                    setLoadLamination(false);
                    setError(err.message);
                    if (err.response?.status === 403) {
                        navigate("/login");
                    }
                    console.log(err.message);
                });
        }
    }, [materialAndDrukFront.laminationType, materialAndDrukFront.laminationTypeUse, size]);

    // Обробник для перемикання ламінування (toggle)
    const handleToggleLamination = () => {
        setMaterialAndDrukFront((prev) => ({
            ...prev,
            laminationType: prev.laminationType === "Не потрібно" ? "" : "Не потрібно"
        }));
    };

    // Обробник для вибору типу ламінування
    const handleSelectLaminationTypeUseChange = (e) => {
        const selectedValue = e.target.value || "";
        setMaterialAndDrukFront((prev) => ({
            ...prev,
            laminationTypeUse: selectedValue
        }));
    };

    return (
        <div
            className="d-flex allArtemElem"
            style={{ margin: "0", padding: "0", borderBottom: "0.08vw solid gray" }}
        >
            <div
                className="d-flex align-items-center justify-content-center"
                style={{
                    fontSize: "1vw",
                    width: "9vw",
                    fontFamily: "Gotham",
                    fontWeight: "bold",
                    marginBottom: "1vh"
                }}
            >
                Обкладинка:
            </div>
            <div style={{ display: "flex", alignItems: "center", paddingBottom: "1vh" }}>
                {/* Матеріал */}
                <div style={{ fontSize: "0.8vw", fontFamily: "Gotham" }}>Матеріал: </div>
                <div
                    className="ArtemNewSelectContainer"
                    style={{ marginTop: "0", display: "flex", justifyContent: "center", alignItems: "center" }}
                >
                    <select
                        name="materialSelect"
                        value={materialAndDrukFront.materialTypeUse || ""}
                        onChange={handleSelectTypeChange}
                        className="selectArtem"
                    >
                        <option key="default" className="optionInSelectArtem" value="" data-id="default">
                            Виберіть
                        </option>
                        {buttonsArr.map((item, iter) => (
                            <option key={item + iter} className="optionInSelectArtem" value={item} data-id={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
                <div
                    className="ArtemNewSelectContainer"
                    style={{ marginTop: "0", display: "flex", justifyContent: "center", alignItems: "center" }}
                >
                    <select
                        name="materialSelect"
                        value={materialAndDrukFront.material || ""}
                        onChange={handleSelectChange}
                        className="selectArtem"
                    >
                        <option key="default" className="optionInSelectArtem" value="" data-id="default">
                            Виберіть
                        </option>
                        {paper.map((item, iter) => (
                            <option key={item.name + iter} className="optionInSelectArtem" value={item.name} data-id={item.id}>
                                {item.name} {item.thickness} мл
                            </option>
                        ))}
                    </select>
                    {load && <Spinner animation="border" variant="danger" size="sm" />}
                    {error && <div>{error}</div>}
                </div>
                {/* Друк */}
                <div style={{ fontSize: "0.8vw", fontFamily: "Gotham", marginLeft: "3vw" }}>Друк: </div>
                <div
                    className="ArtemNewSelectContainer"
                    style={{ marginTop: "0", display: "flex", justifyContent: "center", alignItems: "center" }}
                >
                    <select
                        name="materialSelect"
                        value={materialAndDrukFront.drukColor || ""}
                        onChange={handleSelectDrukColorChange}
                        className="selectArtem"
                    >
                        {buttonsArrColor.map((item, iter) => (
                            <option key={item + iter} className="optionInSelectArtem" value={item} data-id={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
                {materialAndDrukFront.drukColor !== "Не потрібно" && (
                    <div
                        className="ArtemNewSelectContainer"
                        style={{ marginTop: "0", display: "flex", justifyContent: "center", alignItems: "center" }}
                    >
                        <select
                            name="materialSelect"
                            value={materialAndDrukFront.drukSides || ""}
                            onChange={handleSelectDrukSidesChange}
                            className="selectArtem"
                        >
                            <option key="default" className="optionInSelectArtem" value="" data-id="default">
                                Виберіть
                            </option>
                            {buttonsArrDruk.map((item, iter) => (
                                <option key={item + iter} className="optionInSelectArtem" value={item} data-id={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                {/* Ламінація */}
                <div style={{ marginLeft: "3vw", display: "flex", alignItems: "center" }}>
                    <div
                        className={`toggleContainer scale04ForButtonToggle ${
                            materialAndDrukFront.laminationType === "Не потрібно" ? "disabledCont" : "enabledCont"
                        }`}
                        onClick={handleToggleLamination}
                    >
                        <div
                            className={`toggle-button ${
                                materialAndDrukFront.laminationType === "Не потрібно" ? "disabled" : "enabledd"
                            }`}
                        ></div>
                    </div>
                    <span style={{ fontSize: "0.8vw", fontFamily: "Gotham", whiteSpace: "nowrap", marginLeft: "0.5vw" }}>
            Ламінація:
          </span>
                </div>
                {materialAndDrukFront.laminationType !== "Не потрібно" && (
                    <>
                        <div
                            className="ArtemNewSelectContainer"
                            style={{ marginTop: "0", display: "flex", justifyContent: "center", alignItems: "center" }}
                        >
                            <select
                                name="laminationTypeUse"
                                value={materialAndDrukFront.laminationTypeUse || ""}
                                onChange={handleSelectLaminationTypeUseChange}
                                className="selectArtem"
                            >
                                <option key="default" value="" data-id="default">
                                    Виберіть
                                </option>
                                {buttonsArrLamination.map((item, iter) => (
                                    <option key={item + iter} value={item} data-id={item} className="optionInSelectArtem">
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div
                            className="ArtemNewSelectContainer"
                            style={{ marginTop: "0", display: "flex", justifyContent: "center", alignItems: "center" }}
                        >
                            <select
                                name="laminationMaterial"
                                value={materialAndDrukFront.laminationmaterial || ""}
                                onChange={(e) => {
                                    const selectedOption = e.target.options[e.target.selectedIndex];
                                    const selectedId = selectedOption.getAttribute("data-id") || "default";
                                    const selectedValue = e.target.value || "";
                                    setMaterialAndDrukFront((prev) => ({
                                        ...prev,
                                        laminationmaterial: selectedValue,
                                        laminationmaterialId: selectedId
                                    }));
                                }}
                                className="selectArtem"
                            >
                                <option key="default" value="" data-id="default">
                                    Виберіть
                                </option>
                                {lamination.map((item, iter) => (
                                    <option
                                        key={item.name + iter}
                                        value={item.thickness}
                                        data-id={item.id}
                                        className="optionInSelectArtem"
                                    >
                                        {item.thickness} мл
                                    </option>
                                ))}
                            </select>
                            {loadLamination && <Spinner animation="border" variant="danger" size="sm" />}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Materials2NoteFront;
