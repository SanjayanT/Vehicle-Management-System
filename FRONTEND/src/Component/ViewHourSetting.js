import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ViewHourSetting() {
    const [businessHours, setSetting] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        function getSetting() {
            axios.get("http://localhost:8090/hourSetting")
                .then((res) => {
                    console.log("Response from server:", res.data); 
                    setSetting(res.data);
                })
                .catch((err) => {
                    console.error("Error fetching data:", err);
                    alert(err.message);
                });
        }

        const timerID = setInterval(() => setCurrentTime(new Date()), 1000); // Update current time every second

        getSetting();

        return () => clearInterval(timerID); // Cleanup timer on component unmount
    }, []);

    return(
        <div>
            <div className="relative">
                <h2 className="ms-20 my-10 mt-20 text-5xl font-extrabold text-white">Business Hours</h2>
                
                <div className="absolute top-32 mr-28 rounded-xl py-5 px-2 ms-96 opacity-25" style={{ width: "900px", height: "200px" }}>
                    <p className="text-white text-9xl font-quantico mx-8 ms-48 w-full">{currentTime.toLocaleTimeString()}</p>
                </div>
            </div>
            <div className="flex">
                <table className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 text-white sticky top-10 ms-20">
                    <thead>
                        <tr className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 mt-5">
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Day</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Opening Time</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Closing Time</th>                   
                        </tr>
                    </thead>
                    <tbody>
                        {businessHours.map((hourSetting) => (
                            <tr key={hourSetting.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hourSetting.day}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hourSetting.timeFrom}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hourSetting.timeTo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
