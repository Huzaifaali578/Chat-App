import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkEmailAsync, selectCheckEmailUser } from '../authSlice';
import { Link, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaRegCircleUser  } from "react-icons/fa6";

function CheckEmail() {
  const dispatch = useDispatch();
  const checkEmailUser = useSelector(selectCheckEmailUser);

  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(checkEmailAsync({ email }));
    setEmail('');
  };

  useEffect(() => {
    if (checkEmailUser) {
    {checkEmailUser?.success ? toast.success(checkEmailUser?.message) :
        toast.error(checkEmailUser?.message);
      }
    }
  }, [checkEmailUser]);

  return (
    <>
      {checkEmailUser?.success && <Navigate to="/signin" />}
      <div className="mt-5">
        <div className="bg-white w-full max-w-md mx-auto p-4 overflow-hidden rounded shadow-md">
          <div className='w-fit mx-auto mb-5 rounded-full'>
            <FaRegCircleUser  size={80} />
          </div>
          <h1 className="text-lg font-bold mb-4">Welcome to the Chat App</h1>
          <form className="grid gap-3 mt-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleChange}
                className="px-3 py-2 bg-slate-100 focus:outline-primary"
              />
              <button
                type="submit"
                className="mt-4 p-3 rounded text-lg font-bold text-white hover:bg-secondary cursor-pointer bg-primary"
              >
                Submit
              </button>
            </div>
            <p className="mt-3 text-center text-lg">
              New User?{" "}
              <Link to="/signup" className="hover:text-primary text-lg">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default CheckEmail;
