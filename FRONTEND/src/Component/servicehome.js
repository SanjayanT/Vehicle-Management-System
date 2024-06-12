import React from "react";
import "./Home.css";

export default function ServiceHome() {
  return (
    <div className="flex justify-center items-center w-full mt-10">
      <div className="grid grid-rows-1 p-10 bg-gray-200 bg-opacity-70 rounded-lg mx-5 max-w-4xl ">
        <div className="mt-10 space-x-6 p-10 bg-black bg-opacity-75 rounded-lg">
          <p className="font-bold text-2xl text-white mb-10 text-center">
            Ryome Autocare Service<br></br>
            <br></br>Welcome to your ultimate solution for all vehicle service
            requirements. Our user-friendly platform guarantees a smooth and
            hassle-free experience in organizing and monitoring your vehicle
            servicing needs.
          </p>
          <div className="flex justify-center items-center gap-10">
            <a className="font-bold text-1xl" href="PkageHome">
              <button
                className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 hover:from-amber-900 hover:via-amber-800 
                                     hover:to-amber-700 text-white font-bold py-5 px-6 rounded-lg mr-2 opacity-90 transition duration-300 
                                     ease-in-out transform hover:scale-105"
              >
                {/* add button with icon*/}
                <i
                  className="pi pi-spin pi-cog"
                  style={{ fontSize: "2rem" }}
                ></i>
                <br></br>
                Packages
              </button>
            </a>
            <a href="rechome">
              <button
                className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 hover:from-amber-900 hover:via-amber-800 
                                     hover:to-amber-700 text-white font-bold py-5 px-6 rounded-lg mr-2 opacity-90 transition duration-300 
                                     ease-in-out transform hover:scale-105"
              >
                <i className="pi pi-wrench" style={{ fontSize: "2rem" }}></i>{" "}
                <i className="pi pi-server" style={{ fontSize: "2rem" }}></i>
                <br></br> Records
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
