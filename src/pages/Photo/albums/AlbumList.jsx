import axios from "axios";
import React, { useEffect, useState } from "react";

const AlbumList = ({ albumId }) => {
  const [thumbnails, setThumbnails] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Здесь вы можете выполнить API-запрос для получения миниатюр картинок альбома.
    // Используйте setThumbnails для сохранения полученных данных в состоянии.
    // Обновите запрос в соответствии с требованиями вашего API.
    axios
      .get(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
      .then((response) => {
        setThumbnails(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [albumId]);

  // Обработчик для открытия всплывающего окна с полноразмерной картинкой
  const openImagePopup = (image) => {
    setSelectedImage(image);
  };

  // Обработчик для закрытия всплывающего окна
  const closeImagePopup = () => {
    setSelectedImage(null);
  };

  return (
<>
</>
  );
};

export default AlbumList;
