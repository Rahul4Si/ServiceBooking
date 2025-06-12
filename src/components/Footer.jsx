import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaWhatsapp,
  FaTiktok,
  FaAndroid,
  FaApple,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="px-4 sm:px-10 md:px-20 lg:px-40 py-10 text-sm text-gray-700 w-full">
      <hr className="border-t-2 border-orange-200 mb-8" />
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 md:gap-0">
        {/* Logo & App Links */}
        <div className="mb-8 md:mb-0 md:w-1/5 flex flex-col items-start">
          <div className="mb-4">
            <h1 className="text-xl font-bold text-green-600">
              door<span className="text-orange-500">2</span>day
            </h1>
          </div>
          <p className="mb-2 font-semibold">Download app</p>
          <div className="flex gap-4 mb-4">
            <FaAndroid size={24} />
            <FaApple size={24} />
          </div>
          <p className="mb-2 font-semibold">Follow us on</p>
          <div className="flex space-x-3 text-gray-600">
            <FaFacebookF />
            <FaInstagram />
            <FaPinterestP />
            <FaWhatsapp />
            <FaTiktok />
          </div>
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 flex-1">
          {/* Company */}
          <div>
            <h3 className="font-semibold mb-2">Company</h3>
            <ul className="space-y-1">
              <li>Careers</li>
              <li>Customer Support</li>
              <li>Blog</li>
              <li>Sitemap</li>
            </ul>
          </div>

          {/* For Business */}
          <div>
            <h3 className="font-semibold mb-2">For business</h3>
            <ul className="space-y-1">
              <li>For partners</li>
              <li>Pricing</li>
              <li>Support</li>
              <li>Status</li>
              <li>Careers</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-2">Legal</h3>
            <ul className="space-y-1">
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Cookie Policy</li>
              <li>Questions & Answers</li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="font-semibold mb-2">Location</h3>
            <ul className="space-y-1">
              <li>Hair Salons in Brisbane</li>
              <li>Nail Salons in Brisbane</li>
              <li>Barbershops in Brisbane</li>
              <li>Beauty Salons in Brisbane</li>
              <li>Spas in Brisbane</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
