import React, { useState } from "react";
import axios from "axios";
import { Link , useNavigate} from 'react-router-dom'


export default function   IssuedItemsAdditems() {
  const [itemcode, setItemcode] = useState("");
  const [itemname, setItemname] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [issuedcode, setIssuedcode] = useState("");
  const [errors, setErrors] = useState({});



  const navigate = useNavigate()

  function handleItemnameChange(event) {
    // Allow only letters and spaces
    if (!/^[A-Za-z\s]*$/.test(event.target.value)) {
        setItemname(event.target.value.replace(/[^A-Za-z\s]/gi, ''));
    } else {
        setItemname(event.target.value);
    }
}


function validateForm() {
  const errors = {};


   // Item Code validation
   if (!itemcode.trim()) {
    errors.itemcode = "Item Code is required";
  } else if(!/^[F0-9]+$/i.test(itemcode)){
    errors.itemcode = "Item Code can only F,f letters and numbers";
  }


      // Item Name validation
      if (!itemname.trim()) {
        errors.itemname = "Item Name is required";
      }
       else if (!/^[a-zA-Z\s]+$/.test(itemname)) {
      errors.itemname = "Item name can only contain letters ";
       }


       // Price validation
       if (!price.trim()) {
        errors.price = "Price is required";
      } else if (!/^\d+(\.\d{1,2})?$/.test(price)) {
        errors.price = "Invalid price format. Use numbers with up to two decimal places";
      }


      // Stock Limit validation
      if (!quantity.trim()) {
        errors.quantity = "quantity is required";
      } else if (!/^\d+$/.test(quantity)) {
        errors.quantity = "Quantity must be a positive integer";
      }



         // Issued Code validation
   if (!issuedcode.trim()) {
    errors.issuedcode = "Issued Code is required";
  } else if(!/^[I0-9]+$/i.test(issuedcode)){
    errors.issuedcode = "Issued Code can only I,i letters and numbers";
  }
    
  return errors;
}


function sendData(e) {
  e.preventDefault();
  const errors = validateForm();
  if (Object.keys(errors).length > 0) {
    setErrors(errors);
    return;
  }


    const newissuedAdditems = {
      itemcode,
      itemname,
      price,
      quantity,
      issuedcode,
     
    };

    axios.post("http://localhost:8090/issueditems/add", newissuedAdditems)
      .then(() => {
        alert("Item Added");
        navigate("/Issueditems");
       
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <form onSubmit={sendData} className="container bg-gray-200 bg-opacity-70 rounded-lg px-8 py-6 mt-auto mx-auto w-2/5">
     
      <center><h1 className="text-center font-bold text-black" >Issued Add Item</h1></center>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="itemcode" className="block text-sm font-medium leading-6 text-gray-900">Item Code</label>
          <div className="mt-2">
          <input
            type="text"
            name="itemcode"
            id="itemcode"
            value={itemcode}
            onChange={(e) => setItemcode(e.target.value)}
            className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
            </div>
            {errors.itemcode && <span className="text-red-500">{errors.itemcode}</span>}
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="itemname" className="block text-sm font-medium leading-6 text-gray-900">Item Name</label>
          <div className="mt-2">
          <input
            type="text"
            name="itemname"
            id="itemname"
            value={itemname}
            onChange={handleItemnameChange} 
            className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {errors.itemname && <span className="text-red-500">{errors.itemname}</span>}
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">Price</label>
          <div className="mt-2">
          <input
            type="text"
            name="category"
            id="category"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          </div>
          {errors.price && <span className="text-red-500">{errors.price}</span>}
        </div>
        <div className="sm:col-span-3" >
          <label htmlFor="quantity" className="block text-sm font-medium leading-6 text-gray-900">Quantity</label>
          <div className="mt-2">
          <input
            type="number"
            name="description"
            id="description"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          </div>
          {errors.quantity && <span className="text-red-500">{errors.quantity}</span>}
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="issuedcode" className="block text-sm font-medium leading-6 text-gray-900">Issued Code</label>
          <div className="mt-2">
          <input
            type="text"
            name="issuedcode"
            id="issuedcode"
            value={issuedcode}
            onChange={(e) => setIssuedcode(e.target.value)}
            className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
           </div>
           {errors.issuedcode && <span className="text-red-500">{errors.issuedcode}</span>}
        </div>
      
     
  
        
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
     
      <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => navigate('/issueditems')}>
          Cancel
        </button>
        
        <button
      
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add
        </button>
      </div>
    </form>
  );
}
