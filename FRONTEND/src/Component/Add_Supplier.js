import React, { useState } from "react";
import "./Add_Supplier.css";
import axios from "axios";

function Add_Supplier() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [contact_2, setContact_2] = useState("");
  const [Email, setEmail] = useState("");
  const [Website, setWeb] = useState("");
  const [Main_supplies, setMainSupplies] = useState("");
  const [Additional_note, setAdditional_notes] = useState("");
  const [address, setAddress] = useState("");


  function submit(e) {
    e.preventDefault();

    const newSupplier = {
      name,
      contact,
      contact_2,
      Email,
      Website,
      Main_supplies,
      Additional_note,
      address,
    };
    
    
//Email validation
    const isValidEmail = /\S+@\S+\.|S+/.test(Email);

    if(!isValidEmail) {
      alert("Please enter a valid email address.");
      return;
    }

// contact validation
    if (!/^[\d]{10}$/.test(contact) ||  /[a-zA-Z]/.test(contact) ) { // Checking 10 digits
      alert("Please enter a 10-digit valid phone number (07XXXXXXXX).");
      return;
  }
  

    
// contact validation
if (!/^[\d]{10}$/.test(contact_2) ||  /[a-zA-Z]/.test(contact_2) ) { // Checking 10 digits
  alert("Please enter a 10-digit valid phone number (07XXXXXXXX).");
  return;
}


    axios
      .post("http://localhost:8090/supplier/add", newSupplier)
      .then(() => {
        alert("Supplier Added");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div>
      <div className="container bg-gray-200 bg-opacity-70 rounded-lg px-8 py-4 max-w-6xl mx-auto mt-3 mx-5">
        <div className="flex justify-between items-center">
          <h1 className="Heading1 text-center text-3xl flex-grow font-BakBak one font-bold mb-10">
            Add Supplier
          </h1>

          <a href="/display">
            <button className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 hover:from-amber-900 hover:via-amber-800 
                                     hover:to-amber-700 text-white float-right mx-auto font-bold py-4 px-5 rounded-lg mr-2 opacity-90 transition duration-300 
                                     ease-in-out transform hover:scale-105">
              Display
            </button>
          </a>
        </div>

        <form className="form1 text-xl text-gray-950 " onSubmit={submit}>
          <div className="space-y-2 flex justify-between grid grid-cols-2 gap-4 ">
          <div className="mt-5">
                     <label className="mr-9">Supplier Name    :</label>
                     <input type="text" onKeyDown={(e) => {
                        const key = e.key;
                        const isBackspace = key === "Backspace";
                        const isValidInput = /^[a-zA-Z]*$/.test(key) || isBackspace; // Allow Backspace or alphanumeric characters
                        if (!isValidInput) {
                          e.preventDefault(); // Prevent the input of the special character
                        }
                      }}
                      onChange={(e) => setName(e.target.value)} 
                      className="rounded-md w-60 h-10 opacity-80 text-base mt-2" 
                      required
                    />
                 </div>

            <div>
              <label className="mr-10">Contact :</label>
                           <input type="text"
                            placeholder=" ex : 0711234567"
                            value={contact}
                            onKeyDown={(e) => {
                              const key = e.key;
                              const isBackspace = key === 'Backspace';
                              const isDigit = /^[0-9]$/.test(key);

                              // Allow backspace and digits (0-9)
                              const isValid = isBackspace || isDigit;

                              if (!isValid) {
                                e.preventDefault(); // Prevent invalid keystrokes
                              }
                            }}
                            onChange={(e) => {
                              const contact = e.target.value;

                              // Ensure the value contains only digits
                              if (/^[0-9]*$/.test(contact)) { // Allow only numbers
                                setContact(contact); 
                              }
                            }}
                            minLength={10}
                            maxLength={10}
                            className="rounded-md w-60 h-10 opacity-80 text-base mt-2"
                            required
                          />
            </div>
          </div>

          <div className="space-y-2 flex justify-between grid grid-cols-2 gap-4 ">
            <div className="mt-5">
              <label className="mr-20">Contact 2 :</label>
              
              <input type="text"
                            
                            value={contact_2}
                            onKeyDown={(e) => {
                              const key = e.key;
                              const isBackspace = key === 'Backspace';
                              const isDigit = /^[0-9]$/.test(key);

                              // Allow backspace and digits (0-9)
                              const isValid = isBackspace || isDigit;

                              if (!isValid) {
                                e.preventDefault(); // Prevent invalid keystrokes
                              }
                            }}
                            onChange={(e) => {
                              const contact_2 = e.target.value;

                              // Ensure the value contains only digits
                              if (/^[0-9]*$/.test(contact_2)) { // Allow only numbers
                                setContact_2(contact_2); 
                              }
                            }}
                            minLength={10}
                            maxLength={10}
                            className="rounded-md w-60 h-10 opacity-80 text-base mt-2"
                            required
                          />
            </div>

            <div>
                    <label className="mr-11">E-mail :</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} className="rounded-md w-60 h-10 opacity-80 ml-3" /> 
                   </div>
          </div>

          <div className="space-y-2 flex justify-between grid grid-cols-2 gap-4 ">
            <div className="mt-5">
              <label className="mr-20">Address :</label>
              <input
                className="rounded-md ml-4 w-72 h-10 opacity-80"
                type="text"
                onChange={(e) => setAddress(e.target.value)} required
              />
            </div>
            <div>
              <label className="mr-8">Web Site :</label>
              <input
                className="rounded-md w-72 h-10 opacity-80"
                type="text"
                onChange={(e) => setWeb(e.target.value)} 
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-between items-center space-x-2 py-2">
            <div className="flex flex-col mt-5">
              <label className="mr-11">Additional Notes :</label>
              <textarea
                className="mt-1 rounded-md border opacity-80 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="4"
                cols="50"
                onChange={(e) => setAdditional_notes(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="mr-11">Main Supplies :</label>
              <textarea
                className="mt-1 rounded-md rounded-md opacity-80 border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="4"
                cols="50"
                onChange={(e) => setMainSupplies(e.target.value)} required/>
            </div>
          </div>

          <div className="flex justify-center mt-16">
            <button
              className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 hover:from-amber-900 hover:via-amber-800 
                                     hover:to-amber-700 text-white font-bold py-4 px-5 rounded-lg mr-2 opacity-90 transition duration-300 
                                     ease-in-out transform hover:scale-105"
              type="submit"
            >
              Add Supplier
            </button>
          </div>
        </form>
      </div>

      
    </div>
  );
}

export default Add_Supplier;

