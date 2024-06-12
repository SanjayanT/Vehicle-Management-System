import React, { useState, useEffect } from 'react';
import axios from "axios";

export default function LeaveRequest() {
  const [leaverequest, setLeave] = useState([]); // State for storing leave request details
  const [searchTerm, setSearchTerm] = useState(""); // State for storing search term

  // Fetch leave details from the server on component mount
  useEffect(() => {
    function getLeave() {
      axios.get("http://localhost:8090/leaverequest/").then((res) => {
        console.log(res);
        setLeave(res.data);
      }).catch((err) => {
        alert(err.message);
      })
    }
    getLeave();
  }, [])

  // Function to handle deletion of a leave request
  const onDeleteClick = async (userId) => {
    const confirmed = window.confirm("Are you sure you want to delete this leave request?");
    if (confirmed) {
    await axios.delete(`http://localhost:8090/leaverequest/delete/${userId}`);
    alert('Leave Request Deleted Successfully');
    window.location.reload(); // Refresh page after successful deletion
    }
  }

  // Function to filter leave requests based on search term
  const filteredLeave = leaverequest.filter((leave) =>
    leave.nic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leave.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leave.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leave.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (

    <div class="mt-3">

      <h2 class="text-white mb-2 text-center text-3xl font-bold text-white">Leave Request</h2>

      {/* Search bar */}
      <div className="relative ml-[8rem]">
        <input
          type="text"
          placeholder="Search here.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2 rounded-md mb-4 pl-10"
        // Added pl-10 class for left padding to accommodate the icon
        />
        <div className="absolute inset-y-5 left-0 flex items-center pl-3 pointer-events-none top-[0.4rem]">
          {/* Search icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Table to display leave requests */}
      <div class="overflow-x-auto max-h-[25rem] overflow-y-scroll ml-[8rem] mr-[8rem] rounded-md overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr class="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-700 text-white sticky top-0"> {/* Added bg-blue-500 for blue background and text-white for white text and Added sticky and top-0 for sticky header*/}
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">ID</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">NIC</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Name</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Date (From)</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">No of Days</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Reason</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Status</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Loop through leave requests and display in table rows */}
            {filteredLeave.map((leaverequest, index) => (
              <tr key={index} class="bg-white border-b border-gray-200 hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leaverequest.nic}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leaverequest.name}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leaverequest.date}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leaverequest.noofdays}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leaverequest.reason}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leaverequest.status}</td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-left justify-start gap-2">
                    {/* Edit leave button */}
                    <a href={`/editleaverequest/${leaverequest._id}`} type="button" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                      Edit
                    </a>
                    {/* Delete leave button  */}
                    <button onClick={() => onDeleteClick(leaverequest._id)} class="bg-transparent hover:bg-red-600 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Button to add a new staff member */}
      <div className="mt-4">
        <a href="/addleaverequest" class="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-[8rem]">
          Back
        </a>
      </div>
    </div>

  );
};
