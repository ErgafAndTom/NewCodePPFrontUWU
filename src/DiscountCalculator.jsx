import React, { useState } from 'react';

function PaymentCalculator({thisOrder}) {
    const [amount, setAmount] = useState(thisOrder.price);
    const [discount, setDiscount] = useState(thisOrder.prepayment);
    const [total, setTotal] = useState(thisOrder.allPrice);
    const [error, setError] = useState('');

    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };

    const handleAmountChange = (value) => {
        const formattedValue = value.replace(/[^0-9]/g, '');
        const formattedWithCurrency = formattedValue ? formatNumber(formattedValue) + ' грн' : '';
        setAmount(formattedWithCurrency);
        calculateTotal(formattedValue, discount);
    };

    const handleDiscountChange = (value) => {
        setDiscount(value);
        calculateTotal(amount.replace(/[^0-9]/g, ''), value);
    };

    const calculateTotal = (amountValue, discountValue) => {
        setError(''); // Clear previous errors
        const numericAmount = parseFloat(amountValue) || 0;

        if (discountValue.includes('%')) {
            const percent = parseFloat(discountValue.replace('%', ''));
            if (percent > 50) {
                setError('Знижка не може перевищувати 50%');
                setTotal('');
                return;
            }
            if (percent >= 1 && percent <= 50) {
                const discountedValue = numericAmount - (numericAmount * percent / 100);
                setTotal(formatNumber(discountedValue.toFixed(2)) + ' грн');
            } else {
                setTotal(formatNumber(numericAmount.toFixed(2)) + ' грн');
            }
        } else if (discountValue) {
            const discountNumeric = parseFloat(discountValue) || 0;
            const discountedValue = numericAmount - discountNumeric;
            setTotal(formatNumber(discountedValue.toFixed(2)) + ' грн');
        } else {
            setTotal(formatNumber(numericAmount.toFixed(2)) + ' грн');
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '1vh' }}>
                <label style={{ fontSize: '0.7vw', color: '#707070' }}>Загальна вартість:</label>
                <input
                    disabled
                    type="text"
                    value={amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    style={{
                        marginLeft: '0.5vw',
                        padding: '0.5vh',
                        fontSize: '0.7vw',
                        width: '28%',
                        backgroundColor: '#E9E6DA',
                        position: 'relative',
                        border: 'none',
                        borderRadius: '1vw',
                        zIndex: 0,
                        color: '#707070',
                        paddingLeft: '1vw',
                    }}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginTop: '1vh' }}>
                <label style={{ fontSize: '0.7vw', color: '#707070' }}>Знижка:</label>
                <div style={{ display: 'flex', alignItems: 'center', width: '70%' }}>
                    <input
                        type="text"
                        value={discount}
                        onChange={(e) => handleDiscountChange(e.target.value)}
                        style={{
                            padding: '0.5vh',
                            fontSize: '0.7vw',
                            width: '40%',
                            marginLeft: '4.25vw',
                            backgroundColor: '#E9E6DA',
                            position: 'relative',
                            border: 'none',
                            borderRadius: '1vw',
                            zIndex: 0,
                            color: '#707070',
                            paddingLeft: '1vw',
                        }}
                    />
                </div>
            </div>

            {error && (
                <div style={{ color: 'red', fontSize: '0.7vw', marginTop: '1vh' }}>{error}</div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', marginTop: '1vh' }}>
                <label style={{ fontSize: '0.7vw', color: '#707070' }}>К оплаті буде:</label>
                <input
                    type="text"
                    value={total}
                    readOnly
                    style={{
                        padding: '0.5vh',
                        fontSize: '0.7vw',
                        width: '28%',
                        backgroundColor: '#E9E6DA',
                        position: 'relative',
                        border: 'none',
                        borderRadius: '1vw',
                        zIndex: 0,
                        color: 'black',
                        marginLeft: '2.15vw',
                        paddingLeft: '1vw',
                    }}
                />
            </div>
        </div>
    );
}

export default PaymentCalculator;
