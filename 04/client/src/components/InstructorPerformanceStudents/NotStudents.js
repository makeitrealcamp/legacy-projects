import { Link } from "react-router-dom";

function NotStudents(){
    return(
        <>
        <p className="not-students-p">No students yet...</p>
        <p className="not-students-p">Once you publish your course, come here to learn about your students</p>
        <Link to="/instructor/courses" className="link-not-students">Go to Instructor Dashboard</Link>
        </>
    )
}
export default NotStudents;