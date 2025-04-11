import React, { useState, useEffect } from 'react';
import rozrahuvImage from './rozrahuv.png';
// import './progressbar_styles.css';
import DiscountCalculator from './DiscountCalculator';
import axios from "./api/axiosInstance";
import ClientChangerUIArtem from "./PrintPeaksFAinal/userInNewUiArtem/ClientChangerUIArtem";
import TimerDeadline from "./PrintPeaksFAinal/Orders/TimerDeadline";


const stages = [
    { id: 1, label: 'Сектор 1', color: '#FFC107' },
    { id: 2, label: 'Сектор 2', color: '#e9e6da' },
    { id: 3, label: 'Сектор 3', color: '#e9e6da' },
    { id: 4, label: 'Сектор 4', color: '#e9e6da' },
    { id: 5, label: 'Сектор 5', color: '#e9e6da' },
    { id: 6, label: 'Сектор 6', color: '#e9e6da' }
];


const ProgressBar = ({thisOrder, setThisOrder, setNewThisOrder, handleThisOrderChange}) => {
    const [isVisible, setIsVisible] = useState(true);
    const [currentStage, setCurrentStage] = useState(parseInt(thisOrder.status));
    const [isPaid, setIsPaid] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false);
    const [paymentDate, setPaymentDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [error, setError] = useState(null);
    const [load, setLoad] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(null);
    const [remainingTime, setRemainingTime] = useState(null);
    const [amount, setAmount] = useState(0);
    const [discount, setDiscount] = useState('');
    const [total, setTotal] = useState(0);
    const [discountType, setDiscountType] = useState('%');
    const [deadline, setDeadline] = useState(null);
    const [isFocused, setIsFocused] = useState(false);
    const [showPlaceholder, setShowPlaceholder] = useState(true);
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const formats = [
        "Д|",
        "Де|",
        "Дед|",
        "Дедл|",
        "Дедла|",
        "Дедлай|",
        "Дедлайн|",
        "Дедлайн |",
        "Дедлайн н|",
        "Дедлайн на|",
        "Дедлайн на |",
        "Дедлайн на з|",
        "Дедлайн на за|",
        "Дедлайн на зам|",
        "Дедлайн на замо|",
        "Дедлайн на замов|",
        "Дедлайн на замовл|",
        "Дедлайн на замовле|",
        "Дедлайн на замовлен|",
        "Дедлайн на замовленн|",
        "Дедлайн на замовлення|",
        "                     "
    ];
    const minDateTime = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}T${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}`;
    // const getCurrentDateTimeLocal = () => {
    //     const now = new Date();
    //     const year = now.getFullYear();
    //     const month = String(now.getMonth() + 1).padStart(2, '0');
    //     const day = String(now.getDate()).padStart(2, '0');
    //     const hours = String(now.getHours()).padStart(2, '0');
    //     const minutes = String(now.getMinutes()).padStart(2, '0');
    //
    //     return `${year}-${month}-${day}T${hours}:${minutes}`;
    // };


       const AnimatedPlaceholderInput = ({ onChange }) => {
        useEffect(() => {
            if (!isFocused) {
                const interval = setInterval(() => {
                    setPlaceholderIndex((prevIndex) => (prevIndex + 1) % formats.length);
                }, 100); // Інтервал переходу між форматами

                return () => clearInterval(interval);
            }
        }, [isFocused]);

        return (
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5vh', position: 'relative' }}>
                 <input
                    type={isFocused ? "datetime-local" : formats[placeholderIndex]}
                    value={isFocused ? "datetime-local" : formats[placeholderIndex]}
                    onChange={(e) => onChange(new Date(e.target.value))}
                    onFocus={() => setIsFocused(true)}
                    onBlur={(e) => setIsFocused(e.target.value !== '')}
                    style={{
                        padding: '0.5vh',
                        justifyContent: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '0.7vw',
                        width: '52.5%',
                        backgroundColor: isFocused ? 'white' : '#E9E6DA',
                        // position: 'relative',
                        border: 'none',
                        borderRadius: '1vw',
                        zIndex: 0,
                        color: isFocused ? 'black' : '#707070',
                        paddingLeft: '1vw',
                        textAlign: 'center'
                    }}
                    min={minDateTime}
                />
            </div>
        );
    };

    useEffect(() => {
        let timer;
        if (startTime && currentStage < 3) {
            timer = setInterval(() => {
                const now = new Date();
                const diff = now - startTime;
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / (1000 * 60)) % 60);
                const seconds = Math.floor((diff / 1000) % 60);
                setElapsedTime({ days, hours, minutes, seconds });
            }, 1000);
        } else if (currentStage === 3) {
            setElapsedTime(null);
        }
        return () => clearInterval(timer);
    }, [startTime, currentStage]);

    useEffect(() => {
        let timer;
        if (deadline && currentStage < 4) {
            timer = setInterval(() => {
                const now = new Date();
                const diff = deadline - now;
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / (1000 * 60)) % 60);
                const seconds = Math.floor((diff / 1000) % 60);
                setRemainingTime({ days, hours, minutes, seconds });
            }, 1000);
        } else {
            setRemainingTime(null);
        }
        return () => clearInterval(timer);
    }, [deadline, currentStage]);

    useEffect(() => {
        if(thisOrder.payStatus === "pay") {
            setIsVisible(false);
            setIsPaid(true);
        } else {
            setIsVisible(true);
            setIsPaid(false);
            setPaymentDate(new Date());
        }
        setDeadline(thisOrder.deadline);
        setCurrentStage(parseInt(thisOrder.status));
    }, [thisOrder.payStatus, thisOrder.status, thisOrder.deadline]);

    const handleStageChange = (stage) => {
        if (stage === 'pay') {
            setIsPaid(true);
            setPaymentDate(new Date());
            setIsVisible(false); // Сховати кнопку
            return;
        }

        if (stage === 'cancel') {
            setIsCancelled(true);
            setCurrentStage(-1);
            return;
        }

        if (stage === 1) {
            setStartTime(new Date());
        }

        setCurrentStage(stage);
    };

    const handleStageChangeServer = (stage) => {
        let dataToSend = {
            newStatus: stage,
            thisOrderId: thisOrder.id,
        }
        // setLoad(true)
        axios.put(`/orders/OneOrder/statusUpdate`, dataToSend)
            .then(response => {
                console.log(response.data);
                setThisOrder({...thisOrder, status: response.data.status, payStatus: response.data.payStatus})
                // setLoad(false)
                // setThisOrder(response.data)
                // handleClose()
            })
            .catch(error => {
                if (error.response.status === 403) {
                    // navigate('/login');
                }
                // setError(error)
                // setLoad(false)
                console.log(error.message);
            })
    };

    const handleDeadlineChangeServer = (deadlineNew) => {
        let dataToSend = {
            deadlineNew: deadlineNew,
            thisOrderId: thisOrder.id,
        }
        // setLoad(true)
        axios.put(`/orders/OneOrder/deadlineUpdate`, dataToSend)
            .then(response => {
                console.log(response.data);
                setThisOrder({...thisOrder, deadline: response.data.deadline})
                // setLoad(false)
                // setThisOrder(response.data)
                // handleClose()
            })
            .catch(error => {
                if (error.response.status === 403) {
                    // navigate('/login');
                }
                // setError(error)
                // setLoad(false)
                console.log(error.message);
            })
        // console.log(deadlineNew);
        // setDeadline(deadlineNew);
    };



    const getSegmentColor = (id) => {
        if (isCancelled) return '#ee3c23';
        if (isPaid && id === 5) return '#008249';
        if (currentStage === 1 && [1, 2].includes(id)) return '#8B4513';
        if (currentStage === 2 && [1, 2, 3].includes(id)) return '#3C60A6';
        if (currentStage === 3 && [1, 2, 3, 4].includes(id)) return '#F075AA';
        if (currentStage >= 4 && [1, 2, 3, 4, 6].includes(id)) return '#008249';
        if (currentStage === 0 && id === 0) return '#FFC107';
        const segment = stages.find((segment) => segment.id === id);
        return segment ? segment.color : '#e9e6da'; // Default value if not found
    };

    const formatDate = (date) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };


        return new Intl.DateTimeFormat('uk-UA', options).format(date);
    };

    const buttonStyles = {
        base: {
            padding: '1vh',
            borderRadius: '1vw',
            border: 'none',
            cursor: 'pointer',
            width: '11vw',
            height: '3vh',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.7vw',
            display: 'flex', // Використовуємо flex для центрованого контенту
            justifyContent: 'center', // Горизонтальне центрування тексту
            alignItems: 'center', // Вертикальне центрування тексту
            marginLeft: 'auto'
        },
        takeWork: {
            backgroundColor: '#FFC107',
            color: 'black',
            border: 'none',
            cursor: 'pointer',
            width: '11vw',
            height: '3vh',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.7vw',
            display: 'flex', // Використовуємо flex для центрованого контенту
            justifyContent: 'center', // Горизонтальне центрування тексту
            alignItems: 'center', // Вертикальне центрування тексту
            marginLeft: 'auto'
        },
        postpress: {
            backgroundColor: '#8B4513',
            color: 'white',
            // border: 'none',
            cursor: 'pointer',
            width: '11vw',
            height: '3vh',
            fontFamily: 'Montserrat, sans-serif',
            // fontSize: '1.2vh',
            // display: 'flex', // Використовуємо flex для центрованого контенту
            justifyContent: 'center', // Горизонтальне центрування тексту
            // alignItems: 'center', // Вертикальне центрування тексту
            // marginLeft: 'auto'

        },
        done: {
            backgroundColor: '#3C60A6',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            width: '11vw',
            height: '3vh',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.7vw',
            display: 'flex', // Використовуємо flex для центрованого контенту
            justifyContent: 'center', // Горизонтальне центрування тексту
            alignItems: 'center', // Вертикальне центрування тексту
            marginLeft: 'auto'
        },
        handover: {
            backgroundColor: '#F075AA',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            width: '11vw',
            height: '3vh',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.7vw',
            display: 'flex', // Використовуємо flex для центрованого контенту
            justifyContent: 'center', // Горизонтальне центрування тексту
            alignItems: 'center', // Вертикальне центрування тексту
            marginLeft: 'auto'
        },
        pay: {
            backgroundColor: '#008249',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            width: '11vw',
            height: '3vh',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.7vw',
            display: 'flex', // Використовуємо flex для центрованого контенту
            justifyContent: 'center', // Горизонтальне центрування тексту
            alignItems: 'center', // Вертикальне центрування тексту
            marginLeft: 'auto'

        },
        cancel: {
            backgroundColor: 'transparent',
            color: '#ee3c23',
            position: 'absolute',
            top: '0.3vh',
            right: '-1vw',
            cursor: 'pointer',
            transform: 'scale(0.5)',
            border: 'none'
        }
    };

    return (

        <div
            style={{
                fontFamily: 'Montserrat, sans-serif',
                paddingTop: '0.6vw',
                width: '31vw',
                height: '31.8vh',
                margin: 'auto',
                textAlign: 'left',
                backgroundColor: '#f2efe8',
                borderRadius: '2vw',
                position: 'relative'

            }}

        >
            <ClientChangerUIArtem
                thisOrder={thisOrder}
                setThisOrder={setThisOrder}
                setNewThisOrder={setNewThisOrder}
                handleThisOrderChange={handleThisOrderChange}
            />
            <button onClick={() => handleStageChange('cancel')} style={buttonStyles.cancel}>
                ❌
            </button>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1vh'}}>
                <div
                    style={{
                        fontSize: '2.3vh',
                        // fontWeight: "bold",
                        color: isCancelled ? '#ee3c23' : getSegmentColor(currentStage)
                    }}
                >
                    {isCancelled
                        ? 'Скасоване замовлення'
                        : currentStage === 0
                            ? 'Оформлення замовлення'
                            : currentStage === 1
                                ? 'Замовлення друкується'
                                : currentStage === 2
                                    ? 'Замовлення у постпресі'
                                    : currentStage === 3
                                        ? 'Готове замовлення'
                                        : 'Віддали замовлення'}
                </div>
                {!isCancelled && (
                    <div style={{display: 'flex', }}>
                        {currentStage === 0 && (
                            <button
                                onClick={() => handleStageChangeServer(1)}
                                style={{...buttonStyles.base, ...buttonStyles.takeWork}}
                            >
                                Взяти в роботу
                            </button>
                        )}
                        {currentStage === 1 && (
                            <button
                                onClick={() => handleStageChangeServer(2)}
                                style={{...buttonStyles.base, ...buttonStyles.postpress}}
                            >
                                Відправити на постпрес
                            </button>
                        )}
                        {currentStage === 2 && (
                            <button
                                onClick={() => handleStageChangeServer(3)}
                                style={{...buttonStyles.base, ...buttonStyles.done}}
                            >
                                Виконане
                            </button>
                        )}
                        {currentStage === 3 && (
                            <button
                                onClick={() => handleStageChangeServer(4)}
                                style={{...buttonStyles.base, ...buttonStyles.handover}}
                            >
                                Віддати
                            </button>
                        )}
                    </div>
                )}
            </div>
            <div style={{display: 'flex', gap: '0.5vw', marginBottom: '2vh'}}>
                {stages.map((segment) => (
                    <div
                        key={segment.id}
                        style={{
                            flex: 1,
                            height: '1vh',
                            backgroundColor: getSegmentColor(segment.id),
                            borderRadius: '1vw'
                        }}
                    ></div>
                ))}
            </div>


            <div style={{marginBottom: '1vh'}}>
                <DiscountCalculator thisOrder={thisOrder} setThisOrder={setThisOrder}/>
            </div>
            {deadline === null && (
                <div style={{marginBottom: '0vh'}}>
                    <AnimatedPlaceholderInput onChange={handleDeadlineChangeServer}/>
                </div>
            )}
            {deadline && (
                <div>
                    <div className="d-flex align-items-center" style={{marginTop: '1vh', fontSize: '0.7vw', color: '#707070', marginBottom: '1vh'}}>
                        {/*Обраний дедлайн: {deadline.toString()} &*/}
                        {`Обраний дедлайн: ${new Date(deadline).toLocaleDateString()} ${new Date(deadline).toLocaleTimeString()}`}

                        {currentStage === 0 && (
                            <div style={{marginLeft: "0.5vw"}} onClick={() => handleDeadlineChangeServer(null)}>❌</div>
                        )}
                        {/*Обраний дедлайн: {deadline.toLocaleString('uk-UA', {*/}
                        {/*day: '2-digit',*/}
                        {/*month: 'long',*/}
                        {/*year: 'numeric',*/}
                        {/*hour: '2-digit',*/}
                        {/*minute: '2-digit',*/}
                        {/*})}*/}
                    </div>
                </div>

            )}
            <TimerDeadline deadline={deadline} thisOrder={thisOrder}/>

            <div style={{justifyContent: 'end', marginTop: '-15vh'}}>
                {isVisible && (
                    <button
                        onClick={() => handleStageChangeServer('pay')}
                        style={{
                            ...buttonStyles.base,
                            ...buttonStyles.pay
                        }}
                    >
                        Оплатити
                    </button>
                )}
            </div>
            {!isCancelled && isPaid && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    flexDirection: 'column',
                    marginTop: '5vh'
                }}>

                    <div style={{
                        position: 'relative',
                        width: '45%',
                        transform: 'rotate(-30deg)'
                    }}>
                        <img
                            src={rozrahuvImage}
                            alt="Розрахувались"
                            style={{width: '100%', height: 'auto'}}
                        />
                        {paymentDate && (
                            <div style={{
                                position: 'absolute',
                                top: '1.55vw',
                                right: '1vw',
                                fontSize: '0.5vw',
                                color: '#008249'
                            }}>
                                {formatDate(paymentDate)}

                            </div>
                        )}
                    </div>

                </div>
            )}
        </div>
    );
};

export default ProgressBar;
