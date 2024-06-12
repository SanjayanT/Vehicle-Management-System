import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const TrackJobs = () => {
  const { jobNumber } = useParams();
  const [serviceTypes, setServiceTypes] = useState([]);
  const [checkedServices, setCheckedServices] = useState({});

  // Fetch the service types and status from the backend based on the job number
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/job/trackjobs/${jobNumber}`);
        const { serviceType, serviceStatus } = response.data;

        // Set initial service types and their checked status
        setServiceTypes(serviceType);
        setCheckedServices(serviceStatus || {}); // Initialize with existing status or empty object
        console.log(serviceStatus);

      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };

    fetchServiceData();
  }, [jobNumber]);

  // Handler for checkbox change
  const handleCheckboxChange = (service) => {
    setCheckedServices((prevState) => ({
      ...prevState,
      [service]: !prevState[service],
    }));
  };

  // Save the updated service status to the backend
  const handleSave = async () => {
    console.log("Attempting to save service status");
    try {
      await axios.put(`http://localhost:8090/job/updatejobstatus/${jobNumber}`, {
        serviceStatus: checkedServices, // Check if correct data is sent
      });
      console.log("Service status saved successfully!");
    } catch (error) {
      console.error("Error saving service status:", error);
    }
  };
  

  // Calculate the percentage of completed tasks
  const completedCount = Object.values(checkedServices).filter((isChecked) => isChecked).length;
  const totalTasks = serviceTypes.length;
  const completionPercentage = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;

  const chartData = {
    labels: ["Completed tasks", "Pending tasks"],
    datasets: [
      {
        data: [completedCount, totalTasks - completedCount], // Completed and pending tasks
        backgroundColor: ["#16a34a", "#b91c1c"], // Colors for completed and pending tasks
        hoverBackgroundColor: ["#66BB6A", "#FF4500"],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 13,
          },
        },
      },
      tooltip: {
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 14,
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 1,
      },
    },
    maintainAspectRatio: true,
  };

  if (serviceTypes.length === 0) {
    return <div>No services selected for this job.</div>;
  }

  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="container bg-gray-200 bg-opacity-70 rounded-lg px-8 py-4 mt-3 mx-5">
        <div className="flex justify-between items-center">
          <h1 className="Heading1 text-center text-4xl flex-grow font-bold">Job Status</h1>
        </div>

        <div className="space-y-8 flex justify-between grid grid-cols-2 gap-4 mt-10">
          {/* Column 1: Task checkboxes */}
          <div>
            <h2 className="text-2xl font-bold mb-4 mt-10">Tasks to be completed</h2>
            <ul>
              {serviceTypes.map((service) => (
                <li key={service}>
                  <input
                    type="checkbox"
                    className="w-5 h-5 mr-3 mb-3"
                    id={`checkbox-${service}`}
                    checked={checkedServices[service]} 
                    onChange={() => handleCheckboxChange(service)} 
                  />
                  <label className="text-xl mb-3" htmlFor={`checkbox-${service}`}>{service}</label>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Doughnut chart */}
          <div>
            <h2 className="text-2xl font-bold mb-3">Task Completion Status</h2>
            <div style={{ height: '300px', width: '300px' }}> 
              <Doughnut
                data={chartData}
                options={chartOptions}
              />
            </div>
            <p className="text-lg mt-4 ml-6 mb-5">Job Completion Percentage: {completionPercentage.toFixed(2)}%</p>
          </div>
        </div>

        {/* Save Button and View Jobs Link */}
        <div className="flex justify-end"> 
          {/* <button
            className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 hover:from-amber-900 hover:via-amber-800 
                      hover:to-amber-700 text-white font-bold py-3 px-5 rounded-lg mr-2 opacity-90 transition duration-300
                      ease-in-out transform hover:scale-105"
            onClick={handleSave}
          >
            Save
          </button> */}

          <a href="/viewjobs">
            <button className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 hover:from-amber-900 hover:via-amber-800 
                      hover:to-amber-700 text-white font-bold py-3 px-5 rounded-lg mr-2 opacity-90 transition duration-300
                      ease-in-out transform hover:scale-105">
              View Jobs
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TrackJobs;
