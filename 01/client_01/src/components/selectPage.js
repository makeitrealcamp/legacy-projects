import React from 'react';
import '../assets/styles/components/SearchPage.scss';

const SelectPage = ({ Page, setPage, Pages }) => {
  const prevPage = (e) => {
    e.preventDefault();
    setPage((Page) => (Page === 1 ? (Page = 1) : Page - 1));
    window.scrollTo(0, 0);
  };

  const nextPage = (e) => {
    e.preventDefault();
    setPage((Page) => (Page === Pages ? (Page = 11) : Page + 1));
    window.scrollTo(0, 0);
  };

  return (
    <div className="change__page_container">
      <button className={Page > 1 ? 'change__page_button' : 'change__page_button-hidden'} onClick={prevPage}>
        Prev
      </button>

      <p className="change__page_p">
        Page {Page} / {Pages>1? Pages: 1}
      </p>
      <button className={Page < Pages ? 'change__page_button' : 'change__page_button-hidden'} onClick={nextPage}>
        Next
      </button>
    </div>
  );
};

export default SelectPage;
