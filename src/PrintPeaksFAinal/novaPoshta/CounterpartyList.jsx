// CounterpartyList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CounterpartyList = () => {
    const [counterparties, setCounterparties] = useState([]);
    const [formData, setFormData] = useState({
        FirstName: '',
        MiddleName: '',
        LastName: '',
        Phone: '',
        Email: '',
        CounterpartyType: 'PrivatePerson',       // или другой тип по умолчанию
        CounterpartyProperty: 'Recipient'          // либо 'Sender', в зависимости от назначения
    });

    useEffect(() => {
        fetchCounterparties();
    }, []);

    const fetchCounterparties = async () => {
        try {
            const response = await axios.get('/counterparties');
            console.log(response);
            setCounterparties(response.data.data.data);
        } catch (err) {
            console.error('Ошибка получения списка:', err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/counterparties', formData);
            console.log('Контрагент добавлен:', response.data);
            fetchCounterparties();
        } catch (err) {
            console.error('Ошибка добавления контрагента:', err);
        }
    };

    // Пример функции для обновления контрагента
    const updateCounterparty = async (ref, updateData) => {
        try {
            const response = await axios.put(`/counterparties/${ref}`, updateData);
            console.log('Контрагент обновлён:', response.data);
            fetchCounterparties();
        } catch (err) {
            console.error('Ошибка обновления контрагента:', err);
        }
    };

    return (
        <div>
            <h2>Список контрагентов</h2>
            <ul>
                {counterparties.map((c, index) => (
                    <div key={c.id} className="d-flex">
                        <div style={{padding: "0.5vw", margin: "0.5vw", background: "white"}}>FirstName
                            {c.FirstName}
                        </div>
                        <div style={{padding: "0.5vw", margin: "0.5vw", background: "white"}}>MiddleName
                            {c.MiddleName}
                        </div>
                        <div style={{padding: "0.5vw", margin: "0.5vw", background: "white"}}>LastName
                            {c.LastName}
                        </div>
                        <div style={{padding: "0.5vw", margin: "0.5vw", background: "white"}}>Description
                            {c.Description}
                        </div>
                        <div style={{padding: "0.5vw", margin: "0.5vw", background: "white"}}>EDRPOU
                            {c.EDRPOU}
                        </div>
                        <div style={{padding: "0.5vw", margin: "0.5vw", background: "white"}}>Ref
                            {c.Ref}
                        </div>
                        <div style={{padding: "0.5vw", margin: "0.5vw", background: "white"}}>City
                            {c.City}
                        </div>
                        <div style={{padding: "0.5vw", margin: "0.5vw", background: "white"}}>Counterparty
                            {c.Counterparty}
                        </div>
                        {/* Для редактирования можно добавить кнопку, открывающую форму с предзаполненными данными */}
                    </div>
                ))}
            </ul>

            <h3>Добавить нового контрагента</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" name="FirstName" placeholder="Имя" onChange={handleChange} required />
                <input type="text" name="MiddleName" placeholder="Отчество" onChange={handleChange} />
                <input type="text" name="LastName" placeholder="Фамилия" onChange={handleChange} required />
                <input type="text" name="Phone" placeholder="Телефон" onChange={handleChange} required />
                <input type="email" name="Email" placeholder="Email" onChange={handleChange} />
                <button type="submit">Добавить</button>
            </form>
        </div>
    );
};

export default CounterpartyList;
