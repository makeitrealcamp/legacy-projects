import React, { useState } from 'react';
import '../assets/styles/components/CategoriesBar.scss';

function CategoriesBar({ Categories, setFilter }) {
  const [selected, setSelected] = useState(null);
  return (
    <main className="categories__container">
      <select
        placeholder="categories"
        name="categories"
        className="categories__select-focus"
        onChange={(e) => setFilter(e.target.value)}
      >
        <option hidden>Choose an area</option>
        {Categories.map((category) => (
          <option key={category._id} value={category.subject}>
            {category.subject}
          </option>
        ))}
      </select>
      {Categories.map((e, i) => (
        <button
          className={selected === e.subject ? 'category__button-selected' : 'category__button'}
          key={i}
          onClick={() => {
            setFilter(e.subject);
            setSelected(e.subject);
          }}
        >
          {e.subject}
        </button>
      ))}
    </main>
  );
}

export { CategoriesBar };
