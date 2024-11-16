import React, {useEffect, useState} from "react";
const styles = {
    inputContainer: {
        display: "flex",
        alignItems: "center",
        gap: "1vw",
        margin: "0 1vw 0 1vw"
    },
    icon: {
        fontSize: "2vw",
    },
    novaPoshtaIcon: {
        fontSize: "1.5vw",
        color: "red",
    },
    input1: {
        flex: "1",
        background: "transparent",
        padding: "1.5vh 1vw",
        border: "0.1vw solid black",
        borderRadius: "0.5vw",
        fontSize: "1.1vw",
        width: "15vw"
    },
    input: {
        flex: "1",
        background: "transparent",
        padding: "1.5vh 1vw",
        border: "0.1vw solid black",
        borderRadius: "0.5vw",
        fontSize: "1.1vw",
        width: "26vw"
    },
    inputSmall: {
        flex: "1",
        background: "transparent",
        padding: "1.5vh 1vw",
        border: "0.1vw solid black",
        borderRadius: "0.5vw",
        fontSize: "1.1vw",
        marginLeft: "0.5vw",
        width: "10vw"
    },
    avatarContainer: {
        display: "flex",
        alignItems: "center",
        gap: "0.5vw",
        marginLeft: "auto",
    },
    avatar: {
        width: "6vw",
        height: "6vw",
        // borderRadius: "50%",
    },
    importButton: {
        backgroundColor: "#f1c40f",
        border: "none",
        padding: "0.5vh 1vw",
        borderRadius: "0.5vw",
        cursor: "pointer",
        fontSize: "0.5vw",
    },
    addButton: {
        marginTop: "2vh",
        padding: "1.5vh",
        backgroundColor: "#f1c40f",
        border: "none",
        borderRadius: "0.5vw",
        fontSize: "1vw",
        cursor: "pointer",
    },
};
function AddUserWindow({showAddUser, setShowAddUser, user}) {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const handleClose = () => {
        setIsAnimating(false); // Начинаем анимацию закрытия
        setTimeout(() => {
            setIsVisible(false)
            setShowAddUser(false);
        }, 300); // После завершения анимации скрываем модальное окно
    }

    useEffect(() => {
        if (showAddUser) {
            setIsVisible(true); // Сначала показываем модальное окно
            setTimeout(() => setIsAnimating(true), 100); // После короткой задержки запускаем анимацию появления
        } else {
            setIsAnimating(false); // Начинаем анимацию закрытия
            setTimeout(() => setIsVisible(false), 300); // После завершения анимации скрываем модальное окно
        }
    }, [showAddUser]);

    return (
        <div>
            <div className="" onClick={handleClose} style={{
                width: "100vw",
                zIndex: "99",
                height: "100vh",
                background: "rgba(0, 0, 0, 0.5)",
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
                background: "#dcd9ce",
                top: "69%",
                left: "82.5%",
                transform: isAnimating ? "translate(-50%, -50%) scale(1)" : "translate(-50%, 10%) scale(1)", // анимация масштаба
                opacity: isAnimating ? 1 : 0, // анимация прозрачности
                transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out", // плавная анимация
                borderRadius: "1vw",
                width: "34vw",
                height: "60vh",
                gap: "1vw",
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1vw",
                    margin: "0 1vw 0 1vw",
                    borderRadius: "1vw",
                    marginTop: "1vw",
                    border: "0.1vw solid black",
                }}>
                    <div style={styles.inputContainer}>
                        <span style={styles.icon}>👤</span>
                        <input type="text" placeholder="Нік" style={styles.input1}/>
                        <div style={styles.avatarContainer}>
                            <img
                                src="path/to/avatar.jpg" // Replace with actual image path
                                alt="avatar"
                                style={styles.avatar}
                            />
                        </div>
                    </div>

                    <div style={styles.inputContainer}>
                        <span style={styles.icon}>✈️</span>
                        <input type="text" placeholder="@telegram" style={styles.input1}/>
                        <div style={styles.avatarContainer}>
                            <button style={styles.importButton}>Імпорт з Telegram</button>
                        </div>
                    </div>

                    <div style={styles.inputContainer}>
                        <span style={styles.icon}>📧</span>
                        <input type="email" placeholder="E-mail" style={styles.input}/>
                    </div>

                    <div style={styles.inputContainer}>
                        <span style={styles.icon}>📞</span>
                        <input type="tel" placeholder="Номер телефона" style={styles.input}/>
                    </div>

                    <div style={styles.inputContainer}>
                        <span style={styles.novaPoshtaIcon}>Нова Пошта</span>
                        <input type="text" placeholder="Місто" style={styles.inputSmall}/>
                        <input type="text" placeholder="Відділення" style={styles.inputSmall}/>
                    </div>
                </div>

                <button style={styles.addButton}>Додати клієнта</button>
            </div>
        </div>
    );
}

export default AddUserWindow;
