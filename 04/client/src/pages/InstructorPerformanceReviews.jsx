import { useNavigate, useSearchParams } from "react-router-dom";

function InstructorPerformanceReviews(){
    const [searchParams, setSearchParams] = useSearchParams();
    const ref = searchParams.get('ref_payco')
    const navigate = useNavigate()

    const timer = setTimeout(()=>{
        navigate('/home/my-courses/learning');
        clearTimeout(timer);
    },700)
    
    return(
        <>

            <h2 className="title-performance-instructor">Reviews</h2>
            <h3>{`${ref}`}</h3>

            <div className="main-container-students-instructor">  
            </div>
        

        </>
    )
}

export default InstructorPerformanceReviews;