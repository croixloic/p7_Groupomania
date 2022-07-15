import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostsCreate from './PostsCreate';

const PostsRead = () => {

    const [posts, setPosts]= useState([]);

    const Posts = () => {

        axios.get(`${process.env.REACT_APP_API_URL}post`)
        .then ((res) =>{
            setPosts(res.data.post)
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect (() => {
        Posts();
    }, [])

    const handleDelete = (postId) => {
        console.log(postId);
    
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

    return (
        
        <div>
            <h1> Les posts</h1>
            {posts.map((element) => (
        <div className="post">
          <em>{element.user.firstName} {element.user.lastName}</em>
          <p>{element.content} {element.date}</p>
          <Link to={`/post/${element.id}`}>Voir le post</Link>
          <button onClick={() => handleDelete(element.id)} >Supprimer</button>
        </div>
            ))}
            <PostsCreate Posts={Posts} />

        </div>
    );
};

export default PostsRead;