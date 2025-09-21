import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/LoginMain';
import SignupMain from './pages/SignupMain';
import AboutusMain from './pages/AboutusMain';
import { UserProvider, useUser } from './store/UserContext';
import ProflePage from './pages/ProflePage';
import Test from './pages/Test';
import UserPage from './components/home/UserPage';
import InvestmentData from './components/investment/InvestmentData';

function AppContent() {
  const { currentUser } = useUser(); // Now this is inside the UserProvider context
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignupMain />} />
        <Route path='/aboutus' element={<AboutusMain />} />
        <Route path='/profile' element={<ProflePage />} />
        <Route path='/sundooq' element={currentUser ? <UserPage /> : <SignupMain />} />
        <Route path='/investment' element={currentUser ? <InvestmentData /> : <SignupMain />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <div className="App">
      <UserProvider>
        <AppContent />
      </UserProvider>
    </div>
  );
}

export default App;