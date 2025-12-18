const Footer = () => {
  return (
    <footer className="bg-teal-700 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-green-400">MobRecharge</h3>
            <p className="text-gray-300 mb-4">Quick, secure, and reliable mobile recharge for all operators across India.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-green-400">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/recharge" className="hover:text-green-400 transition">Mobile Recharge</a></li>
              <li><a href="/plans" className="hover:text-green-400 transition">Browse Plans</a></li>
              <li><a href="/dashboard" className="hover:text-green-400 transition">My Account</a></li>
              <li><a href="/transactions" className="hover:text-green-400 transition">Transaction History</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-green-400">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/support" className="hover:text-green-400 transition">Help Center</a></li>
              <li><a href="/support" className="hover:text-green-400 transition">Contact Us</a></li>
              <li><a href="/support" className="hover:text-green-400 transition">FAQs</a></li>
              <li><a href="/support" className="hover:text-green-400 transition">24/7 Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-green-400">Legal</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-green-400 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Refund Policy</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-4 text-gray-400">
              <span>Secure Payments</span>
              <span>Instant Recharge</span>
              <span>100% Success Rate</span>
            </div>
            <p className="text-gray-400">&copy; 2025 MobRecharge. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
