import React from 'react';
import { FaRegCircleUser } from "react-icons/fa6";

const Avatar = React.memo(({ imageUrl, name, width, height }) => {
    let avtarName = '';
    if (name) {
        const splitName = name?.split(" ");
        if (splitName.length > 1) {
            avtarName = splitName[0][0] + splitName[1][0];
        } else {
            avtarName = splitName[0][0];
        }
    }

    const bgColor = [
        "bg-emerald-200",
        "bg-teal-200",
        "bg-cyan-200",
        "bg-indigo-200",
        "bg-red-200",
        "bg-blue-200",
        "bg-orange-200",
        "bg-yellow-200",
        "bg-pink-200",
        "bg-purple-200",
        "bg-green-200",
    ];

    const randomNumber = Math.floor(Math.random() * bgColor.length);

    // Calculate dynamic font size based on width and height
    const fontSize = Math.min(width, height) * 0.4;

    return (
        <div className='items-center flex flex-col gap-3'>
            <div
                className={`overflow-hidden font-bold rounded-full shadow-md flex justify-center items-center ${bgColor[randomNumber]}`}
                style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    fontSize: `${fontSize}px`,
                }}
            >
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={name}
                        width={width}
                        height={height}
                        className='overflow-hidden rounded-full'
                    />
                ) : name ? (
                    <div>{avtarName.toUpperCase()}</div>
                ) : (
                    <FaRegCircleUser style={{ fontSize: `${fontSize}px` }} />
                )}
            </div>
            {/* Uncomment below line if you want to display the name */}
            {/* <p className='text-2xl font-bold'>{name}</p> */}
        </div>
    );
});

export default Avatar;
