import React, { useEffect } from 'react';
import { LandingPageDescription } from '../components/LandingPageDescription';
import { TutorsContainer } from '../components/TutorsContainer';
import '../assets/styles/pages/landing-page.scss';
import { useSelector } from 'react-redux';

function LandingPage(props) {
  const state = useSelector((state) => state);

  useEffect(() => {
    if (state.token !== null) {
      props.history.replace('/home');
    }
  }, [state.token, props.history]);

  return (
    <div className="page">
      <main className="page__inner">
        <LandingPageDescription />
        <TutorsContainer title="Meet some of our best tutors" />
      </main>
    </div>
  );
}

export { LandingPage };
