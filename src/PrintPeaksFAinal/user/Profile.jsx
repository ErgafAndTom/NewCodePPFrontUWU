import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, logout } from '../../actions/authActions';

function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const error = useSelector((state) => state.auth.error);
    const loading = useSelector((state) => state.auth.loading);

    useEffect(() => {
        if (!user) {
            dispatch(fetchUser());
        }
    }, [dispatch, user]);

    const handleLogout = () => {
        dispatch(logout());
    };

    if (loading) {
        return <li>Загрузка...</li>;
    }

    if (error) {
        return <li>Ошибка: {error}</li>;
    }

    if (!user) {
        return <li>Пользователь не найден</li>;
    }

    return (
        <div>
            <h2>Профиль пользователя</h2>
            <li>Имя пользователя: {user.username}</li>
            <li>Роль: {user.role}</li>
            <button onClick={handleLogout}>Выйти</button>
        </div>
    );
}

export default Profile;
