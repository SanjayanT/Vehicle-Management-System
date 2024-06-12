
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

export default function EditItems() {
  const initialItemState = {
    itemcode: "",
    itemname: "",
    category: "",
    price: "",
    suppliername: "",
    reorderlevel:"",
    stocklimit: "",
    remark: "",
    isactive: "",
  };
  const [errors, setErrors] = useState({});

  const { id } = useParams();
  const [item, setItem] = useState(initialItemState);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/manageparts/get/${id}`);
        const data = response.data.manageparts || initialItemState;
        setItem(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [id]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    const { itemcode, itemname, category, price, reorderlevel, stocklimit, suppliername } = item;

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

    // Category validation
    if (!category.trim()) {
      errors.category = "Category is required";
    } else if (!/^[a-zA-Z\s]+$/.test(category)) {
      errors.category = "Category can only contain letters ";
    }

    // Price validation
    if (!price.trim()) {
      errors.price = "Price is required";
    } else if (!/^\d+(\.\d{1,2})?$/.test(price)) {
      errors.price = "Invalid price format. Use numbers with up to two decimal places";
    }

    // Reorder Level validation
    if (typeof reorderlevel !== 'string') {
      // Handle the case where reorderlevel is not a string (e.g., convert it to a string or show an error message)
    } else if (!reorderlevel.trim()) {
      errors.reorderlevel = "reorderlevel is required";
    } else if (!/^\d+$/.test(reorderlevel)) {
      errors.reorderlevel = "reorderlevel must be a positive integer";
    }

    // if (!reorderlevel.trim()) {
    //   errors.reorderlevel = "Reorder Level is required";
    // } else if (!/^\d+(\.\d{1,2})?$/.test(reorderlevel)) {
    //   errors.reorderlevel = "Invalid price format. Use numbers with up to two decimal places";
    // }

    // Add validation for reorderlevel

    // Stock Limit validation

    if (!stocklimit.trim()) {
      errors.stocklimit = "Reorder Level is required";
    } else if (!/^\d+(\.\d{1,2})?$/.test(stocklimit)) {
      errors.stocklimit = "Invalid price format. Use numbers with up to two decimal places";
    }

    // Add validation for stocklimit

    // Supplier Name validation

    if (!suppliername.trim()) {
      errors.suppliername = "Item Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(suppliername)) {
      errors.suppliername = "Item name can only contain letters ";
    }

    // Add validation for suppliername

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
      await axios.put(`http://localhost:8090/manageparts/update/${id}`, item);
      alert("Item Updated");
      navigate("/manageitems");
    } catch (error) {
      console.error('Error updating item:', error);
      alert("Failed to update item. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  
  return (
    <form onSubmit={updateItems} className="container bg-gray-200 bg-opacity-70 rounded-lg px-8 py-6 mt-auto mx-auto w-2/3">
      <h1 className="text-center font-bold text-black">Update Item</h1>

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
            className="shadow appearance-none border rounded w-full  py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          </div>
          {errors.itemname && <span className="text-red-500">{errors.itemname}</span>}
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">Category</label>
          <div className="mt-2">
          <input
            type="text"
            name="category"
            id="category"
            value={item.category}
            onChange={inputChangeHandler}
            className="shadow appearance-none border rounded w-full  py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          </div>
          {errors.category && <span className="text-red-500">{errors.category}</span>}
           
        </div>
       
        <div className="sm:col-span-3" >
          <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">Price</label>
          <div className="mt-2">
          <input
            type="text"
            name="price"
            id="price"
            value={item.price}
            onChange={inputChangeHandler}
            className="shadow appearance-none border rounded w-full  py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          </div>
          {errors.price && <span className="text-red-500">{errors.price}</span>}
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
        </div>
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="reorderlevel" className="block text-sm font-medium leading-6 text-gray-900">Reorder Level</label>
          <div className="mt-2">
          <input
            type="number"
            name="reorderlevel"
            id="reorderlevel"
            value={item.reorderlevel}
            onChange={inputChangeHandler}
            className="shadow appearance-none border rounded w-full  py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          </div>
          {errors.reorderlevel && <span className="text-red-500">{errors.reorderlevel}</span>}
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="stocklimit" className="block text-sm font-medium leading-6 text-gray-900">Stock Limit</label>
          <div className="mt-2">
          <input
            type="number"
            name="stocklimit"
            id="stocklimit"
            value={item.stocklimit}
            onChange={inputChangeHandler}
            className="shadow appearance-none border rounded w-full  py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          </div>
          {errors.stocklimit && <span className="text-red-500">{errors.stocklimit}</span>}
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="remark" className="block text-sm font-medium leading-6 text-gray-900">Remark</label>
          <div className="mt-2">
          <input
            type="text"
            name="remark"
            id="remark"
            value={item.remark}
            onChange={inputChangeHandler}
            className="shadow appearance-none border rounded w-full  py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          </div>
          {errors.remark && <span className="text-red-500">{errors.remark}</span>}
        </div>

      
        <div className="sm:col-span-3">
          <label className="block text-sm font-medium leading-6 text-gray-900">Status</label>
          <div className="flex items-center">
            <input
              type="radio"
              id="active"
              name="isactive"
              value="active"
              checked={item.isactive === 'active'}
              onChange={inputChangeHandler}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <label htmlFor="active" className="ml-2 text-sm text-gray-700">Yes</label>
          </div>
          <div className="flex items-center mt-2">
            <input
              type="radio"
              id="inactive"
              name="isactive"
              value="inactive"
              checked={item.isactive === 'inactive'}
              onChange={inputChangeHandler}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <label htmlFor="inactive" className="ml-2 text-sm text-gray-700">No</label>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => navigate('/manageitems')}>
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
