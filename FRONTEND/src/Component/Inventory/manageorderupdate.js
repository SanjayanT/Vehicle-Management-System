import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

export default function OrderEditItems() {
  const initialItemState = {
    itemcode: "",
    itemname: "",
    suppliername: "",
    needquantity: "",
    ordercode:"",

  
    
   
  };
  const [errors, setErrors] = useState({});

  const { id } = useParams();
  const [item, setItem] = useState(initialItemState);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/manageorders/get/${id}`);
        console.log('API Response:', response.data); // Log the response data
        const data = response.data.manageorders || initialItemState; // Access manageparts object
        console.log('Fetched Item:', data); // Log the fetched item
        setItem(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false even on error
      }
    };
  
    fetchData(); // Call the function to fetch data
  }, [id]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

//   function validateInput(event) {
//   const inputValue = event.target.value;

//   if (!inputValue.trim()) {
//     document.getElementById('error-message').textContent = "Item Name is required";
//   } else if (!/^[a-zA-Z\s]+$/.test(inputValue)) {
//     document.getElementById('error-message').textContent = "Item name can only contain letters";
//     event.target.value = inputValue.replace(/[^a-zA-Z\s]/g, ''); // Remove any non-letter characters from input
//   } else {
//     document.getElementById('error-message').textContent = ""; // Clear error message if input is valid
//   }
// }

  
 

  const validateForm = () => {
    const errors = {};
    const { itemcode, itemname, suppliername, needquantity, ordercode  } = item;


     // Item Code validation
     if (!itemcode.trim()) {
      errors.itemcode = "Item Code is required";
    } else if(!/^[F0-9]+$/i.test(itemcode)){
      errors.itemcode = "Item Code can only F letter and numbers";
    }


   // Item Name validation
   if (!itemname.trim()) {
    errors.itemname = "Item Name is required";
  } else if (!/^[a-zA-Z\s]+$/.test(itemname)) {
    errors.itemname = "Item name can only contain letters ";
  }



   // Order Code validation
   if (!ordercode.trim()) {
    errors.ordercode = "Order Code is required";
  } else if(!/^[O0-9]+$/i.test(ordercode)){
    errors.ordercode = "Order Code can only O,o letters and numbers";
  }



    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };



 

    const updateItems = async (e) => {
      e.preventDefault();
  
      const isValid = validateForm();
      if (!isValid) {
        return;
      }

    try {
      await axios.put(`http://localhost:8090/manageorders/update/${id}`, item);
      alert("Item Updated");
      window.location.href = "/managedorders";
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={updateItems} className="container bg-gray-200 bg-opacity-70 rounded-lg px-8 py-6 mt-auto mx-auto w-2/5">
    <center><h1 className="text-center font-bold text-black">Order Update Item</h1></center>
    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
    <div className="sm:col-span-3">
          <label htmlFor="itemcode" className="block text-sm font-medium leading-6 text-gray-900">Item Code</label>
          <div className="mt-2">
          <input
            type="text"
            name="itemcode"
            id="itemcode"
            value={item.itemcode}
            onChange={inputChangeHandler}
            className="shadow appearance-none border rounded w-full  py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {errors.itemcode && <span className="text-red-500">{errors.itemcode}</span>}</div>
        <div className="sm:col-span-3">
          <label htmlFor="itemname" className="block text-sm font-medium leading-6 text-gray-900">Item Name</label>
          <div className="mt-2">
          <input
            type="text"
            name="itemname"
            id="itemname"
            value={item.itemname}
            onChange={inputChangeHandler}
            className="shadow appearance-none border rounded w-full  py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div> {errors.itemname && <span className="text-red-500">{errors.itemname}</span>}
         </div>
        <div className="sm:col-span-3">
          <label htmlFor="suppliername" className="block text-sm font-medium leading-6 text-gray-900">Supplier Name</label>
          <div className="mt-2">
          <input
            type="text"
            name="suppliername"
            id="suppliername"
            value={item.suppliername}
            onChange={inputChangeHandler}
            className="shadow appearance-none border rounded w-full  py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>  </div>
        <div className="sm:col-span-3">
          <label htmlFor="needquantity" className="block text-sm font-medium leading-6 text-gray-900">Need Quantity</label>
          <div className="mt-2">
          <input
            type="text"
            name="needquantity"
            id="needquantity"
            value={item.needquantity}
            onChange={inputChangeHandler}
            className="shadow appearance-none border rounded w-full  py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          </div>
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="ordercode" className="block text-sm font-medium leading-6 text-gray-900">Order code</label>
          <div className="mt-2">
          <input
            type="text"
            name="ordercode"
            id="ordercode"
            value={item.ordercode}
            onChange={inputChangeHandler}
            className="shadow appearance-none border rounded w-full  py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          /></div>
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
          Update
        </button>
      </div>
    </form>
  );
}