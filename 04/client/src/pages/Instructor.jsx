import NavCoursesPerformance from "../components/NavCoursesPerformance";
import Footer from "../components/Footer";
import MovileNavCoursesPerformance from "../components/MovileNavCoursePerformance";
import {  Outlet } from "react-router-dom";

function Instructor(){
    return(
        

        <>
        <MovileNavCoursesPerformance/>
        <div className="main-container-instructor-courses-page">
            <NavCoursesPerformance 
            />
            <Outlet />
        </div>
        <div className="container-footer">
        <Footer/>
        </div>
        </>
    )
}

export default  Instructor;