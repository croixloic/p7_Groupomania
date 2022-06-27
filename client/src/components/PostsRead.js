import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PostsRead = () => {

    const [posts, setPosts]= useState([]);

    useEffect (() => {
        axios.get(`${process.env.REACT_APP_API_URL}post`)
        .then ((res) =>{
            setPosts(res.data.post)
        }).catch((err) => {
            console.log(err);
        })
    })
    return (
        
        <div>
            {posts.map((element) => (
                <div>
                    <p>{element.content}</p>
                </div>
            ))}

        </div>
    );
};

export default PostsRead;