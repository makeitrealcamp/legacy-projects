import axios from "axios";

export async function createCourse(data) {
  try {
    const petition = axios.post(
      `${process.env.REACT_APP_HEROKU_URL}/courses`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const res = await petition;
    return res;
  } catch (err) {
    return false;
  }
}
