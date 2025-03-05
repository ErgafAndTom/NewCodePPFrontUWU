import React, {useCallback, useEffect, useState} from "react";
import axios from '../../api/axiosInstance';
import Loader from "../../components/calc/Loader";
import versantIcon from "../../components/newUIArtem/printers/p7.svg";
import {useNavigate} from "react-router-dom";
import NewNoModalSizeNote from "./newnomodals/note/NewNoModalSizeNote";
import Materials2NoteFront from "./newnomodals/note/Materials2NoteFront";
import Materials2NoteBack from "./newnomodals/note/Material2NoteBack";

const NewNote = ({
                         thisOrder,
                         newThisOrder,
                         setNewThisOrder,
                         selectedThings2,
                         setShowNewNote,
                         setThisOrder,
                         setSelectedThings2,
                         showNewNote
                     }) => {
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [error, setError] = useState(null);
    const handleClose = () => {
        setIsAnimating(false); // Начинаем анимацию закрытия
        setTimeout(() => {
            setIsVisible(false)
            setShowNewNote(false);
        }, 300); // После завершения анимации скрываем модальное окно
    }
    const handleShow = useCallback((event) => {
        setShowNewNote(true);
    }, []);


    const [size, setSize] = useState({
        x: 297,
        y: 420
    });
    const [materialAndDrukBody, setMaterialAndDrukBody] = useState({
        materialType: "Папір",
        materialTypeUse: "Офісний",
        drukColor: "Не потрібно",
        drukSides: "односторонній",
        drukId: "Не потрібно",
        thickness: "",
        material: "",
        materialId: "",
        laminationType: "Не потрібно",
        laminationTypeUse: "",
        laminationmaterial: "",
        laminationmaterialId: "",
        typeUse: ""
    });
    const [materialAndDrukInBody, setMaterialAndDrukInBody] = useState({
        ColorDrukMaterialType: "Не потрібно",
        BwDrukMaterialType: "Не потрібно",
        NonDrukMaterialType: "Не потрібно",

        ColorDrukMaterialTypeUse: "Офісний",
        BwDrukMaterialTypeUse: "Офісний",
        NonDrukMaterialTypeUse: "Офісний",

        ColorDrukLaminationType: "Не потрібно",
        BwDrukLaminationType: "Не потрібно",
        NonDrukLaminationType: "Не потрібно",

        ColorDrukLaminationTypeUse: "З глянцевим ламінуванням",
        BwDrukLaminationTypeUse: "З глянцевим ламінуванням",
        NonDrukLaminationTypeUse: "З глянцевим ламінуванням",

        ColorDrukLaminationMaterial: "Не потрібно",
        BwDrukLaminationMaterial: "Не потрібно",
        NonDrukLaminationMaterial: "Не потрібно",

        ColorDrukLaminationMaterialId: "",
        BwDrukLaminationMaterialId: "",
        NonDrukLaminationMaterialId: "",

        ColorDrukMaterial: "",
        BwDrukMaterial: "",
        NonDrukMaterial: "",

        ColorDrukMaterialId: "",
        BwDrukMaterialId: "",
        NonDrukMaterialId: "",
        typeUse: "",
        // Додаємо окремі кількості для кожної гілки
        colorCount: 1,
        bwCount: 1,
        nonCount: 1
    });
    const [materialAndDrukFront, setMaterialAndDrukFront] = useState({
        materialType: "Папір",
        materialTypeUse: "Цупкий",
        drukColor: "Кольоровий",
        drukSides: "односторонній",
        drukId: "Не потрібно",
        thickness: "",
        material: "",
        materialId: "",
        laminationType: "Не потрібно",
        laminationTypeUse: "",
        laminationmaterial: "",
        laminationmaterialId: "",
        typeUse: ""
    });
    const [materialAndDrukBack, setMaterialAndDrukBack] = useState({
        materialType: "Папір",
        materialTypeUse: "Офісний",
        drukColor: "Не потрібно",
        drukSides: "односторонній",
        drukId: "Не потрібно",
        thickness: "",
        material: "",
        materialId: "",
        laminationType: "Не потрібно",
        laminationTypeUse: "",
        laminationmaterial: "",
        laminationmaterialId: "",
        typeUse: "",
        count: 1
    });


    const [material, setMaterial] = useState({
        type: "Не потрібно",
        thickness: "",
        material: "",
        materialId: "",
        typeUse: ""
    });
    const [color, setColor] = useState({
        sides: "Не потрібно",
        one: "",
        two: "",
        allSidesColor: "CMYK",
    });
    const [lamination, setLamination] = useState({
        type: "Не потрібно",
        material: "",
        materialId: "",
        size: ""
    });
    const [big, setBig] = useState("Не потрібно");
    const [cute, setCute] = useState("Не потрібно");
    const [porizka, setPorizka] = useState({type: "Не потрібно"});
    const [cuteLocal, setCuteLocal] = useState({
        leftTop: false,
        rightTop: false,
        rightBottom: false,
        leftBottom: false,
        radius: "",
    });
    const [holes, setHoles] = useState("Не потрібно");
    const [holesR, setHolesR] = useState("");
    const [count, setCount] = useState(1);
    const [prices, setPrices] = useState([]);
    const [pricesThis, setPricesThis] = useState(null);
    const [pereplet, setPereplet] = useState({
        type: "",
        thickness: "Тонкі",
        material: "",
        materialId: "",
        size: ">120",
        typeUse: "Брошурування до 120 аркушів"
    });

    useEffect(() => {
        let color = 0;
        let bw = 0;
        let nonDruk = 0;
        if(materialAndDrukInBody.ColorDrukMaterialType !== "Не потрібно"){
            color = materialAndDrukInBody.colorCount
        }
        if(materialAndDrukInBody.BwDrukMaterialType !== "Не потрібно"){
            bw = materialAndDrukInBody.bwCount
        }
        if(materialAndDrukInBody.NonDrukMaterialType !== "Не потрібно"){
            nonDruk = materialAndDrukInBody.nonCount
        }
        let allPapers = 1+1+color+bw+nonDruk;
        if(allPapers <= 120){
            setPereplet({
                ...pereplet,
                size: "<120",
                typeUse: "Брошурування до 120 аркушів"
            })
        } else if(allPapers > 120 && allPapers <= 280) {
            setPereplet({
                ...pereplet,
                size: ">120",
                typeUse: "Брошурування від 120 до 280 аркушів"
            })
        } else {
            setPereplet({
                ...pereplet,
                size: "",
                typeUse: ""
            })
        }
    }, [materialAndDrukInBody.colorCount,
        materialAndDrukInBody.bwCount,
        materialAndDrukInBody.nonCount,
        materialAndDrukInBody.ColorDrukMaterialType,
        materialAndDrukInBody.BwDrukMaterialType,
        materialAndDrukInBody.NonDrukMaterialType,
    ]);

    const addNewOrderUnit = e => {
        let dataToSend = {
            orderId: thisOrder.id,
            toCalc: {
                nameOrderUnit: "Блокноти",
                type: "Note",
                size: size,
                material: material,
                color: color,
                lamination: lamination,
                big: big,
                cute: cute,
                cuteLocal: cuteLocal,
                holes: holes,
                holesR: holesR,
                count: count,
                porizka: porizka,
                materialAndDrukFront: materialAndDrukFront,
                materialAndDrukInBody: materialAndDrukInBody,
                materialAndDrukBack: materialAndDrukBack,
            }
        };

        axios.post(`/orderUnits/OneOrder/OneOrderUnitInOrder`, dataToSend)
            .then(response => {
                // console.log(response.data);
                setThisOrder(response.data);
                // setSelectedThings2(response.data.order.OrderUnits || []);
                setSelectedThings2(response.data.OrderUnits);
                setShowNewNote(false)
            })
            .catch(error => {
                if(error.response.status === 403){
                    navigate('/login');
                }
                console.log(error.message);
                // setErr(error)
            });
    }

    useEffect(() => {
        let dataToSend = {
            type: "Note",
            size: size,
            material: material,
            color: color,
            lamination: lamination,
            big: big,
            cute: cute,
            cuteLocal: cuteLocal,
            holes: holes,
            holesR: holesR,
            count: count,
            porizka: porizka,
            materialAndDrukFront: materialAndDrukFront,
            materialAndDrukInBody: materialAndDrukInBody,
            materialAndDrukBack: materialAndDrukBack,
        }
        axios.post(`/calc/pricing`, dataToSend)
            .then(response => {
                setPricesThis(response.data.prices)
                setError(null)
            })
            .catch(error => {
                setError(error)
                if(error.response.status === 403){
                    navigate('/login');
                }
                console.log(error.message);
            })
    }, [size, material, color, lamination, big, cute, cuteLocal, holes, holesR, count, porizka, materialAndDrukFront, materialAndDrukBack]);

    useEffect(() => {
        if (showNewNote) {
            setIsVisible(true); // Сначала показываем модальное окно
            setTimeout(() => setIsAnimating(true), 100); // После короткой задержки запускаем анимацию появления
        } else {
            setIsAnimating(false); // Начинаем анимацию закрытия
            setTimeout(() => setIsVisible(false), 300); // После завершения анимации скрываем модальное окно
        }
    }, [showNewNote]);

    return (
        <>
            {isVisible === true ? (
                <div>
                    <div
                        style={{
                            width: "100vw",
                            zIndex: "99",
                            height: "100vh",
                            background: "rgba(0, 0, 0, 0.5)",
                            opacity: isAnimating ? 1 : 0, // для анимации прозрачности
                            transition: "opacity 0.3s ease-in-out", // плавная анимация
                            position: "fixed",
                            left: "0",
                            bottom: "0"
                        }}
                        onClick={handleClose}
                    ></div>
                    <div className="d-flex flex-column" style={{
                        zIndex: "100",
                        position: "fixed",
                        background: "#dcd9ce",
                        top: "50%",
                        left: "50%",
                        transform: isAnimating ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0.8)", // анимация масштаба
                        opacity: isAnimating ? 1 : 0, // анимация прозрачности
                        transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out", // плавная анимация
                        borderRadius: "1vw",
                        width: "95vw",
                        height: "95vh",
                        // padding: "20px"
                    }}>
                        <div className="d-flex">
                            <div className="m-auto text-center fontProductName">
                                Блокнот / Щоденик / Нотатник / Книга / Підручник / Ноти / Звіт / Інструкція
                            </div>
                            <div
                                className="btn btn-close btn-lg"
                                style={{
                                    margin: "0.5vw",
                                }}
                                onClick={handleClose}
                            >
                            </div>
                        </div>

                        <div className="d-flex flex-column" style={{margin: '0', padding: '1vw'}}>
                            <div className="d-flex flex-column" style={{marginLeft: '0vh', padding: '0'}}>
                                <NewNoModalSizeNote
                                    size={size}
                                    setSize={setSize}
                                    prices={prices}
                                    type={"SheetCut"}
                                    buttonsArr={["односторонній", "двосторонній",]}
                                    color={color}
                                    setColor={setColor}
                                    count={count}
                                    setCount={setCount}
                                    defaultt={"А3 (297 х 420 мм)"}
                                />
                                <Materials2NoteFront
                                    materialAndDrukFront={materialAndDrukFront}
                                    setMaterialAndDrukFront={setMaterialAndDrukFront}
                                    count={count}
                                    setCount={setCount}
                                    prices={prices}
                                    size={size}
                                    selectArr={["3,5 мм", "4 мм", "5 мм", "6 мм", "8 мм"]}
                                    name={"Обкладинки:"}
                                    buttonsArr={["Офісний", "Тонкий",
                                        "Середній",
                                        "Цупкий"]}
                                    buttonsArrDruk={["односторонній", "двосторонній",]}
                                    buttonsArrColor={["Не потрібно", "Чорнобілий", "Кольоровий"]}
                                    buttonsArrLamination={["З глянцевим ламінуванням",
                                        "З матовим ламінуванням",
                                        "З ламінуванням Soft Touch",]}
                                    typeUse={null}
                                />
                                <Materials2NoteBack
                                    materialAndDrukBack={materialAndDrukBack}
                                    setMaterialAndDrukBack={setMaterialAndDrukBack}
                                    count={count}
                                    setCount={setCount}
                                    prices={prices}
                                    size={size}
                                    selectArr={["3,5 мм", "4 мм", "5 мм", "6 мм", "8 мм"]}
                                    name={"Чорно-білий друк на монохромному принтері:"}
                                    buttonsArr={["Офісний", "Тонкий",
                                        "Середній",
                                        "Цупкий"]}
                                    buttonsArrDruk={["односторонній", "двосторонній",]}
                                    buttonsArrColor={["Не потрібно", "Чорнобілий", "Кольоровий"]}
                                    buttonsArrLamination={["З глянцевим ламінуванням",
                                        "З матовим ламінуванням",
                                        "З ламінуванням Soft Touch",]}
                                    typeUse={null}
                                />

                            </div>
                            <div className="d-flex">
                                {thisOrder && (
                                    <div
                                        className="d-flex align-content-between justify-content-between"
                                        style={{
                                            width: "90vw",
                                            marginLeft: "2.5vw",
                                            fontFamily: "Gotham",
                                            fontWeight: "bold",
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            transition: "all 0.3s ease",
                                            height: '3vw',
                                        }}
                                    >
                                        <div
                                            className="btn btn-warning" style={{
                                            borderRadius: '0.627vw',
                                            // border: '0.08vw solid gray',
                                            padding: '0.2vw 0.7vw',
                                        }}
                                            onClick={addNewOrderUnit}
                                        >
                                            Додати до замовлення
                                        </div>
                                    </div>
                                )}
                            </div>
                            {error &&
                                <div>{error.message}</div>
                            }
                            {null === pricesThis ? (
                                <div style={{width: '50vw'}}>

                                </div>
                            ) : (
                                <div className="d-flex justify-content-between pricesBlockContainer">
                                    <div className="">
                                        {/* Лицевая сторона */}
                                        <div className="fontInfoForPricing">
                                            <strong>Лицевая сторона:</strong>
                                        </div>
                                        <div className="fontInfoForPricing">
                                            Печать: {pricesThis.priceDrukFront} грн * {pricesThis.sheetCount} листов = {(pricesThis.priceDrukFront * pricesThis.sheetCount).toFixed(2)} грн
                                        </div>
                                        <div className="fontInfoForPricing">
                                            Материалы: {pricesThis.priceMaterialFront} грн * {pricesThis.sheetCount} листов = {(pricesThis.priceMaterialFront * pricesThis.sheetCount).toFixed(2)} грн
                                        </div>
                                        <div className="fontInfoForPricing">
                                            Ламинация: {pricesThis.priceLaminationFront} грн * {pricesThis.sheetCount} листов = {(pricesThis.priceLaminationFront * pricesThis.sheetCount).toFixed(2)} грн
                                        </div>
                                        <div className="fontInfoForPricing">
                                            Итог (лицевая сторона): {pricesThis.totalSheetPriceFront} грн
                                        </div>

                                        <br />

                                        {/* Оборотная сторона */}
                                        <div className="fontInfoForPricing">
                                            <strong>Оборотная сторона:</strong>
                                        </div>
                                        <div className="fontInfoForPricing">
                                            Печать: {pricesThis.priceDrukBack} грн * {pricesThis.sheetCountBack} листов = {(pricesThis.priceDrukBack * pricesThis.sheetCountBack).toFixed(2)} грн
                                        </div>
                                        <div className="fontInfoForPricing">
                                            Материалы: {pricesThis.priceMaterialBack} грн * {pricesThis.sheetCountBack} листов = {(pricesThis.priceMaterialBack * pricesThis.sheetCountBack).toFixed(2)} грн
                                        </div>
                                        <div className="fontInfoForPricing">
                                            Ламинация: {pricesThis.priceLaminationBack} грн * {pricesThis.sheetCountBack} листов = {(pricesThis.priceLaminationBack * pricesThis.sheetCountBack).toFixed(2)} грн
                                        </div>
                                        <div className="fontInfoForPricing">
                                            Итог (оборотная сторона): {pricesThis.totalSheetPriceBack} грн
                                        </div>

                                        <br />

                                        {/* Переплёт (если есть) */}
                                        {pricesThis.totalPerepletPrice > 0 && (
                                            <div className="fontInfoForPricing">
                                                Переплёт: {pricesThis.pricePerepletUnit} грн * {count} шт = {pricesThis.totalPerepletPrice} грн
                                            </div>
                                        )}

                                        <br />

                                        {/* Итоговые данные */}
                                        <div className="fontInfoForPricing1">
                                            Общая стоимость заказа: {pricesThis.price} грн
                                        </div>
                                        <div className="fontInfoForPricing">
                                            - С одного листа A3 можно сделать {pricesThis.sheetsPerUnit} изделий
                                        </div>
                                        <div className="fontInfoForPricing">
                                            - Использовано {pricesThis.sheetCount} листов (A3)
                                        </div>
                                        <div className="fontInfoForPricing">
                                            Цена за изделие (с учетом всех доп. услуг): {pricesThis.priceForItemWithExtras} грн
                                        </div>
                                    </div>




                                    <img
                                        className="versant80-img-icon"
                                        alt="sssss"
                                        src={versantIcon}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    style={{display: "none"}}
                ></div>
            )}
        </>
    )

    return (
        <div>
            <Loader/>
        </div>
    )
};

export default NewNote;

