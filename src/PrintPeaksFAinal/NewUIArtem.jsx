import React, {useEffect, useState} from "react";
import './userInNewUiArtem/StyleArtem.css';
import './CPM.css';
import './global.css';
import './adminStylesCrm.css';
import './Wide.css';
import './MainWindow.css';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from '../api/axiosInstance';
import OneOrderButton from "../components/newUIArtem/orders/OneOrderButton";
import {Modal} from "react-bootstrap";
import Tooltip from './TooltipButton2';


// Usage of ClientsMenu
import img1 from '../components/newUIArtem/printers/46.png';
import img2 from '../components/newUIArtem/printers/ComponentTMP_0-image2.png';
import img3 from '../components/newUIArtem/printers/ComponentTMP_0-image3.png';
import img4 from '../components/newUIArtem/printers/ComponentTMP_0-image4.png';
import img5 from '../components/newUIArtem/printers/ComponentTMP_0-image5.png';
import img6 from '../components/newUIArtem/printers/ComponentTMP_0-image6.png';
import img7 from '../components/newUIArtem/printers/ComponentTMP_0-image7.png';
import img8 from "../components/newUIArtem/printers/Без назви-1.png";
import img9 from "../components/newUIArtem/printers/1996 (1).png";
import imgg10 from '../components/newUIArtem/printers/binder.svg';

import imgg1 from "../components/newUIArtem/printers/p1.svg";
import imgg2 from "../components/newUIArtem/printers/p2.svg";
import imgg3 from "../components/newUIArtem/printers/p3.svg";
import imgg4 from "../components/newUIArtem/printers/p4.svg";
import imgg5 from "../components/newUIArtem/printers/p5.svg";
import imgg6 from "../components/newUIArtem/printers/p6.svg";
import imgg7 from "../components/newUIArtem/printers/p7.svg";
import imgg8 from "../components/newUIArtem/printers/p8.svg";
import imgg9 from "../components/newUIArtem/printers/p9.svg";

import OneProductInOrders from "../components/newcalc/Orders/OneProductInOrders";
import Plotter from "../components/newcalc/products/Plotter";
import NewWide from "./poslugi/newWide";
import NewSheetCut from "./poslugi/NewSheetCut";
import NewSheetCutBw from "./poslugi/NewSheetCutBw";
import NewPhoto from "./poslugi/NewPhoto";
import NewNote from "./poslugi/NewNote";
import ModalDeleteOrderUnit from "./ModalDeleteOrderUnit";
import Loader from "../components/calc/Loader";
import Laminator from "./poslugi/Laminator";
import Vishichka from "./poslugi/Vishichka";
import PerepletMet from "./poslugi/PerepletMet";
import BigOvshik from "./poslugi/BigOvshik";
import ProgressBar from "../ProgressBar";
import {ExampleLoaderComponent} from "../dev/palette";
import NewCup from "./poslugi/NewCup";

const NewUIArtem = () => {
    const navigate = useNavigate();
    const [things, setThings] = useState([]);
    const [products, setProducts] = useState(null);
    const [selectedThings2, setSelectedThings2] = useState([]);
    const [summ, setSumm] = useState(0);
    const [isLoad, setIsLoad] = useState(false);
    const [error, setError] = useState(null);
    const {id} = useParams();
    const [thisOrder, setThisOrder] = useState({
        // id: id
    });
    const [newThisOrder, setNewThisOrder] = useState({
        id: id
    });
    const [typeSelect, setTypeSelect] = useState("");
    const [orders, setOrders] = useState(null);
    const [productName, setProductName] = useState('');
    const [showDeleteOrderUnitModal, setShowDeleteOrderUnitModal] = useState(false);
    const [thisOrderUnit, setThisOrderUnit] = useState(null);


    const [showNewSheetCutBw, setShowNewSheetCutBw] = useState(false);
    const [showNewSheetCut, setShowNewSheetCut] = useState(false);
    const [showNewWide, setShowNewWide] = useState(false);
    const [showNewNote, setShowNewNote] = useState(false);
    const [showNewPhoto, setShowNewPhoto] = useState(false);
    const [showPlotter, setShowPlotter] = useState(false);
    const [showBigOvshik, setShowBigOvshik] = useState(false);
    const [showPerepletMet, setShowPerepletMet] = useState(false);
    const [showNewCup, setShowNewCup] = useState(false);
    const [showLaminator, setShowLaminator] = useState(false);
    const [showVishichka, setShowVishichka] = useState(false);


    const setTypeSelect2 = (thing) => {
        if (thing !== null) {
            setTypeSelect(thing)
        } else {
            setTypeSelect("")
        }
    };
    const handleThingClick = (thing, typeThing) => {
        let newThisOrderToSend = thisOrder
        // console.log(thing);
        if (thing.productunits) {
            newThisOrderToSend.OrderUnits = [...selectedThings2, {
                ...thing,
                amount: 1,
                newField2: 45,
                newField3: 45,
                OrderUnitUnits: thing.productunits
            }]
        } else {
            newThisOrderToSend.OrderUnits = [...selectedThings2, {
                ...thing,
                amount: 1,
                newField2: 45,
                newField3: 45,
                OrderUnitUnits: [],
                x: thing.x,
                y: thing.y,
                idInStorageUnit: thing.id
            }]
        }
        setNewThisOrder(newThisOrderToSend)
    };

    const handleThingClickDelete2 = (OrderUnit) => {
        setShowDeleteOrderUnitModal(true)
        setThisOrderUnit(OrderUnit)
    };

    const handleAmountChange = (selectedThingIndex, fieldName, event) => {
        const updatedSelectedThings2 = [...selectedThings2];
        updatedSelectedThings2[selectedThingIndex][fieldName] = event.target.value;
        let newThisOrderToSend = thisOrder
        newThisOrderToSend.OrderUnits = updatedSelectedThings2
        setNewThisOrder(newThisOrderToSend)
    };

    const handleThisOrderChange = (fieldName, event) => {
        const updatedThisOrder = thisOrder;
        updatedThisOrder[fieldName] = event.target.value;
        setNewThisOrder(updatedThisOrder)
    };

    const handleSaveOrder = (event, valueName) => {
        let dataToSend = {
            data: [],
            id: false,
            tablePosition: valueName,
            value: event.target.value
        }
        axios.post(`/orders/new`, dataToSend)
            .then(response => {
                // console.log(response.data);
                navigate(`/Orders/${response.data.id}`);
            })
            .catch(error => {
                if (error.response.status === 403) {
                    navigate('/login');
                }
                console.log(error.message);
            })
    };

    useEffect(() => {
        (() => {
            console.log(1);
        })();
        if (id) {
            setIsLoad(true)
            let data = {
                id: id
            }
            // console.log(data);
            axios.post(`/Orders/OneOrder`, data)
                .then(response => {
                    // console.log(axios);
                    console.log(response.data);
                    setThisOrder(response.data)
                    setSelectedThings2(response.data.OrderUnits)
                    setIsLoad(false)
                })
                .catch((error, response) => {
                    console.log(error.message);
                    if (error.response.status === 403) {
                        navigate('/login');
                    }
                    setIsLoad(false)
                    setError(error.message)
                })
        }
    }, [id]);

    if (thisOrder.User) {
        return (
            <div
                style={{height: "87vh"}}
            >
                <div className="d-flex" style={{width: "6vw"}}>
                    <div className="d-flex flex-column" style={{
                        border: "1px solid gray",
                        width: "7vw",
                        background: "#E9E6DA",
                        borderRadius: "1.5vh",
                        padding: "0.7vh",
                        marginLeft: "0.5vw",
                        height: "vh",

                    }}>
                        <div className="d-flex">
                            <Tooltip text="___На перевірці" position="right">
                                <div className="iconButtonNewUI" style={{
                                    background: "#848484",
                                    borderBottomLeftRadius: "0.5vw",
                                    borderTopLeftRadius: "0.5vw",
                                    height: "2vw",
                                    width: "1.2vw"
                                }}>
                                </div>
                            </Tooltip>
                            <Tooltip text="В роботі" position="right">
                                <div className="iconButtonNewUI" style={{
                                    background: "#FFCC00",
                                    height: "2vw",
                                    width: "1.2vw"
                                }}>
                                </div>
                            </Tooltip>
                            <Tooltip text="Готово" position="right">
                                <div className="iconButtonNewUI" style={{
                                    background: "#3C60A6",
                                    height: "2vw",
                                    width: "1.2vw"

                                }}>
                                </div>
                            </Tooltip>
                            <Tooltip text="Віддали" position="right">
                                <div className="iconButtonNewUI" style={{
                                    background: "#008249",
                                    height: "2vw",
                                    width: "1.2vw",
                                    borderBottomRightRadius: "0.5vw",
                                    borderTopRightRadius: "0.5vw"
                                }}>
                                </div>
                            </Tooltip>
                        </div>
                        {/*<OneOrderButton item={thisOrder} thisOrder={thisOrder}/>*/}
                        {orders && (
                            <div
                                className="OrdersContainer d-flex flex-column"
                                // style={{overflow: 'auto'}}
                            >
                                {orders.rows.map((item, iter2) => (
                                    <Link
                                        key={item + iter2}
                                        className="d-flex align-content-center align-items-center text-decoration-none"
                                        to={`/Desktop/${item.id}`}
                                    >
                                        {thisOrder && (
                                            <OneOrderButton item={item} thisOrder={thisOrder}/>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        )}
                        <ExampleLoaderComponent/>
                    </div>

                    <div className="containerForContNewUI">
                        <div className="containerNewUI containerPrints">
                            <div className="d-flex" style={{
                                // width: "34.4vw",
                                height: "19.4vh",
                                borderRadius: "1vw"
                            }}>
                                <div
                                    onClick={(event) => setShowNewSheetCutBw(true)}
                                    className="cursorPointer gif printers"
                                    style={{width: "5vw", display: "grid", marginTop: "3vw"}}>
                                    <img src={imgg1} className="card-img-top noanim" alt="..."/>
                                    <img src={img5} className="card-img-top anim" alt="..."/>
                                </div>
                                <div
                                    onClick={(event) => setShowNewSheetCut(true)}
                                    className="cursorPointer printers gif" style={{width: "9vw", marginleft: "0vw"}}>
                                    <img src={imgg2} className="card-img-top noanim" alt="..."/>
                                    <img src={img1} className="card-img-top anim" alt="..."/>
                                </div>
                                <div
                                    onClick={(event) => setShowNewWide(true)}
                                    className="cursorPointer printers gif" style={{width: "10vw", marginTop: "2vw"}}>
                                    <img src={imgg3} className="card-img-top noanim" alt="..."/>
                                    <img src={img2} className="card-img-top anim" alt="..."/>
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                    <div
                                        onClick={(event) => setShowNewCup(true)}
                                        className="cursorPointer printers gif" style={{width: "6vw"}}>
                                        <img src={imgg5} className="card-img-top noanim" alt="..."/>
                                        <img src={img6} className="card-img-top anim" alt="..."/>
                                    </div>
                                    <div
                                        onClick={(event) => setShowNewPhoto(true)}
                                        className="cursorPointer printers gif"
                                        style={{width: "9vw", marginLeft: "0vw"}}>
                                        <img src={imgg4} className="card-img-top noanim" alt="..."/>
                                        <img src={img3} className="card-img-top anim"
                                             style={{width: "6vw", marginLeft: "1.7vw"}} alt="..."/>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex" style={{
                                // border: "1px solid gray",
                                // width: "24.4vw",
                                // height: "19.4vh",
                                borderRadius: "1vw"
                            }}>
                                <div className="d-flex flex-column justify-content-center">
                                    <div
                                        onClick={(event) => setShowBigOvshik(true)}
                                        className="cursorPointer printers gif"
                                        style={{width: "7vw", marginleft: "0vw"}}>
                                        <img src={imgg10} className="card-img-top noanim" alt="..."/>
                                        <img src={imgg10} className="card-img-top anim" alt="..."/>
                                    </div>
                                </div>
                                <div
                                    className="d-flex flex-column align-content-center align-items-center justify-content-center">
                                    <div
                                        onClick={(event) => setShowPerepletMet(true)}
                                        className="cursorPointer printers gif"
                                        style={{width: "8vw", marginLeft: "0vw"}}>
                                        <img src={imgg6} className="card-img-top noanim" alt="..."/>
                                        <img src={img9} className="card-img-top anim" alt="..."/>
                                    </div>
                                    <div
                                        onClick={(event) => setShowNewNote(true)}
                                        className="cursorPointer printers gif" style={{width: "8vw", marginLeft: "0vw"}}>
                                        <img src={imgg7} className="card-img-top noanim" alt="..."/>
                                        <img src={img7} className="card-img-top anim" alt="..."/>
                                    </div>
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                    <div
                                        onClick={(event) => setShowLaminator(true)}
                                        className="cursorPointer printers gif "
                                        style={{width: "8vw", marginLeft: "0vw"}}>
                                        <img src={imgg8} className="card-img-top noanim" alt="..."/>
                                        <img src={img8} className="card-img-top anim" alt="..."/>
                                    </div>
                                    <div
                                        onClick={(event) => setShowVishichka(true)}
                                        className="cursorPointer printers gif"
                                        style={{width: "7vw", marginLeft: "0vw"}}>
                                        <img src={imgg9} className="card-img-top noanim" alt="..."/>
                                        <img src={img4} className="card-img-top anim" alt="..."/>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="containerNewUI containerProducts">

                        </div>
                        {/*<div className="containerNewUI containerMaterials">*/}

                        {/*</div>*/}
                    </div>
                    <div className="d-flex flex-column" style={{marginLeft: "0.3vw"}}>
                        <div className="containerNewUI containerOrderUnits" style={{
                            // padding: "0.3vw",
                            border: "0vw"
                        }}>
                            {selectedThings2 && selectedThings2.length !== 0 ? (
                                <div className="containerOrderUnits">
                                    {selectedThings2.map((thing, index) => (
                                        <div key={index} className="d-flex containerNewUI HoverOrderUnits shadow-sm"
                                             style={{border: "1px #dcd9ce solid", margin: "0.2vw",}}>
                                            {thing.OrderUnitUnits.length !== 0 ? (
                                                <div
                                                    className="d-flex flex-column justify-content-start align-items-start"
                                                    style={{
                                                        width: '32.1vw',
                                                    }}>
                                                    <Modal.Header className="d-flex w-100"
                                                                  style={{position: "relative"}}>
                                                        <div
                                                            className="piecesord d-flex align-items-center overflow-visible"
                                                            style={{
                                                                marginLeft: "1vw",
                                                                padding: "0.5vw",
                                                                position: "relative"
                                                            }}>
                                                            <div className="adminFontTable d-flex align-items-center"
                                                            >
                                                                {thing.name}
                                                                <div className="d-flex align-items-center">
                                                                    <div className="adminFontTable">
                                                                        ( {thing.newField2}
                                                                    </div>
                                                                    <div className="adminFontTable" style={{
                                                                        marginTop: "0.5vw",
                                                                        fontSize: "0.5vw"
                                                                    }}>
                                                                        мм
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex align-items-center">
                                                                    <div className="adminFontTable">x</div>
                                                                    <div className="adminFontTable">
                                                                        {thing.newField3}
                                                                    </div>
                                                                    <div className="adminFontTable" style={{
                                                                        marginTop: "0.5vw",
                                                                        fontSize: "0.5vw"
                                                                    }}>мм
                                                                    </div>
                                                                    )
                                                                </div>
                                                            </div>
                                                            <div className="adminFontTable"
                                                                 style={{fontSize: "0.9vw", marginLeft: "1vw"}}>
                                                                {thing.amount}
                                                            </div>
                                                            <div className="adminFontTable"
                                                                 style={{fontSize: "0.5vw", marginTop: "1.5vh"}}>
                                                                шт
                                                            </div>
                                                            <div className="priceord d-flex align-items-center">
                                                                <div className="adminFontTable booooold"
                                                                     style={{fontSize: "0.9vw", color: "#EE3C23"}}>
                                                                    {thing.priceForThis}
                                                                </div>
                                                                <div className="adminFontTable "
                                                                     style={{
                                                                         fontSize: "0.5vw",
                                                                         marginTop: "1.5vh",
                                                                         color: "#EE3C23"
                                                                     }}>
                                                                    грн
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div
                                                            onClick={(e) => handleThingClickDelete2(thing)}
                                                            className="battonClosed"
                                                            style={{
                                                                margin: "0.5vw",
                                                                zIndex: "99",
                                                                width: "1.5vw",
                                                                height: "1.5vw",
                                                                borderRadius: "50%",
                                                                // backgroundColor: "#EE3C23",
                                                                // color: "white",
                                                                fontSize: "0.8vw",
                                                                fontWeight: "bold",
                                                                position: "absolute",
                                                                right: "-1.3vw",
                                                                top: "-0.3vw",
                                                            }}
                                                        >✕
                                                        </div>
                                                    </Modal.Header>
                                                    <OneProductInOrders item={thing} cash={true}
                                                                        handleAmountChange={handleAmountChange}
                                                                        index={index}/>
                                                    <div className="d-flex justify-content-between"
                                                         style={{marginLeft: "1vw"}}>
                                                        <div
                                                            className="adminFontTable">Кількість:
                                                        </div>
                                                        <input
                                                            type="number"
                                                            placeholder={1}
                                                            min={1}
                                                            value={thing.amount}
                                                            className="adminFontTable"
                                                            style={{
                                                                height: "2.5vh",
                                                                width: "3vw",
                                                                borderRadius: "0.7vh",
                                                                background: "#F2EFE8",
                                                                borderColor: "#F2EFE8"
                                                            }}
                                                            // onChange={(event) => handleAmountChange1(thing, 'amount', event)}
                                                        />
                                                        <div className="d-flex">
                                                            <div
                                                                className="d-flex justify-content-center adminFontTable align-items-last"
                                                                style={{marginLeft: "1.5vw"}}>На
                                                                аркуші міститься: {thing.newField4} виробів
                                                            </div>
                                                            <div
                                                                className="d-flex justify-content-self-end adminFontTable"
                                                                style={{marginLeft: "1.5vw"}}
                                                            > Використано: {thing.newField5} аркушів
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div
                                                    className="d-flex flex-column"
                                                    style={{width: '31.7vw'}}>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="containerOrderUnits">
                                    <h5 className="text-center text-black-50">Замовлення</h5>
                                </div>
                            )}
                        </div>
                        <div className="d-flex flex-column" style={{marginLeft: "0.3vw", marginTop: "1.6vw", borderRadius: "1.5vh"}}>
                            {/*<ProgressBar/>*/}
                            {/*<div className="containerNewUI containerDetailsThisOrder " style={{border: "0vw"}}>*/}
                                {thisOrder && thisOrder.User ? (
                                    <div className="ClientsMenuAll">
                                        <ProgressBar thisOrder={thisOrder} setThisOrder={setThisOrder}
                                                     client={thisOrder.User}
                                                     thisOrder={thisOrder}
                                                     setThisOrder={setThisOrder}
                                                     setNewThisOrder={setNewThisOrder}
                                                     handleThisOrderChange={handleThisOrderChange}/>
                                        {/*<ClientChangerUIArtem*/}
                                        {/*    client={thisOrder.User}*/}
                                        {/*    thisOrder={thisOrder}*/}
                                        {/*    setThisOrder={setThisOrder}*/}
                                        {/*    setNewThisOrder={setNewThisOrder}*/}
                                        {/*    handleThisOrderChange={handleThisOrderChange}*/}
                                        {/*/>*/}
                                        {/*<ClientsMenu client={thisOrder.User} />*/}
                                        {/*<ProgressBar thisOrder={thisOrder} setThisOrder={setThisOrder}/>*/}
                                    </div>
                                ) : (
                                    <div>
                                        <Loader/>
                                        <div>Як так сталося що у вас Order без User?!?</div>
                                    </div>
                                    // <ClientChangerUIArtem client={thisOrder.User} thisOrder={thisOrder}
                                    //                       setNewThisOrder={setNewThisOrder}
                                    //                       handleThisOrderChange={handleThisOrderChange}/>
                                    // <ClientChangerUIArtem client={{email: "null", id: 0, phone: "+00000000",}}/>
                                )}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>


                <ModalDeleteOrderUnit
                    showDeleteOrderUnitModal={showDeleteOrderUnitModal}
                    setShowDeleteOrderUnitModal={setShowDeleteOrderUnitModal}
                    OrderUnit={thisOrderUnit}
                    setThisOrderUnit={setThisOrderUnit}
                    setThisOrder={setThisOrder}
                    setSelectedThings2={setSelectedThings2}
                />


                {showNewSheetCutBw &&
                    <NewSheetCutBw
                        productName={productName}
                        thisOrder={thisOrder} newThisOrder={newThisOrder}
                        selectedThings2={selectedThings2}
                        setNewThisOrder={setNewThisOrder}
                        setShowNewSheetCutBw={setShowNewSheetCutBw}
                        showNewSheetCutBw={showNewSheetCutBw}
                        setThisOrder={setThisOrder}
                        setSelectedThings2={setSelectedThings2}
                    />
                }
                {showNewSheetCut &&
                    <NewSheetCut
                        productName={productName}
                        thisOrder={thisOrder}
                        newThisOrder={newThisOrder}
                        selectedThings2={selectedThings2}
                        setNewThisOrder={setNewThisOrder}
                        setShowNewSheetCut={setShowNewSheetCut}
                        setThisOrder={setThisOrder}
                        setSelectedThings2={setSelectedThings2}
                        showNewSheetCut={showNewSheetCut}
                    />
                }
                {showNewWide &&
                    <NewWide
                        productName={productName}
                        thisOrder={thisOrder}
                        newThisOrder={newThisOrder}
                        selectedThings2={selectedThings2}
                        setNewThisOrder={setNewThisOrder}
                        setShowNewWide={setShowNewWide}
                        setThisOrder={setThisOrder}
                        setSelectedThings2={setSelectedThings2}
                        showNewWide={showNewWide}
                    />
                }
                {showNewCup &&
                    <NewCup
                        productName={productName}
                        thisOrder={thisOrder}
                        newThisOrder={newThisOrder}
                        selectedThings2={selectedThings2}
                        setNewThisOrder={setNewThisOrder}
                        setShowNewCup={setShowNewCup}
                        setThisOrder={setThisOrder}
                        setSelectedThings2={setSelectedThings2}
                        showNewCup={showNewCup}
                    />
                }
                {showNewPhoto &&
                    <NewPhoto
                        productName={productName}
                        thisOrder={thisOrder}
                        newThisOrder={newThisOrder}
                        selectedThings2={selectedThings2}
                        setNewThisOrder={setNewThisOrder}
                        setShowNewPhoto={setShowNewPhoto}
                        showNewPhoto={showNewPhoto}
                        setThisOrder={setThisOrder}
                        setSelectedThings2={setSelectedThings2}
                    />
                }
                {/*{showPlotter &&*/}
                {/*    <Plotter*/}
                {/*        productName={productName}*/}
                {/*        thisOrder={thisOrder} newThisOrder={newThisOrder}*/}
                {/*        selectedThings2={selectedThings2}*/}
                {/*        setNewThisOrder={setNewThisOrder}*/}
                {/*        setShowPlotter={setShowPlotter}*/}
                {/*        showPlotter={showPlotter}*/}
                {/*        setThisOrder={setThisOrder}*/}
                {/*        setSelectedThings2={setSelectedThings2}*/}
                {/*    />*/}
                {/*}*/}
                {showNewNote &&
                    <NewNote
                        productName={productName}
                        thisOrder={thisOrder} newThisOrder={newThisOrder}
                        selectedThings2={selectedThings2}
                        setNewThisOrder={setNewThisOrder}
                        setShowNewNote={setShowNewNote}
                        showNewNote={showNewNote}
                        setThisOrder={setThisOrder}
                        setSelectedThings2={setSelectedThings2}
                    />
                }

                {showBigOvshik &&
                    <BigOvshik
                        productName={productName}
                        thisOrder={thisOrder} newThisOrder={newThisOrder}
                        selectedThings2={selectedThings2}
                        setNewThisOrder={setNewThisOrder}
                        setShowBigOvshik={setShowBigOvshik}
                        showBigOvshik={showBigOvshik}
                        setThisOrder={setThisOrder}
                        setSelectedThings2={setSelectedThings2}
                    />
                }
                {showPerepletMet &&
                    <PerepletMet
                        productName={productName}
                        thisOrder={thisOrder} newThisOrder={newThisOrder}
                        selectedThings2={selectedThings2}
                        setNewThisOrder={setNewThisOrder}
                        setShowPerepletMet={setShowPerepletMet}
                        showPerepletMet={showPerepletMet}
                        setThisOrder={setThisOrder}
                        setSelectedThings2={setSelectedThings2}
                    />
                }
                {/*{showPerepletNeMet &&*/}
                {/*    <PerepletNeMet*/}
                {/*        productName={productName}*/}
                {/*        thisOrder={thisOrder} newThisOrder={newThisOrder}*/}
                {/*        selectedThings2={selectedThings2}*/}
                {/*        setNewThisOrder={setNewThisOrder}*/}
                {/*        setShowPerepletNeMet={setShowPerepletNeMet}*/}
                {/*        showPerepletNeMet={showPerepletNeMet}*/}
                {/*        setThisOrder={setThisOrder}*/}
                {/*        setSelectedThings2={setSelectedThings2}*/}
                {/*    />*/}
                {/*}*/}
                {showLaminator &&
                    <Laminator
                        productName={productName}
                        thisOrder={thisOrder} newThisOrder={newThisOrder}
                        selectedThings2={selectedThings2}
                        setNewThisOrder={setNewThisOrder}
                        setShowLaminator={setShowLaminator}
                        showLaminator={showLaminator}
                        setThisOrder={setThisOrder}
                        setSelectedThings2={setSelectedThings2}
                    />
                }
                {showVishichka &&
                    <Vishichka
                        productName={productName}
                        thisOrder={thisOrder} newThisOrder={newThisOrder}
                        selectedThings2={selectedThings2}
                        setNewThisOrder={setNewThisOrder}
                        setShowVishichka={setShowVishichka}
                        showVishichka={showVishichka}
                        setThisOrder={setThisOrder}
                        setSelectedThings2={setSelectedThings2}
                    />
                }
            </div>
        );
    }

    if (error) {
        return (
            <h1 className="d-flex justify-content-center align-items-center">
                {error}
            </h1>
        )
    }
    return (
        <h1 className="d-flex justify-content-center align-items-center">
            <Loader/>
        </h1>
    )
};


export default NewUIArtem;
