import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SinglePost = () => {
  const params = useParams();

  // params.id

  const [post, setPost] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}post/` + params.id)
      .then((post) => {
        axios
          .get(`${process.env.REACT_APP_API_URL}comment/` + params.id)
          .then((comment) => {
            setPost({ ...post.data, comments: comment.data });
          });
      });
  }, [params]);

  console.log(post);

  return (
    <>
      <h1>{post.content}</h1>

      <ul>
        {post.comments &&
          post.comments.map((comment) => <li>{comment.content}</li>)}
      </ul>
    </>
  );
};

export default SinglePost;