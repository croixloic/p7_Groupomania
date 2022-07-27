import React, { useState } from "react";
import axios from "axios";

const PostsCreate = (props) => {
  const [content, setContent] = useState("");
  const [images, setImages]= useState()
  
  const handleFile = (e) =>{
    setImages ( e.target.files[0])
  };
  const handleCreate = (e) => {
    e.preventDefault();
    
    

    let formData = new FormData();

    formData.append = ('images', images)
    formData.append = ("content", content)


    if (content === "") {
      alert("veuillez mettre un message !");
    } else {
      axios.post(`${process.env.REACT_APP_API_URL}post`, {    //content
        content, images
      }).then (()=> {
        props.Posts()
      })
    }
  };

  return (
    <>
      <form action="" onSubmit={handleCreate} id="form-post">
        <textarea
          name="content"
          id="content"
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <input type="file" name="images" id="images" onChange={(e) => {handleFile(e)}} />
        <input type="submit" value="Envoyer"></input>
      </form>
    </>
  );
};

export default PostsCreate;