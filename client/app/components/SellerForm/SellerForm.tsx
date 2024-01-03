
import React, { useState } from 'react';

const SellerForm = ({ onSubmit }:{onSubmit: (phoneNumber: string, address: string) => void;}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (event:any) => {
    event.preventDefault();
    onSubmit(phoneNumber, address); // Pass the state values to the parent's function
  };

    return (
        <div className="max-w-md mx-auto mt-10">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input 
              required 
              type="tel" 
              id="phoneNumber" 
              name="phoneNumber" 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              placeholder="Your Phone Number"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
              Address
            </label>
            <input 
              required 
              type="text" 
              id="address" 
              name="address" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
              placeholder="Your Address"
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    )
}
export default SellerForm;