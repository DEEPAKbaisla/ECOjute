// import React from "react";
// import { Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import api from "../api/axios";
// import GoogleSignIn from "./GoogleSignIn";

// function Login() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     const userInfo = {
//       email: data.email,
//       password: data.password,
//     };
//     await api
//       .post("/api/user/login", userInfo)
//       .then((res) => {
//         console.log(res.data);
//         if (res.data) {
//           toast.success("login Successfully");
//           setTimeout(() => {
//             window.location.reload();
//           }, 1300);
//         }
//         localStorage.setItem("user", JSON.stringify(res.data.user));
//       })
//       .catch((err) => {
//         if (err.response) {
//           // console.log(err);
//           toast.error(err.response.data.message);
//           setTimeout(() => {}, 2300);
//         }
//       });
//   };
//   return (
//     <dialog id="my_modal_2" className="modal dark:bg-slate-800 dark:text-white">
//       <div className="modal-box  bg-white dark:bg-slate-800 dark:text-white rounded-md">
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className=" b0  dark:bg-slate-800 dark:text-white">
//           <input
//             className="block  w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200  dark:bg-slate-800 dark:text-white"
//             type="email"
//             placeholder="Email"
//             {...register("email", { required: true })}
//           />
//           {errors.email && (
//             <span className="text-red-700 ">This field is required</span>
//           )}

//           <input
//             className="block  w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200  dark:bg-slate-800 dark:text-white "
//             type="password"
//             placeholder="Password"
//             {...register("password", { required: true })}
//           />
//           {errors.password && (
//             <span className="text-red-700 ">This field is required</span>
//           )}

//           <div className="flex justify-between">
//             <input
//               className="px-7 block rounded-full py-3 mt-2 bg-blue-700 text-white align-middle"
//               type="submit"
//               value="Login"
//             />
//             <button className="mt-4 flex gap-1">
//               <p className=""> Create account !</p>
//               <Link to="/signup" className="text-blue-700 underline ">
//                 {" "}
//                 sign up
//               </Link>
//             </button>
//             <GoogleSignIn/>
//           </div>
//         </form>
//       </div>
//       <form method="dialog" className="modal-backdrop">
//         <button>close</button>
//       </form>
//     </dialog>
//   );
// }

// export default Login;

import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import api from "../api/axios";
import GoogleSignIn from "./GoogleSignIn";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/api/user/login", {
        email: data.email,
        password: data.password,
      });

      toast.success("Login Successfully");

      localStorage.setItem("user", JSON.stringify(res.data.user));

      setTimeout(() => {
        window.location.reload();
      }, 1300);
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };

  return (
    
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div>
            <Input
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                Email is required
              </p>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                Password is required
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>

           <div className="mt-4">
            <GoogleSignIn />
          </div>

          <div className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="underline text-blue-600">
              Sign up
            </Link>
          </div>

          

        </form>
      </CardContent>
    </Card>
  </div>
  );
}

export default Login;
