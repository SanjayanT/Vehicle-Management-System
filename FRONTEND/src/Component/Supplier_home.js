import React from "react";
import "./Home.css";

export default function Supplier_home(){
    return(
        <div className="text-2xl ">
            <ul>
            
            <div className="text-center"><li><a href="/add"><button>Register supplier</button></a></li></div>
            <li> <a href="/display"><button>Display Supplier</button></a></li>
            <li><a href="/update">  <button>Update Supplier</button></a></li>
            <li><a href="/delete"> <button>Delete Supplier</button></a></li>
            </ul>
            </div>
            
        
    )
}