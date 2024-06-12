import React from "react";
import "./Home.css";
//import "./BookingPage.js"
import "./Chome.css";
import "./Chome.js";
import imgSrc from "./login.png";

export default function Customerlogin() {
  return (
     <div className="flex justify-center items-center w-full">
      <form className="bg-gray-100 mt-20 py-10 p-14 my-10 m-60 border-gray-300 rounded-lg bg-opacity-50">
      <div className="flex justify-center items-center w-full">
      <img  
  src={imgSrc}
  alt="Logo"
  style={{
    width: "200px",
    height: "200px",
    justifySelf: "center", // Center horizontally
    alignSelf: "center", // Center vertically
  }}
/></div>
      <div>
        <div class="text-black mt-3 text-center text-4xl font-bold">User Login</div>
      
        
    
       
        < div>
        <div class="mt-5 mb-5 flex justify-center">
        <button className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 hover:from-amber-900 hover:via-amber-800 
                                  hover:to-amber-700 text-white font-bold py-3 px-5 rounded-lg mr-2 opacity-90 transition duration-300
                                  ease-in-out transform hover:scale-105 mt-5"><a href="/Chome">As Customer </a></button>
        
        
          
        <button className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 hover:from-amber-900 hover:via-amber-800 
                                  hover:to-amber-700 text-white font-bold py-3 px-5 rounded-lg mr-2 opacity-90 transition duration-300
                                  ease-in-out transform hover:scale-105 mt-5"><a href="/Cmanager">As Manager </a></button>
          </div>
          </div>
          <div class="mt-5 mb-5 flex justify-center">
        <a><b>If you do not have an account click </b><a href="/Register" class="font-bold text-white" ><u>Register</u></a></a></div>
        
     
 
        </div>
        </form></div>
  );}