// packages import
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

// port allocation
const PORT = process.env.PORT || 8090;

app.use(cors());
app.use(bodyParser.json());

// database link variable decleartion
const URL = process.env.MONGODB_URL;
mongoose.connect(URL, {
  //   useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //   useFindAndModify: false
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Connection Success !");
});

// JEEW
const supplierRouter = require("./Routes/jeew/suppliers.js");
app.use("/supplier", supplierRouter);

// HIMA

const JobRouter = require("./Routes/hima/job.js");
app.use("/job", JobRouter);

// DULA
const svcPackagesRouter = require("./Routes/dulanka/packages.js");
app.use("/svc-packages", svcPackagesRouter);

const svcRecordsRouter = require("./Routes/dulanka/servicerecode.js");
app.use("/svc-records", svcRecordsRouter);


//TAVI
const bookingRouter = require("./Routes/tavi/bookings.js");
app.use("/booking", bookingRouter);

const hourSettingRouter = require("./Routes/tavi/businessHours.js");
app.use("/hourSetting", hourSettingRouter);

const holidaySettingRouter = require("./Routes/tavi/holidays.js");
app.use("/holidaySetting", holidaySettingRouter);

// CHIYAN
const customerRouter = require("./Routes/chiyaan/customer.js");
app.use("/customer", customerRouter);

const ReviewRouter = require("./Routes/chiyaan/reviewAdd.js");
app.use("/reviewAdd", ReviewRouter);

// AKEEL
const managepartsRouter=require("./Routes/akeel/manageparts.js");
app.use("/manageparts", managepartsRouter);

const issueditemsRouter=require("./Routes/akeel/issueditems.js");
app.use("/issueditems", issueditemsRouter);

const manageordersRouter=require("./Routes/akeel/manageorders.js");
app.use("/manageorders", manageordersRouter);

const dashboardOverviewRouter = require('./Routes/akeel/dashboardoverview.js'); // Import the new route
app.use('/dashboard', dashboardOverviewRouter); // Use the new route

const emailRouter = require('./Routes/akeel/email.js');
// app.use(express.json());
app.use('/email',emailRouter);


// SHAJEEH
const finacneRouter = require("./Routes/shajeeh/finances.js");
app.use("/finance",finacneRouter);

// SANJU 
const staffRouter = require("./Routes/sanjayan/staffdetails.js");
const payrollRouter = require("./Routes/sanjayan/employeepayroll.js");
const attendanceRouter = require("./Routes/sanjayan/employeeattendance.js");
const leaverequestRouter = require("./Routes/sanjayan/leaverequest.js");
const announcementRouter = require("./Routes/sanjayan/employeeannouncement.js");


app.use("/staffdetails",staffRouter);
app.use("/employeepayroll",payrollRouter);
app.use("/employeeattendance",attendanceRouter);
app.use("/leaverequest",leaverequestRouter);
app.use("/employeeannouncement",announcementRouter);


// server port allocation & server start
app.listen(PORT, () => {
  console.log(`Server is up and running at port: ${PORT}`);
});