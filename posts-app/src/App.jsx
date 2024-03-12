import "./App.css";
import {
  BrowserRouter,
  Link,
  Route,
  Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";

import { useEffect, useState } from "react";
import PostForm from "./pages/PostForm";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";

function App() {
  const [posts, setPosts] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      const posts = await axios.get("http://localhost:3000/posts");
      console.log(posts.data);

      setPosts(posts.data.reverse());
      setIsLoading(false);
    }

    fetchPosts();
  }, []);
  let [userId, setUserId] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log(token);
    if (token) {
      const decoded = jwtDecode(token);
      console.log(decoded["sub"]);
      userId = decoded["sub"];
      console.log(userId);
      setUserId(userId);
    }
  }, []);

  const handleAddPost = (post) => {
    const newPosts = [...posts];
    newPosts.unshift(post);
    setPosts(newPosts);
  };

  const handleEditPost = (post) => {
    const newPosts = [...posts];
    const index = newPosts.findIndex((p) => p.id === post.id);
    newPosts[index] = { ...newPosts[index], ...post };
    setPosts(newPosts);
  };

  const handleDelete = (post) => {
    const newPosts = posts.filter((p) => p.id !== post.id);
    setPosts(newPosts);
  };

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Navbar userId={userId} setUserId={setUserId}></Navbar>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                posts={posts}
                handleDelete={handleDelete}
                loading={isLoading}
              ></Home>
            }
          ></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route
            path="/auth"
            element={
              <Home
                posts={posts}
                handleDelete={handleDelete}
                userId={userId}
                loading={isLoading}
              ></Home>
            }
          ></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route
            path="auth/posts/:id"
            element={
              <PostForm
                posts={posts}
                handleEditPost={handleEditPost}
                handleAddPost={handleAddPost}
              ></PostForm>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
