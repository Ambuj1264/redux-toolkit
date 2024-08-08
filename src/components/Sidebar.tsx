"use client";
import React, { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`h-screen bg-gray-800 text-white  transition-all duration-700 ease-in-out ${
        isOpen ? "w-64" : "w-25"
      } transition-width `}
    >
      <div className="p-4 flex justify-between items-center ">
        <h1
          className={`text-2xl font-bold transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          }`}
        >
          My App
        </h1>
        <button
          className="text-xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>
      <ul className="mt-4">
        <li className="p-4 hover:bg-gray-700">Home</li>
        <li className="p-4 hover:bg-gray-700">About</li>
        <li className="p-4 hover:bg-gray-700">Services</li>
        <li className="p-4 hover:bg-gray-700">Contact</li>
      </ul>
    </div>
  );
};

export default Sidebar;
