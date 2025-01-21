import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOutApiAsync, selecLogOutUser } from '../authSlice'
import toast from 'react-hot-toast'
import { Navigate } from 'react-router-dom'
import { BiLogOut } from 'react-icons/bi'

const LogOut = () => {
    const dispatch = useDispatch()
    const logOut = useSelector(selecLogOutUser)


    useEffect(() => {
        if (logOut?.success) {
            toast.success(logOut?.message)
            window.location.reload()
        }
    },[logOut])


    const handleLogOut = () => {
        dispatch(logOutApiAsync())
    }
    return (
        <>
            <BiLogOut size={20} onClick={handleLogOut} />
        </>
    )
}

export default LogOut