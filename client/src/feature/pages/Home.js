import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { getUserDetailAPIAsync, selectLoggedInUserDetail, selectUpdateUser } from '../UserDetail/UserDetailSlice.js'
import SideBar from '../message/SideBar.js';
import { selecLogOutUser } from '../Auth/authSlice.js';
import toast from 'react-hot-toast';
import logo from '../../assets/logo_image.png'

function Home() {
  const loggedInUserDetail = useSelector(selectLoggedInUserDetail);
  console.log("loggedInUserDetail", loggedInUserDetail)
  const updateUser = useSelector(selectUpdateUser)
  const logOut = useSelector(selecLogOutUser)
  const dispatch = useDispatch()
  const location = useLocation()
  
  useEffect(() => {
    dispatch(getUserDetailAPIAsync())
  }, [dispatch])

  useEffect(() => {
    if (updateUser) {
      toast.success(updateUser?.message)
      setTimeout(() => {
        window.location.reload()
      },1000)
    }
  }, [updateUser])
  
  const basePath = location.pathname === '/'
  
  return (
    <>
      {logOut?.success && <Navigate to='/email' />}
      <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
        <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
          <SideBar />
        </section>
        <section className={`${basePath && 'hidden'}`}>
          <Outlet />
        </section>
        <div className={`${!basePath && 'hidden'} lg:flex justify-center items-center flex-col hidden`}>
          <img src={logo} alt='logo'/>
          <p className='text-lg font-bold text-red-400'> Select user to send message </p>
        </div>
      </div>
    </>
  )
}

export default Home