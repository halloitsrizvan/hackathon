import React from "react";
import Header from "../header/Header";
import { useNavigate } from "react-router-dom";

function ChoosePlanPage() {
    const navigate= useNavigate()
  return (
    <>
    <Header/>
    <div
      className="relative min-h-screen w-full p-6 lg:p-12 bg-cover bg-center bg-no-repeat mt-6"
      style={{ backgroundImage: "url('images/ba/MacBook Air - 20.jpg')" }}
    >
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <header className="flex justify-between items-center w-full mb-8">
          <div className="flex items-center space-x-2">
            <div className="bg-white rounded-full p-2">
              <img src="images/2746077.png" alt="Logo" className="w-8 ml-2" />
            </div>
            <div
              className="bg-[#C3C9A6] rounded-full py-1 px-12"
              style={{ backgroundColor: "#BCC67A" }}
            >
              <p className="font-bold text-gray-800 text-sm">Money savings</p>
              <p className="text-xs text-gray-600"></p>
            </div>
          </div>
          <div className="text-center">
            <img src="images/sund-logo.png" alt="Sundooq Logo" className="w-32" />
          </div>
        </header>

        {/* Main Content */}
        <main className="text-center">
          <h1 className="text-3xl font-bold text-gray-500 mb-10 tracking-wider mt-24">
            Choose Your Plan
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
            {/* Monthly Plan */}
            <div className="bg-[#BCC67A] p-6 rounded-3xl flex flex-col items-center gap-4">
              <div className="bg-[#414A05] text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Best Value
              </div>
              <h2 className="text-5xl font-bold mt-2">Monthly</h2>
              <p className="text-gray-600 font-bold -mt-2">Paid monthly</p>
              <select className="w-36 bg-[#e2ebac] text-gray-600 rounded-full px-1 py-3 text-center">
                <option>Amount</option>
                <option value="1000">INR 1,000</option>
                <option value="5000">INR 5,000</option>
                <option value="10000">INR 10,000</option>
              </select>
            </div>

            {/* Daily Plan */}
            <div className="bg-[#BCC67A] p-10 rounded-3xl flex flex-col items-center gap-4 transform scale-105 shadow-lg">
              <div className="bg-[#414A05] text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
                Most Popular
              </div>
              <h2 className="text-6xl font-bold mt-2">Daily</h2>
              <p className="text-gray-600 font-bold -mt-2">Paid Daily</p>
              <select className="w-36 bg-[#e2ebac] text-gray-600 rounded-full px-1 py-3 text-center">
                <option>Amount</option>
                <option value="500">INR 500</option>
                <option value="1000">INR 1000</option>
                <option value="1500">INR 1500</option>
              </select>
            </div>

            {/* Yearly Plan */}
            <div className="bg-[#BCC67A] p-6 rounded-3xl flex flex-col items-center gap-4">
              <div className="bg-[#414A05] text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Starters
              </div>
              <h2 className="text-5xl font-bold mt-2">Yearly</h2>
              <p className="text-gray-600 font-bold -mt-2">Paid yearly</p>
              <select className="w-36 bg-[#e2ebac] text-gray-600 rounded-full px-1 py-3 text-center">
                <option>Amount</option>
                <option value="10000">INR 10,000</option>
                <option value="50000">INR 50,000</option>
                <option value="100000">INR 100,000</option>
              </select>
            </div>
          </div>
        </main>
      </div>

      {/* Next Button */}
      <div className="flex justify-center mt-16">
        <button
        onClick={()=>navigate('/savings-pay')}
        className="bg-[#798434] text-white font-bold py-3 px-12 rounded-2xl shadow-lg hover:bg-green-700 transition">
          Next
        </button>
      </div>
    </div>
    </>
  );
}

export default ChoosePlanPage;
