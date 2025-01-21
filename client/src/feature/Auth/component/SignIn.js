import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCheckEmailUser, selectLoggedInUser, signInApiAsync } from '../authSlice.js';
import { Navigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Avatar from '../../../Commen/Avatar.js';

function SignIn() {
  const dispatch = useDispatch();

  // Selectors for Redux state
  const loggedInUser = useSelector(selectLoggedInUser);
  const checkEmailUser = useSelector(selectCheckEmailUser);

  // State for password
  const [password, setPassword] = useState('');

  // Extract user details from Redux state
  const userId = checkEmailUser?.data?._id || '';
  const userEmail = checkEmailUser?.data?.email || '';
  const userName = checkEmailUser?.data?.name || '';
  const profilePic = checkEmailUser?.data?.profile_pic || '';

  // Handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    if (password.trim() === '') {
      toast.error('Password is required.');
      return;
    }
    dispatch(signInApiAsync({ password, userId }));
    setPassword(''); // Clear the password field after dispatching
  };

  // Toast notifications based on login status
  useEffect(() => {
    if (loggedInUser) {
      loggedInUser.success
        ? toast.success(loggedInUser.message)
        : toast.error(loggedInUser.message);
    }
  }, [loggedInUser]);

  // Redirect logic
  if (!checkEmailUser) return <Navigate to="/email" />;
  if (loggedInUser?.success) return <Navigate to="/" />;

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-md m-auto rounded p-5 shadow-md overflow-hidden">
        {/* Avatar Section */}
        <div className="w-fit mx-auto mb-4">
          <Avatar imageUrl={profilePic} name={userName} width={100} height={100} />
          <p className='text-2xl font-bold'>{userName}</p>
        </div>

        <form onSubmit={handleLogin}>
          {/* User Info Section */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-lg font-bold">Email:</label>
              <p className="text-md font-medium ml-2">{userEmail}</p>
            </div>

            {/* Password Input Section */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-md font-medium">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Your Password"
                className="px-3 py-2 bg-slate-100 focus:outline-primary rounded-md"
                onChange={handlePasswordChange}
                value={password}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-secondary p-2 text-2xl text-white font-bold mt-5 rounded"
          >
            Login
          </button>
          <div className="text-center mt-3">
            <Link to="/forgot-password" className="hover:text-primary">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
