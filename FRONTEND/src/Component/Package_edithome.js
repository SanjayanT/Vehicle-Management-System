import React, { useState, useEffect } from "react";

import axios from "axios";

import "primeicons/primeicons.css";

export default function Package_edithome() {
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    function getPackages() {
      axios
        .get("http://localhost:8090/svc-packages/")
        .then((res) => {
          console.log("Response from server:", res.data);
          setPackages(res.data);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    }
    getPackages();
  }, []);
  function DeletePackage(id) {
    const confirm = window.confirm("Are you sure you want to delete this package?");
    if (!confirm) {
      return;
    }
    axios
      .delete(`http://localhost:8090/svc-packages/delete/${id}`)
      .then((res) => {
        console.log("Response from server:", res.data);
        setPackages(packages.filter((pkg) => pkg._id !== id));
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }
  return (
    
    <div>
       {/* Interior Packages Section */}
      <h2 className="text-3xl mb-6 flex justify-center mt-8 font-bold text-white">
        Interior
      </h2>
      <div className="flex justify-center flex-col items-center w-full  ">
        <div className="grid grid-cols-2 gap-8 bg-gray-200 bg-opacity-70 rounded-lg p-14 mt-16 mx-5 w-full max-w-7xl">
          {packages
            .filter((pkg) => pkg.category === "Interior")
            .map((pkg) => (
              <div
                className="flex flex-col justify-center items-center bg-black bg-opacity-75 text-white rounded-lg px-8 py-4"
                key={pkg.name}
              >
                <h2 className="text-xl font-bold mb-2">{pkg.name}</h2>
                <p className="text-base text-gray-200">{pkg.description}</p>
                <h4 className="text-lg text-red-700 font-bold">
                  RS. {pkg.unitprice.toFixed(2)}
                </h4>
                <div className="flex justify-center items-center gap-4">
                  <a href={`/editpkg/${pkg._id}`}>
                    <button className="bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
                      <i
                        className="pi pi-pen-to-square"
                        style={{ fontSize: "1rem" }}
                      ></i>
                    </button>
                  </a>
                  <button className="bg-red-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => DeletePackage(pkg._id)}>  
                    <i
                      className="pi pi-trash"
                      style={{ fontSize: "1rem" }}
                    ></i>
                  </button>
                </div>
              </div>
            ))}
        </div>
  {/* Exterior Packages Section */}
        <h2 className="text-3xl mb-6 mt-16 flex justify-left mt-8 font-bold text-white">
          Exterior
        </h2>
        <div className="grid grid-cols-2 gap-8 bg-gray-200 bg-opacity-70 rounded-lg p-14 m-10 mx-5 w-full max-w-7xl">
          {packages
            .filter((pkg) => pkg.category === "Exterior")
            .map((pkg) => (
              <div
                className="flex flex-col justify-center items-center bg-black bg-opacity-75 text-white rounded-lg px-8 py-4"
                key={pkg.pid}
              >
                <h2 className="text-xl font-bold mb-2">{pkg.name}</h2>
                <p className="text-base text-gray-200">{pkg.description}</p>
                <h4 className="text-lg text-red-700 font-bold ">
                  RS. {pkg.unitprice.toFixed(2)}
                </h4>
                <div className="flex justify-center items-center gap-4">
                   {/* Edit Package Button */}
                  <a href={`/editpkg/${pkg._id}`}>
                    <button className="bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
                      <i
                        className="pi pi-pen-to-square"
                        style={{ fontSize: "1rem" }}
                      ></i>
                    </button>
                  </a>
                   {/* Delete Package Button */}
                  <button className="bg-red-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => DeletePackage(pkg._id)}>  
                    <i
                      className="pi pi-trash"
                      style={{ fontSize: "1rem" }}
                    ></i>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
