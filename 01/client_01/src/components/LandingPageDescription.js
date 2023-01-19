import React from 'react';
import '../assets/styles/components/LandigPageDescription.scss';
import { Player } from '@lottiefiles/react-lottie-player';

function LandingPageDescription() {
  return (
    <>
      <section className="description-main__container">
        <section className="description-main__text-container">
          <p className="description__title">
            For each student,{' '}
            <span className="description__text--breack">
              a <span className="description__text--highlight">commited</span> tutor.
            </span>
          </p>
          <p className="description__subtitle">
            For each question. <span className="description__text--breack">The right answer.</span>
          </p>
          <div className="description__line"></div>
        </section>
        <Player
          autoplay
          loop
          src="https://assets6.lottiefiles.com/packages/lf20_tykkhlvn.json"
          className="description__illustration"
        ></Player>
      </section>
      <section className="description-secondary__container">
        <div className="description-secondary__text-container">
          <p className="description__title">
            Ask <span className="description__text--highlight">anything</span>,{' '}
            <span className="description__text--breack">we've got you covered</span>
          </p>
          <p className="description__subtitle">
            Search for any subject you can imagine, a specialized tutor will help you with your problem
          </p>
        </div>
        <Player
          autoplay
          loop
          src="https://assets2.lottiefiles.com/packages/lf20_dikusanq.json"
          className="description__illustration"
        ></Player>
      </section>
    </>
  );
}

export { LandingPageDescription };
