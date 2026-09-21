import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart } from '../../store/slices/cartSlice';

export default function CartDrawer() {
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.cart.isOpen);
  const items = useSelector(state => state.cart.items);
  const totals = useSelector(state => state.cart.totals);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => dispatch(toggleCart(open))}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 transition-opacity" />
        <Dialog.Content className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[var(--white)] shadow-xl z-50 flex flex-col focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <Dialog.Title className="text-lg font-bold text-[var(--ink-900)]">Your Cart</Dialog.Title>
            <Dialog.Close asChild>
              <button className="p-2 text-[var(--ink-500)] hover:text-[var(--ink-900)] rounded-full hover:bg-gray-100 transition-colors">
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-[var(--ink-500)]">
                <p className="mb-4">Your cart is empty.</p>
                <Dialog.Close asChild>
                  <button className="px-6 py-2 border border-[var(--maroon-900)] text-[var(--maroon-900)] rounded-[var(--radius-pill)] hover:bg-[var(--maroon-900)] hover:text-white transition-colors">
                    Continue Shopping
                  </button>
                </Dialog.Close>
              </div>
            ) : (
              <div>
                {/* Cart items map here */}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-gray-200 p-4 bg-[var(--cream-50)]">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold">₹{totals.subtotal}</span>
              </div>
              <button className="w-full bg-[var(--cta-gradient)] text-[var(--maroon-900)] h-12 rounded-[var(--radius-pill)] font-bold text-lg shadow-md hover:shadow-lg transition-shadow">
                Checkout
              </button>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
