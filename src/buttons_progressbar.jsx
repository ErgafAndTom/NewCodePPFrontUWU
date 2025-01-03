import React, { useState, useEffect } from 'react';

const ButtonsProgressBarNew = ({ handleStageChange, currentStage, isPaid, isCancelled, paymentDate, getSegmentColor, formatDate, elapsedTime, remainingTime }) => {
    const buttonStyles = {
        base: {
            padding: '1vh 2vw',
            borderRadius: '1vw',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'Gotham, sans-serif',
            fontSize: '1.3vh',
            width: '11vw',
            height: '3vh'
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
            color: 'white'
        }
    };

    return (
        <div style={{ width: '100%', fontFamily: 'Gotham, sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2vh' }}>
                <div
                    style={{
                        fontSize: '1.3vh',
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
                <div style={{ display: 'flex', gap: '1vw' }}>
                    {currentStage === 0 && (
                        <button
                            onClick={() => handleStageChange(1)}
                            style={{ ...buttonStyles.base, ...buttonStyles.takeWork }}
                        >
                            Взяти в роботу
                        </button>
                    )}
                    {currentStage === 1 && (
                        <button
                            onClick={() => handleStageChange(2)}
                            style={{ ...buttonStyles.base, ...buttonStyles.postpress }}
                        >
                            Відправити на постпрес
                        </button>
                    )}
                    {currentStage === 2 && (
                        <button
                            onClick={() => handleStageChange(3)}
                            style={{ ...buttonStyles.base, ...buttonStyles.done }}
                        >
                            Виконане
                        </button>
                    )}
                    {currentStage === 3 && (
                        <button
                            onClick={() => handleStageChange(4)}
                            style={{ ...buttonStyles.base, ...buttonStyles.handover }}
                        >
                            Віддати
                        </button>
                    )}
                    {currentStage === 4 && !isPaid && (
                        <button
                            onClick={() => handleStageChange('pay')}
                            style={{ ...buttonStyles.base, ...buttonStyles.pay }}
                        >
                            Оплатити
                        </button>
                    )}
                </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5vw', marginBottom: '2vh' }}>
                {[1, 2, 3, 4, 5, 6].map((id) => (
                    <div
                        key={id}
                        style={{
                            flex: 1,
                            height: '1vh',
                            backgroundColor: getSegmentColor(id),
                            borderRadius: '1vw'
                        }}
                    ></div>
                ))}
            </div>
            {elapsedTime && (
                <div style={{ fontSize: '1.2vh', color: '#000', marginBottom: '1vh' }}>
                    Час виконання замовлення: {elapsedTime.days} днів {elapsedTime.hours} годин {elapsedTime.minutes} хвилин
                </div>
            )}
            {remainingTime && (
                <div style={{ fontSize: '1.2vh', color: '#F00', marginBottom: '1vh' }}>
                    Залишилось до дедлайну: {remainingTime.days} днів {remainingTime.hours} годин {remainingTime.minutes} хвилин
                </div>
            )}
            {isPaid && paymentDate && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <div style={{ position: 'relative', width: '140%', maxWidth: '400px', transform: 'rotate(-4deg)' }}>
                        <img
                            src="./rozrahuv.png"
                            alt="Розрахувались"
                            style={{ width: '100%', height: 'auto' }}
                        />
                        <div style={{ position: 'absolute', bottom: '10px', right: '10px', fontSize: '1.3vh', color: '#008249' }}>
                            {formatDate(paymentDate)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ButtonsProgressBarNew;
