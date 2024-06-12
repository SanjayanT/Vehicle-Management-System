import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function Edit_package() {
  const { id } = useParams();
  
  // package form
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [unitPrice, setUnitPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8090/svc-packages/get/${id}`)
      .then((res) => {
        setName(res.data.name);
        setDescription(res.data.description);
        setUnitPrice(res.data.unitprice);
        setCategory(res.data.category);
      })
      .catch((err) => {
        alert(err.message); //error message
      });
  }, []);

  function handleNameChange(e) {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setName(value);
      setNameError("");
    } else {
      setNameError("Name should contain only letters and spaces");
    }
  }

  function handleDescriptionChange(e) {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setDescription(value);
      setDescriptionError("");
    } else {
      setDescriptionError("Description should contain only letters and spaces");
    }
  }

  function submit(e) {
    e.preventDefault();

    if (nameError || descriptionError) {
      return; // Don't submit if there are errors
    }

    const editPackage = {
      name,
      description,
      unitprice: parseFloat(unitPrice), // Ensure unitPrice is correctly formatted as a number
      category,
    };

    axios
      .put(`http://localhost:8090/svc-packages/update/${id}`, editPackage)
      .then(() => {
        alert("Package updated");
        window.location.href = "/viewpkg";
      })
      .catch((err) => {
        alert(err.message); //error message
      });
  }

  return (
    <div className="  w-full flex justify-center items-center ">
      <div className="w-full max-w-96 mt-24 bg-white p-8 rounded-lg shadow-md bg-gray-200 bg-opacity-70">
        <h1 className="text-3xl mb-6 text-center font-bold text-gray-800">
          Edit Package
        </h1>
        <form onSubmit={submit}>
          <div className="mb-4"></div>
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Name
          </label>
          <input
            value={name}
            type="text"
            className="px-3 py-1 rounded-lg border border-black-400 w-full text-black"
            onChange={handleNameChange}
            required
          />
          {nameError && <p className="text-red-500">{nameError}</p>}
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Description
          </label>
          <input
            value={description}
            type="text"
            className="px-3 py-3 rounded-lg border border-black-400 w-full text-black"
            onChange={handleDescriptionChange}
            required
          />
          {descriptionError && <p className="text-red-500">{descriptionError}</p>}
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Unit Price
          </label>
          <input
            value={unitPrice}
            type="number"
            className="px-3 py-1 rounded-lg border border-black-400 w-full text-black"
            onChange={(e) => setUnitPrice(e.target.value)}
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
            <option selected disabled value="">
              Select Category
            </option>
            <option value="Interior">Interior</option>
            <option value="Exterior">Exterior</option>
          </select>

          <div className="flex justify-center">
            <button
              className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 hover:from-amber-900 hover:via-amber-800 
              hover:to-amber-700 text-white font-bold py-4 px-5 rounded-lg mr-2 opacity-90 transition duration-300 
              ease-in-out transform hover:scale-105 hover:text-black rounded-[10px] mt-4"
              type="submit"
            >
              update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit_package;
