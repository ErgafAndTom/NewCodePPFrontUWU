import {MDBContainer} from "mdb-react-ui-kit";
import {Row} from "react-bootstrap";
import React, {useCallback, useEffect, useState} from "react";

import axios from '../../api/axiosInstance';
import Loader from "../../components/calc/Loader";
import versantIcon from '../../components/newUIArtem/printers/p6.svg';
import {useNavigate} from "react-router-dom";
import PerepletSize from "./newnomodals/PerepletSize";
import PerepletPereplet from "./newnomodals/PerepletPereplet";
import handleChange from "./newnomodals/PerepletPereplet";
const PerepletMet = ({
                       thisOrder,
                       newThisOrder,
                       setNewThisOrder,
                       selectedThings2,
                       setShowPerepletMet,
                       setThisOrder,
                       setSelectedThings2,
                       showPerepletMet,


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
            setShowPerepletMet(false);
        }, 300); // После завершения анимации скрываем модальное окно
    }
    const handleShow = useCallback((event) => {
        setShowPerepletMet(true);
    }, []);


    const [size, setSize] = useState({
        x: 210,
        y: 297
    });
    const [material, setMaterial] = useState({
        type: "Не потрібно",
        thickness: "Тонкі",
        material: "",
        materialId: "",
        typeUse: null
    });
    const [pereplet, setPereplet] = useState({
        type: "",
        thickness: "Тонкі",
        material: "",
        materialId: "",
        size: "<120",
        typeUse: "Брошурування до 120 аркушів"
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

    const addNewOrderUnit = e => {
        let handleChange = (e) => {
            setCount(e)
        }
        let dataToSend = {
            orderId: thisOrder.id,
            toCalc: {
                nameOrderUnit: "Перепліт без матеріалу(бумаги)",
                type: "PerepletMet",
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
                pereplet: pereplet,
            }
        };

        axios.post(`/orderUnits/OneOrder/OneOrderUnitInOrder`, dataToSend)
            .then(response => {
                console.log(response.data);
                setThisOrder(response.data);
                // setSelectedThings2(response.data.order.OrderUnits || []);
                setSelectedThings2(response.data.OrderUnits);
                setShowPerepletMet(false)
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
            type: "PerepletMet",
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
            pereplet: pereplet,
        }
        axios.post(`/calc/pricing`, dataToSend)
            .then(response => {
                console.log(response.data);
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
    }, [size, material, color, lamination, big, cute, cuteLocal, holes, holesR, count, pereplet]);

    useEffect(() => {
        if (showPerepletMet) {
            setIsVisible(true); // Сначала показываем модальное окно
            setTimeout(() => setIsAnimating(true), 100); // После короткой задержки запускаем анимацию появления
        } else {
            setIsAnimating(false); // Начинаем анимацию закрытия
            setTimeout(() => setIsVisible(false), 300); // После завершения анимации скрываем модальное окно
        }
    }, [showPerepletMet]);

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
                                Перепліт
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
                        <div className="d-flex flex-row inputsArtemkilk allArtemElem" style={{marginLeft: "1.7vw", border: "transparent", justifyContent:"left", marginTop:"1vw"}}> У кількості:
                            <input
                                className="d-flex inputsArtemNumber inputsArtem "
                                style={{
                                    marginLeft: "1vw",
                                    background: "#F2EFE8",
                                    width: "5vw",
                                    alignItems: "center",
                                    justifyContent:"center",
                                    paddingLeft: "0.5vw",

                                }}
                                type="number"
                                value={count}
                                min={1}
                                // disabled
                                onChange={(event) => handleChange(event.target.value)}
                            />
                            <div className="inputsArtemx allArtemElem" style={{ border:"transparent", marginTop:"-2vh" }}> шт</div></div>
                        <div className="d-flex flex-column" style={{marginLeft:"1vw", marginTop: "1vw" }}>
                            <MDBContainer fluid style={{width: '100%'}}>
                                <Row xs={1} md={6} className="">
                                    <div className="d-flex flex-column">
                                        <PerepletSize
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
                                        <PerepletPereplet
                                            size={size}
                                            pereplet={pereplet}
                                            setPereplet={setPereplet}
                                            prices={prices}
                                            type={"SheetCut"}
                                            buttonsArr={["Брошурування до 120 аркушів", "Брошурування від 120 до 280 аркушів",]}
                                            defaultt={"А3 (297 х 420 мм)"}
                                        />

                                        {/*<NewNoModalMaterial*/}
                                        {/*<Materials2*/}
                                        {/*    material={material}*/}
                                        {/*    setMaterial={setMaterial}*/}
                                        {/*    count={count}*/}
                                        {/*    setCount={setCount}*/}
                                        {/*    prices={prices}*/}
                                        {/*    selectArr={["3,5 мм", "4 мм", "5 мм", "6 мм", "8 мм"]}*/}
                                        {/*    name={"Чорно-білий друк на монохромному принтері:"}*/}
                                        {/*    buttonsArr={["Тонкі",*/}
                                        {/*        "Середньої щільності",*/}
                                        {/*        "Цупкі", "Самоклеючі"]}*/}
                                        {/*    typeUse={null}*/}
                                        {/*/>*/}
                                        {/*<NewNoModalLamination*/}
                                        {/*    lamination={lamination}*/}
                                        {/*    setLamination={setLamination}*/}
                                        {/*    prices={prices}*/}
                                        {/*    type={"SheetCut"}*/}
                                        {/*    buttonsArr={["З глянцевим ламінуванням",*/}
                                        {/*        "З матовим ламінуванням",*/}
                                        {/*        "З ламінуванням Soft Touch",]}*/}
                                        {/*    selectArr={["30", "80", "100", "125", "250"]}*/}
                                        {/*/>*/}
                                        {/*<NewNoModalCornerRounding*/}
                                        {/*    big={big}*/}
                                        {/*    setBig={setBig}*/}
                                        {/*    prices={prices}*/}
                                        {/*    type={"SheetCut"}*/}
                                        {/*    buttonsArr={[]}*/}
                                        {/*    selectArr={["", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}*/}
                                        {/*/>*/}
                                        {/*<NewNoModalCute*/}
                                        {/*    cute={cute}*/}
                                        {/*    setCute={setCute}*/}
                                        {/*    cuteLocal={cuteLocal}*/}
                                        {/*    setCuteLocal={setCuteLocal}*/}
                                        {/*    prices={prices}*/}
                                        {/*    type={"SheetCut"}*/}
                                        {/*    buttonsArr={[]}*/}
                                        {/*    selectArr={["3", "6", "8", "10", "13"]}*/}
                                        {/*/>*/}
                                        {/*<NewNoModalHoles*/}
                                        {/*    holes={holes}*/}
                                        {/*    setHoles={setHoles}*/}
                                        {/*    holesR={holesR}*/}
                                        {/*    setHolesR={setHolesR}*/}
                                        {/*    prices={prices}*/}
                                        {/*    type={"SheetCut"}*/}
                                        {/*    buttonsArr={[]}*/}
                                        {/*    selectArr={["", "3,5 мм", "4 мм", "5 мм", "6 мм", "8 мм"]}*/}
                                        {/*/>*/}
                                    </div>
                                </Row>
                                <div className="d-flex">
                                    {thisOrder && (
                                        <div
                                            className="d-flex align-content-between justify-content-between"
                                            style={{
                                                width: "90vw",
                                                marginLeft: "2.5vw",
                                                fontFamily: "Montserrat",
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
                                                borderRadius: '0.5vw',
                                                // border: '0.08vw solid gray',
                                                padding: '0.2vw 0.7vw',
                                                marginLeft: '-2vw',
                                            }}
                                                onClick={addNewOrderUnit}
                                            >
                                                Додати до замовлення
                                            </div>
                                            {/*<div*/}
                                            {/*    className="btn btn-warning" style={{*/}
                                            {/*    borderRadius: '0.627vw',*/}
                                            {/*    border: '0.08vw solid gray',*/}
                                            {/*    padding: '0.2vw 0.7vw',*/}
                                            {/*}}*/}
                                            {/*    // onClick={handleThingClickAndHide}*/}
                                            {/*>*/}
                                            {/*    Додати до пресетів*/}
                                            {/*</div>*/}
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
                                    <div className="d-flex justify-content-between pricesBlockContainer" style={{width: '92vw'}}>
                                        <div className="">

                                            <div className="fontInfoForPricing">
                                                Прошивка {pricesThis.priceForOneOfPereplet} грн * {count} шт
                                                = {pricesThis.price} грн
                                            </div>
                                            {/*<div className="fontInfoForPricing">*/}
                                            {/*    {pricesThis.priceForThisUnitOfPapper * pricesThis.skolko}+*/}
                                            {/*    {pricesThis.priceForDrukThisUnit * pricesThis.skolko}+*/}
                                            {/*    {pricesThis.priceForThisAllUnitsOfLamination}+*/}
                                            {/*    {pricesThis.priceForAllUnitsOfBig}+*/}
                                            {/*    {pricesThis.priceForAllUnitsOfCute}+*/}
                                            {/*    {pricesThis.priceForAllUnitsOfHoles}=*/}
                                            {/*    {pricesThis.price}*/}
                                            {/*</div>*/}
                                            <div className="fontInfoForPricing1">
                                                Загалом: {pricesThis.price} грн
                                            </div>
                                            {/*<div className="fontInfoForPricing">*/}
                                            {/*    - З одного аркуша A3 можливо*/}
                                            {/*    зробити {pricesThis.skolkoListovNaOdin} виробів*/}
                                            {/*</div>*/}
                                            {/*<div className="fontInfoForPricing">*/}
                                            {/*    - Затрачено {pricesThis.skolko} аркушів (SR A3)*/}
                                            {/*</div>*/}
                                        </div>


                                        <img
                                            className="versant80-img-icon"
                                            alt="sssss"
                                            src={versantIcon}
                                            style={{
                                                width: "13vw",

                                            }}
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

    return (
        <div>
            <Loader/>
        </div>
    )
};

export default PerepletMet;
