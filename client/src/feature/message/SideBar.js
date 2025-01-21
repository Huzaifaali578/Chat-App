import React, { useState } from 'react';
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import Avatar from '../../Commen/Avatar.js'
import { useSelector } from 'react-redux';
import { selectLoggedInUserDetail } from '../UserDetail/UserDetailSlice';
import EditUserDetail from './EditUserDetail.js';
import LogOut from '../Auth/component/LogOut.js';
import { GoArrowUpLeft } from "react-icons/go";
import SearchUser from '../search_user/component/SearchUser.js';

function SideBar() {
    const LoggedInUserDetail = useSelector(selectLoggedInUserDetail);
    const [editUserDetail, setEditUserDetail] = useState(false)
    const [allUser, setAllUser] = useState([])
    const [searchUser, setSearchUser] = useState(false)

    // Extract user details from Redux state
    // const userId = LoggedInUserDetail?.data?._id || '';
    // const userEmail = LoggedInUserDetail?.data?.email || '';
    const userName = LoggedInUserDetail?.data?.name || '';
    const profilePic = LoggedInUserDetail?.data?.profile_pic || '';

    return (
        <>
            <div className='h-full w-full grid grid-cols-[48px,1fr] bg-white'>
                <div className='bg-red-200 w-12 h-full pt-5 rounded-tr-lg rounded-br-lg flex flex-col justify-between'>
                    <div>
                        <NavLink className={({ isActive }) => `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-red-300 rounded ${isActive && "bg-red-300"}`} title='Chat'>
                            <IoChatbubbleEllipses size={20} />
                        </NavLink>
                        <div className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-red-300 rounded' title='add friend' onClick={()=>setSearchUser((prevState)=> !prevState )}>
                            <FaUserPlus size={20} />
                        </div>
                    </div>
                    <div>
                        <button
                            className="w-full flex flex-col items-center cursor-pointer"
                            title={userName}
                            onClick={() => setEditUserDetail((prevState) => !prevState)} // Toggle logic
                        >
                            <Avatar name={userName} imageUrl={profilePic} width={40} height={40} className="mx-auto" />
                        </button>

                        <button className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-red-300 rounded' title='LogOut'>
                            <span className='-ml-1'>
                                <LogOut />
                            </span>
                        </button>
                    </div>
                    {/* {Edit User Detail} */}
                    {
                        editUserDetail && (<EditUserDetail setEditUserDetail={setEditUserDetail} />)
                    }
                </div>
                <div className='bg-white w-full'>
                    <div className='h-16 flex items-center'>
                        <h2 className='text-2xl font-bold p-4 text-red-800'>Message</h2>
                    </div>
                    <div className='p-[0.5px] bg-slate-200'></div>
                    <div className='h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar'>
                        {
                            allUser.length === 0 && (
                                <div className='flex justify-center items-center flex-col mt-12'>
                                    <GoArrowUpLeft size={50} className='text-red-400 mt-3' />
                                    <h2 className='text-xl p-4 font-bold text-red-400 text-center'>Explore user to start a conversation with</h2>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
                <div className='w-full'>
                {searchUser && <SearchUser setSearchUser={setSearchUser} />}
                </div>
        </>
    )
}

export default SideBar