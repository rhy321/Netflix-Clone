import { useEffect, useState } from 'react';
import './TitleCards.css'
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {

  const [apiData, setApiData] = useState([]);

  useEffect(() => {

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZGY5YTUzMGYzZjIzMWFlNTNkNDk1YjY0ZjU3MWUwMiIsIm5iZiI6MTc3ODg3ODYyNC41MzMsInN1YiI6IjZhMDc4OGEwNTM2NjlhYzM1NzY2M2QwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ckVsotqRNJHSlj3wJCyBmSsLMj30V6nNEIDOalYlq7w'
      }
    };

    fetch(`https://api.themoviedb.org/3/movie/${category || 'now_playing'}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));

  }, [category])

  console.log('hi');
  console.log(apiData);

  return (
    <div className='titlecards'>
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className='card-list'>
        {apiData.map((card, idx) => {
          return <Link to={`/player/${card.id}`} className="card" key={idx}>
            <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
