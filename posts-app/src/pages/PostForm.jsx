import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Input, Button } from "@material-tailwind/react";

export default function PostForm(props) {
  const { posts, handleEditPost, handleAddPost } = props;

  const location = useLocation();
  console.log(location.pathname);

  const { id } = useParams();

  const mode = id === "add" ? "add" : "edit";
  console.log("id", id);

  const post = posts.find((post) => post.id === id);

  const [data, setData] = useState({
    title: mode == "add" ? "" : post.title,
    body: mode == "add" ? "" : post.body,
  });
  let [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const onSubmitAdd = (data) => {
    console.log(data);
    console.log(userId);

    axios
      .post("http://localhost:3000/posts", { ...data, user: userId })
      .then((response) => {
        console.log(response.data);
        handleAddPost(response.data);
        navigate("/auth");
        toast.success("post added successfully");
      });
  };

  const onSubmitEdit = (data) => {
    axios
      .patch(`http://localhost:3000/posts/${post.id}`, {
        ...data,
        user: userId,
      })
      .then((response) => {
        handleEditPost(response.data);

        navigate("/auth");
        toast.success("post edited successfully");
      });
  };

  const handleChange = (e) => {
    let newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  return (
    <>
      <form
        onSubmit={
          mode === "add"
            ? handleSubmit(onSubmitAdd)
            : handleSubmit(onSubmitEdit)
        }
        className="w-64 m-auto mt-20"
      >
        <div className="flex flex-col ">
          <Input
            color="indigo"
            label="title"
            placeholder="title"
            className="border rounded px-2"
            {...register("title", {
              required: "this tilte requierd",
            })}
            onChange={handleChange}
            value={data.title}
          ></Input>
          <p className="text-red-600">{errors.title?.message}</p>
        </div>
        <div className="flex flex-col mt-3 ">
          <Input
            color="indigo"
            label="body"
            placeholder="body"
            className="border rounded px-2 "
            {...register("body", {
              required: "**body is required",
            })}
            onChange={handleChange}
            value={data.body}
          ></Input>
          <p className="text-red-600">{errors.body?.message}</p>
        </div>

        <button className="border mt-4 px-3 py-2 bg-blue-900 text-white rounded-lg  ">
          submit
        </button>
      </form>
    </>
  );
}
