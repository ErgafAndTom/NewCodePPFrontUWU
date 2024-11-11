import React from 'react';

function StatusBar({item}) {
    const style = {
        color:
            item.status === 'Створено' ? '#000000' :
                item.status === 'В роботі' ? '#00ffe7' :
                    item.status === 'Зроблено' ? '#ffffff' :
                        item.status === 'Відвантажено' ? '#ffea00' :
                            item.status === 'Відміна' ? '#72ff00' :
                                '#ffffff',
        overflow: 'hidden',
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        // height: "100%",
        borderRadius: "6px",
        padding: "1vw",
        // color: "black",
        backgroundColor:
            item.status === 'Створено' ? '#F2EFE8' :
                item.status === 'В роботі' ? '#fab416' :
                    item.status === 'Зроблено' ? '#008249' :
                        item.status === 'Відвантажено' ? '#3c60a6' :
                            item.status === 'Відміна' ? '#ee3c23' :
                                '#000000',
    };
    return (
        <div className="adminFontTable d-flex align-content-center justify-content-center m-auto p-0" style={style}>
            {item.status}
        </div>
    );
}

export default StatusBar;