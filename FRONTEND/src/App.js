// import Header from "./Components/Header";
import Header from "./Component/Header";
// import Add_Supplier from "./Components/Add_Supplier";
import Add_Supplier from "./Component/Add_Supplier";
// import Delete from "./Components/Delete";
import Delete from "./Component/Delete";
// import Display from "./Components/Display";
import Display from "./Component/Display";
import Update from "./Component/Update";
// import purchase from "./Component/purchase";
import Purchase from "./Component/purchase";

//Jobs
import Create_Job from "./Component/job";
import ViewJobs from "./Component/ViewJobs";
import JobDetails from "./Component/jobDetails";
import UpdateJobs from "./Component/UpdateJobs";
import TrackJobs from "./Component/TrackJobs";

//Customer
import Chome from "./Component/Chome";
import Register from "./Component/Register";
import Review from "./Component/Review";
import Customerlogin from "./Component/Customerlogin";
import Cmanager from "./Component/Cmanager";
import CustomerList from "./Component/CustomerList";
import CustomerReview from "./Component/CustomerReview";
import Updatecustomer from "./Component/Updatecustomer";
//import UpdateProfile from "./Component/UpdateProfile";
import ProfileList from "./Component/ProfileList";
import UpdateCustomersSecond from './Component/UpdateCustomersSecond';



//Booking------------------------------------------------------------------------------------------
import BookingPage from "./Component/BookingPage"; // import Booking Page
import BookingPageCustomerLogin from "./Component/BookingPageCustomerLogin"; // import Booking Customer Login Page
import BookingPageManagerLogin from "./Component/BookingPageManagerLogin"; // import Booking Manager Login Page
import AddBooking from "./Component/AddBooking";
import BookRead from "./Component/BookRead";
import ServiceHistory from "./Component/ServiceHistory";
import AddBusinessHours from "./Component/AddBusinessHours";
import ViewHourSetting from "./Component/ViewHourSetting";
import ViewHolidaysSetting from "./Component/ViewHolidaysSetting";
import AddHolidays from "./Component/AddHolidays";
import EditBookRead from "./Component/EditBookRead";
import EditHourSetting from "./Component/EditHourSetting";
import EditHolidaySetting from "./Component/EditHolidaySetting";
import UpdateHours from "./Component/UpdateHours";
import UpdateHoliday from "./Component/UpdateHoliday";
import UpdateBooking from "./Component/UpdateBooking";

import Home from "./Component/home";

//---------service--------------------------
//-----------Packages-----------------------
//import add package
import Addpkg from "./Component/Add_package";
//import servicehome
import Servicehome from "./Component/servicehome";
//import pkghome
import PkageHome from "./Component/Package_Homepage";
//import view package
import Viewpkg from "./Component/View_package";
import Viewpkg2 from "./Component/View_package2";
//import Edit package
import Pkgedithome from "./Component/Package_edithome";

import Editpkg from "./Component/Edit_package";

//----------Record-------------------------
import Addrec from "./Component/Add_recodes";
import Rechome from "./Component/Recordshome";
import Recview from "./Component/servicerecordview";
import Editrec from "./Component/Edit_record";
import Printrec from "./Component/Service_Recodeviewprint";

//staff
import AddPayroll from "./Component/AddPayroll";
import AddStaff from "./Component/AddStaff";
import AddAttendance from "./Component/AddAttendance";
import AddAnnouncement from "./Component/AddAnnouncement";
import AddLeaveRequest from "./Component/AddLeaveRequest";
import StaffHome from "./Component/StaffHome";
import StaffDetails from "./Component/StaffDetails";
import EditStaff from "./Component/EditStaff";
import EmployeePayroll from "./Component/EmployeePayroll";
import EditPayroll from "./Component/EditPayroll";
import EditAttendance from "./Component/EditAttendance";
import EmployeeAttendance from "./Component/EmployeeAttendance";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import EditLeaveRequest from "./Component/EditLeaveRequest";
import LeaveRequest from "./Component/LeaveRequest";
import EditAnnouncement from "./Component/EditAnnouncement";
import EmployeeAnnouncement from "./Component/EmployeeAnnouncement";
import Staff_Finance_Relation from "./Component/Staff_Finance_Relation";

// inventory
import Inventory_Menu from "./Component/Inventory/Inventory_Menu";
import ManageItems from "./Component/Inventory/ManageItems";
import Additems from "./Component/Inventory/Additems";
import Updateitem from "./Component/Inventory/Updateitem";
import IssuedItems from "./Component/Inventory/Issueditems";
import IssuedItemsAdditems from "./Component/Inventory/issuedAdditems";

import IssuedEditItems from "./Component/Inventory/issuedUpdateitems";
import ManageOrders from "./Component/Inventory/manageorders";

import Addorderitems from "./Component/Inventory/addorders";
import OrderEditItems from "./Component/Inventory/manageorderupdate";
// import Alert from './Component/Inventory/alert';
import Dashboard from "./Component/Inventory/Dashboard";




//Financial

import Transaction from "./Component/Financial/TransactionView";
import AddTransaction from "./Component/Financial/AddTransaction";

import TransactionView from "./Component/Financial/TransactionView";
// import AddTransaction from "./Component/Financial/AddTransaction";
import UpdateTransaction from "./Component/Financial/Update_Transaction";


