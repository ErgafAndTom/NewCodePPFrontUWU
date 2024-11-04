import React from 'react';
import './NewSizesButtons.css';
// import borderRadiusIcon0 from "../../public/borderradius.svg";

const NewSizesButtons = () => {
    const handleClick = (size) => {
        alert(`You clicked on ${size}`);
    };

    return (
        <div className="d-flex artemNewSizesContainer">
            <div className="artemNewSizesContainer">
                <svg xmlns="http://www.w3.org/2000/svg" width="441" height="602" viewBox="0 0 441 602">
                    <g id="A0">
                        <g id="Rectangle_1624" data-name="Rectangle 1624" fill="#FFA500FF" stroke="#FFFF00FF"
                           stroke-width="1">
                            <rect width="441" height="602" rx="20" stroke="none"/>
                            <rect x="0.5" y="0.5" width="440" height="601" rx="19.5" fill="none"/>
                        </g>
                        <text id="А0_841мм_х_1189мм" data-name="А0 841мм х 1189мм" transform="translate(368 587)"
                              font-size="13" font-family="GothamOffice-Regular, Gotham Office">
                            <tspan x="-59.079" y="0">А0 841</tspan>
                            <tspan y="0" font-size="7.583" baseline-shift="-4.332900027028696">мм</tspan>
                            <tspan y="0">х 1189</tspan>
                            <tspan y="0" font-size="7.583" baseline-shift="-4.332900027028696">мм</tspan>
                        </text>
                    </g>
                    <g id="A0" className="artemNewSizesOverlay" onClick={() => handleClick('A0')}>
                        <g id="Rectangle_1624" data-name="Rectangle 1624" fill="#e9e6da" stroke="#707070"
                           stroke-width="1">
                            <rect width="441" height="602" rx="20" stroke="none"/>
                            <rect x="0.5" y="0.5" width="440" height="601" rx="19.5" fill="none"/>
                        </g>
                        <text id="А0_841мм_х_1189мм" data-name="А0 841мм х 1189мм" transform="translate(368 587)"
                              font-size="13" font-family="GothamOffice-Regular, Gotham Office">
                            <tspan x="-59.079" y="0">А0 841</tspan>
                            <tspan y="0" font-size="7.583" baseline-shift="-4.332900027028696">мм</tspan>
                            <tspan y="0">х 1189</tspan>
                            <tspan y="0" font-size="7.583" baseline-shift="-4.332900027028696">мм</tspan>
                        </text>
                    </g>
                    <g id="A1" transform="translate(75 302)">
                        <g id="A1-2" data-name="A1" fill="#FFA500FF" stroke="#FFFF00FF" stroke-width="1">
                            <path d="M0,0H297a0,0,0,0,1,0,0V207a12,12,0,0,1-12,12H12A12,12,0,0,1,0,207V0A0,0,0,0,1,0,0Z"
                                  stroke="none"/>
                            <path
                                d="M.5.5h296a0,0,0,0,1,0,0V207A11.5,11.5,0,0,1,285,218.5H12A11.5,11.5,0,0,1,.5,207V.5A0,0,0,0,1,.5.5Z"
                                fill="none"/>
                        </g>
                        <text id="A1_TEXT" transform="translate(178 207)" font-size="13"
                              font-family="GothamOffice-Regular, Gotham Office">
                            <tspan x="0" y="0">А1 594</tspan>
                            <tspan y="0" font-size="7.583" baseline-shift="-4.332900027028696">мм</tspan>
                            <tspan y="0">х 841</tspan>
                            <tspan y="0" font-size="7.583" baseline-shift="-4.332900027028696">мм</tspan>
                        </text>
                    </g>
                    <g id="A1" transform="translate(75 302)" className="artemNewSizesOverlay"
                       onClick={() => handleClick('A1')}>
                        <g id="A1-2" data-name="A1" fill="#e9e6da" stroke="#707070" stroke-width="1">
                            <path d="M0,0H297a0,0,0,0,1,0,0V207a12,12,0,0,1-12,12H12A12,12,0,0,1,0,207V0A0,0,0,0,1,0,0Z"
                                  stroke="none"/>
                            <path
                                d="M.5.5h296a0,0,0,0,1,0,0V207A11.5,11.5,0,0,1,285,218.5H12A11.5,11.5,0,0,1,.5,207V.5A0,0,0,0,1,.5.5Z"
                                fill="none"/>
                        </g>
                        <text id="A1_TEXT" transform="translate(178 207)" font-size="13"
                              font-family="GothamOffice-Regular, Gotham Office">
                            <tspan x="0" y="0">А1 594</tspan>
                            <tspan y="0" font-size="7.583" baseline-shift="-4.332900027028696">мм</tspan>
                            <tspan y="0">х 841</tspan>
                            <tspan y="0" font-size="7.583" baseline-shift="-4.332900027028696">мм</tspan>
                        </text>
                    </g>
                    <g id="A2" transform="translate(221 82)" className="artemNewSizesOverlay"
                       onClick={() => handleClick('A2')}>
                        <g id="Rectangle_1626" data-name="Rectangle 1626" fill="#FFA500FF" stroke="#FFFF00FF"
                           stroke-width="1">
                            <path d="M0,0H131a20,20,0,0,1,20,20V220a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V0A0,0,0,0,1,0,0Z"
                                  stroke="none"/>
                            <path
                                d="M.5.5H131A19.5,19.5,0,0,1,150.5,20V219.5a0,0,0,0,1,0,0H.5a0,0,0,0,1,0,0V.5A0,0,0,0,1,.5.5Z"
                                fill="none"/>
                        </g>
                        <text id="А2_420мм_х_594мм" data-name="А2 420мм х 594мм" transform="translate(91 209)"
                              font-size="13" font-family="GothamOffice-Regular, Gotham Office">
                            <tspan x="-54.984" y="0">А2 420</tspan>
                            <tspan y="0" font-size="7.583" baseline-shift="-4.332900027028696">мм</tspan>
                            <tspan y="0">х 594</tspan>
                            <tspan y="0" font-size="7.583" baseline-shift="-4.332900027028696">мм</tspan>
                        </text>
                    </g>
                    <g id="A2" transform="translate(221 82)" className="artemNewSizesOverlay"
                       onClick={() => handleClick('A2')}>
                        <g id="Rectangle_1626" data-name="Rectangle 1626" fill="#e9e6da" stroke="#707070"
                           stroke-width="1">
                            <path d="M0,0H131a20,20,0,0,1,20,20V220a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V0A0,0,0,0,1,0,0Z"
                                  stroke="none"/>
                            <path
                                d="M.5.5H131A19.5,19.5,0,0,1,150.5,20V219.5a0,0,0,0,1,0,0H.5a0,0,0,0,1,0,0V.5A0,0,0,0,1,.5.5Z"
                                fill="none"/>
                        </g>
                        <text id="А2_420мм_х_594мм" data-name="А2 420мм х 594мм" transform="translate(91 209)"
                              font-size="13" font-family="GothamOffice-Regular, Gotham Office">
                            <tspan x="-54.984" y="0">А2 420</tspan>
                            <tspan y="0" font-size="7.583" baseline-shift="-4.332900027028696">мм</tspan>
                            <tspan y="0">х 594</tspan>
                            <tspan y="0" font-size="7.583" baseline-shift="-4.332900027028696">мм</tspan>
                        </text>
                    </g>
                    <g id="A3" transform="translate(75 195)">
                        <g id="Rectangle_1625" data-name="Rectangle 1625" fill="#FFA500FF" stroke="#FFFF00FF"
                           stroke-width="1">
                            <rect width="148" height="107" stroke="none"/>
                            <rect x="0.5" y="0.5" width="147" height="106" fill="none"/>
                        </g>
                        <text id="А3_297мм_х_420мм" data-name="А3 297мм х 420мм" transform="translate(87 96)"
                              font-size="13"
                              font-family="GothamOffice-Regular, Gotham Office">
                            <tspan x="-54.984" y="0">А3 297</tspan>
                            <tspan y="0" font-size="7.583" baseline-shift="-4.332900027028696">мм</tspan>
                            <tspan y="0">х 420</tspan>
                            <tspan y="0" font-size="7.583" baseline-shift="-4.332900027028696">мм</tspan>
                        </text>
                    </g>
                    <g id="A3" transform="translate(75 195)" className="artemNewSizesOverlay"
                       onClick={() => handleClick('A3')}>
                        <g id="Rectangle_1625" data-name="Rectangle 1625" fill="#e9e6da" stroke="#707070"
                           stroke-width="1">
                            <rect width="148" height="107" stroke="none"/>
                            <rect x="0.5" y="0.5" width="147" height="106" fill="none"/>
                        </g>
                        <text id="А3_297мм_х_420мм" data-name="А3 297мм х 420мм" transform="translate(87 96)"
                              font-size="13"
                              font-family="GothamOffice-Regular, Gotham Office">
                            <tspan x="-54.984" y="0">А3 297</tspan>
                            <tspan y="0" font-size="7.583" baseline-shift="-4.332900027028696">мм</tspan>
                            <tspan y="0">х 420</tspan>
                            <tspan y="0" font-size="7.583" baseline-shift="-4.332900027028696">мм</tspan>
                        </text>
                    </g>
                    <g id="A4" transform="translate(147 82)">
                        <g id="Rectangle_1610" data-name="Rectangle 1610" fill="#FFA500FF" stroke="#FFFF00FF"
                           stroke-width="1">
                            <rect width="76" height="114" stroke="none"/>
                            <rect x="0.5" y="0.5" width="75" height="113" fill="none"/>
                        </g>
                        <text id="А4_210мм_х_297мм" data-name="А4
210мм х 297мм" transform="translate(40 60) rotate(90)" font-size="13" font-family="GothamOffice-Regular, Gotham Office">
                            <tspan x="-9.503" y="12">А4</tspan>
                            <tspan y="12" font-family="GothamOffice-Bold, Gotham Office" font-weight="700"></tspan>
                            <tspan x="-43.388" y="29">210</tspan>
                            <tspan y="29" font-size="7.583" baseline-shift="-4.332900027028696">мм</tspan>
                            <tspan y="29">х 297</tspan>
                            <tspan y="29" font-size="7.583" baseline-shift="-4.332900027028696">мм</tspan>
                        </text>
                    </g>
                    <g id="A4" transform="translate(147 82)" className="artemNewSizesOverlay"
                       onClick={() => handleClick('A4')}>
                        <g id="Rectangle_1610" data-name="Rectangle 1610" fill="#e9e6da" stroke="#707070"
                           stroke-width="1">
                            <rect width="76" height="114" stroke="none"/>
                            <rect x="0.5" y="0.5" width="75" height="113" fill="none"/>
                        </g>
                        <text id="А4_210мм_х_297мм" data-name="А4
210мм х 297мм" transform="translate(40 60) rotate(90)" font-size="13" font-family="GothamOffice-Regular, Gotham Office">
                            <tspan x="-9.503" y="12">А4</tspan>
                            <tspan y="12" font-family="GothamOffice-Bold, Gotham Office" font-weight="700"></tspan>
                            <tspan x="-43.388" y="29">210</tspan>
                            <tspan y="29" font-size="7.583" baseline-shift="-4.332900027028696">мм</tspan>
                            <tspan y="29">х 297</tspan>
                            <tspan y="29" font-size="7.583" baseline-shift="-4.332900027028696">мм</tspan>
                        </text>
                    </g>
                    <g id="A5" transform="translate(75 141)">
                        <g id="Rectangle_1611" data-name="Rectangle 1611" fill="#FFA500FF" stroke="#FFFF00FF"
                           stroke-width="1">
                            <rect width="73" height="55" stroke="none"/>
                            <rect x="0.5" y="0.5" width="72" height="54" fill="none"/>
                        </g>
                        <text id="А5_148мм_х_210мм" data-name="А5
148мм х 210мм" transform="translate(36.5 23)" font-size="10" font-family="GothamOffice-Regular, Gotham Office">
                            <tspan x="-8.92" y="0">А5</tspan>
                            <tspan y="0" font-family="GothamOffice-Bold, Gotham Office" font-weight="700"></tspan>
                            <tspan x="-33.375" y="14">148</tspan>
                            <tspan y="14" font-size="5.833" baseline-shift="-3.333000104627212">мм</tspan>
                            <tspan y="14">х 210</tspan>
                            <tspan y="14" font-size="5.833" baseline-shift="-3.333000104627212">мм</tspan>
                        </text>
                    </g>
                    <g id="A5" transform="translate(75 141)" className="artemNewSizesOverlay"
                       onClick={() => handleClick('A5')}>
                        <g id="Rectangle_1611" data-name="Rectangle 1611" fill="#e9e6da" stroke="#707070"
                           stroke-width="1">
                            <rect width="73" height="55" stroke="none"/>
                            <rect x="0.5" y="0.5" width="72" height="54" fill="none"/>
                        </g>
                        <text id="А5_148мм_х_210мм" data-name="А5
148мм х 210мм" transform="translate(36.5 23)" font-size="10" font-family="GothamOffice-Regular, Gotham Office">
                            <tspan x="-8.92" y="0">А5</tspan>
                            <tspan y="0" font-family="GothamOffice-Bold, Gotham Office" font-weight="700"></tspan>
                            <tspan x="-33.375" y="14">148</tspan>
                            <tspan y="14" font-size="5.833" baseline-shift="-3.333000104627212">мм</tspan>
                            <tspan y="14">х 210</tspan>
                            <tspan y="14" font-size="5.833" baseline-shift="-3.333000104627212">мм</tspan>
                        </text>
                    </g>
                    <g id="A6" transform="translate(111 82)">
                        <g id="Rectangle_1612" data-name="Rectangle 1612" fill="#FFA500FF" stroke="#FFFF00FF"
                           stroke-width="1">
                            <rect width="37" height="60" stroke="none"/>
                            <rect x="0.5" y="0.5" width="36" height="59" fill="none"/>
                        </g>
                        <text id="А6" transform="translate(15.688 24)" font-size="12"
                              font-family="GothamOffice-Regular, Gotham Office">
                            <tspan x="-8.772" y="12">А6</tspan>
                        </text>
                    </g>
                    <g id="A6" transform="translate(111 82)" className="artemNewSizesOverlay"
                       onClick={() => handleClick('A6')}>
                        <g id="Rectangle_1612" data-name="Rectangle 1612" fill="#e9e6da" stroke="#707070"
                           stroke-width="1">
                            <rect width="37" height="60" stroke="none"/>
                            <rect x="0.5" y="0.5" width="36" height="59" fill="none"/>
                        </g>
                        <text id="А6" transform="translate(15.688 24)" font-size="12"
                              font-family="GothamOffice-Regular, Gotham Office">
                            <tspan x="-8.772" y="12">А6</tspan>
                        </text>
                    </g>
                    <g id="A7" transform="translate(75 112)">
                        <g id="Rectangle_1613" data-name="Rectangle 1613" fill="#FFA500FF" stroke="#FFFF00FF"
                           stroke-width="1">
                            <rect width="37" height="30" stroke="none"/>
                            <rect x="0.5" y="0.5" width="36" height="29" fill="none"/>
                        </g>
                        <text id="А7" transform="translate(19 20)" font-size="12"
                              font-family="GothamOffice-Regular, Gotham Office">
                            <tspan x="-8.772" y="0">А7</tspan>
                        </text>
                    </g>
                    <g id="A7" transform="translate(75 112)" className="artemNewSizesOverlay"
                       onClick={() => handleClick('A7')}>
                        <g id="Rectangle_1613" data-name="Rectangle 1613" fill="#e9e6da" stroke="#707070"
                           stroke-width="1">
                            <rect width="37" height="30" stroke="none"/>
                            <rect x="0.5" y="0.5" width="36" height="29" fill="none"/>
                        </g>
                        <text id="А7" transform="translate(19 20)" font-size="12"
                              font-family="GothamOffice-Regular, Gotham Office">
                            <tspan x="-8.772" y="0">А7</tspan>
                        </text>
                    </g>
                    <g id="CreditCard" transform="translate(107.5 107.474) rotate(-180)">
                        <g id="credit-card" transform="translate(28 0) rotate(90)">
                            <path id="Path_13284" data-name="Path 13284"
                                  d="M5,0C2.361,0,0,1.636,0,4V24c0,2.364,2.361,4,5,4H39a3.677,3.677,0,0,0,4-4V4s.778-4-4-4Z"
                                  transform="translate(0 0)" fill="#FFA500FF"/>
                            <path id="Path_13285" data-name="Path 13285" d="M0,0H43V6H0Z" transform="translate(0 5)"
                                  fill="#292f33"/>
                            <path id="Path_13286" data-name="Path 13286" d="M0,0H34V6H0Z" transform="translate(5 15)"
                                  fill="#f4f7f9"/>
                            <path id="Path_13287" data-name="Path 13287"
                                  d="M16.348,4.127a2.914,2.914,0,0,1-3-2c-.653.044-1.134.507-2,1a5.5,5.5,0,0,1-3,1c-1.43,0-2.909-.582-3-2,0-.06.02,0,0,0a3.3,3.3,0,0,0-3,2c-.187.229-.687-.043-1,0s-.745.168-1,0c-.532-.35-.39-.523,0-1a5.83,5.83,0,0,1,5-3c2.314,0,2.964,1.451,3,2h0a6.155,6.155,0,0,0,2-1c1.148-.653,2.092-1.438,4-1a3.588,3.588,0,0,1,2,2c.016.081-.02-.039,0,0h0a6.323,6.323,0,0,0,3,0,13.091,13.091,0,0,1,4-1c4.048,0,5.826,1.8,6,2,.407.465.52.636,0,1a1.76,1.76,0,0,1-2,0c-.028-.029-1.125-1-4-1a11.505,11.505,0,0,0-3,1C19.143,4.551,17.617,4.127,16.348,4.127Z"
                                  transform="translate(6.652 15.873)" fill="#8899a6"/>
                        </g>
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default NewSizesButtons;
