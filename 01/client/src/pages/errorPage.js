import React from 'react';
import '../assets/styles/pages/errorPage.scss';
import { Player } from '@lottiefiles/react-lottie-player';

function errorPage() {
  return (
    <div className="error-page">
      <Player
        autoplay
        loop
        src="https://assets2.lottiefiles.com/packages/lf20_ck8dimsp.json"
        className="error__illustration"
      ></Player>
    </div>
  );
}

export { errorPage };
