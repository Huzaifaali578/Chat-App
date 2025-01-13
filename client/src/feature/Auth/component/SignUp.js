import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { uploadFile } from "../../../Commen/uploadFile";
import { useDispatch, useSelector } from "react-redux";
import { selectSignUpStatus, signUpAPIAsync } from "../authSlice";
import toast from "react-hot-toast";

function SignUp() {
    const dispatch = useDispatch();
    const UserStatus = useSelector(selectSignUpStatus);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        profile_pic: ""
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
        dispatch(signUpAPIAsync(data));
        setData({
            name: "",
            email: "",
            password: "",
            profile_pic: ""
        });
        setUploadPhoto("");
    };

    useEffect(() => {
        if (UserStatus) {
            if (UserStatus?.message) {
                {UserStatus?.success ? toast.success(UserStatus?.message) : toast.error(UserStatus?.message)}
            }
        }
    }, [UserStatus?.message]);

    return (
        <div className="mt-5">
            <div className="bg-white w-full max-w-md p-4 rounded overflow-hidden shadow-md mx-auto">
                <h3 className="text-lg font-bold mb-4">Welcome to Chat App</h3>
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
                        <label htmlFor="email" className="font-medium">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter Your Email"
                            className="px-3 py-2 bg-slate-100 focus:outline-primary rounded-md"
                            value={data.email}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="font-medium">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter Your Password"
                            className="px-3 py-2 bg-slate-100 focus:outline-primary rounded-md"
                            value={data.password}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="profile_pic" className="font-medium">
                            Photo:
                        </label>
                        <div className="bg-slate-200 h-14 flex justify-center items-center border hover:border-primary rounded cursor-pointer">
                            <label
                                htmlFor="profile_pic"
                                className="text-sm max-w-[300px] text-ellipsis line-clamp-1"
                            >
                                {uploadPhoto ? uploadPhoto?.name : "Upload your pic"}
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
                    <button
                        type="submit"
                        className="bg-primary px-2 py-2 mt-2 text-lg font-bold hover:bg-secondary rounded text-white"
                    >
                        Sign Up
                    </button>
                    <p className="mt-3 text-center text-lg">
                        Already have an account?{" "}
                        <Link to="/email" className="hover:text-primary text-lg">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
