import type { Route } from "./+types/home";
import { Link } from "react-router";
import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, useMotionValue, MotionValue, useInView, useSpring, useMotionTemplate, type MotionStyle, AnimatePresence } from "framer-motion";
import { section } from "framer-motion/client";
import { Search, CalendarSync, ShieldCheck } from 'lucide-react';
import type { JSX } from "react/jsx-runtime";
import { Plus, X } from "lucide-react"



export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ropan" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <WhyDoWeExist />
      <HowItWorks />
      <ValuesSection />
      <CyborgReveal />
      <RopanScrollSequence />
      <Platform />
      <WhoIsItFor />
      <TrustAtScale />
      <Impact />
      <BuiltToCompound />
      
      
    </>
  );
}

export function Hero() {
  return (
    <section className="w-full h-screen p-6 md:p-6">
      <div className="relative rounded-3xl overflow-hidden h-full">

        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1770347265612-91f67721344e?" // place image inside /public
          alt="Family walking in forest"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/0 md:w-7xl" />

        {/* Content Container */}
        <div className="relative z-10 h-full flex justify-start items-end">
          <div className="max-w-4xl py-10 px-8 md:py-20 md:px-15">

            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 md:gap-3 bg-white backdrop-blur-md border border-white/20 rounded-full px-2 py-1 mb-4 md:mb-6">
              <span className="w-3 h-3 md:w-6 md:h-6 bg-blue-700 rounded-full border-2 md:border-6 border-blue-100" />
              <p className="text-gray-700 font-normal text-xs md:text-lg tracking-tight mr-1">
                Platform That Serves The Missing Middle
              </p>
            </div>

            {/* Heading */}
            <h1 className="text-white text-3xl md:text-8xl font-medium md:font-normal tracking-tighter leading-23s mb-4 md:mb-6">
              Care That Prevents Crisis,
              Not Just <br /> Pays For It.
            </h1>

            {/* Description */}
            <p className="text-white/80 text-base md:text-xl tracking-tight max-w-xl mb-6 md:mb-10">
              An AI-Driven Health Protection Platform Built to Predict Risks Early, Prevent Escalation, and Deliver Smarter Care Before Problems Begin
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/partner"
                className="flex items-center gap-2 md:gap-3 bg-white text-base md:text-lg text-black pl-4 md:pl-6 pr-2 py-2 rounded-full font-normal hover:scale-105 transition"
              >
                Partner With Us
                <span className="w-7 h-7 md:w-9 md:h-9 text-xs md:text-lg rounded-full bg-black text-white flex items-center justify-center">
                  →
                </span>
              </Link>

              <Link
                to="/community"
                className="hidden md:block bg-white/10 backdrop-blur-md border border-white/20 text-white text-base md:text-lg px-6 py-3 rounded-full hover:bg-white/20 transition"
              >
                Join Our Community Health Program
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Interface for the helper component props
interface WordProps {
  children: string;
  range: [number, number];
  progress: MotionValue<number>;
}

export function About() {
  // Type the ref as an HTMLElement (specifically a section)
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const text = "Ropan is a screening-first health platform that brings doorstep checkups, early risk detection, and continuous care to underserved families through trained local women and an AI-driven system. It shifts healthcare from reactive treatment to proactive, everyday prevention.";
  const words = text.split(" ");

  return (
    <section ref={containerRef} className="h-[200vh] w-full relative">
      <div className="sticky top-0 h-[80vh] md:h-screen flex flex-col justify-between px-8 md:px-18 py-10 md:py-30 overflow-hidden">
        
        <div className="flex flex-row justify-between items-center">
          <h5 className="text-lg font-medium tracking-tight">About Us</h5>
          <p className="text-lg font-semibold tracking-tight">© 2026</p>
        </div>

        <h2 className="text-3xl md:text-5xl font-medium tracking-tighter leading-10 md:leading-14 mb-1 md:mb-45 flex flex-wrap">
          <span className="mr-100 block"></span>
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);
            
            return (
              <Word 
                key={i} 
                range={[start, end]} 
                progress={scrollYProgress}
              >
                {word}
              </Word>
            );
          })}
        </h2>
      </div>
    </section>
  );
}

const Word = ({ children, range, progress }: WordProps) => {
  const color = useTransform(progress, range, ["#E5E7EB", "#000000"]);
  
  return (
    <motion.span 
      style={{ color }} 
      className="mr-3 transition-colors duration-0"
    >
      {children}
    </motion.span>
  );
};

