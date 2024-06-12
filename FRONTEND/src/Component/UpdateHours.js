import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UpdateHours(){
    const[day, setDay] = useState("");
    const[timeFrom, setTimeFrom] = useState("");
    const[timeTo, setTimeTo] = useState("");

    const{id} = useParams();
    console.log(id);

    function updateHour(e){
        e.preventDefault();

        const updatedHour = {
            day,
            timeFrom,
            timeTo
        };

        axios.put(`http://localhost:8090/hourSetting/updateSetting/${id}`, updatedHour)
        .then(()=>{
            alert("Business Hour Updated Successfully");
            window.location.href = "/editHourSetting";
        })
        .catch((err)=>{
            alert(err.messgage);
        });
    }

    useEffect(()=>{
        axios.get(`http://localhost:8090/hourSetting/get/${id}`)
        .then((response)=>{
            console.log(response);
            setDay(response.data.hour.day);
            setTimeFrom(response.data.hour.timeFrom);
            setTimeTo(response.data.hour.timeTo);
            
        }).catch((err)=>{
            alert(err.message);
        });
    }, []);


return(
    <div>
      <div className="relative">
            <h1 className="ms-20 my-15 mt-20 text-5xl font-extrabold text-white">Business Hours Setting - Update</h1>
            
            <form onSubmit={updateHour} className="w-half bg-gray-100 p-6 ms-60 my-10  p-4 m-60 border-gray-300 rounded-lg min-h-min bg-opacity-50">
            <div className="flex justify-between items-center"> 
               
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <div class="justify-center form-group flex mx-10">
                        <label for="day" class="block text-sm font-medium text-black my-4 mt-10">Day of The Week : </label>
                        <select id="vehicle-type" onChange={(e) => setDay(e.target.value)} value={day} name="vehicle-type" class="mr-5 ml-5 h-10 mt-7 p-2 block border-gray-300 rounded-md text-black">
                                <option value="">Select a Day</option> {/* Add an empty option for default selection */}
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                        </select>    
                    </div> 

                    <div class="form-group flex mx-10">

                        <label for="timeFrom" class="block text-sm font-medium text-black my-4 mt-5">Opening Time : </label>
                        <input type="time" id="timeFrom" onChange={(e) => setTimeFrom(e.target.value)} value={timeFrom} name="timeFrom" class="mr-5 ml-5 h-10 mt-2 p-2 block border-gray-300 rounded-md text-black" required></input>

                        <label for="timeTo" class="block text-sm font-medium text-black my-4 mt-5">Closing Time : </label>
                        <input type="time" id="timeTo" onChange={(e) => setTimeTo(e.target.value)} value={timeTo} name="timeFrom" class="mr-5 ml-5 h-10 mt-2 p-2 block border-gray-300 rounded-md text-black" required ></input>
                    </div>
                </div>
                <div class="mt-2 mb-2 flex justify-center">
                    <button onClick={updateHour} type="submit" class="bg-gradient-to-r from-yellow-700 via-y ellow-800 to-yellow-900 hover:from-amber-900 hover:via-amber-800 
                                  hover:to-amber-700 text-white font-bold py-3 px-5 rounded-lg mr-2 opacity-90 transition duration-300
                                  ease-in-out transform hover:scale-105" >Update</button>
                </div>
            </form>

            <div class="mt-10">..</div>

            
        </div>
    </div>
);
}

