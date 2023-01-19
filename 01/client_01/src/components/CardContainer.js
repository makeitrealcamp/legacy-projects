import { React } from 'react';
import '../assets/styles/components/CardCointainer.scss';
import TutorsCard from './tutorsCard';

function CardContainer({ Tutors }) {
  return (
    <main className="cards__container">
      {Tutors.map((tutor, i) => {
        return <TutorsCard props={tutor} key={i} />;
      })}
    </main>
  );
}
export { CardContainer };
