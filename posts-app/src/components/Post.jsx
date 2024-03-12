import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Post(props) {
  let { posts, handleDelete, loading } = props;

  const handleDeletePost = (post) => {
    console.log(post);

    if (confirm(`Are you sure you want to delete this post`)) {
      async function deletePost() {
        axios
          .delete(`http://localhost:3000/posts/${post.id}`)
          .then((response) => {
            handleDelete(post);
            toast.success("post deleted successfully");
          })
          .catch((err) => {
            toast.error("somthing went wrong , try again later");
          });
      }

      deletePost();
    }
  };

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

  if (loading)
    return (
      <span className="block m-auto mt-52 loading loading-spinner loading-lg"></span>
    );

  return (
    <>
      {posts.map((post) => (
        <div
          className="flex justify-center items-center flex-col gap-4 mt-8 m-auto max-w-[35rem] relative"
          key={post.id}
        >
          <Card className="mt-6">
            <CardHeader color="blue-gray" className="h-60 mt-8 ">
              <img
                src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="card-image"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {post.title}
              </Typography>
              <Typography>{post.body}</Typography>
            </CardBody>
            {userId == post.user ? (
              <>
                <div className="absolute top-2 right-0 flex gap-3">
                  <button onClick={() => handleDeletePost(post)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6  text-red-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                  <Link to={`posts/${post.id}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-blue-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </Link>
                </div>
                {/* <div>
                  <button onClick={() => handleDeletePost(post)}>delete</button>
                  <Link to={`posts/${post.id}`}>update</Link>
                </div> */}
              </>
            ) : (
              <span></span>
            )}
          </Card>
        </div>
      ))}
    </>
  );
}
