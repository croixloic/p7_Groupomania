import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommenteCreate from './CommenteCreate';

const SinglePost = () => {
  const params = useParams();

  const [post, setPost] = useState({});
  const [updated, setUpdated] = useState(false)
  const [textUpdated, setTextUpdated] = useState(null);

  const Comment = () => {

    axios
    .get(`${process.env.REACT_APP_API_URL}post/` + params.id)
    .then((post) => {
      axios
      .get(`${process.env.REACT_APP_API_URL}comment/` + params.id)
      .then((comment) => {
         console.log(comment);
        setPost({ ...post.data, comments: comment.data });
      });
    });
  }
    useEffect(() => {
      Comment();
  }, []);
  
  // console.log(post);
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
        textUpdated
      }).then((res) => {
        setUpdated(false);
        Comment();
      }).catch((err) => {
        console.log(err);
      });
    }
  };

  return (
    <>
      <h1>{post.content}</h1>

        < CommenteCreate to={`/post/${params.id}`} commentaire= {Comment}  />
      <ul>
        {post.comments &&
          post.comments.map((comment) => ( 
          <div className='comment'> 
          <em>{comment.user.firstName} {comment.user.lastName}</em>
          {updated === false && (
            <p>{comment.content}</p>
          )}
          {updated && (
                        <div >
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
          <button onClick={() => commentDelete(comment.id)}>Supprimer</button>
          <button onClick={() => {setUpdated(!updated)}}>Modifier</button>
          </div>
          ))}
      </ul>
    </>
  );
};

export default SinglePost;