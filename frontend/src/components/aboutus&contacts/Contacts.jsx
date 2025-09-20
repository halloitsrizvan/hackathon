import React, { useState } from 'react'
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaCommentDots } from 'react-icons/fa';
import './ContactUs.css'
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../store/UserContext';
function Contacts() {

  const {currentUser}=useUser();


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
 
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try{
      await addDoc(collection(db, 'contact'), {
        name,
        email,
        subject,
        message,
        userId:currentUser.uid,
      });
      navigate('/');
    }
    catch(error){
      setError(error.message);
    }
    finally{
      setIsLoading(false);
      
    }
  }

  
 
  
  return (
   <div className="contact-container ">
      <h1 className="contact-title">Contact Sundooq</h1>
      <p className="contact-subtitle">We'd love to hear from you! Reach out to us for any questions or feedback.</p>
      
      <div className="flex flex-wrap gap-8">
      <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-5">
  {/* Location */}
  <div className="bg-yellow-300 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all duration-300">
    <div className="w-14 h-14 flex items-center justify-center bg-yellow-400 rounded-full mx-auto mb-4">
      <FaMapMarkerAlt className="text-xl text-gray-800" />
    </div>
    <h3 className="text-lg font-semibold text-gray-800 mb-3">Our Location</h3>
    <p className="text-sm text-gray-600 leading-relaxed">
      123 Sundooq Avenue<br />
      New York, NY 10001<br />
      United States
    </p>
  </div>

  {/* Phone */}
  <div className="bg-yellow-300 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all duration-300">
    <div className="w-14 h-14 flex items-center justify-center bg-yellow-400 rounded-full mx-auto mb-4">
      <FaPhoneAlt className="text-xl text-gray-800" />
    </div>
    <h3 className="text-lg font-semibold text-gray-800 mb-3">Phone Number</h3>
    <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
    <p className="text-sm text-gray-600">Mon-Fri: 9am - 6pm EST</p>
  </div>

  {/* Email */}
  <div className="bg-yellow-300 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all duration-300">
    <div className="w-14 h-14 flex items-center justify-center bg-yellow-400 rounded-full mx-auto mb-4">
      <FaEnvelope className="text-xl text-gray-800" />
    </div>
    <h3 className="text-lg font-semibold text-gray-800 mb-3">Email Address</h3>
    <p className="text-sm text-gray-600">support@sundooq.com</p>
    <p className="text-sm text-gray-600">inquiries@sundooq.com</p>
  </div>

  {/* Live Chat */}
  <div className="bg-yellow-300 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all duration-300">
    <div className="w-14 h-14 flex items-center justify-center bg-yellow-400 rounded-full mx-auto mb-4">
      <FaCommentDots className="text-xl text-gray-800" />
    </div>
    <h3 className="text-lg font-semibold text-gray-800 mb-3">Live Chat</h3>
    <p className="text-sm text-gray-600">Available 24/7</p>
    <button className="mt-4 bg-white text-gray-800 font-semibold py-2 px-5 rounded hover:bg-yellow-400 transition-all duration-300">
      Start Chat
    </button>
  </div>
</div>

        
        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" placeholder="Enter your name" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" placeholder="What's this about?" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="5" placeholder="Your message here..." required value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
            </div>
            {error && <div className="error-message">{error}</div>}
            {isLoading && <span>Sending message...</span>}
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
      
    
    </div>
  )
}

export default Contacts