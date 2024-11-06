import React, {useEffect, useState} from "react";

function OneProductInOrders({item, cash = false, handleAmountChange, index}) {
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
                    <div className="d-flex"
                         style={{marginLeft: "1vw"}}>
                        <div className="d-flex">
                            <div className="adminFontTable" >
                                Розмір:
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="adminFontTable" >
                                {item.newField2}
                            </div>
                            <div className="adminFontTable" style={{marginTop: "0.5vw", fontSize: "0.5vw"}}>мм</div>
                        </div>
                        <div className="d-flex">
                            <div className="adminFontTable" >x</div>
                            <div className="adminFontTable" >
                                {item.newField3}
                            </div>
                            <div className="adminFontTable" style={{marginTop: "0.5vw", fontSize: "0.5vw"}}>мм</div>
                        </div>
                    </div>
                    <div className="adminFontTable" style={{
                        // border: "1px black solid",
                        margin: "0 0.2vw 0.2vw 0.2vw"
                    }}>

                        {item.OrderUnitUnits.map((unitItem, iter) => (
                            <div key={`${item.idKey} ${unitItem.idKey} `} className="d-flex adminFontTable">
                                <div className="adminFontTable d-flex shadow-sm " style={{
                                    borderBottom: "1 vh",
                                    margin: "0.3vw",
                                    borderRadius: "0.7vw"
                                }}>
                                    <div className="adminFontTable p-1"
                                         style={{
                                             fontSize: "0.5vw",
                                             alignItems: "center",
                                             marginTop: "0.6vh"
                                         }}>{iter + 1}</div>
                                    <div className="adminFontTable">{unitItem.name}</div>
                                    <div className="adminFontTable">{unitItem.quantity}</div>
                                    <div className="adminFontTable" style={{marginTop: "0.5vw", fontSize: "0.5vw"}}>шт</div>
                                    <div className="adminFontTable">x</div>
                                    <div className="adminFontTable">{unitItem.priceForOneThis}</div>
                                    <div className="adminFontTable" style={{marginTop: "0.5vw", fontSize: "0.5vw"}}>грн</div>
                                    <div className="adminFontTable" style={{marginTop: "0.5vw", fontSize: "0.5vw"}}>=</div>
                                    <div className="adminFontTable booooold">{unitItem.priceForThis}</div>
                                    <div className="adminFontTable " style={{marginTop: "0.5vw", fontSize: "0.5vw"}}>грн/1 виріб</div>


                                    {/*<div className="adminFontTable">x</div>*/}
                                    {/*<div className="adminFontTable ">{item.amount}</div>*/}
                                    {/*<div className="adminFontTable">=</div>*/}
                                    {/*<div className="adminFontTable ">{unitItem.priceForAllThis} </div>*/}
                                    {/*<div className="adminFontTable " style={{marginTop: "0.5vw", fontSize: "0.5vw"}}>грн</div>*/}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default OneProductInOrders;