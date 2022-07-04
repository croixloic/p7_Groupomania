import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PostsRead = () => {

    const [posts, setPosts]= useState([]);
    const [user, setUser] = useState([]);

    const Posts = () => {

        axios.get(`${process.env.REACT_APP_API_URL}post`)
        .then ((res) =>{
            setPosts(res.data.post)
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }
    //   const User = () => {

    //       axios.get(`${process.env.REACT_APP_API_URL}user`)
    //       .then((res) => {
    //           setUser(res) 
    //           console.log(res);
    //       }).catch((err) => {
    //           console.log(err);
    //       })
    //   }
    

    useEffect (() => {
        Posts();
    }, [])

    return (
        
        <div>
            <h1> Les posts</h1>

            {posts.map((element) => (
                <div className= "post">
                    <p>{element.content}</p>
                </div>
            ))}

        </div>
    );
};

export default PostsRead;