import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/LoginMain';
import SignupMain from './pages/SignupMain';
import AboutusMain from './pages/AboutusMain';
import { UserProvider } from './store/UserContext';
import Test from './pages/Test';
function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} /> 
            <Route path='/signup' element={<SignupMain/>} />
            <Route path='/aboutus' element={<AboutusMain/>} />
            
            
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
