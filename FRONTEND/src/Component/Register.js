import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Home.css";
import "./Register.js";
import "./Chome.js";

function Register() {
  const [cname, setcname] = useState("");
  const [cnic, setcnic] = useState("");
  const [cphone, setcphone] = useState("");
  const [cmail, setcmail] = useState("");
  const [cvnum, setcvnum] = useState("");
  const [cvtype, setcvtype] = useState("");
  const [cpass, setcpass] = useState("");
  const [cpass2, setcpass2] = useState("");
  const navigate = useNavigate();

  function sendRegister(e) {
    e.preventDefault();

    // Validation checks
    if (!validateInputs()) {
      return;
    }
    // Check if an email is filled
    if (!cmail) {
      alert("Please insert your Email.");
      return;
    }

    // Validate phone number
    if (!/^[\d]{10}$/.test(cphone)) {
      //checking 10 digits
      alert("Please enter 10 digit valid phone number 07XXXXXXXX.");
      return;
    }

    //Validate password
    if (cpass !== cpass2) {
      alert("Passwords do not match!");
      return;
    }

    // Check if a name is filled
    if (!cname) {
      alert("Please insert your name.");
      return;
    }

    // Check if a Vehicle number is filled
    if (!cvnum) {
      alert("Please insert your vehicle number.");
      return;
    }

    // Check if a Vehicle type is filled
    if (!cvtype) {
      alert("Please insert your vehicle type.");
      return;
    }

    // Check if a phone number is filled
    if (!cphone) {
      alert("Please insert your phone number.");
      return;
    }

    // Check if a NIC number is filled
    if (!cnic) {
      alert("Please insert your NIC number.");
      return;
    }

    const newCustomer = {
      cname,
      cnic,
      cphone,
      cmail,
      cpass,
      cpass2,
      cvnum,
      cvtype,
    };

    axios
      .post("http://localhost:8090/customer/Register", newCustomer)
      .then(() => {
        alert("Profile Added");
        navigate("/Chome"); // Redirect to Chome page
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }

  // Validation function to avoid special characters
  function validateInputs() {
    const specialChars = /[!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      specialChars.test(cname) ||
      specialChars.test(cnic) ||
      specialChars.test(cphone) ||
      specialChars.test(cvnum) ||
      specialChars.test(cvtype)
    ) {
      alert("Please avoid using special characters.");
      return false;
    }

    if (!emailRegex.test(cmail)) {
      alert("Please enter a valid email address.");
      return false;
    }

    return true;
  }

  return (
    <form
      onSubmit={sendRegister}
      className="w-half bg-gray-100 p-6 ms-60 my-10 mt230 p-4 m-60 border-gray-300 rounded-lg min-h-min bg-opacity-50"
    >
      <div>
        <div class="text-black mt-3 text-center text-4xl font-bold">
          Customer Registration
        </div>
        <div class="p-8">
          <div class="flex gap-4">
            <input
              required
              onKeyPress={(e) => {
                // Allow only letters, space, and backspace/delete key
                const validCharacters = /^[a-zA-Z\s\b]+$/; // Adding \s for space, 'i' flag for case-insensitive
                if (!validCharacters.test(e.key)) {
                  e.preventDefault();
                }
              }}
              type="text"
              name="name"
              class="mt-1 block w-1/2 rounded-md border border-black bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              placeholder="Full Name *"
              value={cname}
              onChange={(e) => setcname(e.target.value)}
            />

            <input
              required
              onChange={(e) => {
                const { value } = e.target;
                const filteredValue = value.replace(/[^a-zA-Z0-9@.]/g, ""); // Allow only letters, numbers, and '@'
                setcmail(filteredValue);
              }}
              type="text"
              name="email"
              className="mt-1 block w-1/2 rounded-md border border-black bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              placeholder="Email *"
              value={cmail}
            />
          </div>
          <div class="flex gap-4">
            <input
              required
              onKeyPress={(e) => {
                // Allow only numbers and backspace/delete key
                const validCharacters = /^[0-9\b]+$/;
                if (!validCharacters.test(e.key)) {
                  e.preventDefault();
                }
              }}
              type="phone"
              name="Phone"
              class="mt-1 block w-1/2 rounded-md border border-black bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm "
              maxLength={10}
              placeholder="Phone *"
              value={cphone}
              onChange={(e) => setcphone(e.target.value)}
            />
            <input
              required
              onChange={(e) => setcvnum(e.target.value)}
              type="text"
              name="NUM"
              class="mt-1 block w-1/2 rounded-md border border-black bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              placeholder="Vehicle Number *"
              value={cvnum}
            />
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <input
              required
              onKeyPress={(e) => {
                // Allow only numbers and the letter 'V' or 'v', backspace, and delete key
                const validCharacters = /^[0-9Vv\b]+$/i; // 'i' flag makes the regex case-insensitive
                if (!validCharacters.test(e.key)) {
                  e.preventDefault();
                }
              }}
              type="text"
              name="NIC"
              className="mt-1 block w-1/2 rounded-md border border-black bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              placeholder="NIC *"
              value={cnic}
              onChange={(e) => setcnic(e.target.value)}
            />

            <select
              required
              onChange={(e) => setcvtype(e.target.value)}
              name="select"
              id="select"
              className="mt-1 block w-1/2 rounded-md border border-black bg-white px-3 py-4 font-semibold text-gray-500 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              value={cvtype}
            >
              <option value="">Select Vehicle Type</option>
              <option value="Car">Car</option>
              <option value="Van">Van</option>
              <option value="Cab">Cab</option>
              <option value="Jeep">Jeep</option>
              <option value="Motorbike">Motor Bike</option>
              <option value="Minilorry">Mini Lorry</option>
            </select>
          </div>
        </div>
        <div class="mt-6">
          <label
            for="password"
            class="block text-sm font-medium leading-5 text-black"
          >
            Password
          </label>
          <div class="mt-1 rounded-md shadow-sm text-black">
            <input
              required
              onChange={(e) => setcpass2(e.target.value)}
              id="password"
              name="password"
              type="password"
              class="appearance-none block w-full px-3 py-2 border border-black rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              value={cpass2}
            ></input>
          </div>
        </div>

        <div class="mt-6">
          <label
            for="password_confirmation"
            class="block text-sm font-medium leading-5 text-black"
          >
            Confirm Password
          </label>
          <div class="mt-1 rounded-md shadow-sm text-black border-black">
            <input
              required
              onChange={(e) => setcpass(e.target.value)}
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              class="appearance-none block w-full px-3 py-2 border border-black rounded-md placeholder-gray-800 focus:outline-none focus:shadow-outline-blue focus:border-blue-900 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              value={cpass}
            ></input>
          </div>
        </div>
      </div>
      <div class="text-center">
        <button
          type="submit"
          class="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 hover:from-amber-900 hover:via-amber-800 
                  hover:to-amber-700 text-white font-bold py-3 px-10 rounded-lg mr-2 opacity-90 transition duration-300
                  ease-in-out transform hover:scale-105"
          value={"Add profile"}
          onClick={sendRegister}
        >
          Register
        </button>
      </div>
    </form>
  );
}

export default Register;
