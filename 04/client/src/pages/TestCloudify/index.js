import axios from "axios";
import { useState } from "react";

function TestCloudify() {
  const [username, setUsername] = useState('');
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    console.log(e.target);
    console.dir(e.target);
    console.log(e.target.files[0]);
    
    // readFile(e.target.files[0]);
    setFile(e.target.files);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData()
    data.append('username', username);
    for (let i = 0; i < file.length; i++) {
      data.append(`file_${i}`, file[i], file[i].name);
    }

    const res = await axios.post(process.env.REACT_APP_HEROKU_URL, data, {
      headers: {'Content-Type': 'multipart/form-data'}
    })
    console.log('res post data', res);
  }
  
  const readFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target.result)
    reader.onload = (e) => {console.log(e.target.result)}

    reader.readAsDataURL(file)
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>usuario</label>
        <input name='username' id='username' value={username} onChange={e=>setUsername(e.target.value)}/>
        <label htmlFor='file'>file</label>
        <input 
          type='file'
          accept='image/*, video/*' 
          multiple
          name='file' 
          id='file' 
          onChange={handleChange}/>
          <button>Enviar</button>
      </form>
      { !!image && <img src={image} alt='uploading preview'/> }
    </div>
  );
}

export default TestCloudify;