import React from "react";
import "./Home.css";
import "./BookingPage.js";
import "./BookingPage.css";

//import imgSrc from "./customer.png";
//import imgSrc1 from "./manager.png";
//import imgSrc2 from "./wipe.jpg";
//import imgSrc3 from "./vacuum.jpg";

export default function BookingPageCustomerLogin() {
  return (
    <div>
      <div className="relative">
      <h1 className="ms-20 my-10 mt-20 text-6xl font-extrabold text-white ">Book Now</h1>
           
      <ul class="flex mx-60 mb-10">
        <li><a href="/serviceHistory" class="ms-20 me-5 block max-w-sm p-6 bg-black border border-black-200 rounded-lg shadow-md hover:bg-black-100 dark:bg-black-800 dark:border-black-700 dark:hover:bg-black-700 opacity-80 transition duration-300
                                  ease-in-out transform hover:scale-105">
        <h5 class="mb-2 text-3xl font-bold tracking-tight text-white">Service History</h5><br></br>
        <p class="font-normal text-gray-700 dark:text-gray-400">Access to an exhaustive record of your completed appointments, complete with comprehensive details and relevant insights.</p></a></li>
        
        <li><a href="/Review" class="ms-10 block max-w-sm p-6 bg-black border border-black-200 rounded-lg shadow-md hover:bg-black-100 dark:bg-black-800 dark:border-black-700 dark:hover:bg-black-700 opacity-80 transition duration-300
                                  ease-in-out transform hover:scale-105">
                                    
        <h5 class="mb-2 text-3xl font-bold tracking-tight text-white">Feedback and Ratings</h5><br></br>
        <p class="font-normal text-gray-700 dark:text-gray-400">Your feedback fuels our growth! We'd love to hear about your experience. Rate us and let us know how we're doing!</p></a></li>
      </ul>

      <div class="mt-10 mb-10 flex justify-center">
        <button type="submit" class="w-56 h-16 bg-gradient-to-r from-red-700 via-red-800 to-red-900 hover:from-red-900 hover:via-red-800 
                                  hover:to-red-700 text-white font-bold py-3 px-5 rounded-lg mr-2 opacity-90 transition duration-300
                                  ease-in-out transform hover:scale-105 text-xl"><a href="/addBooking">Book Now</a></button>
      </div>

      <ul class="flex mx-60 mb-10">
        <li><a href="/viewHourSetting" class="ms-20 me-5 block max-w-sm p-6 bg-black border border-black-200 rounded-lg shadow-md hover:bg-black-100 dark:bg-black-800 dark:border-black-700 dark:hover:bg-black-700 opacity-80 transition duration-300
                                  ease-in-out transform hover:scale-105">
        <h5 class="mb-2 text-3xl font-bold tracking-tight text-white">Business Hours</h5><br></br>
        <p class="font-normal text-gray-700 dark:text-gray-400">Check out our business hours and plan your visit accordingly! We're here to serve you during our scheduled times</p></a></li>

        <li><a href="/viewHolidaysSetting" class="ms-10 me-5 block max-w-sm p-6 bg-black border border-black-200 rounded-lg shadow-md hover:bg-black-100 dark:bg-black-800 dark:border-black-700 dark:hover:bg-black-700 opacity-80 transition duration-300
                                  ease-in-out transform hover:scale-105">
        <h5 class="mb-2 text-3xl font-bold tracking-tight text-white">Holidays</h5><br></br>
        <p class="font-normal text-gray-700 dark:text-gray-400">Please note that our business hours may vary during holidays, so be sure to check our schedule before planning your visit</p></a></li>

      </ul>
      <div>..</div>

            </div>
      </div>
  );
}
