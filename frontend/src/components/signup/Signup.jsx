import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {EmailIcon,UserIcon,LockIcon} from '../../public/Icons'
import {db } from '../../firebase'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import { PhoneIcon } from '../../public/Icons';
import Mahals from './Mahals';
function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone,setPhone] = useState('')
    const [signupErr, setSignupErr] = useState('');
    const [mahal,setMahal] = useState('')
    const [load, setLoad] = useState(false);
  const [showMahal, setShowMahal] = useState(false);
    const navigate = useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            setLoad(true)
            const auth =getAuth()
            const userCradiental= await createUserWithEmailAndPassword(auth,email,password)

            await updateProfile(userCradiental.user, {
                displayName: name
              });

              await setDoc(doc(db, 'users', userCradiental.user.uid), {
                id: userCradiental.user.uid,
                username: name,
                email: email,
                isAdmin: false,
                phone: phone,
                mahal: mahal,
                createdAt: new Date()
              });
        
             setLoad(false)
              navigate('/');  

        }catch(err){
            setLoad(false)
            navigate('/signup')
          setSignupErr(err.message)
        }

    }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 font-sans">
    <Mahals show={showMahal} onClose={() => setShowMahal(false)} onSelect={(mahal) => setMahal(mahal)} />

    <div className="relative mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Create Your Account</h1>
        <p className="mt-2 text-gray-500">Sundook Jahfal Hackathon</p>
      </div>

    

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {signupErr && (
          <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-center text-sm font-medium text-red-700">
            {signupErr}
          </div>
        )}

        <div className="relative">
          <UserIcon />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="relative">
          <PhoneIcon />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="phone number"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="relative">
          <EmailIcon />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="relative">
          <LockIcon />
          <input
            type="password"
            
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="relative">
        <button
          type="button"
          className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-4 pr-4 text-left text-gray-800 transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          onClick={() => setShowMahal(true)}
        >
          {mahal ? `Selected: ${mahal}` : 'Select your Mahal'}
        </button>
      </div>


        <div>
          <button
            type="submit"
            disabled={load}
            className="w-full rounded-lg bg-blue-600 py-3 text-center font-semibold text-white transition-transform duration-200 hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            Sign Up
          </button>
        </div>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-blue-600 hover:underline">
            Login Now
          </Link>
        </p>
      </div>
    </div>
  </div>
  )
}

export default Signup