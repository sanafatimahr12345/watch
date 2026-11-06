import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, Lock, Package, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'card',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const total = subtotal >= 200 ? subtotal : subtotal + 15;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedOrderNum = `AUD-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrderNum);
      setIsProcessing(false);
      setOrderConfirmed(true);
      onOrderSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#0D0D11] border border-[#D6AD65]/30 rounded-3xl shadow-2xl shadow-black overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#121216]">
          <div className="flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-[#D6AD65]" />
            <h2 className="font-serif-luxury text-lg font-bold text-white tracking-wider">
              {orderConfirmed ? 'ORDER CONFIRMED' : 'AUDIOMÉ SECURE CHECKOUT'}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close checkout modal"
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderConfirmed ? (
          /* Confirmation Receipt View */
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D6AD65]">
                Order {orderNumber}
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
                Thank You for Your Order
              </h3>
              <p className="text-sm text-zinc-400 max-w-md mx-auto">
                Your audiophile equipment is being hand-inspected, packed in luxury anti-static containers, and prepared for dispatch.
              </p>
            </div>

            <div className="bg-[#14141A] rounded-2xl p-6 border border-white/5 text-left max-w-md mx-auto space-y-3">
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Confirmation Email</span>
                <span className="text-white font-medium">{formData.email || 'customer@example.com'}</span>
              </div>
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Shipping Address</span>
                <span className="text-white font-medium">{formData.address || '124 High Street'}, {formData.city || 'Audioville'}</span>
              </div>
              <div className="flex justify-between text-xs text-zinc-400 border-t border-white/5 pt-3">
                <span>Total Charged</span>
                <span className="text-[#D6AD65] font-bold font-mono text-sm">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="gold-button px-8 py-3.5 rounded-xl text-xs uppercase font-bold tracking-wider"
            >
              Back to Catalog
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            
            {/* Order Items Preview */}
            <div className="bg-[#141418] rounded-xl p-4 border border-white/5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-[#D6AD65]" />
                <span className="text-zinc-300">
                  {items.length} {items.length === 1 ? 'item' : 'items'} in your order
                </span>
              </div>
              <span className="font-mono font-bold text-white text-sm">${total.toFixed(2)}</span>
            </div>

            {/* Shipping Information */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#D6AD65]">
                1. Delivery Details
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="bg-[#16161C] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D6AD65]"
                />
                <input
                  required
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="bg-[#16161C] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D6AD65]"
                />
              </div>

              <input
                required
                type="email"
                placeholder="Email Address (for order tracking & receipt)"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#16161C] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D6AD65]"
              />

              <input
                required
                type="text"
                placeholder="Street Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-[#16161C] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D6AD65]"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="bg-[#16161C] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D6AD65]"
                />
                <input
                  required
                  type="text"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="bg-[#16161C] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D6AD65]"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-3 pt-2 border-t border-white/5">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#D6AD65]">
                2. Payment Method
              </h4>
              <div className="grid grid-cols-3 gap-2.5">
                {['Credit Card', 'Apple Pay', 'PayPal'].map((method) => (
                  <button
                    type="button"
                    key={method}
                    onClick={() => setFormData({ ...formData, paymentMethod: method })}
                    className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                      formData.paymentMethod === method
                        ? 'border-[#D6AD65] bg-[#D6AD65]/10 text-white'
                        : 'border-white/10 bg-[#141418] text-zinc-400 hover:text-white'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>

              {formData.paymentMethod === 'Credit Card' && (
                <div className="space-y-2.5 bg-[#14141A] p-4 rounded-xl border border-white/5">
                  <div className="relative">
                    <CreditCard className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type="text"
                      placeholder="Card Number (4242 •••• •••• 4242)"
                      defaultValue="4242 •••• •••• 8821"
                      className="w-full bg-[#1A1A22] border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      required
                      type="text"
                      placeholder="MM/YY"
                      defaultValue="08/28"
                      className="bg-[#1A1A22] border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-mono"
                    />
                    <input
                      required
                      type="text"
                      placeholder="CVC"
                      defaultValue="982"
                      className="bg-[#1A1A22] border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-[#D6AD65]" />
                <span>SSL Encrypted Checkout</span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="gold-button px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Authorizing...</span>
                ) : (
                  <>
                    <span>Place Order (${total.toFixed(2)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
