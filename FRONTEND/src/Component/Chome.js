import React from "react";
import "./Home.css";
//import "./BookingPage.js"
import "./Chome.css";
import "./Chome.js";
import imgSrc from "./789.png";
import imgSrc1 from "./741.jpg";
import imgSrc2 from "./ocus2.jpg";

export default function Chome() {
  return (
    <div>
      <div className="relative">
        <h1 className="ms-20 mt-20 m text-6xl font-extrabold text-white">
          Customer Login
        </h1>
        <img
          src={imgSrc2}
          alt="Wipe Image"
          className="absolute top-4 right-10 mx-60 rounded-2xl"
          style={{ width: "400px", height: "500px" }}
        />
      </div>
      <br />
      <small className="ms-20 text-xl opacity-90 mt-5 text-white">
        Profile button provides Manage your personal details,{" "}
      </small>
      <br />
      <small className="ms-20 text-xl opacity-90 mt-5 text-white">
        {" "}
        including editing or deleting your information{" "}
      </small>
      <br />
      <small className="ms-20 text-xl opacity-90 mt-5 text-white">
        Review button provides Share your thoughts and experiences about{" "}
      </small>
      <br />
      <small className="ms-20 text-xl opacity-90 mt-5 text-white">
        {" "}
        our services or products with others
      </small>
      <br />

      <div className="flex ms-20 my-20">
        <figure>
          <img className="rounded-full w-40 h-40 ms-20" src={imgSrc} />
          <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400 ms-20">
            <button
              className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 hover:from-amber-900 hover:via-amber-800 
                                  hover:to-amber-700 text-white font-bold py-4 px-6 rounded-lg mr-2 opacity-90 transition duration-300
                                  ease-in-out transform hover:scale-105"
            >
              <a href="/ProfileList">Profile</a>
            </button>
          </figcaption>
        </figure> 
        <figure>
          <img className="rounded-full w-40 h-40 ms-20" src={imgSrc1} />
          <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400 ms-20">
            <button
              className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 hover:from-amber-900 hover:via-amber-800 
                                  hover:to-amber-700 text-white font-bold py-4 px-6 rounded-lg mr-2 opacity-90 transition duration-300
                                  ease-in-out transform hover:scale-105"
            >
              <a href="/Review">Review</a>
            </button>
          </figcaption>
        </figure>
      </div>
    </div>
    
  );
}
