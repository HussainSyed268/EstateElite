import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Address from "../assets/icons/address.png";
import Phone from "../assets/icons/phone.png";
import Clock from "../assets/icons/clock.png";


const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You have to create an account on EmailJS and associate your email with it wityh one of thr email services like Gmail, Outlook, etc. then you will get the service ID. Create a template in Email Template section to get the template ID. In your profile settings you will get the user ID (public key).

    emailjs.send(
        "service_ID here",  // Replace with your EmailJS service ID
        "template_ID here" , // Replace with your EmailJS template ID
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      },
      "user_publicKey here"      // Replace with your EmailJS user ID
    )
    .then((result) => {
      console.log(result.text);
      toast.success('Message sent successfully!', {
        position: "bottom-right",
        autoClose: 5000,
      });
    }, (error) => {
      console.log(error.text);
      toast.error('Failed to send the message, please try again.', {
        position: "bottom-right",
        autoClose: 5000,
      });
    });

    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <section className="bg-white dark:bg-slate-800 font-raleway" id="contact">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-4">
          <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
            <p className="text-base font-semibold uppercase tracking-wide text-black dark:text-blue-200">
              Contact
            </p>
            <h2 className="font-heading mb-4 font-bold tracking-tight text-[#F9A826] dark:text-white text-3xl sm:text-5xl">
              Get in Touch
            </h2>
          </div>
        </div>
        <div className="flex items-stretch justify-center">
          <div className="grid md:grid-cols-2">
            <div className="h-full pr-6">
              <p className="mt-3 mb-12 text-lg text-gray-600 dark:text-slate-400">
              We’d love to hear from you! Whether you have a question about our properties, need assistance, or just want to give feedback, our team is here to help.
              </p>
              <ul className="mb-6 md:mb-0">
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-black text-gray-50">
                    <img src={Address} alt="Address" />
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">Our Address</h3>
                    <p className="text-gray-600 dark:text-slate-400">1230 Maecenas Street Donec Road</p>
                    <p className="text-gray-600 dark:text-slate-400">New York, EEUU</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-black text-gray-50">
                    <img className='w-7 h-7' src={Phone} alt="Phone" />
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">Contact</h3>
                    <p className="text-gray-600 dark:text-slate-400">Mobile: +1 (123) 456-7890</p>
                    <p className="text-gray-600 dark:text-slate-400">Mail: tailnext@gmail.com</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-black text-gray-50">
                    <img className='w-7 h-7' src={Clock} alt="Clock" />
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">Working hours</h3>
                    <p className="text-gray-600 dark:text-slate-400">Monday - Friday: 08:00 - 17:00</p>
                    <p className="text-gray-600 dark:text-slate-400">Saturday & Sunday: 08:00 - 12:00</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="card h-fit max-w-6xl p-5 md:p-12" id="form">
              <h2 className="mb-4 text-2xl font-bold text-[#F9A826] dark:text-white">Ready to Get Started?</h2>
              <form id="contactForm" onSubmit={handleSubmit}>
                <div className="mb-6">
                  <div className="mx-0 mb-1 sm:mb-4">
                    <div className="mx-0 mb-1 sm:mb-4">
                      <label htmlFor="name" className="pb-1 text-xs uppercase tracking-wider"></label>
                      <input
                        type="text"
                        id="name"
                        autoComplete="given-name"
                        placeholder="Your name"
                        className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mx-0 mb-1 sm:mb-4">
                      <label htmlFor="email" className="pb-1 text-xs uppercase tracking-wider"></label>
                      <input
                        type="email"
                        id="email"
                        autoComplete="email"
                        placeholder="Your email address"
                        className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="mx-0 mb-1 sm:mb-4">
                    <label htmlFor="textarea" className="pb-1 text-xs uppercase tracking-wider"></label>
                    <textarea
                      id="textarea"
                      name="message"
                      cols="30"
                      rows="5"
                      placeholder="Write your message..."
                      className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="w-full bg-black text-[#F9A826] px-6 py-3 font-xl rounded-md sm:mb-0">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
