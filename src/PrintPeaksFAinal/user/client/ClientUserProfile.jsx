import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, logout, updateUser } from '../../../actions/authActions';
import {Link, useParams} from "react-router-dom";
import Counterparty from '../../../components/usersettings/Counterparty';
import { buttonStyles, containerStyles, formStyles, avatarStyles, tabStyles } from '../profile/styles';
import axios from "../../../api/axiosInstance";

function ClientUserProfile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const error = useSelector((state) => state.auth.error);
    const loading = useSelector((state) => state.auth.loading);
    const {id} = useParams();

    const [activeTab, setActiveTab] = useState('profile');
    const [editMode, setEditMode] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isLoad, setIsLoad] = useState(false);
    const [isError, setIsError] = useState(null);

    const [thisUser, setThisUser] = useState(null);

    useEffect(() => {
        setIsLoad(true)
        axios.get(`/user/getOneUser/${id}`)
            .then(response => {
                console.log(response.data);
                setThisUser(response.data)
                setIsLoad(false)
                setIsError(null)
            })
            .catch((error, response) => {
                console.log(error.message);

                setIsLoad(false)
                setIsError(error.message)
            })
    }, [dispatch, user]);

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleSave = async () => {
        try {
            // await dispatch(updateUser({ username, password, paymentMethod }));
            setEditMode(false);
        } catch (err) {
            console.error('Ошибка при обновлении:', err);
        }
    };

    if (isLoad) return <li>Загрузка...</li>;
    if (isError) return <li>Ошибка: {isError}</li>;
    if (!thisUser) return <li>Пользователь не найден</li>;

    return (
        <div style={containerStyles.profileContainer}>
            <h2 style={containerStyles.header}>Профіль користувача {user.username}</h2>

            <div style={containerStyles.tabsContainer}>
                <button
                    style={{
                        ...tabStyles.tabButton,
                        ...(activeTab === 'profile' ? tabStyles.activeTab : {})
                    }}
                    onClick={() => setActiveTab('profile')}
                >
                    Основна інформація
                </button>
                <button
                    style={{
                        ...tabStyles.tabButton,
                        ...(activeTab === 'counterparties' ? tabStyles.activeTab : {})
                    }}
                    onClick={() => setActiveTab('counterparties')}
                >
                    Контрагенти {thisUser.username} ({thisUser.firstName} {thisUser.lastName} {thisUser.familyName})
                </button>
            </div>

            {activeTab === 'profile' && (
                <div style={containerStyles.contentContainer}>
                    <img
                        src={thisUser.photoLink || '/default-avatar.png'}
                        alt="Аватар"
                        style={avatarStyles.profileAvatar}
                    />

                    {editMode ? (
                        <>
                            {/*<div>*/}
                            {/*    <label>Имя пользователя: </label>*/}
                            {/*    <input value={username} onChange={(e) => setUsername(e.target.value)} />*/}
                            {/*</div>*/}
                            {/*<div>*/}
                            {/*    <label>Новый пароль: </label>*/}
                            {/*    <input*/}
                            {/*        type="password"*/}
                            {/*        value={password}*/}
                            {/*        onChange={(e) => setPassword(e.target.value)}*/}
                            {/*    />*/}
                            {/*</div>*/}
                            <div style={formStyles.group}>
                                <label style={formStyles.label}>Спосіб оплати: </label>
                                <select
                                    style={formStyles.profileSelect}
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                >
                                    <option value="">Виберіть</option>
                                    <option value="card">Банківська карта</option>
                                    <option value="paywpal">PayPal</option>
                                </select>
                            </div>
                            <button
                                onClick={handleSave}
                                style={{...buttonStyles.base, ...buttonStyles.success, margin: '5px'}}
                            >
                                Зберегти
                            </button>
                            <button
                                onClick={() => setEditMode(false)}
                                style={{...buttonStyles.base, ...buttonStyles.secondary, margin: '5px'}}
                            >
                                Скасувати
                            </button>
                        </>
                    ) : (
                        <>
                            <li>Ім'я користувача: {thisUser.username}</li>
                            <li>Роль: {thisUser.role}</li>
                            <li>Спосіб оплати: {thisUser.paymentMethod || 'Не вказано'}</li>
                            {/*<button onClick={() => setEditMode(true)}>Редактировать профиль</button>*/}
                        </>
                    )}

                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
                        <Link style={{textDecoration: 'none'}} to="/client/1/files">
                            <button style={{...buttonStyles.filesButton}}>
                                <i className="bi bi-folder me-2"></i>
                                Файли
                            </button>
                        </Link>
                        <Link style={{textDecoration: 'none'}} to="/client/1/orders">
                            <button style={{...buttonStyles.ordersButton}}>
                                <i className="bi bi-cart me-2"></i>
                                Замовлення
                            </button>
                        </Link>
                        <Link style={{textDecoration: 'none'}} to="/client/1/payments">
                            <button style={{...buttonStyles.paymentsButton}}>
                                <i className="bi bi-credit-card me-2"></i>
                                Способи оплати
                            </button>
                        </Link>
                    </div>
                </div>
            )}

            {activeTab === 'counterparties' && (
                <div style={containerStyles.contentContainer}>
                    <Counterparty />
                </div>
            )}
        </div>
    );
}

export default ClientUserProfile;
