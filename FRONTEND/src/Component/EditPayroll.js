import React, {useEffect,useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


export default function EditPayroll(){

    const [nic, setNic] = useState(""); // State for NIC
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [otstatus, setOtstatus] = useState("");
    const [otpayment, setOtpayment] = useState("");
    const [bonus, setBonus] = useState("");
    const [penaltyamt, setPenaltyamt] = useState("");
    const [salary, setSalary] = useState("");

    const { id } = useParams(); // Get the ID from URL params

    // Fetch payroll details from the server on component mount
  useEffect(() => {
    axios.get(`http://localhost:8090/employeepayroll/get/${id}`).then((res) => {
      setNic(res.data.payroll.nic);
      setName(res.data.payroll.name);
      setDate(res.data.payroll.date);
      setOtstatus(res.data.payroll.otstatus);
      setOtpayment(res.data.payroll.otpayment);
      setBonus(res.data.payroll.bonus);
      setPenaltyamt(res.data.payroll.penaltyamt); 
      setSalary(res.data.payroll.salary);
    }).catch((err) => {
      alert(err.message);
    });
  }, [id]);

  // Function to update payroll details
  function updatePayroll(e) {
    e.preventDefault();

    const updatedPayroll = {
      nic,
      name,
      date,
      otstatus,
      otpayment,
      bonus,
      penaltyamt,
      salary,
    };

    // Send updated payroll details to the server
    axios
      .put(`http://localhost:8090/employeepayroll/editpayroll/${id}`, updatedPayroll)
      .then(() => {
        alert("Payroll Updated");
        window.location.href = "/EmployeePayroll";
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }

  function handleDateChange(e) {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();

    if (selectedDate > currentDate) {
      alert("Please select a date on or before this month.");
    } else {
      setDate(e.target.value);
    }
  }

  // NIC format error message
function handleNicChange(e) {
  const value = e.target.value;
  const nicPattern = /^[0-9]{0,9}[vV]{0,1}$|^[0-9]{0,12}$/;

  if (!nicPattern.test(value)) {
    // Prevent further input by freezing the input field
    e.target.value = e.target.value.slice(0, -1);
  } else {
    setNic(value.toUpperCase()); // Convert V/v to uppercase for consistency
  }
}

// Name format error message
function handleNameChange(e) {
  const value = e.target.value;
  const namePattern = /^[A-Za-z\s]+$/;

  if (!namePattern.test(value)) {
    // Prevent further input by freezing the input field
    e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '');
  } else {
    setName(value);
  }
}

    return(

        <form onSubmit={updatePayroll}>
          <div className="container bg-gray-200 bg-opacity-70 rounded-lg px-8 py-4 mt-3 mx-auto w-2/3">
          <center><h1>Edit Payroll</h1></center>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label  className="block text-sm font-medium leading-6 text-gray-900">
                NIC
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="nic"
                  id="nic"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={nic} //showing value
                  pattern="[0-9]{9}[vV]{1}|[0-9]{12}"
                  onChange={handleNicChange}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label  className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={name} //showing value
                  onChange={handleNameChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label  className="block text-sm font-medium leading-6 text-gray-900">
                Date
              </label>
              <div className="mt-2">
                <input
                  type="month"
                  name="date"
                  id="date"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={date} //showing value
                  onChange={handleDateChange}
                  />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                OT Status
              </label>
              <div className="mt-2">
                <select
                  id="otstatus"
                  name="otstatus"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  value={otstatus} //showing value
                  onChange={(e)=>{

                  setOtstatus(e.target.value);
                  }}
                  required>
                  <option selected>Choose...</option>
                  <option>Yes</option>
                  <option>no</option>

                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label  className="block text-sm font-medium leading-6 text-gray-900">
                OT Payment
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="otpayment"
                  id="otpayment"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={otpayment} //showing value
                  onChange={(e)=>{

                    setOtpayment(e.target.value);
                  }}
                required/>
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Bonus
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="bonus"
                  id="bonus"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={bonus} //showing value
                  onChange={(e)=>{

                    setBonus(e.target.value);
                  }}
                  required/>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Penalty Amt
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="penaltyamt"
                  id="penaltyamt"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={penaltyamt} //showing value
                  onChange={(e)=>{

                    setPenaltyamt(e.target.value);
                  }}
                  required/>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                salary
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="salary"
                  id="salary"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={salary} //showing value
                  onChange={(e)=>{

                    setSalary(e.target.value);
                  }}
                  required/>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
        <a href="/employeepayroll" type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </a>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Update
        </button>
      </div>
      </div>
          </form>
       

    )
}