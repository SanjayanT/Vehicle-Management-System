import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import imgSrc from "./images/logo.png";
import { FaPrint } from "react-icons/fa6";
import { Link , useNavigate} from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
// import { BsFillArchiveFill } from 'react-icons/bs';
// import Alert from './Alert';
import {useReactToPrint} from "react-to-print"

export default function ManageItems() {
  const [items, setItems] = useState([]); 
  const [alerts, setAlerts] = useState([]); // State to store reorder level alerts
  const [searchTerm, setSearchTerm] = useState("");
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {

  


    // Function to fetch items and reorder level alerts
    const getItemsAndAlerts = async () => {
      try {
        const response = await axios.get("http://localhost:8090/manageparts/");
        setItems(response.data);



        const total = response.data.reduce((acc, curr) => {
          return acc + (parseInt(curr.price) * parseInt(curr.stocklimit));
        }, 0);
        setTotalValue(total);

        // Filter items to find reorder level alerts
        const alertItems = response.data.filter(item => parseInt(item.stocklimit) < parseInt(item.reorderlevel));
        setAlerts(alertItems);
      } catch (error) {
        alert(error.message);
      }
    };

    // Fetch items and reorder level alerts on component mount
    getItemsAndAlerts();
  }, []);

  const onDeleteClick = async (itemId) => {
    await axios.delete(`http://localhost:8090/manageparts/delete/${itemId}`);
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
  
  
  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTittle: "order report",
    onafterprint: () => alert("user report successfully ")
  });

     // Function to filter announcements based on search term
     const filteredmanageitems = items.filter((manageitems) =>
     manageitems.itemcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
     manageitems.itemname.toLowerCase().includes(searchTerm.toLowerCase())||
     manageitems.category.toLowerCase().includes(searchTerm.toLowerCase())||
     manageitems.suppliername.toLowerCase().includes(searchTerm.toLowerCase())
   );
 

  return (
    
<div className="h-screen w-screen bg-gray flex justify-center items-center flex-wrap relative" style={{backgroundImage: 'url("inventory_menu.jpeg")'}}>

       <div className="absolute top-2 left-8">
        <h2 className="ms-20 my-10 mt-20 text-6xl font-extrabold text-white">Managed Items</h2>
        </div>
     
{/* <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
<a href="/alert" title="" role="button">
  <div className='card bg-red-500 p-4 rounded-lg'>
    {/* Added padding and rounded corners */}
    {/* <div className='card-inner flex justify-between items-center'>
      <h3 className="text-white text-lg font-semibold">PRODUCTS</h3>
      <BsFillArchiveFill className='card_icon text-white' />
    </div>
    <h1 className="text-white text-4xl font-bold">Alert</h1>
  </div>
</a>

</div> */} 



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

      <div className="absolute top-2 left-8">
      
        <a href="/additems" className="inline-block bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
        
          +Add Items
        </a>
      </div>
      <div className="absolute top-16 right-8">
        <button onClick={handlePrint} className="bg-yellow-500 hover:bg-yellow-600 mr-44 mt-24 text-white font-bold py-2 px-4 rounded">
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
      <table  class="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 text-white sticky mt-20 top-10 mx-10">
          <thead>
          <tr className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 mt-5">
              <th scope="col" class=" px-6 py-3 text-left text-xs font-bold text-white  tracking-wider">No</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-white  tracking-wider">Item Code</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-white  tracking-wider">Item Name</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-white  tracking-wider">Category</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-white  tracking-wider">Price</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-white  tracking-wider">Supplier</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-white  tracking-wider">Reorder Level</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-white  tracking-wider">Stock Limit</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-white  tracking-wider">Remark</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-white  tracking-wider">Status</th>
              <th scope="col" class=" px-6 py-3 text-left text-xs font-bold text-white tracking-wider print:hidden">Action</th>

            </tr>
          </thead>
          <tbody>
            {filteredmanageitems.map((item, index) => (
              <tr key={index} className={`bg-white border-b border-gray-200 hover:bg-gray-50 ${alerts.some(alert => alert._id === item._id) ? 'bg-red-200' : ''}`}>
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${alerts.some(alert => alert._id === item._id) ? 'bg-red-200' : ''}`}>{index + 1}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${alerts.some(alert => alert._id === item._id) ? 'bg-red-200' : ''}`}>{item.itemcode}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${alerts.some(alert => alert._id === item._id) ? 'bg-red-200' : ''}`}>{item.itemname}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${alerts.some(alert => alert._id === item._id) ? 'bg-red-200' : ''}`}>{item.category}</td>
                {/* <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${alerts.some(alert => alert._id === item._id) ? 'bg-red-200' : ''}`}>{item.description}</td> */}
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${alerts.some(alert => alert._id === item._id) ? 'bg-red-200' : ''}`}>{item.price}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${alerts.some(alert => alert._id === item._id) ? 'bg-red-200' : ''}`}>{item.suppliername}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${alerts.some(alert => alert._id === item._id) ? 'bg-red-200' : ''}`}>{item.reorderlevel}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${alerts.some(alert => alert._id === item._id) ? 'bg-red-200' : ''}`}>{item.stocklimit}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${alerts.some(alert => alert._id === item._id) ? 'bg-red-200' : ''}`}>{item.remark}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${alerts.some(alert => alert._id === item._id) ? 'bg-red-200' : ''}`}>{item.isactive}</td>
                <td className={` print:hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${alerts.some(alert => alert._id === item._id) ? 'bg-red-200' : ''}`}>
                  <div className="flex items-center justify-end gap-2">
                  <Link to={`/updateitems/${item._id}`} className="text-blue-500 mr-2"><FaEdit className="inline-block text-xl align-middle" /></Link>
<button onClick={() => onDeleteClick(item._id)}><FaTrash className="text-red-500 inline-block text-xl align-middle" /></button>
                    {/* <a href={`/updateitems/${item._id}`} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
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
      
      {alerts.length > 0 && (
        <div className="absolute bottom-8 right-8 bg-red-500 text-white font-bold py-2 px-4 rounded">
          {alerts.length === 1 ? (
            `1 item (${alerts[0].itemname}) needs reorder`
          ) : (
            `${alerts.length} items (${alerts.map(alert => alert.itemname).join(', ')}) need reorder`
          )}
        </div>
      )}

    </div>
  );
};
