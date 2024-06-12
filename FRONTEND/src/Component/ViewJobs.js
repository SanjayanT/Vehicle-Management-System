import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';



export default function ViewJobs() {
  const [allJobs, setallJobs] = useState([]);
  const [searchJob, setSearchJob] = useState(''); 
  const navigate = useNavigate();


  useEffect(() => {
      function getJobs() {
          axios.get("http://localhost:8090/job/viewjobs")
              .then((res) => {
                  console.log("Response from server:", res.data); 
                  const reversedJobs = res.data.reverse();
                  setallJobs(reversedJobs);
              })
              .catch((err) => {
                  console.error("Error fetching data:", err);
                  alert(err.message);
              });
      }

      getJobs();
  }, []);

//Function to search jobs
const filteredJobs = allJobs.filter((job) => {
  
  const query = searchJob.toLowerCase();
  return (
    job.jobNumber.toLowerCase().includes(query) ||
    job.jobDate.toLowerCase().includes(query) ||
    job.timeIn.toLowerCase().includes(query) ||
    job.name.toLowerCase().includes(query)
  );
});

  

  

// Function to handle job deletion
  const deleteJob = async (jobId) => {

    const confirm = window.confirm('Are you sure you want to delete this job?');

    if(confirm){
      try{
        await axios.delete(`http://localhost:8090/job/delete/${jobId}`);
        alert('Job Deleted Successfully');
        navigate('/viewjobs');

      } catch(error){
        console.error('Error deleting job',error);
        alert('Failed to delete the job');
        
      }
    
    }
  }




    return (
      <div className="mx-auto max-w-screen-xl">
        <div className="container bg-gray-200 bg-opacity-70 rounded-lg px-8 py-4 mt-3 mx-5">

        <div className="flex justify-between items-center">
            <h1 className="Heading1 text-center text-4xl flex-grow font-BakBak one font-bold">All Jobs</h1>
        </div>

        {/* Heading container */}
        <div className="container bg-gray-500 bg-opacity-70 rounded-lg ">
         <div className="space-y-2 flex justify-between grid grid-cols-5 gap-4 mt-4 mb-4">
          <div>
            <h2 className="text-center text-xl flex-grow font-bold mt-4 mb-4">Job Number</h2>
          </div>
           
          <div>
            <h2 className="text-center text-xl flex-grow font-bold mt-2 mb-3">Date</h2>
          </div>

          <div>
            <h2 className="text-center text-xl flex-grow font-bold mt-2 mb-3">Time</h2>
          </div>

          <div>
            <h2 className="text-center text-xl flex-grow font-bold mt-2 mb-3">Customer name</h2>
          </div>
            
        {/* Search bar */}
        <div className="flex justify-end my-4">
         <div className="relative"> 

       {/* Absolute SVG for search icon at the top left */}
           <div className="absolute top-0 left-3 flex items-start pointer-events-none"> 
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-900 mt-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 a7 7 0 0114 0z"
                />
              </svg>
           </div>

       {/* Adjusted padding to prevent text from overlapping the icon */}
              <input
                type="text"
                placeholder="Search..."
                value={searchJob}
                onChange={(e) => setSearchJob(e.target.value)}
                className="h-8 mt-2 p-2 border border-gray-400 rounded pl-10 opacity-70 mr-2" // Left padding to create space for the icon
              />
         </div>
        </div>
       </div>
      </div>

        {/*------ Display filtered jobs ------*/}
          {filteredJobs.map((job) => (
            <div key={job.jobNumber} className="container bg-gray-200 bg-opacity-70 rounded-lg py-1 mt-2">
            <Link to={`/details/${job.jobNumber}`}>

              <div className="space-y-2 flex justify-between grid grid-cols-5 gap-4 mt-3 mb-3 text-center">
                <div className="mt-2 text-lg">{job.jobNumber}</div>
                <div className="text-lg">{job.jobDate}</div>
                <div class="text-lg">{job.timeIn}</div>
                <div className="text-lg">{job.name}</div>

                <div>

                {/* Update button */}
                  <Link to={`/updatejobs/${job._id}`}>
                    <button
                      className="bg-gradient-to-r from-green-600 via-green-800 to-green-950 hover:from-green-950 hover:via-green-700 hover:to-green-600 text-white font-bold py-2 px-5 rounded-lg 
                                    mr-2 opacity-80 transition duration-300 ease-in-out transform hover:scale-105"> Update </button>
                  </Link>

                {/* Delete button */}
                  <button
                    onClick={() => deleteJob(job._id)}
                    className="bg-gradient-to-r from-red-700 via-red-800 to-red-900 hover:from-red-900 hover:via-red-700 
                                    hover:to-red-600 text-white font-bold py-2 px-5 rounded-lg mr-2 opacity-80 transition duration-300
                                    ease-in-out transform hover:scale-105"> Delete </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
      );
};
    


