import React from 'react'
import Avatar from '../../../Commen/Avatar'

function SearchUserCard({ user }) {
    return (
        <>
            <div className='mt-3 p-2 lg:p-4 border border-transparent border-b-slate-400 hover:border-slate-500 hover:border-2 cursor-pointer'>
                <div className='flex justify-start items-center'>
                    <Avatar
                        width={80}
                        height={80}
                        name={user?.name}
                        imageUrl={user?.profile_pic}
                    />
                    <div>
                        <h2 className='ml-5 text-xl font-bold'>{user?.name}</h2>
                        <h2 className='ml-5 text-xl'>{user?.email}</h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchUserCard