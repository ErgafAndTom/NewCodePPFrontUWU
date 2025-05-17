import React, {useEffect, useState} from "react";
import NewSheetCutBw from "../../../PrintPeaksFAinal/poslugi/NewSheetCutBw";

function OneProductInOrders({item, cash = false, handleAmountChange, index, thisOrder}) {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        // console.log(item);
        setShow(true);
    }
    return (
        <div>
            <div>

                <div className="adminFont" style={{
                    // border: "1px black solid",
                    width: "32vw",
                    margin: "0"
                }}>
                    <div className="adminFontTable" style={{
                        // border: "1px black solid",
                        margin: "0 0.2vw 0.2vw 0.2vw"
                    }}>

                        {item.OrderUnitUnits.map((unitItem, iter) => (
                            <div key={`${item.idKey} ${unitItem.idKey} `} className="d-flex flex-column adminFontTable shadow-sm" style={{background: "#F2F0E7",borderRadius: "0.5vw",borderBottom: "0.3 vh #6a6a6a",}}>
                                <div className="adminFontTable d-flex justify-content-between" style={{
                                    borderBottom: "1 vh",
                                    padding: "0.1vw",
                                    // borderRadius: "0.5vw",
                                    // backgroundColor: "#ffffff",
                                    background: "#F2F0E7",
                                    width: "31vw",
                                }}>
                                    <div className="d-flex" style={{
                                        // background: "#8e791c",
                                        maxWidth: "19vw"}}
                                    >
                                        <div className="adminFontTable"
                                             style={{
                                                 fontSize: "0.5vw",
                                                 alignItems: "center",
                                                 marginTop: "0.6vh",
                                             }}>{iter + 1}</div>
                                        <div className="adminFontTable">{unitItem.name}</div>
                                    </div>
                                    <div className="d-flex" style={{
                                        // background: "#8e791c",
                                        maxWidth: "12vw"
                                    }}>
                                        <div className="adminFontTable">{unitItem.newField5}</div>
                                        <div className="adminFontTable"
                                             style={{marginTop: "0.5vw", fontSize: "0.5vw"}}>шт
                                        </div>
                                        <div className="adminFontTable">x</div>
                                        <div className="adminFontTable">{unitItem.priceForOneThis}</div>
                                        <div className="adminFontTable"
                                             style={{marginTop: "0.5vw", fontSize: "0.5vw"}}>грн
                                        </div>
                                        <div className="adminFontTable"
                                             style={{marginTop: "0.5vw", fontSize: "0.5vw"}}>=
                                        </div>
                                        <div
                                            className="adminFontTable booooold">
                                            {
                                                (unitItem.priceForOneThis * unitItem.newField5)
                                                // *0.87
                                            }
                                        </div>
                                        {/*<div className="adminFontTable booooold">{unitItem.priceForOneThis*unitItem.newField3}</div>*/}
                                        {/*<div className="adminFontTable booooold">{unitItem.priceForOneThis*unitItem.newField4}</div>*/}
                                        <div className="adminFontTable "
                                             style={{marginTop: "0.5vw", fontSize: "0.5vw"}}>грн
                                        </div>
                                    </div>


                                    {/*<div className="adminFontTable">x</div>*/}
                                    {/*<div className="adminFontTable ">{item.amount}</div>*/}
                                    {/*<div className="adminFontTable">=</div>*/}
                                    {/*<div className="adminFontTable ">{unitItem.priceForAllThis} </div>*/}
                                    {/*<div className="adminFontTable " style={{marginTop: "0.5vw", fontSize: "0.5vw"}}>грн</div>*/}
                                </div>

                                {!['0', '0%', '', '%'].includes(thisOrder.prepayment) &&
                                    <div className="d-flex adminFontTable justify-content-end align-content-center" style={{width: "31vw",background: "#f2ebe7",}}>
                                        {/*<div className="d-flex">*/}
                                        {/*    <div className="adminFontTable" style={{marginLeft: "2vw",}}>Зі знижкою: ({thisOrder.prepayment}) =</div>*/}
                                        {/*</div>*/}
                                        <div className="d-flex">
                                            <div className="adminFontTable">{unitItem.newField5}</div>
                                            <div className="adminFontTable"
                                                 style={{marginTop: "0.5vw", fontSize: "0.5vw"}}>шт
                                            </div>
                                            <div className="adminFontTable">x</div>
                                            <div className="adminFontTable">({unitItem.priceForOneThis}</div>
                                            <div className="adminFontTable"
                                                 style={{marginTop: "0.5vw", fontSize: "0.5vw"}}>грн
                                            </div>
                                            <div className="adminFontTable"
                                                 style={{marginTop: "0.5vw", fontSize: "0.5vw"}}>-
                                            </div>
                                            <div className="adminFontTable">{thisOrder.prepayment}</div>
                                            <div className="adminFontTable"
                                                 style={{marginTop: "0.5vw", fontSize: "0.5vw"}}>=
                                            </div>
                                            <div className="adminFontTable">{unitItem.priceForOneThisDiscount}</div>
                                            <div className="adminFontTable"
                                                 style={{marginTop: "0.5vw", fontSize: "0.5vw"}}>грн
                                            </div>
                                            <div className="adminFontTable">)</div>
                                            <div className="adminFontTable"
                                                 style={{marginTop: "0.5vw", fontSize: "0.5vw"}}>=
                                            </div>
                                            <div
                                                className="adminFontTable booooold" style={{color: "#450500"}}>
                                                {
                                                    (unitItem.priceForOneThisDiscount * unitItem.newField5)
                                                }
                                            </div>
                                            <div className="adminFontTable "
                                                 style={{marginTop: "0.5vw", fontSize: "0.5vw"}}>грн
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default OneProductInOrders;
