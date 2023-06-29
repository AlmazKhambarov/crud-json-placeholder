import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AlbumList from './albums/AlbumList';

const Photo = () => {
  const [albums, setAlbums] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Здесь вы можете выполнить API-запрос для получения списка альбомов.
    // Используйте setAlbums для сохранения полученных данных в состоянии.
    // Обновите запрос в соответствии с требованиями вашего API.
    axios.get(`https://jsonplaceholder.typicode.com/albums?perPage=${perPage}&page=${currentPage}`)
      .then(response => {
        setAlbums(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [perPage, currentPage]);

  // Обработчик для изменения количества выводимых альбомов
  const handlePerPageChange = event => {
    setPerPage(Number(event.target.value));
  };

  // Обработчик для изменения текущей страницы
  const handlePageChange = page => {
    setCurrentPage(page);
  };

  return (
    <div>

      <ul>
        {albums.map(album => (
          <li key={album.id}>
            <div>
              <span>{album.title}</span>
              <span>{album.username}</span>
             arrr <AlbumList albumId={album.id}/>
            </div>
          </li>
        ))}
      </ul>

      {/* Добавьте компоненты для пагинации */}
    </div>
  );
};

export default Photo  ;
