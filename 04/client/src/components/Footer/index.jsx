import React from 'react';
import './footer.css';
import udemy from '../../images/udemy.png';
import { useState } from 'react';
import LanguageModal from '../LanguageModal';

function Footer(){
    const [langModal, setLangModal] = useState(false);
    const handleLanguageModal = (e) => {
        e.preventDefault();
        setLangModal(langModal => !langModal);
      }

  return(
    <footer>
    <div className="f1">
        <div className="box">
            <p>Udemy Business</p>
            <p>Teach on Udemy</p>
            <p>Get the app</p>
            <p>About us</p>
            <p>Contact us</p>
        </div>
        <div className="box">
            <p>Carrers</p>
            <p>Blog</p>
            <p>Help and Support</p>
            <p>Affiliate</p>
            <p>Investors</p>
        </div>
        <div className="box">
            <p>Terms</p>
            <p>Privacy policy</p>
            <p>Cookie settings</p>
            <p>Sitemap</p>
            <p>Accessibility statement</p>
        </div>
        <div className="box lang">
            <div className="both" onClick={handleLanguageModal}>
                <span>🌐 </span>
                {/* <img src="./assets/globe.png" alt="globe">  */}
                <p>English</p>
            </div>
        </div>
    </div>
    <div className="f2">
        <div className="box">
          <img src={udemy} alt='imagen udemy'/>
        </div>
        <div className="box">
            <p>© 2022 Udemy, Inc.</p>
        </div>
    </div>
    {langModal?<LanguageModal handleLanguageModal={handleLanguageModal}/>:null}
</footer>
  )
}
export default Footer;
