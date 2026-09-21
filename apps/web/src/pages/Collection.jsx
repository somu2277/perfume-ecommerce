import { useParams } from 'react-router-dom';

export default function Collection() {
  const { slug } = useParams();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-[var(--ink-900)] capitalize">{slug.replace('-', ' ')}</h1>
        <p className="mt-2 text-[var(--ink-500)]">Explore our collection of premium {slug.replace('-', ' ')}.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-[var(--white)] p-4 rounded-[var(--radius-md)] shadow-[var(--shadow-card)]">
            <h2 className="font-semibold mb-4 text-[var(--ink-900)]">Filters</h2>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2 text-[var(--ink-500)]">Availability</h3>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded border-gray-300 text-[var(--maroon-900)] focus:ring-[var(--maroon-900)]" />
                In Stock
              </label>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2 text-[var(--ink-500)]">Price</h3>
              <input type="range" className="w-full accent-[var(--maroon-900)]" />
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2 text-[var(--ink-500)]">Fragrance Family</h3>
              {['Woody', 'Floral', 'Fresh', 'Oriental'].map(f => (
                <label key={f} className="flex items-center gap-2 text-sm mb-1">
                  <input type="checkbox" className="rounded border-gray-300 text-[var(--maroon-900)] focus:ring-[var(--maroon-900)]" />
                  {f}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-[var(--ink-500)]">Showing 24 products</span>
            <select className="border-gray-300 rounded-[var(--radius-sm)] text-sm focus:border-[var(--maroon-900)] focus:ring-[var(--maroon-900)]">
              <option>Featured</option>
              <option>Best Selling</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((p) => (
              <div key={p} className="bg-[var(--white)] rounded-[var(--radius-sm)] shadow-[var(--shadow-card)] overflow-hidden flex flex-col h-full">
                <div className="aspect-[3/4] bg-[var(--cream-100)]"></div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-medium text-[var(--ink-900)] mb-1">Premium Product {p}</h3>
                  <div className="flex items-center gap-2 mb-3 mt-auto">
                    <span className="font-bold text-[var(--maroon-900)]">₹899</span>
                    <span className="text-sm text-[var(--ink-300)] line-through">₹1299</span>
                  </div>
                  <button className="w-full py-2 bg-[var(--maroon-900)] text-[var(--white)] rounded-[var(--radius-pill)] font-medium hover:bg-[var(--maroon-800)] transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
