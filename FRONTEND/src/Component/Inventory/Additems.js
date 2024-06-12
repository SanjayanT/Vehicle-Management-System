import React, { useState } from "react";
import axios from "axios";
import { Link , useNavigate} from 'react-router-dom'


export default function Additems() {
  const [itemcode, setItemcode] = useState("");
  const [itemname, setItemname] = useState("");
  const [category, setCategory] = useState("");
  
  const [price, setPrice] = useState("");
  const [suppliername, setSuppliername] = useState("");
  const [ reorderlevel,setReorderLevel] = useState("");
  const [stocklimit, setStocklimit] = useState("");
  const [remark, setRemark] = useState("");
  const [isactive, setIsactive] = useState("");
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


     
 

     
    // Item category validation
    if (!category.trim()) {
      errors.category = "category is required";
    }
     else if (!/^[a-zA-Z\s]+$/.test(category)) {
    errors.category = "category can only  letters ";
     }



 
       // Price validation
if (!price.trim()) {
  errors.price = "Price is required";
} else if (!/^\d+(\.\d{1,2})?$/.test(price)) {
  errors.price = "Invalid price format. Use numbers with up to two decimal places";
}

        // (/^\d+(\.\d{1,2})?$/.test(price))
        // (!/^\d+(\.\d{1,2})?$/.test(price))



        // reorder level
        if (!reorderlevel.trim()) {
          errors.reorderlevel = "reorderlevel is required";
        } else if (!/^\d+$/.test(reorderlevel)) {
          errors.reorderlevel = "reorderlevel must be a positive integer";
        }

       // Stock Limit validation
       if (!stocklimit.trim()) {
        errors.stocklimit = "Stock Limit is required";
      } else if (!/^\d+$/.test(stocklimit)) {
        errors.stocklimit = "Stock Limit must be a positive integer";
      }

      // supplier validation
    if (!suppliername.trim()) {
      errors.suppliername = "Supplier Name is required";
    }
     else if (!/^[a-zA-Z]+$/.test(suppliername)) {
    errors.suppliername = "supplier can only contain letters ";
     }
  

      // Add more validation rules for other fields if needed
  
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


    const newAdditems = {
      itemcode,
      itemname,
      category,
      
      price,
      suppliername,
      reorderlevel,
      stocklimit,
      remark,
      isactive,
    };

    axios.post("http://localhost:8090/manageparts/add", newAdditems)
      .then(() => {
        alert("Item Added");
        navigate("/ManageItems");
       
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }

return (
<form onSubmit={sendData} className="container bg-gray-200 bg-opacity-70 rounded-lg px-8 py-6 mt-auto mx-auto w-2/3" > 

<h3 className="text-center font-bold text-black">Add Item</h3>
 
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3"> 
          <label htmlFor="itemcode" className="block text-sm font-medium leading-6 text-gray-900" for="itemcode">Item Code</label>
          <div className="mt-2">
          <input

              // onKeyPress={(e) => {
        //   // Allow only numbers and the letter 'F' or 'f', backspace, and delete key
        //   const validCharacters = /^[0-9Ff\b]+$/i; // 'i' flag makes the regex case-insensitive
        //   if (!validCharacters.test(e.key)) {
        //     e.preventDefault();
        //   }
        // }}
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
        <div  className="sm:col-span-3">
          <label htmlFor="itemname" className="block text-sm font-medium leading-6 text-gray-900">Item Name</label>
          <div className="mt-2">
          <input
            type="text"
            name="itemname"
            id="itemname"
            value={itemname}
            onChange={handleItemnameChange} 
           
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"


          />
          </div>

          {errors.itemname && <span className="text-red-500">{errors.itemname}</span>}
          </div>
        

        
        <div className="sm:col-span-3" >
          <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">Category</label>
          <div className="mt-2">
          <input
            type="text"
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          </div>
           {errors.catogory && <span className="text-red-500">{errors.catogory}</span>}
        </div>
 
        <div  className="sm:col-span-3" >
          <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">Price</label>
          <input
            type="text"
            name="price"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            
          />
            {errors.price && <span className="text-red-500">{errors.price}</span>}

        </div>
        
        <div className="sm:col-span-3" >
          
          <label htmlFor="suppliername" className="block text-sm font-medium leading-6 text-gray-900">Supplier Name</label>
          <input
            type="text"
            name="suppliername"
            id="suppliername"
            value={suppliername}
            onChange={(e) => setSuppliername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.suppliername && <span className="text-red-500">{errors.suppliername}</span>}
        </div>
        <div className="sm:col-span-3" >
          <label htmlFor="reorderlevel" className="block text-sm font-medium leading-6 text-gray-900">Reorder Level</label>
          <input
            type="number"
            name="reorderlevel"
            id="reorderlevel"
            value={reorderlevel}
            onChange={(e) => setReorderLevel(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            pattern="[0-9]"
          />
          {errors.reorderlevel && <span className="text-red-500">{errors.reorderlevel}</span>}
        </div>
        <div   className="sm:col-span-3">
          <label htmlFor="stocklimit" className="block text-sm font-medium leading-6 text-gray-900">Stock Limit</label>
          <input
            type="number"
            name="stocklimit"
            id="stocklimit"
            value={stocklimit}
            onChange={(e) => setStocklimit(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            
          />
           {errors.stocklimit && <span className="text-red-500">{errors.stocklimit}</span>}

        </div>
        <div  className="sm:col-span-3">
          <label htmlFor="remark" className="block text-sm font-medium leading-6 text-gray-900">Remark</label>
          <input
            type="text"
            name="remark"
            id="remark"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">Status</label>
          <div className="flex items-center">
            <input
              type="radio"
              id="active"
              name="status"
              value="active"
              checked={isactive=== 'active'}
              onChange={() => setIsactive('active')}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <label htmlFor="active" className="ml-2 text-sm text-gray-700">Yes</label>
          </div>
          <div className="flex items-center mt-2">
            <input
              type="radio"
              id="inactive"
              name="status"
              value="inactive"
              checked={isactive === 'inactive'}
              onChange={() => setIsactive('inactive')}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <label htmlFor="inactive" className="ml-2 text-sm text-gray-700">No</label>
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
          Add
        </button>
      </div>
    
      
    </form>
  );
}
