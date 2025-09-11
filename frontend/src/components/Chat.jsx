import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, UserCog } from "lucide-react";

const Chat = () => {
  const [searchText, setSearchText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#FFFFFF] to-[#FBF9D1] relative">
      {/* Navbar */}
      <div className="w-full flex items-center justify-between px-8 py-6">
        <h1 className="text-3xl font-extrabold text-[#9A3F3F] tracking-wide">
          IntAct
        </h1>

        <div className="flex items-center gap-10">
          <div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div
                className="peer bg-gradient-to-r from-gray-300 to-gray-400 rounded-full w-14 h-7 shadow-inner
                  peer-checked:from-[#9A3F3F] peer-checked:to-[#9A3F3F] transition-colors duration-300
                  after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full 
                  after:h-6 after:w-6 after:shadow-md after:transition-transform after:duration-300
                  peer-checked:after:translate-x-7 flex items-center"
              ></div>
            </label>
          </div>
          <div className="flex items-center">
            <UserCog className="w-9 h-9 text-[#9A3F3F] cursor-pointer hover:opacity-80 transition" />
          </div>
        </div>
      </div>

      {/* Center or Bottom Search Bar */}
      <div className="flex flex-1 items-center justify-center px-4">
        <motion.div
          className="w-full flex items-center justify-center px-4"
          initial={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            position: 'absolute'
          }}
          animate={
            isSubmitted
              ? { 
                  top: 'unset', 
                  bottom: 40,
                  left: '50%', 
                  transform: 'translateX(-50%)',
                  position: 'absolute'
                }
              : { 
                  top: '50%',
                  left: '50%',
                  bottom: 'unset',
                  transform: 'translate(-50%, -50%)',
                  position: 'absolute'
                }
          }
          transition={{ duration: 0.8 }}
       >
        <motion.div
          className="w-full max-w-2xl bg-white/70 backdrop-blur-xl rounded-full shadow-lg p-2 pl-6 flex items-center gap-3 border border-[#9A3F3F]/30 hover:shadow-2xl transition-all duration-300"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center justify-center text-[#9A3F3F]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Ask something..."
            className="flex-1 bg-transparent border-none focus:outline-none text-[#9A3F3F] text-lg placeholder-[#9A3F3F]/60 px-2"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="p-3.5 rounded-full bg-gradient-to-r from-[#9A3F3F] to-[#9A3F3F] hover:opacity-90 active:scale-95 text-white shadow-md transition-all duration-200">
            <Send size={20} />
          </button>
        </motion.div>
      </motion.div>
      </div>
    </div>
  );
};

export default Chat;
