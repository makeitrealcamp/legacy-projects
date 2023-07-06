import React from 'react';
import Footer from '../components/Footer'
import Nav from '../components/Nav';
import AlternateHeadline from '../components/AlternateHeadline';
import TitleHeading from '../components/TitleHeading';
import headingImg from '../images/Title-heading.png';
import headingImgPhone from '../images/Title-heading-movil.png';
import TopCategoriesHome from '../components/TopCategoriesHome';
import BecomeInstructor from '../images/BecomeInstructor.jpg';
import BecomeInstructorMobile from '../images/BecomeInstructorMobilejpg.jpg'
import BecomeInstructorHome from '../components/BecomeInstructorHome/index';
import SelectionCourses from '../components/SelectionOfCourses';
import { useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux';


function Home(){
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate()
  const userInfo = useSelector((state)=> state.UserInfo)

  return(
    <div className="home-container">
      <Nav
        userAuth0={isAuthenticated?user:null}
      />
      
      <TitleHeading
        title='Last day for these savings!'
        text='Courses that meet today’s challenges (and tomorrow’s). They start at just COL$39,900. Sale ends today.'
        img={headingImg}
        alt='illustration'
        imgPhone={headingImgPhone}
      />
      <AlternateHeadline
      title='A broad selection of courses'
      info='Choose from 204,000 online video courses with new additions published every month'
      />
      <SelectionCourses />
      <TopCategoriesHome
      title='Top Categories'
      />
      {!userInfo.isInstructor
      ?
      <BecomeInstructorHome 
      img={BecomeInstructor}
      title='Become an instructor'
      info='Instructors from around the world teach millions of students on Udemy. We provide the tools and skills to teach what you love.'
      btn='Start teaching today'
      imgMobile={BecomeInstructorMobile}
    />
    :
    null
    }
      <Footer />
    </div>
  )
}

export default Home;
