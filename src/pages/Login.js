import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [loginInfo, setloginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setloginInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return toast.error("All fields are required");
    }
    try {
      const url = process.env.REACT_APP_LINK;

      const response = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        toast.success(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error?.details[0]?.message;
        toast.error(details || "An error occurred");
      } else {
        toast.error(message);
      }
      console.log(result);
    } catch (error) {
      toast.error("Failed to login. Please try again");
      console.log(error);
    }
  };

  return (
    <section className="h-screen md:pt-20">
      <div className="flex flex-col items-center justify-center md:p-0 p-6">
        <div className="flex flex-col md:w-1/4 w-full md:p-6 rounded-md p-3 bg-gray-100 text-gray-800">
          <div className="mb-8 text-center">
            <h1 className="my-1 text-4xl font-bold">Login</h1>
            <p className="text-sm dark:text-gray-600">
              Login to access your account
            </p>
          </div>
          <form onSubmit={handlelogin} className="space-y-12">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email address
                </label>
                <input
                  onChange={handleChange}
                  value={loginInfo.email}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="abc@gmail.com"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-sm">
                    Password
                  </label>
                  <Link to="#" className="text-xs hover:underline text-gray-600">
                    Forgot password?
                  </Link>
                </div>
                <input
                  onChange={handleChange}
                  value={loginInfo.password}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="*****"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <button
                  type="submit"
                  className="w-full px-8 py-3 font-semibold rounded-md bg-violet-600 text-gray-50 hover:bg-violet-900"
                >
                  Login
                </button>
              </div>
              <p className="px-6 text-sm text-center dark:text-gray-600">
                Don't have an account yet?{" "}
                <Link to="/signup" className="hover:underline text-violet-600">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </section>
  );
};

export default Login;
