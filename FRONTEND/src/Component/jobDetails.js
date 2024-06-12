import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { jsPDF } from "jspdf";
import imgSrc2 from "./logo.png";



const JobDetails = () => {
  const [jobDetails, setJobDetails] = useState({}); 
  const { jobNumber } = useParams();
  const decodedJobNumber = decodeURIComponent(jobNumber);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/job/details/${decodedJobNumber}`); 
        setJobDetails(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [jobNumber]);




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
};

// Function to generate a report
const generatePDFReport = () => {
          const doc = new jsPDF();
          doc.setFont("Helvetica", "bold");

          // Set page dimensions and center position for title
          const pageWidth = doc.internal.pageSize.width;
          const text = "Job Report";
          const textWidth = doc.getTextWidth(text);
          const textXPosition = (pageWidth - textWidth) / 2;

          // Position for the centered heading
          const headingYCoordinate = 50;
          doc.setFontSize(14); 

          // Position for the logo (top-left corner)
          const logoXCoordinate = 20; // Left alignment
          const logoYCoordinate = 10; // Top position for the logo
          const logoWidth = 30; // Width of the logo
          const logoHeight = 10; // Height of the logo

          // Insert the heading in the center
          doc.text(text, textXPosition, headingYCoordinate);

          // Add the logo image
          doc.addImage(imgSrc2, "PNG", logoXCoordinate, logoYCoordinate, logoWidth, logoHeight);

          // Position for the address text (below the logo)
          const addressXCoordinate = logoXCoordinate; // Keep left alignment
          const addressYCoordinate = logoYCoordinate + logoHeight + 10; // Adjust to be below the logo

          doc.setFontSize(8);
          // Define multiline address text
          const address = [
            "Ryome AutoCare",
            "No.386/1",
            "Borella Road",
            "Pannipitiya",
            "Kottawa",
          ];

          // Add the address text below the logo
          doc.text(address, addressXCoordinate, addressYCoordinate);

          // Start position for job details
          const jobDetailsStartY = addressYCoordinate + 20;
              
      doc.setFontSize(12); 
      // Add job details with bold headings
      doc.text(`Job Number:`, 20, 70);
      doc.setFont('Helvetica', 'normal'); 
      doc.text(`${jobDetails.jobNumber}`, 60, 70);

      doc.setFont('Helvetica', 'bold');
      doc.text(`Job Date:`, 20, 80);
      doc.setFont('Helvetica', 'normal');
      doc.text(`${jobDetails.jobDate}`, 60, 80);

      doc.setFont('Helvetica', 'bold');
      doc.text(`Vehicle Type:`, 20, 90);
      doc.setFont('Helvetica', 'normal');
      doc.text(`${jobDetails.vehicleType}`, 60, 90);

      doc.setFont('Helvetica', 'bold');
      doc.text(`Reg. Number:`, 20, 100);
      doc.setFont('Helvetica', 'normal');
      doc.text(`${jobDetails.RegNo}`, 60, 100)

      doc.setFont('Helvetica', 'bold');
      doc.text(`Vehicle Make:`, 20, 110);
      doc.setFont('Helvetica', 'normal');
      doc.text(`${jobDetails.vehicleMake}`, 60, 110)

      doc.setFont('Helvetica', 'bold');
      doc.text(`Vehicle Model:`, 20, 120);
      doc.setFont('Helvetica', 'normal');
      doc.text(`${jobDetails.vehicleModel}`, 60, 120)

      doc.setFont('Helvetica', 'bold');
      doc.text(`Mileage:`, 20, 130);
      doc.setFont('Helvetica', 'normal');
      doc.text(`${jobDetails.mileage}`, 60, 130)

      doc.setFont('Helvetica', 'bold');
      doc.text(`Year:`, 20, 140);
      doc.setFont('Helvetica', 'normal');
      doc.text(`${jobDetails.year}`, 60, 140)

      doc.setFont('Helvetica', 'bold');
      doc.text(`Time In:`, 20, 150);
      doc.setFont('Helvetica', 'normal');
      doc.text(`${jobDetails.timeIn}`, 60, 150)

      doc.setFont('Helvetica', 'bold');
      doc.text(`Date Out:`, 20, 160);
      doc.setFont('Helvetica', 'normal');
      doc.text(`${jobDetails.dateout}`, 60, 160)

      
      doc.setFont('Helvetica', 'bold');
      doc.text(`Time Out:`, 20, 170);
      doc.setFont('Times New Roman', 'normal');
      doc.text(`${jobDetails.timeout}`, 60, 170)

      doc.setFont('Times New Roman', 'bold');
      doc.text(`Customer Name:`, 20, 180);
      doc.setFont('Helvetica', 'normal');
      doc.text(`${jobDetails.name}`, 60, 180)

      doc.setFont('Helvetica', 'bold');
      doc.text(`Contact Number:`, 20, 190);
      doc.setFont('Helvetica', 'normal');
      doc.text(`${jobDetails.contactNumber}`, 60, 190)

      doc.setFont('Helvetica', 'bold');
      doc.text(`Email:`, 20, 200);
      doc.setFont('Helvetica', 'normal');
      doc.text(`${jobDetails.email}`, 60, 200)

      doc.setFont('Helvetica', 'bold');
      doc.text(`Service Type:`, 20, 210);
      doc.setFont('Helvetica', 'normal');
      doc.text(`${jobDetails.serviceType}`, 60, 210)

      doc.setFont('Helvetica', 'bold');
      doc.text(`Additional Details:`, 20, 220);
      doc.setFont('Helvetica', 'normal');
      doc.text(`${jobDetails.details}`, 60, 220)

      const signature = [
        "Signature : ",
        "          ",
        ".............................",
      ];

      const date = [
        "Date : ",
        "          ",
        ".............................",
      ];

      doc.text(signature, addressXCoordinate, 250);
      doc.text(date,150, 250);

      // Save the PDF with a meaningful name
      doc.save(`Job_Report_${jobDetails.jobNumber}.pdf`);
};

  
  return (

    <div className="mx-auto max-w-screen-xl">
    <div className="container bg-gray-200 bg-opacity-70 rounded-lg px-8 py-4 mt-3 mx-5">

    <div className="flex justify-between items-center">
          <h1 className="Heading1 text-center text-4xl flex-grow font-BakBak one font-bold">Job Details</h1>
    </div>

        <div className="mt-4 text-lg">
        <div className="space-y-8 flex justify-between grid grid-cols-3 gap-4">
          <div>
            <p className="mt-7 mr-"><strong>Job Number:</strong> {jobDetails.jobNumber}</p>
          </div>

          <div>
            <p><strong>Job Date:</strong> {jobDetails.jobDate}</p>
          </div>

          <div>
            <p><strong>Vehicle Type:</strong> {jobDetails.vehicleType}</p>
          </div>
        </div>

        <div className="space-y-8 flex justify-between grid grid-cols-3 gap-4">
          <div>
            <p  className="mt-7"><strong>Registration Number:</strong> {jobDetails.RegNo}</p>
          </div>

          <div>
            <p><strong>Vehicle Make:</strong> {jobDetails.vehicleMake}</p>
          </div>

          <div>
          <p><strong>Vehicle Model:</strong> {jobDetails.vehicleModel}</p>
          </div>
        </div>

        <div className="space-y-8 flex justify-between grid grid-cols-3 gap-4">
          <div>
            <p  className="mt-7"><strong>Mileage:</strong> {jobDetails.mileage}</p>
          </div>

          <div>
            <p><strong>Year:</strong> {jobDetails.year}</p>
          </div>

          <div>
          <p><strong>Time In:</strong> {jobDetails.timeIn}</p>
          </div>
        </div>

        <div className="space-y-8 flex justify-between grid grid-cols-3 gap-4">
          <div>
            <p  className="mt-7"><strong>Date Out:</strong> {jobDetails.dateout}</p>
          </div>

          <div>
            <p><strong>Time Out:</strong> {jobDetails.timeout}</p>
          </div>

          <div>
          <p><strong>Customer Name:</strong> {jobDetails.name}</p>
          </div>
        </div>

        <div className="space-y-8 flex justify-between grid grid-cols-3 gap-4">
          <div>
            <p  className="mt-7"><strong>Contact Number:</strong> {jobDetails.contactNumber}</p>
          </div>

          <div>
            <p><strong>Email:</strong> {jobDetails.email}</p>
          </div>

          <div>
          <p><strong>Service Type:</strong> {jobDetails.serviceType + " , "}</p>
          </div>
        </div>

        <div className="space-y-8 flex justify-between grid grid-cols-3 gap-4">
          <div>
            <p  className="mt-7"><strong>Additional Details:</strong> {jobDetails.details}</p>
          </div>

          <div>
            <p></p>
          </div>

          <div>
          <p></p>
          </div>
        </div>
 
        </div>
        <div className="flex justify-end items-end space-x-4">
         
              
          {/* update button */}
          <Link to ={`/updatejobs/${jobDetails._id}`}>
          <button className="bg-gradient-to-r from-green-600 via-green-800 to-green-950 hover:from-green-950 hover:via-green-700 
                                  hover:to-green-600 text-white font-bold py-2 px-5 rounded-lg mr-2 opacity-80 transition duration-300
                                  ease-in-out transform hover:scale-105">Update</button>
          </Link>

           {/* Delete button */}
           <button onClick={(e) => {deleteJob(jobDetails._id, jobDetails.jobNumber); e.preventDefault();}} 
                  className="bg-gradient-to-r from-red-700 via-red-800 to-red-900 hover:from-red-900 hover:via-red-700 
                                  hover:to-red-600 text-white font-bold py-2 px-5 rounded-lg mr-2 opacity-80 transition duration-300
                                  ease-in-out transform hover:scale-105">Delete</button>

            {/* Generate Report button */}
             <button onClick={generatePDFReport}
                className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 hover:from-amber-900 hover:via-amber-800 
                                  hover:to-amber-700 text-white font-bold py-2 px-5 rounded-lg mr-2 opacity-90 transition duration-300
                                  ease-in-out transform hover:scale-105"> Generate Report</button>

            {/* Button to track job status */}
            <Link to ={`/trackjobs/${jobDetails.jobNumber}`}>
            <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 hover:from-blue-950 hover:via-blue-700 
                                  hover:to-blue-600 text-white font-bold py-2 px-5 rounded-lg mr-2 opacity-80 transition duration-300
                                  ease-in-out transform hover:scale-105">Track Status</button>
          </Link>

                                  
        </div>
      </div>
    </div>
    
  );
};

export default JobDetails;