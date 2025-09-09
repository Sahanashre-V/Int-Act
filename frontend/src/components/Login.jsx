import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, LogIn, ArrowLeft, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      console.log('Login attempt:', formData);
      alert('Login successful! (This is a demo)');
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-b from-[#FBF9D1] to-[#FBF9D1] text-[#9A3F3F]">
      <motion.div 
        className="max-w-md w-full"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Back to Home */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-[#9A3F3F] hover:text-[#A53860] mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-[#EF88AD]/40 hover:shadow-2xl transition-shadow duration-300">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#9A3F3F] to-[#9A3F3F] rounded-full mb-4 shadow-md">
              <LogIn size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-2 text-[#9A3F3F]">Welcome Back</h2>
            <p className="text-[#9A3F3F]/80">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#9A3F3F] mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={20} className="text-[#9A3F3F]/60" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl bg-transparent text-black placeholder-black/60 focus:outline-none transition-colors ${
                    errors.email 
                      ? 'border-red-400 focus:border-red-500' 
                      : 'border-[#9A3F3F] focus:border-[#9A3F3F]'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#9A3F3F] mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={20} className="text-[#9A3F3F]/60" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl bg-transparent text-black placeholder-black/60 focus:outline-none transition-colors ${
                    errors.password 
                      ? 'border-red-400 focus:border-red-500' 
                      : 'border-[#9A3F3F] focus:border-[#9A3F3F]'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#9A3F3F]/60 hover:text-[#9A3F3F] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#9A3F3F] border-2 border-[#9A3F3F] rounded focus:ring-[#9A3F3F] focus:ring-2 bg-transparent"
                />
                <span className="ml-2 text-[#9A3F3F]/80">Remember me</span>
              </label>
              <button
                type="button"
                className="text-[#9A3F3F] hover:text-[#9A3F3F] transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-[#9A3F3F] to-[#9A3F3F] hover:opacity-90 text-white font-semibold py-3 px-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#EF88AD]/30"
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-6 pt-6 border-t border-[#EF88AD]/40">
            <p className="text-[#9A3F3F]/80">
              Don’t have an account?{' '}
              <Link 
                to="/signup" 
                className="text-[#9A3F3F] hover:text-[#9A3F3F] font-semibold transition-colors"
              >
                Create one here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