// Notice the change here: The static parent div handles the Tailwind position & skew.
// The inner motion.div ONLY handles the Framer Motion animation (opacity & y).
const SkewedImage = ({ 
  className, 
  animStyle,
  src 
}: { 
  className: string; 
  animStyle: MotionStyle;
  src: string; 
}) => (
  <div className={`absolute ${className}`}>
    <motion.div
      style={animStyle}
      // Added overflow-hidden to ensure the image stays within the borders
      // Added shadow-md to give them a slight floating depth
      className="w-16 h-24 md:w-20 md:h-32 lg:w-28 lg:h-40 bg-gray-200 overflow-hidden border-5 border-white shadow-xl"
    >
      <img 
        src={src} 
        alt="" 
        className="w-full h-full object-cover" 
      />
    </motion.div>
  </div>
);

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Keep the scroll progress for your text animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const h1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6], [0, 1, 1, 0]);
  const h1Y = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6], [30, 0, 0, -30]);

  const pOpacity = useTransform(scrollYProgress, [0.5, 0.7, 0.9, 1], [0, 1, 1, 1]);
  const pY = useTransform(scrollYProgress, [0.5, 0.7, 0.9, 1], [30, 0, 0, 0]);

  // 1. Track if the video element is visible in the viewport
  const isVideoInView = useInView(videoRef, {
    margin: "0px 0px -20% 0px", // Starts playing right before it fully centers
  });

  // 2. Play or pause the video based on visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVideoInView) {
      // .play() returns a Promise. Catching it prevents console errors 
      // if the browser decides to strictly block autoplay.
      video.play().catch((err) => console.log("Playback prevented:", err));
    } else {
      video.pause();
    }
  }, [isVideoInView]);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-linear-to-b from-white via-slate-50 to-white">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6 text-center">
        
        <motion.h1
          style={{ opacity: h1Opacity, y: h1Y }}
          className="absolute text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-slate-800"
        >
          How does it work?
        </motion.h1>

        <motion.div
          style={{ opacity: pOpacity, y: pY }}
          className="absolute max-w-6xl text-lg md:text-2xl font-normal tracking-tight leading-relaxed text-gray-500 flex flex-col justify-center items-center gap-10 w-full"
        >
          {/* Added 'loop' so it keeps playing while they read */}
          <video 
            ref={videoRef}
            src="/videos/ROPAN_Sakhi_Onboarding_Animation.mp4" 
            muted 
            playsInline 
            loop
            preload="auto"
            className="w-full rounded-xl shadow-2xl/5"
          ></video>
          <Link
                to="/how-it-works"
                className="flex items-center gap-2 max-w-60 md:gap-3 bg-black text-base md:text-lg text-white pl-4 md:pl-6 pr-2 py-2 rounded-full font-normal hover:scale-105 transition"
              >
                See how it works
                <span className="w-7 h-7 md:w-9 md:h-9 text-xs md:text-lg rounded-full bg-white text-black flex items-center justify-center border">
                  →
                </span>
              </Link>
        </motion.div>
        
      </div>
    </div>
  );
}

const values = [
  {
    title: "Built for the Field",
    subtitle: "Offline-Ready",
    description: "Offline-first applications allow screenings, follow-ups, and care workflows to continue seamlessly in low-network environments, syncing securely once connected.",
    bgImage: "https://images.pexels.com/photos/5738735/pexels-photo-5738735.jpeg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-28 h-28 text-pink-200 drop-shadow-[0_0_20px_rgba(236,72,153,0.8)]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    ),
  },
  {
    title: "Intelligence at Every Visit",
    subtitle: "AI Guidance",
    description: "AI models analyse screening inputs to surface risk signals, recommend next steps, and help Sakhis deliver consistent, protocol-driven care at the doorstep.",
    bgImage: "https://images.pexels.com/photos/18069696/pexels-photo-18069696.png",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-32 h-32 text-pink-200 drop-shadow-[0_0_20px_rgba(236,72,153,0.8)]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12l4.125-7.5h8.25l4.125 7.5-4.125 7.5h-8.25L3.75 12z" />
      </svg>
    ),
  },
  {
    title: "Structured for Underwriting",
    subtitle: "Trusted Data",
    description: "Standardised, longitudinal health records support smarter underwriting, early risk detection, and coordinated follow-ups across the care journey.",
    bgImage: "https://images.pexels.com/photos/17485706/pexels-photo-17485706.png",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-32 h-32 text-pink-200 drop-shadow-[0_0_20px_rgba(236,72,153,0.8)]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12l4.125-7.5h8.25l4.125 7.5-4.125 7.5h-8.25L3.75 12z" />
      </svg>
    ),
  }
];

// --- Framer Motion Variants ---

// Controls the staggered timing of children elements
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // 0.2s delay between each card/heading appearing
    },
  },
};

// Controls the actual animation for individual elements (heading & cards)
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  },
};

