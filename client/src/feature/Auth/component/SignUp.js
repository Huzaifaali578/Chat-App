import React, { useState } from 'react';

function SignUp() {
    const [data, setData] = useState({
        name: "", // Initialize with an empty string
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target; // Destructure the input field's name and value
        setData((prev) => ({ ...prev, [name]: value })); // Update state dynamically
        console.log(name, value);
    };


    return (
        <div className="mt-5">
            <div className="bg-white w-full max-w-sm p-4 mx-3 rounded overflow-hidden shadow-md">
                <h3 className="text-lg font-bold mb-4">Welcome to Chat App</h3>
                <form>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="font-medium">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter Your Name"
                            className="px-3 py-2 bg-slate-100 focus:outline-[#ff3232] rounded-md"
                            value={data.name}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
