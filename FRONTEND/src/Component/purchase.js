import React, { useState } from "react";
import emailjs from '@emailjs/browser';
import { useParams } from "react-router-dom";

const EmailForm = () => {

const {email} = useParams()

  const [Enote, setEnote] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceID = 'service_g6euq2p'; 
    const templateID = 'template_lzg189m';
    const userID = '3N9ZnNV-dl-P07cWt'; 

    const templateParams = {
      to_email:email,
      message: Enote, 
    };

    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        console.log('Email sent successfully!', response);
        setEmailSent(true);
      })
      .catch((error) => {
        console.error('Email sent failed:', error);
      });
  };

  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="container bg-gray-200 bg-opacity-70 rounded-lg px-8 py-4 mt-3 mx-5">
        <h2 className="text-3xl font-bold mx-auto text-center">Send Email</h2>
        {emailSent ? (
          <p>Email sent successfully!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="Enote">Recipient Email:</label>
              <textarea
                id="Enote"
                placeholder="Type your inquiry"
                value={Enote}
                onChange={(e) => setEnote(e.target.value)}
                required
                style={{ width: "50%" }} 
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 hover:from-amber-900 hover:via-amber-800 
                   hover:to-amber-700 text-white font-bold py-4 px-5 rounded-lg mr-2 opacity-90 transition duration-300 
                   ease-in-out transform hover:scale-105"
            >
              Send Email
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EmailForm;
