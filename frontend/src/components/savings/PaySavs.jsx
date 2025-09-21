import React, { useState } from "react";
import Header from "../header/Header";
import { useNavigate } from "react-router-dom";

function PaySavs() {
  const [paymentMethod, setPaymentMethod] = useState("upi");
const navigate= useNavigate()
  return (
    <>
    <Header/>
    
    <div
      className="relative min-h-screen w-full p-6 bg-cover bg-center bg-no-repeat flex justify-center items-start mt-12"
      style={{ backgroundImage: "url('images/ba/MacBook-Air---7.jpg')" }}
    >
      <div className="bg-[#BCC67A] w-full max-w-md p-8 rounded-2xl shadow-xl">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Savings Payment
        </h2>

        {/* Loan Details */}
        <div className="bg-[#F8F7F0] rounded-xl p-5 mb-6">
          <div className="flex justify-between mb-3 text-gray-700">
            <span>Total Saving Amount</span>
            <span className="font-semibold">₹ 50,000</span>
          </div>
          <div className="flex justify-between mb-3 text-gray-700">
            <span>Plan</span>
            <span className="font-semibold">Monthly</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Per Month</span>
            <span className="font-semibold">₹ 10,000</span>
          </div>
        </div>

        {/* Payment Form */}
        <form id="paymentForm" className="space-y-4">
          {/* Payment Method Toggle */}
          <div className="flex rounded-xl overflow-hidden mb-4">
            <label
              className={`flex-1 text-center py-3 cursor-pointer transition-colors ${
                paymentMethod === "upi"
                  ? "bg-green-700 text-white font-semibold"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setPaymentMethod("upi")}
            >
              UPI
            </label>
            <label
              className={`flex-1 text-center py-3 cursor-pointer transition-colors ${
                paymentMethod === "card"
                  ? "bg-green-700 text-white font-semibold"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setPaymentMethod("card")}
            >
              Credit/Debit Card
            </label>
          </div>

          {/* UPI Details */}
          {paymentMethod === "upi" && (
            <div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold text-gray-700">
                  UPI ID
                </label>
                <input
                  type="text"
                  placeholder="yourname@bank"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <div className="text-red-500 text-sm mt-1 h-4"></div>
              </div>
            </div>
          )}

          {/* Card Details */}
          {paymentMethod === "card" && (
            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9876 5432"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <div className="text-red-500 text-sm mt-1 h-4"></div>
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Card Holder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <div className="text-red-500 text-sm mt-1 h-4"></div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-2 font-semibold text-gray-700">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <div className="text-red-500 text-sm mt-1 h-4"></div>
                </div>
                <div className="flex-1">
                  <label className="block mb-2 font-semibold text-gray-700">
                    CVV
                  </label>
                  <input
                    type="password"
                    placeholder="•••"
                    maxLength={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <div className="text-red-500 text-sm mt-1 h-4"></div>
                </div>
              </div>
            </div>
          )}

          <button
          onClick={()=>navigate('/thanks')}
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-xl font-bold hover:bg-green-800 transition-colors mt-2"
          >
            Credit Now
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default PaySavs;
