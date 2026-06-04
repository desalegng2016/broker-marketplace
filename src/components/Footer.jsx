import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* BRAND SECTION */}
        <div>
          <h2 className="text-2xl font-bold text-blue-400">
            Ashu Delala / Broker
          </h2>

          <p className="mt-2 text-gray-300">
            Maychew, Tigray, Ethiopia
          </p>

          <p className="mt-2 text-gray-300">
            📞 0953782957
          </p>

          <p className="text-gray-300">
            📧 desalegng2016@gmail.com
          </p>

          <p className="mt-4 text-sm text-gray-400">
            Developed by Dosantos Technologies
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>

          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Contact Us</li>
            <li className="hover:text-white cursor-pointer">Properties</li>
          </ul>
        </div>

        {/* SOCIAL MEDIA */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>

          <div className="space-y-2 text-gray-300">
            <p>📱 TikTok</p>
            <p>📢 Telegram</p>
            <p>📘 Facebook</p>
            <p>📸 Instagram</p>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-700 text-center py-4 text-gray-400 text-sm">
        © {new Date().getFullYear()} Ashu Broker. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;