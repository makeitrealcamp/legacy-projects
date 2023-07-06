import Nav from '../components/Nav/index';
import Footer from '../components/Footer/index';
import MyLearningTabs from '../components/MyLearningTabs/index'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MyLearning(){
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        axios.get(process.env.REACT_APP_HEROKU_URL+'/courses/test' || 'http://localhost:8081/courses/test', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then((courses) => {
            console.log('cursos por usuario modif:', courses.data.data)
            setCourses(courses.data.data)
        })
        .catch(err => console.log(err))
        .finally(()=>{
            console.log('Este es el finally');
            setLoading(false);
          })
    },[])

    const handleClick = (course) => {
        console.log('curso click', course);
    }

    return(
        <div>
            <Nav />
            <MyLearningTabs />
            {loading?<p>No hay datos</p>:courses.map((course) => (
                <>
                    <h1 onClick={()=>handleClick(course)}>{course.title}</h1>
                    <h2>{course.subtitle}</h2>
                    <Link
                        to={{
                        pathname: "/test-courseView",
                        search: `?id=${course._id}`,
                        state: { fromHome: true },
                        someState: 'some text'
                        }}
                    >
                        Go to Course
                    </Link>
                </>
            ))}
            <Footer/>
        </div>

    )
}
export default MyLearning;
