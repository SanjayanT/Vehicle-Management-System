import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// import "./Res.css";
export default function Update(){
 

    const [name, setName] = useState(''); 
    const [contact, setContact] = useState("");
    const [contact_2, setContact_2] = useState(""); 
    const [Email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [Website, setWeb] = useState("");
    const [Additional_note, setAdditional_notes] = useState("");
    const [Main_supplies, setMainSupplies] = useState("");
    const { id } = useParams();
   console.log(id);

  
    function submit(e) {
      e.preventDefault();
  
      const editSupplier = {
       
        name,
        contact,
        contact_2, 
        Email,
        address,
        Website,
        Additional_note,
        Main_supplies
      };
      
  //Email validation
  const isValidEmail = /\S+@\S+\.|S+/.test(Email);

  if(!isValidEmail) {
    alert("Please enter a valid email address.");
    return;
  }

  //contact validation
  const isvalidcontact = /^[\d]{10}$/.test(contact);

  if(!isvalidcontact){
    alert("please enter a valid contact number");
    return;
  }

  //contact 2 validation
  const isvalidcontact_2 = /^[\d]{10}$/.test(contact_2);

  if(!isvalidcontact_2){
    alert("please enter a valid 2nd contact number");
    return;
  }

      axios
        .put(`http://localhost:8090/supplier/update/${id}`, editSupplier)
        .then(() => {
          alert("Supplier updated");
          window.location.href = "/display";
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    useEffect(() => {
      axios.get(`http://localhost:8090/supplier/get/${id}`)
        .then((res) => {
        
          setName(res.data.supplier.name);

          setContact(res.data.supplier.contact);
          setContact_2(res.data.supplier.contact_2);
          setEmail(res.data.supplier.Email);
          setAddress(res.data.supplier.address);
          setWeb(res.data.supplier.Website);
          setAdditional_notes(res.data.supplier.Additional_note);
          setMainSupplies(res.data.supplier.Main_supplies);
        console.log(res.data.supplier.name);
        })
        .catch((err) => {
          alert(err.message);
        });
    }, []);
   
    
    return(
        <div>
        <div className="container bg-gray-200 bg-opacity-70 rounded-lg px-8 py-4 max-w-6xl mx-auto mt-3 mx-5">
           <div className="flex justify-between items-center">
            <h1 className="Heading1 text-center text-3xl flex-grow font-BakBak one font-bold mb-10">Update Supplier</h1>
            
            <a href="/display"><button className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 hover:from-amber-900 hover:via-amber-800 
                                     hover:to-amber-700 text-white float-right mx-auto font-bold py-4 px-5 rounded-lg mr-2 opacity-90 transition duration-300 
                                     ease-in-out transform hover:scale-105">Display</button></a>
            </div>                         

                <form onSubmit={submit} className="form1 text-xl text-gray-950 ">

                <div className="space-y-2 flex justify-between grid grid-cols-2 gap-4 ">
                <div className="mt-5">
                    <label className="mr-9">Supplier Name    :</label>
                    <input type="text" onKeyDown={(e) => {
                        const key = e.key;
                        const isBackspace = key === "Backspace";
                        const isValidInput = /^[a-zA-Z]*$/.test(key) || isBackspace; // Allow Backspace or alphanumeric characters
                        if (!isValidInput) {
                          e.preventDefault(); // Prevent the input of the special character
                        }
                      }}
                      onChange={(e) => setName(e.target.value)} 
                      className="rounded-md w-60 h-10 opacity-80 text-base mt-2" 
                      required
                    />
                </div>

                <div>
                    <label className="mr-10">Contact  :</label>
                    <input className="rounded-md w-72 h-10 opacity-80" type="text" value={contact} onChange={(e) => setContact(e.target.value)} required />
                </div>
                </div>   
                 
                <div className="space-y-2 flex justify-between grid grid-cols-2 gap-4 ">   
                    <div className="mt-5">
                    <label className="mr-20">Contact 2    :</label>
                    <input className="rounded-md w-72 h-10 opacity-80" type="text" value={contact_2} onChange={(e) => setContact_2(e.target.value)} />
                    </div>

                    <div>
                    <label className="mr-14">E mail   :</label>
                    <input className="rounded-md w-72 h-10 opacity-80" type="text" value={Email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>


                
                <div className="space-y-2 flex justify-between grid grid-cols-2 gap-4 ">
                    <div className="mt-5">
                    <label className="mr-20">Address  :</label>
                    <input className="rounded-md ml-4 w-72 h-10 opacity-80" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div>
                    <label className="mr-8">Web Site :</label>
                    <input className="rounded-md w-72 h-10 opacity-80" type="text" value={Website} onChange={(e) => setWeb(e.target.value)} />
                    </div>
                        
                    
                    </div>
                    <div className="flex flex-wrap justify-between items-center space-x-2 py-2">
                        <div className="flex flex-col mt-5">
                    <label className="mr-11">Additional Notes :</label>
                    <textarea 
                     className="mt-1 rounded-md border opacity-80 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    rows="4" value={Additional_note}
                    cols="50"
                     onChange={(e) => setAdditional_notes(e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                            <label className="mr-11">Main Supplies    :</label>
                            <textarea 
                                className="mt-1 rounded-md rounded-md opacity-80 border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                rows="4"
                                value={Main_supplies}
                                cols="50"
                                onChange={(e) => setMainSupplies(e.target.value)}
                            />
                        </div>
                    </div>
                   <div className="flex justify-center mt-16">
                   <button className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 hover:from-amber-900 hover:via-amber-800 
                                     hover:to-amber-700 text-white font-bold py-4 px-5 rounded-lg mr-2 opacity-90 transition duration-300 
                                     ease-in-out transform hover:scale-105" type="submit" onClick={submit} >Update Supplier</button>
                                     </div>

                </form>

                

        </div>
        </div>
    
    )
};
