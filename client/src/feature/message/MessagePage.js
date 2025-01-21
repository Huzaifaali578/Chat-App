import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOutApiAsync, selecLogOutUser } from '../Auth/authSlice.js';
import toast from 'react-hot-toast';
import LogOut from '../Auth/component/LogOut.js';

function MessagePage() {
  const dispatch = useDispatch()
  const logOut = useSelector(selecLogOutUser)
  // const handleLogOut = () => {
  //   dispatch(logOutApiAsync())
  //   // window.location.reload()
  // }

  
  // if (logOut?.success) {
  //   toast.success(logOut?.message)
  // }

  return (
    <>
      <div>MessagePage</div>
      <LogOut />
    </>
  )
}

export default MessagePage