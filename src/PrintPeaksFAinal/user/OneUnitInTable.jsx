import React from 'react';
import { translateColumnName } from './translations';

const OneUnitInTable = ({itemData, tablPosition, item, metaItem, handleItemClickRed}) => {
    // Функція для визначення ширини стовпця - має бути ідентичним в усіх таблицях
    const getColumnWidth = (columnName) => {
        switch(columnName) {
            // Спільні колонки
            case 'id': return '2vw';
            case 'createdAt': return '7vw';
            case 'updatedAt': return '7vw';
            
            // Колонки користувачів
            case 'username': return '6vw';
            case 'firstName': return '6vw';
            case 'lastName': return '6vw';
            case 'familyName': return '6vw';
            case 'email': return '8vw';
            case 'phoneNumber': return '8vw';
            case 'role': return '4vw';
            case 'password': return '5vw';
            
            // За замовчуванням
            default: return '3.55vw';
        }
    };
    
    // Базові стилі для клітинки
    const cellStyle = {
        border: "0.05vw solid #FBFAF6",
        width: getColumnWidth(metaItem),
        minWidth: getColumnWidth(metaItem),
        maxWidth: getColumnWidth(metaItem),
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        height: "auto",
        minHeight: "3vmin",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "0.7rem",
        boxSizing: "border-box",
        textAlign: "center",
        padding: "0.2rem",
        background: "#FBFAF6",
        borderRadius: "0.3rem",
        margin: "0.05rem 0",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
    };

    if (tablPosition === "id") {
        return (
            <div className="CustomOrderTable-cell" style={cellStyle}>{itemData}</div>
        );
    }
    
    if (tablPosition === "password") {
        return (
            <div className="CustomOrderTable-cell" style={cellStyle}>********</div>
        );
    }
    
    if (tablPosition === "createdAt" || tablPosition === "updatedAt") {
        return (
            <div className="CustomOrderTable-cell" style={cellStyle}>
                {itemData ? `${new Date(itemData).toLocaleDateString()} ${new Date(itemData).toLocaleTimeString()}` : '-'}
            </div>
        );
    }

    // Додаємо стилі для редагованих клітинок
    const editableCellStyle = {
        ...cellStyle,
        cursor: 'pointer',
        transition: 'background-color 0.2s ease'
    };

    // Спеціальне форматування для ролей
    if (tablPosition === "role") {
        return (
            <div
                className="CustomOrderTable-cell CustomOrderTable-cellCan"
                style={{
                    ...editableCellStyle,
                    backgroundColor: itemData === 'admin' ? '#ffe9e9' : 
                                    itemData === 'manager' ? '#e9f8ff' : '#f2ffe9'
                }}
                onClick={(e) => handleItemClickRed(item, e, metaItem)}
            >
                <div className="CustomOrderTable-cell1">
                    {itemData}
                </div>
            </div>
        );
    }

    return (
        <div
            className="CustomOrderTable-cell CustomOrderTable-cellCan"
            style={editableCellStyle}
            onClick={(e) => handleItemClickRed(item, e, metaItem)}
        >
            <div className="CustomOrderTable-cell1">
                {itemData}
            </div>
        </div>
    );
};

export default OneUnitInTable;