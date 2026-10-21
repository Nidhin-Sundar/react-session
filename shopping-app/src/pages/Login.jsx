import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff, ShoppingBag } from "lucide-react";

// Static credentials
const VALID_EMAIL = "nidhin@shopify.com";
const VALID_PASSWORD = "123456";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();


    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      sessionStorage.setItem("isLoggedIn", "true"); // save login in sessionStorage
      navigate("/home");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex w-full items-center justify-center py-6">
      <div className="w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-lg flex">

        {/* Left Panel — Branding */}
        <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center bg-blue-600 p-12 text-white">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 mb-6">
            <ShoppingBag size={42} className="text-white" />
          </div>
          <h2 className="text-3xl font-extrabold">Welcome to Shopify</h2>
          <p className="mt-3 text-center text-sm text-blue-100">
            Discover thousands of products. Shop smarter, shop faster.
          </p>

          {/* Decorative dots */}
          <div className="mt-12 flex gap-2">
            <span className="h-2 w-8 rounded-full bg-white"></span>
            <span className="h-2 w-2 rounded-full bg-white/40"></span>
            <span className="h-2 w-2 rounded-full bg-white/40"></span>
          </div>
        </div>

        {/* Right Panel — Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-gray-900">Login</h1>
            <p className="mt-1 text-sm text-gray-500">
              Enter your credentials to continue
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  placeholder="enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-10 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
                {/* Toggle Show/Hide Password */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <Eye size={17} /> : <EyeOff size={17} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-2xl bg-blue-600 py-3.5 font-bold text-white transition hover:bg-blue-700 active:scale-95"
            >
              Login
            </button>

          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <hr className="flex-1 border-gray-200" />
            <span className="text-xs text-gray-400">OR</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <button className="font-bold text-blue-600 hover:underline">
              Sign Up
            </button>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;