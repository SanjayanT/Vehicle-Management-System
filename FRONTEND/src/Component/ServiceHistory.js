import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from 'react-to-print';
import imgSrc from "./logo.png";
import { FaPrint } from "react-icons/fa6";



export default function ServiceHistory() {
    const [bookings, setBookings] = useState([]);
    const componentRef = useRef();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getBookings();
    }, []);

    const getBookings = () => {
        axios.get("http://localhost:8090/booking/")
            .then((res) => {
                const filteredBookings = filterPastBookings(res.data);
                // Sort bookings by date in descending order
                const sortedBookings = filteredBookings.sort((a, b) => new Date(b.dDate) - new Date(a.dDate));
                setBookings(sortedBookings);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
                alert(err.message);
            });
    };   

    const filterPastBookings = (bookings) => {
        const currentDate = new Date();
        return bookings.filter((booking) => {
            const bookingDate = new Date(booking.dDate);
            return bookingDate < currentDate;
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-UK', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        });
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        DocumentTittle: "Booking List",
        onafterprint: () => alert("Booking List generation successful !!")
    });

    const filteredBookings = bookings.filter((booking) =>
        booking.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.lname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.vNum.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.vType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    

    return (
        <div>
            <h2 className="ms-20 my-10 mt-20 text-5xl font-extrabold text-white">Service History</h2>
            <div className="absolute top-2 right-8">
                {/* Search bar */}
                <div className="relative mt-48">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {/* Search icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                    </div>
                    <input type="text" placeholder="Search " value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 w-64 bg-gray-100 rounded-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 border border-transparent"/>
                </div>
            </div>
            <h2 className="ms-20 my-10 mt-20 text-5xl font-extrabold text-white print:block hidden">Service History</h2>

            <div ref={componentRef}>
                {/* Header for PDF */}
                <div className="print:block hidden">
                <div>
                    <img src={imgSrc} alt="Logo" className="h-20 w-43 ml-20 mt-10 align-top align-left"/>
                </div>
                <br />
                <div className="font-bold top-24 mx-10 ml-20 justify-end">
                        <p className="mr-4">Ryome Auto Cares</p>
                        <p className="mr-4">386/1, Borella Road,</p>
                        <p className="mr-4">Pannipitiya,</p>
                        <p className="mr-4">Kottawa</p>
                        <p className="mr-4">0773216654 / 0112780599</p><br/>
                        <h1 className="text-center text-3xl">Service History List</h1><br/>
                        <hr/>
                    <br/>
                </div>
            </div>
                <table className=".w-auto bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 text-white sticky top-10 mx-10 ml-20">
                    <thead>
                        <tr className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 mt-5">
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Telephone</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Email</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Vehicle Number</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Vehicle Type</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Time</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Services</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings.map((booking) => (
                            <tr key={booking.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.fname} {booking.lname}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.phoneNum}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.eMail}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.vNum}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.vType}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">{formatDate(booking.dDate)}</td>
                                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">{booking.dDate}</td> */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.tTime}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.serviceBox}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Footer for PDF */}
                <div className="print:block hidden ml-10">
                    <div className="absolute bottom-0 w-full  flex px-10 mb-10"><br/><br/>
                        <div className="font-bold text-left space-x-4">
                            ..................................<br />Date
                        </div>
                        <div className="font-bold ml-96">
                            ..................................<br />Issued By
                        </div>
                        <div className="font-bold ml-96">
                            .....................................<br />Manager's Signature
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute right-8 mt-5">
                <button onClick={handlePrint} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-5 rounded "><FaPrint className="mx-16" />Generate Reports</button>
                <div className="mt-1 opacity-0">.</div>
            </div>
        </div>
    );
}
