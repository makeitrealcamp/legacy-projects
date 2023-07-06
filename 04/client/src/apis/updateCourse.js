import axios from "axios";

export const UpdateCourse = async (data, courseId) => {
  try{
    const petition = axios.put(
      `${process.env.REACT_APP_HEROKU_URL}/courses/${courseId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const res = await petition;
    return res;

  }catch(err){
    return false

  }
};
