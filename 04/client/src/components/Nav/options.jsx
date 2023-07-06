import React from "react";
import { Link } from 'react-router-dom';

function Options(){

    return(
        <div className="nav-main-options">
            <span className="nav-path"></span>
            <div className="nav-options-visible">
                
            <ul className="nav-main-ul">

              <Link to='./'>
                <div className="main-container">
                  <li className="main-li">
                    Development
                  </li>
                </div>
              </Link>


                <Link to='./'>
                  <div className="main-container">
                    <li className="main-li">
                    IT & Software
                  </li>
                </div>
                </Link>


                <Link to='./'>
                  <div className="main-container">
                    <li className="main-li">
                    Design
                  </li>
                </div>
                </Link>

                <Link to='./'>
                  <div className="main-container">
                    <li className="main-li">
                    Marketing
                  </li>
                </div>
                </Link>

            </ul>
            </div>
        
        </div>
    )
}
export default Options;