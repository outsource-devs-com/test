import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faGlobe, faCreditCard, faCalendar, faLock, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
const Payment = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

 
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.cardNumber.match(/^\d{16}$/)) {
      newErrors.cardNumber = 'Invalid card number.';
    }
    if (!formData.expiryDate.match(/^\d{2}\/\d{2}$/)) {
      newErrors.expiryDate = 'Invalid expiry date.';
    }
    if (!formData.cvv.match(/^\d{3}$/)) {
      newErrors.cvv = 'Invalid CVV.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      fetch('https://sendSomeDataHere.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then((response) => {
        console.log('Form data submitted', response);
      });
    }

    // To Do
    // Call API To Store Card Details
    navigate("/confirmation");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const noBulletPointStyle = {
    listStyleType: "none",
    paddingLeft: 0
  };

  return (
    <div className="min-h-screen flex flex-col items-start px-4 sm:px-8 py-10 md:flex-row md:justify-center font-poppins">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 mb-10 md:mb-0 md:mr-10">
        <h1 className="text-xl font-bold mb-4 text-center">Create Your Account And Get Started</h1>
        <h2 className='text-[14px] font-thin text-gray-400 text-center -mt-2'>Create Your Account: Step 2 of 2</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full pl-10 py-2 border rounded-md"
              />
            </div>
            <div className="relative">
              <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full pl-10 py-2 border rounded-md"
              />
            </div>
          </div>
          <div className="relative">
            <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full pl-10 py-2 border rounded-md"
            />
          </div>
          <div className="relative">
            <FontAwesomeIcon icon={faPhone} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full pl-10 py-2 border rounded-md"
            />
          </div>
          <div className="relative">
            <FontAwesomeIcon icon={faGlobe} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              className="w-full pl-10 py-2 border rounded-md"
            />
          </div>
          <div className="relative">
            <FontAwesomeIcon icon={faCreditCard} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="Card Number"
              className={`w-full pl-10 py-2 border rounded-md ${errors.cardNumber ? 'border-red-500' : ''}`}
            />
            {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <FontAwesomeIcon icon={faCalendar} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder="MM / YY"
                className={`w-full pl-10 py-2 border rounded-md ${errors.expiryDate ? 'border-red-500' : ''}`}
              />
              {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
            </div>
            <div className="relative">
              <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="CVV"
                className={`w-full pl-10 py-2 border rounded-md ${errors.cvv ? 'border-red-500' : ''}`}
              />
              {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
            </div>
          </div>
          <p className='text-xs font-thin'>
            Why? We ask for a payment method so that your subscription and business can continue without interruption after your trial ends.
          </p>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Start My Subscription
          </button>
        </form>
        <p className="text-xs text-gray-600 mt-4">
          Free from today until your MVP! Cancel anytime, hassle-free. Cancel by email (support@luminaristudio.com). I also agree to the
          <a href="#" className="text-blue-500"> Terms of Service</a>,
          <a href="#" className="text-blue-500"> Privacy Policy</a> and
          <a href="#" className="text-blue-500"> Affiliate Agreement</a>.
        </p>
      </div>
      <div className="text-left text-gray-700 mt-10 md:mt-0 hidden lg:block">
        <h2 className="text-2xl font-bold max-w-[410px]">
          Join 100,000+ Entrepreneurs Who Use ClickFunnels To Easily Get Their Products And Message Out To The World
        </h2>
        <p className="text-md mt-4 font-bold">100% NO-RISK MVP DELIVERY</p>
        <ul className="list-disc text-xs text-gray-600" style={noBulletPointStyle}>
          <li className='my-2'><FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />Get access to all features</li>
          <li className='my-2'><FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />Pay NOTHING until MVP</li>
          <li className='my-2'><FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />Cancel anytime, hassle-free</li>
          <li><FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />Lightening fast delivery</li>
        </ul>
        <div className="mt-6 border-[2px] border-gray-300 p-4">
          <p className="text-xs">Plan</p>
          <p className="text-md font-bold">MVP Kick Starter</p>
          <p className="text-md font-bold">$0 due today</p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
