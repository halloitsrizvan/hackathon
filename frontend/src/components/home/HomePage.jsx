import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../store/UserContext'
import './Home.css'
function HomePage() {
  const navigate = useNavigate()
  const {currentUser} = useUser()
  return (
   
    <div className="text-white relative min-h-screen flex flex-col">

      {/* HERO SECTION */}
      <section
        className="section-bg relative bg-cover bg-no-repeat bg-center min-h-screen flex flex-col pt-32 px-4  "
        style={{ backgroundImage: "url('/images/ba/MacBook-Air---22.jpg')" }}
      >
        <div className="decorative-circle-1"></div>   
        <div className="decorative-circle-2"></div>

        <main className="flex-grow flex flex-col items-center justify-center text-center">
          <button
            className="bg-[#C3C9A6] text-[#545a41] font-bold py-4 px-12 rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
            style={{ marginTop: "20rem" }}
            onClick={()=>{currentUser?navigate('/sundooq'):navigate('/signup')}}
          >
            Let Open SUNDOOQ
          </button>
          <img src="" alt="" />
        </main>
      </section>

      {/* ABOUT SECTION */}
      <section
        className="text-gray-800"
        style={{ backgroundColor: "#FBFFDE", paddingTop: "8rem" }}
        id="about"
      >
        <div className="container mx-auto max-w-5xl px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 md:mb-0">
              What Is<br />SUNDOOQ?
            </h1>
            <div className="logo-box p-4 rounded-2xl shadow-sm bg-gray-50">
              <div className="relative text-center">
                <img src="/images/sund-logo.png" style={{ width: "200px" }} alt="Sundooq Logo" />
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <p className="text-base md:text-lg leading-relaxed text-gray-600 text-justify">
              Sundooq is a pioneering digital financial platform that revolutionizes personal finance by integrating
              the community-centric principles of the traditional Kerala Mahal system with the ethical framework of
              Islamic banking. This innovative service allows consumers to easily register and manage accounts,
              ensuring all investments are directed exclusively into Halal, Sharia-compliant ventures.
              Moving away from the conventional banking model, Sundooq offers access to financing and loans based on
              Islamic restrictions, providing a crucial alternative to interest-based (Riba) transactions.
              Furthermore, the platform embodies the spirit of mutual support by enabling users to donate directly to
              community projects, fostering a transparent and self-sustaining economic ecosystem rooted in faith and
              collective well-being.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-4xl mx-auto items-start">
            <div className="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-700" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
              <span className="font-semibold text-gray-700">Based on Islamic Banking system</span>
            </div>

            <div className="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-700" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
              <span className="font-semibold text-gray-700">Non-Interest transaction</span>
            </div>

            <div className="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-700" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 21V7L12 1 2 7v14h7v-7h6v7z" /></svg>
              <span className="font-semibold text-gray-700">Co-ordinate by Mahal System</span>
            </div>

            <div className="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-700" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
              <span className="font-semibold text-gray-700">Promoting Islamic manuals</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-16 text-center" style={{ backgroundColor: "#f9fce4" }}>
        <main className="w-full max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="mb-4">
              <img src="/images/newlogo.png" style={{ width: "300px" }} alt="SMF Logo" />
            </div>
            <div className="text-gray-800">
              <h1 className="font-bold text-lg md:text-xl">SAMASTHA KERALA SUNNI MAHALLU FEDERATION (SMF)</h1>
              <p className="text-sm text-gray-600 mt-1">Samasthalayam, Cheleri, Malappuram [Dt]</p>
            </div>
          </div>

          <div className="bg-gray-200 p-8 md:p-12 rounded-3xl shadow-sm">
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              The Mahallu system is not confined merely to religious matters; rather, it is an initiative that must influence all spheres of life for Kerala’s Muslims, including social, educational, cultural, and economic aspects. Beyond improving the physical infrastructure of mosques and madrasas, it is the fundamental responsibility of Mahallu committees to ensure the moral and social growth of every individual within the community.
              <br /><br />
              Mahallu committees must efficiently implement the projects developed by the Samastha Kerala Sunni Mahallu Federation (SMF), such as Swadeshi Dars, Pre-marital Course, Parenting Course, Aswas, Sundooq, and Continuing Education. It is essential to ensure the social and economic upliftment of the people, establish a strong and warm relationship between the committee office-bearers and the community, and adapt operational methods in accordance with the changing times. This book/journal serves as a guide for Mahallu office-bearers. It provides detailed information on committee formation, operational procedures, project implementation, registration, and the necessary documentation.
            </p>
          </div>
        </main>
      </section>

      {/* DONATION SECTION */}
      <section
        className="relative min-h-screen bg-cover bg-no-repeat bg-center"
        id="donation"
        style={{ backgroundImage: "url('/images/ba/MacBook Air - 5.jpg')" }}
      >
        <main className="flex flex-col items-center justify-center pt-1 pb-64 px-4"></main>
        <div className="w-full max-w-md mx-auto space-y-6 p-4" style={{ marginTop: "-10rem" }}>
          <div className="bg-[#C3C9A6] rounded-full py-3 px-8 self-start mx-auto">
            <h1 className="text-2xl font-bold text-black text-center">DONATIONS</h1>
          </div>

          <form action="#" className="space-y-4">
            <div className="form-container flex items-center p-4 rounded-lg bg-[#C3C9A6]">
              <label htmlFor="name" className="font-semibold text-gray-700 w-24">Name:</label>
              <input type="text" id="name" name="name" className="bg-transparent focus:outline-none w-full text-gray-800" placeholder='Name' />
            </div>

            <div className="form-container flex items-center p-4 rounded-lg bg-[#C3C9A6]">
              <label htmlFor="address" className="font-semibold text-gray-700 w-24">Address:</label>
              <input type="text" id="address" name="address" className="bg-transparent focus:outline-none w-full text-gray-800" placeholder='Address' />
            </div>

            <button type="submit" className="w-full form-container text-gray-800 font-bold p-4 rounded-lg tracking-[0.5em] text-center bg-gray-300 transition-colors">
              NEXT
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className=" text-gray-300 py-6 text-center" style={{backgroundColor: "#8E9752"}}>
        <p className="text-sm">&copy; 2025 Sundooq. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default HomePage
