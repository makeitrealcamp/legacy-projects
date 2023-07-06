import { FaBars } from "react-icons/fa";
import { useState } from "react";
import HamburguerCoursesPerformance from "./Hamburguer-courses-performance";
function MovileNavCoursesPerformance(){
    const [HamburguerCourses,setHamburguerCourses] = useState(false)
    document.addEventListener('click', function(event) {
        if(event.target.className === 'nav-close' || event.target.className === 'nav-opacity' ){
            setHamburguerCourses(false);
            document.body.style = null;
        }
    });
    return(
        <div className="main-container-nav-movile-courses-performance">
            {HamburguerCourses ? <HamburguerCoursesPerformance /> : null }
            <button type="button" className="button-hamburguer-nav-movile-courses-performance" onClick={()=>{
                setHamburguerCourses(true)
                document.body.style.overflow = "hidden"
            }}><FaBars /></button>
        </div>
    )
}
export default MovileNavCoursesPerformance;