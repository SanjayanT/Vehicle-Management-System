import React from "react";
import "./Home.css";
import "./BookingPage.js";
import "./BookingPage.css";
//import "/BookingPageCustomerLogin";
import imgSrc from "./customer.png";
import imgSrc1 from "./manager.png";
import imgSrc2 from "./wipe.jpg";


export default function BookingPage() {
  return ( 
    <div>
      <div className="relative">
        <h1 className="ms-20 mt-20 m text-6xl font-extrabold text-white">Book Now</h1>
        <img src={imgSrc2} alt="Wipe Image" className="absolute top-4 right-10 mx-60 rounded-2xl" style={{ width: "400px", height: "600px" }}/>
      </div>

      <br />
      <small className="ms-20 text-xl opacity-90 mt-5 text-white">Simplifies the process of making reservations by providing</small>
      <br />
      <small className="ms-20 text-xl opacity-90 mt-5 text-white">a convenient online platform where users can easily</small>
      <br />
      <small className="ms-20 text-xl opacity-90 mt-5 text-white">select their desired date and time, choose the service,</small>
      <br />
      <small className="ms-20 text-xl opacity-90 mt-5 text-white">and often make payment arrangements if necessary.</small>

      <div className="flex ms-20 my-20">
      <figure class="ml-10 mr-10 block max-w-sm p-6 bg-black border border-black-200 rounded-lg shadow-md 
                        hover:bg-black-100 dark:bg-black-800 dark:border-black-700 dark:hover:bg-black-700 
                        opacity-80 transition duration-300 ease-in-out transform hover:scale-105">
          <img className="rounded-full w-40 h-40 " src={imgSrc} />

          <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
            <button className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 hover:from-amber-900 hover:via-amber-800 
                                  hover:to-amber-700 text-white font-bold py-3 px-5 rounded-lg mr-2 opacity-90 transition duration-300
                                  ease-in-out transform hover:scale-105"><a href="/bookCusLog">Customer Login</a></button>
          </figcaption>
      </figure>

      <figure class="block max-w-sm p-6 bg-black border border-black-200 rounded-lg shadow-md hover:bg-black-100 dark:bg-black-800 dark:border-black-700 dark:hover:bg-black-700 opacity-80 transition duration-300
                                  ease-in-out transform hover:scale-105">
          <img className="rounded-full w-40 h-40" src={imgSrc1} />
          <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400 ">
            <button className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 hover:from-amber-900 hover:via-amber-800 
                                  hover:to-amber-700 text-white font-bold py-3 px-5 rounded-lg mr-2 opacity-90 transition duration-300
                                  ease-in-out transform hover:scale-105"><a href="/bookManageLog">Manager Login</a></button>
          </figcaption>
        </figure>
      </div>
      <div className="mt-10">....</div>
    </div>
  );
}
