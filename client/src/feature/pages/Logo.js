import React from 'react'
import logo from "../../assets/Chat App_20250109_230045_0000.png"

function Logo({ children }) {
    return (
        <>
                
            <div className="flex justify-center items-center text-center shadow-md py-4 bg-white">
                <img src={logo} alt='logo' width={220} height={100}/>
            </div>
            
            {children}
        </>
    )
}

export default Logo