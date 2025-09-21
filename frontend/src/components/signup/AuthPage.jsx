import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Mahals from "./Mahals";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // toggle between login and register

  // common
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // register extra
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [mahal, setMahal] = useState("");
  const [showMahal, setShowMahal] = useState(false);

  // Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoad(true);
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, { displayName: name });

      await setDoc(doc(db, "users", userCredential.user.uid), {
        id: userCredential.user.uid,
        username: name,
        email: email,
        isAdmin: false,
        phone: phone,
        mahal: mahal,
        createdAt: new Date(),
      });

      setLoad(false);
      navigate("/");
    } catch (err) {
      setLoad(false);
      setError(err.message);
    }
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoad(true);
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      setLoad(false);
      navigate("/");
    } catch (err) {
      setLoad(false);
      setError(err.message);
    }
  };

  return (
    <div
      className="relative min-h-screen w-full p-6 lg:p-12 bg-cover bg-no-repeat bg-center "
      style={{ backgroundImage: "url('/images/ba/MacBook Air - 8.jpg')" }}
    >
      <Mahals show={showMahal} onClose={() => setShowMahal(false)} onSelect={(m) => setMahal(m)} />

      {/* Header */}
      <header className="relative z-10 flex flex-col sm:flex-row justify-between items-center w-full max-w-6xl mx-auto mb-8 mt-6">
        <div className="flex items-center space-x-3 mb-6 sm:mb-0">
          <img src="/images/newlogo.png" alt="SMF Logo" style={{ width: "275px", marginTop: "-50px" }} />
        </div>
        <div className="text-center">
          <img src="/images/sund-logo.png" alt="Sundooq Logo" style={{ width: "200px", marginTop: "-20px" }} />
        </div>
      </header>

      {/* Main Auth Card */}
      <main className="relative z-10 flex flex-col items-center justify-center flex-grow w-full mt-[50px] " style={{marginTop:"-1rem"}}>
        <div className="form-container w-full max-w-md bg-white/70 backdrop-blur rounded-xl p-6 shadow-lg">
          {/* Tabs */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <button
              className={`tab-btn py-3 px-10 rounded-lg transition ${
                isLogin ? "bg-[#9BA35C] opacity-100" : "bg-[#B5BF68] opacity-50"
              }`}
              onClick={() => setIsLogin(true)}
            >
              <h1 style={{ color: "#E9EAD9" }}>LOGIN</h1>
            </button>
            <button
              className={`tab-btn py-3 px-10 rounded-lg transition ${
                !isLogin ? "bg-[#9BA35C] opacity-100" : "bg-[#B5BF68] opacity-50"
              }`}
              onClick={() => setIsLogin(false)}
            >
              <h1 style={{ color: "#E9EAD9" }}>REGISTER</h1>
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-center text-sm font-medium text-red-700 mb-3">
              {error}
            </div>
          )}

          {/* Animated Forms */}
          <div className="relative w-full h-auto">
            {/* Login Form */}
            {isLogin && (
              <form
                onSubmit={handleLogin}
                className="space-y-4 animate-fade-in"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email:"
                  className="form-input w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A6B081]"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password:"
                  className="form-input w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A6B081]"
                />
                <button
                  type="submit"
                  className="submit-btn w-full p-4 rounded-lg shadow-md transition hover:scale-105"
                  style={{ backgroundColor: "#B5BF68" }}
                >
                  {load ? "Logging in..." : "Login"}
                </button>
              </form>
            )}

            {/* Register Form */}
            {!isLogin && (
              <form
                onSubmit={handleRegister}
                className="space-y-4 animate-fade-in"
              >
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name:"
                  className="form-input w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A6B081]"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone:"
                  className="form-input w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A6B081]"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email:"
                  className="form-input w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A6B081]"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password:"
                  className="form-input w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A6B081]"
                />
                <button
                  type="button"
                  className="form-input w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A6B081] bg-white text-left"
                  onClick={() => setShowMahal(true)}
                >
                  {mahal ? `Selected: ${mahal}` : "Select your Mahal"}
                </button>
                <button
                  type="submit"
                  className="submit-btn w-full p-4 rounded-lg shadow-md transition hover:scale-105"
                  style={{ backgroundColor: "#B5BF68" }}
                >
                  {load ? "Signing up..." : "Sign Up"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default AuthPage;
