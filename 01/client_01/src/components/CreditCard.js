import React from 'react';
import '../assets/styles/components/CreditCard.scss';

function CreditCard({ card, selectCard, deleteCard, token_card }) {
  return (
    <div className="credit-card__body">
      <div className="credit-card__text">
        <div>{card.mask}</div>
      </div>
      {deleteCard ? (
        <button className="credit-card__button-delete" onClick={() => deleteCard(card)}>
          delete card
        </button>
      ) : (
        <button
          className={`credit-card__button${card.token === token_card ? '-selected' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            selectCard(card);
          }}
        ></button>
      )}
    </div>
  );
}

export default CreditCard;
