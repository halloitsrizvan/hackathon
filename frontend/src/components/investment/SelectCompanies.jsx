import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import {db  } from "../../firebase"; // Import your Firebase Firestore config
import { useUser } from "../../store/UserContext"; // Assuming you have a UserContext for currentUser
import Header from "../header/Header";

function SelectCompanies() {
    const { type } = useParams();
    const navigate = useNavigate();
    const location = useLocation
    const searchParams = new URLSearchParams(location.search);
    const investmentId = searchParams.get("id"); // ✅ get document ID from URL
  const [test,setTest] = useState()
    const [selected, setSelected] = useState([]);
  
    const handleSave = async () => {
     
    
      try {
        const docRef = doc(db, "investments", investmentId);
        await updateDoc(docRef, {
          company: selected.name,
          companyId: selected.id,
          companyImg: selected.img,
        });
    
        alert("Company saved successfully!");
        navigate("/plans");
      } catch (error) {
        console.error("Error updating company:", error);
        navigate("/plans");
        
      }
    };
 

  // List of company images
  const companies = [
    { id: 1,name:"a", img: "https://i.pinimg.com/736x/aa/a2/45/aaa245759726ab04e968b9bff4981a52.jpg", type: "Stocks" },
    { id: 2,name:"ab", img: "https://static.vecteezy.com/system/resources/previews/020/336/451/non_2x/infosys-logo-infosys-icon-free-free-vector.jpg", type: "Stocks" },
    { id: 3,name:"abc", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWF0dJTKx5uFZ6WwP_ZtbMnhgDm4aUjjSZCw&s", type: "Stocks" },
    { id: 4,name:"abcd", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOKMurULDS5U71Q3qYK6HBK5C3EhxmdrCKWA&s", type: "Stocks" },
    { id: 5,name:"abcde", img: "https://unisonoagency.com/wp-content/uploads/2024/01/002.jpg", type: "Stocks" },
    { id: 6,name:"abcdef", img: "https://sidracapital.com/wp-content/uploads/2023/10/Sidra-Capital-Logo.png", type: "Stocks" },
    { id: 7,name:"abcdefg", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU6BXHqvMD0H9zY42OuUfRqWHY3pe0LVvFHA&s", type: "Stocks" },
    
    { id: 9,name:"zxy", img: "https://images.dhan.co/Mutual_Fund/amc_images/light/38442.png", type: "Mutual Funds" },
   
    { id: 11,name:"xyz", img: "data:image/jpeg;base64,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k5aHdM7qdmVzP96dfUagbDq2l08ad5fUUjqkThwwA04xhaI69qKmrqnWfTtdcbXRyGKoroZGgZb97kYd349P6L4s0N2vuu4tQ1tontVHS0DqZkdS5viSvc7JOB0AC1+nG6j0bR1GnqbTs1xYJ3uoq2OVjYy1xz9pnduM7q6kVh4aw1AzVHDCC7RU7qdk1wiaI3P5iOWXl6+ytJVNHpq+DhPSWh1ul+kWV4lfBzMyG+MXZ646b9VbOcqwl8zIVBZ7p9Hag1S39Fay9890kd4lPC14j/7Tnp3XeUuomC9WqyfRslM6roPig1xDfAAwPDLQOo6LE0PbK633PU8lbTOijq7m6anc4g+IwjqMH+Kx9WUt0oNW2vUlttstyggppKaoggcBI0OOQ5oPX5KeltMWszzrCMP1O34J5+gWBz/tB9tlhdttt081qKbiLO4W2rrNN1lLabg9kUda6Zjvru6fUG/Lnz98LGt9mvFTZ9aXGstzqarvjHCmoS9peA2MtbzHOATnovS62K6S8PdNW6Kje6spZKIzwhzcxhg+vnfy9E2VykNzqDV8tBeWWSzWie73PwhNJFHKI2xMJ2Lnnbft/VaXQdc65a91PVS0k9JK6GmbJT1AAfG4AgjbY/MdV73SC76e1pU32gtM11obhTsinjpnDxYXs6EAncf19N/TRlLen6uv13vFqdQMrYoRC0ytfs3OxIPXGM/7omRFZx3aKFK05CIiAiIgFRgKUQRgdlHKOy+kQRgKMDsF9Ig+S0dk5R2C+kQRgJgKUQRgIpRB84HZML6RBGAmApRBClEQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERB//Z", type: "Mutual Funds" }
  ];

  // Filter companies by type from param
  const filteredCompanies = companies.filter(
    (company) => company.type === type
  );
  const handleSelect = (company) => {
    setSelected(company);
  };
  
 

   
  return (
    <>
    <Header/>
    <div
      className="relative min-h-screen w-full p-6 bg-cover bg-no-repeat bg-center mt-12"
      style={{ backgroundImage: "url('/images/ba/MacBook Air - 11.jpg')" }}
    >
      <main className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center w-full mb-8">
          <div className="flex items-center space-x-2">
            <div className="bg-white rounded-full p-2">
              <img src="/images/sund inv.png" alt="Logo" style={{ width: "30px", marginLeft: "10px" }} />
            </div>
            <div className="bg-[#C3C9A6] rounded-full py-1 p-12" style={{ backgroundColor: "#BCC67A" }}>
              <p className="font-bold text-gray-800 text-sm">Istithmarat</p>
              <p className="text-xs text-gray-600">Investments</p>
            </div>
          </div>

          <div className="text-center">
            <img src="/images/sund-logo.png" alt="Sundooq Logo" style={{ width: "125px" }} />
          </div>
        </header>

        {/* Title */}
        <h2
          className="text-x2 font-bold text-white mb-8"
          style={{ color: "#849267", opacity: 0.8, fontSize: "175%", marginTop: "30px" }}
        >
          Select Your {type } Company
        </h2>

        {/* Scrollable Grid */}
        <div className="w-full">
          <div className="scroll-container h-70 overflow-y-auto pr-2">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
              {filteredCompanies.map((company) => (
                <button
                  key={company.id}
                  onClick={() => handleSelect(company)} // Pass the entire company object
                  className={`image-clip-button h-40 rounded-2xl border-4 ${
                    selected.id === company.id ? "border-green-700" : "border-[#9BA35C]"
                  }`}
                >
                  <img
                    src={company.img}
                    alt={`Company ${company.id}`}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      selected.id === company.id ? "opacity-100" : "opacity-60"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Info */}
        <p className="center-aligned-paragraph text-gray-700" style={{ marginTop: "50px" }}>
          Consumer Alert! Profit or loss may occur on your investment.
          These selected companies are predictions that may grow in upcoming years!
          Once you select your investment company, continue by tapping the Next button.
        </p>

        {/* Next Button */}
        <button
          onClick={handleSave}
          className="next-button text-white py-3 px-12 rounded-full shadow-lg mt-8 mb-8"
          style={{ backgroundColor: "#798434", fontFamily: "monospace", fontWeight: 600 ,fontSize:"20px"}}
        >
          Next
        </button>
      </main>
    </div>
    </>
  );
}

export default SelectCompanies;

