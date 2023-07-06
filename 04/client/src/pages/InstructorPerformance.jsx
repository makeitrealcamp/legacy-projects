import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
function InstructorPerformance(){
    const [font,setFont] = useState(1)

    const params = "overviews"
    return(
        <>
        <div className="main-container-instructor-performance-page">
            <ul className='ul-performance-instructor'>
                <Link to='/instructor/performance/overview' className={font === 1 ?"link-performance-instructor link-performance-instructor-font-weight-700" : "link-performance-instructor"}  onClick={()=>setFont(1)}>Overview</Link>
                <Link to='/instructor/performance/students' className={font === 2 ?"link-performance-instructor link-performance-instructor-font-weight-700" : "link-performance-instructor"}  onClick={()=>setFont(2)}>Students</Link>
                <Link to='/instructor/performance/reviews'  className={font === 3 ?"link-performance-instructor link-performance-instructor-font-weight-700" : "link-performance-instructor"}  onClick={()=>setFont(3)}>Reviews</Link>
            </ul>
            <Outlet/>
        </div>
    
        </>
    )
}

export default InstructorPerformance;