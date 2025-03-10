import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import NovaPoshtaButton from "./novaPoshta/NovaPoshtaButton";

const styles = {
    inputContainer: {
        display: "flex",
        alignItems: "center",
        gap: "1vw",
        border: "none",
        margin: "0.3vw"
    },
    input1: {
        background: "#e9e6da",
        padding: "0.4vw",
        borderRadius: "0.5vw",
        fontSize: "0.7vw",
        border: "none",
        width: "12vw"
    },
    select1: {
        background: "#e9e6da",
        padding: "0.4vw",
        borderRadius: "0.5vw",
        fontSize: "0.7vw",
        border: "none",
        paddingRight: "1.3vw",
    },
    addButton: {
        marginLeft: "3.5vw",
        marginTop: "1vh",
        padding: "0.3vh",
        backgroundColor: "#f1c40f",
        borderRadius: "1vw",
        fontSize: "0.7vw",
        border: "none",
        cursor: "pointer",
        width: "12vw",
        height: "3.5vh",
        justifyContent: "center",
        alignItems: "center",
    },
};

function NP({ showNP, setShowNP, thisOrder, setThisOrder }) {
    const [load, setLoad] = useState(false);
    const [formData, setFormData] = useState({
        // Дані відправника (обов'язкові)
        SenderWarehouseIndex: '',    //Цифрова адреса відділення відправника
        senderCity: 'Київ',         // Обов'язкове: місто відправника (наприклад, "Київ" або GUID міста)
        CitySender: 'Київ',         // Обов'язкове: місто відправника (наприклад, "Київ" або GUID міста)
        // CitySender: '8d5a980d-391c-11dd-90d9-001a92567626',         // Обов'язкове: місто відправника (наприклад, "Київ" або GUID міста)
        sender: '',             // Обов'язкове: GUID відділення-відправника
        senderAddress: '',      // Опційне: адреса відправника (потрібно для адресної доставки)
        sendersPhone: '',       // Опційне: телефон відправника

        // Дані одержувача (обов'язкові)
        RecipientWarehouseIndex: '',      // Цифрова адреса відділення одержувача
        recipientCity: 'Київ',      // Обов'язкове: місто одержувача (наприклад, "Львів" або GUID міста)
        CityRecipient: 'Київ',      // Обов'язкове: місто одержувача (наприклад, "Львів" або GUID міста)
        // CityRecipient: '8d5a980d-391c-11dd-90d9-001a92567626',      // Обов'язкове: місто одержувача (наприклад, "Львів" або GUID міста)
        recipient: '',          // Обов'язкове: GUID відділення-одержувача
        recipientAddress: '',   // Опційне: адреса одержувача (для адресної доставки)
        recipientsPhone: `${thisOrder.User.phoneNumber}`,    // Обов'язкове: телефон одержувача

        // Деталі відправлення (обов'язкові)
        serviceType: 'WarehouseWarehouse', // Обов'язкове: тип сервісу (наприклад, "WarehouseWarehouse")
        paymentMethod: 'Cash',             // Обов'язкове: спосіб оплати ("Cash" або "NonCash")
        payerType: 'Recipient',               // Обов'язкове: хто оплачує доставку ("Sender", "Recipient", "ThirdPerson")
        cost: '',                          // Обов'язкове: оголошена вартість (наприклад, "1000")
        cargoType: 'Cargo',                // Обов'язкове: тип вантажу ("Cargo" або "Documents")
        weight: '',                        // Обов'язкове: вага посилки (наприклад, "5")
        seatsAmount: '1',                  // Обов'язкове: кількість місць (наприклад, "1")
        description: '',                   // Опційне: опис вантажу

        // Вибір відділення (обов'язкове, якщо використовується віджет)
        departmentId: null,                // Обов'язкове: GUID відділення, вибраний через NovaPoshtaButton

        // Додаткові поля для післяплати (опційно)
        // backwardDeliverySum: '',           // Опційне: сума післяплати (наприклад, "200")
        // backwardDeliveryPayer: 'Sender',   // Опційне: хто оплачує післяплату ("Sender" або "Recipient")
    });
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const handleClose = () => {
        setIsAnimating(false); // Начинаем анимацию закрытия
        setTimeout(() => {
            setIsVisible(false)
            setShowNP(false);
        }, 300); // После завершения анимации скрываем модальное окно
    }

    const handleDepartmentSelect = (departmentId, allData, description, cityRef, departmentRef) => {
        console.log(allData);
        setFormData({
            ...formData,
            // departmentId: departmentId,
            recipient: departmentId,
            // recipientCity: city || formData.recipientCity,
        });
    };
    const handleDepartmentSelect1 = (departmentId, allData, description, cityRef, departmentRef) => {
        setFormData({
            ...formData,
            // departmentId: departmentId,
            sender: departmentId,
            // recipientCity: city || formData.recipientCity,
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // let sityGUID;
        // try {
        //     const response = await axios.post('/novaposhta/getCities', formData.senderCity);
        //     console.log(response.data);
        //     // sityGUID = response.data.data[0].Ref;
        //     setError(null);
        // } catch (err) {
        //     setError(err.response?.data?.error || err.message);
        // }


        try {
            const response = await axios.post('/novaposhta/create', formData);
            console.log(response.data);
            setResult(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.error || err.message);
        }
    };

    useEffect(() => {
        if (showNP) {
            setIsVisible(true); // Сначала показываем модальное окно
            setTimeout(() => setIsAnimating(true), 100); // После короткой задержки запускаем анимацию появления
        } else {
            setIsAnimating(false); // Начинаем анимацию закрытия
            setTimeout(() => setIsVisible(false), 300); // После завершения анимации скрываем модальное окно
        }
    }, [showNP]);

    return (
        <div>
            <div className="" onClick={handleClose} style={{
                width: "100vw",
                zIndex: "100",
                height: "100vh",
                background: "rgba(0, 0, 0, 0.2)",
                opacity: isAnimating ? 1 : 0, // для анимации прозрачности
                transition: "opacity 0.3s ease-in-out", // плавная анимация
                position: "fixed",
                left: "0",
                bottom: "0"
            }}>
            </div>
            <div style={{
                zIndex: "100",
                display: "flex",
                flexDirection: "column",
                position: "fixed",
                backgroundColor: '#f2efe8',
                left: "50%",
                top: "50%",
                transform: isAnimating ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0.8)", // анимация масштаба
                opacity: isAnimating ? 1 : 0, // анимация прозрачности
                transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out", // плавная анимация
                borderRadius: "1vw",
                width: "95vw",
                height: "95vh",
                cursor: "auto",
            }}>
                <div className="d-flex">
                    <div className="m-auto text-center fontProductName ">
                        Нова пошта
                    </div>
                    <div
                        className="btn btn-close btn-lg"
                        style={{
                            margin: "0.5vw",
                        }}
                        onClick={handleClose}
                    >
                    </div>
                </div>
                <div style={{
                    border: "none",
                    borderRadius: "1vw",
                    marginTop: "0.3vw",
                    marginLeft: "0.3vw",
                }}>
                    {/*<div>*/}
                    {/*    <div style={styles.inputContainer}>*/}
                    {/*        <span style={{ fontSize: "2.4vh", alignItems: "center" }}>ヅ</span>*/}
                    {/*        <input onChange={handleChange1} type="text" value={credentials.phoneNumber} placeholder="Телефон"*/}
                    {/*               name="phoneNumber" style={styles.input1} />*/}
                    {/*    </div>*/}
                    {/*    <div style={styles.inputContainer}>*/}
                    {/*        <span style={{ fontSize: "2.4vh", alignItems: "center" }}>ヅ</span>*/}
                    {/*        <input onChange={handleChange1} type="text" value={credentials.numbernp}*/}
                    {/*               placeholder="Номер відділення"*/}
                    {/*               name="numbernp" style={styles.input1} />*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div style={{padding: "1vw"}}>
                        {/*<h2>Створення накладної Нової Пошти</h2>*/}
                        <form onSubmit={handleSubmit}>
                            <legend>Інформація про відправника</legend>
                            <fieldset className="d-flex flex-column">
                                <div className="d-flex">
                                    <div style={styles.inputContainer}>
                                        <span className="adminFont">Місто</span>
                                        <input
                                            style={styles.input1}
                                            type="text"
                                            name="senderCity"
                                            placeholder="Місто відправника"
                                            value={formData.senderCity}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div style={styles.inputContainer}>
                                        <span className="adminFont">Відправник</span>
                                        <input
                                            style={styles.input1}
                                            type="text"
                                            name="sender"
                                            placeholder="Відправник"
                                            value={formData.sender}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    {/*<div style={styles.inputContainer}>*/}
                                    {/*    <span className="adminFont">Адреса</span>*/}
                                    {/*    <input*/}
                                    {/*        style={styles.input1}*/}
                                    {/*        type="text"*/}
                                    {/*        name="senderAddress"*/}
                                    {/*        placeholder="Адреса відправника"*/}
                                    {/*        value={formData.senderAddress}*/}
                                    {/*        onChange={handleChange}*/}
                                    {/*        required*/}
                                    {/*    />*/}
                                    {/*</div>*/}
                                    <div style={styles.inputContainer}>
                                        <span className="adminFont">Телефон</span>
                                        <input
                                            style={styles.input1}
                                            type="text"
                                            name="sendersPhone"
                                            placeholder="Телефон відправника"
                                            value={formData.sendersPhone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <NovaPoshtaButton onDepartmentSelect={handleDepartmentSelect1}/>
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend>Інформація про одержувача</legend>
                                <div className="d-flex">
                                    <div style={styles.inputContainer}>
                                        <span className="adminFont">Місто</span>
                                        <input
                                            style={styles.input1}
                                            type="text"
                                            name="recipientCity"
                                            placeholder="Місто одержувача"
                                            value={formData.recipientCity}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div style={styles.inputContainer}>
                                        <span className="adminFont">Одержувач</span>
                                        <input
                                            style={styles.input1}
                                            type="text"
                                            name="recipient"
                                            placeholder="Одержувач"
                                            value={formData.recipient}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    {/*<div style={styles.inputContainer}>*/}
                                    {/*    <span className="adminFont">Адреса</span>*/}
                                    {/*    <input*/}
                                    {/*        style={styles.input1}*/}
                                    {/*        type="text"*/}
                                    {/*        name="recipientAddress"*/}
                                    {/*        placeholder="Адреса одержувача"*/}
                                    {/*        value={formData.recipientAddress}*/}
                                    {/*        onChange={handleChange}*/}
                                    {/*        required*/}
                                    {/*    />*/}
                                    {/*</div>*/}
                                    <div style={styles.inputContainer}>
                                        <span className="adminFont">Телефон</span>
                                        <input
                                            style={styles.input1}
                                            type="text"
                                            name="recipientsPhone"
                                            placeholder="Телефон одержувача"
                                            value={formData.recipientsPhone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <NovaPoshtaButton onDepartmentSelect={handleDepartmentSelect}/>
                                    {/*<div*/}
                                    {/*    className="d-flex"*/}
                                    {/*    style={styles.inputContainer}>*/}
                                    {/*    <span className="adminFont">departmentId</span>*/}
                                    {/*    <input*/}
                                    {/*        style={styles.input1}*/}
                                    {/*        type="text"*/}
                                    {/*        name="departmentId"*/}
                                    {/*        placeholder="departmentId"*/}
                                    {/*        value={formData.departmentId}*/}
                                    {/*        onChange={handleChange}*/}
                                    {/*        required*/}
                                    {/*    />*/}
                                    {/*</div>*/}
                                </div>
                            </fieldset>

                            <fieldset className="">
                                <legend>Деталі відправлення</legend>
                                <div style={styles.inputContainer}>
                                    <span className="adminFont">Тип сервісу:</span>
                                    <div className="ArtemNewSelectContainer">

                                        <select className="selectArtem" name="serviceType" value={formData.serviceType}
                                                onChange={handleChange} style={styles.select1}>
                                            <option className="optionInSelectArtem"
                                                    value="WarehouseWarehouse">Відділення-Відділення
                                            </option>
                                            <option className="optionInSelectArtem"
                                                    value="WarehouseDoors">Відділення-Двері
                                            </option>
                                            <option className="optionInSelectArtem"
                                                    value="DoorsWarehouse">Двері-Відділення
                                            </option>
                                            <option className="optionInSelectArtem" value="DoorsDoors">Двері-Двері
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div style={styles.inputContainer}>
                                    <span className="adminFont">Спосіб оплати:</span>
                                    <div className="ArtemNewSelectContainer">

                                        <select className="selectArtem" name="paymentMethod" style={styles.select1}
                                                value={formData.paymentMethod} onChange={handleChange}>
                                            <option className="optionInSelectArtem" value="Cash">Готівка</option>
                                            <option className="optionInSelectArtem" value="NonCash">Безготівка</option>
                                        </select>
                                    </div>
                                </div>
                                <div style={styles.inputContainer}>
                                    <span className="adminFont">Платник:</span>
                                    <div className="ArtemNewSelectContainer">
                                        <select className="selectArtem" name="payerType" value={formData.payerType}
                                                style={styles.select1}
                                                onChange={handleChange}>
                                            <option className="optionInSelectArtem" value="Sender">Відправник</option>
                                            <option className="optionInSelectArtem" value="Recipient">Одержувач</option>
                                            <option className="optionInSelectArtem" value="ThirdPerson">Третя особа
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div style={styles.inputContainer}>
                                    <span className="adminFont">Оголошена вартість:</span>
                                    <input
                                        style={styles.input1}
                                        type="number"
                                        name="cost"
                                        placeholder="Оголошена вартість"
                                        value={formData.cost}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div style={styles.inputContainer}>
                                    <span className="adminFont">Тип вантажу:</span>
                                    <div className="ArtemNewSelectContainer">
                                        <select className="selectArtem" name="cargoType" value={formData.cargoType}
                                                style={styles.select1}
                                                onChange={handleChange}>
                                            <option className="optionInSelectArtem" value="Cargo">Вантаж</option>
                                            <option className="optionInSelectArtem" value="Documents">Документи</option>
                                        </select>
                                    </div>
                                </div>
                                <div style={styles.inputContainer}>
                                    <span className="adminFont">Вага (кг):</span>
                                    <input
                                        style={styles.input1}
                                        type="number"
                                        name="weight"
                                        placeholder="Вага (кг)"
                                        value={formData.weight}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div style={styles.inputContainer}>
                                    <span className="adminFont">Кількість місць:</span>
                                    <input
                                        style={styles.input1}
                                        type="number"
                                        name="seatsAmount"
                                        placeholder="Кількість місць"
                                        value={formData.seatsAmount}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div style={styles.inputContainer}>
                                    <span className="adminFont">Опис вантажу:</span>
                                    <input
                                        style={styles.input1}
                                        type="text"
                                        name="description"
                                        placeholder="Опис вантажу"
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                </div>
                            </fieldset>

                            {/*<fieldset disabled>*/}
                            {/*    <legend>Додаткові параметри післяплати</legend>*/}
                            {/*    <div style={styles.inputContainer}>*/}
                            {/*        <label>Сума післяплати:</label>*/}
                            {/*        <input style={styles.input1} type="number" name="backwardDeliverySum" placeholder="Сума післяплати" value={formData.backwardDeliverySum} onChange={handleChange} />*/}
                            {/*    </div>*/}
                            {/*    <div>*/}
                            {/*        <label>Платник післяплати:</label>*/}
                            {/*        <div className="ArtemNewSelectContainer">*/}
                            {/*            <select className="selectArtem" name="backwardDeliveryPayer"*/}
                            {/*                    value={formData.backwardDeliveryPayer} onChange={handleChange}>*/}
                            {/*                <option value="Sender">Відправник</option>*/}
                            {/*                <option value="Recipient">Одержувач</option>*/}
                            {/*            </select>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</fieldset>*/}

                            {/*<fieldset>*/}
                            {/*    <legend>Вибір відділення/поштомату</legend>*/}
                            {/*    <NovaPoshtaButton onDepartmentSelect={handleDepartmentSelect} />*/}
                            {/*</fieldset>*/}

                            <button className="btn btn-warning" type="submit">Створити накладну</button>
                        </form>

                        {result && (
                            <div>
                                <h3>Результат:</h3>
                                <pre>{JSON.stringify(result, null, 2)}</pre>
                            </div>
                        )}
                        {error && <p style={{ color: 'red' }}>Помилка: {error}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NP;
