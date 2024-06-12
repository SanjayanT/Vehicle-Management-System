import React, { useState, useEffect, useRef  } from 'react';
import axios from "axios";
import { useReactToPrint } from 'react-to-print';

export default function EmployeePayroll() {
  const [employeepayroll, setPayroll] = useState([]); // State for storing payroll details
  const [searchTerm, setSearchTerm] = useState(""); // State for storing search term
  const [sortOrder, setSortOrder] = useState("asc"); // State for sorting order, default is ascending
  //const componentRef = useRef();  //Add a reference for accessing the component to be printed

  // Fetch payroll details from the server on component mount
  useEffect(() => {
    function getPayroll() {
      axios.get("http://localhost:8090/employeepayroll/").then((res) => {
        console.log(res);
        setPayroll(res.data);
      }).catch((err) => {
        alert(err.message);
      })
    }
    getPayroll();
  }, [])

  // Function to handle deletion of a payroll
  const onDeleteClick = async (userId) => {
    const confirmed = window.confirm("Are you sure you want to delete this payroll entry?");
    if (confirmed) {
    await axios.delete(`http://localhost:8090/employeepayroll/delete/${userId}`);
    alert('Payroll Deleted Successfully');
    window.location.reload(); // Refresh page after successful deletion
    }
  }

   // Function to filter payroll details based on search term
   const filteredPayroll = employeepayroll.filter((payroll) =>
   payroll.nic.toLowerCase().includes(searchTerm.toLowerCase()) ||
   payroll.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
   payroll.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
   payroll.otstatus.toLowerCase().includes(searchTerm.toLowerCase())
   
 );

 // Function to handle sorting by date
 const sortByDate = () => {
  const sortedPayroll = [...employeepayroll].sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.date) - new Date(b.date);
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  });
  setPayroll(sortedPayroll);
  setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sorting order
};

// //Generate PDF
// const generatePDF = useReactToPrint({
//   content: () => componentRef.current,
//   documentTitle: "Employee Payroll",
//   onAfterPrint: () => alert("Data Saved in PDF"),
//   onPrintError: () => alert("Error in Printing"),

// });

  return (

    <div class="mt-3">

      <h2 class="text-white mb-2 text-center text-3xl font-bold text-white">Employee Payroll</h2>

      {/* Search bar */}
      <div class="flex justify-between ml-8">
      <div className="relative">
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

        <div class="flex justify-between">
          <a href="/stafffinancerelation" class="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 mr-[2rem]">
            view
          </a>

          {/* <button onClick={generatePDF} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 mr-8">
            Generate PDF
          </button> */}
        </div>
    </div>

  {/* Table to display payroll details */}
  <div class="overflow-x-auto max-h-[25rem] overflow-y-scroll ml-8 mr-8 rounded-md overflow-hidden">
    <table class="min-w-full divide-y divide-gray-200">
      <thead>
        <tr class="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-700 text-white sticky top-0"> {/* Added bg-blue-500 for blue background and text-white for white text and Added sticky and top-0 for sticky header*/}
          <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">ID</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">NIC</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Name</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                {/* Sort by date button */}
                <button onClick={sortByDate} className="text-left text-xs font-bold text-black uppercase tracking-wider">
                  Date
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-1" viewBox="0 0 25 25" fill="currentColor">
                    {sortOrder === "asc" ? (
                      <path fillRule="evenodd" d="M10 3a1 1 0 00-1.707-.707l-7 7a1 1 0 001.414 1.414L5 5.414V17a1 1 0 102 0V5.414l2.293 2.293a1 1 0 101.414-1.414l-3-3z" clipRule="evenodd" />
                    ) : (
                      <path fillRule="evenodd" d="M10 17a1 1 0 01-1.707.707l-7-7a1 1 0 111.414-1.414L5 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3z" clipRule="evenodd" />
                    )}
                  </svg>
                </button>
              </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">OT Status</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">OT Payment</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Bonus</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Penalty Amt</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Salary</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Action</th>
        </tr>
      </thead>
      <tbody>
        {/* Loop through payroll details and display in table rows */}
        {filteredPayroll.map((employeepayroll, index) => (
          <tr key={index} class="bg-white border-b border-gray-200 hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employeepayroll.nic}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employeepayroll.name}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employeepayroll.date}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employeepayroll.otstatus}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employeepayroll.otpayment}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employeepayroll.bonus}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employeepayroll.penaltyamt}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employeepayroll.salary}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div class="flex items-center justify-start gap-2">
                {/* Edit payroll button */}
                <a href={`/editpayroll/${employeepayroll._id}`} type="button" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                      Edit
                </a>
                {/* Delete payroll button  */}
                <button onClick={() => onDeleteClick(employeepayroll._id)} class="bg-transparent hover:bg-red-600 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                      Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  {/* Button to add a new payroll member */}
  <div className="mt-3 flex justify-between">
    <a href="/addpayroll" class="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-8 mb-5">
      Add
    </a>
    <a href="/staffhome" class="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-8 mb-5">
      Prev
    </a>
  </div>
</div>

  );
};
