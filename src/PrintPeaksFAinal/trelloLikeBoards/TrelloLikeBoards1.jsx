import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Spinner } from 'react-bootstrap';
import './TrelloBoard.css';
import axios from '../../api/axiosInstance';

const TrelloBoard = () => {
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newListTitle, setNewListTitle] = useState('');
    const [deleting, setDeleting] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/trello');
                console.log(res.data);
                setLists(res.data);
            } catch (error) {
                console.error("Помилка при отриманні даних:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const addList = async () => {
        // if (!newListTitle.trim()) return;

        const newList = { title: newListTitle, Cards: [] };
        setNewListTitle('');

        const fetchData = async () => {
            try {
                const res = await axios.post('/trello', newList);
                console.log(res.data);
                setLists(prevLists => [...prevLists, res.data]);
            } catch (error) {
                console.error("Помилка створення списку:", error);
            }
        };
        fetchData();
    };

    const addCard = async (listId) => {
        const newCard = { content: '', type: 'text' };

        const fetchData = async () => {
            try {
                const res = await axios.post(`/trello/${listId}/cards`, newCard);
                console.log(res.data);
                setLists(prevLists => prevLists.map(list => list.id === listId ? { ...list, Cards: [...list.Cards, res.data] } : list));
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
                setLists(prevLists => prevLists.filter(list => list.id !== listId));
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
                setLists(prevLists => prevLists.map(list => {
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
                setLists(updatedLists);
            }
        };
        fetchData()
    };

    if (loading) return <Spinner animation="border" variant="danger" size="sm" />;

    return (
        <DragDropContext>
            <div className="add-list">
                <input type="text" value={newListTitle} onChange={(e) => setNewListTitle(e.target.value)} placeholder="Назва списку" />
                <button onClick={addList}>Додати список</button>
            </div>
            <div className="trello-board">
                {lists.map((list) => (
                    <Droppable key={list.id} droppableId={list.id.toString()}>
                        {(provided) => (
                            <div className="trello-list" {...provided.droppableProps} ref={provided.innerRef}>
                                <h3 className="d-flex align-content-center align-items-center justify-content-between">
                                    <div>{list.title}</div>
                                    <div onClick={() => removeList(list.id)}>
                                        {deleting[list.id] ? <Spinner animation="border" variant="danger" size="sm" /> : '×'}
                                    </div>
                                </h3>
                                {list.Cards.map((card, index) => (
                                    <Draggable key={card.id} draggableId={card.id.toString()} index={index}>
                                        {(provided) => (
                                            <div className="d-flex trello-card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <input type="text" value={card.content} onChange={(e) => handleCardContentChange(list.id, card.id, e.target.value)} />
                                                <button className="d-flex align-content-center align-items-center justify-content-between border-0" onClick={() => removeCard(list.id, card.id)}>
                                                    {deleting[card.id] ? <Spinner animation="border" variant="danger" size="sm" /> : '×'}
                                                </button>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                                <div className="d-flex align-content-center align-items-center justify-content-center border-0" onClick={() => addCard(list.id)}>Додати картку</div>
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
};

export default TrelloBoard;