import imagePlaceHolder from "../../images/placeHolderUpdateImage.jpg";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Ring } from "@uiball/loaders";

function PromotionalSource({ accept, id, video, action, keyObj, value }) {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [loader, setLoader] = useState(false);

 

  const handleSubmit = async (img) => {
    setLoader(true);
    const data = new FormData();
    for (let i = 0; i < img.length; i++) {
      data.append(`file_${i}`, img[i], img[i].name);
    }

    const res = await axios.post(process.env.REACT_APP_HEROKU_URL, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    action(keyObj, res.data.file_0);
    setLoader(false);
  };

  const readFile = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => setImage(e.target.result);

    reader.readAsDataURL(file);
  };

  const handleChange = (event) => {
    readFile(event.target.files[0]);
    setFile(event.target.files);
    handleSubmit(event.target.files);
  };
  return (
    <div className="main-container-promotional-source">
      {loader ? (
        <div className="container-loader-promotionalSource">
          <Ring size={35} color="#231F20" />
        </div>
      ) : null}
      {video ? (
        value && image === null ? (
          <video className="source-promotional" controls width="100%">
            <source src={value} type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
          </video>
        ) : image !== null ? (
          <div className="source-video-promotional-source">
            <p>
              Save the changes in order to complete the upload of your file.
              Once you save it, we will process it to ensure it works smoothly
              on Udemy.
            </p>
          </div>
        ) : (
          <img
            src={imagePlaceHolder}
            alt="previo-source"
            className="source-promotional-source"
          />
        )
      ) : (
        <img
          src={value ? value : imagePlaceHolder}
          alt="previo-source"
          className="source-promotional-source"
        />
      )}
      <div className="container-promotional-source">
        <input
          id={id}
          type="file"
          accept={accept}
          className="input-promotional-source"
          onChange={handleChange}
        ></input>
        <label htmlFor={id} className="label-input-promotional-source">
          <span>Upload File</span>
        </label>
      </div>
    </div>
  );
}
export default PromotionalSource;
