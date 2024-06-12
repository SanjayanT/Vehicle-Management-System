import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { useReactToPrint } from 'react-to-print';

export default function StaffDetails() {

  const [staffdetails, setStaff] = useState([]); // State for storing staff details
  const [searchTerm, setSearchTerm] = useState(""); // State for storing search term
  const componentRef = useRef();  //Add a reference for accessing the component to be printed

  // Fetch staff details from the server on component mount
  useEffect(() => {
    function getStaff() {
      axios.get("http://localhost:8090/staffdetails/").then((res) => {
        console.log(res);
        setStaff(res.data);
      }).catch((err) => {
        alert(err.message);
      })
    }
    getStaff();
  }, [])

  // Function to handle deletion of a staff member
  const onDeleteClick = async (userId) => {
    const confirmed = window.confirm("Are you sure you want to delete this staff entry?");
    if (confirmed) {
      await axios.delete(`http://localhost:8090/staffdetails/delete/${userId}`);
      alert('User Deleted Successfully');
      window.location.reload(); // Refresh page after successful deletion
    }
  }

  // Function to filter staff details based on search term
  const filteredStaff = staffdetails.filter((staff) =>
    staff.nic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.joindate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //Generate PDF
  const generatePDF = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Staff Details",
    // onAfterPrint: () => alert("Data Saved in PDF"),
    // onPrintError: () => alert("Error in Printing"),

  });

  return (
    <div class="mt-3">

      <h2 class="text-white mb-2 text-center text-3xl font-bold text-white">Employee Details</h2>

      {/* Search bar */}
      <div class="flex justify-between ml-1">
        <div class="relative">
          <input
            type="text"
            placeholder="Search here.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            class="border border-gray-300 p-2 rounded-md mb-4 pl-10"
          // Added pl-10 class for left padding to accommodate the icon
          />
          <div class="absolute inset-y-5 left-0 flex items-center pl-3 pointer-events-none top-[0.4rem]">
            {/* Search icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-300"
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

        <button onClick={generatePDF} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 mr-[1rem]">
          Generate PDF
        </button>
      </div>



      {/* Table to display staff details */}
      <div class="overflow-x-auto max-h-[25rem] overflow-y-scroll ml-1 mr-1 rounded-md overflow-hidden">
        <div ref={componentRef}>

          <div className="print:block hidden font-bold mx-10 justify-end">
            <h1 class="text-center text-4xl font-bold mt-4 mb-[5rem]">Ryome Motor Cares</h1>
            <div className="mt-5 mb-1" >

              <p class="mr-4">Ryome Motor Cares</p>
              <p class="mr-4">No:Colombo 07</p>
              <p class="mr-4">Tel: 011 294 1767</p>
              <p class="mr-4">Fax: 011 011 0123</p>

              <h1 class="text-center text-3xl font-bold mt-4 mb-[1rem]">Staff Details</h1>
            </div>
          </div>

          <table class="min-w-full divide-y divide-gray-200" ref={componentRef}>

            <thead>
              <tr class="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-700 text-white sticky top-0"> {/* Added bg-blue-500 for blue background and text-white for white text and Added sticky and top-0 for sticky header*/}
                <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">ID</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">NIC</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Name</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Designation</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Address</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Email</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Mobile no</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Join date</th>
                <div className="print:hidden">
                  <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Action</th>
                </div>
              </tr>
            </thead>

            <tbody>
              {/* Loop through filtered staff details and display in table rows */}
              {filteredStaff.map((staffdetails, index) => (
                <tr key={index} class="bg-white border-b border-gray-200 hover:bg-gray-50">

                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staffdetails.nic}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staffdetails.name}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staffdetails.designation}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staffdetails.address}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staffdetails.email}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staffdetails.mobileno}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staffdetails.joindate}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex items-center justify-end gap-2 print:hidden">
                      {/* Edit staff button */}
                      <a href={`/editstaff/${staffdetails._id}`} type="button" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Edit
                      </a>
                      {/* Delete staff button  */}
                      <button onClick={() => onDeleteClick(staffdetails._id)} class="bg-transparent hover:bg-red-600 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="fixed bottom-0 w-full flex justify-between px-10 print:block hidden">
            <div className="font-bold text-left mb-[1rem]">.................................<br />Date</div>
            <div className="font-bold text-right mb-[1rem]">.................................<br />Singnature</div>
          </div>

        </div>
      </div>
      {/* Button to add a new staff member */}
      <div class="mt-4 flex justify-between">
        <a href="/addstaff" class="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3 mb-5">
          Add
        </a>
        <a href="/staffhome" class="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-3 mb-5">
          Prev
        </a>
      </div>
    </div>
  );
};
