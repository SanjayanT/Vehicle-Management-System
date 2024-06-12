import React, { useState } from "react";
import axios from "axios";
import "./Home.css";

function Add_recodes() {
  const [service, setService] = useState("");
  const [customer, setCustomer] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function submit(e) {
    e.preventDefault(); 
    // Get today's date
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD

    // Validate if the selected date is not in the future
    if (date > todayStr) {
      alert("Date cannot be a future date");
      return;
    }

    const newRecorde = {
      service,
      customer,
      date,
      category,
    };

    axios
      .post("http://localhost:8090/svc-records/addr", newRecorde)
      .then(() => {
        alert("Recode Added");
        window.location.href = "/recview";
      })
      .catch((err) => {
        alert(err);
      });
  }

  // Validation function to allow only letters and spaces
  const validateInput = (value) => {
    const regex = /^[a-zA-Z\s]*$/;
    return regex.test(value);
  };

  // Function to handle input change for Service and Customer fields
  const handleInputChange = (e, setState) => {
    const inputValue = e.target.value;
    if (validateInput(inputValue)) {
      setState(inputValue);
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid input. Please use only letters and spaces.");
    }
  };
  const today = new Date().toISOString().split('T')[0];
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-2xl mt-24 bg-white p-8 rounded-lg shadow-md bg-gray-200 bg-opacity-70">
        <h1 className="text-3xl mb-6 text-center font-bold text-gray-800">
          Add Records
        </h1>
        <form onSubmit={submit}>
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Service
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            value={service}
            onChange={(e) => handleInputChange(e, setService)}
            required
          />
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Customer
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            value={customer}
            onChange={(e) => handleInputChange(e, setCustomer)}
            required
          />
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Date
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={today}
            required
          />
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Category
          </label>
          <select
            className="px-3 py-1 rounded-lg border border-black-400 w-full text-black"
            required
            onChange={(e) => setCategory(e.target.value)}
          >
            <option selected disabled value="">
              Select Category
            </option>
            <option value="Interior">Interior</option>
            <option value="Exterior">Exterior</option>
          </select>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
          <div className="flex items-center justify-center">
            <button
              className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 hover:from-amber-900 hover:via-amber-800 
                                     hover:to-amber-700 text-white font-bold py-4 px-5 rounded-lg mr-2 opacity-90 transition duration-300 
                                     ease-in-out transform hover:scale-105 rounded-[10px] mt-4"
              type="submit"
              disabled={errorMessage}
            >
              Add Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Add_recodes;
