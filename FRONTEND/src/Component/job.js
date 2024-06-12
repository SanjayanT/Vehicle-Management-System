import React, {useState} from "react";
import axios from "axios";

function CreateJob() {
    const [jobNumber, setjobNumber] = useState("");
    const [jobDate, setjobDate] = useState("");
    const [vehicleType, setvehicleType] = useState("");
    const [RegNo, setregistrationNo] = useState("");
    const [vehicleMake, setvehiclemake] = useState("");
    const [vehicleModel, setvehicleModel] = useState("");
    const [mileage, setmileage] = useState("");
    const [year, setyear] = useState("");
    const [timeIn, settimeIn] = useState("");
    const [dateout, setdateout] = useState("");
    const [timeout, settimeout] = useState("");
    const [name,  setname] = useState("");
    const [contactNumber, setcontactNumber] = useState("");
    const [email, setemail] = useState("");
    const [serviceType, setserviceType] = useState("");
    const [details, setdetails] = useState("");


    function submit(e) {
        e.preventDefault();

        const newJob = {
            jobNumber,
            jobDate,
            vehicleType,
            vehicleMake,
            vehicleModel,
            dateout,
            timeout,
            name,
            contactNumber,
            email,
            RegNo,
            mileage,
            year,
            details,
            serviceType,
            timeIn,
        };

//Job date and date out validation

        const currentDate = new Date();
        const selectedJobdDate = new Date(jobDate);
        const selectedDateOut = new Date(dateout);

        if (selectedJobdDate > currentDate){
          alert("Please enter a valid date for job Date.");
          return;
        }

        if((selectedDateOut > currentDate) || (selectedDateOut < selectedJobdDate)){
          alert("please enter a valid date for date out.");
          return;
        }


// Function to create a new job
        axios.post("http://localhost:8090/job/addJob", newJob)
            .then(() => {
                alert("Job Added");
                window.location.reload(); 
            })
            .catch((err) => {
                alert(err);
            });
    }

 // Checkbox function
    function handleCheckboxChange(e) {
      const value = e.target.value;
      const checked = e.target.checked;

      // Update serviceType state based on checkbox value
      if (checked) {
          setserviceType(prevState => [...prevState, value]); // Add to array
      } else {
          setserviceType(prevState => prevState.filter(item => item !== value)); // Remove from array
      }
    }

    // Generate an array of years from 1900 to the current year
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let year = 1992; year <= currentYear; year++) {
      years.push(year);
    }


  
  return (
    <div className="mx-auto max-w-screen-xl">
            <div className="container bg-gray-200 bg-opacity-70 rounded-lg px-8 py-4 mt-3 mx-5">

              <div className="flex justify-between items-center">
                <h1 className="Heading1 text-center text-4xl flex-grow font-BakBak one font-bold">New job</h1>

                <a href="/viewjobs">
                <button className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 hover:from-amber-900 hover:via-amber-800 
                                  hover:to-amber-700 text-white font-bold py-3 px-5 rounded-lg mr-2 opacity-90 transition duration-300
                                  ease-in-out transform hover:scale-105">View Jobs</button>
                </a>

              </div> <br />

                <form className="form1 text-lg text-gray-950 ">
                  
              {/*------ Line 01 starts------ */}

              <div className="space-y-2 flex justify-between grid grid-cols-3 gap-4">
                  <div className="">  
                    <label className = "mr-11">Job Number :</label>
                    <input
                        type="text"
                        placeholder=" ex : J12345"
                        value={jobNumber}

                        //Job number validation
                        onKeyDown={(e) => {
                          const key = e.key;
                          const isBackspace = key === 'Backspace';
                          const isDigit = /\d/.test(key);
                          const isJ = key === 'J';
                          const length = e.target.value.length;
                  
                          // Determine if key press is valid
                          const isValid =
                            isBackspace ||
                            (length === 0 && isJ) || // First character must be 'J'
                            (length > 0 && length < 6 && isDigit); // Remaining must be digits with total length < 6
                  
                          if (!isValid) {
                            e.preventDefault(); // Prevent invalid input
                          }
                        }}
                        onChange={(e) => {
                          const newValue = e.target.value;
                  
                          // Ensure full pattern is correct to allow for backspace
                          if (/^J\d{0,5}$/.test(newValue)) { // Valid pattern is J followed by up to 5 digits
                            setjobNumber(newValue); // Only set valid values
                          }
                        }}
                        maxLength={6} // Ensure length doesn't exceed pattern constraint
                        className="rounded-md w-60 h-10 opacity-80 text-base mt-2"
                        required
                      />
                  </div>

                  <div className="">
                    <label className="mr-11">Job Date :</label>
                    <input type="date" onChange={(e) => setjobDate(e.target.value)} className="rounded-md w-60 h-10 opacity-80 text-base" required/>
                  </div>

                  <div className="">
                    <label className="mr-7">Vehicle Type :</label>
                    <select id="vehicle" onChange={(e) => setvehicleType(e.target.value)} className="rounded-md w-60 h-10 opacity-80 text-base mb-1" required>
                        <option value="" />
                        <option value="car">Car</option>
                        <option value="Van">Van</option>
                        <option value="SUV">SUV</option>
                        <option value="Bus">Bus</option>
                        <option value="Bike">Motorcycle</option>

                    </select>
                  </div>
                </div>
                {/* -------Line 01 ends------ */}

                
                <h2 className="Heading2 font-bold text-xl mb-3 mt-2">Vehicle Details</h2>

                {/*------ Line 02 starts-------*/}

                <div className="space-y-2 flex justify-between grid grid-cols-3 gap-4">
                  <div className=""> 
                    <label className="mr-4">Vehicle Reg. No :</label>
                    <input type="text"
                            value={RegNo}
                            onKeyDown={(e) => {
                              const key = e.key;
                              const isBackspace = key === 'Backspace';
                              const isHyphen = key === '-';
                              const isLetter = /^[a-zA-Z]$/.test(key);
                              const isDigit = /^[0-9]$/.test(key);

                              // Allow backspace, hyphen, letters, and digits
                              const isValid = isBackspace || isHyphen || isLetter || isDigit;

                              if (!isValid) {
                                e.preventDefault(); // Prevent invalid keystrokes
                              }
                            }}
                            onChange={(e) => {
                              const RegNo = e.target.value;

                              // Allow only letters, digits, and hyphens in the state
                              if (/^[a-zA-Z0-9-]*$/.test(RegNo)) {
                                setregistrationNo(RegNo); 
                              }
                            }}
                            className="rounded-md w-60 h-10 opacity-80 text-base mt-2" required/>
                  </div> 

                  <div>
                  <label className="mr-2">Vehicle Make :</label>
                    <select id="vehiclemake" onChange={(e) => setvehiclemake(e.target.value)} className="rounded-md w-60 h-10 opacity-80 text-base" required>
                        <option value="" /> 
                        <option value="Toyota">Toyota</option>
                        <option value="Honda">Honda</option>
                        <option value="Ford">Ford</option>
                        <option value="Mercedes-Benz">Mercedes-Benz</option>
                        <option value="BMW">BMW</option>
                        <option value="Nissan">Nissan</option>
                        <option value="Mazda">Mazda</option>     
                        <option value="Hyundai">Hyundai</option>                   
                        <option value="Kia">Kia</option>
                        <option value="MG">MG</option>
                        <option value="Audi">Audi</option>
                        <option value="Suzuki">Suzuki</option>
                        <option value="Mitsubishi">Mitsubishi</option>

                    </select>
                    </div>

                  <div>
                    <label className="mr-4">Vehicle Model :</label>
                    <input type="text"
                            value={vehicleModel}
                            onKeyDown={(e) => {
                              const key = e.key;
                              const isBackspace = key === 'Backspace';
                              const isHyphen = key === '-';
                              const isLetter = /^[a-zA-Z]$/.test(key);
                              const isDigit = /^[0-9]$/.test(key);

                              // Allow backspace, hyphen, letters, and digits
                              const isValid = isBackspace || isHyphen || isLetter || isDigit;

                              if (!isValid) {
                                e.preventDefault(); // Prevent invalid keystrokes
                              }
                            }}
                            onChange={(e) => {
                              const vehicleModel = e.target.value;

                              // Allow only letters, digits, and hyphens in the state
                              if (/^[a-zA-Z0-9-]*$/.test(vehicleModel)) {
                                setvehicleModel(vehicleModel); 
                              }
                            }}
                            className="rounded-md w-60 h-10 opacity-80 text-base mt-2" required/>

                  </div>  
                 </div> 

                 {/* ---------Line 02 ends----------  */}

                 {/* ----------Line 03 starts---------*/}

                 <div className="space-y-2 flex justify-between grid grid-cols-3 gap-4">
                  <div className=""> 
                    <label className="mr-14">Mileage :</label>
                    <input type="text"
                            value={mileage}
                            onKeyDown={(e) => {
                              const key = e.key;
                              const isBackspace = key === 'Backspace';
                              const isDigit = /^[0-9]$/.test(key);

                              // Allow backspace and digits (0-9)
                              const isValid = isBackspace || isDigit;

                              if (!isValid) {
                                e.preventDefault(); 
                              }
                            }}
                            onChange={(e) => {
                              const mileage = e.target.value;

                              // Ensure the value contains only digits
                              if (/^[0-9]*$/.test(mileage)) { // Allow only numbers
                                setmileage(mileage); 
                              }
                            }}
                            className="rounded-md w-60 h-10 opacity-80 text-base mt-2 ml-5" required />
                  </div>

                  <div>
                    <label className="mr-11">Year :</label>
                    <select id="year" onChange={(e) => setyear(e.target.value)} className="rounded-md w-60 h-10 opacity-80 mt-3 ml-9" required>
                      <option value="">   </option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    </div>

                  <div>
                    <label className="mr-11">Time In :</label>
                    <input type="time" onChange={(e) => settimeIn(e.target.value)} className="rounded-md w-60 h-10 opacity-80  mt-3 ml-6" required/> 
                  </div>
                  </div>
                  {/* -------Line 03 ends------- */}

                  {/* ------Line 04 starts------- */}

                  <div className="space-y-2 flex justify-between grid grid-cols-3 gap-4 mb-4">
                    <div>
                    <label className="mr-11">Date Out :</label>
                    <input type="date" onChange={(e) => setdateout(e.target.value)} className="rounded-md w-60 h-10 opacity-80 mt-3 ml-5 text-base"/> 
                    </div>

                    <div>
                    <label className="mr-10">Time Out :</label>
                    <input type="time" onChange={(e) => settimeout(e.target.value)} className="rounded-md w-60 h-10 opacity-80  mt-3"/> 
                    </div>   
                  </div>
                  
                  {/* -------Line 04 ends------- */}

                  <h2 className="Heading2 font-bold text-xl mb-5 mt-3">Customer Details </h2>

                  {/* ------Line 05 starts------- */}

                  <div className="space-y-2 flex justify-between grid grid-cols-3 gap-4">
                   <div className="">
                    <label className="mr-11">Name :</label>
                    <input type="text"
                          value={name}
                          onKeyDown={(e) => {
                            const key = e.key;
                            const isBackspace = key === 'Backspace';
                            const isLetter = /^[a-zA-Z ]$/.test(key);

                            // Allow backspace and letters
                            const isValid = isBackspace || isLetter;

                            if (!isValid) {
                              e.preventDefault(); // Prevent invalid keystrokes
                            }
                          }}
                          onChange={(e) => {
                            const cname = e.target.value;

                            // Ensure the value contains only letters
                            if (/^[a-zA-Z ]*$/.test(cname)) {
                              setname(cname); 
                            }
                          }}
                          className="rounded-md w-60 h-10 opacity-80 text-base mt-2 ml-11" required />
  
                   </div>
             
                   <div>
                    <label className="mr-4">Contact No. :</label>
                    <input type="text"
                            placeholder=" ex : 0711234567"
                            value={contactNumber}
                            onKeyDown={(e) => {
                              const key = e.key;
                              const isBackspace = key === 'Backspace';
                              const isDigit = /^[0-9]$/.test(key);

                              // Allow backspace and digits (0-9)
                              const isValid = isBackspace || isDigit;

                              if (!isValid) {
                                e.preventDefault(); // Prevent invalid keystrokes
                              }
                            }}
                            onChange={(e) => {
                              const contactNumber = e.target.value;

                              // Ensure the value contains only digits
                              if (/^[0-9]*$/.test(contactNumber)) { // Allow only numbers
                                setcontactNumber(contactNumber); 
                              }
                            }}
                            minLength={10}
                            maxLength={10}
                            className="rounded-md w-60 h-10 opacity-80 text-base mt-2"
                            required
                          />
  
                   </div> 

                   <div>
                    <label className="mr-11">E-mail :</label>
                    <input type="text"
                            placeholder=" ex : sample123@gmail.com"
                            value={email}
                            onKeyDown={(e) => {
                              const key = e.key;
                              const isBackspace = key === 'Backspace';
                              const isEmailCharacter = /^[a-zA-Z0-9._+@-]$/.test(key);
                              
                              if (!isBackspace && !isEmailCharacter) {
                                e.preventDefault(); 
                              }
                            }}
                            onChange={(e) => {
                              const newValue = e.target.value;
                      
                              // Allow intermediate steps for typing
                              const validInput = /^[a-zA-Z0-9._%+-@]*$/.test(newValue);
                              
                              if (validInput) {
                                setemail(newValue); 
                              }
                            }}
                            className="rounded-md w-60 h-10 opacity-80 text-base mt-2" required />

                   </div>
                  </div>
                  {/* --------Line 05 ends------- */}

                  <h3 className="Heading3 font-bold text-lg mb-3 mt-2">Service Type :</h3> 

                   {/* --------Checkbox-Line 01 starts------- */}

                   <div className="space-y-2 flex justify-between grid grid-cols-3 gap-4 ">
                    <div>
                    <input type="checkbox" value="Body wash" onChange={handleCheckboxChange} className="mr-4  w-5 h-5" /> 
                    <label className="lg">Body Wash</label> 
                    </div>

                    <div>
                    <input type="checkbox"  value="Under wash" onChange={handleCheckboxChange} className="mr-4 w-5 h-5"/> 
                    <label>Under Wash</label> 
                    </div>

                    <div>
                    <input type="checkbox" value="Engine wash" onChange={handleCheckboxChange} className="mr-4 w-5 h-5"/> 
                    <label>Engine Wash</label> 
                    </div>
                   </div> 

                   {/* --------Line 02 starts------- */}
                  <div className="space-y-2 flex justify-between grid grid-cols-3 gap-4 ">
                    <div>
                    <input type="checkbox" value="Engine cleanup" onChange={handleCheckboxChange} className="mr-4 w-5 h-5"/> 
                    <label>Engine Cleanup</label> 
                    </div>

                    <div>
                    <input type="checkbox" value="Interior cleaning" onChange={handleCheckboxChange} className="mr-4 w-5 h-5"/> 
                    <label>Interior Cleaning</label> 
                    </div>

                    <div>
                    <input type="checkbox" value="Vaccuming" onChange={handleCheckboxChange} className="mr-4 w-5 h-5"/> 
                    <label>Vacuuming</label> 
                    </div>
                   </div>

                  {/* --------Line 02 ends------- */}

                  {/* --------Line 03 starts------- */}
                  <div className="space-y-2 flex justify-between grid grid-cols-3 gap-4">
                    <div>
                    <input type="checkbox" value="Under oiling" onChange={handleCheckboxChange} className="mr-4 w-5 h-5" /> 
                    <label>Under Oiling</label> 
                    </div>

                    <div>
                    <input type="checkbox" value="Oil changing" onChange={handleCheckboxChange} className="mr-4 w-5 h-5"/> 
                    <label>Oil Changing</label> 
                    </div>

                    <div>
                    <input type="checkbox"  value="Greasing" onChange={handleCheckboxChange} className="mr-4 w-5 h-5"/> 
                    <label>Greasing</label> 
                    </div>
                   </div> 

                   {/* --------Line 04 starts------- */}
                   <div className="space-y-2 flex justify-between grid grid-cols-3 gap-4 ">
                    <div>
                    <input type="checkbox" value="Filter replacement" onChange={handleCheckboxChange} className="mr-4 w-5 h-5"/> 
                    <label>Filter Replacement</label> 
                    </div>

                    <div>
                    <input type="checkbox" value="Waxing" onChange={handleCheckboxChange} className="mr-4 w-5 h-5"/> 
                    <label>Waxing</label> 
                    </div>

                    <div>
                    <input type="checkbox" value="Cut & polish" onChange={handleCheckboxChange} className="mr-4 w-5 h-5"/> 
                    <label>Cut & Polish</label> 
                    </div>
                   </div>
                  {/* --------Line 04 ends------- */}

                  {/* --------Line 05 starts------- */}
                  <div className="space-y-2 flex justify-between grid grid-cols-3 gap-4">
                    <div>
                    <input type="checkbox" value="Engine repair" onChange={handleCheckboxChange} className="mr-4  w-5 h-5" /> 
                    <label>Engine Repairs </label> 
                    </div>

                    <div> 
                    <input type="checkbox" value="Brake replacement" onChange={handleCheckboxChange} className="mr-4 w-5 h-5"/> 
                    <label>Brake Replacements</label> 
                    </div>

                    <div>
                    <input type="checkbox" value="Electrical system repair" onChange={handleCheckboxChange} className="mr-4 w-5 h-5"/> 
                    <label>Electrical System Repairs</label> 
                  </div>
                  </div>

                   {/* --------Line 06 starts------- */}
                  <div className="space-y-2 flex justify-between grid grid-cols-3 gap-4 ">
                    <div>
                    <input type="checkbox" value="Tire balancing" onChange={handleCheckboxChange} className="mr-4 w-5 h-5"/> 
                    <label>Tire Balancing</label> 
                    </div>

                    <div>
                    <input type="checkbox" value={"Wheel alignment"} onChange={handleCheckboxChange} className="mr-4 w-5 h-5"/> 
                    <label>Wheel Alignments</label> 
                    </div>

                    <div>
                    <input type="checkbox" value="Tire replacement" onChange={handleCheckboxChange} className="mr-4 w-5 h-5"/> 
                    <label>Tire Replacement</label> 
                    </div>
                   </div>
                   
                   {/* --------Line 06 ends------- */}

                   <h2 className="Heading2 font-bold text-xl mb-3">Additional Details</h2>

                   {/* --------Line 07 starts------- */}

                  <div className="textarea mb-2">
                   <textarea onChange={(e) => setdetails(e.target.value)} className="rounded-md w-full rows-10 py-2 px-6 opacity-80 text-base overflow-x-hidden max-w-full overflow-x-auto" />
                  </div>

                    {/* --------Line 07 ends------- */}
                  
                  <div className="button text-center mt-4" type="submit" value={"Add jobs"} onClick={submit}>
                  <button className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 hover:from-amber-900 hover:via-amber-800 
                                     hover:to-amber-700 text-white font-bold py-4 px-5 rounded-lg mr-2 opacity-90 transition duration-300 
                                     ease-in-out transform hover:scale-105">Save details</button>
                  </div>  






            
                </form>
            </div>
        </div>
  );
}

export default CreateJob;
