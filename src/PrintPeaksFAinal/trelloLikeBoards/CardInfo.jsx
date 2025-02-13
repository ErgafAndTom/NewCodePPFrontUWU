import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "../../api/axiosInstance";

// Компонент для списка загруженных изображений
function ImageList({ images, onRemove }) {
    if (images.length === 0) {
        return <p>Нет загруженных изображений</p>;
    }

    return (
        <div style={{ 
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            gridTemplateColumns: "repeat(2, 1fr)",
        }}>
            {images.map((img) => (
                    <div
                        key={img.id}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "0.5rem",
                            borderBottom: "1px solid #ccc",
                        }}
                    >
                        <img
                            src={`/images/${img.photoLink}`} /* Assuming img.url holds the photo URL */
                            alt="photo"
                            style={{
                                width: "8vw",
                                objectFit: "cover"
                            }}
                        />
                        {/*<span style={{flex: 1, color: "#333"}}>{`Файл: ${img.name || "Без имени"}`}</span>*/}
                        <button
                            onClick={() => onRemove(img.id)}
                            style={{
                                backgroundColor: "transparent",
                                color: "#ff3333",
                                border: "none",
                                // padding: "0.25rem 0.5rem",
                                borderRadius: "2px",
                                cursor: "pointer",
                            }}
                        >
                            ✖
                        </button>
                    </div>
                ))}
        </div>
        
    );
}

// Общий контейнер карточки
export default function CardInfo({openCardData, setOpenCardInfo, setServerData, serverData, handleCardContentChange}) {
    const [cardName, setCardName] = useState(openCardData.name);
    const [textContent, setTextContent] = useState(openCardData.content);
    const [images, setImages] = useState(openCardData.inTrelloPhoto);
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const handleClose = () => {
        setIsAnimating(false); // Начинаем анимацию закрытия
        setTimeout(() => {
            setIsVisible(false)
            setOpenCardInfo(false);
        }, 300); // После завершения анимации скрываем модальное окно
    }

    // Добавляем загруженные изображения в массив
    const handleUpload = (newImages) => {
        setImages((prev) => [...prev, ...newImages]);
    };

    // Удаляем изображение из массива по id
    const handleRemoveImage = (id) => {
        setImages((prev) => prev.filter((img) => img.id !== id));
    };

    const uploadPhoto = async (cardId, photo) => {
        const formData = new FormData();
        formData.append('file', photo);

        const fetchData = async () => {
            try {
                const res = await axios.post(`/trello/${cardId}/contentPhoto`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(res.data);

                // Update the card with the new photo in the server data
                setServerData(prevLists =>
                    prevLists.map(list => ({
                        ...list,
                        Cards: list.Cards.map(card =>
                            card.id === cardId ? {...card, inTrelloPhoto: res.data.photo} : card
                        )
                    }))
                );
            } catch (error) {
                console.error('Помилка завантаження фото:', error);
            }
        };
        fetchData();
    };

    useEffect(() => {
        if (openCardData) {
            setIsVisible(true); // Сначала показываем модальное окно
            setTimeout(() => setIsAnimating(true), 100); // После короткой задержки запускаем анимацию появления
        } else {
            setIsAnimating(false); // Начинаем анимацию закрытия
            setTimeout(() => setIsVisible(false), 300); // После завершения анимации скрываем модальное окно
        }
    }, [openCardData]);

    return (
        <>
            {isVisible === true ? (
                <div>
                    <div
                        style={{
                            width: "100vw",
                            zIndex: "99",
                            height: "100vh",
                            background: "rgba(0, 0, 0, 0.5)",
                            opacity: isAnimating ? 1 : 0, // для анимации прозрачности
                            transition: "opacity 0.3s ease-in-out", // плавная анимация
                            position: "fixed",
                            left: "0",
                            bottom: "0"
                        }}
                        onClick={handleClose}
                    ></div>
                    <div
                        className="d-flex flex-column" style={{
                        zIndex: "100",
                        position: "fixed",
                        background: "#dcd9ce",
                        top: "50%",
                        left: "50%",
                        transform: isAnimating ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0.8)", // анимация масштаба
                        opacity: isAnimating ? 1 : 0, // анимация прозрачности
                        transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out", // плавная анимация
                        borderRadius: "1vw",
                        maxWidth: "30vw",
                        maxHeight: "70vh",
                        padding: "0.7vw"
                    }}
                    >
                        <div className="d-flex justify-content-around">
                            <div>
                                <textarea onChange={(e) => handleCardContentChange(openCardData.listId, openCardData.id, e.target.value)}
                                       value={openCardData.content}
                                       type="text"
                                       style={{
                                           width: "26vw",
                                           height: "7vh",
                                           border: "none",
                                           borderRadius: "0.5vw",
                                           padding: "0.5vw"

                                }}/>
                            </div>
                            <div
                                className="btn btn-close btn-lg"
                                style={{
                                    marginLeft: "0.5vw",
                                }}
                                onClick={handleClose}
                            >
                            </div>
                        </div>
                        <ImageList images={images} onRemove={handleRemoveImage} />
                        <div

                            className="d-flex align-items-center justify-content-between mt-2">
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file && file.type.startsWith('image/')) {
                                        setSelectedImage(file);
                                    } else {
                                        setSelectedImage(null);
                                    }
                                }}
                                onPaste={(e) => {
                                    if (e.clipboardData.files.length > 0) {
                                        const file = e.clipboardData.files[0];
                                        if (file && file.type.startsWith("image/")) {
                                            setSelectedImage(file);
                                        }
                                    }
                                }}
                                style={{
                                    width: "100%",
                                    border: "none",
                            }}
                            />
                            <button
                                disabled={!selectedImage}
                                className="border-0 btn btn-success d-flex align-items-center justify-content-center"
                                style={{
                                    // marginLeft: "2px",
                                    width: "9vw",
                                    height: "3vh",
                                    borderRadius: "0.5vw",
                            }}
                                onClick={() => uploadPhoto(openCardData.id, selectedImage)}
                            >
                                {selectedImage ? "Завантажити" : "Очікую img.."}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    style={{display: "none"}}
                ></div>
            )}
        </>
    )
}
