import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PostsRead from "../components/PostsRead";
import axios from "axios";



const Home = () => {
  const [UserCo, setUserCo]= useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.token) {
      navigate("/login");
    }
      axios
        .get(axios.get(`${process.env.REACT_APP_API_URL}user/` ))
        .then((res) => {
          setUserCo(res);
          console.log(UserCo);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [navigate]);

  return (
    <div className="home-page">
      <Header />
      <PostsRead />
      
    </div>
  );
};

export default Home;
