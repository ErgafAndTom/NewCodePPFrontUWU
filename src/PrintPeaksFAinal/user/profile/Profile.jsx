import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, logout, updateUser } from '../../../actions/authActions';
import "./styles.css"
import axios from 'axios';
import {Link} from "react-router-dom";

function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const error = useSelector((state) => state.auth.error);
    const loading = useSelector((state) => state.auth.loading);

    const [editMode, setEditMode] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    useEffect(() => {
        if (!user) {
            dispatch(fetchUser());
        } else {
            setUsername(user.username || '');
        }
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

    if (loading) return <li>Загрузка...</li>;
    if (error) return <li>Ошибка: {error}</li>;
    if (!user) return <li>Пользователь не найден</li>;

    return (
        <div className="profileContainer">
            <h2>Профиль пользователя {user.username}</h2>
            <img
                src={user.photoLink || '/default-avatar.png'}
                alt="Аватар"
                className="profileAvatar"
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
                    <div>
                        <label>Способ оплаты: </label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="">Выберите</option>
                            <option value="card">Банковская карта</option>
                            <option value="paywpal">PayPal</option>
                        </select>
                    </div>
                    <button onClick={handleSave}>Сохранить</button>
                    <button onClick={() => setEditMode(false)}>Отмена</button>
                </>
            ) : (
                <>
                    <li>Имя пользователя: {user.username}</li>
                    <li>Роль: {user.role}</li>
                    <li>Способ оплаты: {user.paymentMethod || 'Не указан'}</li>
                    {/*<button onClick={() => setEditMode(true)}>Редактировать профиль</button>*/}
                </>
            )}

            <div className="profileActions">
                <Link style={{textDecoration: 'none', margin: 'auto', padding: '0', background: 'transparent'}} to="/myFiles">
                    <button>Мои файлы</button>
                </Link>
                <Link style={{textDecoration: 'none', margin: 'auto', padding: '0', background: 'transparent'}} to="/myOrders">
                    <button>Мои заказы</button>
                </Link>
                <Link style={{textDecoration: 'none', margin: 'auto', padding: '0', background: 'transparent'}} to="/myPayments">
                    <button>Мои пособы оплаты</button>
                </Link>
                <button onClick={handleLogout}>Выйти</button>
            </div>
        </div>
    );
}

export default Profile;
