import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommenteCreate from './CommenteCreate';
import { Link } from "react-router-dom";

const SinglePost = () => {
  const params = useParams();

  const [post, setPost] = useState({});
  const [updated, setUpdated] = useState(false)
  const [textUpdated, setTextUpdated] = useState(null);
  const [UserCo, setUserCo] = useState();

  const GetUser = () => {
    axios
    .get(`${process.env.REACT_APP_API_URL}user/profil` )
    .then((res) => {
      console.log(res.data);
      setUserCo(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const Comment = () => {

    axios
    .get(`${process.env.REACT_APP_API_URL}post/` + params.id)
    .then((post) => {
      axios
      .get(`${process.env.REACT_APP_API_URL}comment/` + params.id)
      .then((comment, UserCo) => {
         console.log(comment.data);
         GetUser();
        setPost({ ...post.data, comments: comment.data });
      });
    });
  }
    useEffect(() => {
      Comment();
      GetUser();
  }, []);
  
  const commentDelete = (comments) => {
    console.log(comments);
    axios.delete(`${process.env.REACT_APP_API_URL}comment/` + comments)
    .then((res) => {
      console.log(res);
      Comment();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const commentModify =(comments) => {
    if (textUpdated === "") {
      alert("veuillez mettre un message !"); 
    } else {
      axios.put(`${process.env.REACT_APP_API_URL}comment/` + comments, {
        content: textUpdated,
      }).then((res) => {
        setUpdated(false);
        Comment();
      }).catch((err) => {
        console.log(err);
      });
    }
  };

  return (
    <div className='Comments'>
      <Link to={`/`}  >⬅️ Précédent</Link>
      <div className='Container'>

      <p className='Post'>{post.content}</p>
      <img src={post.images} alt=""/>

      </div >
        < CommenteCreate to={`/post/${params.id}`} commentaire= {Comment}  />
      <ul>
        {post.comments &&
          post.comments.map((comment) => ( 
          <div className='Comment' key={comment.id}> 
          <em>{comment.user.firstName} {comment.user.lastName}</em>
          {updated === false && (
            <p>{comment.content}</p>
          )}
          {updated && (
                        <div  >
                        <textarea
                          defaultValue={comment.content}
                          onChange={(e) => setTextUpdated(e.target.value)}
                        />
                        <div>
                          <button className="btn" onClick={() => {
                               commentModify(comment.id)}}>Valider la modification</button>
                        </div>
                      </div>
          )}
          {UserCo.user && (comment.data.length.userId === UserCo.id || UserCo.admin === true ) ?
          <button onClick={() => commentDelete(comment.id)}>Supprimer
          </button>: null}
          {UserCo.user && (comment.data.length.userId === UserCo.id || UserCo.admin === true ) ?
          <button onClick={() => {setUpdated(!updated)}}>Modifier</button>: null}

          </div>
          ))}
      </ul>
    </div>
  );
};

export default SinglePost;