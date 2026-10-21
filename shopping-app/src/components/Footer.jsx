import {


  Mail,
  Phone,
  MapPin,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">

      {/* Main Footer */}
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            Shopify
          </h2>

          <p className="mt-4 max-w-xs text-sm leading-6 text-gray-400">
            Your one-stop destination for quality products,
            great prices, and a better shopping experience.
          </p>

          {/* Social Icons */}
          <div className="mt-6 flex gap-4">




          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white">
            Quick Links
          </h3>

          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href="/home" className="hover:text-white">
                Home
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-white">
                Products
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-white">
                Categories
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-white">
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="font-semibold text-white">
            Customer Service
          </h3>

          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Contact Us
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-white">
                Shipping & Delivery
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-white">
                Returns & Refunds
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-white">
            Contact Us
          </h3>

          <div className="mt-4 space-y-4 text-sm">

            <div className="flex items-center gap-3">
              <MapPin size={18} />
              <span>Kerala, India</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} />
              <span>+91 98765 43210</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={18} />
              <span>support@shopify.com</span>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-sm text-gray-500 md:flex-row">

          <p>
            © 2026 Shopify. All rights reserved.
          </p>

          <p>
            Built with React & Tailwind CSS
          </p>

        </div>
      </div>

    </footer>
  );
}

export default Footer;