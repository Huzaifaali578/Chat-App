import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoggedInUserDetail, selectUpdateUser, updateUserDetailAPIAsync } from '../UserDetail/UserDetailSlice'
import { uploadFile } from '../../Commen/uploadFile';
import { IoClose } from 'react-icons/io5';
import Avatar from '../../Commen/Avatar';
import toast from "react-hot-toast";

function EditUserDetail({ setEditUserDetail }) {
    const LoggedInUserDetail = useSelector(selectLoggedInUserDetail)
    const updateUser = useSelector(selectUpdateUser)
    const dispatch = useDispatch();
    const [editform, setEditForm] = useState(false)

    // Extract user details from Redux state
    const userId = LoggedInUserDetail?.data?._id || '';
    const userEmail = LoggedInUserDetail?.data?.email || '';
    const userName = LoggedInUserDetail?.data?.name || '';
    const profilePic = LoggedInUserDetail?.data?.profile_pic || '';

    const [data, setData] = useState({
        name: userName,
        profile_pic: profilePic
    });

    const [uploadPhoto, setUploadPhoto] = useState("");


    const handleOnChange = (e) => {
        const { name, value } = e.target; // Destructure the input field's name and value
        setData((prev) => ({ ...prev, [name]: value })); // Update state dynamically
    };

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        const uploadImage = await uploadFile(file);
        setData((prev) => ({ ...prev, profile_pic: uploadImage.url }));
        setUploadPhoto(file);
    };

    const removeImage = (e) => {
        e.preventDefault();
        setUploadPhoto("");
        setData((prev) => ({ ...prev, profile_pic: "" })); // Clear the profile_pic URL
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(updateUserDetailAPIAsync(data));
        setEditUserDetail(false)
        // window.location.reload()
    };

    // useEffect(() => {
    //     if (UserStatus) {
    //         if (UserStatus?.message) {
    //             { UserStatus?.success ? toast.success(UserStatus?.message) : toast.error(UserStatus?.message) }
    //         }
    //     }
    // }, [UserStatus?.message]);
    return (
        <>
            <div className='fixed inset-0 ml-12 bg-red-700 bg-opacity-20 flex justify-center items-center p-4'>
                <div className='bg-white rounded-lg p-5 w-full max-w-md shadow-lg shadow-primary'>
                    <span>close</span>
                    <IoClose onClick={() => setEditUserDetail(false)} className='inline-block hover:text-primary cursor-pointer' />
                    {!editform ? (<div>
                        <h3 className="text-lg font-bold mb-1 text-center">User Details</h3>
                        <div className='flex flex-col text-lg font-semibold mb-3 ml-3'>
                            <div className='m-4'>
                                <Avatar width={60} height={60} imageUrl={profilePic} name={userName} />
                            </div>
                            <div>
                                <label>Name: </label>
                                <label>{userName}</label>
                            </div>
                            <div>
                                <label>Email: </label>
                                <label>{userEmail}</label>
                            </div>
                        </div>
                        <p onClick={() => setEditForm(true)} className="text-lg font-medium mb-2 cursor-pointer hover:text-primary text-center">Edit User Details</p>
                    </div>)
                        : (<div className="bg-white w-full max-w-md p-4 -mt-6 rounded overflow-hidden shadow-md mx-auto">
                            <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name" className="font-medium">
                                        Name:
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Enter Your Name"
                                        className="px-3 py-2 bg-slate-100 focus:outline-primary rounded-md"
                                        value={data.name}
                                        onChange={handleOnChange}
                                        required
                                    />
                                </div>
                              
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="profile_pic" className="font-medium">
                                        Photo: <Avatar width={60} height={60} imageUrl={profilePic} name={userName} />
                                    </label>
                                    <div className="bg-slate-200 mt-3 h-14 flex justify-center items-center border hover:border-primary rounded cursor-pointer">
                                        <label
                                            htmlFor="profile_pic"
                                            className="text-sm max-w-[300px] text-ellipsis line-clamp-1"
                                        >
                                            {uploadPhoto ? uploadPhoto?.name : "Change Your Photo"}
                                        </label>
                                        {uploadPhoto?.name && (
                                            <button
                                                type="button"
                                                className="ml-2 text-lg hover:text-red-600"
                                                onClick={removeImage}
                                            >
                                                <IoClose />
                                            </button>
                                        )}
                                        <input
                                            type="file"
                                            id="profile_pic"
                                            name="profile_pic"
                                            className="hidden"
                                            onChange={handleUploadImage}
                                        />
                                    </div>
                                </div>
                                <div className='flex gap-2 ml-auto'>
                                <button
                                        className="border-primary border rounded px-6 py-1 mt-2 text-lg font-bold hover:bg-primary hover:text-white"
                                        onClick={() => setEditForm(false)}
                                >
                                    Cancle
                                </button>
                                <button
                                    type="submit"
                                    className="bg-primary px-4 py-1 mt-2 text-lg font-bold hover:bg-secondary rounded text-white"
                                >
                                    Save
                                    </button>
                                    </div>
                                {/* <p className="mt-3 text-center text-lg">
                                    close form?{" "}
                                    <span onClick={() => setEditForm(false)} className="hover:text-primary text-md">
                                        click here
                                    </span>
                                </p> */}
                            </form>
                        </div>)}
                </div>
            </div>
        </>
    )
}

export default EditUserDetail