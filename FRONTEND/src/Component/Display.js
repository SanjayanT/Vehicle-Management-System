import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import imgSrc1 from "./logo.png";

export default function Display() {
    const [searchsupplier, setSearchsupplier] = useState('');
    const [suppliers, setSuppliers] = useState([]);
    

    useEffect(() => {
        getSuppliers();
    }, []);

    const getSuppliers = () => {
        axios.get("http://localhost:8090/supplier/")
            .then((res) => {
                console.log("Response from server:", res.data);
                setSuppliers(res.data);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
                alert(err.message);
            });
    };

    const filteredsuppliers = suppliers.filter((supplier) => {
        const query = searchsupplier.toLowerCase();
        return (
            supplier.name.toLowerCase().includes(query)
        );
    });

    const deletesupplier = async (userId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this supplier?");
        if (confirmDelete) {
            await axios.delete(`http://localhost:8090/supplier/delete/${userId}`);
            alert('Supplier Deleted Successfully');
            window.location.reload(); // Refresh page after successful deletion
        }
    };

    // Function to generate a report using supplier name
    const generatePDFReport = (supplierName,contact,contact_2,Email,Website,Main_supplies,address,Additional_note) => {
        const doc = new jsPDF();
        doc.setFont("Times New Roman", "bold");
        const pageWidth = doc.internal.pageSize.width; 
        const text = "Supplier Report"; 
        const textWidth = doc.getTextWidth(text); 
        const textXPosition = (pageWidth - textWidth) / 2; 
        doc.setFontSize(16);

        doc.addImage(imgSrc1, "PNG", 160, 10, 30, 10);
        
        // Add bold and centered heading
        doc.text(text, textXPosition, 20);
        doc.setFont('Times New Roman', 'normal');
        doc.text(`Supplier Name: ${supplierName}`, 20, 30);
        doc.text(`Contact: ${contact}`, 20, 45);
        doc.text(`Contact 2: ${contact_2}`, 20, 55);
        doc.text(`Email : ${Email}`, 20, 70);
        doc.text(`Main Supplies : ${Main_supplies}`, 20, 85);
        doc.text(`Address : ${address}`, 20, 100);
        doc.text(`Additional notes : ${Additional_note}`, 20, 115);
    
        

        // Save the PDF with a meaningful name
        doc.save(`Supplier_Report_${supplierName}.pdf`);
    };

    return (
        <div>
            <div className="flex justify-between grid-cols-2 gap-5">
                <div>
                    <a className="float-left" href="/add">
                        <button className="bg-gradient-to-r from-green-700 via-green-800 to-green-900 hover:from-green-900 
             hover:via-green-800 hover:to-green-700 text-white ml-20 mt-5 mx-auto font-bold py-3 px-5 rounded-lg mr-2 
             opacity-90 transition duration-300 ease-in-out transform hover:scale-105 "> + Add Supplier</button>
                    </a>
                </div>

                <div className="flex justify-end">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchsupplier}
                            onChange={(e) => setSearchsupplier(e.target.value)}
                            className="h-8 mt-2 p-2 border border-gray-400 rounded pl-10 opacity-70 mr-2" />

                        <div className="absolute top-3 left-3 flex items-start pointer-events-none opacity-70">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-900 "
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
                    </div>
                </div>
            </div>

            <div className="container bg-gray-900 rounded-lg bg-opacity-70 px-8 py-4 mt-3 mx-5 mx-auto">
                <div className="grid grid-cols-3 gap-4">
                    {filteredsuppliers.map((supplier) => (
                        <div key={supplier.id} className="bg-white rounded-lg p-4 bg-opacity-55">
                            <div className="h-14 rounded-lg p-4 bg-slate-800" style={{ borderBottomRightRadius: '0rem', borderBottomLeftRadius: '0rem' }}>
                                <p className="text-3xl mb-8 text-red-700 font-bold ml-8">{supplier.name}</p>
                            </div>
                            <div className="bg-gray-200 opacity-90 rounded-lg p-4" style={{ borderTopRightRadius: '0rem', borderTopLeftRadius: '0rem' }}>
                                <p className="text-base mb-5 text-lg font-bold">{supplier.Main_supplies}</p>
                                <p className="text-base text-lg mb-1">Phone: {supplier.contact} / {supplier.contact_2}</p>
                                <p className="text-base text-lg mb-5">Address: {supplier.address}</p>
                                <button
                                    onClick={() => generatePDFReport(supplier.name, supplier.contact, supplier.contact_2,supplier.Email,supplier.Website,supplier.Main_supplies,supplier.address,supplier.Additional_note)}
                                    className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 hover:from-amber-900 hover:via-amber-800 
                                  hover:to-amber-700 text-white font-bold py-1 px-4 rounded-lg mr-2 opacity-90 transition duration-300
                                  ease-in-out transform hover:scale-105 float-right"> Report</button>
                                <button
                                    onClick={() => deletesupplier(supplier._id)}
                                    className="bg-gradient-to-r from-red-700 via-red-800 to-red-900 hover:from-red-900 hover:via-red-800 
                                    hover:to-red-700 text-white float-right mx-auto font-bold py-1 px-3 rounded-lg mb-2 mr-2 opacity-90 
                                    transition duration-300 ease-in-out transform hover:scale-105"
                                >
                                    Delete
                                </button>
                                <Link to={`/update/${supplier._id}`}>
                                    <button className="bg-gradient-to-r from-green-700 via-green-800 to-green-900 hover:from-green-900 
                                    hover:via-green-800 hover:to-green-700 text-white float-right mx-auto font-bold py-1 px-3 rounded-lg mr-2 
                                    opacity-90 transition duration-300 ease-in-out transform hover:scale-105"> Update   </button>
                                </Link>
                                
                                <Link to={`/purchase/${supplier.Email}`}>
                                    <button className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 hover:from-blue-900 
                                    hover:via-blue-800 hover:to-blue-700 text-white float-right mx-auto font-bold py-1 px-3 rounded-lg mr-2 
                                    opacity-90 transition duration-300 ease-in-out transform hover:scale-105">Purchase</button>
                               </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

}
