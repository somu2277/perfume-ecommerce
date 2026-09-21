import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Menu, User } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart } from '../../store/slices/cartSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  return (
    <header className="sticky top-0 z-50 bg-[var(--white)] shadow-sm">
      {/* Announcement Bar */}
      <div className="bg-[var(--gold-600)] text-[var(--white)] text-center text-sm py-2 px-4 font-medium tracking-wide">
        Extra Discount On UPI
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button className="text-[var(--ink-900)] p-2">
              <Menu size={24} />
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center sm:justify-start flex-1 sm:flex-none">
            <Link to="/" className="text-2xl font-bold tracking-tight text-[var(--maroon-900)]">
              AdilQadri
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex space-x-8">
            <Link to="/collections/attars" className="text-[var(--ink-900)] hover:text-[var(--maroon-700)] font-medium">Attars</Link>
            <Link to="/collections/perfumes" className="text-[var(--ink-900)] hover:text-[var(--maroon-700)] font-medium">Perfumes</Link>
            <Link to="/collections/gifting" className="text-[var(--ink-900)] hover:text-[var(--maroon-700)] font-medium">Gifting</Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-[var(--ink-900)] hover:text-[var(--maroon-700)] hidden sm:block p-2">
              <Search size={20} />
            </button>
            <button className="text-[var(--ink-900)] hover:text-[var(--maroon-700)] p-2">
              <User size={20} />
            </button>
            <button 
              className="text-[var(--ink-900)] hover:text-[var(--maroon-700)] p-2 relative"
              onClick={() => dispatch(toggleCart())}
            >
              <ShoppingBag size={20} />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-[var(--maroon-900)] rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
