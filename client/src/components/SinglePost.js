import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommenteCreate from './CommenteCreate';

const SinglePost = () => {
  const params = useParams();

  const [post, setPost] = useState({});

  const Comment = () => {

    axios
    .get(`${process.env.REACT_APP_API_URL}post/` + params.id)
    .then((post) => {
      axios
      .get(`${process.env.REACT_APP_API_URL}comment/` + params.id)
      .then((comment) => {
        // console.log(comment);
        setPost({ ...post.data, comments: comment.data });
      });
    });
  }
    useEffect(() => {
      Comment();
  }, []);
  
  console.log(post);
  const commentDelete = (comment) => {
    console.log(comment);

  }

  return (
    <>
      <h1>{post.content}</h1>

      <ul>
        {post.comments &&
          post.comments.map((comment) => <li>{comment.content}</li>)}
      <button onClick={() => commentDelete(params.id)}>Supprimer</button>
      </ul>
      < CommenteCreate to={`/post/${params.id}`} commentaire= {Comment}  />
    </>
  );
};

export default SinglePost;