import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ViewPackage() {
  const [packages, setPackages] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

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
 
 const handleCheckboxChange = (pkg) => {
    const isSelected = selectedPackages.includes(pkg._id);
    if (isSelected) {
      setSelectedPackages(selectedPackages.filter((id) => id !== pkg._id));
    } else {
      setSelectedPackages([...selectedPackages, pkg._id]);
    }
  };

  const calculateTotalPrice = () => {
    let total = 0;
    selectedPackages.forEach((pkgId) => {
      const pkg = packages.find((p) => p._id === pkgId);
      if (pkg) {
        total += pkg.unitprice;
      }
    });
    setTotalPrice(total);
  };

  return (
    <div>
      <div className="text-2xl flex justify-center items-center">
        <div className="gap-16 grid grid-cols-2 mt-8 ">
          <a href="viewpkg">
            <button className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 hover:from-amber-900 hover:via-amber-800 
                                     hover:to-amber-700 text-white font-bold px-2 py-4 font-bold uppercase hover:text-black  rounded-[10px] w-full ">
              Interior
            </button>
          </a>
          <a href="viewpkg2">
            <button className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 hover:from-amber-900 hover:via-amber-800 
                                     hover:to-amber-700 text-white font-bold hover:from-amber-700 opacity-55 px-2 py-4 font-bold uppercase hover:text-black rounded-[10px] w-full">
              Exterior
            </button>
          </a>
        </div>
      </div>
      {/* Interior Packages */}
      <div className="flex justify-center items-center w-full">
        <div className="grid grid-cols-2 gap-8 bg-gray-200 bg-opacity-70 rounded-lg p-14 m-10 mx-5 max-w-7xl">
          {packages
            .filter((pkg) => pkg.category === "Interior")
            .map((pkg) => (
              <div
                className="flex flex-col justify-center items-center bg-black bg-opacity-75 text-white rounded-lg px-8 py-4"
                key={pkg.pid}
              >
                {/* add Checkbox */}
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(pkg)}
                  checked={selectedPackages.includes(pkg._id)}
                />
                <label className="text-xl font-bold mb-2">{pkg.name}</label>
                <p className="text-base text-gray-200">{pkg.description}</p>
                <h4 className="text-lg text-red-700 font-bold">
                  RS. {pkg.unitprice.toFixed(2)}
                </h4>
              </div>
            ))}
        </div>
      </div>
      {/* calculate total price */}
      <div className="p-15 m-10 my-5 ">
      <div className="flex justify-center items-center gap-4 ">
      
        <button
          onClick={calculateTotalPrice}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Calculate Total Price
        </button>

        <h2 className="text-2xl text-white">
          Total Price: RS. {totalPrice.toFixed(2)}
        </h2>
      </div>
      </div>
    </div>

  );
}