export function ValuesSection() {
  return (
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      // once: false allows the animation to reverse when scrolling away
      viewport={{ once: false, amount: 0.2 }} 
      className="py-16 px-4 md:px-18 md:py-36 bg-slate-50 min-h-screen flex flex-col items-start justify-between"
    >
      {/* Top Label & Section Title - Wrapped to animate first */}
      <motion.div variants={itemVariants}>
        <div className="inline-flex items-center gap-1 md:gap-3 border border-gray-300 rounded-full px-3 py-2 mb-4 md:mb-6">
          <img src="/images/Star.svg" alt="" />
          <p className="text-gray-700 font-semibold text-xs md:text-sm tracking-tight mr-1">
            Technology Layer
          </p>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-20 tracking-tighter leading-14">
          Infrastructure Built for <br />Continuous Health Protection
        </h2>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[8xl] w-full">
        {values.map((value, index) => (
          <motion.div 
            // Swap standard div to motion.div to catch the staggered variant
            variants={itemVariants}
            key={index}
            className="relative h-150 rounded-xl overflow-hidden group flex flex-col bg-slate-950"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 group-hover:opacity-0"
              style={{ 
                backgroundImage: `url('${value.bgImage}')`,
              }}
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-gray-900 via-white to-gray-300 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0" />

            {/* Card Content */}
            <div className="relative z-10 flex flex-col h-full p-8">
              
              {/* Text / Header */}
              <div className="text-white transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="text-2xl font-medium tracking-tighter">
                  {value.title}
                </h3>
                <p className="text-xl italic font-serif text-pink-100/90 mt-1">
                  {value.subtitle}
                </p>
              </div>

              {/* Center Icon & Hidden Paragraph */}
              <div className="flex-1 flex flex-col items-center justify-center relative mt-4">
                {/* Hidden Paragraph - Fades in and slides up on hover */}
                <p className="absolute text-xl tracking-tight bottom-4 left-0 right-0 text-slate-300 px-2 opacity-0 translate-y-8 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 leading-relaxed">
                  {value.description}
                </p>
              </div>
              
            </div>
          </motion.div>
        ))}
      </div>
      
    </motion.section>
  );
}

type FeatureProps = {
  title: string;
  desc: string;
  highlight?: boolean;
};

const threads = [
  { id: 1, color: "#3b82f6", y: 100, label: "Health Intelligence System", d: "M 250 100 C 450 100, 500 400, 650 300 C 750 200, 850 300, 1050 300" },
  { id: 2, color: "#0ea5e9", y: 200, label: "Screening", d: "M 250 200 C 450 200, 550 350, 650 300 C 750 250, 850 300, 1050 300" },
  { id: 3, color: "#8b5cf6", y: 300, label: "Follow-Ups", d: "M 250 300 C 450 300, 500 200, 650 300 C 750 400, 850 300, 1050 300" },
  { id: 4, color: "#f59e0b", y: 400, label: "Care Pathways", d: "M 250 400 C 450 400, 500 250, 650 300 C 750 350, 850 300, 1050 300" },
  { id: 5, color: "#ec4899", y: 500, label: "Complete Protection", d: "M 250 500 C 450 500, 500 150, 650 300 C 750 450, 850 300, 1050 300" },
];

