import React from "react";
import logo from './logo.svg';
import logo2 from './logo.beta.svg';
import './Logo.css';

const Logo = () => {
    return (
        <img src={logo2} alt="PrintPeaks" className="logoImg"/>
    );
};

export default Logo;