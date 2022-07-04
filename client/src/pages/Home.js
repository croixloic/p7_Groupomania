import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PostsRead from "../components/PostsRead";
import PostsCreate from "../components/PostsCreate";

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
      <PostsCreate />
    </div>
  );
};

export default Home;
