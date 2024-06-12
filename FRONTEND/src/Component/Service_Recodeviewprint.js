import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import moment from "moment";
import imgSrc from "../Images/logo.png";

import { useReactToPrint } from "react-to-print";

export default function ServiceRecordView() {
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);

  const componentRef = useRef();

  useEffect(() => {
    function getService() {
      axios
        .get("http://localhost:8090/svc-records/")
        .then((res) => {
          console.log("Response from server:", res.data);
          setRecords(res.data);
          setFilteredRecords(res.data); // Initialize filtered records with all records
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    }

    getService();
  }, []);

  useEffect(() => {
    // Filter records based on search query
    const filtered = records.filter(
      (record) =>
        record.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.service.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRecords(filtered);
  }, [searchQuery, records]);

  // Function to generate report
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    DocumentTitle: "Service Report",
   
  });

  return (
    <div className="mx-auto max-w-5xl">
      <h2 className="my-10 text-5xl font-bold text-center text-gray-300">Service Records</h2>

      <div className="mx-10  max-w-3xl">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full"
        />
      </div>
      <div ref={componentRef} >
      <div >
      <img src={imgSrc} alt="Logo.png" className="print:block hidden h-20 w-43 ml-10 mt-3 mr-20 align-top align-left" />

      </div>
      <br></br>
      <div class=" font-bold top-10 mx-10 justify-end">
  <p class="mr-4">Ryome Motor Cares</p>
  <p class="mr-4">NO:Colombo07</p>
  <p class="mr-4">Tel:0752941767</p>
  <p class="mr-4">Fax:0270110123</p>
</div>
<br></br>
<div class="text-center print:block hidden  text-2xl font-bold mg-5 font-bold text-4xl">
  <h1>Service Records</h1>
</div>

      <table className="bg-white w-full mt-15 print:absolute " >
        <thead>
          <tr className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 text-white">
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
              Service
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
              Category
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record) => (
            <tr key={record.id} className="border-b border-gray-200">
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {record.service}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {record.customer}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {new Date(record.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {record.category}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <div class="form-footer relative mt-[1rem] ">
         

  
  <div class="fixed w-full flex justify-between px-10 mt-[40rem]">
  
    <div class="font-bold text-left">...........................<br/>date</div>
    <div class="font-bold text-right">...........................<br/>Singnature</div>
  </div>
</div>

      </div>
      
      <div className=" right-0 ml-[70rem] ">
        <button
          onClick={handlePrint}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded mb-[5rem] "
        >
          Download Report
        </button>
      </div>
    </div>
  );
}
