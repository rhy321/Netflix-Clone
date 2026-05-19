// import React from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData]= useState({
    name: "",
    key: "",
    published_at: "",
    typeof: ""
  });

  useEffect(() => {

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZGY5YTUzMGYzZjIzMWFlNTNkNDk1YjY0ZjU3MWUwMiIsIm5iZiI6MTc3ODg3ODYyNC41MzMsInN1YiI6IjZhMDc4OGEwNTM2NjlhYzM1NzY2M2QwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ckVsotqRNJHSlj3wJCyBmSsLMj30V6nNEIDOalYlq7w'
      }
    };

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results[0]))
      .catch(err => console.error(err));

  }, [id])

  console.log(apiData);

  return (
    <div className='player'>
      <img src={back_arrow_icon} onClick={()=>{navigate('/')}} alt="" />
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{dayjs(apiData.published_at).format('D MMM YYYY')}</p>
        <p>{apiData.name}</p>
        <p>{apiData.typeof}</p>
      </div>
    </div>
  )
}

export default Player
