// App.jsx
import React, {useEffect, useState} from 'react';
import { DateRangePicker } from 'react-date-range';
import './calendarstyles.css'; // основні стилі
import './calendartheme.css'; // тема
import { addDays } from 'date-fns';
import axios from "../api/axiosInstance";

const App = () => {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection',
        },
    ]);
    const [statistics, setStatistics] = useState({
        total_orders: 0,
        total_sum: 0,
        paid_sum: 0,
        unpaid_sum: 0,
        unpaid_count: 0,
    });

    useEffect(() => {
        let data = {
            start_date: state[0].startDate,
            end_date: state[0].endDate,
        }
        console.log(data);
        axios.post(`/statistics/get1`, data)
            .then(response => {
                console.log(response.data);
                setStatistics(response.data);
                // console.log(response.data);
            })
            .catch(error => {
                if (error.response.status === 403) {
                    // navigate('/login');
                }
                console.log(error.message);
            })
    }, [state]);

    return (
        <div className="d-flex">
            {/*<div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>*/}
            {/*    <DateRangePicker*/}
            {/*        ranges={state}*/}
            {/*        onChange={(item) => setState([item.selection])}*/}
            {/*        editableDateInputs={true}*/}
            {/*        moveRangeOnFirstSelection={false}*/}
            {/*        months={2}*/}
            {/*        direction="horizontal"*/}
            {/*        showPreview={true}*/}
            {/*    />*/}
            {/*</div>*/}

            <div className="bg-white p-4 m-2 flex-grow-1" style={{ borderRadius: '10px',  }}>
                <DateRangePicker
                    ranges={state}
                    // style={{ borderRadius: '0px', background: 'white' }}
                    onChange={(item) => setState([item.selection])}
                    editableDateInputs={true}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    direction="horizontal"

                    showPreview={true}
                />
            </div>

            <div className="bg-white p-4 m-2 flex-grow-1" style={{ borderRadius: '10px',  }}>
                <div className="font-bold text-lg mb-2 adminFont">{"Замовлення "}</div>
                <p className="adminFont">
                    <div>
                        <p>Загальна кількість замовлень: {statistics.total_orders}</p>
                        <p>Загальна сума всіх замовлень: {statistics.total_sum.toFixed(2)}</p>
                        <p>Сума оплачених замовлень: {statistics.paid_sum.toFixed(2)}</p>
                        <p>Сума неоплачених замовлень: {statistics.unpaid_sum.toFixed(2)}</p>
                        <p>Кількість неоплачених замовлень: {statistics.unpaid_count}</p>
                        <p>Кількість оплачених замовлень: {statistics.paidCount}</p>
                    </div>
                </p>
            </div>
        </div>
    );
};

export default App;
