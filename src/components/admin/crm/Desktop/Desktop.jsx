import React, {useEffect} from 'react';
import axios from "../../../../api/axiosInstance";
import {useNavigate} from "react-router-dom";

const Card = ({ title, content }) => {
    return (
        <div className="bg-white p-4 m-2 flex-grow-1" style={{ borderRadius: '10px',  }}>
            <div className="font-bold text-lg mb-2 adminFont">{title}</div>
            <p className="adminFont">{content}</p>
        </div>
    );
};

const Desktop = () => {
    const navigate = useNavigate();
    useEffect(() => {
        let data = {

        }
        axios.post(`/materials/NotAll`, data)
            .then(response => {
                // console.log(response.data);

            })
            .catch(error => {
                if (error.response.status === 403) {
                    navigate('/login');
                }
                console.log(error.message);
            })
    }, []);

    return (
        <div className="d-flex flex-column  p-2 mt-2  flex-grow-1 adminBackGround"
             style={{borderRadius: '10px', background: '#E9E6DA'}}>
            <div className="d-flex mt-0">
                <Card className="mt-0" title="Календар" content="Календар"
                      style={{width: '140%', borderRadius: '10px'}}/>
                <Card className="mt-0" style={{width: '100%', borderRadius: '10px'}}
                      title="список паперу який закінчується" content=""/>
                <Card className="mt-0" style={{width: '100%', borderRadius: '10px'}} title="Замовлення" content=""/>

            </div>
            <div className="d-flex flex-grow-1">
                <Card title="КАРТКИ ТРЕЛО" content=""/>
                <Card title="Оплати" content=""/>
                <Card title="Документи" content=""/>
                {/* ... other cards */}
            </div>
            <div className="d-flex">
                <Card title="Статистика" content=""/>
            </div>
            <div className="d-flex">
                <Card title="Обладнання" content=""/>
            </div>
        </div>
    );
};

export default Desktop;