import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UpdateCustomersSecond({ source }) {
  const [cname, setcname] = useState("");
  const [cnic, setcnic] = useState("");
  const [cphone, setcphone] = useState("");
  const [cmail, setcmail] = useState("");
  const [cvnum, setcvnum] = useState("");
  const [cvtype, setcvtype] = useState("");
  const [cpass, setcpass] = useState("");
  const [cpass2, setcpass2] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  function updatecustomer(e) {
    e.preventDefault();
    const UpdateCustomersSecond = {
      cname,
      cnic,
      cphone,
      cmail,
      cpass,
      cpass2,
      cvnum,
      cvtype,
    };

    axios
      .put(`http://localhost:8090/customer/update2/${id}`, UpdateCustomersSecond)
      .then(() => {
        alert("Details updated");
        if (source === "ProfileList") {
          window.location.href = "/ProfileList";
        } 
        else if (source === "CustomerList") {
          window.location.href = "/CustomerList";
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8090/customer/get/${id}`)
      .then((res) => {
        setcname(res.data.list.cname);
        setcnic(res.data.list.cnic);
        setcphone(res.data.list.cphone);
        setcmail(res.data.list.cmail);
        setcvnum(res.data.list.cvnum);
        setcvtype(res.data.list.cvtype);
        setcpass(res.data.list.cpass);
        setcpass2(res.data.list.cpass2);
        setLoading(false);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form
      onSubmit={updatecustomer}
      className="w-half bg-gray-100 p-6 ms-60 my-10 mt230 p-4 m-60 border-gray-300 rounded-lg min-h-min bg-opacity-50"
    >
      <div>
        <div class="text-black mt-3 text-center text-4xl font-bold">
          Customer update
        </div>
        <div class="p-8">
          <div class="flex gap-4">
            <input
              required
              onChange={(e) => setcname(e.target.value)}
              type="Name"
              name="name"
              value={cname}
              class="mt-1 block w-1/2 rounded-md border border-black bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              placeholder="Full Name *"
            />

            <input
              required
              onChange={(e) => setcmail(e.target.value)}
              type="email"
              name="email"
              value={cmail}
              class="mt-1 block w-1/2 rounded-md border border-black bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              placeholder="Email *"
            />
          </div>
          <div class="flex gap-4">
            <input
              required
              onChange={(e) => setcphone(e.target.value)}
              type="Phone"
              name="Phone"
              value={cphone}
              class="mt-1 block w-1/2 rounded-md border border-black bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              placeholder="Phone *"
            />

            <input
              required
              onChange={(e) => setcnic(e.target.value)}
              type="NIC"
              name="NIC"
              value={cnic}
              class="mt-1 block w-1/2 rounded-md border border-black bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              placeholder="NIC *"
            />

            <input
              required
              onChange={(e) => setcvnum(e.target.value)}
              type="NUM"
              name="NUM"
              value={cvnum}
              class="mt-1 block w-1/2 rounded-md border border-black bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              placeholder="Vehicle Number *"
            />
            <select
              required
              onChange={(e) => setcvtype(e.target.value)}
              name="select"
              id="select"
              value={cvtype}
              class="mt-1 block w-1/2 rounded-md border border-black bg-white px-3 py-4 font-semibold text-gray-500 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            >
              <option value="">Select Vehicle Type</option>
              <option value="Car">Car</option>
              <option value="Van">Van</option>
              <option value="Cab">Cab</option>
              <option value="Jeep">Jeep</option>
              <option value="Motorbike">Motor Bike</option>
              <option value="Minilorry">Mini Lorry</option>
            </select>
          </div>
          <div class="mt-6">
            <label
              for="password"
              class="block text-sm font-medium leading-5 text-black"
            >
              Password
            </label>
            <div class="mt-1 rounded-md shadow-sm text-black">
              <input
                required
                onChange={(e) => setcpass2(e.target.value)}
                id="password"
                name="password"
                type="password"
                value={cpass}
                class="appearance-none block w-full px-3 py-2 border border-black rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              ></input>
            </div>
          </div>

          <div class="mt-6">
            <label
              for="password_confirmation"
              class="block text-sm font-medium leading-5 text-black"
            >
              Confirm Password
            </label>
            <div class="mt-1 rounded-md shadow-sm text-black border-black">
              <input
                required
                onChange={(e) => setcpass(e.target.value)}
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                value={cpass2}
                class="appearance-none block w-full px-3 py-2 border border-black rounded-md placeholder-gray-800 focus:outline-none focus:shadow-outline-blue focus:border-blue-900 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              ></input>
            </div>
          </div>
          <div></div>
        </div>
        <div class="text-center">
          <button
            type="submit"
            class="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 hover:from-amber-900 hover:via-amber-800 
                                  hover:to-amber-700 text-white font-bold py-3 px-10 rounded-lg mr-2 opacity-90 transition duration-300
                                  ease-in-out transform hover:scale-105"
          >
            Update
          </button>
        </div>
        <b></b>
      </div>
    </form>
  );
}
