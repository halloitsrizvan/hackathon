import React from "react";
import Header from "../header/Header";

function Companies() {
  return (
    <>
    <Header/>
    <div
      className="relative min-h-screen w-full p-6 bg-cover bg-no-repeat bg-center "
      style={{ backgroundImage: "url('/images/ba/MacBook Air - 11.jpg')" }}
    >
      {/* Main Content Container */}
      <main className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center w-full mb-8">
          {/* Istithmarat Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-white rounded-full p-2">
              <img
                src="/images/sund inv.png"
                alt="Logo"
                style={{ width: "30px", marginLeft: "10px" }}
              />
            </div>
            <div
              className="bg-[#C3C9A6] rounded-full py-1 p-12"
              style={{ backgroundColor: "#BCC67A" }}
            >
              <p className="font-bold text-gray-800 text-sm">Istithmarat</p>
              <p className="text-xs text-gray-600">Investments</p>
            </div>
          </div>
          {/* Sundooq Logo */}
          <div className="text-center">
            <img
              src="/images/sund-logo.png"
              alt="Sundooq Logo"
              style={{ width: "125px" }}
            />
          </div>
        </header>

        {/* Title */}
        <h2
          className="text-xl font-bold mb-8"
          style={{
            color: "#849267",
            fontWeight: 800,
            opacity: 0.2,
            fontSize: "150%",
          }}
        >
          Select Your Companies
        </h2>

        {/* Scrollable Sections */}
        <div className="w-full">
          <div className="scroll-container h-70 overflow-y-auto pr-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {Array.from({ length: 12 }).map((_, index) => (
                <button
                  key={index}
                  className="company-button h-36 rounded-2xl"
                  style={{ backgroundColor: "#BCC67A" }}
                ></button>
              ))}
            </div>
          </div>
        </div>

        {/* Next Button */}
        <button
          className="next-button text-white py-3 px-12 rounded-full shadow-lg mt-8 mb-6"
          style={{
            marginLeft: "365px",
            backgroundColor: "#53983A",
            fontFamily: "monospace",
            fontWeight: 600,
          }}
        >
          Next
        </button>
      </main>
    </div>
    </>
  );
}

export default Companies;
