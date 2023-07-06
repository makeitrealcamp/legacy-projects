
import CourseInfo from "../../components/CourseInfo/CourseInfo"
import Footer from "../../components/Footer";
import Nav from "../../components/Nav/index"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Course = () => {
    const [course, setCourse] = useState({})
    let courseTitle = useParams();
    console.log('courseTitle de params:', courseTitle.courseTitle)

    useEffect(() => {
      axios.get(`${process.env.REACT_APP_HEROKU_URL}/courses`
      ).then((res) => {
        const allCourses = res.data.data
        console.log('allcourses:', allCourses)  
        const coursesByTitle = allCourses.filter(function (item) {
        return item.title.toLowerCase() === courseTitle.courseTitle.toLowerCase()
        })
        console.log('coursesByTitle', coursesByTitle)
        setCourse(coursesByTitle[0])
        console.log('course:', course)
        console.log('objectives array', course.learningObjectives)
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
      })
    }, [])

    return (
        <>
        <Nav />
            <CourseInfo 
                mainCategory= {course.category}
                courseTitle={course.title}
                courseSubtitle={course.subtitle}
                rating={4.4}
                courseOwner={course.courseOwner}
                languageCourse={course.language}
                objectivesList={course.learningObjectives}
                courseDescription={course.description}
                principalObjective={course.primaryTaught}
            />
        <Footer />
        </>
    )
}

export default Course;