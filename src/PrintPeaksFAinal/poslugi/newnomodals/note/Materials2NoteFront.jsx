// import React, {useEffect, useState} from "react";
// import axios from '../../../../api/axiosInstance';
// import {useNavigate} from "react-router-dom";
// import {Spinner} from "react-bootstrap";
// import NewSheetCut from "../../NewSheetCut";
// import NewNoModalLamination from "../NewNoModalLamination";
// import LaminationNote from "./LaminationNote";
//
// const Materials2NoteFront = ({materialAndDrukFront, setMaterialAndDrukFront, count, setCount, prices, type, name, buttonsArr, buttonsArrDruk, buttonsArrColor, selectArr, typeUse, size}) => {
//     const [paper, setPaper] = useState([]);
//     const [error, setError] = useState(null);
//     const [load, setLoad] = useState(true);
//     const navigate = useNavigate();
//     let handleSelectChange = (e) => {
//         const selectedOption = e.target.options[e.target.selectedIndex];
//         const selectedId = selectedOption.getAttribute('data-id') || 'default';
//         const selectedValue = e.target.value || '';
//
//         setMaterialAndDrukFront((prevMaterial) => ({
//             ...prevMaterial,
//             material: selectedValue,
//             materialId: selectedId,
//         }));
//     }
//     let handleSelectTypeChange = (e) => {
//         const selectedValue = e.target.value || '';
//
//         setMaterialAndDrukFront((prevMaterial) => ({
//             ...prevMaterial,
//             materialTypeUse: selectedValue,
//         }));
//     }
//     let handleSelectDrukSidesChange = (e) => {
//         const selectedValue = e.target.value || '';
//
//         setMaterialAndDrukFront((prevMaterial) => ({
//             ...prevMaterial,
//             drukSides: selectedValue,
//         }));
//     }
//     let handleSelectDrukColorChange = (e) => {
//         const selectedValue = e.target.value || '';
//
//         setMaterialAndDrukFront((prevMaterial) => ({
//             ...prevMaterial,
//             drukColor: selectedValue,
//         }));
//     }
//
//     let handleClick = (e) => {
//         setMaterialAndDrukFront({
//             ...materialAndDrukFront,
//             drukSides: e
//         })
//     }
//
//     useEffect(() => {
//         let data = {
//             name: "MaterialsPrices",
//             inPageCount: 999999,
//             currentPage: 1,
//             search: "",
//             columnName: {
//                 column: "id",
//                 reverse: false
//             },
//             size: size,
//             material: {
//                 type: materialAndDrukFront.materialType,
//                 typeUse: materialAndDrukFront.materialTypeUse,
//             },
//         }
//         // console.log(data);
//         setLoad(true)
//         setError(null)
//         axios.post(`/materials/NotAll`, data)
//             .then(response => {
//                 // console.log(response.data);
//                 setPaper(response.data.rows)
//                 setLoad(false)
//                 if(response.data && response.data.rows && response.data.rows[0]){
//                     setMaterialAndDrukFront({
//                         ...materialAndDrukFront,
//                         material: response.data.rows[0].name,
//                         materialId: response.data.rows[0].id,
//                     })
//                 } else {
//                     setMaterialAndDrukFront({
//                         ...materialAndDrukFront,
//                         material: "Немає",
//                         materialId: 0,
//                     })
//                 }
//             })
//             .catch(error => {
//                 setLoad(false)
//                 setError(error.message)
//                 if(error.response.status === 403){
//                     navigate('/login');
//                 }
//                 console.log(error.message);
//             })
//     }, [materialAndDrukFront.materialTypeUse, size]);
//
//     return (
//         <div className="d-flex flex-column allArtemElem" style={{margin: "0", padding: "0", height: "5vw"}}>
//             <div style={{fontSize: "1.2vw", fontFamily: "Gotham"}}>Обкладинка: </div>
//             <div style={{display: 'flex', alignItems: 'center', borderBottom: '0.08vw solid gray'}}>
//                 <div style={{fontSize: "1.2vw", fontFamily: "Gotham"}}>Матеріал: </div>
//                 <div className="ArtemNewSelectContainer" style={{marginTop: "0", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
//                     <select
//                         name="materialSelect"
//                         value={materialAndDrukFront.materialTypeUse || ""}
//                         onChange={(event) => handleSelectTypeChange(event)}
//                         className="selectArtem"
//                     >
//                         <option
//                             key="default"
//                             className={"optionInSelectArtem"}
//                             value=""
//                             data-id="default"
//                         >
//                             <>{"Виберіть"}</>
//                         </option>
//                         {buttonsArr.map((item, iter) => (
//                             <option
//                                 key={item + iter}
//                                 className={"optionInSelectArtem"}
//                                 value={item}
//                                 data-id={item}
//                             >
//                                 <>{item}</>
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <div className="ArtemNewSelectContainer" style={{marginTop: "0", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
//                     <select
//                         name="materialSelect"
//                         value={materialAndDrukFront.material || ""}
//                         onChange={(event) => handleSelectChange(event)}
//                         className="selectArtem"
//
//                     >
//                         <option
//                             key="default"
//                             className={"optionInSelectArtem"}
//                             value=""
//                             data-id="default"
//                         >
//                             <>{"Виберіть"}</>
//                         </option>
//                         {paper.map((item, iter) => (
//                             <option
//                                 key={item.name + iter}
//                                 className={"optionInSelectArtem"}
//                                 value={item.name}
//                                 data-id={item.id}
//                             >
//                                 {/*<>{"id:"}</>*/}
//                                 {/*<>{item.id}</>*/}
//                                 {/*<>{" "}</>*/}
//                                 <>{item.name}</>
//                                 <>{" "}</>
//                                 <>{item.thickness} мл</>
//                                 {/*<>{"id:"}</>*/}
//                                 {/*<>{item.typeUse}</>*/}
//                                 {/*<>{" "}</>*/}
//                             </option>
//                         ))}
//                     </select>
//                     {load && (
//                         <Spinner animation="border" variant="danger" size="sm" />
//                     )}
//                     {error && (
//                         <div>{error}</div>
//                     )}
//                 </div>
//                 <div style={{fontSize: "1.2vw", fontFamily: "Gotham"}}>Друк: </div>
//                 <div className="ArtemNewSelectContainer"
//                      style={{marginTop: "0", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
//                     <select
//                         name="materialSelect"
//                         value={materialAndDrukFront.drukColor || ""}
//                         onChange={(event) => handleSelectDrukColorChange(event)}
//                         className="selectArtem"
//                     >
//                         {/*<option*/}
//                         {/*    key="default"*/}
//                         {/*    className={"optionInSelectArtem"}*/}
//                         {/*    value=""*/}
//                         {/*    data-id="default"*/}
//                         {/*>*/}
//                         {/*    <>{"Виберіть"}</>*/}
//                         {/*</option>*/}
//                         {buttonsArrColor.map((item, iter) => (
//                             <option
//                                 key={item + iter}
//                                 className={"optionInSelectArtem"}
//                                 value={item}
//                                 data-id={item}
//                             >
//                                 <>{item}</>
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 {materialAndDrukFront.drukColor !== "Не потрібно" &&
//                     <div className="ArtemNewSelectContainer"
//                          style={{marginTop: "0", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
//                         <select
//                             name="materialSelect"
//                             value={materialAndDrukFront.drukSides || ""}
//                             onChange={(event) => handleSelectDrukSidesChange(event)}
//                             className="selectArtem"
//                         >
//                             <option
//                                 key="default"
//                                 className={"optionInSelectArtem"}
//                                 value=""
//                                 data-id="default"
//                             >
//                                 <>{"Виберіть"}</>
//                             </option>
//                             {buttonsArrDruk.map((item, iter) => (
//                                 <option
//                                     key={item + iter}
//                                     className={"optionInSelectArtem"}
//                                     value={item}
//                                     data-id={item}
//                                 >
//                                     <>{item}</>
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                 }
//                 {/*<LaminationNote*/}
//                 {/*    materialAndDruk={materialAndDrukFront}*/}
//                 {/*    setMaterialAndDruk={materialAndDrukFront}*/}
//                 {/*    prices={prices}*/}
//                 {/*    size={size}*/}
//                 {/*    type={"Note"}*/}
//                 {/*    buttonsArr={["З глянцевим ламінуванням",*/}
//                 {/*        "З матовим ламінуванням",*/}
//                 {/*        "З ламінуванням Soft Touch",]}*/}
//                 {/*/>*/}
//
//                 {/*<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: "2vw"}}>*/}
//                 {/*    {buttonsArrDruk.map((item, index) => (*/}
//                 {/*        <button*/}
//                 {/*            className={item === materialAndDrukFront.drukSides ? 'buttonsArtem buttonsArtemActive' : 'buttonsArtem'}*/}
//                 {/*            key={index}*/}
//                 {/*            onClick={() => handleClick(item)}*/}
//                 {/*            // style={{*/}
//                 {/*            //     backgroundColor: item === color.sides ? 'orange' : 'transparent',*/}
//                 {/*            //     border: item === color.sides ? '0.13vw solid transparent' : '0.13vw solid transparent',*/}
//                 {/*            // }}*/}
//                 {/*        >*/}
//                 {/*            <div className="" style={{*/}
//                 {/*                height: "100%",*/}
//                 {/*                opacity: item === materialAndDrukFront.drukSides ? '100%' : '90%',*/}
//                 {/*                whiteSpace: "nowrap",*/}
//                 {/*            }}>*/}
//                 {/*                {item}*/}
//                 {/*            </div>*/}
//                 {/*        </button>*/}
//                 {/*    ))}*/}
//                 {/*</div>*/}
//             </div>
//         </div>
//     )
// };
//
// export default Materials2NoteFront;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../../api/axiosInstance";
import Spinner from "react-bootstrap/Spinner"; // Переконайтесь, що Spinner імпортовано

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
                                  size,
                              }) => {
    const [paperColorDruk, setPaperColorDruk] = useState([]);
    const [paperBwDruk, setPaperBwDruk] = useState([]);
    const [paperNonDruk, setPaperNonDruk] = useState([]);
    const [error, setError] = useState(null);
    const [load, setLoad] = useState(true);
    const navigate = useNavigate();

    // Нові властивості для кількості листів, якщо їх ще немає
    useEffect(() => {
        if (materialAndDrukInBody.ColorSheetsCount === undefined) {
            setMaterialAndDrukInBody((prev) => ({ ...prev, ColorSheetsCount: 1 }));
        }
        if (materialAndDrukInBody.BwSheetsCount === undefined) {
            setMaterialAndDrukInBody((prev) => ({ ...prev, BwSheetsCount: 1 }));
        }
        if (materialAndDrukInBody.NonDrukSheetsCount === undefined) {
            setMaterialAndDrukInBody((prev) => ({ ...prev, NonDrukSheetsCount: 1 }));
        }
    }, []);

    // Нові стани для даних по ламінуванню для кожного блоку
    const [colorLaminationSizes, setColorLaminationSizes] = useState([]);
    const [colorLaminationLoading, setColorLaminationLoading] = useState(false);
    const [colorLaminationError, setColorLaminationError] = useState(null);

    const [bwLaminationSizes, setBwLaminationSizes] = useState([]);
    const [bwLaminationLoading, setBwLaminationLoading] = useState(false);
    const [bwLaminationError, setBwLaminationError] = useState(null);

    const [nonLaminationSizes, setNonLaminationSizes] = useState([]);
    const [nonLaminationLoading, setNonLaminationLoading] = useState(false);
    const [nonLaminationError, setNonLaminationError] = useState(null);

    // Функції обробки подій
    const handleSelectChange = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const selectedId = selectedOption.getAttribute("data-id") || "default";
        const selectedValue = e.target.value || "";
        setMaterialAndDrukInBody((prev) => ({
            ...prev,
            material: selectedValue,
            materialId: selectedId,
        }));
    };

    const handleSelectTypeChange = (e) => {
        const selectedValue = e.target.value || "";
        setMaterialAndDrukInBody((prev) => ({
            ...prev,
            materialTypeUse: selectedValue,
        }));
    };

    const handleSelectDrukSidesChange = (e) => {
        const selectedValue = e.target.value || "";
        setMaterialAndDrukInBody((prev) => ({
            ...prev,
            drukSides: selectedValue,
        }));
    };

    const handleSelectDrukColorChange = (e) => {
        const selectedValue = e.target.value || "";
        setMaterialAndDrukInBody((prev) => ({
            ...prev,
            drukColor: selectedValue,
        }));
    };

    const handleToggleColor = () => {
        setMaterialAndDrukInBody((prev) => ({
            ...prev,
            ColorDrukMaterialType:
                prev.ColorDrukMaterialType === "Не потрібно" ? "" : "Не потрібно",
        }));
    };

    const handleToggleColorLamination = () => {
        setMaterialAndDrukInBody((prev) => ({
            ...prev,
            ColorDrukLaminationmaterial:
                prev.ColorDrukLaminationmaterial === "Не потрібно" ? "" : "Не потрібно",
        }));
    };

    const handleToggleBw = () => {
        setMaterialAndDrukInBody((prev) => ({
            ...prev,
            BwDrukMaterialType:
                prev.BwDrukMaterialType === "Не потрібно" ? "" : "Не потрібно",
        }));
    };

    const handleToggleBwLamination = () => {
        setMaterialAndDrukInBody((prev) => ({
            ...prev,
            BwDrukLaminationmaterial:
                prev.BwDrukLaminationmaterial === "Не потрібно" ? "" : "Не потрібно",
        }));
    };

    const handleToggleNonDruk = () => {
        setMaterialAndDrukInBody((prev) => ({
            ...prev,
            NonDrukMaterialType:
                prev.NonDrukMaterialType === "Не потрібно" ? "" : "Не потрібно",
        }));
    };

    const handleToggleNonDrukLamination = () => {
        setMaterialAndDrukInBody((prev) => ({
            ...prev,
            NonDrukLaminationmaterial:
                prev.NonDrukLaminationmaterial === "Не потрібно" ? "" : "Не потрібно",
        }));
    };

    // Завантаження даних матеріалів для цифрового кольорового друку
    useEffect(() => {
        let data = {
            name: "MaterialsPrices",
            inPageCount: 999999,
            currentPage: 1,
            search: "",
            columnName: { column: "id", reverse: false },
            size: size,
            material: {
                type: materialAndDrukInBody.ColorDrukMaterialType,
                typeUse: materialAndDrukInBody.ColorDrukMaterialTypeUse,
            },
        };
        setLoad(true);
        setError(null);
        axios
            .post(`/materials/NotAll`, data)
            .then((response) => {
                setPaperColorDruk(response.data.rows);
                setLoad(false);
                if (response.data && response.data.rows && response.data.rows[0]) {
                    setMaterialAndDrukInBody((prev) => ({
                        ...prev,
                        ColorDrukMaterial: response.data.rows[0].name,
                        ColorDrukMaterialId: response.data.rows[0].id,
                    }));
                } else {
                    setMaterialAndDrukInBody((prev) => ({
                        ...prev,
                        ColorDrukMaterial: "Немає",
                        ColorDrukMaterialId: 0,
                    }));
                }
            })
            .catch((error) => {
                setLoad(false);
                setError(error.message);
                if (error.response && error.response.status === 403) {
                    navigate("/login");
                }
                console.log(error.message);
            });
    }, [materialAndDrukInBody.ColorDrukMaterialType, size]);

    // Аналогічно можна завантажувати дані для Ч/Б та без друку (код скорочено)

    // useEffect для завантаження розмірів ламінування для КОЛЬОРОВОГО друку
    useEffect(() => {
        if (
            materialAndDrukInBody.ColorDrukLaminationmaterial !== "Не потрібно" &&
            materialAndDrukInBody.ColorDrukLaminationmaterial !== ""
        ) {
            let data = {
                name: "MaterialsPrices",
                inPageCount: 999999,
                currentPage: 1,
                search: "",
                columnName: { column: "id", reverse: false },
                type: type,
                material: {
                    type: "Ламінування",
                    material: materialAndDrukInBody.ColorDrukMaterial || "",
                    materialId: materialAndDrukInBody.ColorDrukMaterialId || "",
                    thickness: materialAndDrukInBody.ColorLaminationSize || "",
                    typeUse: "А3",
                },
                size: size,
            };
            setColorLaminationLoading(true);
            setColorLaminationError(null);
            axios
                .post(`/materials/NotAll`, data)
                .then((response) => {
                    setColorLaminationSizes(response.data.rows);
                    setColorLaminationLoading(false);
                    if (response.data && response.data.rows && response.data.rows[0]) {
                        setMaterialAndDrukInBody((prev) => ({
                            ...prev,
                            ColorLaminationSize: response.data.rows[0].thickness,
                            ColorDrukLaminationmaterialId: response.data.rows[0].id,
                        }));
                    } else {
                        setColorLaminationSizes([]);
                        setMaterialAndDrukInBody((prev) => ({
                            ...prev,
                            ColorDrukLaminationmaterialId: 0,
                        }));
                    }
                })
                .catch((error) => {
                    setColorLaminationLoading(false);
                    setColorLaminationError(error.message);
                    if (error.response && error.response.status === 403) {
                        navigate("/login");
                    }
                    setColorLaminationSizes([]);
                    console.log(error.message);
                });
        }
    }, [
        materialAndDrukInBody.ColorDrukLaminationmaterial,
        size,
        type,
        materialAndDrukInBody.ColorDrukMaterial,
        materialAndDrukInBody.ColorDrukMaterialId,
    ]);

    // useEffect для завантаження розмірів ламінування для Ч/Б друку
    useEffect(() => {
        if (
            materialAndDrukInBody.BwDrukLaminationmaterial !== "Не потрібно" &&
            materialAndDrukInBody.BwDrukLaminationmaterial !== ""
        ) {
            let data = {
                name: "MaterialsPrices",
                inPageCount: 999999,
                currentPage: 1,
                search: "",
                columnName: { column: "id", reverse: false },
                type: type,
                material: {
                    type: "Ламінування",
                    material: materialAndDrukInBody.BwDrukMaterial || "",
                    materialId: materialAndDrukInBody.BwDrukMaterialId || "",
                    thickness: materialAndDrukInBody.BwLaminationSize || "",
                    typeUse: "А3",
                },
                size: size,
            };
            setBwLaminationLoading(true);
            setBwLaminationError(null);
            axios
                .post(`/materials/NotAll`, data)
                .then((response) => {
                    setBwLaminationSizes(response.data.rows);
                    setBwLaminationLoading(false);
                    if (response.data && response.data.rows && response.data.rows[0]) {
                        setMaterialAndDrukInBody((prev) => ({
                            ...prev,
                            BwLaminationSize: response.data.rows[0].thickness,
                            BwDrukLaminationmaterialId: response.data.rows[0].id,
                        }));
                    } else {
                        setBwLaminationSizes([]);
                        setMaterialAndDrukInBody((prev) => ({
                            ...prev,
                            BwDrukLaminationmaterialId: 0,
                        }));
                    }
                })
                .catch((error) => {
                    setBwLaminationLoading(false);
                    setBwLaminationError(error.message);
                    if (error.response && error.response.status === 403) {
                        navigate("/login");
                    }
                    setBwLaminationSizes([]);
                    console.log(error.message);
                });
        }
    }, [
        materialAndDrukInBody.BwDrukLaminationmaterial,
        size,
        type,
        materialAndDrukInBody.BwDrukMaterial,
        materialAndDrukInBody.BwDrukMaterialId,
    ]);

    // useEffect для завантаження розмірів ламінування для листів без друку
    useEffect(() => {
        if (
            materialAndDrukInBody.NonDrukLaminationmaterial !== "Не потрібно" &&
            materialAndDrukInBody.NonDrukLaminationmaterial !== ""
        ) {
            let data = {
                name: "MaterialsPrices",
                inPageCount: 999999,
                currentPage: 1,
                search: "",
                columnName: { column: "id", reverse: false },
                type: type,
                material: {
                    type: "Ламінування",
                    material: materialAndDrukInBody.material || "",
                    materialId: materialAndDrukInBody.materialId || "",
                    thickness: materialAndDrukInBody.NonLaminationSize || "",
                    typeUse: "А3",
                },
                size: size,
            };
            setNonLaminationLoading(true);
            setNonLaminationError(null);
            axios
                .post(`/materials/NotAll`, data)
                .then((response) => {
                    setNonLaminationSizes(response.data.rows);
                    setNonLaminationLoading(false);
                    if (response.data && response.data.rows && response.data.rows[0]) {
                        setMaterialAndDrukInBody((prev) => ({
                            ...prev,
                            NonLaminationSize: response.data.rows[0].thickness,
                            NonDrukLaminationmaterialId: response.data.rows[0].id,
                        }));
                    } else {
                        setNonLaminationSizes([]);
                        setMaterialAndDrukInBody((prev) => ({
                            ...prev,
                            NonDrukLaminationmaterialId: 0,
                        }));
                    }
                })
                .catch((error) => {
                    setNonLaminationLoading(false);
                    setNonLaminationError(error.message);
                    if (error.response && error.response.status === 403) {
                        navigate("/login");
                    }
                    setNonLaminationSizes([]);
                    console.log(error.message);
                });
        }
    }, [
        materialAndDrukInBody.NonDrukLaminationmaterial,
        size,
        type,
        materialAndDrukInBody.material,
        materialAndDrukInBody.materialId,
    ]);

    return (
        <div
            className="d-flex flex-column allArtemElem"
            style={{ margin: "0", padding: "0", minHeight: "12vh" }}
        >
            <div style={{ fontSize: "1.2vw", fontFamily: "Gotham" }}>Блок: </div>

            {/* Блок: Листи з цифровим Кольоровим друком */}
            <div className="d-flex flex-column" style={{ marginBottom: "1vh" }}>
                <div className="d-flex align-items-center">
                    <div
                        className={`toggleContainer ${
                            materialAndDrukInBody.ColorDrukMaterialType === "Не потрібно"
                                ? "disabledCont"
                                : "enabledCont"
                        }`}
                        onClick={handleToggleColor}
                        style={{ transform: "scale(0.6)" }}
                    >
                        <div
                            className={`toggle-button ${
                                materialAndDrukInBody.ColorDrukMaterialType === "Не потрібно"
                                    ? "disabled"
                                    : "enabledd"
                            }`}
                        ></div>
                    </div>
                    <span
                        style={{
                            fontSize: "1.273vw",
                            marginRight: "0.633vw",
                            fontFamily: "Gotham",
                            whiteSpace: "nowrap",
                        }}
                    >
            {"Листи з цифровим Кольоровим друком:"}
          </span>
                </div>
                {materialAndDrukInBody.ColorDrukMaterialType !== "Не потрібно" && (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "1.2vw",
                                fontFamily: "Gotham",
                                marginRight: "1vw",
                            }}
                        >
                            Матеріал:
                        </div>
                        <div
                            className="ArtemNewSelectContainer"
                            style={{ marginTop: "0" }}
                        >
                            <select
                                name="materialSelect"
                                value={materialAndDrukInBody.material || ""}
                                onChange={handleSelectChange}
                                className="selectArtem"
                            >
                                <option
                                    key="default"
                                    className="optionInSelectArtem"
                                    value=""
                                    data-id="default"
                                >
                                    {"Виберіть"}
                                </option>
                                {paperColorDruk.map((item, iter) => (
                                    <option
                                        key={item.name + iter}
                                        className="optionInSelectArtem"
                                        value={item.name}
                                        data-id={item.id}
                                    >
                                        {item.name} {item.thickness} мл
                                    </option>
                                ))}
                            </select>
                            {load && (
                                <Spinner animation="border" variant="danger" size="sm" />
                            )}
                            {error && <div>{error}</div>}
                        </div>
                        {/* Введення кількості листів */}
                        <div style={{ marginLeft: "1vw" }}>
                            <label
                                style={{ fontSize: "1.2vw", fontFamily: "Gotham" }}
                            >
                                Кількість листів:
                            </label>
                            <input
                                type="number"
                                min="1"
                                value={materialAndDrukInBody.ColorSheetsCount}
                                onChange={(e) =>
                                    setMaterialAndDrukInBody((prev) => ({
                                        ...prev,
                                        ColorSheetsCount: e.target.value,
                                    }))
                                }
                                style={{ width: "4vw", marginLeft: "0.5vw" }}
                            />
                        </div>
                        {/* Секція для вибору ламінування (товщина) */}
                        <div style={{ marginLeft: "1vw" }}>
                            <div
                                className={`toggleContainer ${
                                    materialAndDrukInBody.ColorDrukLaminationmaterial ===
                                    "Не потрібно"
                                        ? "disabledCont"
                                        : "enabledCont"
                                }`}
                                onClick={handleToggleColorLamination}
                                style={{ transform: "scale(0.6)" }}
                            >
                                <div
                                    className={`toggle-button ${
                                        materialAndDrukInBody.ColorDrukLaminationmaterial ===
                                        "Не потрібно"
                                            ? "disabled"
                                            : "enabledd"
                                    }`}
                                ></div>
                            </div>
                            {materialAndDrukInBody.ColorDrukLaminationmaterial !==
                                "Не потрібно" && (
                                    <div>
                                        <label
                                            style={{ fontSize: "1.2vw", fontFamily: "Gotham" }}
                                        >
                                            Ламінування (товщина):
                                        </label>
                                        {colorLaminationLoading ? (
                                            <Spinner
                                                animation="border"
                                                variant="danger"
                                                size="sm"
                                            />
                                        ) : (
                                            <select
                                                value={materialAndDrukInBody.ColorLaminationSize || ""}
                                                onChange={(event) =>
                                                    setMaterialAndDrukInBody((prev) => ({
                                                        ...prev,
                                                        ColorLaminationSize: event.target.value,
                                                    }))
                                                }
                                                className="selectArtem"
                                            >
                                                <option value={""}>{""}</option>
                                                {colorLaminationSizes.map((item, iter2) => (
                                                    <option
                                                        className="optionInSelectArtem"
                                                        key={item.thickness + iter2}
                                                        value={item.thickness}
                                                        data-id={item.id}
                                                    >
                                                        {item.thickness} мкм
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                        {colorLaminationError && <div>{colorLaminationError}</div>}
                                    </div>
                                )}
                        </div>
                    </div>
                )}
            </div>

            {/* Блок: Листи з цифровим Ч/Б друком */}
            <div className="d-flex flex-column" style={{ marginBottom: "1vh" }}>
                <div className="d-flex align-items-center">
                    <div
                        className={`toggleContainer ${
                            materialAndDrukInBody.BwDrukMaterialType === "Не потрібно"
                                ? "disabledCont"
                                : "enabledCont"
                        }`}
                        onClick={handleToggleBw}
                        style={{ transform: "scale(0.6)" }}
                    >
                        <div
                            className={`toggle-button ${
                                materialAndDrukInBody.BwDrukMaterialType === "Не потрібно"
                                    ? "disabled"
                                    : "enabledd"
                            }`}
                        ></div>
                    </div>
                    <span
                        style={{
                            fontSize: "1.273vw",
                            marginRight: "0.633vw",
                            fontFamily: "Gotham",
                            whiteSpace: "nowrap",
                        }}
                    >
            {"Листи з цифровим Ч/Б друком:"}
          </span>
                </div>
                {materialAndDrukInBody.BwDrukMaterialType !== "Не потрібно" && (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "1.2vw",
                                fontFamily: "Gotham",
                                marginRight: "1vw",
                            }}
                        >
                            Матеріал:
                        </div>
                        <div
                            className="ArtemNewSelectContainer"
                            style={{ marginTop: "0" }}
                        >
                            <select
                                name="materialSelect"
                                value={materialAndDrukInBody.material || ""}
                                onChange={handleSelectChange}
                                className="selectArtem"
                            >
                                <option
                                    key="default"
                                    className="optionInSelectArtem"
                                    value=""
                                    data-id="default"
                                >
                                    {"Виберіть"}
                                </option>
                                {paperBwDruk.map((item, iter) => (
                                    <option
                                        key={item.name + iter}
                                        className="optionInSelectArtem"
                                        value={item.name}
                                        data-id={item.id}
                                    >
                                        {item.name} {item.thickness} мл
                                    </option>
                                ))}
                            </select>
                            {load && (
                                <Spinner animation="border" variant="danger" size="sm" />
                            )}
                            {error && <div>{error}</div>}
                        </div>
                        {/* Введення кількості листів */}
                        <div style={{ marginLeft: "1vw" }}>
                            <label
                                style={{ fontSize: "1.2vw", fontFamily: "Gotham" }}
                            >
                                Кількість листів:
                            </label>
                            <input
                                type="number"
                                min="1"
                                value={materialAndDrukInBody.BwSheetsCount}
                                onChange={(e) =>
                                    setMaterialAndDrukInBody((prev) => ({
                                        ...prev,
                                        BwSheetsCount: e.target.value,
                                    }))
                                }
                                style={{ width: "4vw", marginLeft: "0.5vw" }}
                            />
                        </div>
                        {/* Секція для вибору ламінування */}
                        <div style={{ marginLeft: "1vw" }}>
                            <div
                                className={`toggleContainer ${
                                    materialAndDrukInBody.BwDrukLaminationmaterial === "Не потрібно"
                                        ? "disabledCont"
                                        : "enabledCont"
                                }`}
                                onClick={handleToggleBwLamination}
                                style={{ transform: "scale(0.6)" }}
                            >
                                <div
                                    className={`toggle-button ${
                                        materialAndDrukInBody.BwDrukLaminationmaterial === "Не потрібно"
                                            ? "disabled"
                                            : "enabledd"
                                    }`}
                                ></div>
                            </div>
                            {materialAndDrukInBody.BwDrukLaminationmaterial !== "Не потрібно" && (
                                <div>
                                    <label
                                        style={{ fontSize: "1.2vw", fontFamily: "Gotham" }}
                                    >
                                        Ламінування (товщина):
                                    </label>
                                    {bwLaminationLoading ? (
                                        <Spinner
                                            animation="border"
                                            variant="danger"
                                            size="sm"
                                        />
                                    ) : (
                                        <select
                                            value={materialAndDrukInBody.BwLaminationSize || ""}
                                            onChange={(event) =>
                                                setMaterialAndDrukInBody((prev) => ({
                                                    ...prev,
                                                    BwLaminationSize: event.target.value,
                                                }))
                                            }
                                            className="selectArtem"
                                        >
                                            <option value={""}>{""}</option>
                                            {bwLaminationSizes.map((item, iter2) => (
                                                <option
                                                    className="optionInSelectArtem"
                                                    key={item.thickness + iter2}
                                                    value={item.thickness}
                                                    data-id={item.id}
                                                >
                                                    {item.thickness} мкм
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                    {bwLaminationError && <div>{bwLaminationError}</div>}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Блок: Листи без друку */}
            <div className="d-flex flex-column" style={{ marginBottom: "1vh" }}>
                <div className="d-flex align-items-center">
                    <div
                        className={`toggleContainer ${
                            materialAndDrukInBody.NonDrukMaterialType === "Не потрібно"
                                ? "disabledCont"
                                : "enabledCont"
                        }`}
                        onClick={handleToggleNonDruk}
                        style={{ transform: "scale(0.6)" }}
                    >
                        <div
                            className={`toggle-button ${
                                materialAndDrukInBody.NonDrukMaterialType === "Не потрібно"
                                    ? "disabled"
                                    : "enabledd"
                            }`}
                        ></div>
                    </div>
                    <span
                        style={{
                            fontSize: "1.273vw",
                            marginRight: "0.633vw",
                            fontFamily: "Gotham",
                            whiteSpace: "nowrap",
                        }}
                    >
            {"Листи без друку:"}
          </span>
                </div>
                {materialAndDrukInBody.NonDrukMaterialType !== "Не потрібно" && (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "1.2vw",
                                fontFamily: "Gotham",
                                marginRight: "1vw",
                            }}
                        >
                            Матеріал:
                        </div>
                        <div
                            className="ArtemNewSelectContainer"
                            style={{ marginTop: "0" }}
                        >
                            <select
                                name="materialSelect"
                                value={materialAndDrukInBody.material || ""}
                                onChange={handleSelectChange}
                                className="selectArtem"
                            >
                                <option
                                    key="default"
                                    className="optionInSelectArtem"
                                    value=""
                                    data-id="default"
                                >
                                    {"Виберіть"}
                                </option>
                                {paperNonDruk.map((item, iter) => (
                                    <option
                                        key={item.name + iter}
                                        className="optionInSelectArtem"
                                        value={item.name}
                                        data-id={item.id}
                                    >
                                        {item.name} {item.thickness} мл
                                    </option>
                                ))}
                            </select>
                            {load && (
                                <Spinner animation="border" variant="danger" size="sm" />
                            )}
                            {error && <div>{error}</div>}
                        </div>
                        {/* Введення кількості листів */}
                        <div style={{ marginLeft: "1vw" }}>
                            <label
                                style={{ fontSize: "1.2vw", fontFamily: "Gotham" }}
                            >
                                Кількість листів:
                            </label>
                            <input
                                type="number"
                                min="1"
                                value={materialAndDrukInBody.NonDrukSheetsCount}
                                onChange={(e) =>
                                    setMaterialAndDrukInBody((prev) => ({
                                        ...prev,
                                        NonDrukSheetsCount: e.target.value,
                                    }))
                                }
                                style={{ width: "4vw", marginLeft: "0.5vw" }}
                            />
                        </div>
                        {/* Секція для вибору ламінування */}
                        <div style={{ marginLeft: "1vw" }}>
                            <div
                                className={`toggleContainer ${
                                    materialAndDrukInBody.NonDrukLaminationmaterial === "Не потрібно"
                                        ? "disabledCont"
                                        : "enabledCont"
                                }`}
                                onClick={handleToggleNonDrukLamination}
                                style={{ transform: "scale(0.6)" }}
                            >
                                <div
                                    className={`toggle-button ${
                                        materialAndDrukInBody.NonDrukLaminationmaterial === "Не потрібно"
                                            ? "disabled"
                                            : "enabledd"
                                    }`}
                                ></div>
                            </div>
                            {materialAndDrukInBody.NonDrukLaminationmaterial !== "Не потрібно" && (
                                <div>
                                    <label
                                        style={{ fontSize: "1.2vw", fontFamily: "Gotham" }}
                                    >
                                        Ламінування (товщина):
                                    </label>
                                    {nonLaminationLoading ? (
                                        <Spinner
                                            animation="border"
                                            variant="danger"
                                            size="sm"
                                        />
                                    ) : (
                                        <select
                                            value={materialAndDrukInBody.NonLaminationSize || ""}
                                            onChange={(event) =>
                                                setMaterialAndDrukInBody((prev) => ({
                                                    ...prev,
                                                    NonLaminationSize: event.target.value,
                                                }))
                                            }
                                            className="selectArtem"
                                        >
                                            <option value={""}>{""}</option>
                                            {nonLaminationSizes.map((item, iter2) => (
                                                <option
                                                    className="optionInSelectArtem"
                                                    key={item.thickness + iter2}
                                                    value={item.thickness}
                                                    data-id={item.id}
                                                >
                                                    {item.thickness} мкм
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                    {nonLaminationError && <div>{nonLaminationError}</div>}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Materials2NoteInBody;
