import React, { useState } from "react";
import Header from "../header/Header";
import { useNavigate } from "react-router-dom";

function LoanPlanPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 1,
      title: "1-year",
      billed: "billed within",
      description: "Loanee can return fund within 1 year",
    },
    {
      id: 2,
      title: "6 Month",
      billed: "billed within",
      description: "Loanee can return fund within 6 month",
    },
    {
      id: 3,
      title: "1 Month",
      billed: "billed within",
      description: "Loanee can return fund within 1 month",
    },
  ];
  const navigate =useNavigate()
  return (
    <>
    <Header/>
    <div
      className="relative min-h-screen w-full p-6 lg:p-12 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('images/ba/MacBook Air - 12.jpg')" }}
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="flex justify-between items-center w-full mb-8">
          {/* Left Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-white rounded-full p-2">
              <img
                src="images/Loan-No-Background.png"
                alt="Qard Al-Hasan Logo"
                className="w-8 ml-2"
              />
            </div>
            <div className="bg-[#BCC67A] rounded-full py-1 px-12">
              <p className="font-bold text-gray-800 text-sm">Qard Al-Hasan</p>
              <p className="text-xs text-gray-600">Loans</p>
            </div>
          </div>

          {/* Sundooq Logo */}
          <div className="text-center">
            <img src="images/sund-logo.png" alt="Sundooq Logo" className="w-32" />
          </div>
        </header>

        {/* Main Content */}
        <main className="text-center relative mt-20">
          <h1 className="text-3xl font-bold text-gray-700 mb-4">
            Pack your Amount!
          </h1>

          {/* Amount Selector */}
          <div className="mb-10">
            <select className="w-full md:w-1/2 mx-auto bg-gray-200 border-none text-gray-600 rounded-full px-6 py-3 text-center appearance-none">
              <option>choose your amount.......</option>
              <option value="1000">INR 1,000</option>
              <option value="5000">INR 5,000</option>
              <option value="10000">INR 10,000</option>
              <option value="10000">INR 20,000</option>
              <option value="10000">INR 50,000</option>
              <option value="10000">INR 1,00,000</option>
            </select>
          </div>

        
       

          {/* Plan Selection */}
          <div className="mt-24">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Choose Your Plan For the Return
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`bg-[#BCC67A] p-4 rounded-3xl text-center flex flex-col justify-between cursor-pointer transition-all duration-200 ${
                    selectedPlan === plan.id
                      ? "border-4 border-[#798434] transform -translate-y-1 shadow-lg"
                      : "border-4 border-transparent"
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <div>
                    <p className="text-gray-600 text-sm font-bold mt-12">
                      {plan.billed}
                    </p>
                    <p className="text-4xl font-bold my-8">{plan.title}</p>
                  </div>
                  <div className="bg-[#AAB465] rounded-2xl p-4 mt-4">
                    <p className="text-sm text-gray-700 font-bold text-beige">
                      {plan.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <div className="mt-12">
            <button 
            onClick={()=>navigate('/loan-pay')}
            className="bg-[#798434] text-white text-2xl font-bold px-16 py-3 rounded-2xl shadow-lg hover:bg-green-700 transition-colors">
              Next
            </button>
          </div>

          <div className="mb-12 max-w-3xl mx-auto mt-24">
            <h2 className="text-2xl font-semibold mb-3">
              A Word on Your Amanah (Trust)
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Before you proceed, remember that in Islam, finance is deeply tied
              to faith (iman) and accountability. The hukums (rulings) surrounding
              loans are strict for a reason: to protect our society and our souls.
              While our platform helps you avoid the major sin of Riba (interest),
              the burden of debt remains a profound spiritual responsibility. The
              Prophet Muhammad (peace be upon him) taught us the gravity of
              unsettled debts in the hereafter. Therefore, approach this facility
              not as a simple transaction, but as a sacred trust (amanah). Take it
              with the firmest intention to repay, knowing that your character is
              your collateral and your promise is a covenant before Allah.
            </p>
          </div>
        </main>
        
      </div>
    </div>
    </>
  );
}

export default LoanPlanPage;
