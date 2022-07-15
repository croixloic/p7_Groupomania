import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PostsRead from "../components/PostsRead";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.token) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div className="home-page">
      <Header />
      <PostsRead />
      
    </div>
  );
};

export default Home;
