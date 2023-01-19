import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { CategoriesBar } from '../components/CategoriesBar';
import '../assets/styles/components/TutorsContainer.scss';
import { CardContainer } from './CardContainer';
import Loader from './Loader';

function TutorsContainer({ title }) {
  const [filter, setFilter] = useState('Math');
  const [Categories, setCategories] = useState([]);
  const [Tutors, setTutors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const responseCat = await axios.get('/categories');
        const categories = responseCat.data.categories;
        setCategories(categories);
        const responseTut = await axios.get(`/tutors/${filter}`);
        const tutors = responseTut.data.tutors;
        setTutors(tutors);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    }
    getData();
  }, [filter]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="tutors__container">
          <div className="tutors__title-container">
            <p>{title}</p>
          </div>
          <div className="categories__container">
            <CategoriesBar Categories={Categories} setFilter={setFilter} />
          </div>
          <CardContainer Tutors={Tutors} />
        </section>
      )}
    </>
  );
}
export { TutorsContainer };
