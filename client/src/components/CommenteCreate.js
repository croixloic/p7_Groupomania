import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CommenteCreate = () => {
    const params = useParams();
    const [content, setContent] = useState("");
    const handleCreateComment = (e) => {
        e.preventDefault();

        if (content === "") {
            alert("Le commentaire est vide ")
        } else {
            axios.post(`${process.env.REACT_APP_API_URL}comment/` + params.id, {
                content,
            });
        }
    };
    return (
        <div>
            <form action='' onSubmit={handleCreateComment } id="form-comment">
                    <textarea
                    name="content"
                    id="content"
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                  <input type="submit" value="Envoyer"></input>
                </form>
            
        </div>
    );
};

export default CommenteCreate;