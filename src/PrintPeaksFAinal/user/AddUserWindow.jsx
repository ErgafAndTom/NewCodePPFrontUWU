import React, {useEffect, useState} from "react";
import axios from "../../api/axiosInstance";
import {useNavigate} from "react-router-dom";
import Loader2 from "../../components/calc/Loader2";
const styles = {
    inputContainer: {
        display: "flex",
        alignItems: "center",
        gap: "1vw",
        border: "none",
        margin: "0.3vw"
    },
    inputContainer1: {
        display: "flex",
        alignItems: "center",
        gap: "1vw",
        border: "none",
        margin: "0.3vw",
        justifyContent: "flex-end"
    },
    // novaPoshtaIcon: {
    //     fontSize: "1vw",
    //     color: "red",
    // },
    input1: {
        background: "#e9e6da",
        padding: "0.4vw",
        borderRadius: "0.5vw",
        fontSize: "0.7vw",
        border: "none",
        width: "12vw"
    },
    input: {
        background: "#e9e6da",
        padding: "0.3vw",
        borderRadius: "0.5vw",
        fontSize: "0.7vw",
        border: "none",
        width: "12vw"
    },
    inputSmall: {
        background: "#e9e6da",
        padding: "0.3vw",
        borderRadius: "0.5vw",
        fontSize: "0.7vw",
        border: "none",
        // width: "10vw"
    },

    importButton: {
        backgroundColor: "#f1c40f",
        padding: "0.5vh 1vw",
        borderRadius: "0.5vw",
        cursor: "pointer",
        border: "none",
        fontSize: "0.5vw",
    },
    addButton: {
        marginLeft: "19.5vw",
        marginTop: "1vh",
        // display: "flex",
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



function AddUserWindow({showAddUser, setShowAddUser, thisOrder, setThisOrder}) {

    const [phone, setPhone] = useState('+38 ');
    const handleInputChange = (e) => {
        let value = e.target.value.replace(/[^+\d]/g, ''); // Видаляємо все, крім цифр і знаку +

        if (!value.startsWith('+')) {
            value = '+38' + value; // Додаємо + на початку, якщо його немає
        }

        // Форматуємо текст у формат +XX XXX XXX-XX-XX
        const formattedValue = value
            .replace(/^(\+\d{2})/, '$1 ') // Додаємо пробіл після коду країни
            .replace(/(\d{3})(\d)/, '$1 $2') // Пробіл після перших трьох цифр
            .replace(/(\d{3}) (\d{3})(\d)/, '$1 $2-$3') // Дефіс після наступних двох
            .replace(/-(\d{2})(\d{1,2})/, '-$1-$2'); // Дефіс після останніх двох цифр

        setPhone(formattedValue.trim());
    };

    const handleFocus = () => {
        if (phone.trim() === '') {
            setPhone('+38 ');
        }
    };

    const handleBlur = () => {
        if (phone.trim() === '+38') {
            setPhone('');
        }
    };
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [error, setError] = useState(null);
    const [load, setLoad] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [credentials, setCredentials] = useState({ email: '', phoneNumber: '', telegram: '', firstName: '', lastName: '', familyName: '', sity: '', numbernp: '' });
    const handleClose = () => {
        setIsAnimating(false); // Начинаем анимацию закрытия
        setTimeout(() => {
            setIsVisible(false)
            setShowAddUser(false);
        }, 400); // После завершения анимации скрываем модальное окно
    }

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSaveOrder = (event, valueName) => {
        let dataToSend = {
            ...credentials,
            thisOrderId: thisOrder.id,
        }
        setLoad(true)
        axios.post(`/user/registerInOrder`, dataToSend)
            .then(response => {
                console.log(response.data);
                setLoad(false)
                setThisOrder(response.data)
                handleClose()
            })
            .catch(error => {
                if (error.response.status === 403) {
                    navigate('/login');
                }
                setError(error)
                setLoad(false)
                console.log(error.message);
            })
    };

    useEffect(() => {
        if (showAddUser) {
            setIsVisible(true); // Сначала показываем модальное окно
            setTimeout(() => setIsAnimating(true), 100); // После короткой задержки запускаем анимацию появления
        } else {
            setIsAnimating(false); // Начинаем анимацию закрытия
            setTimeout(() => setIsVisible(false), 400); // После завершения анимации скрываем модальное окно
        }
    }, [showAddUser]);

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
                transform: isAnimating ? "translate(-50%, -50%) scale(1)" : "translate(-50%, 10%) scale(1)", // анимация масштаба
                opacity: isAnimating ? 1 : 0, // анимация прозрачности
                transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out", // плавная анимация
                borderRadius: "1vw",
                width: "33vw",
                height: "20vh",
                // gap: "1vw",
            }}>
                <div style={{
                    // display: "flex",
                    // padding: "0.3vw",
                    // flexDirection: "column",
                    // alignItems: "center",
                    border: "none",
                    borderRadius: "1vw",
                    marginTop: "0.3vw",
                    marginLeft: "0.3vw",

                }}>
                    <div>
                        <div style={styles.inputContainer}>
                            <span style={{...(styles?.icon || {}), fontSize: "2.4vh", alignItems: "center"}}>ヅ</span>
                            <input onChange={handleChange} type="text" value={credentials.firstName} placeholder="Ім'я"
                                   name="firstName" style={styles.input1}/>

                        </div>
                        <div style={styles.inputContainer}>
                            <span style={{...(styles?.icon || {}), fontSize: "2.4vh", alignItems: "center"}}>ヅ</span>
                            <input onChange={handleChange} type="text" value={credentials.lastName}
                                   placeholder="По батькові"
                                   name="lastName" style={styles.input1}/>

                        </div>
                        <div style={styles.inputContainer}>
                            <span style={{...(styles?.icon || {}), fontSize: "2.4vh", alignItems: "center"}}>ヅ</span>
                            <input onChange={handleChange} type="text" value={credentials.familyName}
                                   placeholder="Прізвище"
                                   name="familyName" style={styles.input1}/>

                        </div>
                    </div>
                    <div style={{
                        justifyContent: "flex-right",
                        display: "flex",
                        alignItems: "center",
                        marginTop: "-14vh",
                        marginLeft: "16vw",
                        flexDirection: "column",
                    }}>
                        <div style={styles.inputContainer1}>
                            <span>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" alt="Telegram Icon" style={{ width: '1vw' }} />
                        </span>
                            <input onChange={handleChange} type="text" value={credentials.telegram}
                                   placeholder="Telegram"
                                   name="telegram" style={styles.input1}/>
                        </div>
                        <div style={styles.inputContainer1}>
                            <span style={{...(styles?.icon || {}), fontSize:"2.3vh", alignItems:"center"}}>✉</span>
                            <input
                            onChange={handleChange} type="email" value={credentials.email} placeholder="E-mail"
                            name="email" style={styles.input1}/>
                        </div>

                        <div style={styles.inputContainer1}>
                            <span style={{...(styles?.icon || {}), fontSize: "2.1vh", alignItems: "center", display: "flex",  }}>📱</span>
                            <input
                                type="tel"
                                id="phone-input"
                                value={credentials.phoneNumber}
                                placeholder="№ телефону"
                                name="phoneNumber"
                                style={styles.input1}
                                onChange={handleInputChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                maxLength="17"
                            />
                        </div>
                    </div>
                    <div style={{}}>
                    <button style={{...styles.addButton}} onClick={handleSaveOrder}>
                            Додати клієнта
                        </button>
                        {load &&
                            <div style={{color: "red"}}><Loader2/></div>
                        }
                        {error &&
                            <div style={{color: "red"}}>{error.message}</div>
                        }
                    </div>
                </div>


            </div>
        </div>

    );
}

export default AddUserWindow;
