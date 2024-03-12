import React, { useEffect, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function NavbarDefault(props) {
  const { userId, setUserId } = props;

  console.log("ss", userId);
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();
  // let [path, setPath] = useState("");
  // let path = "";

  let location = useLocation();
  const { id } = useParams();
  console.log(id, `${id}`);

  let path = location.pathname;
  console.log("path", path);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium text-white"
      >
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        ></svg>
        {path == "/login" || path == "/register" || path == "/" ? (
          <Link to={"/"}>Home</Link>
        ) : (
          <Link to={"/auth"}>Home</Link>
        )}
      </Typography>
    </ul>
  );

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUserId("");
    navigate("/login");
  };

  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4 bg-blue-900 ">
      <div className="container mx-auto flex items-center justify-between text-white ">
        <Typography className="mr-4 cursor-pointer py-1.5 font-medium">
          POSTS APP
        </Typography>
        <div className="hidden lg:block">{navList}</div>

        <div className="flex items-center gap-x-1">
          {path == "/" ? (
            <Link to={"/login"}>
              <span>login</span>
            </Link>
          ) : location.pathname == "/auth" ? (
            <span onClick={handleLogout} className="hover:cursor-pointer">
              Logout
            </span>
          ) : (
            <span></span>
          )}
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
     
    </Navbar>
  );
}
