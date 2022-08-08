import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostsCreate from "./PostsCreate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp} from '@fortawesome/free-solid-svg-icons'

const PostsRead = () => {
  const [posts, setPosts] = useState([]);
  const [updated, setUpdated] = useState(false);
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

  const handleDelete = (postId) => {

    axios
      .delete(`${process.env.REACT_APP_API_URL}post/` + postId)
      .then((res) => {
        console.log(res);
        Posts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFile = (e) => {
    setImage (e.target.files[0])
  }

   const handleModify = (postId) => {

     
     
     console.log(textUpdated);
     if (textUpdated === "") {
       alert("veuillez mettre un message !"); 
      } else {
        const formData = new FormData ();
    
        formData.append("image", images)
        formData.append('content', textUpdated)
        axios 
     .put(`${process.env.REACT_APP_API_URL}post/` + postId,
      formData
     )
       .then((res) => {
        setUpdated(false);
        console.log(res);
         Posts();
       })
       .catch((err) => {
         console.log(err);
      });
    }
   };

   const likePost = (postId) => {
    axios.post (`${process.env.REACT_APP_API_URL}post/likes/` + postId ,
    )
    .then((res) => {
      console.log(res);
      Posts();
    })
    .catch((err) => {
      console.log(err);
    })
   } 

  return (
    <div>
      <h1> Les posts</h1>
      <PostsCreate Posts={Posts} />
      {posts.map((element) => (
        <div className="post">
          <em>
            {element.user.firstName} {element.user.lastName}
          <img src={element.images} />
          </em>
          {updated === false && (
            <p>
              {element.content} {element.date}
            </p>
          )}
          <div className="socialAction"> 
          <button className="socialActionBtn" onClick={() => likePost (element.id)}>

          <FontAwesomeIcon className="socialActionIcon"  icon={faThumbsUp}/>
          </button>
          <p>{element.likes} j'aime</p>
          </div>
          {updated && (
            <div >
              <textarea
                defaultValue={element.content}
                onChange={(e) => setTextUpdated(e.target.value)}
              />
                <input type='file' name="images" id="images" onChange={(e) => handleFile(e)}></input>
              <div>
                <button className="btn" onClick={() => {
                     handleModify(element.id)}}>Valider la modification</button>
              </div>
            </div>
          )}
          <Link to={`/post/${element.id}`}>Voir le post</Link>
          <button onClick={() => handleDelete(element.id)}>Supprimer</button>
          <button onClick={() =>{ setUpdated (!updated)}} >Modifier</button>
        </div>
      ))}
    </div>
  );
};

export default PostsRead;
