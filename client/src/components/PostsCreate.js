import React, { useState } from "react";
import axios from "axios";

const PostsCreate = (props) => {
  const [content, setContent] = useState("");
  const handleCreate = (e) => {
    e.preventDefault();

    if (content === "") {
      alert("veuillez mettre un message !");
    } else {
      axios.post(`${process.env.REACT_APP_API_URL}post`, {
        content,
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
        <input type="submit" value="Envoyer"></input>
      </form>
    </>
  );
};

export default PostsCreate;