import {MDBContainer} from "mdb-react-ui-kit";
import {Row} from "react-bootstrap";
import React, {useCallback, useEffect, useState} from "react";
import axios from '../../api/axiosInstance';
import Loader from "../../components/calc/Loader";
import NewNoModalSize from "./newnomodals/NewNoModalSize";
import NewNoModalLamination from "./newnomodals/NewNoModalLamination";
import NewNoModalHoles from "./newnomodals/NewNoModalHoles";
import versantIcon from "../public/BW_C@2x.png";
import Materials2 from "./newnomodals/Materials2";
import {useNavigate} from "react-router-dom";

const NewSheetCutBw = ({thisOrder, newThisOrder, setNewThisOrder, selectedThings2, setShowNewSheetCutBw, showNewSheetCutBw, setThisOrder, setSelectedThings2}) => {
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [error, setError] = useState(null);
    const handleClose = () => {
        setIsAnimating(false); // Начинаем анимацию закрытия
        setTimeout(() => {
            setIsVisible(false)
            setShowNewSheetCutBw(false);
        }, 300); // После завершения анимации скрываем модальное окно
    }
    const handleShow = useCallback((event) => {
        setShowNewSheetCutBw(true);
    }, []);


    const [size, setSize] = useState({
        x: 210,
        y: 297
    });
    const [material, setMaterial] = useState({
        type: "Папір",
        thickness: "Тонкий",
        material: "",
        materialId: "",
        typeUse: "Тонкий"
    });
    const [color, setColor] = useState({
        sides: "односторонній",
        one: "",
        two: "",
        allSidesColor: "Чорно-білий",
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
    });
    const [holes, setHoles] = useState("Не потрібно");
    const [holesR, setHolesR] = useState("");
    const [count, setCount] = useState(1);
    const [prices, setPrices] = useState(null);
    const [pricesThis, setPricesThis] = useState(null);

    const addNewOrderUnit = e => {
        let dataToSend = {
            orderId: thisOrder.id,
            toCalc: {
                nameOrderUnit: "Листова продукція Ч/Б",
                type: "SheetCutBW",
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

        axios.post(`/orderUnits/OneOrder/OneOrderUnitInOrder`, dataToSend)
            .then(response => {
                // console.log(response.data);
                setThisOrder(response.data);
                // setSelectedThings2(response.data.order.OrderUnits || []);
                setSelectedThings2(response.data.OrderUnits);
                setShowNewSheetCutBw(false)
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
            type: "SheetCutBW",
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
        setLoad(true)
        axios.post(`/calc/pricing`, dataToSend)
            .then(response => {
                // console.log(response.data);
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
    }, [size, material, color, lamination, big, cute, cuteLocal, holes, holesR, count]);

    useEffect(() => {
        if (showNewSheetCutBw) {
            setIsVisible(true); // Сначала показываем модальное окно
            setTimeout(() => setIsAnimating(true), 100); // После короткой задержки запускаем анимацию появления
        } else {
            setIsAnimating(false); // Начинаем анимацию закрытия
            setTimeout(() => setIsVisible(false), 300); // После завершения анимации скрываем модальное окно
        }
    }, [showNewSheetCutBw]);

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
                            <div className="m-auto text-center fontProductName ">
                                Чорно-білий друк: Документів / Договору / Дипломної роботи /Курсової роботи / Реферату / Аналізів /
                                Квитків / ...
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
                                    {/*<Col>*/}
                                    {/*    <NewNoModalSize size={size} setSize={setSize} prices={prices} type={"SheetCut"}/>*/}
                                    {/*</Col>*/}
                                    {/*<Col>*/}
                                    {/*    <ModalMaterial material={material} setMaterial={setMaterial} prices={prices}/>*/}
                                    {/*</Col>*/}
                                    <div className="d-flex flex-column">
                                        <NewNoModalSize
                                            size={size}
                                            setSize={setSize}
                                            prices={prices}
                                            type={"SheetCutBw"}
                                            buttonsArr={["односторонній", "двосторонній",]}
                                            color={color}
                                            setColor={setColor}
                                            count={count}
                                            setCount={setCount}
                                            defaultt={"A4 (210 x 297 мм)"}
                                        />
                                        <Materials2
                                            material={material}
                                            setMaterial={setMaterial}
                                            count={count}
                                            setCount={setCount}
                                            prices={prices}
                                            selectArr={["3,5 мм", "4 мм", "5 мм", "6 мм", "8 мм"]}
                                            name={"Чорно-білий друк на монохромному принтері:"}
                                            buttonsArr={["Тонкий"]}
                                            typeUse={null}
                                        />
                                        <NewNoModalLamination
                                            lamination={lamination}
                                            setLamination={setLamination}
                                            prices={prices}
                                            type={"SheetCutBw"}
                                            buttonsArr={["З глянцевим ламінуванням",
                                                "З матовим ламінуванням",
                                                "З ламінуванням Soft Touch",]}
                                            defaultt={"З глянцевим ламінуванням"}
                                            selectArr={["30", "80", "100", "125", "250"]}

                                        />
                                        {/*<NewNoModalHoles*/}
                                        {/*    holes={holes}*/}
                                        {/*    setHoles={setHoles}*/}
                                        {/*    holesR={holesR}*/}
                                        {/*    setHolesR={setHolesR}*/}
                                        {/*    prices={prices}*/}
                                        {/*    type={"SheetCutBw"}*/}
                                        {/*    buttonsArr={[]}*/}
                                        {/*    selectArr={["", "3,5 мм", "4 мм", "5 мм", "6 мм", "8 мм"]}*/}
                                        {/*/>*/}
                                    </div>
                                </Row>
                            </MDBContainer>
                            <div className="d-flex">
                                {thisOrder && (
                                    <div
                                        className="d-flex align-content-between"
                                        style={{
                                            width: "90vw",
                                            fontFamily: "Gotham",
                                            // fontWeight: "bold",
                                            display: 'flex',
                                            // justifyContent: 'center',
                                            alignItems: 'center',
                                            transition: "all 0.3s ease",
                                            // cursor: "pointer",
                                            height: '5vw',
                                            marginLeft: "2vw",
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
                                <div className="d-flex justify-content-between pricesBlockContainer"
                                     style={{marginTop: "13vw", alignItems: 'center', marginLeft: "2.5vw"}}>
                                    <div className="BWabout">

                                        {/*<div className="fontInfoForPricing">*/}
                                        {/*    {pricesThis.skolko}шт. - Затрачено листів (A3)*/}
                                        {/*</div>*/}
                                        <div className="fontInfoForPricing">
                                            Друк: {pricesThis.priceForDrukThisUnit} грн * {pricesThis.skolko} шт
                                            = {pricesThis.priceForDrukThisUnit * pricesThis.skolko} грн
                                        </div>
                                        <div className="fontInfoForPricing">
                                            Папір: {pricesThis.priceForThisUnitOfPapper} грн * {pricesThis.skolko} шт
                                            = {pricesThis.priceForThisUnitOfPapper * pricesThis.skolko} грн
                                        </div>

                                        <div className="fontInfoForPricing">
                                            Ламінація: {pricesThis.priceForThisUnitOfLamination} грн
                                            * {pricesThis.skolko} шт
                                            = {pricesThis.priceForThisAllUnitsOfLamination} грн
                                        </div>

                                        <div className="fontInfoForPricing">
                                            Свердління отворів: {pricesThis.priceForThisUnitOfHoles} грн * {count} шт
                                            = {pricesThis.priceForAllUnitsOfHoles} грн

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
                                            Загалом: {pricesThis.price} грн.
                                        </div>
                                        {/*<div className="fontInfoForPricing1">*/}
                                        {/*    {pricesThis.skolkoListovNaOdin}шт. - Виробів з 1 листа A3(можливо зробити)*/}
                                        {/*</div>*/}
                                    </div>


                                    <img
                                        className="kyosera-img-icon"
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

export default NewSheetCutBw;