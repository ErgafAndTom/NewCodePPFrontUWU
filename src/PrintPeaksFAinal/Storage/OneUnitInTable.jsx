import React, {useCallback, useEffect, useState} from 'react';
// import {Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from '../../api/axiosInstance';
import redIcon from '../../components/redIcon.svg';
import StatusBar from "../Orders/StatusBar";
import {useNavigate} from "react-router-dom";

const OneItemInTable = ({itemData, tablPosition, item, metaItem, handleItemClickRed}) => {

    if (tablPosition === "id") {
        return (
            <div className="CustomOrderTable-cell"
                 style={{border: "0.05vw solid #F2EFE8"}}>{itemData}</div>
        )
    }
    if (tablPosition === "password") {
        return (
            <div className="CustomOrderTable-cell"
                 style={{border: "0.05vw solid #F2EFE8"}}>{itemData}</div>
        )
    }
    if (tablPosition === "createdAt") {
        return (
            <div className="CustomOrderTable-cell"
                 style={{border: "0.05vw solid #F2EFE8"}}>
                {`${new Date(itemData).toLocaleDateString()} ${new Date(itemData).toLocaleTimeString()}`}
            </div>
        )
    }
    if (tablPosition === "updatedAt") {
        return (
            <div className="CustomOrderTable-cell"
                 style={{border: "0.05vw solid #F2EFE8"}}
            >
                {`${new Date(itemData).toLocaleDateString()} ${new Date(itemData).toLocaleTimeString()}`}
            </div>
        )
    }
    if (tablPosition === "photo") {
        return (
            <div style={{overflow: 'hidden', whiteSpace: "nowrap", textOverflow: "ellipsis", background: "transparent"}}
                 className="adminFontTable d-flex align-content-center justify-content-center m-auto p-0">{itemData}</div>
        )
    }

    // if (tablPosition === "status") {
    //     return (
    //         <StatusBar item={item}/>
    //     )
    // }

    return (
        <div
            className="CustomOrderTable-cell CustomOrderTable-cellCan"
            style={{border: "0.05vw solid #F2EFE8"}}
            onClick={(e) => handleItemClickRed(item, e, metaItem)}
        >
            {itemData}
        </div>
    )
};

export default OneItemInTable