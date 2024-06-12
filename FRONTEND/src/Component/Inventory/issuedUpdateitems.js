import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

export default function IssuedEditItems() {
  const initialItemState = {
    itemcode: "",
    itemname: "",
    price: "",
    quantity: "",
    issuedcode:"",

  
    
   
  };

  const [errors, setErrors] = useState({});

  const { id } = useParams();
  const [item, setItem] = useState(initialItemState);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/issueditems/get/${id}`);
        console.log('API Response:', response.data); // Log the response data
        const data = response.data.issueditems || initialItemState; // Access manageparts object (models in backend)
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

  const validateForm = () => {
    const errors = {};
    const { itemcode, itemname, price, quantity,issuedcode } = item;

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

    // Price validation
    if (!price.trim()) {
      errors.price = "Price is required";
    } else if (!/^\d+(\.\d{1,2})?$/.test(price)) {
      errors.price = "Invalid price format. Use numbers with up to two decimal places";
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
      await axios.put(`http://localhost:8090/issueditems/update/${id}`, item);
      alert("Item Updated");
      window.location.href = "/Issueditems";
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={updateItems} className="container bg-gray-200 bg-opacity-70 rounded-lg px-8 py-6 mt-auto mx-auto w-2/5">
      <center><h1 className="text-center font-bold text-black">Issued Update Item</h1></center>
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
            value={item.itemname}
            onChange={inputChangeHandler}
            className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          /></div>
            {errors.itemname && <span className="text-red-500">{errors.itemname}</span>}
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">Price</label>
          <div className="mt-2">
          <input
            type="text"
            name="price"
            id="price"
            value={item.price}
            onChange={inputChangeHandler}
            className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div> {errors.price && <span className="text-red-500">{errors.price}</span>}</div>
        <div className="sm:col-span-3">
          <label htmlFor="quantity" className="block text-sm font-medium leading-6 text-gray-900">Quantity</label>
          <div className="mt-2">
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={item.quantity}
            onChange={inputChangeHandler}
            className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          /></div>
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="issuedcode" className="block text-sm font-medium leading-6 text-gray-900">Issued code</label>
          <div className="mt-2">
          <input
            type="text"
            name="issuedcode"
            id="issuedcode"
            value={item.issuedcode}
            onChange={inputChangeHandler}
            className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
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
          Update
        </button>
      </div>
    </form>
  );
}
