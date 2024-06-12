import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ViewHourSetting() {
    const [businessHours, setSetting] = useState([]);
    //const componentRef = useRef();

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

        getSetting();
    }, []);

    // Function to handle deletion of a hour
    const onDeleteClick = async (settingId) => {
        const confirmed = window.confirm('Are you sure you want to delete this business hour setting?');
        if (confirmed) {
            await axios.delete(`http://localhost:8090/hourSetting/deleteSetting/${settingId}`);
            alert('Business Hours Deleted Successfully');
            window.location.reload(); // Refresh page after successful deletion
        }
    };
    
  return(
    <div>
        <h2 className="ms-20 my-10 mt-20 text-6xl font-extrabold text-white">Business Hours</h2>
        <div class="flex">
        
        <table  class="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 text-white sticky top-10 ms-20">
            <thead>
                <tr className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 mt-5">
                        <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Day</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Opening Time</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Closing Time</th>                   
                </tr>
            </thead>
        <tbody>
            {businessHours.map((hourSetting) => (
                <tr key={hourSetting.id} class="bg-white border-b border-gray-200 hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hourSetting.day}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hourSetting.timeFrom}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hourSetting.timeTo}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div class="flex items-center justify-start gap-2">
                                {/*Edit hours button */}
                                <Link to ={`/updateSetting/${hourSetting._id}`} ><button className="bg-transparent hover:bg-green-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                    Edit</button>
                                </Link>
                                {/* Delete hour button  */}
                                <button onClick={() => onDeleteClick(hourSetting._id)} class="bg-transparent hover:bg-red-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                    Delete
                                </button>
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
</div>
);


}