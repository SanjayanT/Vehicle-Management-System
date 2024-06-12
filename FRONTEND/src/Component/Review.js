import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Home.css";
import "./Review.js";
import "./Chome.js";

function Review() {
  const [cmail, setCmail] = useState("");
  const [rating, setrating] = useState("");
  const [message, setmessage] = useState("");
  const [showHi, setShowHi] = useState(false); // State for showing animated text

  const navigate = useNavigate();

  function sendreview(e) {
    e.preventDefault();

    // Validation checks
    if (!validateInputs()) {
      return;
    }

    if (!cmail) {
      alert("Please enter your email.");
      return;
    }

    // Check if a rating is selected
    if (!rating) {
      alert("Please select a rating.");
      return;
    }
    // Check if a message is fill
    if (!message) {
      alert("Please give your feedback.");
      return;
    }

    const newReview = {
      cmail,
      rating,
      message,
    };

    axios
      .post("http://localhost:8090/reviewAdd/Review", newReview)
      .then(() => {
        alert("Review Added");
        navigate("/Chome");
      })
      .catch((err) => {
        alert(err);
      });
  }
  // Function to toggle showing "hi" text
  const toggleHi = () => {
    setShowHi(!showHi);
  };
  // Validation function to avoid special characters
  function validateInputs() {
    const specialChars = /[!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (specialChars.test(message)) {
      alert("Please avoid using special characters.");
      return false;
    }

    if (!emailRegex.test(cmail)) {
      alert("Please enter a valid email address.");
      return false;
    }

    return true;
  }

  return (
    <div>
      <form onSubmit={sendreview}>
        <div>
          <h2 className="ms-20 my-10 mt-20 text-5xl font-extrabold text-white">
            Feedback Form
          </h2>
          {/* Animated text box */}
          <div className="absolute top-40 right-72 text=4xl">
            <div
              className={` text-2xl bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 text-white py-2 px-4 rounded-md animate-bounce`}
              onClick={toggleHi}
            >
              <h4 >
                <b>
                  Thank you for your review !!{" "}
                </b>{" "}
              </h4>
              
            </div>
          </div>
          <form className=".w-auto bg-gray-100 p-6 ms-60 my-10 p-4 m-60 border-gray-300 rounded-lg min-h-min bg-opacity-50">
            {/* <h2 className="text-white text-2xl font-bold mb-4">Feedback Form</h2> */}
            <div className="mb-4 text-black">
              <label
                for="email"
                className="block text-sm font-medium text-black my-4"
              >
                Email
              </label>
              <input
                required
                onChange={(e) => {
                  const { value } = e.target;
                  const filteredValue = value.replace(/[^a-zA-Z0-9@.]/g, ""); // Allow only letters, numbers, and '@'
                  setCmail(filteredValue);
                }}
                type="text"
                name="email"
                className="text-black text-black w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                value={cmail}
              />
            </div>

            <div classNames="mb-4">
              <label className="block text-sm font-medium text-black my-4">
                Rating
              </label>
              <div className="text-white flex items-center space-x-2">
                <input
                  required
                  onChange={(e) => setrating(e.target.value)}
                  type="radio"
                  name="rating"
                  id="rating1"
                  value="1"
                  className=" focus:outline-none focus:ring-2 focus:ring-red"
                ></input>
                <label
                  for="rating1"
                  className="block text-sm font-medium text-black my-4"
                >
                  1{" "}
                </label>
                <input
                  required
                  onChange={(e) => setrating(e.target.value)}
                  type="radio"
                  name="rating"
                  id="rating2"
                  value="2"
                  className="focus:outline-none focus:ring-2 focus:ring-red"
                ></input>
                <label
                  for="rating2"
                  className="block text-sm font-medium text-black my-4"
                >
                  2
                </label>
                <input
                  required
                  onChange={(e) => setrating(e.target.value)}
                  type="radio"
                  name="rating"
                  id="rating3"
                  value="3"
                  className="focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></input>
                <label
                  for="rating3"
                  className="block text-sm font-medium text-black my-4"
                >
                  3
                </label>
                <input
                  required
                  onChange={(e) => setrating(e.target.value)}
                  type="radio"
                  name="rating"
                  id="rating4"
                  value="4"
                  class="focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></input>
                <label
                  for="rating4"
                  className="block text-sm font-medium text-black my-4"
                >
                  4
                </label>
                <input
                  required
                  onChange={(e) => setrating(e.target.value)}
                  type="radio"
                  name="rating"
                  id="rating5"
                  value="5"
                  class="text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                ></input>
                <label
                  for="rating5"
                  className="block text-sm font-medium text-black my-4"
                >
                  5
                </label>
              </div>
            </div>
            <div class="mb-4">
              <label
                for="message"
                class="block text-sm font-medium text-black my-4"
              >
                Message
              </label>
              <input
                required
                onKeyPress={(e) => {
                  // Allow only letters, space, and backspace/delete key
                  const validCharacters = /^[a-zA-Z\s\b]+$/; // Adding \s for space, 'i' flag for case-insensitive
                  if (!validCharacters.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => setmessage(e.target.value)}
                id="message"
                placeholder="Message"
                type="text"
                class="text-black text-black w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></input>
            </div>
            <div class="mt-5 mb-5 flex justify-center">
              <button
                type="submit"
                class="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 hover:from-amber-900 hover:via-amber-800 
                                  hover:to-amber-700 text-white font-bold py-3 px-10 rounded-lg mr-2 opacity-90 transition duration-300
                                  ease-in-out transform hover:scale-105"
                value={"Add Review"}
                onClick={sendreview}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </form>
    </div>
  );
}
export default Review;
