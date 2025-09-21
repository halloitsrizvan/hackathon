import React from "react";
import Header from "../header/Header";
import { useNavigate } from "react-router-dom";

function PricingPlans() {
  const plans = [
    {
      id: 1,
      title: "1-year",
      subtitle: "billed annually",
      price: "99999",
      tag: "Best Value",
      tagIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      buttonText: "Get the best deal",
      popular: false,
    },
    {
      id: 2,
      title: "3 Months",
      subtitle: "billed quarterly",
      price: "2499",
      tag: "Most Popular",
      tagIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
        </svg>
      ),
      buttonText: "Start subscription",
      popular: true,
    },
    {
      id: 3,
      title: "1 Month",
      subtitle: "billed monthly",
      price: "999",
      tag: "Starters",
      tagIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
      buttonText: "Try for a Month",
      popular: false,
    },
  ];

  const navigate = useNavigate()

  return (
    <>
    <Header/>
    <div
      className="relative min-h-screen w-full p-6 lg:p-12 bg-cover bg-center overflow-x-hidden mt-6"
      style={{ backgroundImage: "url('images/ba/MacBook Air - 24.jpg')" }}
    >
      <main className="relative z-10 flex flex-col items-center w-full max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center w-full mb-8">
          <div className="flex items-center space-x-2">
            <div className="bg-white rounded-full p-2">
              <img
                src="images/sund inv.png"
                alt="Istithmarat Logo"
                className="w-8 ml-2"
              />
            </div>
            <div className="bg-[#BCC67A] rounded-full py-1 px-6">
              <p className="font-bold text-gray-800 text-sm">Istithmarat</p>
              <p className="text-xs text-gray-600">Investments</p>
            </div>
          </div>

          <div className="text-center">
            <img src="images/sund-logo.png" alt="Sundooq Logo" className="w-32" />
          </div>
        </header>

        <h2 className="text-2xl font-bold text-gray-700 mb-10 text-center mt-10">
          Choose Your Plan and Invest the Halal Way
        </h2>

        {/* Pricing Cards */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4 w-full">
          {plans.map((plan) => (
            <div
            onClick={()=>navigate('/payment')}
              key={plan.id}
              className={`plan-card w-full max-w-sm rounded-3xl p-6 flex flex-col text-center items-center shadow-lg transition-transform duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-2xl ${
                plan.popular ? "scale-105 hover:scale-110" : ""
              }`}
              style={{ backgroundColor: "#BCC67A" }}
            >
              <div className="tag text-white font-bold py-1 px-4 rounded-full inline-flex items-center gap-2 mb-4 bg-[#6A7A4C]">
                {plan.tagIcon}
                {plan.tag}
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mt-2">
                {plan.title}
              </h3>
              <p className="text-gray-600 mb-4">{plan.subtitle}</p>

              <div
                className="price-display w-full py-4 rounded-2xl mb-4 flex flex-col items-center"
                style={{ backgroundColor: "#AAB465" }}
              >
                <p className="text-sm text-gray-700">INR</p>
                <p className="text-5xl font-bold text-gray-800">{plan.price}</p>
              </div>

              <button
                className="action-button w-full py-3 rounded-2xl text-gray-800 font-bold bg-[#B4BA9A] hover:bg-[#AAB465] transition-colors"
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
    </>
  );
}

export default PricingPlans;
