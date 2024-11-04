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
        return <p>Загрузка...</p>;
    }

    if (error) {
        return <p>Ошибка: {error}</p>;
    }

    if (!user) {
        return <p>Пользователь не найден</p>;
    }

    return (
        <div>
            <h2>Профиль пользователя</h2>
            <p>Имя пользователя: {user.username}</p>
            <p>Роль: {user.role}</p>
            <button onClick={handleLogout}>Выйти</button>
        </div>
    );
}

export default Profile;
