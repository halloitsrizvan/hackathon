import React from 'react'
import './UserPage.css'
import Header from '../header/Header'
import { useNavigate } from 'react-router-dom'

function UserPage() {
  const navigate= useNavigate()
  return (
    <>
    <Header/>
    
    <div
      className="UserPage relative min-h-screen flex items-center justify-center p-4 bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: "url('/images/ba/MacBook-Air---6.jpg')" }}
    >
      {/* Main Content Container */}
      <main className="relative z-10 flex flex-col items-center space-y-8 w-full max-w-2xl">
        {/* Top Title Button */}
        <div>
          <h2 style={{ color: "#f6ffd0", fontSize: "200%", fontWeight: "800" }}>
            Select your Button
          </h2>
        </div>

        {/* Main Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
       
        >
          {/* Istithmarat (Investments) Button */}
          <button
          
            className="main-card-button p-8 rounded-2xl flex flex-col items-center text-center space-y-4 shadow-lg"
            style={{ backgroundColor: "#dee7b4" }}
            onClick={()=>navigate('/investment')}
          >
            <div className="icon-container">
              {/* Investment Icon */}
              <img src="/images/sund inv.png" style={{ width: "50px" }} alt="Investment Icon" />
            </div>
            <div className="text-content">
              <h2 className="text-2xl font-bold text-gray-800">Istithmarat</h2>
              <p className="text-gray-600">Investments</p>
            </div>
          </button>

          {/* Qard Al-Hassan (Loan) Button */}
          <button
            className="main-card-button p-8 rounded-2xl flex flex-col items-center text-center space-y-4 shadow-lg"
            style={{ backgroundColor: "#dee7b4" }}
            onClick={()=>navigate('/loan')}
          >
            <div className="icon-container">
              {/* Loan Icon */}
              <img src="/images/Loan-No-Background.png" style={{ width: "50px" }} alt="Loan Icon" />
            </div>
            <div className="text-content">
              <h2 className="text-2xl font-bold text-gray-800">Qard Al-Hassan</h2>
              <p className="text-gray-600">Loan</p>
            </div>
          </button>
        </div>

        {/* Money Savings Button */}
        <button
        onClick={()=>navigate('/savings')}
          className="main-card-button p-2 w-80 rounded-2xl flex flex-col items-center text-center space-y-2 shadow-lg text-gray-800 font-bold py-4 px-12 shadow-md"
          style={{ marginTop: "15px" }}
        >
          {/* Piggy Bank Icon */}
          <img src="/images/2746077.png" style={{ width: "35px" }} alt="Savings Icon" />
          <span className="text-2xl font-bold text-gray-800">Money Savings</span>
        </button>
      </main>
    </div>
    </>
  )
}

export default UserPage
