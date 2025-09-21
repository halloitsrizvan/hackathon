import React from "react";
import { useNavigate } from "react-router-dom";

function ThankSav() {
    const navigate=useNavigate()
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: "url('images/ba/MacBook Air - 1.jpg')" }}
    >
      {/* Header (fixed at top) */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 bg-transparent z-20">
        {/* Left Logo */}
        <div className="flex items-center space-x-2 ml-[150px]">
          <div className="bg-white rounded-full p-2">
            <img
              src="/images/2746077.png"
              alt="Istithmarat Logo"
              className="w-8 ml-2"
            />
          </div>
          <div className="bg-[#BCC67A] rounded-full py-1 px-12">
            <p className="font-bold text-gray-800 text-sm">Savings</p>
          
          </div>
        </div>

        {/* Right Logo */}
        <div className="p-2 mr-[200px]">
          <img
            src="images/sund-logo.png"
            alt="Sundooq Logo"
            className="h-14"
          />
        </div>
      </header>

      {/* Centered Content */}
      <main className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-5xl md:text-6xl font-playfair font-bold text-gray-800 mb-8">
          Thank you!
        </h1>

        <button className="bg-[#53983A] text-white text-lg font-semibold px-10 py-3 rounded-full shadow-lg hover:bg-green-700 transition"
        onClick={()=>navigate('/sundooq')}>
          Back to Home
        </button>
      </main>
    </div>
  );
}

export default ThankSav;
