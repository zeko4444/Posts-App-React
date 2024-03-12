import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data.name);

    axios
      .post("https://api.escuelajs.co/api/v1/users", {
        ...data,
        avatar: "https://picsum.photos/800",
      })
      .then((response) => navigate("/login"));
  };
  return (
    <>
      <div className="m-auto w-96">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" className="text-blue-900 mt-10">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Nice to meet you! Enter your details to register.
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="flex flex-col">
              <Typography
                variant="h6"
                color="blue-gray"
                className="text-blue-900 mb-2"
              >
                Your Name
              </Typography>
              <Input
                {...register("name", {
                  required: "this name requierd",
                })}
                size="md"
                placeholder="name"
                className=" !border-blue-gray-200 focus:!border-blue-600"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <p className="text-red-600">{errors.name?.message}</p>

              <Typography
                variant="h6"
                color="blue-gray"
                className="text-blue-900 mt-8 mb-2"
              >
                Your Email
              </Typography>
              <Input
                {...register("email", {
                  required: "this email requierd",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                })}
                size="md"
                placeholder="name@mail.com"
                className=" !border-blue-gray-200 focus:!border-blue-600"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <p className="text-red-600">{errors.email?.message}</p>
              <Typography
                variant="h6"
                color="blue-gray"
                className="text-blue-900 mt-8 mb-2"
              >
                Password
              </Typography>
              <Input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 4,
                    message: "Password must be more than 4 characters",
                  },
                  maxLength: {
                    value: 12,
                    message: "Password cannot exceed more than 12 characters",
                  },
                })}
                type="password"
                size="md"
                placeholder="********"
                className=" !border-blue-gray-200 focus:!border-blue-600"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <p className="text-red-600">{errors.password?.message}</p>
            </div>

            <Button
              className="mt-8 bg-blue-900"
              fullWidth
              onClick={handleSubmit(onSubmit)}
            >
              sign up
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <Link to={"/login"} className="font-medium text-blue-800">
                Sign In
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    </>
  );
}
