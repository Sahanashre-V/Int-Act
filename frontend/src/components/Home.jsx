import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, LogIn, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-[#FBF9D1] to-[#FBF9D1] text-white">
      <div className="w-full max-w-4xl mx-auto text-center space-y-12">
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-extrabold tracking-tight mb-6 text-[#9A3F3F]">
            Welcome to <span className="text-[#9A3F3F]">IntAct</span>
          </h1>
          <p className="text-2xl text-[#9A3F3F]/80 max-w-2xl mx-auto leading-relaxed">
            Connect, grow, and thrive with your community.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="grid sm:flex gap-6 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Link 
            to="/login"
            className="group flex items-center gap-3 bg-gradient-to-r from-[#9A3F3F] to-[#9A3F3F] hover:opacity-90 text-white px-10 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
          >
            <LogIn size={24} className="group-hover:scale-110 transition-transform" />
            Sign In
          </Link>
          <Link 
            to="/signup"
            className="group flex items-center gap-3 bg-transparent hover:bg-[#A53860]/20 text-[#9A3F3F] border-2 border-[#9A3F3F] px-10 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
          >
            <UserPlus size={24} className="group-hover:scale-110 transition-transform" />
            Create Account
          </Link>
        </motion.div>

        {/* Message Box */}
        <motion.div
          className="w-full max-w-2xl mx-auto bg-white/20 backdrop-blur-xl rounded-full shadow-lg p-2 pl-6 flex items-center gap-3 border border-[#EF88AD]/40 hover:shadow-xl transition-all duration-300"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <input
            type="text"
            placeholder="Ask something..."
            className="flex-1 bg-transparent border-none focus:outline-none text-black text-base placeholder-black/60 px-2"
          />
          <button className="p-3.5 rounded-full bg-gradient-to-r from-[#9A3F3F] to-[#9A3F3F] hover:opacity-90 active:scale-95 text-white shadow-md transition-all duration-200">
            <Send size={20} />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;