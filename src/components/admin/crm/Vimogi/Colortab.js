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


export const Сolortab = () => {
    return (
        <div className="d-flex justify-content-center custom-button-row">
            <div className="text-container">
                <p><strong>Формати макетів:</strong></p>
                <ul>
                <li>Макети приймаються у форматах: *.pdf, *.png, *.eps, *.ai, *.psd, *.tif, *.jpg, *.bmp,  </li>

                <li>Файли створені у програмах Microsoft Office (Word, Excel, PowerPoint) потрібно зберігати у формат *.pdf,.</li>
                    </ul>
                <p><strong>Вимоги до верстки:</strong></p>
                <ul>
                <li>Формат верстки повинен перевищувати готовий розмір виробу щонайменше на 4 мм (по 2 мм з кожного боку для обрізу). Для забезпечення точного обрізу необхідно додавати мітки різу.</li>

                <li>Ключові елементи (логотипи, текст тощо) повинні знаходитися на відстані не менше ніж 5 мм від краю обрізного формату, щоб уникнути можливих втрат при друці.</li>
                </ul>
                <p><strong>Растрові зображення:</strong></p>
                <ul>
                <li>Найкращий формат для якісного друку – *.pdf з роздільною здатністю не менше 300 dpi.</li>

                <li>Для всіх макетів у CMYK за замовчуванням ігноруються вбудовані кольорові профілі, використовується колірний простір ISO Coated FOGRA39L (EFI).</li>

                <li>Перетворення кольорів у CMYK виконується за схемою relative colormetric із заміною кольорів поза межами охоплення, а для RGB – за схемою perceptual.</li>

                <li>Чисті кольори (C, M, Y, K) перетворюються лише за щільністю (preserve pure colors).</li>
                </ul>
                <p><strong>Векторна графіка:</strong></p>

                <ul>
                    <li>Усі текстові об’єкти повинні бути переведені у криві.</li>
                    <li>Мінімальна товщина ліній – 0.1 мм або 0.3 пункту.</li>
                    <li>Лінії та контури не повинні перевищувати 700 вузлів.</li>
                    <li>Растрові зображення повинні бути вбудовані у документ зі 100% масштабом, без зовнішніх зв’язків.</li>
                    
                </ul>
                <ul>
                <li><strong>ВАЖЛИВО!</strong> У PDF-файли не слід вбудовувати кольорові профілі. Якщо це необхідно, слід вказати у заявці на друк, що потрібно використовувати вбудований профіль.</li>

                <li>Налаштування OVERPRINT передаються у друк відповідно до макета. Будьте уважні! Білий об'єкт з активним Overprint не відображатиметься на відбитку.</li>
            </ul>
                <p><strong>Вимоги до верстки в Adobe InDesign:</strong></p>

                <ul>
                    <li>Якщо шрифти не переведені в криві, вони повинні додаватися окремими файлами.</li>
                    <li>Тексти мають бути у роздільних (unlinked) блоках.</li>
                    <li>Вбудовані об'єкти повинні мати масштаб 100% у вікні, в яке вони вставлені.</li>
                    <li>Шрифти слід надавати у форматах TTF (TrueType), OTF (OpenType), Type1 або PS (PostScript), без використання системних шрифтів.</li>
                </ul>
                <p><strong>Вимоги до макетів з Canva:</strong></p>
            <ul></ul>
                <p><strong>Персоналізація:</strong></p>
                <ul>
                <li>Для персоналізованого друку, окрім основного макета, необхідно надати базу змінних даних у форматі *.xls (Microsoft Excel).</li>
            </ul>

                <Outlet/>
            </div>
        </div>
    );
};

export default Сolortab;