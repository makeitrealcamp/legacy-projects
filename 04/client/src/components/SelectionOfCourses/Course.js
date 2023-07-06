import { Link, useNavigate } from "react-router-dom";
import Ratings from 'react-ratings-declarative';

function Course({id,img,title,teacher,price,rating,lastUpdate,totalHours,level,subtitles,description}){
    //toca colocar el id por el mometo es undefined
    const navigate = useNavigate()



    return(
        <div onClick={()=> navigate('/')} className="main-container-course">
            <img src={img} alt={title}/>
            <h3 className="course-title">{title}</h3>
            <p className="course-teacher">{teacher}</p>
        <div className="container-rating-course-slider">
            <p className="course-number-rating">{rating % 1 !== 0 ? rating : `${rating}.0`}</p>
            <Ratings
                rating={rating}
                widgetDimensions="14px"
                widgetSpacings="1px"
                widgetEmptyColors='#ffffff'
            >
                <Ratings.Widget widgetRatedColor="#e59819"/>
                <Ratings.Widget widgetRatedColor="#e59819" />
                <Ratings.Widget widgetRatedColor="#e59819" />
                <Ratings.Widget widgetRatedColor="#e59819" />
                <Ratings.Widget widgetRatedColor="#e59819" />
            </Ratings>
        </div>
            <p className="course-price">${price}</p>
        </div>
        
    )
}

export default Course;