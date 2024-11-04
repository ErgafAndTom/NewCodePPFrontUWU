import React, {useState} from 'react';

function OneOrderInTable({item}) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSubOrders = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <tr>
                <td className="center-text">665432</td>
                <td className="center-text">
                    <button className="toggle-btn" onClick={toggleSubOrders}>{isOpen ? 'Згорнути' : 'Розгорнути'}</button>
                </td>
                <td className="center-text">891-12b</td>
                <td className="center-text">Склад</td>
                <td className="center-text">Клієнт А</td>
                <td className="center-text">Друк плакатів</td>
                <td className="center-text">A3</td>
                <td className="center-text">100 шт</td>
                <td className="center-text">1200 грн</td>
                <td className="center-text">Оплачено</td>
                <td className="center-text">01.10.2024</td>
                <td className="center-text">05.10.2024</td>
                <td className="center-text">Іванов І.</td>
                <td className="center-text">
                    <button className="invoice-btn">Зробити рахунок</button>
                </td>
                <td className="center-text">
                    <button className="delete-btn">Видалити</button>
                </td>
            </tr>
            <tr>
                <td colSpan="14">
                    <div style={{ display: isOpen ? 'flex' : 'none' }} className="order-details">
                        <div className="sub-order">
                            <p><strong>№ субзамовлення:</strong> 122332</p>
                            <p><strong>Поточний статус:</strong> Склад (Іванов І.І.)</p>
                            <p><strong>Тип продукції:</strong> Плакати</p>
                            <p><strong>Найменування:</strong> Друк кольорових плакатів</p>
                            <p><strong>Кількість:</strong> 50 шт</p>
                            <p><strong>Ціна за одиницю:</strong> 12 грн</p>
                            <p><strong>Вартість:</strong> 600 грн</p>
                            <p>Використано аркушів: формат SRA3, 20 шт</p>
                            <p>Кількість виробів на аркуші:</p>
                        </div>

                        <div className="sub-order">
                            <p><strong>№ субзамовлення:</strong> 122333</p>
                            <p><strong>Поточний статус:</strong> Склад (Іванов І.І.)</p>
                            <p><strong>Тип продукції:</strong> Плакати</p>
                            <p><strong>Найменування:</strong> Друк кольорових плакатів на крейдованому папері паперфі
                                пап
                            </p>
                            <p><strong>Кількість:</strong> 50 шт</p>
                            <p><strong>Ціна за одиницю:</strong> 12 грн</p>
                            <p><strong>Вартість:</strong> 600 грн</p>
                            <p>Використано аркушів: формат SRA3, 20 шт </p>
                            <p>Кількість виробів на аркуші:600 грн</p>
                        </div>
                        <div className="sub-order">
                            <p><strong>№ субзамовлення:</strong> 122334</p>
                            <p><strong>Поточний статус:</strong> Склад (Іванов І.І.)</p>
                            <p><strong>Тип продукції:</strong> Плакати</p>
                            <p><strong>Найменування:</strong> Друк чорно-білих плакатів</p>
                            <p><strong>Кількість:</strong> 100 шт</p>
                            <p><strong>Ціна за одиницю:</strong> 10 грн</p>
                            <p><strong>Вартість:</strong> 1000 грн</p>
                            <p>Використано аркушів: формат SRA3, 20 шт </p>
                            <p>Кількість виробів на аркуші: 600 грн</p>
                        </div>
                        <div className="sub-order">
                            <p><strong>№ субзамовлення:</strong> 122335</p>
                            <p><strong>Поточний статус:</strong> Виробництво (Петров П.П.)</p>
                            <p><strong>Тип продукції:</strong> Листівки</p>
                            <p><strong>Найменування:</strong> Друк рекламних листівок</p>
                            <p><strong>Кількість:</strong> 200 шт</p>
                            <p><strong>Ціна за одиницю:</strong> 5 грн</p>
                            <p><strong>Вартість:</strong> 1000 грн</p>
                            <p>Використано аркушів: формат SRA3, 20 шт </p>
                            <p>Кількість виробів на аркуші:600 грн</p>
                        </div>
                    </div>
                </td>
            </tr>
        </>
    );
}

export default OneOrderInTable;