// Configuration for the skewed background images
const floatingImages = [
  // Left side (facing right)
  { id: 1, src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300&q=80", top: "15%", left: "10%", transform: "perspective(1000px) rotateY(25deg) rotateX(5deg) rotateZ(-5deg)", size: "w-32 md:w-48" },
  { id: 2, src: "https://images.pexels.com/photos/7089619/pexels-photo-7089619.jpeg", top: "45%", left: "5%", transform: "perspective(1000px) rotateY(30deg) rotateX(0deg) rotateZ(-2deg)", size: "w-28 md:w-40" },
  { id: 3, src: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=300&q=80", top: "75%", left: "12%", transform: "perspective(1000px) rotateY(20deg) rotateX(-5deg) rotateZ(-8deg)", size: "w-24 md:w-36" },
  
  // Right side (facing left)
  { id: 4, src: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=300&q=80", top: "10%", right: "8%", transform: "perspective(1000px) rotateY(-25deg) rotateX(5deg) rotateZ(5deg)", size: "w-32 md:w-48" },
  { id: 5, src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=300&q=80", top: "40%", right: "15%", transform: "perspective(1000px) rotateY(-20deg) rotateX(0deg) rotateZ(2deg)", size: "w-24 md:w-36" },
  { id: 6, src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=300&q=80", top: "70%", right: "5%", transform: "perspective(1000px) rotateY(-30deg) rotateX(-5deg) rotateZ(8deg)", size: "w-28 md:w-40" },
];

export function RopanScrollSequence() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- HEADING & IMAGES ANIMATIONS ---
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3, 0.45], [0, 1, 1, 0]);
  const headingY = useTransform(scrollYProgress, [0, 0.15, 0.3, 0.45], [50, 0, 0, -50]);

  // --- THREAD ANIMATIONS ---
  const startOpacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);
  const startScale = useTransform(scrollYProgress, [0.45, 0.55], [0.8, 1]);
  
  const pathLength = useTransform(scrollYProgress, [0.5, 0.85], [0, 1]);
  
  const endOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const endScale = useTransform(scrollYProgress, [0.85, 0.95], [0.5, 1]);

  return (
    <section ref={containerRef} className="h-[300vh] bg-[#f8f9fa] relative font-sans">
      
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* --- 1. HEADING & FLOATING IMAGES LAYER --- */}
        <motion.div 
          style={{ opacity: headingOpacity, y: headingY }}
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
        >
          {/* Floating Images */}
          {floatingImages.map((img) => (
            <div
              key={img.id}
              className={`absolute hidden sm:block ${img.size} shadow-2xl transition-transform duration-700 ease-out hover:scale-105`}
              style={{
                top: img.top,
                left: img.left,
                right: img.right,
                transform: img.transform,
                // Add a subtle white border to look like physical photos
                border: "4px solid white",
              }}
            >
              <img 
                src={img.src} 
                alt="Healthcare scene" 
                className="w-full h-auto object-cover block"
              />
            </div>
          ))}

          {/* Central Text */}
          <div className="text-center px-6 relative z-10 pointer-events-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-slate-800">
              How does it all connects?
            </h1>
          </div>
        </motion.div>


        {/* --- 2. WEAVING THREADS LAYER --- */}
        <div className="relative w-full max-w-7xl mx-auto aspect-[4/5] sm:aspect-video lg:aspect-[2.5/1] px-4">
          
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1300 600"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {threads.map((thread) => (
              <motion.path
                key={`path-${thread.id}`}
                d={thread.d}
                fill="none"
                stroke={thread.color}
                strokeWidth="4"
                filter="url(#glow)"
                className="opacity-60"
                style={{ pathLength }} 
              />
            ))}
          </svg>

          {/* Start Pills */}
          {threads.map((thread) => {
            const topPosition = (thread.y / 600) * 100;

            return (
              <motion.div
                key={`pill-${thread.id}`}
                style={{
                  top: `${topPosition}%`,
                  left: "19.2%",
                  opacity: startOpacity,
                  scale: startScale,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center 
                  rounded-full bg-white border border-gray-100 
                  px-4 py-2 md:px-6 md:py-3 text-xs sm:text-sm md:text-sm font-medium text-gray-600 shadow-xl z-10 w-max"
              >
                <div
                  className="w-2.5 h-2.5 rounded-full mr-3 hidden sm:block shadow-sm"
                  style={{ backgroundColor: thread.color }}
                />
                {thread.label}
              </motion.div>
            );
          })}

          {/* Converging End Pill */}
          <motion.div
            style={{ 
                top: "50%", 
                left: "80.7%", 
                opacity: endOpacity,
                scale: endScale
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center 
              rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
              p-[2px] shadow-[0_10px_30px_rgba(168,85,247,0.2)] z-20"
          >
            <div className="bg-white rounded-full px-8 py-3 md:px-10 md:py-4 h-full w-full flex items-center justify-center text-sm md:text-lg font-semibold text-gray-800 tracking-wide">
              Ropan
            </div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}

const STRENGTHS = [
  {
    title: "Continuous Intelligence",
    description: "Feedback loops that improve care, coverage, and underwriting",
    icon: "/images/intelligence.svg"
  },
  {
    title: "Seamless Integration",
    description: "Connects directly with healthcare providers for real-time data exchange.",
    icon: "/images/integration.svg"
  },
  {
    title: "Scalable Infrastructure",
    description: "Built to handle millions of claims with zero latency issues.",
    icon: "/images/scale.svg"
  }
];

/**
 * Section column animations
 */
const fadeLeft = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const fadeRight = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.5, ease: "easeOut" }
  }
};

/**
 * Image + overlay animations
 */
const imageReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const overlayReveal = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.45,
      delay: 1, // overlays appear after iceberg image
      ease: "easeOut"
    }
  }
};

