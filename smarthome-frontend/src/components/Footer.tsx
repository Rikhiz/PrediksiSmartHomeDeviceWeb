import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import gambar from '../gambar/cek.png'
const Footer: React.FC = () => {
return (
<footer className="rounded-lg shadow  mt-8 ">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a href="" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src={gambar} className="h-8" alt="Flowbite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">SmartHomePredict</span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-black sm:mb-0 ">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">About</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-black sm:text-center dark:text-gray-400">© 2024 <a href="" className="hover:underline">22TID™</a>. All Rights Reserved.</span>
    </div>
</footer>
  );
};

export default Footer;