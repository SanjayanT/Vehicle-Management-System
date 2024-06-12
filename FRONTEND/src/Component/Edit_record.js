import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { useParams } from "react-router-dom";

function Edit_record() {
  const { id } = useParams();

  const [service, setService] = useState("");
  const [customer, setCustomer] = useState("");
  const [date, setDate] = useState(""); // Initialize with an empty string
  const [category, setCategory] = useState("");

  function submit(e) {
    e.preventDefault();

    const editRecord = {
      service,
      customer,
      date,
      category,
    };

    axios
      .put(`http://localhost:8090/svc-records/updaterec/${id}`, editRecord)
      .then(() => {
        alert("Record updated");
        window.location.href = "/recview";
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8090/svc-records/get/${id}`)
      .then((res) => {
        const { service, customer, date, category } = res.data;
        setService(service);
        setCustomer(customer);
        setDate(new Date(date).toISOString().split("T")[0]); // Convert to date format
        setCategory(category);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [id]); // Include id as dependency

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-2xl mt-24 bg-white p-8 rounded-lg shadow-md bg-gray-200 bg-opacity-70">
        <h1 className="text-3xl mb-6 text-center font-bold text-gray-800">
          Edit Records
        </h1>
        <form onSubmit={submit}>
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Service
          </label>
          <input
            value={service}
            type="text"
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            onChange={(e) => {
              const value = e.target.value;
              // Check if the value contains only letters and spaces
              if (/^[a-zA-Z\s]*$/.test(value)) {
                setService(value);
              } else {
                // Display error message or handle invalid input here
                // For now, let's just prevent updating state
                alert("Please enter only letters and spaces for Service");
              }
            }}
            required
          />
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Customer
          </label>
          <input
            value={customer}
            type="text"
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            onChange={(e) => {
              const value = e.target.value;
              // Check if the value contains only letters and spaces
              if (/^[a-zA-Z\s]*$/.test(value)) {
                setCustomer(value);
              } else {
                // Display error message or handle invalid input here
                // For now, let's just prevent updating state
                alert("Please enter only letters and spaces for Customer");
              }
            }}
            required
          />
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Date
          </label>
          <input
            value={date}
            type="date"
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Category
          </label>
          <select
            className="px-3 py-1 rounded-lg border border-black-400 w-full text-black"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option disabled value="">
              Select Category
            </option>
            <option value="Interior">Interior</option>
            <option value="Exterior">Exterior</option>
          </select>
          <div className="flex items-center justify-center">
            <button
              className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 hover:from-amber-900 hover:via-amber-800 
              hover:to-amber-700 text-white font-bold py-4 px-5 rounded-lg mr-2 opacity-90 transition duration-300 
              ease-in-out transform hover:scale-105 hover:text-black rounded-[10px] mt-4"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit_record;
