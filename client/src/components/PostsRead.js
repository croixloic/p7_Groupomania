import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostsCreate from "./PostsCreate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const PostsRead = (props) => {
  const [posts, setPosts] = useState([]);
  const [updated, setUpdated] = useState(0);
  const [textUpdated, setTextUpdated] = useState(null);
  const [images, setImage] = useState();
  

  const Posts = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}post`)
      .then((res) => {
        setPosts(res.data.post);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    Posts();
  }, []);

  const handleDelete = (postId, userId) => {
    
    axios
      .delete(`${process.env.REACT_APP_API_URL}post/` + postId)
      .then((req) => {
        console.log(req.auth);
        Posts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFile = (e) => {
    setImage(e.target.files[0]);
  };

  const handleModify = (postId) => {
    console.log(textUpdated);
    if (textUpdated === "") {
      alert("veuillez mettre un message !");
    } else {
      const formData = new FormData();

      formData.append("image", images);
      formData.append("content", textUpdated);
      axios
        .put(`${process.env.REACT_APP_API_URL}post/` + postId, formData)
        .then((res) => {
          setUpdated(0);
          Posts();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const likePost = (postId) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}post/likes/` + postId)
      .then((res) => {
        Posts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="PostRead">
      <PostsCreate Posts={Posts} />
      <h1>fil d'actualités</h1>
      {posts.map((element) => (
        <div className="post" key={element.id}>
          <em>
            {element.user.firstName} {element.user.lastName}
            <br />
          </em>
          <br />
            <p>
              {element.content} 
            </p>
          <div className="picture">
          <img src={element.images} alt=""/>
          </div>
          <div className="socialAction">
            <button
              className="socialActionBtn"
              onClick={() => likePost(element.id)}
            >
              <FontAwesomeIcon className="socialActionIcon" icon={faThumbsUp} />
            </button>
            <p>{element.likes} j'aime</p>
          </div>
          {updated === element.id && (
            <div>
              <textarea 
                className="textAreaModify"
                defaultValue={element.content}
                onChange={(e) => setTextUpdated(e.target.value)}
              />
              <br /> 
              <input
                type="file"
                name="images"
                id="images"
                onChange={(e) => handleFile(e)}
              ></input>
              <div className="ValideModify">
                <button
                  className="btnValideModify"
                  onClick={() => {
                    handleModify(element.id);
                  }}
                >
                  Valider la modification
                </button>
              </div>
            </div>
          )}
          <div className="btnPutDelete">
          
          {props.user && (element.userId === props.user.id || props.user.admin === true)? <button
            onClick={() => {
              handleDelete(element.id, element.user);
            }}
            >
            Supprimer
          </button>: null}
          {props.user && (element.userId === props.user.id || props.user.admin === true)? 
          <button
            onClick={() => {
              setUpdated(updated === element.id ? 0 : element.id);
            }}
          >
            Modifier
          </button>: null}
          <br />
          </div>
          <Link to={`/post/${element.id}`} >Afficher plus...</Link>
        </div>
      ))}
    </div>
  );
};

export default PostsRead;
