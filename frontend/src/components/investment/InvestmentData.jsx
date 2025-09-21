import React, { useState } from "react";
import Header from "../header/Header";
import { useNavigate } from "react-router-dom";
import {db} from '../../firebase'
import { collection, addDoc } from "firebase/firestore";
import { useUser } from "../../store/UserContext";
function InvestmentData() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [investType, setInvestType] = useState("");
 
  const [showInvestModal, setShowInvestModal] = useState(false);
const {currentUser} = useUser()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!investType) {
        alert("Please select an investment type");
        navigate("/investment");
        return;
      }
  
      // Reference to the "investments" collection in Firestore
      const investmentsCollection = collection(db, "investments");
  
      // Add the form data to Firestore
      const docRef = await addDoc(investmentsCollection, {
        ...form,
        investType,
        company: null, // company will be updated later
        userId: currentUser?.uid,
        timestamp: Date.now(),
      });
  
      // ✅ Navigate with document ID
      navigate(`/select-company/${investType}?id=${docRef.id}`);
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data. Please try again.");
    }
  };
  
  const navigate = useNavigate()

  return (
    <>
      <Header />

      {/* Main Form */}
      <div
        className="relative min-h-screen flex items-center justify-center p-6 bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: "url('/images/ba/MacBook-Air---7.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40 "></div>
        <main className="relative z-10 flex flex-col items-center w-full max-w-lg space-y-8">
          {/* Header Section */}
          <div className="flex items-center space-x-4 w-full">
            <div className="bg-white rounded-full w-20 h-20 flex-shrink-0 flex items-center justify-center shadow-md">
              <img src="/images/sund inv.png" alt="Logo" className="w-10" />
            </div>
            <div className="bg-[#C3C9A6] rounded-full py-4 px-6 flex flex-col justify-center shadow-md w-full">
              <h1 className="text-2xl font-bold text-gray-800">Istithmarat</h1>
              <p className="text-gray-700 text-sm">Investments</p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white/90 backdrop-blur-md w-full p-8 rounded-3xl space-y-5 shadow-xl"
          >
            {/* Name */}
            <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-[#C3C9A6] transition">
              <label htmlFor="name" className="font-medium text-gray-700 w-20">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="bg-transparent focus:outline-none w-full text-gray-800"
                placeholder="Enter your name"
              />
            </div>

            {/* Phone */}
            <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-[#C3C9A6] transition">
              <label htmlFor="phone" className="font-medium text-gray-700 w-20">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="bg-transparent focus:outline-none w-full text-gray-800"
                placeholder="Enter phone number"
              />
            </div>

            {/* Address */}
            <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-[#C3C9A6] transition">
              <label htmlFor="address" className="font-medium text-gray-700 w-20">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="bg-transparent focus:outline-none w-full text-gray-800"
                placeholder="Enter your address"
              />
            </div>

            {/* Select Investment Type */}
            <button
              type="button"
              onClick={() => setShowInvestModal(true)}
              className="w-full border border-[#C3C9A6] text-gray-700 font-medium px-4 py-3 rounded-lg hover:bg-[#C3C9A6]/20 transition"
            >
              {investType ? `Selected: ${investType}` : "Select Investment Type"}
            </button>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#C3C9A6] text-gray-900 font-bold py-3 rounded-lg mt-4 tracking-widest hover:bg-[#b5bf9a] transition-colors"
            >
              NEXT
            </button>
          </form>
        </main>

        {/* Investment Modal */}
        {showInvestModal && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-2xl w-full space-y-6 shadow-xl relative">
              <h2 className="text-2xl font-bold text-gray-800 text-center">
                Select Investment Type
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {["Mutual Funds", "Stocks"].map((type) => (
                  <button
                    key={type}
                    className={`h-40 w-full rounded-2xl flex items-center justify-center text-xl font-bold text-white transition transform hover:scale-105 ${
                      investType === type ? "bg-[#59663f]" : "bg-[#BCC67A]"
                    }`}
                    onClick={() => {
                      setInvestType(type);
                      setShowInvestModal(false);
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <button
                className="absolute top-3 right-3 text-gray-600 text-lg font-bold"
                onClick={() => setShowInvestModal(false)}
              >
                X
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default InvestmentData;
