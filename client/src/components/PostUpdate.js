import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostUpdate = () => {
    const [modify, setModify] = useState ({content: ""})

    const handleUpdate = (e) => {
        e.preventDefault();
//condition du bon créateur du post
        if (content === ""){
            alert("veuillez mettre un message !");
        } else {
            
            const Update = () => {
                axios.put(`${process.env.REACT_APP_API_URL}post`, {
                    content,
                })
                .then((res) => {
                    // setModify(res)
                    console.log(res);
                }). catch((err) => {
                    console.log(err);
                })
            }
        }
    useEffect (() => {
        Update();
    }, [])
}
    return (
        <div>
            <form action='' onSubmit={handleUpdate}>
                <input type="submit" value='Modifier'></input>
            </form>
        </div>
    );
};

export default PostUpdate;