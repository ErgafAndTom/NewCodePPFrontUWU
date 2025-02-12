import {MDBContainer} from "mdb-react-ui-kit";
import {Row} from "react-bootstrap";
import React, {useCallback, useEffect, useState} from "react";
import axios from '../../api/axiosInstance';
import Loader from "../../components/calc/Loader";
import NewNoModalSize from "./newnomodals/NewNoModalSize";
import NewNoModalLamination from "./newnomodals/NewNoModalLamination";
import NewNoModalCornerRounding from "./newnomodals/NewNoModalBig";
import NewNoModalCute from "./newnomodals/NewNoModalCute";
import NewNoModalHoles from "./newnomodals/NewNoModalHoles";
import versantIcon from "../public/versant80@2x.png";
// import NewNoModalMaterial from "./newnomodals/NewNoModalMaterial";
import {useNavigate} from "react-router-dom";

const NewNote = ({thisOrder, newThisOrder, setNewThisOrder, selectedThings2, showNewNote, setShowNewNote, setThisOrder, setSelectedThings2}) => {
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
    const [material, setMaterial] = useState({
        type: "Папір",
        thickness: "",
        material: "Офісний папір А3 80-90 г/м2",
        materialId: ""
    });
    const [color, setColor] = useState({
        sides: "односторонній",
        one: "",
        two: "",
        allSidesColor: "CMYK",
    });
    const [lamination, setLamination] = useState({
        type: "Не потрібно",
        material: "",
        size: ""
    });
    const [big, setBig] = useState("Не потрібно");
    const [cute, setCute] = useState("Не потрібно");
    const [cuteLocal, setCuteLocal] = useState({
        leftTop: false,
        rightTop: false,
        rightBottom: false,
        leftBottom: false,
    });
    const [holes, setHoles] = useState("Не потрібно");
    const [holesR, setHolesR] = useState("");
    const [count, setCount] = useState(1);
    const [prices, setPrices] = useState(null);
    const [pricesThis, setPricesThis] = useState(null);

    const handleThingClickAndHide = e => {
        let newThisOrderToSend = thisOrder
        let thing = {
            name: "Листова продукція",
            amount: count,
            newField2: size.x,
            newField3: size.y,
            priceForThis: pricesThis.price,
            priceForOneThis: pricesThis.price / count
        }
        newThisOrderToSend.orderunits = [...selectedThings2, {...thing, OrderUnitUnits: []}]
        setNewThisOrder(newThisOrderToSend)
        setShowNewNote(false)
    }

    useEffect(() => {
        axios.get(`/getpricesNew`)
            .then(response => {
                // console.log(response.data);
                setPrices(response.data)
            })
            .catch(error => {
                if(error.response.status === 403){
                    navigate('/login');
                }
                console.log(error.message);
            })
    }, []);

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
            count: count,
        }
        axios.post(`/calc/pricing`, dataToSend)
            .then(response => {
                // console.log(response.data);
                setPricesThis(response.data)
            })
            .catch(error => {
                if(error.response.status === 403){
                    navigate('/login');
                }
                console.log(error.message);
            })
    }, [size, material, color, lamination, big, cute, cuteLocal, holes, holesR, count]);

    useEffect(() => {
        if (showNewNote) {
            setIsVisible(true); // Сначала показываем модальное окно
            setTimeout(() => setIsAnimating(true), 100); // После короткой задержки запускаем анимацию появления
        } else {
            setIsAnimating(false); // Начинаем анимацию закрытия
            setTimeout(() => setIsVisible(false), 300); // После завершения анимации скрываем модальное окно
        }
    }, [showNewNote]);

    if (prices) {
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
                    <div className="adminFont m-auto text-center fontProductName">
                        Візитки / Листівки / Флаєри / Плакати
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
                <div className="d-flex flex-column">
                    <MDBContainer fluid style={{width: '100%'}}>
                        <Row xs={1} md={6} className="">
                            <div className="d-flex flex-column">
                                {/*<NewNoModalMaterial*/}
                                {/*    material={material}*/}
                                {/*    setMaterial={setMaterial}*/}
                                {/*    count={count}*/}
                                {/*    setCount={setCount}*/}
                                {/*    prices={prices}*/}
                                {/*    selectArr={["3,5 мм", "4 мм", "5 мм", "6 мм", "8 мм"]}*/}
                                {/*    name={"Кольоровий друк на промисловій цифровій машині:"}*/}
                                {/*    buttonsArr={["З глянцевим ламінуванням",*/}
                                {/*        "З матовим ламінуванням",*/}
                                {/*        "З ламінуванням Soft Touch",]}*/}
                                {/*/>*/}
                                <NewNoModalSize
                                    size={size}
                                    setSize={setSize}
                                    prices={prices}
                                    type={"SheetCut"}
                                    buttonsArr={["односторонній", "двосторонній",]}
                                    color={color}
                                    setColor={setColor}
                                    count={count}
                                    setCount={setCount}

                                />
                                <NewNoModalLamination
                                    lamination={lamination}
                                    setLamination={setLamination}
                                    prices={prices}
                                    type={"SheetCut"}
                                    buttonsArr={["З глянцевим ламінуванням",
                                        "З матовим ламінуванням",
                                        "З ламінуванням Soft Touch",]}
                                    selectArr={["3,5 мм", "4 мм", "5 мм", "6 мм", "8 мм"]}
                                />
                                <NewNoModalCornerRounding
                                    big={big}
                                    setBig={setBig}
                                    prices={prices}
                                    type={"SheetCut"}
                                    buttonsArr={[]}
                                    selectArr={["", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
                                />
                                <NewNoModalCute
                                    cute={cute}
                                    setCute={setCute}
                                    prices={prices}
                                    type={"SheetCut"}
                                    buttonsArr={[]}
                                    selectArr={[]}
                                />
                                <NewNoModalHoles
                                    holes={holes}
                                    setHoles={setHoles}
                                    holesR={holesR}
                                    setHolesR={setHolesR}
                                    prices={prices}
                                    type={"SheetCut"}
                                    buttonsArr={[]}
                                    selectArr={["", "3,5 мм", "4 мм", "5 мм", "6 мм", "8 мм"]}
                                />
                            </div>
                        </Row>
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
                                        height: '5vw',
                                    }}
                                >
                                    <div
                                        className="btn btn-warning" style={{
                                        borderRadius: '0.627vw',
                                        border: '0.08vw solid gray',
                                        padding: '0.2vw 0.7vw',
                                    }}
                                        onClick={handleThingClickAndHide}
                                    >
                                        Додати до замовлення
                                    </div>
                                    <div
                                        className="btn btn-warning" style={{
                                        borderRadius: '0.627vw',
                                        border: '0.08vw solid gray',
                                        padding: '0.2vw 0.7vw',
                                    }}
                                        // onClick={handleThingClickAndHide}
                                    >
                                        Додати до пресетів
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
                                    <div className="adminFont fontInfoForPricing1">
                                        {pricesThis.skolkoListovNaOdin}шт. - Виробів з 1 листа A3(можливо зробити)
                                    </div>
                                    <div className="adminFont fontInfoForPricing">
                                        {pricesThis.skolko}шт. - Затрачено листів (A3)
                                    </div>
                                    <div className="adminFont fontInfoForPricing">
                                        {pricesThis.priceForThisUnitOfPapper}грн. * {pricesThis.skolko}шт.
                                        = {pricesThis.priceForThisUnitOfPapper * pricesThis.skolko}грн. - Ціна за листи
                                    </div>
                                    <div className="adminFont fontInfoForPricing">
                                        {pricesThis.priceForDrukThisUnit}грн. * {pricesThis.skolko}шт.
                                        = {pricesThis.priceForDrukThisUnit * pricesThis.skolko}грн. - Ціна за друк
                                    </div>
                                    <div className="adminFont fontInfoForPricing">
                                        {pricesThis.priceForThisUnitOfLamination}грн. * {pricesThis.skolko}шт.
                                        = {pricesThis.priceForThisAllUnitsOfLamination}грн. - Ціна за ламінацію
                                    </div>
                                    <div className="adminFont fontInfoForPricing">
                                        {pricesThis.priceForThisUnitOfBig}грн. * {count}шт.
                                        = {pricesThis.priceForAllUnitsOfBig}грн.
                                        - Ціна за бігування
                                    </div>
                                    <div className="adminFont fontInfoForPricing">
                                        {pricesThis.priceForThisUnitOfCute}грн. * {count}шт.
                                        = {pricesThis.priceForAllUnitsOfCute}грн.
                                        - Ціна за скруглення кутів
                                    </div>
                                    <div className="adminFont fontInfoForPricing">
                                        {pricesThis.priceForThisUnitOfHoles}грн. * {count}шт.
                                        = {pricesThis.priceForAllUnitsOfHoles}грн.
                                        - Ціна за дірки
                                    </div>
                                    <div className="adminFont fontInfoForPricing">
                                        {pricesThis.priceForThisUnitOfPapper * pricesThis.skolko}+
                                        {pricesThis.priceForDrukThisUnit * pricesThis.skolko}+
                                        {pricesThis.priceForThisAllUnitsOfLamination}+
                                        {pricesThis.priceForAllUnitsOfBig}+
                                        {pricesThis.priceForAllUnitsOfCute}+
                                        {pricesThis.priceForAllUnitsOfHoles}=
                                        {pricesThis.price}
                                    </div>
                                    <div className="adminFont fontInfoForPricing1">
                                        Ціна за все {pricesThis.price}грн.
                                    </div>
                                </div>


                                <img
                                    className="versant80-img-icon"
                                    alt="sssss"
                                    src={versantIcon}
                                />
                            </div>
                        )}
                    </MDBContainer>

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
    }

    return (
        <div>
            <Loader/>
        </div>
    )
};

export default NewNote;