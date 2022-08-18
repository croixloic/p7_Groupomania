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
        .get(`${process.env.REACT_APP_API_URL}user/profil` )
        .then((res) => {
          console.log(res);
          setUserCo(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      }, [navigate]);
      console.log(UserCo);

  return (
    <div className="home-page">
      <Header />
      <PostsRead user={UserCo}/>
      
    </div>
  );
};

export default Home;
