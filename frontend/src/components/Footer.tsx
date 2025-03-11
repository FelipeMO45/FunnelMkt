const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-[10%]">
      <div className="container mx-auto flex flex-col md:flex-row justify-between">
        {/* Logo and Copyright */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-lg font-bold">FunnelMKT</h2>
          <p className="text-sm text-gray-400 mt-2">Copyright © 2025 FunnelMKT.</p>
          <p className="text-sm text-gray-400">All rights reserved</p>
        </div>

        {/* Company Links */}
        <div className="mb-6 md:mb-0">
          <h3 className="font-bold">Company</h3>
          <ul className="text-gray-400 text-sm space-y-2 mt-2">
            <li>About us</li>
            <li>Contact us</li>
            <li>Pricing</li>
            <li>Testimonials</li>
          </ul>
        </div>

        {/* Support Links */}
        <div className="mb-6 md:mb-0">
          <h3 className="font-bold">Support</h3>
          <ul className="text-gray-400 text-sm space-y-2 mt-2">
            <li>Help center</li>
            <li>Terms of service</li>
            <li>Legal</li>
            <li>Privacy policy</li>
            <li>Status</li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h3 className="font-bold">Mantente al día</h3>
          <div className="mt-2 flex">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 w-48 bg-gray-800 text-white rounded-l focus:outline-none"
            />
            <button className="bg-yellow-400 text-black px-4 py-2 rounded-r  hover:bg-yellow-600 transition">→</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;