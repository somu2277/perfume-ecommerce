import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-[var(--maroon-900)] flex items-center justify-center text-[var(--cream-50)] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="relative z-20 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover the Essence of Luxury</h1>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Experience our premium collection of long-lasting attars and perfumes crafted for the modern soul.
          </p>
          <Link to="/collections/all" className="inline-block bg-[var(--cta-gradient)] text-[var(--maroon-900)] font-bold px-8 py-3 rounded-[var(--radius-pill)] shadow-md hover:shadow-lg transition-shadow">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Attars', 'Perfumes', 'Bakhoor', 'Gifting'].map((cat) => (
            <Link key={cat} to={`/collections/${cat.toLowerCase()}`} className="group cursor-pointer">
              <div className="aspect-square bg-[var(--cream-100)] rounded-[var(--radius-md)] mb-4 overflow-hidden flex items-center justify-center">
                <span className="text-gray-400">Image</span>
              </div>
              <h3 className="text-center font-medium group-hover:text-[var(--maroon-700)]">{cat}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Bundle Section */}
      <section className="bg-[var(--cream-100)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">Get 3 Attars at ₹899</h2>
            <p className="mb-6 opacity-80 text-[var(--ink-500)]">Mix and match your favorite 12ml roll-on attars and save more.</p>
            <button className="bg-[var(--maroon-900)] text-[var(--white)] px-8 py-3 rounded-[var(--radius-pill)] font-medium hover:bg-[var(--maroon-800)] transition-colors">
              Build Your Bundle
            </button>
          </div>
          <div className="flex-1">
            <div className="aspect-[4/3] bg-gray-200 rounded-[var(--radius-md)]"></div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Best Sellers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1,2,3,4].map((p) => (
            <div key={p} className="bg-[var(--white)] rounded-[var(--radius-sm)] shadow-[var(--shadow-card)] overflow-hidden">
              <div className="aspect-[3/4] bg-[var(--cream-100)] flex items-center justify-center relative">
                <span className="absolute top-2 left-2 bg-[var(--maroon-900)] text-white text-xs px-2 py-1 rounded font-medium">Best Seller</span>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-[var(--ink-900)] mb-1">Shanaya Attar</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold">₹499</span>
                  <span className="text-sm text-[var(--ink-300)] line-through">₹799</span>
                  <span className="text-xs text-[var(--green-600)] bg-[var(--green-50)] px-1.5 py-0.5 rounded font-medium">37% OFF</span>
                </div>
                <button className="w-full py-2 border border-[var(--maroon-900)] text-[var(--maroon-900)] rounded-[var(--radius-pill)] font-medium hover:bg-[var(--maroon-900)] hover:text-white transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
