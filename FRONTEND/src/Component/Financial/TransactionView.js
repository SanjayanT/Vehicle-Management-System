import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import imgSrc from "./logo.png";
import { Link , useNavigate} from 'react-router-dom';
import {useReactToPrint} from "react-to-print"
import { GrDocumentPdf } from "react-icons/gr";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function TransactionView() {
  const [items, setItems] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [taxTotal, setTaxTotal] = useState(0);
  const [expensesTotal, setExpensesTotal] = useState(0);
  const [total, setTotal] = useState(0);
  
  useEffect(() => {
    function getItems() {
      axios.get("http://localhost:8090/finance/").then((res) => {
        console.log(res);
        setItems(res.data);
      }).catch((err) => {
        alert(err.message);
      })
    }
    getItems();
  }, [])

  useEffect(() => {
    // Calculate total amounts for each category
    const income = items.reduce((acc, curr) => {
      if (curr.accounts === 'Income') {
        return acc + curr.amount;
      } else {
        return acc;
      }
    }, 0);
    setIncomeTotal(income);

    const tax = items.reduce((acc, curr) => {
      if (curr.accounts === 'Tax') {
        return acc + curr.amount;
      } else {
        return acc;
      }
    }, 0);
    setTaxTotal(tax);

    const expenses = items.reduce((acc, curr) => {
      if (curr.accounts === 'Expanses') {
        return acc + curr.amount;
      } else {
        return acc;
      }
    }, 0);
    setExpensesTotal(expenses);

    // Calculate total based on the formula Total = Income - (Expenses + Tax)
    const totalAmount = income - (expenses + tax);
    setTotal(totalAmount);
  }, [items]);

  const onDeleteClick = async (itemId) => {
    await axios.delete(`http://localhost:8090/finance/delete/${itemId}`);
    alert('Transaction Deleted Successfully');
    window.location.reload();
  }

  const ComponentsRef= useRef();
  const handlePrint = useReactToPrint({
    content:()=>ComponentsRef.current,
    DocumentTittle:"order report",
    onafterprint:()=>alert ("user report successfully ")
  })

    // Function to filter transactions based on search term
    const filteredTransactions = items.filter((finance) =>
    finance.transactionCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    finance.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    finance.accounts.toLowerCase().includes(searchTerm.toLowerCase()) ||
    finance.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    finance.department.toLowerCase().includes(searchTerm.toLowerCase())
   
  );  

  return (
    
    <div className="h-screen w-screen bg-gray flex justify-center items-center flex-wrap relative">

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
      
        <a href="/AddTransaction" className="bg-gradient-to-r from-green-700 via-green-800 to-green-900 hover:from-green-900 
                hover:via-green-800 hover:to-green-700 text-white ml-20 mt-10 mx-auto font-bold py-3 px-5 rounded-lg mr-2 
                opacity-90 transition duration-300 ease-in-out transform hover:scale-105">
          + Add Transaction
        </a>
      </div>
      
      <div className="absolute top-16 right-8">
        <button onClick={handlePrint} className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:from-yellow-700 
                hover:via-yellow-600 hover:to-yellow-500 text-white ml-40 mt-70 font-bold py-3 px-5 rounded-lg mr-28 
                opacity-90 transition duration-300 ease-in-out transform hover:scale-105">
          <GrDocumentPdf className='w-5 h-5' />
        </button>
      </div>
      <div ref={ComponentsRef} className="mt-20 max-h-[25 rem]">
        <div >
        <img src={imgSrc} alt="Logo" className="print:block hidden h-20 w-43 ml-10 mt-3 mr-20 align-top align-left" />    
        </div>  
        <br/>   

        <div className='print:block hidden font-bold top-10 mx-10 justify-end'>
          <p class="mr-4">Ryome Motor Cars</p>
          <p class="mr-4">NO:Colombo 07</p>
          <p class="mr-4">Tel: 075 294 1767</p>
          <p class="mr-4">Fax: 027 011 0123</p>
        </div>
        <div className='flex justify-center items-center'>
          <h2 className="ms-20 text-6xl font-extrabold text-white print:hidden">Transaction List</h2>
         </div>
         <div className='flex justify-center items-center'>
          <h2 className="ms-20 text-6xl font-extrabold text-black print:block hidden">Transaction List</h2>
         </div>
        <div className="print:hidden">
         <div className="bg-gradient-to-r from-indigo-800 via-indigo-900 to-indigo-900 bg-opacity-75 p-4 float-right font-bold py-3 px-5 rounded-lg mt-10 ml-1 mr-8">
          <p className="text-white text-2xl">Total Income: Rs.{incomeTotal.toLocaleString()}</p>
         </div>
         <div className="bg-gradient-to-r from-indigo-800 via-indigo-900 to-indigo-900 bg-opacity-75 p-4 float-right font-bold py-3 px-5 rounded-lg mt-10 ml-1 mr-8">
           <p className="text-white text-2xl">Total Expenses: Rs.{expensesTotal.toLocaleString()}</p>
         </div>
         <div className="bg-gradient-to-r from-indigo-800 via-indigo-900 to-indigo-900 bg-opacity-75 p-4 float-right font-bold py-3 px-5 rounded-lg mt-10 ml-1 mr-8">
           <p className="text-white text-2xl">Total Tax: Rs.{taxTotal.toLocaleString()}</p>
         </div>
         <div className="bg-gradient-to-r from-red-800 via-red-900 to-red-900 bg-opacity-75 p-4 float-right font-bold py-3 px-5 rounded-lg mt-10 my-10 ml-1 mr-8">
         <p className="text-white text-2xl">Total: Rs.{total.toLocaleString()}</p>
         </div>
        </div>

      <table  class="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 text-white sticky top-10 mt-10 mx-auto">
          <thead>
          <tr className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 mt-5">
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white  tracking-wider">NO</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white  tracking-wider">TRANSACTION CODE</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white  tracking-wider">DATE</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white  tracking-wider">DESCRIPTION</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white  tracking-wider">PAYMENT TYPE</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white  tracking-wider">AMOUNT</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white  tracking-wider">CATEGORY</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white  tracking-wider">DEPARTMENT</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white  tracking-wider print:hidden">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((item, index) => (
              <tr key={index} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.transactionCode}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.paymentType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rs.{item.amount.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.accounts}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.department}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <a href={`/Update_Transaction/${item._id}`} className="bg-gradient-to-r from-green-700 via-green-800 to-green-900 hover:from-green-900 
                                    hover:via-green-800 hover:to-green-700 text-white float-right mx-auto font-bold py-1 px-3 rounded-lg mr-2 
                                    opacity-90 transition duration-300 ease-in-out transform hover:scale-105 print:hidden">
                      <FaRegEdit className='w-5 h-5' />
                    </a>
                    <button onClick={() => onDeleteClick(item._id)} className="bg-gradient-to-r from-red-700 via-red-800 to-red-900 hover:from-red-900 hover:via-red-800 
                                    hover:to-red-700 text-white float-right mx-auto font-bold py-1 px-3 rounded-lg mr-2 opacity-90 
                                    transition duration-300 ease-in-out transform hover:scale-105 print:hidden">
                      <MdDelete className='w-5 h-5'/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br/>
        <br/>
        <div className='form-footer relative mt-[10 rem]'>
          <br/>
          <br/>

          <div className='absloute bottom-0 w-full flex justify-between px-10'>
            <div className='font-bold text-left'>.................................<br/>Date</div>
            <div className='font-bold text-Right'>.................................<br/>Singnature</div>
          </div>
        </div>
      </div>
    </div>
  );
};
