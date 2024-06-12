import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Chome.js";

export default function ProfileList() {
  const [customer, setlist] = useState([]);
  const componentRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [showHi, setShowHi] = useState(false); // State for showing animated text

  useEffect(() => {
    function getprofile() {
      axios
        .get("http://localhost:8090/customer/")
        .then((res) => {
          setlist(res.data);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          alert(err.message);
        });
    }

    getprofile();
  }, []);

  // Function to handle deletion of a customer
  const onDeleteClick = async (cusid) => {
    // Show confirmation dialog
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this profile?"
    );

    // If user confirms deletion
    if (shouldDelete) {
      await axios.delete(`http://localhost:8090/customer/delete/${cusid}`);
      alert("Profile Deleted Successfully");
      window.location.reload(); // Refresh page after successful deletion
    }
    const enteredPassword = prompt(
      "Please enter the password to confirm deletion:"
    );
    if (enteredPassword === "abc123" || enteredPassword === "xyz123") {
      window.location.reload(); // Refresh page after successful deletion
    } else {
      alert("Incorrect password, deletion cancelled.");
    }
  };

  // Function to handle editing a customer profile
  const onEditClick = async (customerId) => {
    const enteredPassword = prompt(
      "Please enter the password to confirm editing:"
    );
    if (enteredPassword === "abc123" || enteredPassword === "xyz123") {
      // Navigate to the edit page
      window.location.href = `/Updatecustomer/${customerId}`;
    } else {
      alert("Incorrect password, editing cancelled.");
    }
  };

  const filteredList = customer.filter((customer) =>
    customer.cnic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to toggle showing "hi" text
  const toggleHi = () => {
    setShowHi(!showHi);
  };

  return (
    <div>
      <div>
        <h2 className="ms-20 my-15 mt-20 text-6xl font-extrabold text-white">
          Profile List
        </h2>
      </div>

      <div className="absolute top-2 right-8">
        {/* Search bar */}
        <div className="relative mt-48">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {/* Search icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-400"
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

          <input
            type="text"
            placeholder="Search "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-64 bg-gray-100 rounded-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 border border-transparent"
          />
        </div>
      </div>

      <div className="flex  items-center h-screen">
        <table
          className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 text-white sticky top-0 mx-20 mt-48 w-1/3"
          ref={componentRef}
        >
          <thead>
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-bold text-white  tracking-wider"
              >
                NIC Number
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((customer) => (
              <tr
                key={customer.id}
                className="bg-white border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {
                    searchTerm.toLowerCase() === customer.cnic.toLowerCase()
                      ? customer.cnic // If search term matches exactly, show full NIC number
                      : `${"•".repeat(
                          customer.cnic.length - 2
                        )}${customer.cnic.slice(-2)}` // Mask with dots
                  }
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex ml-48 gap-2">
                    {/* Edit profile button */}
                    <button
                      onClick={() => onEditClick(customer._id)}
                      className="bg-transparent hover:bg-green-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    >
                      Edit
                    </button>
                    {/* Delete profile button  */}
                    <button
                      onClick={() => onDeleteClick(customer._id)}
                      className="bg-transparent hover:bg-red-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Animated text box */}
        <div className="absolute top-55 right-32">
          <div
            className={`bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 text-white py-2 px-4 rounded-md animate-bounce`}
            onClick={toggleHi}
          >
            <h4>
              <b>
                Please provide your National Identity Card (NIC) number in the
                search box{" "}
              </b>{" "}
            </h4>
            <h4>
              <b>
                and enter the password to proceed with editting your profile or
                deleting your account !
              </b>{" "}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
