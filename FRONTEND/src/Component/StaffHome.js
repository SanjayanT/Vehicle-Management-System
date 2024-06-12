// import React from "react"


// export default function StaffHome() {

//   return (

//     <div class="h-screen w-screen bg-gray flex justify-center items-center flex-wrap">
//       <div class="relative inline-flex group mr-4 fire-container">
//         <a
//           href="/staffdetails"
//           title="ManageEmployee"
//           class="relative inline-flex items-center justify-center px-12 py-6 text-lg font-bold text-white transition-all duration-200 bg-blue-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
//           role="button"
//         >
//           Manage Employee
    
//         </a>
//       </div>

//       <div class="relative inline-flex group mr-4 fire-container">
//         <a
//           href="/employeepayroll"
//           title="Payroll"
//           class="relative inline-flex items-center justify-center px-12 py-6 text-lg font-bold text-white transition-all duration-200 bg-blue-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
//           role="button"
//         >
//           Employee Payroll
          
//         </a>
//       </div>

//       <div class="relative inline-flex group mr-4 fire-container">
//         <a
//           href="/addleaverequest"
//           title="LeaveRequest"
//           class="relative inline-flex items-center justify-center px-12 py-6 text-lg font-bold text-white transition-all duration-200 bg-blue-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
//           role="button"
//         >
//           Leave Request
//         </a>
//       </div>

//       <div class="flex flex-wrap">
//         <div class="relative inline-flex group mr-4 fire-container">
//           <a
//             href="/employeeattendance"
//             title="Attendance"
//             class="relative inline-flex items-center justify-center px-12 py-6 text-lg font-bold text-white transition-all duration-200 bg-blue-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
//             role="button"
//           >
//             Employee Attendance
//           </a>
//         </div>

//         <div class="relative inline-flex group mr-4 fire-container">
//           <a
//             href="/employeeannouncement"
//             title="Announcement"
//             class="relative inline-flex items-center justify-center px-12 py-6 text-lg font-bold text-white transition-all duration-200 bg-blue-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
//             role="button"
//           >
//             Announcement
//           </a>
//         </div>
//       </div>
//     </div>






//   )
// }



import React from "react";

export default function StaffHome() {
  return (
    <div className="h-screen w-screen grid grid-cols-3 gap-2 justify-center items-center mt-[5rem]">

      {/* First Row */}
      <div className="relative inline-flex group mr-2 col-span-3 sm:col-span-1 ml-[15rem]">
        <a
          href="/staffdetails"
          title="ManageEmployee"
          className="block max-w-sm p-6 bg-black border border-black-200 rounded-lg shadow-md hover:bg-black-100 dark:bg-black-800 dark:border-black-700 dark:hover:bg-black-700 opacity-80 transition duration-300
                    ease-in-out transform hover:scale-105 pl-5 pr-5 pt-8 pb-8 text-2xl font-bold tracking-tight text-white whitespace-nowrap"
          role="button"
        >
          Manage Employee
        </a>
      </div>

      <div className="relative inline-flex group col-span-3 sm:col-span-1 ml-[3rem]">
        <a
          href="/employeepayroll"
          title="Payroll"
          className="ms-20 me-5 block max-w-sm p-6 bg-black border border-black-200 rounded-lg shadow-md hover:bg-black-100 dark:bg-black-800 dark:border-black-700 dark:hover:bg-black-700 opacity-80 transition duration-300
          ease-in-out transform hover:scale-105 pl-5 pr-5 pt-8 pb-8 text-2xl font-bold tracking-tight text-white whitespace-nowrap"
          role="button"
        >
          Employee Payroll
        </a>
      </div>

      <div className="relative inline-flex group col-span-3 sm:col-span-1 mr-[15rem]">
        <a
          href="/addleaverequest"
          title="LeaveRequest"
          className="block max-w-sm p-6 bg-black border border-black-200 rounded-lg shadow-md hover:bg-black-100 dark:bg-black-800 dark:border-black-700 dark:hover:bg-black-700 opacity-80 transition duration-300
          ease-in-out transform hover:scale-105 pl-8 pr-8 pt-8 pb-8 text-2xl font-bold tracking-tight text-white whitespace-nowrap"
          role="button"
        >
          Leave Request
        </a>
      </div>

      {/* Second Row */}
      <div className="relative inline-flex group col-span-3 sm:col-span-1 ml-[20rem] mb-[20rem]">
        <a
          href="/employeeattendance"
          title="Attendance"
          className="ms-20 me-5 block max-w-sm p-6 bg-black border border-black-200 rounded-lg shadow-md hover:bg-black-100 dark:bg-black-800 dark:border-black-700 dark:hover:bg-black-700 opacity-80 transition duration-300
          ease-in-out transform hover:scale-105 pl-5 pr-5 pt-8 pb-8 text-2xl font-bold tracking-tight text-white whitespace-nowrap"
          role="button"
        >
          Employee Attendance
        </a>
      </div>

      <div className="relative inline-flex group col-span-3 sm:col-span-1 ml-[15rem] mb-[20rem]">
        <a
          href="/employeeannouncement"
          title="Announcement"
          className="ms-20 me-5 block max-w-sm p-6 bg-black border border-black-200 rounded-lg shadow-md hover:bg-black-100 dark:bg-black-800 dark:border-black-700 dark:hover:bg-black-700 opacity-80 transition duration-300
          ease-in-out transform hover:scale-105 pl-7 pr-7 pt-8 pb-8 text-2xl font-bold tracking-tight text-white whitespace-nowrap"
          role="button"
        >
          Announcement
        </a>
      </div>
    </div>
  );
}
