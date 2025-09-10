// import React from "react";
// import { motion } from "framer-motion";
// import { HeartHandshake, Users, Target } from "lucide-react";

// const About = () => {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-b from-[#FFFFFF] to-[#FBF9D1]">
//       <div className="w-full max-w-5xl mx-auto text-center space-y-16">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <h1 className="text-6xl font-extrabold tracking-tight mb-6 text-[#9A3F3F]">
//             About <span className="text-[#9A3F3F]">IntAct</span>
//           </h1>
//           <p className="text-xl text-[#9A3F3F]/80 max-w-3xl mx-auto leading-relaxed">
//             IntAct is more than a platform — it’s a community built on trust,
//             connection, and growth. We empower people to connect meaningfully,
//             share experiences, and make an impact together.
//           </p>
//         </motion.div>

//         {/* Cards Section */}
//         <motion.div
//           className="grid md:grid-cols-3 gap-8"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8, delay: 0.3 }}
//         >
//           {/* Mission */}
//           <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 p-8 space-y-6 border border-[#9A3F3F]/20">
//             <HeartHandshake className="w-12 h-12 text-[#9A3F3F] mx-auto" />
//             <h2 className="text-2xl font-bold text-[#9A3F3F]">Our Mission</h2>
//             <p className="text-[#9A3F3F]/80">
//               To foster genuine connections that inspire collaboration and
//               create lasting impact in communities.
//             </p>
//           </div>

//           {/* Vision */}
//           <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 p-8 space-y-6 border border-[#9A3F3F]/20">
//             <Target className="w-12 h-12 text-[#9A3F3F] mx-auto" />
//             <h2 className="text-2xl font-bold text-[#9A3F3F]">Our Vision</h2>
//             <p className="text-[#9A3F3F]/80">
//               To become the go-to platform where individuals and organizations
//               come together to make meaningful change.
//             </p>
//           </div>

//           {/* Community */}
//           <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 p-8 space-y-6 border border-[#9A3F3F]/20">
//             <Users className="w-12 h-12 text-[#9A3F3F] mx-auto" />
//             <h2 className="text-2xl font-bold text-[#9A3F3F]">Our Community</h2>
//             <p className="text-[#9A3F3F]/80">
//               A diverse and inclusive community that believes in growing
//               together, where every voice matters.
//             </p>
//           </div>
//         </motion.div>

//         {/* Closing Note */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.6 }}
//           className="max-w-3xl mx-auto"
//         >
//           <p className="text-lg text-[#9A3F3F]/90 leading-relaxed">
//             At IntAct, we believe in the power of connection. Whether you’re
//             here to learn, grow, or collaborate, we’re committed to making your
//             journey impactful and inspiring.
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default About;


import React from "react";
import { motion } from "framer-motion";
import { HeartHandshake, Users, Target, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-b from-[#FFFFFF] to-[#FBF9D1]">
      <div className="w-full max-w-5xl mx-auto text-center space-y-16">
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
            IntAct is more than a platform — it’s a community built on trust,
            connection, and growth. We empower people to connect meaningfully,
            share experiences, and make an impact together.
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
              To foster genuine connections that inspire collaboration and
              create lasting impact in communities.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 p-8 space-y-6 border border-[#9A3F3F]/20">
            <Target className="w-12 h-12 text-[#9A3F3F] mx-auto" />
            <h2 className="text-2xl font-bold text-[#9A3F3F]">Our Vision</h2>
            <p className="text-[#9A3F3F]/80">
              To become the go-to platform where individuals and organizations
              come together to make meaningful change.
            </p>
          </div>

          {/* Community */}
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 p-8 space-y-6 border border-[#9A3F3F]/20">
            <Users className="w-12 h-12 text-[#9A3F3F] mx-auto" />
            <h2 className="text-2xl font-bold text-[#9A3F3F]">Our Community</h2>
            <p className="text-[#9A3F3F]/80">
              A diverse and inclusive community that believes in growing
              together, where every voice matters.
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
            At IntAct, we believe in the power of connection. Whether you’re
            here to learn, grow, or collaborate, we’re committed to making your
            journey impactful and inspiring.
          </p>
        </motion.div>

        {/* Social Media Links */}
        <motion.div
          className="flex justify-center gap-8 pt-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/90 border border-[#9A3F3F]/20 text-[#9A3F3F] hover:bg-[#9A3F3F] hover:text-white shadow-md transition-all transform hover:-translate-y-1"
          >
            <Facebook size={26} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/90 border border-[#9A3F3F]/20 text-[#9A3F3F] hover:bg-[#9A3F3F] hover:text-white shadow-md transition-all transform hover:-translate-y-1"
          >
            <Twitter size={26} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/90 border border-[#9A3F3F]/20 text-[#9A3F3F] hover:bg-[#9A3F3F] hover:text-white shadow-md transition-all transform hover:-translate-y-1"
          >
            <Instagram size={26} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/90 border border-[#9A3F3F]/20 text-[#9A3F3F] hover:bg-[#9A3F3F] hover:text-white shadow-md transition-all transform hover:-translate-y-1"
          >
            <Linkedin size={26} />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
