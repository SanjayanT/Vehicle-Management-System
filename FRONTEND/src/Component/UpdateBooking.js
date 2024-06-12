import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UpdateBooking() {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [eMail, setEmail] = useState("");
    const [vNum, setVNum] = useState("");
    const [vType, setvType] = useState("");
    const [dDate, setDate] = useState("");
    const [tTime, setTime] = useState("");
    const [serviceBox, setService] = useState("");

    const { id } = useParams();

    function updateBook(e) {
        e.preventDefault();

        const updatedBooking = {
            fname,
            lname,
            address,
            phoneNum,
            eMail,
            vNum,
            vType,
            dDate,
            tTime,
            serviceBox
        };

        axios.put(`http://localhost:8090/booking/updateBooking/${id}`, updatedBooking)
            .then(() => {
                alert("Booking Updated Successfully");
                window.location.href = "/bookRead";
            })
            .catch((err) => {
                alert(err.message);
            });
    }

    const alphabeticOnly = (e) => {
        const input = e.target;
        input.value = input.value.replace(/[^a-zA-Z]/gi, "");
    };

    useEffect(() => {
        axios.get(`http://localhost:8090/booking/get/${id}`)
            .then((response) => {
                console.log(response); // Log response to see what's being returned
                    setFname(response.data.book.fname);
                    setLname(response.data.book.lname);
                    setAddress(response.data.book.address);
                    setPhoneNum(response.data.book.phoneNum);
                    setEmail(response.data.book.eMail);
                    setVNum(response.data.book.vNum);
                    setvType(response.data.book.vType);
                    setDate(response.data.book.dDate);
                    setTime(response.data.book.tTime);
                    setService(response.data.book.serviceBox);
                }).catch((err) => {
                alert(err.message);
            });
    }, []);
    

    //checkbox function
    function handleCheckboxChange(e) {
        const value = e.target.value;
        const checked = e.target.checked;
    }

    return (
        <div>
            <div className="relative">
                <h1 className="ms-20 my-10 mt-20 text-6xl font-extrabold text-white">Book Now</h1>

                <form onSubmit={updateBook} className="w-half bg-gray-100 p-6 ms-60 my-10 mt230 p-4 m-60 border-gray-300 rounded-lg min-h-min bg-opacity-50">
                    <div class="grid grid-cols-1 gap-4">
                        <div class="form-group flex mx-10" >
                            <table class="w-full">
                                <tr>
                                    <td><label for="firstname" class="block text-sm font-medium text-black my-4">First Name</label></td>
                                    <td><input type="text" id="firstname" name="firstname" class="mt-1 p-2 block border-gray-300 rounded-md text-black" value={fname} required onChange={(e) => { alphabeticOnly(e); setFname(e.target.value); }}></input></td>
                                    <td> <label for="lastname" class="block text-sm font-medium text-black my-4">Last Name</label></td>
                                    <td> <input type="text" id="lastname" name="lastname" class="mt-1 p-2 block border-gray-300 rounded-md text-black" value={lname} required onChange={(e) => { alphabeticOnly(e); setLname(e.target.value); }}></input></td>
                                </tr>
                                <tr>
                                    <td><label for="address" class="block text-sm font-medium text-black my-4">Address</label></td>
                                    <td><input type="textarea" id="address" name="address" class="mt-1 p-2 block border-gray-300 rounded-md text-black" placeholder="ex: Kottawa" value={address} required onChange={(e) => setAddress(e.target.value)}></input></td>
                                    <td><label for="phone" class="block text-sm font-medium text-black my-4">Phone Number</label></td>

                                    <td><input type="tel" id="phone" name="phone" class="mt-1 p-2 block border-gray-300 rounded-md text-black" placeholder="ex: 07XXXXXXXX" value={phoneNum} required
                                        onKeyPress={(e) => {
                                            const validCharacters = /^[0-9\b]+$/;
                                            if (!validCharacters.test(e.key)) {
                                                e.preventDefault();}}}></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td><label for="email" class="block text-sm font-medium text-black my-4">Email</label></td>
                                    <td><input type="email" id="email" name="email" class="mt-1 p-2 block border-gray-300 rounded-md text-black me-10" placeholder="ex: abcd123@gmail.com" value={eMail} required onChange={(e) => setEmail(e.target.value)}></input></td>
                                </tr>

                                <br></br>
                                <br></br>

                                <tr>
                                    <td><label for="vehicle-number" class="block text-sm font-medium text-black me-5 my-4" >Vehicle Number</label></td>
                                    <td><input type="text" id="vehicle-number" name="vehicle-number" class="mt-1 p-2 block border-gray-300 rounded-md text-black" placeholder="ex: ABXXXX" value={vNum} required onChange={(e) => setVNum(e.target.value)}></input></td>
                                    <td><label for="vehicle-type" class="block text-sm font-medium text-black me-5 my-4">Vehicle Type</label></td>
                                    <td><select id="vehicle-type" name="vehicle-type" class="mt-1 p-2 block border-gray-300 rounded-md text-black" value={vType} onChange={(e) => setvType(e.target.value)}>
                                        <option value="">Select Vehicle Type</option> {/* Add an empty option for default selection */}
                                        <option value="Car">Car</option>
                                        <option value="Van">Van</option>
                                        <option value="Cab">Cab</option>
                                        <option value="Jeep">Jeep</option>
                                        <option value="Motor Bike">Motor Bike</option>
                                        <option value="Mini Lorry">Mini Lorry</option>
                                    </select>
                                    </td>
                                </tr>

                                <br></br>
                                <br></br>

                                <tr>
                                    <td><label for="date" class="block text-sm font-medium text-black me-5 my-4">Date</label></td>
                                    <td><input type="date" id="date" name="date" class="mt-1 p-2 block  border-gray-300 rounded-md text-black" value={dDate} required onChange={(e) => setDate(e.target.value)}></input></td>

                                    <td><label for="time" class="block text-sm font-medium text-black  me-5 my-4">Time</label></td>
                                    <td><input type="time" id="time" name="time" class="mt-1 p-2 block  border-gray-300 rounded-md text-black" value={tTime}  required onChange={(e) => setTime(e.target.value)}></input></td>
                                </tr>


                            </table>
                        </div>

                        <div class="form-group">
                            <label class="block text-sm font-medium text-black mx-10">Services</label>
                            <div class="mt-5 space-y-2 flex mx-10">
                            <table>
                                <tr>
                                    <td><div class="mt-1 flex items-center me-10 ml-10">
                                        <input id="service" name="services" type="checkbox" value={"Body Wash /"} onChange={handleCheckboxChange}></input>
                                        <label for="service">Body Wash</label>
                                        </div></td> 
                                    <td><div class="flex items-center me-10 ml-10">
                                        <input id="service" name="services" type="checkbox" value={"Under Wash /"} onChange={handleCheckboxChange}></input>
                                        <label for="service">Under Wash</label>
                                        </div></td>
                                    <td><div class="flex items-center me-10 ml-10">
                                        <input id="service" name="services" type="checkbox" value={"Engine Wash /"} onChange={handleCheckboxChange}></input>
                                        <label for="service">Engine Wash</label>
                                        </div></td>
                                    <td><div class="flex items-center me-10 ml-10">
                                        <input id="service" name="services" type="checkbox" value={"Engine Cleanup /"}onChange={handleCheckboxChange}></input>
                                        <label for="service">Engine Cleanup</label>
                                        </div></td>     
                                    
                                </tr> 

                                <tr>
                                    <td><div class="flex items-center me-10 ml-10">
                                        <input id="service" name="services" type="checkbox" value={"Interior Cleaning /"} onChange={handleCheckboxChange}></input>
                                        <label for="service">Interior Cleaning</label>
                                        </div></td>
                                    <td><div class="flex items-center me-10 ml-10">
                                        <input id="service" name="services" type="checkbox" value={"Vaccuming /"} onChange={handleCheckboxChange}></input>
                                        <label for="service">Vaccuming</label>
                                        </div></td>
                                    <td><div class="flex items-center me-10 ml-10">
                                        <input id="service" name="services" type="checkbox" value={"Under Oiling /"} onChange={handleCheckboxChange}></input>
                                        <label for="service">Under Oiling</label>
                                        </div></td>
                                    <td><div class="flex items-center me-10 ml-10">
                                        <input id="service" name="services" type="checkbox" value={"Oil Changing /"} onChange={handleCheckboxChange}></input>
                                        <label for="service">Oil Changing</label>
                                        </div></td>  
                            
                                </tr>

                                <tr>
                                <td><div class="flex items-center me-10 ml-10">
                                        <input id="service" name="services" type="checkbox" value={"Greasing /"} onChange={handleCheckboxChange}></input>
                                        <label for="service">Greasing</label>
                                        </div></td>
                                    <td><div class="flex items-center me-10 ml-10">
                                        <input id="service" name="services" type="checkbox" value={"Filter Change /"} onChange={handleCheckboxChange}></input>
                                        <label for="service">Filter Change</label>
                                        </div></td>
                                    <td><div class="flex items-center me-10 ml-10">
                                        <input id="service" name="services" type="checkbox" value={"Waxing /"} onChange={handleCheckboxChange}></input>
                                        <label for="service">Waxing</label>
                                        </div></td>
                                    <td><div class="flex items-center me-10 ml-10">
                                        <input id="service" name="services" type="checkbox" value={"Cut & Polish /"} onChange={handleCheckboxChange}></input>
                                        <label for="service">Cut & Polish</label>
                                        </div></td>                  
                                </tr>

                                <tr>
                                <td><div class="flex items-center me-10 ml-10">
                                        <input id="service" name="services" type="checkbox" value={"Engine Repairs /"} onChange={handleCheckboxChange}></input>
                                        <label for="service">Engine Repairs</label>
                                        </div></td>
                                    
                                    <td><div class="flex items-center me-10 ml-10">
                                        <input id="service" name="services" type="checkbox" value={"Electrical System Repairs /"} onChange={handleCheckboxChange}></input>
                                        <label for="service">Electrical System Repairs</label>
                                        </div></td>
                                    <td><div class="flex items-center me-10 ml-10">
                                        <input id="service" name="services" type="checkbox" value={"Wheel Alignment /"} onChange={handleCheckboxChange}></input>
                                        <label for="service">Wheel Alignment</label>
                                        </div></td>
                                    <td><div class="flex items-center me-10 ml-10">
                                        <input id="service" name="services" type="checkbox" value={"Full Service /"} onChange={handleCheckboxChange}></input>
                                        <label for="service">Full Service</label>
                                        </div></td>
                                </tr>
                            </table>
                            </div>
                        </div>
                    </div>

                    <div class="mt-5 mb-5 flex justify-center">
                    <button onClick={updateBook} type="submit" class="bg-gradient-to-r from-yellow-700 via-y ellow-800 to-yellow-900 hover:from-amber-900 hover:via-amber-800 
                                  hover:to-amber-700 text-white font-bold py-3 px-5 rounded-lg mr-2 opacity-90 transition duration-300
                                  ease-in-out transform hover:scale-105" >Update Booking</button>
                    </div>
                </form>
                <div>.....</div>
            </div>
        </div>
    );
}
