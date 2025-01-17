import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,

    }));
   
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const {name, email, password} = signupInfo;

    if(!name || !email || !password) {
      return toast.error("All fields are required");
    } 
    try {
      const url = process.env.REACT_APP_LINK || "";

      const response = await fetch(`${url}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      })

      const result = await response.json();
      const { success, message, error } = result;
      if(success) {
        toast.success(message);
        setTimeout(() => {
          navigate('/login');
        }, 1000)
      }
      else if(error) {
        const details = error?.details[0].message
        toast.error(details);
      }
      else if(!success) {
        toast.error(message);
      }
      console.log(result);

    } catch (error) {
      toast.error("Failed to signup. Please try again");
      console.log(error);
    }
    // console.log(signupInfo)
  }


  return (
    <section className="h-screen md:pt-20">
      <div className="flex flex-col items-center justify-center md:p-0 p-4">
        <div className="md:w-1/4 w-full md:p-6 rounded-md p-3 bg-gray-100 text-gray-800">
          <div className="mb-8 text-center">
            <h1 className="my-1 text-4xl font-bold">Signup</h1>
            <p className="text-sm text-gray-600">Create your account</p>
          </div>
          <form onSubmit={handleSignup} action="" className="space-y-10">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm">
                  Name
                </label>
                <input
                  onChange={handleChange}
                  value={signupInfo.name}
                  type="name"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email address
                </label>
                <input
                  onChange={handleChange}
                  value={signupInfo.email}
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
                </div>
                <input
                  onChange={handleChange}
                  value={signupInfo.password}
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
                  // onClick={handleLogin}
                  className="w-full px-8 py-3 font-semibold rounded-md bg-violet-600 text-gray-50 hover:bg-violet-950"
                >
                  Signup
                </button>
              </div>
              <p className="px-6 text-sm text-center dark:text-gray-600">
                Already have an account?
                <Link to="/login" className="hover:underline text-violet-600">
                  Login
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

export default Signup;