export function WhyDoWeExist() {
  return (
    <section className="py-16 px-6 md:py-24 lg:px-20 mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left Column */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.35 }}
          className="flex flex-col h-full justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-4 py-1.5 mb-6">
              <img src="/images/Star.svg" alt="star" className="w-4 h-4" />
              <p className="text-gray-700 font-semibold text-xs md:text-sm tracking-tight">
                Why Do We Exist?
              </p>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tighter font-medium leading-tight mb-6">
              Closing India’s Health<br className="hidden md:block" /> Protection Gap at Scale
            </h2>
            
            <p className="text-base md:text-lg text-gray-600 max-w-xl mb-12">
              We leverage data and technology to bridge the divide between quality healthcare and financial accessibility.
            </p>
          </div>

          {/* Feature List */}
          <div className="">
            {STRENGTHS.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-6 pb-6 pt-8 border-b border-gray-200 hover:pl-6 transi hover:bg-gray-100 transition-all duration-500 last:border-0"
              >
                <div className="shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  {item.icon ? (
                    <img src={item.icon} alt="" className="w-6 h-6" />
                  ) : (
                    <div className="w-6 h-6 bg-gray-300 rounded-sm" />
                  )}
                </div>
                <div>
                  <h5 className="text-xl tracking-tight font-semibold text-gray-900">
                    {item.title}
                  </h5>
                  <p className="max-w-sm mt-1 text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.35 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-lg lg:max-w-none">
            
            {/* Base Iceberg Image */}
            <motion.img
              variants={imageReveal}
              src="/images/iceberg.jpg"
              alt="The health gap iceberg"
              className="rounded-2xl object-cover w-full h-auto max-w-xl md:ml-28"
            />

            {/* Overlay Image 1 */}
            <motion.img
              variants={overlayReveal}
              src="/images/visibleTip.svg"
              alt=""
              className="pointer-events-none absolute top-20 right-110 w-110 h-auto"
            />

            {/* Overlay Image 2 */}
            <motion.img
              variants={overlayReveal}
              src="/images/hiddenBase.svg"
              alt=""
              className="pointer-events-none absolute bottom-16 right-6 w-100 h-auto"
            />

          </div>
        </motion.div>

      </div>
    </section>
  );
}

export interface SplitCyborgRevealProps {
  humanImageSrc?: string;
  cyborgImageSrc?: string;
}

export function CyborgReveal({
  // You will need TWO separate, perfectly aligned images to make this work.
  // Image 1: Fully human face
  humanImageSrc = "images/human_2.png",
  // Image 2: Fully cyborg face
  cyborgImageSrc = "/images/robot_2.png",
}: SplitCyborgRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Track mouse X position as a percentage (0 to 100)
  const mouseX = useMotionValue(50); 

  // Apply the slight delay/spring physics to the X coordinate
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);

  // Create a dynamic clip-path polygon. 
  // It reveals the cyborg image from the smoothX percentage to the right edge (100%).
  const clipPath = useMotionTemplate`polygon(${smoothX}% 0%, 100% 0%, 100% 100%, ${smoothX}% 100%)`;

  useEffect(() => {
    // Snap to perfectly center (50%) on initial load
    mouseX.set(50);
  }, [mouseX]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    
    // Calculate cursor position as a percentage of the container's width
    const xPos = e.clientX - left;
    const xPercent = Math.max(0, Math.min(100, (xPos / width) * 100)); // Clamp between 0-100
    
    mouseX.set(xPercent);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Optional: Snap back to exactly 50/50 when the mouse leaves the image
    mouseX.set(50);
  };

  return (
    <section className="grid md:grid-cols-3 gap-10 min-h-screen px-6 py-6 md:px-18 md:py-30">
      
      {/* Column 1 */}
      <motion.div 
        // Start 50px lower (y: 50) and invisible
        initial={{ opacity: 0, y: 50 }}
        // Animate up to normal position (y: 0) and fully visible
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0 }}
        className="flex-col justify-end hidden md:flex"
      >
        <div className="flex justify-between py-5 border-b border-gray-200 hover:bg-gray-100 hover:px-6 transition-all duration-300">
          <h4 className="text-xl font-medium tracking-tight">Community Screening</h4>
          <img src="/images/tick.svg" alt="" />
        </div>
        <div className="flex justify-between py-5 border-b border-gray-200 hover:bg-gray-100 hover:px-6 transition-all duration-300">
          <h4 className="text-xl font-medium tracking-tight">Trusted Guidance</h4>
          <img src="/images/tick.svg" alt="" />
        </div>
        <div className="flex justify-between py-5 border-b border-gray-200 hover:bg-gray-100 hover:px-6 transition-all duration-300">
          <h4 className="text-xl font-medium tracking-tight">Family Education</h4>
          <img src="/images/tick.svg" alt="" />
        </div>
        <div className="flex justify-between py-5 border-b border-gray-200 hover:bg-gray-100 hover:px-6 transition-all duration-300">
          <h4 className="text-xl font-medium tracking-tight">Care Navigation</h4>
          <img src="/images/tick.svg" alt="" />
        </div>
      </motion.div>

      {/* Column 2 */}
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        // Start 50px lower
        initial={{ opacity: 0, y: 50 }}
        // Animate up
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative w-full max-w-md mx-auto aspect-9/16 overflow-hidden rounded-2xl cursor-col-resize"
      >
        {/* Base Layer: Human Face (Left Side) */}
        <img
          src={humanImageSrc}
          alt="Human Face"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        />

        {/* Top Layer: Cyborg Face (Right Side, clipped dynamically) */}
        <motion.div
          style={{ clipPath }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <img
            src={cyborgImageSrc}
            alt="Cyborg Face"
            className="w-full h-full object-cover object-center select-none"
          />
        </motion.div>

        {/* The Split Line */}
        <motion.div
          style={{ left: useMotionTemplate`${smoothX}%` }}
          className="absolute top-0 bottom-0 w-[2px] bg-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.8)] pointer-events-none z-10 -ml-[1px]"
        />
      </motion.div>

      {/* Column 3 */}
      <motion.div 
        // Start 50px lower
        initial={{ opacity: 0, y: 50 }}
        // Animate up
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="place-self-start"
      >
        <div className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-4 py-1.5 mb-6">
          <img src="/images/Star.svg" alt="star" className="w-4 h-4" />
          <p className="text-gray-700 font-semibold text-xs md:text-sm tracking-tight">
            The Human Layer
          </p>
        </div>
            
        <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tighter font-medium leading-tight mb-6">
          The Human Layer of Preventive Care
        </h2>
            
        <p className="text-base md:text-lg text-gray-600 max-w-xl">
          Ropan Sakhis are trained local women who serve as trusted health facilitators. They conduct screenings, educate families, ensure follow-ups, and guide patients through care and insurance pathways.
        </p>
      </motion.div>
      
    </section>
  );
}

