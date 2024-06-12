import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import imgSrc from "./logo.png";
import { FaPrint } from "react-icons/fa6";

export default function ReviewRead() {
  const [reviewAdd, setlist] = useState([]);
  const componentRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    function getlist() {
      axios
        .get("http://localhost:8090/reviewAdd/")
        .then((res) => {
          console.log("Response from server:", res.data);
          setlist(res.data);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          alert(err.message);
        });
    }

    getlist();
  }, []);

  // Function to handle deletion of a review
  const onDeleteClick = async (revid) => {
    // Show confirmation dialog
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this profile?"
    );

    // If user confirms deletion
    if (shouldDelete) {
      await axios.delete(`http://localhost:8090/reviewAdd/delete/${revid}`);
      alert("Review Deleted Successfully");
      window.location.reload(); // Refresh page after successful deletion
    }
  };

  // Function to filter reviews based on rating
  const filteredReview = reviewAdd.filter((reviewAdd) =>
    reviewAdd.rating.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to generate report
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    DocumentTitle: "Review List",
    onafterprint: () => alert("Review List generation successful !!"),
  });

  return (
    <div>
      <h2 className="ms-20 my-10 mt-20 text-6xl font-extrabold text-white">
        Review List
      </h2>
      <div className="absolute top-2 right-8">
        {/* Search bar */}
        <div className="relative mt-48">
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
          <div className="absolute right-8 mt-12">
            <button
              onClick={handlePrint}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Generate Report <FaPrint />
            </button>
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
      <div className="print:block hidden">
        <h2 className="ms-20 my-10 mt-20 text-6xl font-extrabold text-white">
          Review List
        </h2>
      </div>

      <div className="flex justify-center items-center h-screen">
        <div ref={componentRef}>
          {/* Header for PDF */}
          <div className="print:block hidden">
            <div>
              <img
                src={imgSrc}
                alt="Logo"
                className="h-20 w-43 ml-10 mt-3 mr-20 align-top align-left"
              />
            </div>
            <br />
            <div className="font-bold top-10 mx-10 justify-end">
              <p className="mr-4">Ryome Motor Cares</p>
              <p className="mr-4">NO:Colombo07</p>
              <p className="mr-4">Tel:0752941767</p>
              <p className="mr-4">Fax:0270110123</p>
              <p className="mr-4 text-center text-3xl"> Customer's Review List</p>
            </div>
          </div>
          <table className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 text-white sticky mx-10 absolute bottom-20 left-25">
            <thead>
              <tr className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 mt-15">
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-white  tracking-wider"
                >
                  E-Mail
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-white  tracking-wider"
                >
                  Rating
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-white  tracking-wider"
                >
                  Message
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredReview.map((reviewAdd) => (
                <tr
                  key={reviewAdd.id}
                  className="bg-white border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {reviewAdd.cmail}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {reviewAdd.rating}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {reviewAdd.message}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      {/* Delete review button */}
                      <button
                        onClick={() => onDeleteClick(reviewAdd._id)}
                        className="bg-transparent hover:bg-red-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Footer for PDF */}
          <div className="print:block hidden">
            <div className="absolute bottom-0 w-full flex justify-between px-10">
              <div className="font-bold text-left">
                ...........................
                <br />
                date
              </div>
              <div className="font-bold text-right">
                ...........................
                <br />
                Signature
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
