import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import imgSrc from "./images/logo.png";
import { FaPrint } from "react-icons/fa6";
import { Link , useNavigate} from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import {useReactToPrint} from "react-to-print"

export default function IssuedItems() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    function getItems() {
      axios.get("http://localhost:8090/issueditems/").then((res) => {
        console.log(res);
        setItems(res.data);
      }).catch((err) => {
        alert(err.message);
      })
    }
    getItems();
  }, [])

  const onDeleteClick = async (itemId) => {
    await axios.delete(`http://localhost:8090/issueditems/delete/${itemId}`);
    alert('Item Deleted Successfully');
    window.location.reload();
  }


  // const onDeleteClick = async (itemId) => {
  //   const confirmDelete = window.confirm('Are you sure you want to delete this item?');
  //   if (confirmDelete) {
  //     await axios.delete(`http://localhost:8090/issueditems/delete/${itemId}`);
  //     alert('Item Deleted Successfully');
  //     // Reload the page or update state as needed
  //     window.location.reload();
  //   }
  // }
  

  const ComponentsRef= useRef();
  const handlePrint = useReactToPrint({
    content:()=>ComponentsRef.current,
    DocumentTittle:"order report",
    onafterprint:()=>alert ("user report successfully ")
  })

  
    // Function to filter announcements based on search term
    const filteredissueditems = items.filter((issueditems) =>
    issueditems.itemcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issueditems.itemname.toLowerCase().includes(searchTerm.toLowerCase())||
    issueditems.issuedcode.toLowerCase().includes(searchTerm.toLowerCase())
    
  );



  return (
    <div className="h-screen w-screen bg-gray flex justify-center items-center flex-wrap relative">
      <div className="absolute top-2 left-8">
        <h2 className="ms-20 my-10 mt-20 text-6xl font-extrabold text-white">Issued Items</h2>
        </div>
       <div className="absolute top-2 right-8">
   {/* Search bar */}
<div className="relative">
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    {/* Search icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  </div>
  <input
    type="text"
    placeholder="Search "
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="pl-10 pr-4 py-2 w-64 bg-gray-100 rounded-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 border border-transparent"
  />
</div>
</div>
      <div className="absolute top-8 left-8">
      
        <a href="/issuedAdditems" className="inline-block bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
        
          +Add Items
        </a>
      </div>
      <div className="absolute top-16 right-8">
        <button onClick={handlePrint} className="bg-yellow-500 hover:bg-yellow-600 mr-80 mt-20 text-white font-bold py-2 px-4 rounded">
        <FaPrint className='w-5 h-5' />
        </button>
      </div>
      <div ref={ComponentsRef}   class=" mt-20 max-h-[25 rem] ">
      <div >
  <img src={imgSrc} alt="Logo" className="print:block hidden h-20 w-43 ml-10 mt-3 mr-20 align-top align-left" />
</div>
<br/>

<div class="print:block hidden   font-bold top-10 mx-10 justify-end">
  <p class="mr-4">Ryome Motor Cares</p>
  <p class="mr-4">NO:Colombo07</p>
  <p class="mr-4">Tel:0752941767</p>
  <p class="mr-4">Fax:0270110123</p>
</div>

<div class="text-center print:block hidden  text-2xl font-bold">
  Inventory Items details
</div>
<br/>

     
      <table  class="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 text-white sticky mt-20 top-10 mx-10 w-100">
          <thead>
            <tr className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 mt-5">
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-white  tracking-wider">No</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-white  tracking-wider">Item Code</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-white  tracking-wider">Item Name</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-white  tracking-wider">Price</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-white  tracking-wider">Quantity</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-white  tracking-wider">Issued Code</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-white  tracking-wider print:hidden">Action</th>
            
            </tr>
          </thead>
          <tbody>
            {filteredissueditems.map((item, index) => (
              <tr key={index} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.itemcode}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.itemname}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.price}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.issuedcode}</td>
               
                <td className=" print:hidden px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                  <Link to={`/issuedUpdateitems/${item._id}`} className="text-blue-500 mr-2"><FaEdit className="inline-block text-xl align-middle" /></Link>
<button onClick={() => onDeleteClick(item._id)}><FaTrash className="text-red-500 inline-block text-xl align-middle" /></button>
                    
                    {/* <a href={`/issuedUpdateitems/${item._id}`} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                      Edit
                    </a>
                    <button onClick={() => onDeleteClick(item._id)} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                      Delete
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <br/>
        <br/>
        
        <div class="form-footer relative mt-[10rem] ">
          <br/>
          <br/>

  
  <div class="absolute bottom-0 w-full flex justify-between px-10">
  
    <div class="font-bold text-left">...........................<br/>date</div>
    <div class="font-bold text-right">...........................<br/>Singnature</div>
  </div>
</div>

      
      </div>
      

    </div>
  );
};