export function Platform() {
  return (
    <motion.section
      className="md:py-30 md:px-18 py-12 px-6"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }} // enables reverse on scroll back
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div>
        <div className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-4 py-1.5 mb-6">
          <img src="/images/Star.svg" alt="star" className="w-4 h-4" />
          <p className="text-gray-700 font-semibold text-xs md:text-sm tracking-tight">
            The Platform
          </p>
        </div>

        <h2 className="text-4xl md:text-xl lg:text-6xl tracking-tighter font-medium md:max-w-6xl leading-tight mb-6">
          Every interaction improves outcomes, underwriting, and affordability.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 md:grid-rows-2 gap-25 md:mt-20">

        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.45, delay: 0 }}
        >
          <div className="py-5">
            <img src="/images/voiceFirst.svg" alt="" className="py-4 px-4 bg-gray-100 rounded-xl mb-10"/>
            <h5 className="text-2xl font-semibold tracking-tight">Voice-First Access</h5>
            <p className="text-lg text-gray-600 mt-2">Health data captured in local languages through assisted workflows accurately</p>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          <div>
            <img src="/images/predictive.svg" alt="" className="py-4 px-4 bg-gray-100 rounded-xl mb-10"/>
            <h5 className="text-2xl font-semibold tracking-tight">Predictive Risk Engine</h5>
            <p className="text-lg text-gray-600 mt-3">AI models that identify chronic risk before hospitalization proactively</p>
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          className="py-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.45, delay: 0.16 }}
        >
          <div>
            <img src="/images/3.svg" alt="" className="py-4 px-4 bg-gray-100 rounded-xl mb-10"/>
            <h5 className="text-2xl font-semibold tracking-tight">Continuous Intelligence</h5>
            <p className="text-lg text-gray-600 mt-3">Feedback loops that improve care, coverage, and underwriting through insights</p>
          </div>
        </motion.div>

        {/* Card 4 */}
        <motion.div
          className="py-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.45, delay: 0.24 }}
        >
          <div>
            <img src="/images/4.svg" alt="" className="py-4 px-4 bg-gray-100 rounded-xl mb-10"/>
            <h5 className="text-2xl font-semibold tracking-tight">Longitudinal Profiles</h5>
            <p className="text-lg text-gray-600 mt-3">Health records that evolve across screenings, not single visits longitudinally</p>
          </div>
        </motion.div>

        {/* Card 5 */}
        <motion.div
          className="py-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.45, delay: 0.32 }}
        >
          <div>
            <img src="/images/5.svg" alt="" className="py-4 px-4 bg-gray-100 rounded-xl mb-10"/>
            <h5 className="text-2xl font-semibold tracking-tight">Risk Stratification</h5>
            <p className="text-lg text-gray-600 mt-3">Population-level insights that prioritize intervention early through analytics</p>
          </div>
        </motion.div>

        {/* Card 6 */}
        <motion.div
          className="py-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.45, delay: 0.4 }}
        >
          <div>
            <img src="/images/6.svg" alt="" className="py-4 px-4 bg-gray-100 rounded-xl mb-10"/>
            <h5 className="text-2xl font-semibold tracking-tight">Care Orchestration</h5>
            <p className="text-lg text-gray-600 mt-3">Intelligent routing across screening, care, and coverage with precision</p>
          </div>
        </motion.div>

      </div>
    </motion.section>
  )
}

