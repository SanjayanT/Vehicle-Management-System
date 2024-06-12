import React from "react";
import issuedItemsImage from "./images/issueditems.png";
import managePartsImage from "./images/manageparts.png";
import manageOrdersImage from "./images/manageorders.png";
import dashImage from "./images/dash.png";

export default function Inventory_Menu() {
  return (

    <div className="flex flex-row justify-center items-center">

      
      
      <div className="absolute top-16 left-8">
        <h2 className="ms-20 my-10 mt-20 text-6xl font-extrabold text-white">Inventory</h2>
        </div>



        <div className="absolute center-0 bottom-20">
    <div className="relative inline-flex group mr-10 fire-container">
      <a
        href="/dashboardoverview"
        title="dashboard_overview"
        className="relative inline-flex items-center justify-center px-8 py-12 text-lg font-bold text-white transition-all duration-200 bg-white bg-opacity-5 backdrop-blur-lg font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
      >
        <img src={dashImage} alt="Dashboard Overview" className="mr-2" />
        Dashboard Overview
      </a>
    </div>

    <div className="relative inline-flex group mr-8 fire-container">
      <a
        href="/issueditems"
        title="issued_items"
        className="relative inline-flex items-center justify-center px-8 py-12 text-lg font-bold text-white transition-all duration-200 bg-white bg-opacity-5 backdrop-blur-lg font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        role="button"
      >
        <img src={issuedItemsImage} alt="Issued Items" className="mr-2" />
        Issued Items
      </a>
    </div>

    <div className="relative inline-flex group mr-8 fire-container">
      <a
        href="/manageitems"
        title="managed_parts"
        className="relative inline-flex items-center justify-center px-8 py-12 text-lg font-bold text-white transition-all duration-200 bg-white bg-opacity-5 backdrop-blur-lg font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        role="button"
      >
        <img src={managePartsImage} alt="Manage Parts" className="mr-2" />
        Managed Items
      </a>
    </div>

    <div className="relative inline-flex group mr-8 fire-container">
      <a
        href="/managedorders"
        title="managed_orders"
        className="relative inline-flex items-center justify-center px-8 py-12 text-lg font-bold text-white transition-all duration-200 bg-white bg-opacity-5 backdrop-blur-lg font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        role="button"
      >
        <img src={manageOrdersImage} alt="Manage Orders" className="mr-2" />
        Managed Orders
      </a>
    </div>
  </div>
</div>

/* First row */
/* <div className="absolute center-0 top-60 left-30 right-30">
        <div className="relative inline-flex group mr-10 fire-container">
          <a
            href="/dashboardoverview"
            title="dashboard_overview"
            className="relative inline-flex items-center justify-center px-80 py-10 text-lg font-bold text-white transition-all duration-200 bg-white bg-opacity-5 backdrop-blur-lg font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            role="button"
          >
            <img src={dashImage}  alt="Dashboard Overview" className="mr-15" />
            Dashboard Overview
          </a>
        </div>
      </div> */
   
      
    
  );
}
