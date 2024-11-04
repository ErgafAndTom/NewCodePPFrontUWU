import {MDBContainer} from "mdb-react-ui-kit";
import {Row} from "react-bootstrap";
import React, {useCallback, useEffect, useState} from "react";
import axios from '../../api/axiosInstance';
 
import versantIcon from "../public/photoe@2x.png";
import MaterialsInPhoto from "./newnomodals/photo/MaterialsInPhoto";
import SizesInPhoto from "./newnomodals/photo/SizesInPhoto";
import PhotoPosluga from "./newnomodals/photo/PhotoPosluga";
import {useNavigate} from "react-router-dom";

const NewPhoto = ({thisOrder, newThisOrder, setNewThisOrder, selectedThings2, showNewPhoto, setShowNewPhoto, setThisOrder, setSelectedThings2}) => {
    // const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);
    const [isVisible, setIsVisible] = useState(showNewPhoto);
    const [isAnimating, setIsAnimating] = useState(false);
    const [error, setError] = useState(null);
    const handleClose = () => {
        setShowNewPhoto(false);
    }
    const handleShow = useCallback((event) => {
        setShowNewPhoto(true);
    }, []);


    const [size, setSize] = useState({
        x: 297,
        y: 420
    });
    const [material, setMaterial] = useState({
        type: "Папір",
        thickness: "",
        material: "Офісний папір А3 80-90 г/м2",
        materialId: "",
        typeUse: "Фото"
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

    const addNewOrderUnit = e => {
        let dataToSend = {
            orderId: thisOrder.id,
            toCalc: {
                nameOrderUnit: "Фото",
                type: "Photo",
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
                setShowNewPhoto(false)
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
                if(error.response.status === 403){
                    navigate('/login');
                }
                console.log(error.message);
            })
    }, []);

    useEffect(() => {
        let dataToSend = {
            type: "Photo",
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
                setPricesThis(response.data.prices)
            })
            .catch(error => {
                if(error.response.status === 403){
                    navigate('/login');
                }
                console.log(error.message);
            })
    }, [size, material, color, lamination, big, cute, cuteLocal, holes, holesR, count]);

    useEffect(() => {
        if (showNewPhoto) {
            setIsVisible(true); // Сначала показываем модальное окно
            setTimeout(() => setIsAnimating(true), 100); // После короткой задержки запускаем анимацию появления
        } else {
            setIsAnimating(false); // Начинаем анимацию закрытия
            setTimeout(() => setIsVisible(false), 300); // После завершения анимации скрываем модальное окно
        }
    }, [showNewPhoto]);

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
                        Фотографії / Фото на документи / ...

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
                        <Row xs={1} md={6} className="g-2">
                            <div className="d-flex flex-column">
                                <MaterialsInPhoto
                                    material={material}
                                    setMaterial={setMaterial}
                                    count={count}
                                    setCount={setCount}
                                    prices={prices}
                                    selectArr={["3,5 мм", "4 мм", "5 мм", "6 мм", "8 мм"]}
                                    name={"Фото друк на фото принтері:"}
                                    buttonsArr={["Тонкі",
                                        "Середньої щільності",
                                        "Цупкі", "Самоклеючі"]}
                                    typeUse={"Фото"}
                                />
                                <SizesInPhoto
                                    size={size}
                                    setSize={setSize}
                                    prices={prices}
                                    type={"Photo"}
                                    buttonsArr={["односторонній"]}
                                    color={color}
                                    setColor={setColor}
                                    count={count}
                                    setCount={setCount}
                                    
                                />
                                <PhotoPosluga
                                    lamination={lamination}
                                    setLamination={setLamination}
                                    prices={prices}
                                    type={"SheetCut"}
                                    buttonsArr={["З глянцевим ламінуванням",
                                        "З матовим ламінуванням",
                                        "З ламінуванням Soft Touch",]}
                                    selectArr={["3,5 мм", "4 мм", "5 мм", "6 мм", "8 мм"]}
                                />
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
                                {/*    selectArr={[]}*/}
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
                    </MDBContainer>
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
                    {null === pricesThis ? (
                        <div style={{width: '50vw'}}>

                        </div>
                    ) : (
                        <div className="d-flex justify-content-between pricesBlockContainer">
                            <div className="">
                                {/*<div className="adminFont fontInfoForPricing1">*/}
                                {/*    {pricesThis.skolkoListovNaOdin}шт. - Виробів з 1 листа A3(можливо зробити)*/}
                                {/*</div>*/}
                                {/*<div className="adminFont fontInfoForPricing">*/}
                                {/*    {pricesThis.skolko}шт. - Затрачено листів (A3)*/}
                                {/*</div>*/}
                                <div className="fontInfoForPricing">
                                    Матеріали: {pricesThis.priceForThisUnitOfPapper} грн * {pricesThis.skolko} шт
                                    = {pricesThis.priceForThisUnitOfPapper * pricesThis.skolko} грн
                                </div>
                                <div className=" fontInfoForPricing">
                                    Друк: {pricesThis.priceForDrukThisUnit} грн * {pricesThis.skolko} шт
                                    = {pricesThis.priceForDrukThisUnit * pricesThis.skolko} грн
                                </div>
                                {/*<div className="adminFont fontInfoForPricing">*/}
                                {/*    {pricesThis.priceForThisUnitOfLamination}грн. * {pricesThis.skolko}шт.*/}
                                {/*    = {pricesThis.priceForThisAllUnitsOfLamination}грн. - Ціна за ламінацію*/}
                                {/*</div>*/}
                                {/*<div className="adminFont fontInfoForPricing">*/}
                                {/*    {pricesThis.priceForThisUnitOfBig}грн. * {count}шт.*/}
                                {/*    = {pricesThis.priceForAllUnitsOfBig}грн.*/}
                                {/*    - Ціна за бігування*/}
                                {/*</div>*/}
                                {/*<div className="adminFont fontInfoForPricing">*/}
                                {/*    {pricesThis.priceForThisUnitOfCute}грн. * {count}шт.*/}
                                {/*    = {pricesThis.priceForAllUnitsOfCute}грн.*/}
                                {/*    - Ціна за скруглення кутів*/}
                                {/*</div>*/}
                                {/*<div className="adminFont fontInfoForPricing">*/}
                                {/*    {pricesThis.priceForThisUnitOfHoles}грн. * {count}шт.*/}
                                {/*    = {pricesThis.priceForAllUnitsOfHoles}грн.*/}
                                {/*    - Ціна за дірки*/}
                                {/*</div>*/}
                                {/*<div className="adminFont fontInfoForPricing">*/}
                                {/*    {pricesThis.priceForThisUnitOfPapper * pricesThis.skolko}+*/}
                                {/*    {pricesThis.priceForDrukThisUnit * pricesThis.skolko}+*/}
                                {/*    {pricesThis.priceForThisAllUnitsOfLamination}+*/}
                                {/*    {pricesThis.priceForAllUnitsOfBig}+*/}
                                {/*    {pricesThis.priceForAllUnitsOfCute}+*/}
                                {/*    {pricesThis.priceForAllUnitsOfHoles}=*/}
                                {/*    {pricesThis.price}*/}
                                {/*</div>*/}
                                <div className="fontInfoForPricing1">
                                    Загалом {pricesThis.price} грн
                                </div>
                            </div>


                            <img
                                className="versant80-img-icon"
                                alt="sssss"
                                src={versantIcon}
                                style={{width: "14vw"}}
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
    }

    return (
        <div>
            <Loader/>
        </div>
    )
};

export default NewPhoto;