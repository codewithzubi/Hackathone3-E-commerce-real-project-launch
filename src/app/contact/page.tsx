import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt, FaClock } from "react-icons/fa";
import { GrTrophy } from "react-icons/gr";
import { BsCheckCircle } from "react-icons/bs";
import { MdSupportAgent } from "react-icons/md";

const ContactUs = () => {
  return (
    <div className="w-full bg-white flex flex-col items-center p-5">
      {/* Top Section */}
      <div className="w-full max-w-5xl bg-white flex flex-col items-center p-5">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-semibold mb-5">Get In Touch With Us</h1>
          <p className="text-base font-light text-gray-600 leading-6 max-w-3xl mx-auto">
            For More Information About Our Product & Services. Please Feel Free
            To Drop Us An Email. Our Staff Always Be There To Help You Out. Do
            Not Hesitate!
          </p>
        </div>

        {/* Contact Details and Form */}
        <div className="flex flex-wrap justify-between gap-5 w-full">
          {/* Left Section */}
          <div className="flex-1 min-w-[320px] max-w-[600px]">
            <div className="flex items-center gap-4 mb-5">
              <IoLocationSharp className="text-2xl text-teal-600" />
              <div>
                <h2 className="text-lg font-semibold mb-1">Address</h2>
                <p className="text-sm text-gray-600">
                  236 5th SE Avenue, New York NY10000, United States
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-5">
              <FaPhoneAlt className="text-2xl text-teal-600" />
              <div>
                <h2 className="text-lg font-semibold mb-1">Phone</h2>
                <p className="text-sm text-gray-600">
                  Mobile: +(84) 546-6789 Hotline: +(84) 456-6789
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-5">
              <FaClock className="text-2xl text-teal-600" />
              <div>
                <h2 className="text-lg font-semibold mb-1">Working Hours</h2>
                <p className="text-sm text-gray-600">
                  Monday-Friday: 9:00 - 22:00 Saturday-Sunday: 9:00 - 21:00
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 min-w-[320px] max-w-[600px]">
            <form className="flex flex-col gap-5">
              <div>
                <label className="text-base font-semibold mb-2 block">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Abc"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-teal-500"
                />
              </div>
              <div>
                <label className="text-base font-semibold mb-2 block">
                  Email Address
                </label>
                <input
                  type="text"
                  placeholder="Abc@def.com"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-teal-500"
                />
              </div>
              <div>
                <label className="text-base font-semibold mb-2 block">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="This is optional"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-teal-500"
                />
              </div>
              <div>
                <label className="text-base font-semibold mb-2 block">
                  Message
                </label>
                <textarea
                  placeholder="Hi! I'd like to ask about..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-teal-500 resize-none"
                  rows="4"
                ></textarea>
              </div>
              <button className="w-full max-w-[200px] p-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Three Items Section */}
      <div className="w-full max-w-5xl bg-gray-100 p-10 flex flex-col md:flex-row justify-evenly gap-5">
        <div className="flex flex-col items-center text-center gap-3 flex-1">
          <GrTrophy className="text-4xl text-black" />
          <h2 className="text-lg font-semibold">HIGH QUALITY</h2>
          <p className="text-sm text-gray-600">Crafted from top materials</p>
        </div>
        <div className="flex flex-col items-center text-center gap-3 flex-1">
          <BsCheckCircle className="text-4xl text-black" />
          <h2 className="text-lg font-semibold">Warranty Protection</h2>
          <p className="text-sm text-gray-600">Over 2 years</p>
        </div>
        <div className="flex flex-col items-center text-center gap-3 flex-1">
          <MdSupportAgent className="text-4xl text-black" />
          <h2 className="text-lg font-semibold">24/7 Support</h2>
          <p className="text-sm text-gray-600">Dedicated support</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
