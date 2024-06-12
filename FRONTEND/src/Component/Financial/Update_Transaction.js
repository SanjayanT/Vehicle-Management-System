import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateTransaction() {
  const initialItemState = {
    transactionCode: "",
    date: "",
    description: "",
    paymentType: "",
    amount: "",
    accounts: "",
    department: ""
  };

  const { id } = useParams();
  const [item, setItem] = useState(initialItemState);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/finance/get/${id}`);
        console.log('API Response:', response.data);
        const data = response.data.Finance || initialItemState;
        console.log('Fetched Transaction:', data);
        setItem(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (!item.transactionCode.trim()) {
      errors.transactionCode = "Transaction code is required";
      isValid = false;
    }

    if (!item.date) {
      errors.date = "Date is required";
      isValid = false;
    }

    if (!item.description.trim()) {
      errors.description = "Description is required";
      isValid = false;
    }

    if (!item.paymentType || item.paymentType === "Select Payment Type") {
      errors.paymentType = "Select payment type";
      isValid = false;
    }

    if (!item.amount || isNaN(item.amount)) {
      errors.amount = "Amount is required";
      isValid = false;
    }

    if (!item.accounts || item.accounts ==="Select Category") {
      errors.accounts = "Accounts is required";
      isValid = false;
    }

    if (!item.department || item.department === "Select Department") {
      errors.department = "Department is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  function handleDateChange(e) {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();

    if (selectedDate > currentDate) {
      alert("Please select a date on or before today.");
    } else {
      setDate(e.target.value);
    }
  }

  const updateItems = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        await axios.put(`http://localhost:8090/finance/update/${id}`, item);
        alert("Transaction Updated");
        navigate('/Finance');
      } catch (error) {
        alert(error);
      }
    }
  };
  const today = new Date().toISOString().split('T')[0];

  if (loading) return <div>Loading...</div>;
  return (
    <form onSubmit={updateItems} className="container bg-gray-200 bg-opacity-70 rounded-lg px-8 py-6 mt-auto mx-auto w-2/5">
      <center><h1 className="text-center text-2xl font-bold mb-6"> Update Transaction</h1></center>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div className="flex flex-col">
          <label htmlFor="transactionCode" className="text-m font-medium leading-6 text-gray-900 mb-1">transactionCode</label>
          <input
        //   onKeyPress={(e) => {
        //   // Allow only numbers and the letter 't' or 'T', backspace, and delete key
        //   const validCharacters = /^[0-9Tt\b]+$/i; // 'i' flag makes the regex case-insensitive
        //   if (!validCharacters.test(e.key)) {
        //   e.preventDefault();
        //   }
        // }}
            type="text"
            name="transactionCode"
            id="transactionCode"
            value={item.transactionCode}
            onChange={inputChangeHandler}
            className={`block rounded-md border ${errors.transactionCode ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3`}
          />
          {errors.transactionCode && <p className="text-red-500 text-sm mt-1">{errors.transactionCode}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="date" className="text-m font-medium leading-6 text-gray-900 mb-1">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            value={item.date}
            onChange={handleDateChange}
            max={today}
            className={`block rounded-md border ${errors.date ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3`}
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="text-m font-medium leading-6 text-gray-900 mb-1">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={item.description}
            onChange={inputChangeHandler}
            className={`block rounded-md border ${errors.description ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3`}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="paymentType" className="text-m font-medium leading-6 text-gray-900 mb-1">PaymentType</label>
          <select
            type="text"
            name="paymentType"
            id="paymentType"
            value={item.paymentType}
            onChange={inputChangeHandler}
            className={`block rounded-md border ${errors.paymentType ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3`}
          >
            <option value="Select Payment Type">Slect Payment Type</option>
            <option value="Cash">Cash</option>
            <option value="Cradit">Cradit Card</option>
            <option value="Debit">Debit Card</option>
          </select>
          {errors.paymentType && <p className="text-red-500 text-sm mt-1">{errors.paymentType}</p>} 
        </div>
        <div className="flex flex-col"> 
          <label htmlFor="amount" className="text-m font-medium leading-6 text-gray-900 mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={item.amount}
            onChange={inputChangeHandler}
            className="block rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3"
          />
          {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="accounts" className="text-m font-medium leading-6 text-gray-900 mb-1">Category</label>
          <select
            type="text"
            name="accounts"
            id="accounts"
            value={item.accounts}
            onChange={inputChangeHandler}
            className={`block rounded-md border ${errors.accounts ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3`}
          >
            <option value="Select Category">Select Category</option>
            <option value="Income">Income</option>
            <option value="Expanses">Expanses</option>
            <option value="Tax">Tax</option>
          </select>
          {errors.accounts && <p className="text-red-500 text-sm mt-1">{errors.accounts}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="department" className="text-m font-medium leading-6 text-gray-900 mb-1">Department</label>
          <select
            //type="text"
            name="department"
            id="department"
            value={item.department}
            onChange={inputChangeHandler}
            className={`block rounded-md border ${errors.department ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3`}
          >
            <option value="Select department">Select Department</option>
            <option value="Finance">Finance</option>
            <option value="Inventory">Inventory</option>
            <option value="Service">Service</option>
            <option value="Booking">Booking</option>
          </select> 
          {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>} 
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => navigate('/Finance')}>
          Cancel
        </button>
        <button
          type="submit"
          className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 hover:from-amber-900 hover:via-amber-800 
          hover:to-amber-700 text-white font-bold py-2 px-2 rounded-lg mr-2 opacity-90 transition duration-300 
          ease-in-out transform hover:scale-105">
          Update
        </button>
      </div>
    </form>
  );
}
