import { h1, section } from "framer-motion/client";
import type { Route } from "./+types/teamAndAdvisors";
import { Link } from "react-router";
import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, useMotionValue, MotionValue, useInView, useSpring, useMotionTemplate, type MotionStyle, AnimatePresence } from "framer-motion";
import { Search, CalendarSync, ShieldCheck } from 'lucide-react';
import type { JSX } from "react/jsx-runtime";
import { Plus, X } from "lucide-react"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "team & Advisors" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function TeamAndAdvisors() {
    return (
        <>
            <Hero />
            <TeamCarousel />
            <Advisor />
        </>
    )
}

export function Hero() {
  return (
    <section className="w-full h-screen p-6 md:p-6">
      <div className="relative rounded-3xl overflow-hidden h-full">

        {/* Background Image */}
        <img
          src="https://images.pexels.com/photos/7580636/pexels-photo-7580636.jpeg" // place image inside /public
          alt="Family walking in forest"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/0 md:w-7xl" />

        {/* Content Container */}
        <div className="relative z-10 h-full flex justify-start items-end">
          <div className="max-w-8xl py-10 px-8 md:py-20 md:px-15">

            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 md:gap-3 bg-white backdrop-blur-md border border-white/20 rounded-full px-2 py-1 mb-4 md:mb-6">
              <span className="w-3 h-3 md:w-6 md:h-6 bg-blue-700 rounded-full border-2 md:border-6 border-blue-100" />
              <p className="text-gray-700 font-normal text-xs md:text-lg tracking-tight mr-1">
                Meet Our Team & Advisors
              </p>
            </div>

            {/* Heading */}
            <h1 className="text-white text-3xl md:text-7xl lg:text-8xl font-medium md:font-normal tracking-tighter leading-23s mb-4 md:mb-6">
              People Building Trust at Scale
            </h1>

            {/* Description */}
            <p className="text-white/80 text-base md:text-xl tracking-tight max-w-5xl mb-6">
              A collective of builders, operators, and advisors shaping how healthcare, insurance, and technology come together — grounded in trust, experience, and long-term thinking.
            </p>

            
          </div>
        </div>
      </div>
    </section>
  );
}

type Member = {
  name: string;
  role: string;
  image: string;
};

const TEAM: Member[] = [
  {
    name: "Dr. Sabine Kapasi",
    role: "CEO & Co-Founder",
    image: "https://enira.co.in/images/member/team-pictures/sabine-min.jpg",
  },
  {
    name: "Rhythm Nadda Gulati",
    role: "Co-Founder",
    image: "team/rhythm.jpg",
  },
  {
    name: "Dr. Hardik Sankhla",
    role: "Director & COO",
    image: "https://enira.co.in/images/member/team-pictures/hardik-min.jpg",
  },
  {
    name: "Dr. Ashish Panghal",
    role: "Chief Corporate Relations",
    image: "https://enira.co.in/images/member/team-pictures/ashish-min.jpg",
  },
  {
    name: "Abhishek Padmanabhan",
    role: "Chief Technology Officer",
    image: "team/abhishek.jpg",
  },
  {
    name: "Arun Patro",
    role: "Policy & Government Head",
    image: "team/arun.jpg",
  },
  {
    name: "Pooja Maurya",
    role: "Senior Manager",
    image: "https://enira.co.in/images/member/team-pictures/pooja-min.jpg",
  },
  {
    name: "Nipun Vaid Mehta",
    role: "Senior Program Manager",
    image: "https://enira.co.in/images/member/team-pictures/nipun-min.jpg",
  },
  {
    name: "Rachita Gupta",
    role: "Senior Consultant",
    image: "https://enira.co.in/images/member/team-pictures/rachita-min.jpg",
  },
  {
    name: "Vedanshi Sharma",
    role: "Program Manager",
    image: "https://enira.co.in/images/member/team-pictures/vedanshi-min.jpg",
  },
];

const ROW_ONE = TEAM.slice(0, 5);
const ROW_TWO = TEAM.slice(5);

