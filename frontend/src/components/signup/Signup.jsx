import React, { useState } from "react";
import Login from "../Login";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const [redirect, setRedirect] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };
    await axios
      .post("http://localhost:5000/user/signup", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("signup successfully");
          setRedirect(true);
        }
        localStorage.setItem("user", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error(err.response.data.message);
        }
      });
  };
  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <div className="flex h-screen items-center  justify-center dark:bg-slate-900 text-black dark:text-white p-10 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" p-6  rounded-lg shadow-md  dark:bg-slate-800 text-black dark:text-white ">
        <div>
          <Link
            className="text-[25px] font-bold flex justify-end mb-4 text-gray-500"
            to="/">
            x
          </Link>
          <input
            className="bg-zinc-100 block w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200 dark:bg-slate-800 dark:text-white"
            type="text"
            placeholder="Full Name"
            {...register("fullname", { required: true })}
          />
          {errors.fullname && (
            <span className="text-red-700 ">This field is required</span>
          )}
          <input
            className="bg-zinc-100 block w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200 dark:bg-slate-800 dark:text-white"
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-700 ">This field is required</span>
          )}
          <input
            className="bg-zinc-100 block w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200 dark:bg-slate-800 dark:text-white"
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-700 ">This field is required</span>
          )}
        </div>
        <div className="flex justify-between gap-4">
          <input
            className="px-5 rounded-full py-3 mt-2 bg-blue-700 text-white"
            type="submit"
            value="Create My Account"
          />
          <div className="text-center mt-2 flex flex-col gap-2">
            <p className="dark:text-white">
              Have an account?{" "}
              <button
                type="button"
                className="text-blue-500 underline"
                onClick={() =>
                  document.getElementById("my_modal_2").showModal()
                }>
                Login
              </button>
            </p>
          </div>
        </div>
      </form>
      <Login />
    </div>
  );
}

export default Signup;
