import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';


export default function AddTransaction() {
  const [item, setItem] = useState("");
  const [transactionCode,setTCode] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [amount, setAmount] = useState("");
  const [accounts, setAccounts] = useState("");
  const [department, setDepartment] = useState("");
  const [errors,setErrors] =useState({});
  const navigate = useNavigate()

  function sendData(e) {
    e.preventDefault();

    const newAdditems = {
        transactionCode,
        date,
        description,
        paymentType,
        amount,
        accounts,
        department,
       
    };

    //Basic validation
    const newErrors = {};
    if(!transactionCode.trim()){
      newErrors.transactionCode = "Transaction code is required";
    }else if (!/^[tT]\d{4}$/.test(transactionCode.trim())) {
      newErrors.transactionCode =
        "Transaction code must start with 'T' or 't' followed by 4 digits";
    }
    if(!date){
      newErrors.date="Date is required";
    }
    if(!description.trim()){
      newErrors.description = "Description is required"
    }
    if(!paymentType || item.paymentType === "Select Payment Type"){
      newErrors.paymentType = "Select payment type"  
    }
    if(!amount.trim()){ 
      newErrors.amount = "Amount is not required"
    }else if(isNaN(parseFloat(amount))){
      newErrors.amount = "Amount mus be a number"
    } else if (parseFloat(amount) <= 0) {
      newErrors.amount = "Amount must be a positive number";
    }
    if (!accounts || item.accounts === "Select Category") {
      newErrors.accounts = "Select category";
    }
    if (!department || item.department ==="Select Department") {
      newErrors.department = "Select department";
    }

    if(Object.keys(newErrors).length > 0){
      setErrors(newErrors);
    }else{
    axios.post("http://localhost:8090/finance/add", newAdditems)
      .then(() => {
        alert("Transaction Added");
        navigate("/Finance");
       
      })
      .catch((err) => {
        alert(err.response.data.message)
      });
  }
}
//Date validation
function handleDateChange(e) {
  const selectedDate = new Date(e.target.value);
  const currentDate = new Date();

  // Set hours, minutes, seconds, and milliseconds to 0 for both dates
  currentDate.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);


  if (selectedDate > currentDate) {
    // alert("Please select a date on or before today.");
  } else {
    setDate(e.target.value);
  }
}

const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={sendData} className="container bg-gray-200 bg-opacity-70 rounded-lg px-8 py-6 mt-auto mx-auto w-2/5">
     
      <center><h1 className="text-center text-2xl font-bold mb-6">Add Transcation</h1></center>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div className="flex flex-col">
          <label htmlFor="transactionCode" className="text-m font-medium leading-6 text-gray-900 mb-1">Transaction Code</label>
          <input
         onKeyPress={(e) => {
           // Allow only numbers and the letter 't' or 'T', backspace, and delete key
           const validCharacters = /^[0-9Tt\s]+$/i; // 'i' flag makes the regex case-insensitive
           if (!validCharacters.test(e.key)) {
             e.preventDefault();
           }
         }}
            type="text"
            placeholder="TXXXX"
            name="transactionCode"
            id="transactionCode"
            value={transactionCode}
            onChange={(e) => setTCode(e.target.value)}
            maxLength={5}
            className={`block rounded-md border ${errors.transactionCode ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3`}
          />
          {errors.transactionCode && (
            <p className="text-red-500 text-sm">{errors.transactionCode}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="date" className="text-m font-medium leading-6 text-gray-900 mb-1">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={handleDateChange}
            max={today}
            className={`block rounded-md border ${errors.date ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3`}
          />
            {errors.date && (
            <p className="text-red-500 text-sm">{errors.date}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="text-m font-medium leading-6 text-gray-900 mb-1">Description</label>
          <input
            type="text"
            placeholder="Description"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`block rounded-md border ${errors.description ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3`}
          />
            {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="paymentType" className="text-m font-medium leading-6 text-gray-900 mb-1">PaymentType</label>
          <select
            type="text"
            placeholder="Select Payment Type"
            name="paymentType"
            id="paymentType"
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
            className={`block rounded-md border ${errors.paymentType ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3`}
          >
          <option value="Select PaymentType">Select payment type</option>  
          <option value="Cash">Cash</option>
          <option value="Cradit">Cradit Card</option>
          <option value="Debit">Debit Card</option>
        </select>
            {errors.paymentType && (
            <p className="text-red-500 text-sm">{errors.paymentType}</p>
          )} 
        </div>
        <div className="flex flex-col">
          <label htmlFor="amount" className="text-m font-medium leading-6 text-gray-900 mb-1">Amount</label>
          <input
            type="number"
            placeholder="Rs."
            name="amount"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={`block rounded-md border ${errors.amount ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3`}
          />
            {errors.amount && (
            <p className="text-red-500 text-sm">{errors.amount}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="accounts" className="text-m font-medium leading-6 text-gray-900 mb-1">Category</label>
          <select
            type="text"
            name="accounts"
            id="accounts"
            value={accounts}
            onChange={(e) => setAccounts(e.target.value)}
            className={`block rounded-md border ${errors.accounts ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3`}
          >
            <option value="Select category">Select category</option>
            <option value="Income">Income</option>
            <option value="Expanses">Expanses</option>
            <option value="Tax">Tax</option>
          </select>
            {errors.accounts && (
            <p className="text-red-500 text-sm">{errors.accounts}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="department" className="text-m font-medium leading-6 text-gray-900 mb-1">Department</label>
          <select
            type="text"
            name="department"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className={`block rounded-md border ${errors.department ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3`}
          >
            <option value="Select department">Select department</option>
            <option value="Finance">Finance</option>
            <option value="Inventory">Inventory</option>
            <option value="Service">Service</option>
            <option value="Booking">Booking</option>            
          </select>
            {errors.department && (
            <p className="text-red-500 text-sm">{errors.department}</p>
          )}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
     
      <button type="button" className="text-sm font-semibold leading-6 text-gray-900" >
          <Link to="/Finance" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </Link>
        </button>
        <button
          type="submit"
          className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 hover:from-amber-900 hover:via-amber-800 
          hover:to-amber-700 text-white font-bold py-2 px-3 rounded-lg mr-2 opacity-90 transition duration-300 
          ease-in-out transform hover:scale-105">
          Add
        </button>
      </div>
    </form>
  );
}