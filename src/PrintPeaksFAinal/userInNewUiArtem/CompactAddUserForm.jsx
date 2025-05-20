import React, { useState } from "react";
import axios from "../../api/axiosInstance";
import { BsPerson, BsEnvelope, BsTelephone, BsTelegram, BsGeoAlt } from "react-icons/bs";
import './CompactAddUserForm.css';

const CompactAddUserForm = ({ onClose, onUserAdded }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [validated, setValidated] = useState(false);
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        familyName: '',
        phoneNumber: '',
        email: '',
        telegramlogin: '',
        address: '',
        notes: '',
        discount: 0
    });

    const handlePhoneChange = (e) => {
        let value = e.target.value.replace(/[^+\d]/g, '');
        if (!value.startsWith('+')) {
            value = '+38' + value;
        }
        const formattedValue = value
            .replace(/^(\+\d{2})/, '$1 ')
            .replace(/(\d{3})(\d)/, '$1 $2')
            .replace(/(\d{3}) (\d{3})(\d)/, '$1 $2-$3')
            .replace(/-(\d{2})(\d{1,2})/, '-$1-$2');
        setUser({ ...user, phoneNumber: formattedValue.trim() });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidated(true);
        if (!user.firstName || !user.familyName || !user.phoneNumber) return;

        setLoading(true);
        try {
            const response = await axios.post('/user/create', user);
            setLoading(false);
            if (onUserAdded) onUserAdded(response.data);
            onClose();
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || 'Помилка при додаванні клієнта');
            console.error('Помилка:', err);
        }
    };

    return (
        <div className="user-form-container">

            {error && <div className="user-form-error">{error}</div>}
            <form onSubmit={handleSubmit} noValidate>
                {[
                    { label: "Ім'я", name: 'firstName', icon: <BsPerson /> },
                    { label: "По батькові", name: 'lastName', icon: <BsPerson /> },
                    { label: "Прізвище", name: 'familyName', icon: <BsPerson /> },
                    { label: "Телефон", name: 'phoneNumber', icon: <BsTelephone />, onChange: handlePhoneChange },
                    { label: "Email", name: 'email', icon: <BsEnvelope /> },
                    { label: "Telegram", name: 'telegramlogin', icon: <BsTelegram /> },
                    { label: "Адреса", name: 'address', icon: <BsGeoAlt /> },
                ].map(({ label, name, icon, onChange }) => (
                    <div key={name} className="form-group-floating">
                        <div className="input-wrapper">
                            <span className="input-icon">{icon}</span>
                            <input
                                required={label.includes('*')}
                                type="text"
                                name={name}
                                value={user[name]}
                                onChange={onChange || handleChange}
                                className="form-input"
                            />
                            {!user[name] && (
                                <label htmlFor={name} className="form-floating-label">{label}</label>
                            )}
                        </div>
                    </div>
                ))}

                <div className="form-group">
                    <textarea
                        name="notes"
                        value={user.notes}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Примітки"
                        className="form-textarea"
                    />
                </div>

                <div className="form-group">
                    <input
                        type="number"
                        name="discount"
                        value={user.discount}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        placeholder="Знижка (%)"
                        className="form-input"
                    />
                </div>

                <div className="form-actions">
                    <button type="button" onClick={onClose} className="btn-cancel">Скасувати</button>
                    <button type="submit" disabled={loading} className="btn-confirm">
                        {loading ? 'Зберігаємо...' : 'Додати клієнта'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CompactAddUserForm;
