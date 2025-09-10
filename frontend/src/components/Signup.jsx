import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, UserPlus, ArrowLeft, Mail, Lock, User, Phone, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Signup = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: null, y: null });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'At least 8 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setErrors(newErrors);
    }
  };

  // Particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particleCount = 100;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 1,
        dy: (Math.random() - 0.5) * 1,
      });
    }

    const handleMouseMove = (e) => {
      mouse.current.x = e.x;
      mouse.current.y = e.y;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = '#9A3F3F';
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        if (mouse.current.x && mouse.current.y) {
          const distX = p.x - mouse.current.x;
          const distY = p.y - mouse.current.y;
          const distance = Math.sqrt(distX * distX + distY * distY);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(154,63,63,${1 - distance / 100})`;
            ctx.lineWidth = 2;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.current.x, mouse.current.y);
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white text-[#9A3F3F] px-4 py-8">
      <canvas ref={canvasRef} className="absolute inset-0" />

      <div className="relative z-10 max-w-lg w-full">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-[#9A3F3F] hover:text-[#A53860] mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-[#EF88AD]/40 hover:shadow-2xl transition-shadow duration-300"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#9A3F3F] to-[#9A3F3F] rounded-full mb-4 shadow-md">
              <UserPlus size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-[#9A3F3F] mb-2">Create Account</h2>
            <p className="text-[#9A3F3F]/80">Join us today and get started</p>
          </div>

          <AnimatePresence>
            {success ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <CheckCircle2 size={80} className="text-[#EF88AD] drop-shadow-lg animate-pulse" />
                <p className="text-[#9A3F3F] font-semibold mt-4">Account created successfully!</p>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#9A3F3F] mb-2">First Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A3F3F]/60" size={20} />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-transparent text-black placeholder-black/60 border-2 ${
                          errors.firstName ? 'border-red-400 focus:border-red-500' : 'border-[#9A3F3F] focus:border-[#9A3F3F]'
                        } focus:outline-none`}
                        placeholder="First name"
                      />
                    </div>
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#9A3F3F] mb-2">Last Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A3F3F]/60" size={20} />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-transparent text-black placeholder-black/60 border-2 ${
                          errors.lastName ? 'border-red-400 focus:border-red-500' : 'border-[#9A3F3F] focus:border-[#9A3F3F]'
                        } focus:outline-none`}
                        placeholder="Last name"
                      />
                    </div>
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-[#9A3F3F] mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A3F3F]/60" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-transparent text-black placeholder-black/60 border-2 ${
                        errors.email ? 'border-red-400 focus:border-red-500' : 'border-[#9A3F3F] focus:border-[#9A3F3F]'
                      } focus:outline-none`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-[#9A3F3F] mb-2">Phone (optional)</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A3F3F]/60" size={20} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-transparent text-black placeholder-black/60 border-2 border-[#9A3F3F] focus:border-[#9A3F3F] focus:outline-none"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* Passwords */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#9A3F3F] mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A3F3F]/60" size={20} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-12 py-3 rounded-xl bg-transparent text-black placeholder-black/60 border-2 ${
                          errors.password ? 'border-red-400 focus:border-red-500' : 'border-[#9A3F3F] focus:border-[#9A3F3F]'
                        } focus:outline-none`}
                        placeholder="Create password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A3F3F]/60 hover:text-[#9A3F3F]"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#9A3F3F] mb-2">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A3F3F]/60" size={20} />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-12 py-3 rounded-xl bg-transparent text-black placeholder-black/60 border-2 ${
                          errors.confirmPassword ? 'border-red-400 focus:border-red-500' : 'border-[#9A3F3F] focus:border-[#9A3F3F]'
                        } focus:outline-none`}
                        placeholder="Confirm password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A3F3F]/60 hover:text-[#9A3F3F]"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-[#9A3F3F] border-2 border-[#9A3F3F] rounded focus:ring-[#9A3F3F] focus:ring-2"
                  />
                  <span className="text-sm text-[#9A3F3F]/80">
                    I agree to the <button type="button" className="text-[#9A3F3F] hover:underline font-semibold">Terms</button> and <button type="button" className="text-[#9A3F3F] font-semibold hover:underline">Privacy Policy</button>
                  </span>
                </div>
                {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>}

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#9A3F3F] to-[#9A3F3F] text-white font-semibold py-3 px-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
                >
                  Create Account
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="text-center mt-6 pt-6 border-t border-[#EF88AD]/40">
            <p className="text-[#9A3F3F]/80">
              Already have an account?{' '}
              <Link to="/login" className="text-[#9A3F3F] hover:text-[#9A3F3F] font-semibold transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
