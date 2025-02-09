import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Spinner } from 'react-bootstrap';
import './TrelloBoard.css';
import axios from '../../api/axiosInstance';
import NewSheetCutBw from "../poslugi/NewSheetCutBw";
import CardInfo from "./CardInfo";

const TrelloBoard = () => {
    const [lists, setLists] = useState([]);
    const [serverData, setServerData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newListTitle, setNewListTitle] = useState('');
    const [deleting, setDeleting] = useState({});
    const [openCardInfo, setOpenCardInfo] = useState(false);
    const [openCardData, setOpenCardData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.post('/trello/getdata');
                console.log(res.data);
                setServerData(res.data);
            } catch (error) {
                console.error("Помилка при отриманні даних:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        setLists(prevLists => prevLists.map(list => ({
            ...list,
            Cards: list.Cards.map((card, index) => ({
                ...card,
                id: card.id
                    // || `card-${list.id}-${index}` // Генерируем `id`, если его нет
            }))
        })));
    }, [serverData]);

    useEffect(() => {
        if (lists.length === 0 || JSON.stringify(lists) !== JSON.stringify(serverData)) {
            setLists(serverData);
        }
    }, [serverData]);

    const addList = async () => {
        // if (!newListTitle.trim()) return;

        const newList = { title: newListTitle, Cards: [] };
        setNewListTitle('');

        const fetchData = async () => {
            try {
                const res = await axios.post('/trello', newList);
                console.log(res.data);
                setServerData(prevLists => [...prevLists, res.data]);
            } catch (error) {
                console.error("Помилка створення списку:", error);
            }
        };
        fetchData();
    };
    const seeInfoCard = async (listId, cardId) => {
        setOpenCardData(
            lists.find(list => list.id === listId).Cards.find(card => card.id === cardId))
        setOpenCardInfo(true);
    }

    const addCard = async (listId) => {
        const newCard = { content: '', type: 'text' };
        const fetchData = async () => {
            try {
                const res = await axios.post(`/trello/${listId}/cards`, newCard);
                console.log(res.data);
                setServerData(prevLists => prevLists.map(list => list.id === listId ? { ...list, Cards: [...list.Cards, res.data] } : list));
            } catch (error) {
                console.error("Помилка створення картки:", error);
            }
        };
        fetchData();
    };

    const removeList = async (listId) => {
        setDeleting(prev => ({ ...prev, [listId]: true }));
        const fetchData = async () => {
            try {
                await axios.delete(`/trello/${listId}`);
                setServerData(prevLists => prevLists.filter(list => list.id !== listId));
            } catch (error) {
                console.error("Помилка при видаленні списку:", error);
            } finally {
                setDeleting(prev => ({ ...prev, [listId]: false }));
            }
        };
        fetchData();
    };

    const removeCard = async (listId, cardId) => {
        setDeleting(prev => ({ ...prev, [cardId]: true }));
        const fetchData = async () => {
            try {
                await axios.delete(`/trello/${listId}/cards/${cardId}`);
                setServerData(prevLists => prevLists.map(list => {
                    if (list.id === listId) {
                        return { ...list, Cards: list.Cards.filter(card => card.id !== cardId) };
                    }
                    return list;
                }));
            } catch (error) {
                console.error("Помилка при видаленні картки:", error);
            } finally {
                setDeleting(prev => ({ ...prev, [cardId]: false }));
            }
        };
        fetchData();
    };

    const handleCardContentChange = (listId, cardId, newContent) => {
        const fetchData = async () => {
            let data = {
                cardId: cardId,
                newContent:newContent
            }
            try {
                const res = await axios.put(`/trello/content`, data);
                console.log(res.data);
            } catch (error) {
                console.error("Помилка при отриманні даних:", error);
            } finally {
                const updatedLists = lists.map(list => {
                    if (list.id === listId) {
                        return {
                            ...list,
                            Cards: list.Cards.map(card => card.id === cardId ? { ...card, content: newContent } : card)
                        };
                    }
                    return list;
                });
                setServerData(updatedLists);
            }
        };
        fetchData()
    };
    const onDragEnd = async (result) => {
        if (!result.destination) return;

        const { source, destination } = result;

        const startList = lists.find(list => list.id.toString() === source.droppableId);
        const finishList = lists.find(list => list.id.toString() === destination.droppableId);

        if (!startList || !finishList) return;

        const movedCard = startList.Cards[source.index];

        // Отправка данных на сервер
        try {
            let dataToSend = {
                cardId: movedCard.id,
                fromListId: startList.id,
                toListId: finishList.id,
                fromIndex: source.index,
                toIndex: destination.index
            }
            const response = await axios.put('/trello/drag', dataToSend);

            if (response.status !== 200) throw new Error(response.data.message || 'Ошибка перемещения');
            setServerData(response.data)
        } catch (error) {
            console.error('Ошибка при перемещении:', error);
        }
    };

    if (loading) return <Spinner animation="border" variant="danger" size="sm" />;

    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="d-flex align-content-center align-items-center justify-content-center">
                    <input className="InputInTrelloName" type="text" value={newListTitle} onChange={(e) => setNewListTitle(e.target.value)} placeholder="Назва колонки" />
                    <button className="d-flex align-content-center align-items-center justify-content-center buttonRightOfInputInTrello" onClick={addList}>+</button>
                </div>
                <div className="trello-board">
                    {lists.map((list) => (
                        <Droppable key={list.id} droppableId={list.id.toString()}>
                            {(provided) => (
                                <div className="trello-list" {...provided.droppableProps} ref={provided.innerRef}>
                                    <h6 className="d-flex align-content-center align-items-center justify-content-between">
                                        <div>{list.title}</div>
                                        <div onClick={() => removeList(list.id)}>
                                            {deleting[list.id] ? <Spinner animation="border" variant="danger" size="sm" color="white"/> : '×'}
                                        </div>
                                    </h6>
                                    {list.Cards.map((card, index) => (
                                        <Draggable key={card.id} draggableId={card.id.toString()} index={index}>
                                            {(provided) => (
                                                <div className="trello-card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <div className="d-flex">
                                                        {/*<textarea className="InputInTrello" style={{width: "93%"}} type="text" value={card.content} onChange={(e) => handleCardContentChange(list.id, card.id, e.target.value)} />*/}
                                                        <div className="trello-card-content" style={{width: "93%"}} onClick={() => seeInfoCard(list.id, card.id)}>
                                                            {card.content}
                                                        </div>
                                                        <button className="d-flex align-content-center align-items-center justify-content-between border-0" onClick={() => removeCard(list.id, card.id)}>
                                                            {deleting[card.id] ? <Spinner animation="border" variant="danger" size="sm" /> : '×'}
                                                        </button>
                                                    </div>
                                                    <div className="d-flex" style={{padding: "0.5vw"}}>
                                                        {card.inTrelloPhoto && card.inTrelloPhoto.map((photo, index) => (
                                                            <img
                                                                key={index}
                                                                src={`/images/${photo.photoLink}`}
                                                                alt={`Card Photo ${index + 1}`}
                                                                style={{
                                                                    width: 'calc(50% - 1px)',
                                                                    height: 'auto',
                                                                    maxHeight: '15vh',
                                                                    objectFit: 'cover',
                                                                    marginBottom: '10px'
                                                                }}
                                                            />
                                                        ))}
                                                    </div>
                                                    {/*<div className="createdByTrelloList">*/}
                                                    {/*    Додано: {card.createdBy.username}*/}
                                                    {/*</div>*/}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                    <div className="d-flex align-content-center align-items-center justify-content-center border-0 trello-add" onClick={() => addCard(list.id)}>+</div>
                                    {/*<div className="createdByTrelloList">*/}
                                    {/*    Додано: {list.createdBy.username}*/}
                                    {/*</div>*/}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>


            {openCardInfo &&
                <CardInfo
                    openCardData={openCardData}
                    setOpenCardInfo={setOpenCardInfo}
                    setServerData={setServerData}
                    serverData={serverData}
                    handleCardContentChange={handleCardContentChange}
                />
            }
        </div>

    );
};

export default TrelloBoard;
