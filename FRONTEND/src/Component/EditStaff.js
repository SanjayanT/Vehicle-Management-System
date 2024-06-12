import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


export default function EditStaff() {

    const [nic, setNic] = useState(""); // State for NIC
    const [name, setName] = useState(""); // State for Name
    const [designation, setDesignation] = useState(""); // State for Designation
    const [address, setAddress] = useState(""); // State for Address
    const [email, setEmail] = useState(""); // State for Email
    const [mobileno, setMobileno] = useState(""); // State for Mobile Number
    const [joindate, setJoindate] = useState(""); // State for Joined Date
  
    const { id } = useParams(); // Get the ID from URL params

 // Fetch staff details from the server on component mount
  useEffect(() => {
    axios.get(`http://localhost:8090/staffdetails/get/${id}`).then((res) => {
      setNic(res.data.staff.nic);
      setName(res.data.staff.name);
      setDesignation(res.data.staff.designation);
      setAddress(res.data.staff.address);
      setEmail(res.data.staff.email);
      setMobileno(res.data.staff.mobileno);
      setJoindate(res.data.staff.joindate);
    }).catch((err) => {
      alert(err.message);
    });
  }, [id]);

  // Function to update staff details
  function updateStaff(e) {
    e.preventDefault();

    const updatedStaff = {
      nic,
      name,
      designation,
      address,
      email,
      mobileno,
      joindate,
    };

    // Send updated staff details to the server
    axios
      .put(`http://localhost:8090/staffdetails/editstaff/${id}`, updatedStaff)
      .then(() => {
        alert("Staff Updated");
        window.location.href = "/StaffDetails";
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }

  function handleDateChange(e) {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();

    if (selectedDate > currentDate) {
      alert("Please select a date on or before today.");
    } else {
      setJoindate(e.target.value);
    }
  }

  const today = new Date().toISOString().split('T')[0];

  // Email format error message
  function handleEmailChange(e) {
    const value = e.target.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(value)) {
      setEmail(e.target.value.replace(/[^A-Za-z0-9@.]/g, ""));
    } else {
      setEmail(value);
    }
  }
    

return (
  <form onSubmit={updateStaff}>
    <div className="container bg-gray-200 bg-opacity-70 rounded-lg px-8 py-4 mt-3 mx-5 mx-auto w-2/3">
    <center><h1>Edit Staff</h1></center>
    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      <div className="sm:col-span-3">
        <label className="block text-sm font-medium leading-6 text-gray-900">
          NIC
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="nic"
            id="nic"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={nic} //showing value
            pattern="[0-9]{9}[vV]{1}|[0-9]{12}"
            onChange={(e) => {
              const inputValue = e.target.value;
              const regex = /^[0-9Vv]+$/; // Regular expression to allow letters, numbers, and spaces
          
              if (regex.test(inputValue) || e.nativeEvent.inputType === "deleteContentBackward") {
                setNic(inputValue);
              }
            }}
          />
        </div>
      </div>

      <div className="sm:col-span-3">
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Name
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={name} //showing value
            onChange={(e) => {
              const inputValue = e.target.value;
              const regex = /^[A-Za-z ]+$/; // Regular expression to allow letters, numbers, and spaces
          
              if (regex.test(inputValue) || e.nativeEvent.inputType === "deleteContentBackward") {
                setName(inputValue);
              }
            }}
          />
        </div>
      </div>

      <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={email} //showing value
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\.[a-zA-Z]{2,}"
                  
                  onChange={handleEmailChange}
                />
              </div>
            </div>
      
            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={address}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const regex = /^[A-Za-z0-9 ]+$/; // Regular expression to allow letters, numbers, and spaces
                
                    if (regex.test(inputValue) || e.nativeEvent.inputType === "deleteContentBackward") {
                      setAddress(inputValue);
                    }
                  }}
                />
              </div>
            </div>
     

      <div className="sm:col-span-2 sm:col-start-1">
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Designation
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="designation"
            id="designation"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={designation}
            onChange={(e) => {
              const inputValue = e.target.value;
              const regex = /^[A-Za-z ]+$/; // Regular expression to allow letters, numbers, and spaces
          
              if (regex.test(inputValue) || e.nativeEvent.inputType === "deleteContentBackward") {
                setDesignation(inputValue);
              }
            }}
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Mobile Number
        </label>
        <div className="mt-2">
          <input
            type="tel"
            name="mobileno"
            id="mobileno"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={mobileno}
            pattern="[0-9]{10}"
            onChange={(e) => {
              const inputValue = e.target.value;
              const regex = /^[0-9 ]+$/; // Regular expression to allow letters, numbers, and spaces
          
              if (regex.test(inputValue) || e.nativeEvent.inputType === "deleteContentBackward") {
                setMobileno(inputValue);
              }
            }}
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Join Date
        </label>
        <div className="mt-2">
          <input
            type="date"
            name="joindate"
            id="joindate"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={joindate}
            onChange={handleDateChange}
            max={today}
          />
        </div>
      </div>
    </div>

    <div className="mt-6 flex items-center justify-end gap-x-6">
      <a href="/staffdetails" type="button" className="text-sm font-semibold leading-6 text-gray-900">
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


// export default function EditStaff() {

//   const [nic, setNic] = useState(""); // State for NIC
//   const [name, setName] = useState(""); // State for Name
//   const [designation, setDesignation] = useState(""); // State for Designation
//   const [address, setAddress] = useState(""); // State for Address
//   const [email, setEmail] = useState(""); // State for Email
//   const [mobileno, setMobileno] = useState(""); // State for Mobile Number
//   const [joindate, setJoindate] = useState(""); // State for Joined Date
//   const [mobileNoError, setMobileNoError] = useState("");

//   const { id } = useParams(); // Get the ID from URL params

// // Fetch staff details from the server on component mount
// useEffect(() => {
//   axios.get(`http://localhost:8090/staffdetails/get/${id}`).then((res) => {
//     setNic(res.data.staff.nic);
//     setName(res.data.staff.name);
//     setDesignation(res.data.staff.designation);
//     setAddress(res.data.staff.address);
//     setEmail(res.data.staff.email);
//     setMobileno(res.data.staff.mobileno);
//     setJoindate(res.data.staff.joindate);
//   }).catch((err) => {
//     alert(err.message);
//   });
// }, [id]);

// // Function to update staff details
// function updateStaff(e) {
//   e.preventDefault();

//   const updatedStaff = {
//     nic,
//     name,
//     designation,
//     address,
//     email,
//     mobileno,
//     joindate,
//   };

//   // Send updated staff details to the server
//   axios
//     .put(`http://localhost:8090/staffdetails/editstaff/${id}`, updatedStaff)
//     .then(() => {
//       alert("Staff Updated");
//       window.location.href = "/StaffDetails";
//     })
//     .catch((err) => {
//       alert(err.response.data.message);
//     });
// }

// function handleDateChange(e) {
//   const selectedDate = new Date(e.target.value);
//   const currentDate = new Date();

//   if (selectedDate > currentDate) {
//     alert("Please select a date on or before today.");
//   } else {
//     setJoindate(e.target.value);
//   }
// }

// // Name format error message
// function handleNameChange(e) {
//   const value = e.target.value;
//   const namePattern = /^[A-Za-z\s]+$/;

//   if (!namePattern.test(value)) {
//     // Prevent further input by freezing the input field
//     e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '');
//   } else {
//     setName(value);
//   }
// }

// // Designation format error message
// function handleDesignationChange(e) {
//   const value = e.target.value;
//   const designationPattern = /^[A-Za-z\s]+$/;

//   if (!designationPattern.test(value)) {
//     // Prevent further input by freezing the input field
//     e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '');
//   } else {
//     setDesignation(value);
//   }
// }

// // Address format error message
// function handleAddressChange(e) {
//   const value = e.target.value;
//   const addressPattern = /^[A-Za-z0-9\s]+$/;

//   if (!addressPattern.test(value)) {
//     // Prevent further input by freezing the input field
//     e.target.value = e.target.value.replace(/[^A-Za-z0-9\s]/g, '');
//   } else {
//     setAddress(value);
//   }
// }

// // NIC format error message
// function handleNicChange(e) {
//   const value = e.target.value;
//   const nicPattern = /^[0-9]{0,9}[vV]{0,1}$|^[0-9]{0,12}$/;

//   if (!nicPattern.test(value)) {
//     // Prevent further input by freezing the input field
//     e.target.value = e.target.value.slice(0, -1);
//   } else {
//     setNic(value.toUpperCase()); // Convert V/v to uppercase for consistency
//   }
// }

// // // Email format error message
// // function handleEmailChange(e) {
// // const value = e.target.value;
// // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// // if (!emailPattern.test(value)) {
// //   // Prevent further input by freezing the input field
// //   e.target.value = e.target.value.replace(/[^A-Za-z0-9@.]/g, '');
// // } else {
// //   setEmail(value);
// // }
// // }

//   // Email format error message      
//   function handleEmailChange(e) {
//     const value = e.target.value;
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailPattern.test(value)) {
//       setEmail(e.target.value.replace(/[^A-Za-z0-9@.]/g, ""));        //<-------------------------------------------------
//     } else {
//       setEmail(value);
//     }
//   }

// //Mobile no validation
// function handleMobileNoChange(e) {
// const value = e.target.value;
// const mobilePattern = /^[0-9]{10}$/;

// if (value.length === 10 && !mobilePattern.test(value)) {
//   setMobileNoError("Please enter a valid 10-digit phone number.");
// } else if (value.length > 10) {
//   e.target.value = e.target.value.slice(0, 10);
// } else if (value.length < 10) {
//   setMobileNoError("Please enter a 10-digit phone number.");
// } else {
//   setMobileno(value);
//   setMobileNoError("");
// }
// }
  

// return (
// <form onSubmit={updateStaff}>
//   <div className="container bg-gray-200 bg-opacity-70 rounded-lg px-8 py-4 mt-3 mx-5 mx-auto w-2/3">
//   <center><h1>Edit Staff</h1></center>
//   <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//     <div className="sm:col-span-3">
//       <label className="block text-sm font-medium leading-6 text-gray-900">
//         NIC
//       </label>
//       <div className="mt-2">
//         <input
//           type="text"
//           name="nic"
//           id="nic"
//           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//           value={nic} //showing value
//           pattern="[0-9]{9}[vV]{1}|[0-9]{12}"
//           onChange={handleNicChange}
//         />
//       </div>
//     </div>

//     <div className="sm:col-span-3">
//       <label className="block text-sm font-medium leading-6 text-gray-900">
//         Name
//       </label>
//       <div className="mt-2">
//         <input
//           type="text"
//           name="name"
//           id="name"
//           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//           value={name} //showing value
//           onChange={handleNameChange}
//         />
//       </div>
//     </div>

//     <div className="col-span-full">
//             <label className="block text-sm font-medium leading-6 text-gray-900">
//               Email
//             </label>
//             <div className="mt-2">
//               <input
//                 type="email"
//                 name="email"
//                 id="email"
//                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 value={email} //showing value
//                 //pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\.[a-zA-Z]{2,}"
//                 onChange={handleEmailChange}
//               />
//             </div>
//           </div>
    
//           <div className="col-span-full">
//             <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
//               Address
//             </label>
//             <div className="mt-2">
//               <input
//                 type="text"
//                 name="address"
//                 id="address"
//                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 value={address}
//                 onChange={handleAddressChange}
//               />
//             </div>
//           </div>
   

//     <div className="sm:col-span-2 sm:col-start-1">
//       <label className="block text-sm font-medium leading-6 text-gray-900">
//         Designation
//       </label>
//       <div className="mt-2">
//         <input
//           type="text"
//           name="designation"
//           id="designation"
//           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//           value={designation}
//           onChange={handleDesignationChange}
//         />
//       </div>
//     </div>

//     <div className="sm:col-span-2">
//       <label className="block text-sm font-medium leading-6 text-gray-900">
//         Mobile Number
//       </label>
//       <div className="mt-2">
//         <input
//           type="tel"
//           name="mobileno"
//           id="mobileno"
//           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//           value={mobileno}
//           pattern="[0-9]{10}"
//           onChange={handleMobileNoChange}
//         />
//         {mobileNoError && <p className="text-red-500">{mobileNoError}</p>}
//       </div>
//     </div>

//     <div className="sm:col-span-2">
//       <label className="block text-sm font-medium leading-6 text-gray-900">
//         Join Date
//       </label>
//       <div className="mt-2">
//         <input
//           type="date"
//           name="joindate"
//           id="joindate"
//           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//           value={joindate}
//           onChange={handleDateChange}
//         />
//       </div>
//     </div>
//   </div>

//   <div className="mt-6 flex items-center justify-end gap-x-6">
//     <a href="/staffdetails" type="button" className="text-sm font-semibold leading-6 text-gray-900">
//       Cancel
//     </a>
//     <button
//       type="submit"
//       className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
//       Add
//     </button>
//   </div>
//   </div>
// </form>





     
//   )
// }