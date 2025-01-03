import React, { useState, useEffect } from 'react';
import rozrahuvImage from './rozrahuv.png';
import './progressbar_styles.css';
import DiscountCalculator from './DiscountCalculator';


const stages = [
    { id: 1, label: 'Сектор 1', color: '#FFC107' },
    { id: 2, label: 'Сектор 2', color: '#e9e6da' },
    { id: 3, label: 'Сектор 3', color: '#e9e6da' },
    { id: 4, label: 'Сектор 4', color: '#e9e6da' },
    { id: 5, label: 'Сектор 5', color: '#e9e6da' },
    { id: 6, label: 'Сектор 6', color: '#e9e6da' }
];


const ProgressBar = ({thisOrder}) => {
    const [isVisible, setIsVisible] = useState(true);
    const [currentStage, setCurrentStage] = useState(0);
    const [isPaid, setIsPaid] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false);
    const [paymentDate, setPaymentDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
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

    const handleStageChange = (stage) => {
            if (stage === 'pay') {
            setIsVisible(false); // Сховати кнопку
            setIsPaid(true);
            setPaymentDate(new Date());
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
        return date
            ? date.toLocaleDateString('uk-UA', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
            : 'Безстроковий';
    };

    const buttonStyles = {
        base: {
            // padding: '1vh 2vw',
            borderRadius: '1vw',
            border: 'none',
            cursor: 'pointer',
            width: '11vw',
            height: '3vh',
            fontFamily: 'Gotham, sans-serif',
            fontSize: '0.7vw'
        },
        takeWork: {
            backgroundColor: '#FFC107',
            color: 'black'
        },
        postpress: {
            backgroundColor: '#8B4513',
            color: 'white'
        },
        done: {
            backgroundColor: '#3C60A6',
            color: 'white'
        },
        handover: {
            backgroundColor: '#F075AA',
            color: 'white'
        },
        pay: {
            backgroundColor: '#008249',
            color: 'white',
                        display: 'flex', // Використовуємо flex для центрованого контенту
            justifyContent: 'center', // Горизонтальне центрування тексту
            alignItems: 'center', // Вертикальне центрування тексту
            marginLeft: 'auto', //
        },
        cancel: {
            backgroundColor: 'transparent',
            color: '#ee3c23',
            position: 'absolute',
            top: '0.3vh',
            right: '0.3vw',
            cursor: 'pointer',
            transform: 'scale(0.5)',
            border: 'none'
        }
    };

    return (

        <div
            style={{
                fontFamily: 'Gotham, sans-serif',
                padding: '1vh',
                paddingLeft: '3vh',
                paddingRight: '3vh',
                width: '32.1vw',
                height: '21vh',
                margin: 'auto',
                textAlign: 'left',
                backgroundColor: '#f2efe8',
                borderRadius: '1vw',
                position: 'relative'
            }}

        >

            <button onClick={() => handleStageChange('cancel')} style={buttonStyles.cancel}>
                ❌
            </button>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2vh'}}>
                <div
                    style={{
                        fontSize: '1vw',
                        fontWeight: 'normal',
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
                    <div style={{display: 'flex', gap: '1vw'}}>
                        {currentStage === 0 && (
                            <button
                                onClick={() => handleStageChange(1)}
                                style={{...buttonStyles.base, ...buttonStyles.takeWork}}
                            >
                                Взяти в роботу
                            </button>
                        )}
                        {currentStage === 1 && (
                            <button
                                onClick={() => handleStageChange(2)}
                                style={{...buttonStyles.base, ...buttonStyles.postpress}}
                            >
                                Відправити на постпрес
                            </button>
                        )}
                        {currentStage === 2 && (
                            <button
                                onClick={() => handleStageChange(3)}
                                style={{...buttonStyles.base, ...buttonStyles.done}}
                            >
                                Виконане
                            </button>
                        )}
                        {currentStage === 3 && (
                            <button
                                onClick={() => handleStageChange(4)}
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
                <DiscountCalculator thisOrder={thisOrder}/>
            </div>
            <div style={{marginBottom: '0vh'}}>
                <AnimatedPlaceholderInput onChange={setDeadline}/>
            </div>
            {deadline && (
                <div style={{marginTop: '1vh', fontSize: '0.7vw', color: '#707070', marginBottom: '1vh'}}>
                    Обраний дедлайн: {deadline.toLocaleString('uk-UA', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                })}
                </div>
            )}

            <div style={{justifyContent: 'end', marginTop: '-14vh'}}>
                {isVisible && (
                    <button
                        onClick={() => handleStageChange('pay')}
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
                                top: '1.4vw',
                                right: '1.2vw',
                                fontSize: '0.45vw',
                                color: '#008249'
                            }}>{formatDate(paymentDate)}</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProgressBar;
