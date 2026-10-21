import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, selectCartTotal, clearCart } from "../store/cartSlice";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  // 1. Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    payment: "cod",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  // 2. Handle input changes
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // 3. Handle submit
  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address) {
      alert("Please fill in all required fields!");
      return;
    }
    setOrderPlaced(true);
    dispatch(clearCart()); // clear cart on successful order
  }

  // If cart is empty and no order has been placed
  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="py-20 text-center">
        <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700">Your Cart is Empty</h2>
        <p className="text-gray-500 mt-2">Add items to your cart before checking out.</p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition"
        >
          Browse Products <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  const shipping = cartTotal > 5000 ? 0 : 99;
  const grandTotal = cartTotal + shipping;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Delivery Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Delivery Information</h2>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                className="w-full rounded-xl border border-gray-300 p-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-gray-300 p-3 text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className="w-full rounded-xl border border-gray-300 p-3 text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Address *</label>
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main St, Apartment 4B"
                className="w-full rounded-xl border border-gray-300 p-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City Name"
                className="w-full rounded-xl border border-gray-300 p-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div className="pt-4 border-t">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Method</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={formData.payment === "cod"}
                    onChange={handleChange}
                  />
                  Cash on Delivery
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={formData.payment === "online"}
                    onChange={handleChange}
                  />
                  Online Payment (UPI/Card)
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white hover:bg-blue-700 transition"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-gray-900 border-b pb-3">Order Summary</h2>

            <div className="max-h-60 overflow-y-auto divide-y">
              {cartItems.map((item) => (
                <div key={item.id} className="py-2 flex justify-between items-center text-sm">
                  <div>
                    <p className="font-semibold text-gray-800 line-clamp-1">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-bold text-gray-900">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-3 space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between font-bold text-base text-gray-900 pt-2 border-t">
                <span>Total</span>
                <span className="text-blue-600">₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {orderPlaced && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-xl">
            <CheckCircle2 size={64} className="mx-auto text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">Order Placed Successfully!</h2>
            <p className="text-gray-500 mt-2 text-sm">
              Thank you, <span className="font-semibold text-gray-800">{formData.name}</span>. Your order has been confirmed.
            </p>

            <button
              onClick={() => navigate("/products")}
              className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;