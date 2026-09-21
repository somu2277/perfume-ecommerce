import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';
import LoginModal from './components/auth/LoginModal';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Product from './pages/Product';

const Cart = () => <div className="p-8">Cart Page</div>;

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--cream-50)] text-[var(--ink-900)]">
      <Navbar onLoginClick={() => setIsLoginOpen(true)} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections/:slug" element={<Collection />} />
          <Route path="/products/:slug" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <LoginModal isOpen={isLoginOpen} onOpenChange={setIsLoginOpen} />
    </div>
  );
}

export default App;
