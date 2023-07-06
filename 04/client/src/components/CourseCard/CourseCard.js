import { Link } from "react-router-dom";
import Ratings from 'react-ratings-declarative';
import { MdFavoriteBorder } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { addItemShop } from '../../store/ShopCourses.Slice'

function CourseCard({id,img,title,teacher,price,rating,level,subtitle}){
    //toca colocar el id por el mometo es undefined
    const dispatch = useDispatch()

    const addCourseLocal = ()=>{
        if(localStorage.getItem("CoursesShop") === null){
            localStorage.setItem("CoursesShop",JSON.stringify([]));
        }
        let courses = [localStorage.getItem("CoursesShop")]
        courses = JSON.parse(courses)
        const objCourse = {id,img,price,title}
        console.log('objCourse',objCourse)
        courses.push(objCourse)
        dispatch(addItemShop(objCourse))
        localStorage.setItem("CoursesShop",JSON.stringify(courses));
    }


    return(
        <div className="main-container-courseCard">
            <div className="img-container-courseCard">
                <img src={img} alt={title}/>
            </div>
            <Link to={`/courses/${title}`} className="title-courseCard"><h3>{title}</h3></Link>
            <p className="subtitle-courseCard">{subtitle}</p>
            {/*<p className="instructor-courseCard">Created by {teacher}</p>*/}
            <p className="level-courseCard"><strong> Level • </strong>{level}</p>
            <div className="container-rating-courseCard">
            <p className="courseCard-number-rating">{rating % 1 !== 0 ? rating : `${rating}.0`}</p>
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
            <p className="courseCard-price">USD${price}</p>
            <div className="container-add-favorite-courseCard">
                <button onClick={addCourseLocal} type="button" className="btn-add-cart-courseCard">Add to cart</button>
                {/* { ? <button onClick={addCourseLocal} type="button" className="btn-add-cart-course btn-course-in-your-shop ">in the cart</button> : null} */}
                <button type="button" className="btn-favorite-courseCard"><MdFavoriteBorder/></button>
            </div>

        </div>
        
    )
}

export default CourseCard;