import * as Dialog from '@radix-ui/react-dialog';
import { X, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export default function LoginModal({ isOpen, onOpenChange }) {
  const [phone, setPhone] = useState('');
  const [notify, setNotify] = useState(true);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 z-50 transition-opacity" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[800px] bg-[var(--white)] rounded-[var(--radius-lg)] shadow-2xl z-50 flex flex-col md:flex-row overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          
          <Dialog.Close asChild>
            <button className="absolute right-4 top-4 text-gray-500 hover:text-[var(--ink-900)] p-1 bg-white rounded-full shadow-sm z-10 transition-colors">
              <X size={20} />
            </button>
          </Dialog.Close>

          {/* Left Panel */}
          <div className="w-full md:w-1/2 bg-[#B87B2E] text-white p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-6 text-white">
                 <svg viewBox="0 0 100 100" fill="currentColor"><path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" opacity="0.2"/><text x="50" y="55" fontSize="24" textAnchor="middle" fill="white" fontWeight="bold">AQ</text></svg>
              </div>
              <h2 className="text-3xl font-bold mb-8 leading-tight">Login now to access best offers!</h2>
              
              <div className="bg-white/10 border border-white/20 p-4 rounded-[var(--radius-md)] flex items-start gap-4 mt-8 w-full max-w-sm">
                <ShieldCheck size={32} className="text-[var(--gold-400)] shrink-0" />
                <div className="text-left">
                  <h3 className="font-bold text-sm mb-1 text-[var(--gold-400)]">100% Secure & Spam Free</h3>
                  <p className="text-xs text-white/80 leading-relaxed">Your data is safeguarded and your inbox remains spam-free</p>
                </div>
              </div>
            </div>
            {/* Carousel Dots */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-transparent border border-white"></div>
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <div className="w-2 h-2 rounded-full bg-transparent border border-white"></div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
            <div className="max-w-sm mx-auto w-full">
              <h2 className="text-2xl font-bold text-center text-[#0B2545] mb-8">Login / Signup</h2>
              
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex-shrink-0 w-16 px-2 py-3 border border-gray-300 rounded-[var(--radius-sm)] flex items-center justify-center bg-gray-50 text-[var(--ink-900)] font-medium">
                    +91
                  </div>
                  <input 
                    type="tel"
                    placeholder="Enter Mobile Number"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-[var(--radius-sm)] focus:outline-none focus:border-[#C49B5A] focus:ring-1 focus:ring-[#C49B5A] text-[var(--ink-900)] placeholder-gray-400 font-medium"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#C49B5A] hover:bg-[#B38C4F] text-white font-bold py-3.5 rounded-[var(--radius-sm)] transition-colors shadow-sm"
                >
                  Submit
                </button>

                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 text-sm text-[var(--ink-500)] cursor-pointer group">
                    <input 
                      type="checkbox"
                      checked={notify}
                      onChange={(e) => setNotify(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-[#C49B5A] focus:ring-[#C49B5A]"
                    />
                    <span className="group-hover:text-[var(--ink-900)] transition-colors">Notify me for any updates & offers</span>
                  </label>
                  <a href="#" className="text-sm text-blue-600 hover:underline">Read details</a>
                </div>
              </form>

              <div className="mt-8 text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                <span>Powered by</span>
                <span className="text-[#C49B5A] font-bold">⚡</span>
              </div>
            </div>
          </div>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
