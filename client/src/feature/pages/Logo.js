import React from 'react'
import logo from "../../assets/logo_image.png"

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