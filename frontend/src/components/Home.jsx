import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { UserPlus, LogIn } from "lucide-react";
import { motion } from "framer-motion";

const Home = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
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

    // Track mouse movement
    const handleMouseMove = (e) => {
      mouse.current.x = e.x;
      mouse.current.y = e.y;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "#9A3F3F";
        ctx.fill();

        // Move particle
        p.x += p.dx;
        p.y += p.dy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        // Interactivity: connect particle to mouse if close
        if (mouse.current.x && mouse.current.y) {
          const distX = p.x - mouse.current.x;
          const distY = p.y - mouse.current.y;
          const distance = Math.sqrt(distX * distX + distY * distY);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(154,63,63,${1 - distance / 100})`;
            ctx.lineWidth = 3;
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
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white">
      <canvas ref={canvasRef} className="absolute inset-0" />

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center space-y-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-extrabold tracking-tight mb-6 text-[#9A3F3F] drop-shadow-lg">
            Welcome to <span className="text-[#9A3F3F]">IntAct</span>
          </h1>
          <p className="text-2xl text-[#9A3F3F]/80 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Connect, grow, and thrive with your community.
          </p>
        </motion.div>

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
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link
            to="/about"
            className="text-[#9A3F3F] underline font-medium text-lg hover:text-[#7e2f2f] transition-colors"
          >
            Know more about us
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
