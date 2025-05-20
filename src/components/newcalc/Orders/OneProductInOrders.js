import React, {useState} from "react";
import "./OneProductInOrders.css";

function OneProductInOrders({item, thisOrder}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="unit-list">
            {item.OrderUnitUnits.map((unit, idx) => (
                <div key={unit.idKey} className="unit-item">
                    {/* header row */}
                    <div className="unit-header">
                        <div className="unit-index-name">
                            <span className="unit-index">{idx + 1}.</span>
                            <span className="unit-name">{unit.name}</span>
                        </div>
                        <div className="unit-total">
                            <span className="unit-qty">{unit.newField5}</span>
                            <small>шт</small>
                            <span className="sep">×</span>
                            <span className="unit-price-one">{unit.priceForOneThis}</span>
                            <small>грн</small>
                            <span className="sep">=</span>
                            <span className="unit-sum booooold"
                                  style={{color: "#ef5223"}}>{unit.priceForOneThis * unit.newField5}</span>
                            <small>грн</small>
                        </div>
                    </div>

                    {/* discounted row */}
                    {/*{["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",].includes(thisOrder.prepayment) && thisOrder.prepayment.includes('%')(*/}
                    {/*{thisOrder.prepayment.includes('%') && !parseFloat(unit.priceForOneThis) === parseFloat(unit.priceForOneThisDiscount) && (*/}
                    {parseFloat(unit.priceForOneThis) !== parseFloat(unit.priceForOneThisDiscount) && (
                        <div className="unit-discount">
                            <span className="unit-qty">{unit.newField5}</span>
                            <small>шт</small>
                            <span className="sep">×</span>

                            <span
                                className="unit-price-discounted"> {parseFloat(unit.priceForOneThisDiscount).toFixed(2)}</span>
                            <small>грн</small>
                            <span className="sep">=</span>
                            <span
                                className="unit-total-discounted">{parseFloat(unit.priceForAllThisDiscount).toFixed(2)}</span>

                            <small>грн</small>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default OneProductInOrders;
