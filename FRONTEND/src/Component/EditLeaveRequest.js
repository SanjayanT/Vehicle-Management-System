import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


export default function EditLeaveRequest(){

    const [nic, setNic] = useState(""); // State for NIC
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [noofdays, setNoofdays] = useState("");
    const [reason, setReason] = useState("");
    const [status, setStatus] = useState("");

    const { id } = useParams(); // Get the ID from URL params

    // Fetch leave details from the server on component mount
  useEffect(() => {
    axios.get(`http://localhost:8090/leaverequest/get/${id}`).then((res) => {
      setNic(res.data.leave.nic);
      setName(res.data.leave.name);
      setDate(res.data.leave.date);
      setNoofdays(res.data.leave.noofdays);
      setReason(res.data.leave.reason);
      setStatus(res.data.leave.status);
    }).catch((err) => {
      alert(err.message);
    });
  }, [id]);

  // Function to update leave details
  function updateLeave(e) {
    e.preventDefault();

    const updatedLeave = {
      nic,
      name,
      date,
      noofdays,
      reason,
      status,
    };

    // Send updated staff details to the server
    axios
      .put(`http://localhost:8090/leaverequest/editleaverequest/${id}`, updatedLeave)
      .then(() => {
        alert("Leave request Updated");
        window.location.href = "/LeaveRequest";
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }

  // NIC format error message
function handleNicChange(e) {
  const value = e.target.value;
  const nicPattern = /^[0-9]{0,9}[vV]{0,1}$|^[0-9]{0,12}$/;

  if (!nicPattern.test(value)) {
    // Prevent further input by freezing the input field
    e.target.value = e.target.value.slice(0, -1);
  } else {
    setNic(value.toUpperCase()); // Convert V/v to uppercase for consistency
  }
}

 // Name format error message
 function handleNameChange(e) {
  const value = e.target.value;
  const namePattern = /^[A-Za-z\s]+$/;

  if (!namePattern.test(value)) {
    // Prevent further input by freezing the input field
    e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '');
  } else {
    setName(value);
  }
}

    return(


      <form onSubmit={updateLeave}>
        <div className="container bg-gray-200 bg-opacity-70 rounded-lg px-8 py-4 mt-3 mx-5 mx-auto w-2/3">
        <center><h1>Update Leave Request</h1></center>
        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label class="block text-sm font-medium leading-6 text-gray-900">
              NIC
            </label>
            <div class="mt-2">
              <input
                type="text"
                name="nic"
                id="nic"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={nic} //showing value
                pattern="[0-9]{9}[vV]{1}|[0-9]{12}"
                onChange={handleNicChange}
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label class="block text-sm font-medium leading-6 text-gray-900">
              Name
            </label>
            <div class="mt-2">
              <input
                type="text"
                name="name"
                id="name"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={name}
                onChange={handleNameChange}
              />
            </div>
          </div>

          <div class="sm:col-span-3 sm:col-start-1">
            <label class="block text-sm font-medium leading-6 text-gray-900">
              Date (From)
            </label>
            <div class="mt-2">
              <input
                type="date"
                name="date"
                id="date"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={date}
                onChange={(e)=>{

                  setDate(e.target.value);
                }}
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label class="block text-sm font-medium leading-6 text-gray-900">
              No of days
            </label>
            <div class="mt-2">
              <input
                type="number"
                name="noofdays"
                id="noofdays"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={noofdays}
                onChange={(e)=>{

                  setNoofdays(e.target.value);
                }}
              />
            </div>
          </div>

          <div class="col-span-full">
            <label class="block text-sm font-medium leading-6 text-gray-900">
              Reason
            </label>
            <div class="mt-2">
              <input
                type="text"
                name="reason"
                id="reason"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={reason}
                onChange={(e)=>{

                  setReason(e.target.value);
                }}
              />

            </div>
          </div>

          <div class="col-span-full">
            <label class="block text-sm font-medium leading-6 text-gray-900">
              Status
            </label>
            <div class="mt-2">
              <select
                type="text"
                name="status"
                id="status"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={status}
                onChange={(e)=>{

                  setStatus(e.target.value);
                }}
              required>
                <option selected>Choose...</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                  <option>Pending</option>
              </select>


            </div>
          </div>



        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
          <a href="/leaverequest" type="button" class="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </a>
          <button
            type="submit"
            class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Add
          </button>
        </div>
        </div>
      </form>



    )
}