import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import udemy from '../../images/udemy.png';
import './index.css';

function navCourse() {
  return <>
    <nav>
      <div className="nav-left">
        <img src={udemy} alt=""/>
        Un título de Curso
      </div>
      <div className="nav-right">
        <div className='item'>
          <span>⭐</span>
          Deja una Calificación
        </div>
        <div className='item'>
          <span>🚧</span>
          Tu Progreso
        </div>
        <div className='item share'>Compartir</div>
        <div className='item menu'>...</div>
      </div>
    </nav>
  </>
}

function CourseView(props) {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [videoSrc, setVideoSrc] = useState('https://makeitreal.s3.amazonaws.com/videos/89300933755/2022-09-06/tgvcMbH8L.mp4');
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get('id')
  useEffect(()=>{
      axios.get(`http://localhost:8081/classes/${id}`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
          }
      }).then((classes) => {
          console.log('clases:', classes.data.data)
          setClasses(classes.data.data);
      })
      .catch(err => console.log(err))   
      .finally(()=>{
          console.log('Este es el finally');
          setLoading(false);
        })
  },[])
  return <>
    {navCourse()}
    <div className='main'>
      <div className='left'>
        <div className='video-section'>
          <video src={videoSrc} controls/>
        </div>
      </div>
      <div className='right'>
        <div className='right-content'>Contenido del Curso <span>X</span> </div>
       {loading? <p>Loading...</p>: BasicExample(classes, setVideoSrc)}
      </div>
    </div>
  </>;
}

export default CourseView;



function BasicExample(classes, setVideoSrc) {
  return (
    <>
    </>
  );
}

