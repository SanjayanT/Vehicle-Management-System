import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import moment from 'moment';
import {useReactToPrint} from 'react-to-print';

export default function ServiceRecordView() {
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
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
    const filtered = records.filter(record =>
      record.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.service.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRecords(filtered);
  }, [searchQuery, records]);

  

  return (
    <div className="mx-auto max-w-5xl">
      <h2 className="ms-20 my-10 mt-20 text-5xl font-bold text-white text-center">
        Service Records
      </h2>

      <div className="mt-5 mx-10 mb-10 max-w-3xl">
    
        <input
          type="text"
          placeholder="Search"
          
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full"
        />
      
      </div>

      <table className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 text-white sticky top-10 mx-10 w-full" ref={componentRef}>
        <thead>
          <tr className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 mt-5">
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
              Service
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
              Customer
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
              Category
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record) => (
            <tr key={record.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {record.service}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {record.customer}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(record.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {record.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-start gap-2">
                  {/* Edit record button */}
                  <a
                    href={`/editrec/${record._id}`}
                    type="button"
                    className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                  >
                    Edit
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="absolute right-8 mt-5">
        <a href="printrec">
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Generate Report
        </button>
        <div className="mt-1 opacity-0">.</div>
        </a>
        </div>
    </div>
  );
}
