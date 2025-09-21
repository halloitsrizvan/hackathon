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
import SelectCompanies from './components/investment/SelectCompanies';
import Borrow from './components/borrow/Borrow';
import Payment from './components/payment-plan/Payment';
import PricingPlans from './components/payment-plan/PricingPlans';
import ThankYouPage from './components/payment-plan/ThankYouPage';
import LoanPlanPage from './components/borrow/LoanPlanPage';
import LoanPaymentPage from './components/borrow/LoanPaymentPage';
import FormSavings from './components/savings/FormSavings';
import ChoosePlanPage from './components/savings/ChoosePlanPage';

import PaySavs from './components/savings/PaySavs';
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
        <Route path='/loan' element={<Borrow /> } />
        <Route path='/payment' element={ <Payment /> } />
        <Route path='/plans' element={ <PricingPlans /> } />
        <Route path='/thanks' element={ <ThankYouPage /> } />
        <Route path='/loan-plan' element={<LoanPlanPage /> } />
        <Route path='/loan-pay' element={ <LoanPaymentPage /> } />
        <Route path='/savings' element={ <FormSavings /> } />
        <Route path='/savings-plan' element={ <ChoosePlanPage /> } />
        <Route path='/savings-pay' element={ <PaySavs /> } />
        <Route path='/select-company/:type' element={currentUser ? <SelectCompanies /> : <SignupMain />} />
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