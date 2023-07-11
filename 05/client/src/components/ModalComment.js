import '../styles/components/ModalComment.scss';
import { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Swal from 'sweetalert2';

const ModalComment = ({ id, set, state }) => {
  const [calificacion1, setCalificacion1] = useState(5);
  const [calificacion2, setCalificacion2] = useState(5);
  const [calificacion3, setCalificacion3] = useState(5);
  const [calificacion4, setCalificacion4] = useState(5);
  const [calificacion5, setCalificacion5] = useState(5);
  const [calificacion6, setCalificacion6] = useState(5);
  const [comment, setComment] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor escribir un comentario.',
      });
      return;
    }
    const score = {
      cleanliness: parseInt(calificacion1, 10),
      accuracy: parseInt(calificacion2, 10),
      communication: parseInt(calificacion3, 10),
      location: parseInt(calificacion4, 10),
      checkin: parseInt(calificacion5, 10),
      value: parseInt(calificacion6, 10),
    };
    const dataSend = {
      message: comment,
      score,
    };
    // console.log(id, dataSend);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_AIRBACK}/comments/${id}`,
        dataSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      Swal.fire({
        title: 'Muchas Gracias',
        text: 'Su comentario ha sido agregado correctamente',
        icon: 'success',
        confirmButtonText: 'Cool',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          set(false);
        }
      });

      //
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="ContainerComment">
          <h2>Califica tu experiencia</h2>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="me gusto mucho todo, 5 estrellas"
          ></textarea>
          <div className="item">
            <label>Cleanliness:</label>
            <input
              min="1"
              max="5"
              type={'number'}
              value={calificacion1}
              onChange={(e) => setCalificacion1(e.target.value)}
            ></input>
          </div>
          <div className="item">
            <label>Accuracy:</label>
            <input
              min="1"
              max="5"
              type={'number'}
              value={calificacion2}
              onChange={(e) => setCalificacion2(e.target.value)}
            ></input>
          </div>
          <div className="item">
            <label>Communication:</label>
            <input
              min="1"
              max="5"
              type={'number'}
              value={calificacion3}
              onChange={(e) => setCalificacion3(e.target.value)}
            ></input>
          </div>
          <div className="item">
            <label>Location:</label>
            <input
              min="1"
              max="5"
              type={'number'}
              value={calificacion4}
              onChange={(e) => setCalificacion4(e.target.value)}
            ></input>
          </div>
          <div className="item">
            <label>Check-in:</label>
            <input
              min="1"
              max="5"
              type={'number'}
              value={calificacion5}
              onChange={(e) => setCalificacion5(e.target.value)}
            ></input>
          </div>
          <div className="item">
            <label>Value:</label>
            <input
              min="1"
              max="5"
              type={'number'}
              value={calificacion6}
              onChange={(e) => setCalificacion6(e.target.value)}
            ></input>
          </div>
          <button className="Btn" type="submit">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalComment;
