import React from "react";

const Input = ({ type, value, onChange, placeholder }) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="border py-2 px-2 border-[#BFBFBF] text-sm md:text-md lg:text-md 2xl:text-lg text-black rounded-sm w-full focus:border-none focus:outline-none focus:ring focus:ring-sky-500"
            required
        />
    );
};

export default Input;
