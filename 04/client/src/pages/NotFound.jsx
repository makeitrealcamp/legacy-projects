import React from "react";
import Nav from '../components/Nav/index'
import Footer from '../components/Footer/index'
import ('../styles/pages/NotFoundStyle.scss')

function NotFound() {
  return (
    <div className="notfound-container">
      <Nav />
      <img
      className="notfoundimage"
      src={require("../images/TopCategoriesHomeImages/udemy-notfound-img.png")}
      alt="not found" />
      <Footer />
    </div>
  )
}

export default NotFound;
