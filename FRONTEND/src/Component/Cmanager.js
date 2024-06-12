import React from "react";
import "./Home.css";
//import "./BookingPage.js"
import "./Chome.css";
import "./Chome.js";
import "./Customerlogin.js";

import "./CustomerList.js";
import imgSrc from "./list.jpg";
import imgSrc1 from "./rev1.png";
import imgSrc2 from "./uuu.jpg";

export default function Cmanager() {
  return (
    <div>
      <div className="relative">
        <h1 className="ms-20 mt-20 m text-6xl font-extrabold text-white">
          Click to Get the List
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
        Review List button provides access to review details.{" "}
      </small>
      <br />
      <small className="ms-20 text-xl opacity-90 mt-5 text-white">
        Customer List button displays customerinformation.{" "}
      </small>
      <br />
      <small className="ms-20 text-xl opacity-90 mt-5 text-white">
        Both buttons streamline access to essential data,{" "}
      </small>
      <br />
      <small className="ms-20 text-xl opacity-90 mt-5 text-white">
        enhancing efficiency and facilitating informed decision-making.
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
              <a href="/CustomerList">Customer List</a>
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
              <a href="/CustomerReview">Review List</a>
            </button>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
