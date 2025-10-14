import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    await axios
      .post("http://localhost:5000/user/login", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("login Successfully !");
          setTimeout(() => {
            window.location.reload();
          }, 1300);
        }
        localStorage.setItem("user", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        if (err.response) {
          // console.log(err);
          toast.error(err.response.data.message);
          setTimeout(() => {}, 2300);
        }
      });
  };
  return (
    <dialog id="my_modal_2" className="modal dark:bg-slate-800 dark:text-white">
      <div className="modal-box  bg-white dark:bg-slate-800 dark:text-white rounded-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" b0  dark:bg-slate-800 dark:text-white">
          <input
            className="block  w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200  dark:bg-slate-800 dark:text-white"
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-700 ">This field is required</span>
          )}

          <input
            className="block  w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200  dark:bg-slate-800 dark:text-white "
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-700 ">This field is required</span>
          )}

          <div className="flex justify-between">
            <input
              className="px-7 block rounded-full py-3 mt-2 bg-blue-700 text-white align-middle"
              type="submit"
              value="Login"
            />
            <button className="mt-4 flex gap-1">
              <p className=""> Create account !</p>
              <Link to="/signup" className="text-blue-700 underline ">
                {" "}
                sign up
              </Link>
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default Login;
