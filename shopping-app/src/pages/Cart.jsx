import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  addToCart,
  removeFromCart,
  deleteFromCart,
  clearCart,
} from "../store/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <ShoppingBag size={72} className="text-gray-300 mb-6" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link
          to="/products"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Browse Products <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  const shipping = cartTotal > 5000 ? 0 : 99;
  const total = cartTotal + shipping;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <button
          onClick={() => dispatch(clearCart())}
          className="text-sm text-red-500 hover:text-red-700 font-medium transition"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Cart Items */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm">

              {/* Image */}
              <div className="w-24 h-24 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 p-2">
                <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
              </div>

              {/* Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs uppercase font-semibold text-blue-600 tracking-wider">{item.category}</p>
                    <h3 className="font-semibold text-gray-900 mt-0.5">{item.name}</h3>
                  </div>
                  <button
                    onClick={() => dispatch(deleteFromCart(item.id))}
                    className="text-gray-400 hover:text-red-500 transition"
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="text-lg font-bold text-gray-900">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </span>

                  {/* Quantity Controls */}
                  <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50">
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="h-9 w-9 flex items-center justify-center rounded-l-lg text-gray-600 hover:bg-gray-200 transition"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="min-w-8 text-center text-sm font-semibold text-gray-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => dispatch(addToCart(item))}
                      className="h-9 w-9 flex items-center justify-center rounded-r-lg text-gray-600 hover:bg-gray-200 transition"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

            <div className="flex flex-col gap-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text-green-600 font-medium" : "font-medium text-gray-900"}>
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-gray-400">Add ₹{(5000 - cartTotal).toLocaleString()} more for free shipping</p>
              )}
              <div className="border-t pt-3 mt-1 flex justify-between text-base font-bold text-gray-900">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </Link>

            <Link
              to="/products"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Cart;