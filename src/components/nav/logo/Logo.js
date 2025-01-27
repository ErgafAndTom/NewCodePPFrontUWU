import React from "react";
import logo from './logo.svg';
import logo2 from './logo.beta.svg';
import './Logo.css';

const Logo = () => {
    const text = "PRINT PEAKS";
    const characters = text.split(""); // Разбиваем текст на символы
    // return (
    //     <img src={logo2} alt="PrintPeaks" className="logoImg"/>
    // );
    return (
        <div className="logo-container">
            {characters.map((char, index) => (
                <div className="character-container" key={index} style={{ animationDelay: `${index * 0.2}s` }}>
                    <span className="character">{char}</span>
                    <div className="line"></div>
                </div>
            ))}
        </div>
    );
};

export default Logo;