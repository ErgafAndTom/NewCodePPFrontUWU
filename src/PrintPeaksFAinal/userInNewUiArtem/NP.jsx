import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import Loader2 from "../../components/calc/Loader2";
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
    const [phone, setPhone] = useState('+38 ');
    const [novaPoshta, setNovaPoshta] = useState(null);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ phoneNumber: '', numbernp: '' });
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const handleClose = () => {
        setIsAnimating(false); // Начинаем анимацию закрытия
        setTimeout(() => {
            setIsVisible(false)
            setShowNP(false);
        }, 300); // После завершения анимации скрываем модальное окно
    }

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSaveOrder = async () => {
        setLoad(true);
        setError(null);

        const apiKey = "ecb23e28cbe38cf7c78449e15c7979e3"; // Замініть на актуальний API ключ відправника
        const requestData = {
            apiKey,
            modelName: "InternetDocument",
            calledMethod: "save",
            methodProperties: {
                PayerType: "Sender",
                PaymentMethod: "Cash",
                CargoType: "Parcel",
                VolumeGeneral: "0.1",
                Weight: "1",
                ServiceType: "WarehouseWarehouse",
                SeatsAmount: "1",
                Description: "Тестова відправка",
                Cost: "100",
                CitySender: "8d5a980d-391c-11dd-90d9-001a92567626", // ID міста відправника (замініть)
                SenderAddress: "8d5a980d-391c-11dd-90d9-001a92567626", // ID адреси відправника (замініть)
                ContactSender: "Іван Іванов",
                SendersPhone: credentials.phoneNumber,
                RecipientCityName: "Київ",
                RecipientAddressName: credentials.numbernp,
                RecipientName: "Одержувач Тест",
                RecipientType: "PrivatePerson",
                RecipientsPhone: "+380975629025",
            }
        };

        try {
            const response = await axios.post("https://api.novaposhta.ua/v2.0/json/", requestData);
            setNovaPoshta(response.data);
            setLoad(false);
        } catch (err) {
            setError(err);
            setLoad(false);
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
            }}></div>
            <div style={{
                zIndex: "100",
                display: "flex",
                flexDirection: "column",
                position: "fixed",
                backgroundColor: '#f2efe8',
                bottom: "3.5vh",
                right: "-15.75vw",
                transform: isAnimating ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0.8)", // анимация масштаба
                opacity: isAnimating ? 1 : 0, // анимация прозрачности
                transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out", // плавная анимация
                borderRadius: "1vw",
                width: "33vw",
                height: "20vh",
            }}>
                <div style={{
                    border: "none",
                    borderRadius: "1vw",
                    marginTop: "0.3vw",
                    marginLeft: "0.3vw",
                }}>
                    <div>
                        <div style={styles.inputContainer}>
                            <span style={{ fontSize: "2.4vh", alignItems: "center" }}>ヅ</span>
                            <input onChange={handleChange} type="text" value={credentials.phoneNumber} placeholder="Телефон"
                                   name="phoneNumber" style={styles.input1} />
                        </div>
                        <div style={styles.inputContainer}>
                            <span style={{ fontSize: "2.4vh", alignItems: "center" }}>ヅ</span>
                            <input onChange={handleChange} type="text" value={credentials.numbernp}
                                   placeholder="Номер відділення"
                                   name="numbernp" style={styles.input1} />
                        </div>
                    </div>
                    <div>
                        <button style={{ ...styles.addButton }} onClick={handleSaveOrder}>
                            Додати клієнта
                        </button>
                        {load && <div style={{ color: "red" }}><Loader2 /></div>}
                        {error && <div style={{ color: "red" }}>{error.message}</div>}
                        {novaPoshta && (
                            <div style={{ whiteSpace: "pre-wrap", fontSize: "0.7vw", marginTop: "0.5vh" }}>
                                {JSON.stringify(novaPoshta, null, 2)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NP;
