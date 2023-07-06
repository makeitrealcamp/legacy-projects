import Search from "../components/SearchInstructorCourses";
import EditCourseInstructor from "../components/EditCourseInstructor";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Ring } from "@uiball/loaders";
import CreateCourseTitle from "../components/CreateCourseTitle";

function InstructorCourses() {
  const [loading, setLoading] = useState(true);
  const [modalCreateCourse, setModalCreateCourse] = useState(false);
  const user = useSelector((state) => state.UserInfo);
  
  useEffect(() => {
    if (user.fullName) {
      setLoading(false);
    }
  }, [user.fullName]);

  const hanldeModalCreateCourse = () => {
    setModalCreateCourse(!modalCreateCourse);
    if (!modalCreateCourse) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = null;
    }
  };
  return (
    <>
      <div className="main-container-instructor-courses-page">
        <CreateCourseTitle
          handle={hanldeModalCreateCourse}
          visible={modalCreateCourse}
        />
        <h2 className="title-instructor-courses-page">Courses</h2>
        <div className="container-search-new-course">
          <Search />
          <button
            onClick={hanldeModalCreateCourse}
            className="link-btn-instructor-courses-page"
          >
            New course
          </button>
        </div>
        <div className="container-edit-course-instructor">
          {loading ? (
            <div className="container-loader-instructor-courses">
              <Ring size={60} color="#231F20" />
            </div>
          ) : (
            user.teacherCourses.map((item) => {
              return (
                <EditCourseInstructor
                  key={item._id}
                  id={item._id}
                  title={item.title}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default InstructorCourses;
