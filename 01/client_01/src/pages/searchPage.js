import { React, useState, useEffect } from 'react';
import SearchResult from '../components/searchResult.js';
import SelectPage from '../components/selectPage.js';
import { Player } from '@lottiefiles/react-lottie-player';
import Loader from '../components/Loader';
import axios from '../utils/axios';
import history from '../utils/history.js';

const SearchPage = () => {
  const params = new URLSearchParams(document.location.search.substring(1));
  const query = params.get('query');
  const page = parseInt(params.get('page'));
  const [Tutors, setTutors] = useState([]);
  const [Page, setPage] = useState(page);
  const [Pages, setPages] = useState(page);
  const [notFound, setNotFound] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const search = async () => {
      try {
        const responseTut = await axios.get(`/tutorsearch/${query}/${Page}`);
        setTutors(responseTut.data.data);
        const count = responseTut.data.count;
        setPages(parseInt(count / 9));
        history.push({
          pathname: `/search/?query=${query}&page=${Page}`,
        });
        if (responseTut.data.data.length > 0) {
          setNotFound(false);
        } else {
          setNotFound(true);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    search();
  }, [Page, query]);
  
  useEffect(() => {
   if( page === 1)  setPage(page)
  }, [page])

  return (
    <div className="search-page">
      {isLoading ? (
        <Loader />
      ) : notFound ? (
        <div className="search-page__nothing-found">
          <p>Nothing found, please try again</p>
          <Player
            autoplay
            loop
            src="https://assets6.lottiefiles.com/packages/lf20_buhby0ug.json"
            className="search-page__illustration"
          ></Player>
        </div>
      ) : (
        <>
          <SearchResult Tutors={Tutors} />
          <SelectPage Page={Page} setPage={setPage} Pages={Pages} />
        </>
      )}
    </div>
  );
};

export { SearchPage };