export function TeamCarousel() {
  return (
    <section className="py-20">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-4 py-1.5 mb-6">
          <img src="/images/Star.svg" alt="star" className="w-4 h-4" />
          <p className="text-gray-700 font-semibold text-xs md:text-sm tracking-tight">
            Our Team
          </p>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tighter font-medium md:max-w-6xl leading-tight mx-auto">
          Experienced Leaders Across Health,
          <br className="hidden md:block" />
          Insurance, and Technology
        </h2>
      </div>

      {/* ROW 1 */}
      <div className="flex flex-wrap justify-center gap-10 px-6 mb-10 md:mt-20">
        {ROW_ONE.map((member, index) => (
          <Card key={`r1-${index}`} member={member} />
        ))}
      </div>

      {/* ROW 2 */}
      <div className="flex flex-wrap justify-center gap-10 px-6">
        {ROW_TWO.map((member, index) => (
          <Card key={`r2-${index}`} member={member} />
        ))}
      </div>
    </section>
  );
}

function Card({ member }: { member: Member }) {
  return (
    <div className="relative w-[260px] h-[340px] rounded-sm overflow-hidden hover:scale-[1.1] hover:shadow-xl transition-transform duration-300">
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover"
      />

      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      <div className="absolute bottom-5 left-5 text-white">
        <h6 className="text-xl font-semibold tracking-tight">{member.name}</h6>
        <p className="text-sm text-white/80">{member.role}</p>
      </div>
    </div>
  );
}

type Advisor = {
  name: string;
  role: string;
  image: string;
};

const ADVISORS: Advisor[] = [
  { name: "Dr. Rati Godrej", role: "Godrej Industries Limited", image: "/advisors/rati.jpg" },
  { name: "Dr. Anand Deshpande", role: "Chairman & MD, Persistent Systems", image: "/advisors/anand.jpg" },
  { name: "Arjun Malhotra", role: "HCL Co-Founder, Chairman magic Software", image: "/advisors/arjun.jpg" },
  { name: "Dr. Dhiraj Lal Kotadia", role: "Chairman Emeritus", image: "/advisors/dhiraj.jpg" },
  { name: "Priya Agarwal Hebbar", role: "Director, Vedanta Limited", image: "/advisors/priya.jpg" },
  { name: "Mr. Prakash Bakshi", role: "Former Chairman, NABARD", image: "/advisors/prakash.jpg" },

  { name: "Ashish Sehdev", role: "Vice President & Market Leader, Everest Group", image: "/advisors/ashish.jpg" },
  { name: "Dr. Upasana Arora", role: "MD, Yashoda Hospitals & National Chairperson, IACC", image: "/advisors/upasana.jpg" },
  { name: "Neiharika Rajiv", role: "Co-Founder, GI Ventures", image: "/advisors/niharika.jpg" },
  { name: "Dr. Sonia Lal Gupta", role: "Director, Metro Group of Hospitals", image: "/advisors/sonia.jpg" },
  { name: "Indu Navar", role: "CEO & Founder, EverythingALS", image: "/advisors/indu.jpg" },
  { name: "Asha Jadeja Motwani", role: "Founder, Motwani Jadeja Family Foundation", image: "/advisors/asha.jpg" },
];

const ROW_ONE_ADVISOR = ADVISORS.slice(0, 6);
const ROW_TWO_ADVISOR = ADVISORS.slice(6);
console.log(ROW_ONE_ADVISOR, ROW_TWO_ADVISOR)

export function Advisor() {
  return (
    <section className="py-20">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-4 py-1.5 mb-6">
          <img src="/images/Star.svg" alt="star" className="w-4 h-4" />
          <p className="text-gray-700 font-semibold text-xs md:text-sm tracking-tight">
            Our Team
          </p>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tighter font-medium md:max-w-6xl leading-tight mx-auto">
          Experienced Leaders Across Health,
          <br className="hidden md:block" />
          Insurance, and Technology
        </h2>
      </div>

      {/* ROW 1 */}
      <div className="flex flex-wrap justify-center gap-10 px-6 mb-10 md:mt-20">
        {ROW_ONE_ADVISOR.map((member, index) => (
          <Card key={`r1-${index}`} member={member} />
        ))}
      </div>

      {/* ROW 2 */}
      <div className="flex flex-wrap justify-center gap-10 px-6">
        {ROW_TWO_ADVISOR.map((member, index) => (
          <Card key={`r2-${index}`} member={member} />
        ))}
      </div>
    </section>
  );
}