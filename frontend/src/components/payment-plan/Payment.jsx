import React, { useState } from "react";
import Header from "../header/Header";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    upi: "",
    cardNumber: "",
    cardHolder: "",
    expiry: "",
    cvv: "",
  });
const navigate =useNavigate()
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (paymentMethod === "upi") {
      if (!formData.upi) newErrors.upi = "UPI ID is required";
    } else {
      if (!formData.cardNumber) newErrors.cardNumber = "Card number is required";
      if (!formData.cardHolder) newErrors.cardHolder = "Card holder name is required";
      if (!formData.expiry) newErrors.expiry = "Expiry date is required";
      if (!formData.cvv) newErrors.cvv = "CVV is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Redirect or handle form submission
      navigate('/thanks')
    }
  };

  return (
    <>
    <Header/>
   
    <div
      className="relative min-h-screen w-full p-6 bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('images/ba/MacBook-Air---7.jpg')" }}
    >
      <div className="bg-[#BCC67A] w-full max-w-md p-8 rounded-xl shadow-lg">
        <h2 className="text-center text-gray-800 text-2xl mb-6 font-semibold">Payment</h2>

        <form onSubmit={handleSubmit} noValidate>
          {/* Payment Method Selector */}
          <div className="flex mb-6 rounded-lg overflow-hidden border border-gray-200">
            <label
              className={`flex-1 text-center py-3 cursor-pointer transition ${
                paymentMethod === "upi" ? "bg-[#5f6630] text-[#efffd5] font-semibold" : "bg-[#efffd5] text-gray-600"
              }`}
            >
              <input
                type="radio"
                name="payment-method"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={handlePaymentMethodChange}
                className="hidden"
              />
              UPI
            </label>

            <label
              className={`flex-1 text-center py-3 cursor-pointer transition ${
                paymentMethod === "card" ? "bg-[#5f6630] text-[#efffd5] font-semibold" : "bg-[#efffd5] text-gray-600"
              }`}
            >
              <input
                type="radio"
                name="payment-method"
                value="card"
                checked={paymentMethod === "card"}
                onChange={handlePaymentMethodChange}
                className="hidden"
              />
              Credit/Debit Card
            </label>
          </div>

          {/* UPI Details */}
          {paymentMethod === "upi" && (
            <div className="mb-6">
              <label htmlFor="upi" className="block mb-2 font-medium text-gray-700">
                UPI ID
              </label>
              <input
                type="text"
                id="upi"
                placeholder="yourname@bank"
                value={formData.upi}
                onChange={handleInputChange}
                className={`w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.upi ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.upi && <p className="text-red-500 text-sm mt-1">{errors.upi}</p>}
            </div>
          )}

          {/* Card Details */}
          {paymentMethod === "card" && (
            <div className="space-y-4">
              <div>
                <label htmlFor="cardNumber" className="block mb-2 font-medium text-gray-700">
                  Card Number
                </label>
                <input
                  type="number"
                  id="cardNumber"
                  placeholder="1234 5678 9876 5432"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    errors.cardNumber ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
              </div>

              <div>
                <label htmlFor="cardHolder" className="block mb-2 font-medium text-gray-700">
                  Card Holder Name
                </label>
                <input
                  type="text"
                  id="cardHolder"
                  placeholder="John Doe"
                  value={formData.cardHolder}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    errors.cardHolder ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.cardHolder && <p className="text-red-500 text-sm mt-1">{errors.cardHolder}</p>}
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label htmlFor="expiry" className="block mb-2 font-medium text-gray-700">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    id="expiry"
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    className={`w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      errors.expiry ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
                </div>

                <div className="flex-1">
                  <label htmlFor="cvv" className="block mb-2 font-medium text-gray-700">
                    CVV
                  </label>
                  <input
                    type="password"
                    id="cvv"
                    placeholder="•••"
                    maxLength={3}
                    value={formData.cvv}
                    onChange={handleInputChange}
                    className={`w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      errors.cvv ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="mt-6 w-full bg-[#699423] text-white font-bold py-3 rounded-lg hover:bg-[#375705] transition-colors"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default Payment;
