import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addAPI, editAPI, getAPI } from "../../../service/api";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .required("Card number is required")
    .matches(/^\d{16}$/, "Card number must be 16 digits"),
  expiryDate: Yup.string()
    .matches(
      /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
      "Invalid expiration date"
    )
    .required("Expiry date is required")
    .test("expiryDate", "Expiry date must be in the future", (value) => {
      if (!value) return false;
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;

      const [inputMonth, inputYear] = value.split("/");
      if (
        parseInt(inputYear, 10) > currentYear ||
        (parseInt(inputYear, 10) === currentYear &&
          parseInt(inputMonth, 10) >= currentMonth)
      ) {
        return true;
      }
      return false;
    }),

  cvc: Yup.string()
    .required("CVC is required")
    .matches(/^\d{3}$/, "CVC must be exactly 3 digits"),
  cardHolderName: Yup.string().required("Card holder name is required"),
});

const CreateUpdateBookingForm = ({
  edit,
  AllData,
  handleClose,
  onGridReady,
}) => {
  const [fetchedData, setFetchedData] = useState(null);
  const [Loading, setLoading] = useState(true);
  const fetchDataFromDatabase = async () => {
    // Simulated fetch data function
    // getAPI("payments")
    // .then((resp) => {
    //   let sample = [];
    //   sample = resp.data;
    //   console.log(sample, "-----------");
    //   setFetchedData(sample[0]);
    //   setLoading(false);
    // })
    // .catch((err) => {
    //   setFetchedData([]);
    // });
  };
  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    const userDataString = JSON.parse(localStorage.getItem("userData")) || "";
    let userID = userDataString._id || "NOID";

    const customerId = userID; // Your customerId value
    console.log(customerId);
    const obj = { ...values, customerId };
    console.log(obj);
    try {
      if (edit) {
        editAPI("payments/" + AllData._id, obj)
          .then((resp) => {
            toast.success("Updated Added!");
            handleClose();
            onGridReady();
          })
          .catch((err) => toast.error(err.error || "somthing went wrong"));
      } else {
        addAPI("payments", obj)
          .then((resp) => {
            toast.success("Successfully Added!");
            handleClose();
            onGridReady();
          })
          .catch((err) => toast.error(err.error || "somthing went wrong"));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("somthing went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full border-gray-300 p-5">
      <Formik
        initialValues={{
          cardNumber: edit ? AllData && AllData.cardNumber : "",
          expiryDate: edit ? AllData && AllData.expiryDate : "",
          cvc: edit ? AllData && AllData.cvc : "",
          cardHolderName: edit ? AllData && AllData.cardHolderName : "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-500"
            style={{ width: "500px" }}
          >
            {/* Card Number Field */}
            <div className="mb-4">
              <label htmlFor="cardNumber" className="block mb-1">
                Card Number
              </label>
              <Field
                type="number"
                id="cardNumber"
                name="cardNumber"
                className="block w-full border rounded-md px-3 py-2"
              />
              <ErrorMessage
                name="cardNumber"
                component="div"
                className="text-red-500"
              />
            </div>
            {/* <div>
              <label htmlFor="expiryDate">Credit Card expiryDate Date:</label>
              <Field
                type="text"
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
              />
              <ErrorMessage
                name="expiryDate"
                component="div"
                style={{ color: "red" }}
              />
            </div> */}
            {/* Expiry Date Field */}
            <div className="mb-4">
              <label htmlFor="expiryDate" className="block mb-1">
                Expiry Date
              </label>
              <Field
                type="text"
                id="expiryDate"
                name="expiryDate"
                className="block w-full border rounded-md px-3 py-2"
                placeholder="MM/YY"
              />
              <ErrorMessage
                name="expiryDate"
                component="div"
                className="text-red-500"
              />
            </div>

            {/* CVC Field */}
            <div className="mb-4">
              <label htmlFor="cvc" className="block mb-1">
                CVC
              </label>
              <Field
                type="text"
                id="cvc"
                name="cvc"
                className="block w-full border rounded-md px-3 py-2"
              />
              <ErrorMessage
                name="cvc"
                component="div"
                className="text-red-500"
              />
            </div>

            {/* Card Holder Name Field */}
            <div className="mb-4">
              <label htmlFor="cardHolderName" className="block mb-1">
                Card Holder Name
              </label>
              <Field
                type="text"
                id="cardHolderName"
                name="cardHolderName"
                className="block w-full border rounded-md px-3 py-2"
              />
              <ErrorMessage
                name="cardHolderName"
                component="div"
                className="text-red-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default CreateUpdateBookingForm;