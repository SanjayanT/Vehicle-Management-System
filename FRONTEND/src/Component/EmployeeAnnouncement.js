import React, { useState, useEffect } from 'react';
import axios from "axios";

export default function EmployeeAnnouncement() {
  const [employeeannouncement, setAnnouncement] = useState([]); // State for storing announcement details
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null); // State for storing the selected announcement
  const [searchTerm, setSearchTerm] = useState(""); // State for storing search term

  // Fetch announcement details from the server on component mount
  useEffect(() => {
    function getAnnouncement() {
      axios.get("http://localhost:8090/employeeannouncement/").then((res) => {
        console.log(res);
        setAnnouncement(res.data);
      }).catch((err) => {
        alert(err.message);
      })
    }
    getAnnouncement();
  }, [])

  // Function to handle deletion of an announcement
  const onDeleteClick = async (userId) => {
    const confirmed = window.confirm("Are you sure you want to delete this announcement entry?");
    if (confirmed) {
    await axios.delete(`http://localhost:8090/employeeannouncement/delete/${userId}`);
    alert('Announcement Deleted Successfully');
    window.location.reload(); // Refresh page after successful deletion
    }
  }

  // Function to handle viewing an announcement
  const onViewClick = (announcement) => {
    setSelectedAnnouncement(announcement);
  }

  // Card component to display announcement details
  const AnnouncementCard = ({ announcement, onClose }) => (
    <div class="bg-white rounded-lg shadow-lg p-4 mb-20 relative">  {/* Added relative class for positioning the X button*/}
      <button
        className="absolute top-0 right-0 bg-red-400 hover:bg-red-500 text-gray-800 hover:text-gray-900 rounded-full h-6 w-6 flex items-center justify-center"
        onClick={onClose}
      >   {/* Added top-0 right-0 for positioning the X button*/}
        X
      </button>
      <h2 className="text-lg font-bold mb-2">{announcement.title}</h2>
      <p className="text-sm text-gray-500 mb-4">{announcement.date}</p>
      <p className="text-base text-gray-700">{announcement.announcement}</p>
    </div>

  );

  // Function to handle closing the card
  const onCloseCard = () => {
    setSelectedAnnouncement(null);
  };

  // Function to filter announcements based on search term
  const filteredAnnouncement = employeeannouncement.filter((announcement) =>
    announcement.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div class="mt-3">

      <h2 class="text-white mb-2 text-center text-3xl font-bold text-white">Announcements</h2>

      {/* Search bar */}
      <div className="relative ml-[8rem]">
        <input
          type="text"
          placeholder="Search here.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2 rounded-md mb-4 pl-10"
        // Added pl-10 class for left padding to accommodate the icon
        />
        <div className="absolute inset-y-5 left-0 flex items-center pl-3 pointer-events-none top-[0.4rem]">
          {/* Search icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-300"
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
      </div>

      {/* Table to display announcement details */}
      <div className="overflow-x-auto max-h-[25rem] overflow-y-scroll ml-[8rem] mr-[8rem] rounded-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table header */}
          <thead>
            <tr className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-700 text-white sticky top-0">  {/* Added bg-blue-500 for blue background and text-white for white text and Added sticky and top-0 for sticky header*/}
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Title</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {/* Loop through announcement details and display in table rows */}
            {filteredAnnouncement.map((announcement, index) => (
              <tr key={index} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{announcement.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{announcement.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-start gap-2">
                    {/* Edit announcement button */}
                    <a href={`/editannouncement/${announcement._id}`} type="button" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                      Edit
                    </a>
                    {/* View announcement button */}
                    <button onClick={() => onViewClick(announcement)} className="bg-transparent hover:bg-yellow-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                      View
                    </button>
                    {/* Delete announcement button */}
                    <button onClick={() => onDeleteClick(announcement._id)} className="bg-transparent hover:bg-red-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Button to add a new announcement */}
      <div className="mt-4 flex justify-between">
        <a href="/addannouncement" className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-[8rem] mb-5">
          Add
        </a>
        <a href="/staffhome" class="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-[8rem] mb-5">
          Prev
        </a>
      </div>

      {/* Display selected announcement in a card */}
      {selectedAnnouncement && (
        <div className="mt-4 ml-2 mr-2">
          <AnnouncementCard announcement={selectedAnnouncement} onClose={onCloseCard} />
        </div>
      )}

    </div>


  );
};
