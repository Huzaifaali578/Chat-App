import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import Loading from "../../../Commen/Loading";
import SearchUserCard from "./SearchUserCard";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { searchUserAPIAsync, selectSearchUser } from "../SearchUserSlice";

function SearchUser({ setSearchUser }) {
    const dispatch = useDispatch();
    const searchUser = useSelector(selectSearchUser);
    const [search, setSearch] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        setSearch(e.target.value)
    }
    useEffect(() => {
        setIsLoading(true)
        if (search) {
            dispatch(searchUserAPIAsync({ search }))
                .unwrap()
                .catch((error) => toast.error(error.message || error));
        }
        setIsLoading(false)
    }, [search, dispatch]);

    return (
        <>
            {/* Background overlay */}
            <div
                className="fixed inset-0 bg-red-300 bg-opacity-40 ml-12 p-3"
                onClick={() => setSearchUser(false)}
            >
                {/* Search box container */}
                <div onClick={(e) => e.stopPropagation()} className="flex items-center flex-col">
                    <div className="w-full max-w-2xl mx-auto mt-10">
                        <div className="rounded-full h-14 overflow-hidden bg-white flex">
                            <input
                                type="text"
                                placeholder="Search user by name, email......"
                                className="w-full py-2 px-6 h-full text-lg outline-none"
                                onChange={handleChange}
                                value={search}
                            />
                            <div className="mr-4 h-14 w-14 flex items-center justify-center cursor-pointer">
                                <IoIosSearch size={30} />
                            </div>
                        </div>
                    </div>

                    {/* Display search User */}
                    <div className="bg-white mt-4 w-full max-w-xl p-3 rounded overflow-y-auto scrollbar max-h-[700px]">
                        {/* If loading */}
                        { isLoading && <Loading />}

                        {/* If no users found */}
                        {searchUser?.length === 0 && !isLoading && (
                            <p className="text-lg text-red-500 text-center">-- No user found --</p>
                        )}

                        {/* If users found */}
                        {!isLoading &&
                            searchUser?.data?.map((user) => <SearchUserCard key={user._id} user={user} />)}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchUser;