function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          {/* <Route path="" */}
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add_Supplier />} />
          <Route path="/display" element={<Display />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/purchase/:email" element={<Purchase />} />

          <Route path="/createjob" element={<Create_Job />} />
          <Route path="/viewjobs" element={<ViewJobs />} />
          <Route path="/details/:jobNumber" element={<JobDetails />} />
          <Route path="/updatejobs/:id" element={<UpdateJobs />} />
          <Route path="/trackjobs/:jobNumber" element={<TrackJobs />} />

          {/* <Route path="/update" element={<Update/>}/> */}

          {/* <Route path="/customer" element={<Customerhome/>}/> */}

          {/*----------------------------- Dulanka ---service and record -----------------------------*/}
          <Route path="/addpkg" element={<Addpkg />} />
          <Route path="/servicehome" element={<Servicehome />} />
          <Route path="/PkageHome" element={<PkageHome />} />
          <Route path="/viewpkg2" element={<Viewpkg2 />} />
          <Route path="/viewpkg" element={<Viewpkg />} />
          <Route path="/Pkgedithome" element={<Pkgedithome />} />
          <Route path="/editpkg/:id" element={<Editpkg />} />
          <Route path="/addrec" element={<Addrec />} />
          <Route path="/rechome" element={<Rechome />} />
          <Route path="/recview" element={<Recview />} />
          <Route path="/editrec/:id" element={<Editrec />} />
          <Route path="/printrec" element={<Printrec />} />

          {/*---------Tavini-------------Booking------------------------------*/}
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/bookCusLog" element={<BookingPageCustomerLogin />} />
          <Route path="/bookManageLog" element={<BookingPageManagerLogin />} />
          <Route path="/addBooking" element={<AddBooking />} />
          <Route path="/bookRead" element={<BookRead />} />
          <Route path="/serviceHistory" element={<ServiceHistory />} />
          <Route path="/addHourSetting" element={<AddBusinessHours />} />
          <Route path="/addHolidays" element={<AddHolidays />} />
          <Route path="/viewHourSetting" element={<ViewHourSetting />} />
          <Route path="/viewHolidaysSetting" element={<ViewHolidaysSetting />}/>
          <Route path="/editBookRead" element={<EditBookRead />} />
          <Route path="/editHourSetting" element={<EditHourSetting />} />
          <Route path="/editHolidaySetting" element={<EditHolidaySetting />} />
          <Route path="/updateSetting/:id" element={<UpdateHours/>}/>
          <Route path="/updateHoliday/:id" element={<UpdateHoliday/>}/>
          <Route path="/updateBooking/:id" element={<UpdateBooking/>}/>


          {/* <Route path="/test" element={<Test/>}/> */}

          {/* --------------Chiyaan------------------------------------ */}
          <Route path="/Chome" element={<Chome />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Review" element={<Review />} />
          <Route path="/Customerlogin" element={<Customerlogin />} />
          <Route path="/Cmanager" element={<Cmanager />} />
          <Route path="/CustomerList" element={<CustomerList />} />
          <Route path="/CustomerReview" element={<CustomerReview />} />
          <Route path="/Updatecustomer/:id" element={<Updatecustomer />} />
          <Route path="/ProfileList" element={<ProfileList/>}/>
          <Route path="/UpdateCustomersSecond" element={<UpdateCustomersSecond/>}/>
         

          {/* ----------Sanjayan---------- */}
          <Route path="/addpayroll" element={<AddPayroll />} />
          <Route path="/addstaff" element={<AddStaff />} />
          <Route path="/addleaverequest" element={<AddLeaveRequest />} />
          <Route path="/addattendance" element={<AddAttendance />} />
          <Route path="/addannouncement" element={<AddAnnouncement />} />
          <Route path="/staffhome" element={<StaffHome />} />
          <Route path="/staffdetails" element={<StaffDetails />} />
          <Route path="/editstaff/:id" element={<EditStaff />} />
          <Route path="/employeepayroll" element={<EmployeePayroll />} />
          <Route path="/editpayroll/:id" element={<EditPayroll />} />
          <Route path="/editattendance/:id" element={<EditAttendance />} />
          <Route path="/employeeattendance" element={<EmployeeAttendance />} />
          <Route path="/editleaverequest/:id" element={<EditLeaveRequest />} />
          <Route path="/leaverequest" element={<LeaveRequest />} />
          <Route path="/editannouncement/:id" element={<EditAnnouncement />} />
          <Route path="/employeeannouncement" element={<EmployeeAnnouncement />} />
          <Route path="/stafffinancerelation" element={<Staff_Finance_Relation />} />

          <Route path="/inventory" element={<Inventory_Menu/>}/>
          <Route path="/manageitems" element={<ManageItems/>}/>
          <Route path="/additems" element={<Additems/>}/>
          <Route path="/updateitems/:id" element={<Updateitem/>}/>
          <Route path="/issueditems" element={<IssuedItems/>}/>
          <Route path="/issuedAdditems" element={<IssuedItemsAdditems/>}/>
          <Route path="/issuedupdateitems/:id" element={<IssuedEditItems/>}/>
          <Route path="/managedorders/" element={<ManageOrders/>}/>
          <Route path="/Addorder/" element={<Addorderitems/>}/>
          <Route path="/manageorderupdate/:id" element={<OrderEditItems/>}/>
          {/* <Route path="/alert" element={<Alert/>}/> */}
          <Route path="/dashboardoverview" element={<Dashboard/>}/>

          




          {/* ----------Shajeeh---------- */}
          <Route path="/Finance" element={<TransactionView />} />
          <Route path="/AddTransaction" element={<AddTransaction />} />
          <Route
            path="/Update_Transaction/:id"
            element={<UpdateTransaction />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
