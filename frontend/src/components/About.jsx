import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { HeartHandshake, Users, Target, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
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

    const handleMouseMove = (e) => {
      mouse.current.x = e.x;
      mouse.current.y = e.y;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "#9A3F3F";
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
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-white overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Back to Home button */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#9A3F3F] hover:text-[#A53860] transition-colors group font-semibold"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto text-center space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-extrabold tracking-tight mb-6 text-[#9A3F3F]">
            About <span className="text-[#9A3F3F]">IntAct</span>
          </h1>
          <p className="text-xl text-[#9A3F3F]/80 max-w-3xl mx-auto leading-relaxed">
            IntAct is more than a platform — it’s a platform built on trust,
            learning, and with growth mindset. We empower people to learn
            meaningfully, share experiences with peers, and make an impact
            together in the Learning Environment.
          </p>
        </motion.div>

        {/* Cards Section */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Mission */}
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 p-8 space-y-6 border border-[#9A3F3F]/20">
            <HeartHandshake className="w-12 h-12 text-[#9A3F3F] mx-auto" />
            <h2 className="text-2xl font-bold text-[#9A3F3F]">Our Mission</h2>
            <p className="text-[#9A3F3F]/80">
              To foster genuine learning experiences that inspire students to
              collaborate and create lasting impact in their Learning.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 p-8 space-y-6 border border-[#9A3F3F]/20">
            <Target className="w-12 h-12 text-[#9A3F3F] mx-auto" />
            <h2 className="text-2xl font-bold text-[#9A3F3F]">Our Vision</h2>
            <p className="text-[#9A3F3F]/80">
              To become the go-to platform for students to come together to make
              meaningful change.
            </p>
          </div>

          {/* Community */}
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 p-8 space-y-6 border border-[#9A3F3F]/20">
            <Users className="w-12 h-12 text-[#9A3F3F] mx-auto" />
            <h2 className="text-2xl font-bold text-[#9A3F3F]">Our Community</h2>
            <p className="text-[#9A3F3F]/80">
              An inclusive community that believes in growing together, where
              every learning and interaction matters.
            </p>
          </div>
        </motion.div>

        {/* Closing Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-lg text-[#9A3F3F]/90 leading-relaxed">
            At IntAct, we believe in the power of students. Whether you’re here
            to learn, grow, or collaborate, we’re committed to making your
            journey impactful and inspiring.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
