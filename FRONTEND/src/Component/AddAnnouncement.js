import React, {useState} from "react";
import axios from "axios";

export default function AddAnnouncement(){

    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [announcement, setAnnouncement] = useState("");

    function sendData(e){
      e.preventDefault();
      //alert("Inserted");

      const newAnnouncement = {

        date,
        title,
        announcement
      }

      axios.post("http://localhost:8090/employeeannouncement/addannouncement",newAnnouncement).then(()=>{

      alert("Announcement Added")
      window.location.reload();
  }).catch((err)=>{
      alert(err)
  })

}

function handleDateChange(e) {
  const selectedDate = new Date(e.target.value);
  const currentDate = new Date();

   // Set hours, minutes, seconds, and milliseconds to 0 for both dates
   currentDate.setHours(0, 0, 0, 0);
   selectedDate.setHours(0, 0, 0, 0);

  if (selectedDate > currentDate) {
    alert("Please select a date on or before today.");
  } else {
    setDate(e.target.value);
  }
}

    


    return(

      <form onSubmit={sendData}>
        <div className="container bg-gray-200 bg-opacity-70 rounded-lg px-8 py-4 mt-3 mx-auto w-2/3">
      <center><h1>Add Announcement</h1></center>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Date
          </label>
          <div className="mt-2">
            <input
              type="date"
              name="date"
              id="date"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={handleDateChange}
              required/>
          </div>
        </div>
        </div>

        <div className="sm:col-span-3">
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Title
        </label>
        <div className="mt-2">
          <input
            type="text"
            placeholder="Title"
            name="title"
            id="title"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(e)=>{

              setTitle(e.target.value);
            }}
            required/>
        </div>
      </div>

  
        
  
        <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Announcement
                </label>
                <div className="mt-2">
                  <textarea
                    type="text"
                    placeholder="Announcement"
                    name="announcement"
                    id="announcement"
                    rows={5}
                    cols={12}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e)=>{

                      setAnnouncement(e.target.value);
                    }}
                    required/>
                </div>
              </div>
        
  
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <a href="/employeeannouncement" type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </a>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Add
        </button>
      </div>
      </div>
    </form>
  
    )
}