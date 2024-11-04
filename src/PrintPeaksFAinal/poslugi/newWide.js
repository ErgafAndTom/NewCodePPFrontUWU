import {MDBContainer} from "mdb-react-ui-kit";
import {Row} from "react-bootstrap";
import React, {useCallback, useEffect, useState} from "react";
import axios from '../../api/axiosInstance';
 
import versantIcon from "../public/wided@2x.png";
import NewNoModalSize from "./newnomodals/NewNoModalSize";
import Materials2 from "./newnomodals/Materials2";
import SliderComponent from "./newnomodals/SlidersComponent";
import {useNavigate} from "react-router-dom";
import Loader from "../../components/calc/Loader";

const NewWide = ({thisOrder, newThisOrder, setNewThisOrder, selectedThings2, setShowNewWide, showNewWide, setThisOrder, setSelectedThings2}) => {
    // const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [error, setError] = useState(null);
    const handleClose = () => {
        setIsAnimating(false); // Начинаем анимацию закрытия
        setTimeout(() => {
            setIsVisible(false)
            setShowNewWide(false);
        }, 300); // После завершения анимации скрываем модальное окно
    }
    const handleShow = useCallback((event) => {
        setShowNewWide(true);
    }, []);


    const [size, setSize] = useState({
        x: 841,
        y: 1189
    });
    const [material, setMaterial] = useState({
        type: "Папір Широкоформат",
        thickness: "",
        material: "",
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
    const [holesR, setHolesR] = useState("Не потрібно");
    const [count, setCount] = useState(1);
    const [prices, setPrices] = useState(null);
    const [pricesThis, setPricesThis] = useState(null);

    const addNewOrderUnit = e => {
        let dataToSend = {
            orderId: thisOrder.id,
            toCalc: {
                nameOrderUnit: "Широкоформатна продукція",
                type: "Wide",
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
            }
        };

        axios.post(`/orders/OneOrder/OneOrderUnitInOrder`, dataToSend)
            .then(response => {
                // console.log(response.data);
                setThisOrder(response.data);
                // setSelectedThings2(response.data.order.OrderUnits || []);
                setSelectedThings2(response.data.OrderUnits);
                setShowNewWide(false)
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
        axios.get(`/getpricesNew`)
            .then(response => {
                // console.log(response.data);
                setPrices(response.data)
            })
            .catch(error => {
                console.log(error.message);
            })
    }, []);

    useEffect(() => {
        let dataToSend = {
            type: "Wide",
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
        }
        axios.post(`/calc/pricing`, dataToSend)
            .then(response => {
                // console.log(response.data);
                setPricesThis(response.data.prices)
            })
            .catch(error => {
                console.log(error.message);
            })
    }, [size, material, color, lamination, big, cute, cuteLocal, holes, holesR, count]);

    useEffect(() => {
        if (showNewWide) {
            setIsVisible(true); // Сначала показываем модальное окно
            setTimeout(() => setIsAnimating(true), 100); // После короткой задержки запускаем анимацию появления
        } else {
            setIsAnimating(false); // Начинаем анимацию закрытия
            setTimeout(() => setIsVisible(false), 300); // После завершения анимации скрываем модальное окно
        }
    }, [showNewWide]);

    if (prices) {
        return (
            <>
                {isVisible ? (
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
                                <div className="adminFont m-auto text-center fontProductName">Великі плакати / Креслення
                                    / Фотографії / Афіши / Лекала / ...
                                </div>
                                y
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
                                <div className="d-flex">
                                    <MDBContainer
                                        fluid
                                        style={{width: '100%'}}
                                        className="d-flex"
                                    >
                                        <Row xs={1} md={6} className="d-flex">
                                            <div className="d-flex flex-column">
                                                <NewNoModalSize
                                                    size={size}
                                                    setSize={setSize}
                                                    prices={prices}
                                                    type={"Wide"}
                                                    buttonsArr={["односторонній"]}
                                                    color={color}
                                                    setColor={setColor}
                                                    count={count}
                                                    setCount={setCount}

                                                />
                                                <SliderComponent
                                                    size={size}
                                                    setSize={setSize}
                                                    prices={prices}
                                                    type={"Wide"}
                                                    buttonsArr={["односторонній"]}
                                                    color={color}
                                                    setColor={setColor}
                                                    count={count}
                                                    setCount={setCount}

                                                />
                                                <Materials2
                                                    material={material}
                                                    setMaterial={setMaterial}
                                                    count={count}
                                                    setCount={setCount}
                                                    prices={prices}
                                                    selectArr={["3,5 мм", "4 мм", "5 мм", "6 мм", "8 мм"]}
                                                    name={"Широкоформатний фотодрук:"}
                                                    buttonsArr={[]}
                                                />
                                            </div>
                                            {/*<NewSizesButtons*/}
                                            {/*    size={size}*/}
                                            {/*    setSize={setSize}*/}
                                            {/*/>*/}
                                        </Row>
                                        {/*{data.rows.map((item) => (*/}
                                        {/*"proxy": "http://127.0.0.1:3000",*/}
                                        {/*    <CardProduct key={item.id} name={name} data={data} setData={setData} item={item}/>*/}
                                        {/*))}*/}
                                    </MDBContainer>
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
                                                // cursor: "pointer",
                                                height: '5vw',
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
                                {null === pricesThis ? (
                                    <div style={{width: '50vw'}}>

                                    </div>
                                ) : (
                                    <div className="d-flex justify-content-between pricesBlockContainer">
                                        <div style={{border: "0px black solid"}}>
                                            <div>
                                                {/*1 вариант:*/}
                                                {/*<div className="adminFont fontInfoForPricing">*/}
                                                {/*    {size.x} мм*/}
                                                {/*    * {pricesThis.operantForChangeMM2ToM2} = {pricesThis.sizeXM2}м*/}
                                                {/*</div>*/}
                                                {/*<div className="adminFont fontInfoForPricing">*/}
                                                {/*    {size.y}мм*/}
                                                {/*    * {pricesThis.operantForChangeMM2ToM2} = {pricesThis.sizeYM2}м*/}
                                                {/*</div>*/}
                                                <div className=" fontInfoForPricing">
                                                    {pricesThis.sizeXM2} м
                                                    * {pricesThis.sizeYM2} м = {pricesThis.totalSizeInM2One} м²
                                                </div>
                                            </div>
                                            <div className="fontInfoForPricing">
                                                {pricesThis.totalSizeInM2One} м² * {pricesThis.skolko} шт
                                                = {pricesThis.allTotalSizeInM2} м² - {pricesThis.skolko} шт
                                            </div>
                                            <div className="fontInfoForPricing">
                                                Друк {pricesThis.oneWideDrukPrice} грн * {pricesThis.skolko} шт
                                                = {pricesThis.totalWideDrukPrice} грн
                                            </div>
                                            <div className="fontInfoForPricing">
                                                Матеріали: {pricesThis.oneWideMaterialPrice} грн
                                                * {pricesThis.skolko} шт
                                                = {pricesThis.totalWideMaterialPrice} грн
                                            </div>
                                            <div className="fontInfoForPricing1">
                                                Загалом: {pricesThis.price}грн.
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
                            {/*{thisOrder && (*/}
                            {/*    <div className="btn btn-light" onClick={handleThingClickAndHide}>*/}
                            {/*        ДОДАТИ ДО ЗАМОВЛЕННЯ*/}
                            {/*    </div>*/}
                            {/*)}*/}
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

export default NewWide;