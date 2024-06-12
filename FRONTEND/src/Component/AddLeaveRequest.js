import React, { useState } from 'react';
import axios from 'axios';
import AuthenticationPopup from './AuthenticationPopup';

export default function AddLeaveRequest() {
  const [nic, setNic] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [noofdays, setNoofdays] = useState('');
  const [reason, setReason] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  function sendData(e) {
    e.preventDefault();

    const newLeaveRequest = {
      nic,
      name,
      date,
      noofdays,
      reason,
    };

    axios.post('http://localhost:8090/leaverequest/addleaverequest', newLeaveRequest)
      .then(() => {
        alert('Leave Request Added');
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  }

  const authenticate = (authenticated) => {
    if (authenticated) {
      //Redirect to another page after authentication
      window.location.href = '/leaverequest';
    }
  };

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

  return (
    <div>
      <form onSubmit={sendData}>
      
        <div className="container bg-gray-200 bg-opacity-70 rounded-lg px-8 py-4 mt-3 mx-5 mx-auto w-2/3">
          <center><h1>Add Leave Request</h1></center>
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900">
                NIC
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  placeholder="199525698V or 199552569889"
                  name="nic"
                  id="nic"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  pattern="[0-9]{9}[vV]{1}|[0-9]{12}"
                  onChange={handleNicChange}
                  required/>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  placeholder="Tim Jacks"
                  name="name"
                  id="name"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleNameChange}
                  required/>
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
                  onChange={(e)=>{

                    setDate(e.target.value);
                  }}
                  required/>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900">
                No of days
              </label>
              <div class="mt-2">
                <input
                  type="number"
                  placeholder="25"
                  name="noofdays"
                  id="noofdays"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e)=>{

                    setNoofdays(e.target.value);
                  }}
                  required/>
              </div>
            </div>

            <div class="col-span-full">
              <label class="block text-sm font-medium leading-6 text-gray-900">
                Reason
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  placeholder="Reason"
                  name="reason"
                  id="reason"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e)=>{

                    setReason(e.target.value);
                  }}
                  required/>

              </div>
            </div>



          </div>

          <div class="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Add
            </button>
          </div>
          </div>
        </form>

        <div className="flex justify-between mt-3 ">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-[14.5rem]"
            onClick={() => setShowPopup(true)}
            >
            View
          </button>
          <a href="/staffhome" type="button" class="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-[14.5rem]">
              Prev
            </a>
        </div>
      

      {showPopup && <AuthenticationPopup onAuthenticate={authenticate} />}
    </div>
  );
}
