import React from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#FFFFFF] to-[#FBF9D1] relative">
      {/* Navbar / Brand */}
      <div className="w-full flex items-center justify-between px-8 py-6">
        <h1 className="text-3xl font-extrabold text-[#9A3F3F] tracking-wide">
          IntAct
        </h1>
      </div>

      {/* Center Content */}
      <div className="flex flex-1 items-center justify-center px-4">
        <motion.div
          className="w-full max-w-2xl bg-white/70 backdrop-blur-xl rounded-full shadow-lg p-2 pl-6 flex items-center gap-3 border border-[#9A3F3F]/30 hover:shadow-2xl transition-all duration-300"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <input
            type="text"
            placeholder="Ask something..."
            className="flex-1 bg-transparent border-none focus:outline-none text-[#9A3F3F] text-lg placeholder-[#9A3F3F]/60 px-2"
          />
          <button className="p-3.5 rounded-full bg-gradient-to-r from-[#9A3F3F] to-[#9A3F3F] hover:opacity-90 active:scale-95 text-white shadow-md transition-all duration-200">
            <Send size={20} />
          </button>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        className="absolute bottom-6 w-full text-center text-[#9A3F3F]/70 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        © {new Date().getFullYear()} IntAct. All rights reserved.
      </motion.div>
    </div>
  );
};

export default Landing;
