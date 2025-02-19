import React, { useState, useEffect } from 'react';
import image9 from "./public/image-9@2x.png";
import image10 from "./public/image-10@2x.png";
import image11 from "./public/image-11@2x.png";
import image12 from "./public/image-12@2x.png";
import image13 from "./public/image-13@2x.png";
import image14 from "./public/image-14@2x.png";
import image15 from "./public/image-15@2x.png";
import image16 from "./public/image-16@2x.png";
import image17 from "./public/image-17@2x.png";
import "./Vimogi.css";
import "./Vimogi";
import "./Colorprinthelpsmall";
import {Outlet} from "react-router-dom";


export const Blacktab = () => {
    return (
        <div className="d-flex justify-content-center custom-button-row">
            <div className="text-container">
                efgegxcvseggreer
                <Outlet/>
            </div>
        </div>
    );
};

export default Blacktab;