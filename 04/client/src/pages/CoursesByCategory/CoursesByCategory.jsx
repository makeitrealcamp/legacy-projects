import Nav from '../../components/Nav/index';
import Footer from '../../components/Footer/index';
import CourseCard from "../../components/CourseCard/CourseCard";
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CoursesByCategory(){
  const [courses, setCourses] = useState([])
  let category = useParams();

  console.log('category de params:', category.Category)

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_HEROKU_URL}/courses`
    ).then((res) => {
      const allCourses = res.data.data
      console.log('allcourses:', allCourses)
    
      const coursesByCategory = allCourses.filter(function (item) {
        return item.category === category.Category
      })
      console.log('coursesBycategory', coursesByCategory)
      
      setCourses(coursesByCategory)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
    })
  }, [])

    return(
        <div>
          <Nav />
          <div className="category-title-container">
            <h2>{category.Category} Courses</h2>
          </div>
          <div className='coursesbycategory-container'>
            {courses.length > 0 ? 
              (courses.map((item)=>{
                return(
                  <CourseCard
                  img={item.image}
                  title={item.title}
                  teacher={item.courseOwner.fullName}
                  price={item.price}
                  rating={4.5}
                  lastUpdate={item.primaryTaught}
                  id={item._id}
                  //totalHours={item.totalHours}
                  level={item.level}
                  subtitle={item.subtitle}
                  description={item.description}
                  />
                )
              })) : <p>No courses yet</p>
            }   
          </div>
          <Footer/>
        </div>

    )
}
export default CoursesByCategory;