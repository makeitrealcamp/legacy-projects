
import Ratings from 'react-ratings-declarative';
import { MdOutlineKeyboardArrowRight, MdSubtitles, MdLanguage } from 'react-icons/md'
import { BiCheck } from 'react-icons/bi'


function CourseInfo({mainCategory, courseTitle, courseSubtitle, rating, principalObjective, courseOwner, languageCourse, objectivesList, courseDescription}) {

    //const listItems = objectivesList.map((item) => <li><BiCheck />{item.val}</li>);

    return (
        <div className='principal-container'>
            <div className="main-content">
                <div className="course-categories">
                    <p>{mainCategory}</p>
                </div>
                <div className="course-title">
                    <h1>{courseTitle}</h1>
                </div>
                <div className="course-subtitle">
                    <h2>{courseSubtitle}</h2>
                </div>
                <div className="container-rating-course">
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
                    {/*<p>{`(${ratings} ratings)`}</p>
                    <p className="total-students">{totalStudents} students</p>*/}
                </div>
                <div className="created-by-container">
                    <p>{`Created by ${courseOwner}`}</p>
                </div>
                <div className='basic-information-container'>
                    <p><MdLanguage />{languageCourse} </p>
                </div>
            </div>
            <div className='second-content'>
                <div className='objectives-container'>
                    <h2>What you'll learn</h2>
                    <div className='objectives and primaryTaught-container'>
                        <h3>{principalObjective}</h3>
                        <ul>
                            {objectivesList?.map((item) => <li><BiCheck />{item.val}</li>)}
                        </ul>
                    </div>
                </div>
                <div className='curriculum-course-container'>
                    <h2>Course content</h2>
                </div>
                <div className='courseDescription-container'>
                    <h2>Description</h2>
                    <p>{courseDescription}</p>
                </div>
            </div>
            <div className='third-content'>

            </div>
        </div>
    )
}

export default CourseInfo;
