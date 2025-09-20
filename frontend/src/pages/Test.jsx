
import React, { useState, useEffect } from 'react';
import { signInWithCustomToken, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { doc, setDoc, getDoc, collection, query, onSnapshot, updateDoc, where, addDoc } from 'firebase/firestore';
import { setLogLevel } from '@firebase/app';
import { db, auth } from './TestConfig';

// App configuration
const appId = 'sundooq-app';
const initialAuthToken = null;

// Hardcoded mahal options
const mahalOptions = [
  { id: 'mahal_1', name: 'Al-Madinah Mahal', location: 'Dubai, UAE' },
  { id: 'mahal_2', name: 'Al-Makkah Mahal', location: 'Riyadh, Saudi Arabia' },
  { id: 'mahal_3', name: 'Al-Quds Mahal', location: 'Istanbul, Turkey' },
  { id: 'mahal_4', name: 'Al-Andalus Mahal', location: 'Cordoba, Spain' },
  { id: 'mahal_5', name: 'Al-Baghdad Mahal', location: 'Baghdad, Iraq' }
];
setLogLevel('debug'); // Enable debug logs for Firebase

export default function Test() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [authError, setAuthError] = useState('');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('investor'); // Default role
  const [selectedMahal, setSelectedMahal] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [loanReason, setLoanReason] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');

  // Dashboard data states
  const [loans, setLoans] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [mahalMembers, setMahalMembers] = useState([]);

  // Authentication and Firestore setup
  useEffect(() => {
    // Initial custom token sign-in or anonymous sign-in
    const initAuth = async () => {
      try {
        if (initialAuthToken) {
          await signInWithCustomToken(auth, initialAuthToken);
        } else {
          await signInAnonymously(auth);
        }
      } catch (error) {
        console.error("Firebase auth initialization failed:", error);
      }
    };
    initAuth();

    // Set up auth state listener
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Fetch user document from Firestore
        const userDocRef = doc(db, 'artifacts', appId, 'users', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = { id: userDocSnap.id, ...userDocSnap.data() };
          setUser(userData);
          // Navigate to dashboard after successful login
          if (userData.role === 'mahal_admin') {
            setCurrentPage('mahalAdminDashboard');
          } else {
            setCurrentPage('dashboard');
          }
        } else {
          setUser(null);
          setCurrentPage('landing');
        }
      } else {
        setUser(null);
        setCurrentPage('landing');
      }
      setLoading(false);
      setIsAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  // Set up real-time data listeners based on user role
  useEffect(() => {
    if (!user || !isAuthReady) {
      return;
    }

    let unsubscribes = [];

    if (user.role === 'mahal_admin') {
      // Listen for all loan requests
      const qLoans = query(collection(db, 'artifacts', appId, 'public', 'data', 'loans'));
      const unsubLoans = onSnapshot(qLoans, (snapshot) => {
        const loanList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLoans(loanList);
      });
      unsubscribes.push(unsubLoans);

      // Listen for all members in the mahal
      const qMembers = query(collection(db, 'artifacts', appId, 'users'), where('mahalId', '==', user.mahalId));
      const unsubMembers = onSnapshot(qMembers, (snapshot) => {
        const memberList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMahalMembers(memberList);
      });
      unsubscribes.push(unsubMembers);
    } else if (user.role === 'investor') {
      // Listen for investments
      const qInvestments = query(collection(db, 'artifacts', appId, 'public', 'data', 'investments'), where('investorId', '==', user.id));
      const unsubInvestments = onSnapshot(qInvestments, (snapshot) => {
        const investmentList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setInvestments(investmentList);
      });
      unsubscribes.push(unsubInvestments);

      // Listen for approved loans in the same mahal
      const qLoans = query(collection(db, 'artifacts', appId, 'public', 'data', 'loans'), where('mahalId', '==', user.mahalId));
      const unsubLoans = onSnapshot(qLoans, (snapshot) => {
        const loanList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLoans(loanList);
      });
      unsubscribes.push(unsubLoans);
    } else if (user.role === 'borrower') {
      // Listen for loan requests made by the current user
      const qLoans = query(collection(db, 'artifacts', appId, 'public', 'data', 'loans'), where('borrowerId', '==', user.id));
      const unsubLoans = onSnapshot(qLoans, (snapshot) => {
        const loanList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLoans(loanList);
      });
      unsubscribes.push(unsubLoans);
    }

    return () => {
      unsubscribes.forEach(unsub => unsub());
    };
  }, [user, isAuthReady]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setAuthError('');
    
    if (!selectedMahal) {
      setAuthError('Please select a Mahal');
      return;
    }
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userDocRef = doc(db, 'artifacts', appId, 'users', userCredential.user.uid);
      await setDoc(userDocRef, {
        name,
        email,
        phoneNumber,
        role,
        mahalId: selectedMahal,
        createdAt: new Date(),
      });
      
      // Reset form
      setEmail('');
      setPassword('');
      setName('');
      setPhoneNumber('');
      setSelectedMahal('');
      setRole('investor');
    } catch (error) {
      setAuthError(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setAuthError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Reset state on logout
      setUser(null);
      setCurrentPage('landing');
      setAuthError('');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleLoanRequest = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'loans'), {
        borrowerId: user.id,
        borrowerName: user.name,
        mahalId: user.mahalId,
        amount: parseFloat(loanAmount),
        reason: loanReason,
        status: 'Pending',
        createdAt: new Date(),
      });
      setLoanAmount('');
      setLoanReason('');
      console.log('Loan request submitted successfully!');
    } catch (error) {
      console.error('Error submitting loan request:', error);
      console.log('Failed to submit loan request.');
    }
  };

  const handleApproveLoan = async (loanId) => {
    if (!user || user.role !== 'mahal_admin') return;
    try {
      const loanDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'loans', loanId);
      await updateDoc(loanDocRef, { status: 'Approved' });
    } catch (error) {
      console.error('Error approving loan:', error);
    }
  };

  const handleInvestment = async (loanId, amount) => {
    if (!user || user.role !== 'investor') return;
    try {
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'investments'), {
        investorId: user.id,
        loanId: loanId,
        amount: parseFloat(amount),
        createdAt: new Date(),
        status: 'Active'
      });
      console.log('Investment made successfully!');
    } catch (error) {
      console.error('Error making investment:', error);
    }
  };

  const renderContent = () => {
    if (loading || !isAuthReady) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-xl text-gray-700 animate-pulse">Loading...</div>
        </div>
      );
    }

    if (user) {
      // User is logged in, show dashboard based on role
      switch (user.role) {
        case 'mahal_admin':
          return renderMahalAdminDashboard();
        case 'investor':
        case 'borrower':
          return renderUserDashboard();
        default:
          return (
            <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-800">
              Invalid user role. Please contact support.
            </div>
          );
      }
    }

    // User is not logged in, show landing, login, or signup page
    switch (currentPage) {
      case 'landing':
        return renderLandingPage();
      case 'signup':
        return renderSignUpPage();
      case 'login':
        return renderLoginPage();
      default:
        return renderLandingPage();
    }
  };

  const renderLandingPage = () => (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-inter">
      <div className="p-4 flex justify-between items-center shadow-sm bg-white">
        <h1 className="text-2xl font-bold text-teal-600">Sundooq</h1>
        <div className="space-x-4">
          <button onClick={() => setCurrentPage('login')} className="px-4 py-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors duration-200">Login</button>
          <button onClick={() => setCurrentPage('signup')} className="px-4 py-2 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-colors duration-200">Create Account</button>
        </div>
      </div>
      <main className="flex-grow">
        <section className="bg-teal-600 text-white py-20 px-4 text-center rounded-b-3xl shadow-lg">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fadeInUp">Invest & Loan with Zero Interest</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fadeInUp delay-200">Empowering the Ummah with Qard Hasan.</p>
          <button onClick={() => setCurrentPage('signup')} className="px-8 py-4 text-lg font-bold rounded-full bg-white text-teal-600 shadow-xl hover:bg-gray-100 transition-transform duration-300 transform hover:scale-105">Get start now</button>
        </section>

        <section className="py-20 px-4 container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-8 rounded-2xl bg-white shadow-lg border border-gray-100 transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl text-teal-600 mb-4">1.</div>
              <h4 className="text-xl font-semibold mb-2">Invest Money</h4>
              <p className="text-gray-600">Investors contribute to the community pool for those in need.</p>
            </div>
            <div className="p-8 rounded-2xl bg-white shadow-lg border border-gray-100 transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl text-teal-600 mb-4">2.</div>
              <h4 className="text-xl font-semibold mb-2">Request Loan</h4>
              <p className="text-gray-600">Borrowers submit a request for an interest-free loan (Qard Hasan).</p>
            </div>
            <div className="p-8 rounded-2xl bg-white shadow-lg border border-gray-100 transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl text-teal-600 mb-4">3.</div>
              <h4 className="text-xl font-semibold mb-2">Repay with Zero Interest</h4>
              <p className="text-gray-600">The borrower repays the exact amount, which is returned to the pool.</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-20 px-4 text-center rounded-t-3xl shadow-inner">
          <h3 className="text-3xl font-bold mb-4">Testimonials</h3>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">"Who is it that would loan Allah a goodly loan so He may multiply it for him many times over?" (Quran 2:245)</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <p className="italic text-gray-700 mb-4">"Sundooq helped me start my small business without the burden of interest. A true blessing!"</p>
              <p className="font-semibold text-teal-600">- Ayesha B.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <p className="italic text-gray-700 mb-4">"As an investor, it's a great feeling to know my money is helping someone in a way that is pleasing to Allah."</p>
              <p className="font-semibold text-teal-600">- Omar F.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <p className="italic text-gray-700 mb-4">"The platform is easy to use and the community support is amazing. Thank you for this initiative."</p>
              <p className="font-semibold text-teal-600">- Sarah S.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8 text-center rounded-t-3xl">
        <p className="text-lg">&copy; 2024 Sundooq. All rights reserved.</p>
        <div className="mt-4 space-x-4 text-sm">
          <a href="#" className="hover:text-teal-400">About</a>
          <a href="#" className="hover:text-teal-400">Contact</a>
          <a href="#" className="hover:text-teal-400">Privacy Policy</a>
          <a href="#" className="hover:text-teal-400">Terms</a>
        </div>
      </footer>
    </div>
  );

  const renderSignUpPage = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-inter">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-teal-600">Create Account</h2>
          <p className="text-gray-500 text-sm mt-1">Join the community with zero interest.</p>
        </div>
        {authError && <div className="p-3 mb-4 text-center rounded-md text-red-700 bg-red-100">{authError}</div>}
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-teal-500 focus:border-teal-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-teal-500 focus:border-teal-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-teal-500 focus:border-teal-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required className="w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-teal-500 focus:border-teal-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="role">I am a...</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-teal-500 focus:border-teal-500">
              <option value="investor">Investor</option>
              <option value="borrower">Borrower</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="mahal">Select Mahal</label>
            <select id="mahal" value={selectedMahal} onChange={(e) => setSelectedMahal(e.target.value)} required className="w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-teal-500 focus:border-teal-500">
              <option value="">Choose your Mahal</option>
              {mahalOptions.map((mahal) => (
                <option key={mahal.id} value={mahal.id}>{mahal.name} - {mahal.location}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="w-full py-3 mt-6 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-colors duration-200 shadow-lg">Sign Up</button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account? <button onClick={() => setCurrentPage('login')} className="font-semibold text-teal-600 hover:text-teal-700">Login</button>
        </p>
      </div>
    </div>
  );

  const renderLoginPage = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-inter">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-teal-600">Login</h2>
          <p className="text-gray-500 text-sm mt-1">Welcome back!</p>
        </div>
        {authError && <div className="p-3 mb-4 text-center rounded-md text-red-700 bg-red-100">{authError}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-teal-500 focus:border-teal-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-teal-500 focus:border-teal-500" />
          </div>
          <button type="submit" className="w-full py-3 mt-6 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-colors duration-200 shadow-lg">Login</button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account? <button onClick={() => setCurrentPage('signup')} className="font-semibold text-teal-600 hover:text-teal-700">Sign Up</button>
        </p>
        <p className="text-center text-sm mt-2">
          <a href="#" className="font-semibold text-gray-500 hover:text-gray-700">Forgot Password?</a>
        </p>
      </div>
    </div>
  );

  const renderDashboardHeader = () => (
    <header className="p-4 flex justify-between items-center shadow-sm bg-white">
      <h1 className="text-2xl font-bold text-teal-600">
        {user.role === 'investor' ? 'Investor Dashboard' : user.role === 'borrower' ? 'Borrower Dashboard' : 'Mahal Admin Dashboard'}
      </h1>
      <div className="flex items-center space-x-4">
        <span className="hidden sm:inline text-sm text-gray-600"> {user.name}</span>
        <button onClick={handleLogout} className="px-4 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors duration-200">Logout</button>
      </div>
    </header>
  );

  const renderUserDashboard = () => (
    <div className="min-h-screen bg-gray-50 font-inter">
      {renderDashboardHeader()}
      <main className="container mx-auto p-4 md:p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Welcome, {user.name}!</h2>
          <p className="text-gray-500 text-lg">Your Role: <span className="capitalize font-semibold">{user.role}</span></p>
        </div>

        {user.role === 'investor' && (
          <section className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-8">
            <h3 className="text-2xl font-bold mb-4 text-teal-600">Available Loan Requests</h3>
            <p className="text-gray-600 mb-4">Invest in approved loan requests from your Mahal members.</p>
            <ul className="space-y-4">
              {loans.filter(loan => loan.status === 'Approved' && loan.mahalId === user.mahalId).length > 0 ? (
                loans.filter(loan => loan.status === 'Approved' && loan.mahalId === user.mahalId).map((loan) => (
                  <li key={loan.id} className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-semibold text-gray-800">Loan of ₹{loan.amount}</span>
                        <p className="text-sm text-gray-500">Reason: {loan.reason}</p>
                      </div>
                      <span className="text-sm px-3 py-1 rounded-full font-semibold bg-green-100 text-green-800">Approved</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <input 
                        type="number" 
                        placeholder="Investment amount" 
                        value={investmentAmount} 
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                      />
                      <button 
                        onClick={() => handleInvestment(loan.id, investmentAmount)}
                        className="px-4 py-2 rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-colors duration-200"
                      >
                        Invest
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <li className="text-center text-gray-500">No approved loan requests available for investment.</li>
              )}
            </ul>
          </section>
        )}

        {user.role === 'investor' && (
          <section className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-8">
            <h3 className="text-2xl font-bold mb-4 text-teal-600">My Investments</h3>
            <p className="text-gray-600 mb-4">A list of all the loans you have funded.</p>
            <ul className="space-y-4">
              {investments.length > 0 ? (
                investments.map((inv) => (
                  <li key={inv.id} className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex justify-between items-center">
                    <span className="font-semibold text-gray-800">Loan ID: {inv.loanId.substring(0, 8)}...</span>
                    <span className="text-gray-600">Amount: ₹{inv.amount}</span>
                  </li>
                ))
              ) : (
                <li className="text-center text-gray-500">No investments found.</li>
              )}
            </ul>
          </section>
        )}

        {user.role === 'borrower' && (
          <section className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-8">
            <h3 className="text-2xl font-bold mb-4 text-teal-600">Request a Loan</h3>
            <p className="text-gray-600 mb-4">Request a new interest-free loan from your community's pool.</p>
            <form onSubmit={handleLoanRequest} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="loanAmount">Amount (₹)</label>
                <input type="number" id="loanAmount" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} required className="w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-teal-500 focus:border-teal-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="loanReason">Reason for Loan</label>
                <textarea id="loanReason" value={loanReason} onChange={(e) => setLoanReason(e.target.value)} required rows="3" className="w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-teal-500 focus:border-teal-500"></textarea>
              </div>
              <button type="submit" className="w-full py-3 mt-4 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-colors duration-200">Submit Request</button>
            </form>
          </section>
        )}

        <section className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold mb-4 text-teal-600">My Loan Requests</h3>
          <p className="text-gray-600 mb-4">View the status of all your loan requests.</p>
          <ul className="space-y-4">
            {loans.length > 0 ? (
              loans.map((loan) => (
                <li key={loan.id} className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-semibold text-gray-800">Loan of ₹{loan.amount}</span>
                      <p className="text-sm text-gray-500">{loan.reason}</p>
                    </div>
                    <span className={`text-sm px-3 py-1 rounded-full font-semibold ${loan.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {loan.status}
                    </span>
                  </div>
                  {loan.status === 'Approved' && (
                    <div className="mt-3 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-800 font-semibold">✓ Your loan has been approved and is available for investment!</p>
                      <p className="text-xs text-green-600 mt-1">Investors from your Mahal can now fund this loan.</p>
                    </div>
                  )}
                </li>
              ))
            ) : (
              <li className="text-center text-gray-500">No loan requests found.</li>
            )}
          </ul>
        </section>
      </main>
    </div>
  );

  const renderMahalAdminDashboard = () => (
    <div className="min-h-screen bg-gray-50 font-inter">
      {renderDashboardHeader()}
      <main className="container mx-auto p-4 md:p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Welcome, {user.name}!</h2>
          <p className="text-gray-500 text-lg">Your Role: <span className="capitalize font-semibold text-teal-600">Mahal Admin</span></p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold mb-4 text-teal-600">Pending Loan Requests</h3>
            <p className="text-gray-600 mb-4">Approve or deny loan requests from your members.</p>
            <ul className="space-y-4">
              {loans.filter(loan => loan.status === 'Pending').length > 0 ? (
                loans.filter(loan => loan.status === 'Pending').map((loan) => (
                  <li key={loan.id} className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-semibold text-gray-800">Loan of ₹{loan.amount}</span>
                        <p className="text-sm text-gray-500">By: {loan.borrowerName || 'Unknown User'}</p>
                      </div>
                      <span className="text-sm px-3 py-1 rounded-full font-semibold bg-yellow-100 text-yellow-800">Pending</span>
                    </div>
                    <p className="text-gray-700 text-sm mb-4">{loan.reason}</p>
                    <button onClick={() => handleApproveLoan(loan.id)} className="w-full py-2 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors duration-200">Approve</button>
                  </li>
                ))
              ) : (
                <li className="text-center text-gray-500">No pending loan requests.</li>
              )}
            </ul>
          </section>

          <section className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold mb-4 text-teal-600">Mahal Members</h3>
            <p className="text-gray-600 mb-4">A list of all users registered under your Mahal.</p>
            <ul className="space-y-2">
              {mahalMembers.length > 0 ? (
                mahalMembers.map((member) => (
                  <li key={member.id} className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex justify-between items-center">
                    <span className="font-semibold text-gray-800">{member.name}</span>
                    <span className="text-sm px-3 py-1 rounded-full capitalize font-semibold bg-gray-200 text-gray-800">{member.role}</span>
                  </li>
                ))
              ) : (
                <li className="text-center text-gray-500">No members found.</li>
              )}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );

  return renderContent();
}





