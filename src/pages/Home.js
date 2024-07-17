import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    toast.success('Logout Successfully');
    setTimeout(() => {
      navigate('/login')
    }, 1000)
  }

  return (
    <section className="dark:bg-gray-100 dark:text-gray-800">
      <div className="h-screen mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
        <h1 className="text-4xl font-bold leading-none sm:text-5xl">
          Welcome {' '}
          <span className="dark:text-violet-600">{loggedInUser}</span>
        </h1>
        <p className="px-8 mt-8 mb-12 text-lg">
          Cupiditate minima voluptate temporibus quia? Architecto beatae esse ab
          amet vero eaque explicabo!
        </p>
        <div className="flex flex-wrap justify-center">
          <button onClick={handleLogout} className="px-8 py-3 m-2 text-lg font-semibold rounded dark:bg-violet-600 dark:text-gray-50">
            Log Out
          </button>
          <ToastContainer />
        </div>
      </div>
    </section>
  );
};

export default Home;
