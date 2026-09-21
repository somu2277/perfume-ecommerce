import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[var(--maroon-900)] text-[var(--cream-50)] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">AdilQadri</h3>
          <p className="text-sm text-[var(--cream-100)] opacity-80">
            Premium Attars & Perfumes crafted with passion and tradition.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Shop</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/collections/attars">Attars</Link></li>
            <li><Link to="/collections/perfumes">Perfumes</Link></li>
            <li><Link to="/collections/bakhoor">Bakhoor</Link></li>
            <li><Link to="/collections/gifting">Gifting</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Help</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/track">Track Order</Link></li>
            <li><Link to="/returns">Returns</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/shipping">Shipping Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-[var(--maroon-800)] text-center text-sm opacity-60">
        &copy; {new Date().getFullYear()} AdilQadri E-Commerce. All rights reserved.
      </div>
    </footer>
  );
}
