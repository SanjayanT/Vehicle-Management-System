import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [totalValue, setTotalValue] = useState(null);
  const [items, setItems] = useState([]);
  const [orderTotalValue, setOrderTotalValue] = useState(null);
  const [issuedTotalValue, setIssuedTotalValue] = useState(null);
  
  useEffect(() => {
    axios.get('http://localhost:8090/dashboard/overview/')
      .then(response => {
        setDashboardData(response.data);
      })
      .catch(error => {
        console.error('Error fetching dashboard data:', error);
      });

    axios.get('http://localhost:8090/dashboard/totalvalue')
      .then(response => {
        setTotalValue(response.data.totalValue);
      })
      .catch(error => {
        console.error('Error fetching total value:', error);
      });

    axios.get('http://localhost:8090/dashboard/ordertotalvalue')
      .then(response => {
        setOrderTotalValue(response.data.OrdertotalValue);
      })
      .catch(error => {
        console.error('Error fetching order total value:', error);
      });

    const getItemsAndAlerts = async () => {
      try {
        const response = await axios.get("http://localhost:8090/manageparts/");
        setItems(response.data);
  
        const total = response.data.reduce((acc, curr) => {
          return acc + (parseInt(curr.price) * parseInt(curr.stocklimit));
        }, 0);
        setTotalValue(total);
  
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    getItemsAndAlerts();

    const getItems = async () => {
      try {
        const response = await axios.get("http://localhost:8090/manageorders/");
        setItems(response.data);
  
        const total = response.data.reduce((acc, curr) => {
          const quantity = parseInt(curr.needquantity);
          if (!isNaN(quantity)) {
            return acc + quantity;
          } else {
            console.error('Invalid quantity:', curr);
            return acc; // Skip invalid data
          }
        }, 0);
        setOrderTotalValue(total);
  
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
  
    getItems();

    const getIssuedItems = async () => {
      try {
        const response = await axios.get("http://localhost:8090/issueditems/");
        setItems(response.data);

        const total = response.data.reduce((acc, curr) => {
          return acc + (parseInt(curr.price) * parseInt(curr.quantity));
        }, 0);
        setIssuedTotalValue(total);
  
      } catch (error) {
        console.error('Error fetching issued items:', error);
      }
    };
  
    getIssuedItems();

  }, []);
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h6 className="text-5xl font-bold mb-4 text-white">Dashboard Overview</h6>

      <br/>
      {dashboardData ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 bg-opacity-75 p-4 rounded-md text-white">
            <h2 className="text-lg font-extrabold mb-20">Total Items</h2>
            <p className="text-xl">{dashboardData.totalParts}</p>
          </div>
          <div className="bg-gray-700 bg-opacity-75 p-4 rounded-md text-white">
            <h2 className="text-lg font-extrabold mb-20">Total Issued Items</h2>
            <p className="text-xl">{dashboardData.totalIssuedItems}</p>
          </div>
          <div className="bg-gray-700 bg-opacity-80 p-4 rounded-md text-white">
            <h2 className="text-lg font-extrabold mb-20">Total Orders</h2>
            <p className="text-xl">{dashboardData.totalOrders}</p>
          </div>
          <div className="bg-gray-700 bg-opacity-75 p-4 rounded-md text-white">
            <h2 className="text-lg font-extrabold mb-20">Total Value of Inventory</h2>
            <p className="text-xl">{totalValue}</p>
          </div>
          <div className="bg-gray-700 bg-opacity-75 p-4 rounded-md text-white">
            <h2 className="text-lg font-extrabold mb-20">Total Issued Value</h2>
            <p className="text-xl">{issuedTotalValue}</p>
          </div>
          <div className="bg-gray-700 bg-opacity-75 p-4 rounded-md text-white">
          <h2 className="text-xl font-extrabold mb-20">Total Order Value Count</h2>

            <p className="text-xl">{orderTotalValue}</p>
          </div>
        
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;


