import TutorsCard from './tutorsCard';
import '../assets/styles/components/SearchResult.scss';

const SearchResult = (Tutors) => {
  return (
    <main className="search__result">
      {Tutors.Tutors.map((element, i) => (
        <TutorsCard props={element} key={i} />
      ))}
    </main>
  );
};

export default SearchResult;
