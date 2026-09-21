import { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Settings2, ArrowUpDown, X, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';

const sortOptions = [
  'Featured',
  'Most relevant',
  'Best selling',
  'Alphabetically, A-Z',
  'Alphabetically, Z-A',
  'Price, low to high',
  'Price, high to low',
  'Date, old to new',
  'Date, new to old'
];

export default function Collection() {
  const { slug } = useParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Featured');
  
  // Accordion state for filters
  const [openSections, setOpenSections] = useState({
    Availability: true, Price: true, Fragrance: false, Gender: false, Notes: false
  });

  const toggleSection = (sec) => setOpenSections(prev => ({ ...prev, [sec]: !prev[sec] }));

  return (
    <div className="bg-[var(--cream-50)] min-h-screen pb-12">
      {/* Banner */}
      <div className="bg-[var(--maroon-900)] text-white py-8 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center relative overflow-hidden">
        {/* Pattern overlay could go here */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        
        <h1 className="text-2xl md:text-3xl font-normal capitalize relative z-10 mb-4 md:mb-0">
          Adilqadri Premium {slug?.replace('-', ' ')} (Roll-on Perfumes)
        </h1>
        
        <div className="flex items-center gap-3 relative z-10">
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 bg-white text-[var(--ink-900)] px-4 py-2 rounded-[var(--radius-sm)] text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <Settings2 size={16} /> Filters
          </button>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="flex items-center gap-2 bg-white text-[var(--ink-900)] px-4 py-2 rounded-[var(--radius-sm)] text-sm font-medium hover:bg-gray-50 transition-colors outline-none">
              <ArrowUpDown size={16} />
              Sort by: {sortBy}
              <ChevronDown size={14} className="ml-1" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content align="end" className="bg-white min-w-[200px] rounded-[var(--radius-sm)] shadow-[var(--shadow-card)] p-1 z-50">
                {sortOptions.map(option => (
                  <DropdownMenu.Item 
                    key={option}
                    onClick={() => setSortBy(option)}
                    className="text-sm text-[var(--ink-900)] px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-sm outline-none"
                  >
                    {option} {sortBy === option && '✓'}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>

      {/* Filter Drawer */}
      <Dialog.Root open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 transition-opacity" />
          <Dialog.Content className="fixed left-0 top-0 bottom-0 w-[300px] bg-white shadow-xl z-50 flex flex-col data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <div className="flex items-center gap-2 text-[var(--ink-900)]">
                <Settings2 size={18} />
                <Dialog.Title className="font-semibold">Filters</Dialog.Title>
              </div>
              <Dialog.Close asChild>
                <button className="text-gray-500 hover:text-[var(--ink-900)] p-1">
                  <X size={20} />
                </button>
              </Dialog.Close>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {Object.entries(openSections).map(([title, isOpen]) => (
                <div key={title} className="border-b border-gray-100">
                  <button 
                    onClick={() => toggleSection(title)}
                    className="w-full flex justify-between items-center p-4 text-sm font-medium text-[var(--ink-900)] hover:bg-gray-50 transition-colors"
                  >
                    {title}
                    {isOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4">
                      {title === 'Availability' && (
                        <label className="flex items-center gap-2 text-sm text-[var(--ink-600)]">
                          <input type="checkbox" className="rounded border-gray-300 text-[var(--maroon-900)] focus:ring-[var(--maroon-900)]" />
                          In stock (42)
                        </label>
                      )}
                      {title === 'Price' && (
                        <div className="flex items-center gap-2">
                          <div className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm flex items-center">
                            <span className="text-gray-500 mr-1">₹</span>
                            <input type="number" placeholder="0" className="w-full outline-none" />
                          </div>
                          <span className="text-gray-400">to</span>
                          <div className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm flex items-center">
                            <span className="text-gray-500 mr-1">₹</span>
                            <input type="number" placeholder="5000" className="w-full outline-none" />
                          </div>
                        </div>
                      )}
                      {['Fragrance', 'Gender', 'Notes'].includes(title) && (
                        <div className="space-y-2">
                          {['Woody', 'Floral', 'Musk'].map(f => (
                            <label key={f} className="flex items-center gap-2 text-sm text-[var(--ink-600)]">
                              <input type="checkbox" className="rounded border-gray-300 text-[var(--maroon-900)] focus:ring-[var(--maroon-900)]" />
                              {f}
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 bg-white border-t border-gray-100">
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="w-full bg-[#2C1819] text-white py-3 font-semibold rounded-[var(--radius-sm)] hover:bg-black transition-colors"
              >
                VIEW RESULTS
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((p) => (
            <div key={p} className="bg-white rounded-[var(--radius-md)] overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
              <div className="aspect-[4/5] bg-gray-100 relative overflow-hidden">
                {/* Image Placeholder */}
                <img 
                  src={`https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&q=80`} 
                  alt="Attar" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {p % 2 === 0 ? (
                    <span className="bg-[#2C1819] text-[#E5B566] text-[10px] font-bold px-2 py-1 rounded-[var(--radius-pill)] flex items-center gap-1">
                      ⚡ Best Seller
                    </span>
                  ) : (
                    <span className="bg-[#2C1819] text-[#E5B566] text-[10px] font-bold px-2 py-1 rounded-[var(--radius-pill)] flex items-center gap-1">
                      ⚡ Trending
                    </span>
                  )}
                </div>
              </div>

              <div className="p-3 md:p-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">Attar</span>
                  <div className="flex items-center text-[10px] text-gray-500">
                    <span className="text-[#E5B566] mr-1">★</span>
                    4.8 | 417
                  </div>
                </div>
                
                <h3 className="font-semibold text-[var(--ink-900)] text-sm md:text-base leading-tight mb-2 truncate">
                  AQ 365 Luxury Attar Perfume
                </h3>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-bold text-base md:text-lg">₹399</span>
                  <span className="text-xs text-gray-400 line-through">₹599</span>
                  <span className="text-[10px] font-bold text-[#208053] bg-[#E5F5EC] px-1.5 py-0.5 rounded">
                    33% off
                  </span>
                </div>
                
                <button className="w-full bg-[#D4AE6A] hover:bg-[#C49B5A] text-[#2C1819] font-bold py-2.5 rounded-[var(--radius-sm)] flex items-center justify-center gap-2 text-sm transition-colors">
                  ADD TO CART
                  <ShoppingCart size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
