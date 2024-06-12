import React, { useState } from "react";
import axios from "axios";
import { Link , useNavigate} from 'react-router-dom'


export default function Addorderitems() {
  const [itemcode, setItemcode] = useState("");
  const [itemname, setItemname] = useState("");
  const [suppliername, setSuppliername] = useState("");
  const [needquantity, setNeedquantity] = useState("");
  const [ordercode, setOrdercode] = useState("");
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

function handlesuppliernameChange(event) {
  // Allow only letters and spaces
  if (!/^[A-Za-z\s]*$/.test(event.target.value)) {
      setSuppliername(event.target.value.replace(/[^A-Za-z\s]/gi, ''));
  } else {
      setSuppliername(event.target.value);
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




  // Order Code validation
  if (!ordercode.trim()) {
    errors.ordercode = "Order Code is required";
  } else if(!/^[O0-9]+$/i.test(ordercode)){
    errors.ordercode = "Order Code can only O,o letters and numbers";
  }









    return errors;
  }


  // function sendData(e) {
  //   e.preventDefault();

  function sendData(e) {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const newAddorderitems = {
      itemcode,
      itemname,
      suppliername,
      needquantity,
      ordercode,
      
    
    };

    axios.post("http://localhost:8090/manageorders/add", newAddorderitems)
      .then(() => {
        alert("Item Order Added");
        navigate("/managedorders");
       
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <form onSubmit={sendData} className="container bg-gray-200 bg-opacity-70 rounded-lg px-8 py-6 mt-auto mx-auto w-2/5">
     
      <center><h1 className="text-center font-bold text-black">Add Order</h1></center>

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
          /></div>
          {errors.itemname && <span className="text-red-500">{errors.itemname}</span>}
        </div>
        <div className="sm:col-span-3"> 
          <label htmlFor="suppliername" className="block text-sm font-medium leading-6 text-gray-900">Supplier Name</label>
          <div className="mt-2">
          <input
            type="text"
            name="suppliername"
            id="suppliername"
            value={suppliername}
            onChange={handlesuppliernameChange}
            className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          </div>
        </div>
        <div className="sm:col-span-3"> 
          <label htmlFor="needquantity" className="block text-sm font-medium leading-6 text-gray-900">Need Quantity</label>
          <div className="mt-2">
          <input
            type="number"
            name="needquantity"
            id="needquantity"
            value={needquantity}
            onChange={(e) => setNeedquantity(e.target.value)}
            className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        </div>
        <div className="sm:col-span-3"> 
          <label htmlFor="ordercode" className="block text-sm font-medium leading-6 text-gray-900">Order Code</label>
          <div className="mt-2">
          <input
            type="text"
            name="ordercode"
            id="ordercode"
            value={ordercode}
            onChange={(e) => setOrdercode(e.target.value)}
            className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          </div>
          {errors.ordercode && <span className="text-red-500">{errors.ordercode}</span>}
        </div>
       
     
      
      
      
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
     
      <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => navigate('/managedorders')}>
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