type Card = {
  id: string
  number: string
  title: string
  description: string
}

const CARDS: Card[] = [
  {
    id: "define",
    number: "01",
    title: "The Missing Middle",
    description:
      "Working households with regular incomes who are excluded from public schemes and underserved by private insurance..",
  },
  {
    id: "design",
    number: "02",
    title: "People Managing Risk Without Support",
    description:
      "Individuals living with chronic or emerging health conditions, without continuity of care or guidance.",
  },
  {
    id: "digital",
    number: "03",
    title: "Low-Access, High-Need Communities",
    description:
      "Semi-urban and rural populations where hospitals are distant but everyday health risks persist.",
  },
  {
    id: "develop",
    number: "04",
    title: "Women at the Center of Care",
    description:
      "Women-led households that shoulder health decisions without structured support systems.",
  },
  {
    id: "deploy",
    number: "05",
    title: "Families Who Need Care to Come Home",
    description:
      "People whose lives cannot revolve around hospitals, paperwork, or fragmented providers.",
  },
]

export function WhoIsItFor() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <motion.section
      className="md:py-30 md:px-18 py-12 px-6 h-auto"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-4 py-1.5 mb-6">
          <img src="/images/Star.svg" alt="star" className="w-4 h-4" />
          <p className="text-gray-700 font-semibold text-xs md:text-sm tracking-tight">
            Who Is It For?
          </p>
        </div>

        <h2 className="text-4xl md:text-xl lg:text-6xl tracking-tighter font-medium md:max-w-6xl leading-tight">
          The People And Systems Ropan Is <br className="hidden md:block"/> Built To Strengthen
        </h2>
      </div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row gap-4 w-full mt-20">
        {CARDS.map((card) => {
          const isActive = active === card.id

          return (
            <motion.div
              key={card.id}
              onMouseEnter={() => setActive(card.id)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive(isActive ? null : card.id)}
              layout
              transition={{ duration: 1.5, ease: "easeOut" }}
              className={`relative cursor-pointer overflow-hidden rounded-xl h-[50vh] 
              ${
                isActive
                  ? "bg-neutral-950 text-white md:flex-[2]"
                  : "bg-neutral-100 text-neutral-800 md:flex-1"
              }
              min-h-[220px] p-6 flex flex-col justify-between`}
            >
              {/* Top content */}
              <div>
                <p className="text-xs opacity-60 mb-2">{card.number}</p>
                <h3 className="text-4xl font-medium tracking-tight">
                  {card.title}
                </h3>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 10,
                  }}
                  transition={{ duration: 0.25 }}
                  className="mt-4 text-sm leading-relaxed"
                >
                  {card.description}
                </motion.p>
              </div>

              {/* Bottom icon */}
              <div>
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center border
                  ${
                    isActive
                      ? "bg-blue-700 text-black"
                      : "bg-white text-black border-neutral-300"
                  }`}
                >
                  {isActive ? <X size={16} /> : <Plus size={16} />}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}

export function TrustAtScale() {
  return (
    <section className="py-12 px-6 md:px-18 md:py-30 bg-linear-to-t bg-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-4 py-1.5 mb-6">
            <img src="/images/Star.svg" alt="star" className="w-4 h-4" />
            <p className="text-gray-700 font-semibold text-xs md:text-sm tracking-tight">
              Trust At Scale
            </p>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tighter font-medium md:max-w-6xl leading-tight mx-auto">
            Technology scales. Trust multiplies.
          </h2>
          <p className="text-xl text-gray-500 mt-4">Ropan’s Sakhi network forms the physical interface of the platform—bringing healthcare into homes, not just apps.</p>
        </div>

        <div className=" border-15 border-white shadow-2xl/5 rounded-4xl">
          <img src="/images/trustAtScale.jpg" alt="" className="w-screen object-cover rounded-2xl"/>
        </div>
      </div>
    </section>
  );
}

type Service = {
  title: string;
  description: string;
  image: string;
};

const SERVICES: Service[] = [
  {
    title: "Shared Risk Visibility",
    description:
      "Community-level data replaces isolated health snapshots, allowing earlier identification of patterns, risks, and care gaps across households.",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Diagnostic Imaging",
    description:
      "Advanced imaging services, including X-rays, MRIs, and CT scans, to provide accurate diagnoses.",
    image: "https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Laboratory Analysis",
    description:
      "Reliable lab testing with fast turnaround and clinical precision.",
    image: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?q=80&w=1225&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Preventive Care",
    description:
      "Early screenings and proactive health monitoring for long-term wellbeing.",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=1191&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Rehabilitation Services",
    description:
      "Post-treatment recovery programs focused on restoring mobility.",
    image: "https://images.unsplash.com/photo-1645005512827-48ff6f97848a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const STATS = [
  { value: 45, suffix: "%", label: "Reduced Hospital Stay" },
  { value: 50, suffix: "%", label: "Fewer ICU Days" },
  { value: 20, suffix: "%", label: "Reduction In Avoidable Surgery" },
  { value: 90, suffix: "%", label: "Lower Distribution Cost" },
  { value: 40, suffix: "%", label: "Cheaper Insurance Products" },
];

/* -------------------------------------------------------------------------- */
/*                            COUNT-UP COMPONENT                              */
/* -------------------------------------------------------------------------- */

function CountUp({
  target,
  inView,
}: {
  target: number;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) {
      setCount(0);
      return;
    }

    let start = 0;
    const duration = 1200;
    const stepTime = 16;
    const increment = target / (duration / stepTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, inView]);

  return <>{count.toLocaleString()}</>;
}

/* -------------------------------------------------------------------------- */
/*                                  IMPACT                                    */
/* -------------------------------------------------------------------------- */

export function Impact() {
  const [active, setActive] = useState(1);

  const ref = useRef(null);
  const inView = useInView(ref, {
    margin: "-10px",
    once: false,
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeIn" },
    },
  };

  return (
    <section ref={ref} className="w-full px-6 py-12 md:px-18 md:py-30">
      <div>
        {/* HEADER (unchanged as provided) */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-4 py-1.5 mb-6">
            <img src="/images/Star.svg" alt="star" className="w-4 h-4" />
            <p className="text-gray-700 font-semibold text-xs md:text-sm tracking-tight">
              Who Is It For?
            </p>
          </div>

          <h2 className="text-4xl md:text-xl lg:text-6xl tracking-tighter font-medium md:max-w-6xl leading-tight">
            The People And Systems Ropan Is <br className="hidden md:block" />
            Built To Strengthen
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          {/* ------------------------------------------------------------------ */}
          {/* LEFT COLUMN (delay 0)                                              */}
          {/* ------------------------------------------------------------------ */}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            transition={{ delay: 0.6 }}
            className="lg:col-span-4 space-y-3"
          >
            <p className="text-sm tracking-wide text-gray-400 mb-3">
              Real Impact on Health & Cost
            </p>

            {SERVICES.map((item, i) => {
              const isActive = active === i;

              return (
                <div
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? "bg-gray-50 border-gray-200"
                      : "bg-white border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between px-5 py-4">
                    <p className="font-medium text-gray-900">{item.title}</p>
                    <span
                      className={`text-gray-400 transition-transform ${
                        isActive ? "rotate-90" : ""
                      }`}
                    >
                      ›
                    </span>
                  </div>

                  {isActive && (
                    <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed">
                      {item.description}
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>

          {/* ------------------------------------------------------------------ */}
          {/* CENTER IMAGE (delay 0.2)                                           */}
          {/* ------------------------------------------------------------------ */}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            transition={{ delay: 0.4}}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl bg-[#eef2ff] shadow-sm overflow-hidden">
              <span className="absolute top-4 left-4 text-xs bg-white/80 backdrop-blur px-3 py-1 rounded-full border border-gray-200 z-10">
                {SERVICES[active].title}
              </span>

              {/* IMAGE CROSSFADE */}
              <div className="relative w-full h-[420px] rounded-2xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={SERVICES[active].image}
                    src={SERVICES[active].image}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>

              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur rounded-xl p-4 border border-gray-200">
                <p className="text-sm font-medium text-gray-900">
                  {SERVICES[active].title}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {SERVICES[active].description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* ------------------------------------------------------------------ */}
          {/* RIGHT STATS (delay 0.4)                                            */}
          {/* ------------------------------------------------------------------ */}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {STATS.map((stat, i) => (
              <div key={i}>
                <p className="text-3xl font-semibold tracking-tight text-gray-900">
                  <CountUp target={stat.value} inView={inView} />
                  {stat.suffix}
                </p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function BuiltToCompound() {
  return (
    <section className="py-12 px-6 md:px-18 md:py-30 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-4 py-1.5 mb-6">
            <img src="/images/Star.svg" alt="star" className="w-4 h-4" />
            <p className="text-gray-700 font-semibold text-xs md:text-sm tracking-tight">
              Built To Compound
            </p>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tighter font-medium md:max-w-6xl leading-tight mx-auto">
            A Platform That Strengthens With <br className="hidden md:block"/> Every Interaction
          </h2>
          
        </div>

        <div className=" border-15 border-white shadow-2xl shadow-blue-200 rounded-4xl ">
          <img src="/images/dashboard.png" alt="" className="w-screen object-cover rounded-2xl"/>
        </div>
      </div>
    </section>
  );
}