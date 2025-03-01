import {MDBContainer} from "mdb-react-ui-kit";
import {Row} from "react-bootstrap";
import React, {useCallback, useEffect, useState} from "react";
import axios from '../../api/axiosInstance';
import Loader from "../../components/calc/Loader";
import versantIcon from "../../components/newUIArtem/printers/p7.svg";
import {useNavigate} from "react-router-dom";
import NewNoModalSizeNote from "./newnomodals/note/NewNoModalSizeNote";
import Materials2NoteFront from "./newnomodals/note/Materials2NoteFront";
import Materials2NoteBack from "./newnomodals/note/Material2NoteBack";
import Materials2NoteInBody from "./newnomodals/note/Material2NoteInBody";
import PerepletPereplet from "./newnomodals/PerepletPereplet";

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
    const [materialAndDrukFront, setMaterialAndDrukFront] = useState({
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

        ColorDrukLaminationTypeUse: "",
        BwDrukLaminationTypeUse: "",
        NonDrukLaminationTypeUse: "",

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
    const [materialAndDrukBack, setMaterialAndDrukBack] = useState({
        materialType: "Папір",
        materialTypeUse: "Офісний",
        drukColor: "Не потрібно",
        drukSides: "односторонній",
        drukId: "Не потрібно",
        thickness: "",
        material: "",
        materialId: "",
        laminationType: "",
        laminationTypeUse: "",
        laminationmaterial: "",
        laminationmaterialId: "",
        typeUse: ""
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
        let allPapers = 1+1+materialAndDrukInBody.colorCount+materialAndDrukInBody.bwCount+materialAndDrukInBody.nonCount;
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
    }, [materialAndDrukInBody.colorCount, materialAndDrukInBody.bwCount, materialAndDrukInBody.nonCount]);

    const addNewOrderUnit = e => {
        let dataToSend = {
            orderId: thisOrder.id,
            toCalc: {
                nameOrderUnit: "Листова продукція з порізкою",
                type: "SheetCut",
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

    // useEffect(() => {
    //     axios.get(`/getpricesNew`)
    //         .then(response => {
    //             // console.log(response.data);
    //             setPrices(response.data)
    //         })
    //         .catch(error => {
    //             if(error.response.status === 403){
    //                 navigate('/login');
    //             }
    //             console.log(error.message);
    //         })
    // }, []);

    useEffect(() => {
        let dataToSend = {
            type: "SheetCut",
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
    }, [size, material, color, lamination, big, cute, cuteLocal, holes, holesR, count, porizka]);

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
                                Блокноти
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

                        <div className="d-flex flex-column" style={{margin: '0', padding: '1.5vw'}}>
                            <div className="d-flex flex-column" style={{margin: '0', padding: '0'}}>
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
                                <Materials2NoteInBody
                                    materialAndDrukInBody={materialAndDrukInBody}
                                    setMaterialAndDrukInBody={setMaterialAndDrukInBody}
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
                                <PerepletPereplet
                                    size={size}
                                    pereplet={pereplet}
                                    setPereplet={setPereplet}
                                    prices={prices}
                                    type={"SheetCut"}
                                    buttonsArr={["Брошурування до 120 аркушів", "Брошурування від 120 до 280 аркушів",]}
                                    defaultt={"А3 (297 х 420 мм)"}
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

                                        <div className="fontInfoForPricing">
                                            Друк: {pricesThis.priceForDrukThisUnit} грн * {pricesThis.skolko} шт
                                            = {(pricesThis.priceForDrukThisUnit * pricesThis.skolko)} грн
                                        </div>
                                        <div className="fontInfoForPricing">
                                            Матеріали: {pricesThis.priceForThisUnitOfPapper}грн.
                                            * {pricesThis.skolko} шт
                                            = {(pricesThis.priceForThisUnitOfPapper * pricesThis.skolko)}грн.
                                        </div>

                                        <div className="fontInfoForPricing">
                                            Ламінація: {pricesThis.priceForThisUnitOfLamination} грн
                                            * {pricesThis.skolko} шт
                                            = {pricesThis.priceForThisAllUnitsOfLamination} грн
                                        </div>
                                        <div className="fontInfoForPricing">
                                            Згинання {pricesThis.priceForThisUnitOfBig} грн * {count} шт
                                            = {pricesThis.priceForAllUnitsOfBig} грн
                                        </div>
                                        <div className=" fontInfoForPricing">
                                            Скруглення кутів: {pricesThis.priceForThisUnitOfCute} грн * {count} шт
                                            = {pricesThis.priceForAllUnitsOfCute} грн
                                        </div>
                                        <div className="fontInfoForPricing">
                                            Свердління отворів: {pricesThis.priceForThisUnitOfHoles} грн * {count} шт
                                            = {pricesThis.priceForAllUnitsOfHoles} грн
                                        </div>
                                        {pricesThis.porizka !== 0 &&
                                            <div className="fontInfoForPricing">
                                                Порізка: {pricesThis.porizka} грн * {count} шт
                                                = {pricesThis.porizka*count} грн
                                            </div>
                                        }
                                        <div className="fontInfoForPricing1">
                                            Загалом: {pricesThis.price} грн
                                        </div>
                                        <div className="fontInfoForPricing">
                                            - З одного аркуша A3 можливо
                                            зробити {pricesThis.skolkoListovNaOdin} виробів
                                        </div>
                                        <div className="fontInfoForPricing">
                                            - Затрачено {pricesThis.skolko} аркушів (SR A3)
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

