import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UpdateHoliday(){
    const[busyDate, setBusyDate] = useState("");
    const[event, setEvent] = useState("");

    const{id} = useParams();
    console.log(id);

    function updateHoliday(e){
        e.preventDefault();

        const updatedHoliday = {
            busyDate,
            event
        };

        axios.put(`http://localhost:8090/holidaySetting/updateHoliday/${id}`, updatedHoliday)
        .then(()=>{
            alert("Holiday Updated Successfully");
            window.location.href = "/editHolidaySetting";
        })
        .catch((err)=>{
            alert(err.messgage);
        });
    }

    useEffect(()=>{
        axios.get(`http://localhost:8090/holidaySetting/get/${id}`)
        .then((response)=>{
            console.log(response);
            setBusyDate(response.data.holiday.busyDate);
            setEvent(response.data.holiday.event);
            
        }).catch((err)=>{
            alert(err.message);
        });
    }, []);

    return(
    <div>
      <div className="relative">
            <h1 className="ms-20 my-15 mt-20 text-5xl font-extrabold text-white">Holidays - Update</h1>

            <form onSubmit={updateHoliday} className="w-half bg-gray-100 p-6 ms-60 my-10 p-4 m-60 border-gray-300 rounded-lg min-h-min bg-opacity-50 mb-10">
            <div className="flex justify-between items-center"> 
               
               </div> 
                <div class="grid grid-cols-1 gap-4">
                    <div class="justify-center form-group flex mx-10">
                        <label for="busyDate" class="block text-sm font-medium text-black my-4 mt-10">Date : </label>
                        <input type="date" id="busydate" name="busyDate" class="mr-5 ml-5 h-10 mt-7 p-2 block border-gray-300 rounded-md text-black" value={busyDate} required onChange={(e) => setBusyDate(e.target.value)}></input>
                    </div> 
                    <div class="justify-center form-group flex mx-10">
                        <label for="event" class="block text-sm font-medium text-black my-4 mt-5">Event :</label>
                        <input type="text"  id="event" name="event" class="mr-5 ml-5 h-10 mt-2 p-2 block border-gray-300 rounded-md text-black" value={event} required onChange={(e) => setEvent(e.target.value)}></input>
                    </div>
                </div>
                <div class="mt-2 mb-2 flex justify-center">
                    <button onClick={updateHoliday} type="submit" class="bg-gradient-to-r from-yellow-700 via-y ellow-800 to-yellow-900 hover:from-amber-900 hover:via-amber-800 
                                  hover:to-amber-700 text-white font-bold py-3 px-5 rounded-lg mr-2 opacity-90 transition duration-300
                                  ease-in-out transform hover:scale-105">Update</button>
                </div>
            </form>
            <div class="mt-10">..</div>

            
        </div>
    </div>
    );

}