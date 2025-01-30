import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './TrelloBoard.css';
import axios from '../../api/axiosInstance';

const TrelloBoard = () => {
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newListTitle, setNewListTitle] = useState('');

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

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const sourceListIndex = lists.findIndex((list) => list.id === result.source.droppableId);
        const destinationListIndex = lists.findIndex((list) => list.id === result.destination.droppableId);

        const sourceList = lists[sourceListIndex];
        const destinationList = lists[destinationListIndex];

        const draggedCard = sourceList.Cards.splice(result.source.index, 1)[0];
        destinationList.Cards.splice(result.destination.index, 0, draggedCard);

        const updatedLists = [...lists];
        updatedLists[sourceListIndex] = sourceList;
        updatedLists[destinationListIndex] = destinationList;

        // axios.put(`/trello/${sourceList.id}`, sourceList).catch(error => console.error(error));
        const fetchData = async () => {
            try {
                const res = await axios.put(`/trello/${sourceList.id}`, sourceList);
                console.log(res.data);
                // setLists(res.data);
            } catch (error) {
                console.error("Помилка при отриманні даних:", error);
            } finally {
                const fetchData2 = async () => {
                    try {
                        const res = await axios.put(`/trello/${destinationList.id}`, destinationList);
                        console.log(res.data);
                        // setLists(res.data);
                    } catch (error) {
                        console.error("Помилка при отриманні даних:", error);
                    } finally {
                        setLoading(false);
                        setLists(updatedLists);
                    }
                };
                fetchData2()
            }
        };
        fetchData()
        // axios.put(`/trello/${destinationList.id}`, destinationList).catch(error => console.error(error));
    };

    const handleCardContentChange = (listId, cardId, newContent) => {
        const updatedLists = lists.map(list => {
            if (list.id === listId) {
                return {
                    ...list,
                    Cards: list.Cards.map(card => card.id === cardId ? { ...card, content: newContent } : card)
                };
            }
            return list;
        });
        const fetchData = async () => {
            try {
                const res = await axios.put(`/trello/${listId}`, updatedLists.find(list => list.id === listId));
                console.log(res.data);
                // setLists(res.data);
            } catch (error) {
                console.error("Помилка при отриманні даних:", error);
            } finally {
                setLoading(false);
                setLists(updatedLists);
            }
        };
        fetchData()
        // axios.put(`/trello/${listId}`, updatedLists.find(list => list.id === listId)).catch(error => console.error(error));
    };

    const addList = () => {
        if (!newListTitle.trim()) return;

        const newList = {
            id: Date.now().toString(),
            title: newListTitle,
            Cards: []
        };

        const updatedLists = [...lists, newList];
        setNewListTitle('');

        // axios.post('/trello', newList).catch(error => console.error(error));
        const fetchData = async () => {
            try {
                const res = await axios.post('/trello', newList).catch(error => console.error(error));
                console.log(res.data);
                // setLists(res.data);
            } catch (error) {
                console.error("Помилка при отриманні даних:", error);
            } finally {
                setLists(updatedLists);
            }
        };
        fetchData()
    };

    const addCard = (listId) => {
        const newCard = {
            id: Date.now().toString(),
            content: '',
            type: 'text'
        };

        const updatedLists = lists.map(list => list.id === listId ? { ...list, Cards: [...list.Cards, newCard] } : list);

        // axios.put(`/trello/${listId}`, updatedLists.find(list => list.id === listId)).catch(error => console.error(error));
        const fetchData = async () => {
            try {
                const res = await axios.put(`/trello/${listId}`, updatedLists.find(list => list.id === listId)).catch(error => console.error(error));
                console.log(res.data);
                // setLists(res.data);
            } catch (error) {
                console.error("Помилка при отриманні даних:", error);
            } finally {
                setLists(updatedLists);
            }
        };
        fetchData()
    };

    const removeCard = (listId, cardId) => {
        const updatedLists = lists.map(list => {
            if (list.id === listId) {
                return { ...list, Cards: list.Cards.filter(card => card.id !== cardId) };
            }
            return list;
        });

        // axios.put(`/trello/${listId}`, updatedLists.find(list => list.id === listId)).catch(error => console.error(error));
        const fetchData = async () => {
            try {
                const res = await axios.put(`/trello/${listId}`, updatedLists.find(list => list.id === listId)).catch(error => console.error(error));
                console.log(res.data);
                // setLists(res.data);
            } catch (error) {
                console.error("Помилка при отриманні даних:", error);
            } finally {
                setLists(updatedLists);
            }
        };
        fetchData()
    };

    const removeList = (listId) => {
        const updatedLists = lists.filter(list => list.id !== listId);

        // axios.delete(`/trello/${listId}`).catch(error => console.error(error));
        const fetchData = async () => {
            try {
                const res = await axios.delete(`/trello/${listId}`).catch(error => console.error(error));
                console.log(res.data);
                // setLists(res.data);
            } catch (error) {
                console.error("Помилка при отриманні даних:", error);
            } finally {
                setLists(updatedLists);
            }
        };
        fetchData()
    };

    if (loading) return <div>Завантаження...</div>;

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="trello-board">
                {lists.map((list) => (
                    <Droppable key={list.id} droppableId={list.id.toString()}>
                        {(provided) => (
                            <div className="trello-list" {...provided.droppableProps} ref={provided.innerRef}>
                                <h3>{list.title} <button onClick={() => removeList(list.id)}>×</button></h3>
                                {list.Cards.map((card, index) => (
                                    <Draggable key={card.id} draggableId={card.id.toString()} index={index}>
                                        {(provided) => (
                                            <div className="trello-card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <input type="text" value={card.content} onChange={(e) => handleCardContentChange(list.id, card.id, e.target.value)} />
                                                <button onClick={() => removeCard(list.id, card.id)}>×</button>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                                <button onClick={() => addCard(list.id)}>Додати картку</button>
                            </div>
                        )}
                    </Droppable>
                ))}
                <div className="add-list">
                    <input type="text" value={newListTitle} onChange={(e) => setNewListTitle(e.target.value)} placeholder="Назва списку" />
                    <button onClick={addList}>Додати список</button>
                </div>
            </div>
        </DragDropContext>
    );
};

export default TrelloBoard;