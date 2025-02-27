import React, { useState } from "react";
import { Link } from "react-router-dom";

const MakeBooking = () => {
  // State for form data
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    guestCount: 1,
    status: "pending",
    totalPrice: 0,
    paymentStatus: "pending",

    paymentMethod: "creditCard",
    cardNumber: "",
    expirationDate: "",
    cvc: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add logic to send formData to the backend
  };

  return (
    <div>
      <section className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col items-center w-[600px]">
          <p className="text-[40px] mb-4">Make a Booking</p>
        </div>
        <div className="flex my-10 gap-10">
          <div>
            <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-8 mb-10">
              {/* Contact Information */}
              {/* <div className="border p-4 rounded-md border-black">
                <h3 className="text-xl font-semibold mb-4">
                  Contact Information
                </h3>
                <form>
                  <div className="flex items-center justify-between gap-2">
                    <div className="mb-4">
                      <label className="block text-sm font-medium">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        placeholder="First name"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        placeholder="Last name"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded"
                      placeholder="Phone number"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded"
                      placeholder="Email"
                      required
                    />
                  </div>
                </form>
              </div> */}

              {/* Booking Details */}
              <div className="border p-4 rounded-md border-black">
                <h3 className="text-xl font-semibold mb-4">Booking Details</h3>
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Guest Count
                    </label>
                    <input
                      type="number"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded"
                      min="1"
                      required
                    />
                  </div>
                </form>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-10 border p-4 rounded-md border-black">
              <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
              <form className="grid grid-cols-1 gap-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="creditCard"
                    name="paymentMethod"
                    value="creditCard"
                    checked={formData.paymentMethod === "creditCard"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="creditCard" className="text-sm font-medium">
                    Pay by Card Credit
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="paypal"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === "paypal"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="paypal" className="text-sm font-medium">
                    Paypal
                  </label>
                </div>

                {formData.paymentMethod === "creditCard" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        placeholder="1234 1234 1234 1234"
                        required
                      />
                    </div>
                    <div className="flex gap-4">
                      <div className="w-1/2">
                        <label className="block text-sm font-medium">
                          Expiration Date
                        </label>
                        <input
                          type="text"
                          name="expirationDate"
                          value={formData.expirationDate}
                          onChange={handleChange}
                          className="w-full border border-gray-300 p-2 rounded"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="block text-sm font-medium">CVC</label>
                        <input
                          type="text"
                          name="cvc"
                          value={formData.cvc}
                          onChange={handleChange}
                          className="w-full border border-gray-300 p-2 rounded"
                          placeholder="CVC"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}
              </form>
            </div>

            <div className="text-right w-full my-4">
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full px-6 py-2 bg-black text-white font-semibold rounded"
              >
                <Link to="/complete">Book Now</Link>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MakeBooking;
