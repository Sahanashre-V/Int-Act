import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, Mail, Lock, User, Phone, CheckCircle2, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Signup = () => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const mouse = useRef({ x: null, y: null });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    className: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    role: ''
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
    // if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree';
    if (!formData.role) newErrors.role = 'Please select a role';
    if (!formData.className) newErrors.className = 'Please select a class';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:8080/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccess(true);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            className: '',
            password: '',
            confirmPassword: '',
            agreeToTerms: false,
            role: ''
          });

          // redirect to chat page after 1 second
          setTimeout(() => {
            navigate("/Chat");  // ⬅️ go to chat page
          }, 1000);

        } else {
          alert(data.message || "Signup failed. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please check your backend connection.");
      }
    } else {
      setErrors(newErrors);
    }
  };

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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-[#EF88AD]/40 hover:shadow-2xl transition-shadow duration-300"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#9A3F3F] mb-2">
              Create Account
            </h2>
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
                <CheckCircle2
                  size={80}
                  className="text-[#EF88AD] drop-shadow-lg animate-pulse"
                />
                <p className="text-[#9A3F3F] font-semibold mt-4">
                  Account created successfully!
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-[#9A3F3F] hover:text-[#A53860] mt-4 transition-colors group"
                >
                  <ArrowLeft
                    size={20}
                    className="group-hover:-translate-x-1 transition-transform"
                  />
                  Back to Home
                </Link>
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
                    <label className="block text-sm font-medium text-[#9A3F3F] mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A3F3F]/60"
                        size={20}
                      />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-transparent text-black placeholder-black/60 border-2 ${
                          errors.firstName
                            ? "border-red-400 focus:border-red-500"
                            : "border-[#9A3F3F] focus:border-[#9A3F3F]"
                        } focus:outline-none`}
                        placeholder="First name"
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#9A3F3F] mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A3F3F]/60"
                        size={20}
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-transparent text-black placeholder-black/60 border-2 ${
                          errors.lastName
                            ? "border-red-400 focus:border-red-500"
                            : "border-[#9A3F3F] focus:border-[#9A3F3F]"
                        } focus:outline-none`}
                        placeholder="Last name"
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-[#9A3F3F] mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A3F3F]/60"
                      size={20}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-transparent text-black placeholder-black/60 border-2 ${
                        errors.email
                          ? "border-red-400 focus:border-red-500"
                          : "border-[#9A3F3F] focus:border-[#9A3F3F]"
                      } focus:outline-none`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-[#9A3F3F] mb-2">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A3F3F]/60"
                      size={20}
                    />
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

                {/* Class Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-[#9A3F3F] mb-2">
                    Class
                  </label>
                  <select
                    name="className"
                    value={formData.className}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl bg-transparent border-2 ${
                      errors.className
                        ? "border-red-400 focus:border-red-500"
                        : "border-[#9A3F3F] focus:border-[#9A3F3F]"
                    } focus:outline-none ${
                      formData.className === "" ? "text-gray-400" : "text-black"
                    }`}
                  >
                    <option value="" disabled hidden>
                      Select your class
                    </option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                  </select>
                  {errors.className && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.className}
                    </p>
                  )}
                </div>

                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-medium text-[#9A3F3F] mb-2">
                    Role
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label
                      className={`flex items-center gap-2 p-3 border rounded-xl cursor-pointer transition ${
                        formData.role === "student"
                          ? "border-[#9A3F3F] bg-[#9A3F3F]/10"
                          : "border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value="student"
                        checked={formData.role === "student"}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      <User className="text-[#9A3F3F]" size={20} />
                      <span>Student</span>
                    </label>

                    <label
                      className={`flex items-center gap-2 p-3 border rounded-xl cursor-pointer transition ${
                        formData.role === "teacher"
                          ? "border-[#9A3F3F] bg-[#9A3F3F]/10"
                          : "border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value="teacher"
                        checked={formData.role === "teacher"}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      <User className="text-[#9A3F3F]" size={20} />
                      <span>Teacher</span>
                    </label>
                  </div>
                  {errors.role && (
                    <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                  )}
                </div>

                {/* Passwords */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#9A3F3F] mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A3F3F]/60"
                        size={20}
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-12 py-3 rounded-xl bg-transparent text-black placeholder-black/60 border-2 ${
                          errors.password
                            ? "border-red-400 focus:border-red-500"
                            : "border-[#9A3F3F] focus:border-[#9A3F3F]"
                        } focus:outline-none`}
                        placeholder="Create password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A3F3F]/60 hover:text-[#9A3F3F]"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#9A3F3F] mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A3F3F]/60"
                        size={20}
                      />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-12 py-3 rounded-xl bg-transparent text-black placeholder-black/60 border-2 ${
                          errors.confirmPassword
                            ? "border-red-400 focus:border-red-500"
                            : "border-[#9A3F3F] focus:border-[#9A3F3F]"
                        } focus:outline-none`}
                        placeholder="Confirm password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A3F3F]/60 hover:text-[#9A3F3F]"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
                {/* {errors.agreeToTerms && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.agreeToTerms}
                  </p>
                )} */}

                {/* Submit */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#9A3F3F] to-[#A53860] text-white rounded-xl shadow-md hover:shadow-lg transition duration-300 font-semibold"
                >
                  Create Account
                </motion.button>

                {/* Back to Home Link */}
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-[#9A3F3F] hover:text-[#A53860] mt-4 transition-colors group justify-center w-full text-center"
                >
                  <ArrowLeft
                    size={20}
                    className="group-hover:-translate-x-1 transition-transform"
                  />
                  Back to Home
                </Link>

                {/* Login Link */}
                <p className="text-center text-[#9A3F3F]/80 mt-2">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-[#9A3F3F] font-semibold hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;