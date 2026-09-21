import { useParams } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

export default function Product() {
  const { slug } = useParams();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Images */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="aspect-[4/5] bg-[var(--cream-100)] rounded-[var(--radius-md)] flex items-center justify-center">
            <span className="text-gray-400">Main Image</span>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square bg-[var(--cream-100)] rounded-[var(--radius-sm)] cursor-pointer hover:ring-2 ring-[var(--maroon-900)]"></div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl font-bold text-[var(--ink-900)] mb-2 capitalize">{slug.replace('-', ' ')}</h1>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex text-[var(--gold-500)]">
              {'★★★★☆'}
            </div>
            <span className="text-sm text-[var(--ink-500)] underline cursor-pointer">128 Reviews</span>
          </div>

          <div className="flex items-end gap-3 mb-6">
            <span className="text-3xl font-bold text-[var(--maroon-900)]">₹899</span>
            <span className="text-xl text-[var(--ink-300)] line-through mb-1">₹1499</span>
            <span className="text-sm text-[var(--green-600)] bg-[var(--green-50)] px-2 py-1 rounded font-medium mb-1">
              Save 40%
            </span>
          </div>

          <p className="text-[var(--ink-500)] mb-8 leading-relaxed">
            A premium blend of woody and floral notes, crafted for those who appreciate the finer things in life. Long-lasting and captivating.
          </p>

          <div className="mb-8">
            <h3 className="font-semibold mb-3">Size: 12ml</h3>
            <div className="flex gap-3">
              <button className="border-2 border-[var(--maroon-900)] bg-[var(--maroon-900)] text-[var(--white)] px-4 py-2 rounded-[var(--radius-sm)] font-medium">12ml</button>
              <button className="border border-gray-300 text-[var(--ink-900)] px-4 py-2 rounded-[var(--radius-sm)] font-medium hover:border-[var(--maroon-900)]">6ml</button>
            </div>
          </div>

          <button className="w-full bg-[var(--cta-gradient)] text-[var(--maroon-900)] h-14 rounded-[var(--radius-pill)] font-bold text-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all mb-4">
            <ShoppingBag size={20} />
            Add to Cart
          </button>
          
          <button className="w-full border-2 border-[var(--maroon-900)] text-[var(--maroon-900)] h-14 rounded-[var(--radius-pill)] font-bold text-lg flex items-center justify-center hover:bg-[var(--maroon-900)] hover:text-[var(--white)] transition-all">
            Buy Now
          </button>
          
          {/* Accordions would go here using Radix */}
          <div className="mt-12 border-t border-gray-200 pt-6">
            <h3 className="font-semibold mb-2">Fragrance Notes</h3>
            <ul className="list-disc list-inside text-[var(--ink-500)] space-y-1">
              <li>Top: Rose, Saffron</li>
              <li>Heart: Amber, Sandalwood</li>
              <li>Base: Oud, Musk</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
