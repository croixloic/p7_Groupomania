import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PostDelete = () => {
  const params = useParams();
  const [drop, setDrop] = useState([]);

  const handleDelete = (e) => {
    e.preventyDefault();

    axios
      .delete(`${process.env.REACT_APP_API_URL}post` + params.id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="btn-delete">
      <form action="" onSubmit={handleDelete} id=" form-delete">
        <input type="submit" value="supprimer"></input>
      </form>
    </div>
  );
};

export default PostDelete;
