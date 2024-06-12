import React from "react";
import "./Home.css";
import imgSrc from "./logo.png";
import "./BookingPage.js";
import "./BookingPage.css";
import "./Chome.js";
import "./Chome.css";
import "./Register.js";
import "./Review.js";


function Header() {
  return (
      <div className="text-white py-4 ml-5">
        
          {/* ------Logo-------- */}

          <nav className="flex flex-wrap justify-between items-center space-x-10 text-xl text-slate-50 " >

          <div>

            <a href="/"><img src= {imgSrc} alt="Logo" className="h-16 w-43 ml-10 mt-3 mr-20" /></a>
          </div>


          {/* ------Navigation links------ */}
           <div>
            <a href="/" className="hover:none  transition duration-500 ease-in-out transform hover:text-orange-500">Home</a>
           </div>

           <div> 
            <a href="/Customerlogin" className="hover:none transition duration-300 ease-in-out transform hover:text-orange-500">Customer</a>
           </div>

           <div>
            <a href="/display" className="hover:none transition duration-300 ease-in-out transform hover:text-orange-500">Suppliers</a>
           </div>

           <div>
            <a href="/staffhome" className="hover:none transition duration-300 ease-in-out transform hover:text-orange-500">Staff</a>
           </div>

           <div>
            <a href="/inventory" className="hover:none transition duration-300 ease-in-out transform hover:text-orange-500">Inventory</a>
           </div>

           <div>
            <a href="/Finance" className="hover:none transition duration-300 ease-in-out transform hover:text-orange-500">Finance</a>
           </div>

           <div>
            <a href = "/servicehome">
            <button className=" py-2 px-5 border-2 border-slate-50 mr-3 bg-gray-900 bg-opacity-50
                              transition duration-200 ease-in-out transform hover:scale-105 rounded-lg">Services</button>
            </a>                  
          
          </div> 
          </nav>
        
      </div>
    );
}

export default Header;
