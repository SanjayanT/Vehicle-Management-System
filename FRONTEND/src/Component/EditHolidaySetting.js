import React, { useState, useEffect } from "react";
import axios from "axios";
import {useReactToPrint} from 'react-to-print';
import { Link } from "react-router-dom";

export default function ViewHolidaysSetting() {
    const [holidays, setSet] = useState([]);
    //const componentRef = useRef();

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

    // Function to handle deletion of a hour
    const onDeleteClick = async (holidayId) => {
        const confirmed = window.confirm('Are you sure you want to delete this holiday setting?');
        if (confirmed) {
            await axios.delete(`http://localhost:8090/holidaySetting/deleteHoliday/${holidayId}`);
            alert('Holiday setting Deleted Successfully');
            window.location.reload(); // Refresh page after successful deletion
        }
    };

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
            <h2 className="ms-20 my-10 mt-20 text-6xl font-extrabold text-white">Holidays</h2>
            <div class="flex">      

        <table  class="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 text-white sticky top-10 mx-10">
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
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div class="flex items-center justify-start gap-2">
                                {/*Edit holiday button */}
                                <Link to ={`/updateHoliday/${holidaySetting._id}`} ><button className="bg-transparent hover:bg-green-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                    Edit</button>
                                </Link>
                                {/* Delete hour button  */}
                                <button onClick={() => onDeleteClick(holidaySetting._id)} class="bg-transparent hover:bg-red-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
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