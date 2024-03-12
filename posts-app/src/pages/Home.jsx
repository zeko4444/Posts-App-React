import React, { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";

import Post from "../components/Post";
import axios from "axios";

export default function Home(props) {
  let { posts, handleDelete, loading } = props;
  console.log(props);
  console.log(loading);
  let location = useLocation();

  let path = location.pathname;

  return (
    <>
      {path === "/auth" ? (
        <Link
          to={"posts/add"}
          className="bg-blue-800 m-auto mt-4 px-5 py-2 rounded flex justify-center items-center w-56 text-white"
        >
          add new post
        </Link>
      ) : (
        ""
      )}

      <Post posts={posts} handleDelete={handleDelete} loading={loading}></Post>
    </>
  );
}
