import React, { useState, useEffect } from "react";
import axios from "axios";
import imgSrc3 from "../Images/calendars.png";

export default function ViewHolidaysSetting() {
    const [holidays, setSet] = useState([]);

    useEffect(() => {
        function getSet() {
            axios.get("http://localhost:8090/holidaySetting")
                .then((res) => {
                    console.log("Response from server:", res.data); 
                    setSet(res.data);
                })
                .catch((err) => {
                    console.error("Error fetching data:", err);
                    alert(err.message);
                });
        }

        getSet();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-UK', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return(
        <div>
            <div className="relative">
                <h1 className="ms-20 my-10 mt-20 text-5xl font-extrabold text-white">Holidays</h1>
                <img src={imgSrc3} className="absolute top-4 right-10 mx-96 object-center rounded-2xl bg-white opacity-50  transition duration-300 ease-in-out transform hover:scale-105" style={{ width: "400px", height: "400px" }}/>
            </div>     
                <div class="flex">
                <table  class="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 text-white sticky top-10 mx-20">
                <thead>
                    <tr className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 mt-5">
                            <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Date</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Holiday</th>                  
                    </tr>
                </thead>
            <tbody>
                {holidays.map((holidaySetting) => (
                    <tr key={holidaySetting.id} class="bg-white border-b border-gray-200 hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(holidaySetting.busyDate)}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{holidaySetting.event}</td>                        
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        </div>
    );
    
}