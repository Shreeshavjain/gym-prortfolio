"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const trainersScrollRef = useRef<HTMLDivElement>(null);

  // Detect prefers-reduced-motion and screen size
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    mediaQuery.addEventListener("change", handleMotionChange);
    window.addEventListener("resize", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Animation configuration based on motion preference and screen size
  const animDistance = isMobile ? 20 : 40;
  const animDuration = prefersReducedMotion ? 0 : isMobile ? 0.5 : 0.6;
  const animOpacity = prefersReducedMotion ? 1 : 0;
  const animTranslateY = prefersReducedMotion ? 0 : animDistance;

  const scroll = (direction: "left" | "right", ref?: React.RefObject<HTMLDivElement | null>) => {
    const container = ref?.current || scrollContainerRef.current;
    if (container) {
      const scrollAmount = 400;
      const currentScroll = container.scrollLeft;
      const targetScroll =
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount;

      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  const programs = [
    {
      id: 1,
      title: "Strength Training",
      description: "Build muscle and increase your power with our expert trainers.",
      tags: ["Strength", "Weights", "Gains"],
      image: "/images/strength.jpg",
    },
    {
      id: 2,
      title: "Cardio Blast",
      description: "High-intensity cardio sessions to boost your endurance.",
      tags: ["Cardio", "Stamina", "HIIT"],
      image: "/images/cardio.webp",
    },
    {
      id: 3,
      title: "Yoga & Flexibility",
      description: "Improve flexibility and mental wellness with guided sessions.",
      tags: ["Yoga", "Flexibility", "Calm"],
      image: "/images/yoga.png",
    },
    {
      id: 4,
      title: "Nutrition Coaching",
      description: "Personalized meal plans designed for your fitness goals.",
      tags: ["Diet", "Nutrition", "Health"],
      image: "/images/diet.webp",
    },
    {
      id: 5,
      title: "CrossFit Training",
      description: "Functional fitness workouts for complete body transformation.",
      tags: ["CrossFit", "Functional", "Power"],
      image: "/images/crossfit.jpg",
    },
  ];

  return (
    <div className="w-full scroll-smooth">
      {/* Hero Section */}
      <div
        className="relative min-h-screen w-full flex items-center justify-start bg-cover bg-center bg-no-repeat md:justify-start lg:justify-start"
        style={{
          backgroundImage: 'url("/images/hero.jpg")',
        }}
      >
        {/* Fixed Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-6 flex items-center justify-between">
            {/* Left Side - Logo and Gym Name */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Circular Logo Placeholder */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm sm:text-base">IP</span>
              </div>
              {/* Gym Name */}
              <h1 className="text-white font-bold text-sm sm:text-base md:text-lg uppercase tracking-wider">
                Iron Pulse <br className="hidden sm:none" />
                <span className="hidden sm:inline">Fitness</span>
              </h1>
            </div>

            {/* Right Side - Desktop Navigation and Mobile Menu */}
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center gap-8 lg:gap-12">
                <a href="#programs" className="text-gray-300 hover:text-green-500 font-semibold text-sm uppercase transition-colors duration-200">
                  Programs
                </a>
                <a href="#achievements" className="text-gray-300 hover:text-green-500 font-semibold text-sm uppercase transition-colors duration-200">
                  Achievements
                </a>
                <a href="#trainers" className="text-gray-300 hover:text-green-500 font-semibold text-sm uppercase transition-colors duration-200">
                  Trainers
                </a>
                <a href="#plans" className="text-gray-300 hover:text-green-500 font-semibold text-sm uppercase transition-colors duration-200">
                  Plans
                </a>
                <a href="#contact" className="text-gray-300 hover:text-green-500 font-semibold text-sm uppercase transition-colors duration-200">
                  Contact
                </a>
              </div>

              {/* Social Icons - Always Visible */}
              <div className="flex items-center gap-4">
                {/* WhatsApp Icon */}
                <a
                  href="https://wa.me/911111111111?text=Hi%20IRON%20PULSE%20FITNESS%2C%20I%20would%20like%20to%20know%20more%20about%20your%20memberships."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity duration-200"
                >
                  <img src="https://cdn.simpleicons.org/whatsapp/25D366" alt="WhatsApp" className="w-6 h-6" />
                </a>

                {/* Instagram Icon */}
                <a
                  href="https://instagram.com/ironpulsefitness"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity duration-200"
                >
                  <img src="https://cdn.simpleicons.org/instagram/ffffff" alt="Instagram" className="w-6 h-6" />
                </a>
              </div>

              {/* Hamburger Menu Button - Mobile Only */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden flex items-center justify-center w-10 h-10 text-white hover:text-green-500 transition-colors duration-200"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-black/95 border-t border-white/10 px-4 py-4 space-y-3">
              <a
                href="#programs"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-300 hover:text-green-500 font-semibold text-sm uppercase transition-colors duration-200 py-2"
              >
                Programs
              </a>
              <a
                href="#achievements"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-300 hover:text-green-500 font-semibold text-sm uppercase transition-colors duration-200 py-2"
              >
                Achievements
              </a>
              <a
                href="#trainers"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-300 hover:text-green-500 font-semibold text-sm uppercase transition-colors duration-200 py-2"
              >
                Trainers
              </a>
              <a
                href="#plans"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-300 hover:text-green-500 font-semibold text-sm uppercase transition-colors duration-200 py-2"
              >
                Plans
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-300 hover:text-green-500 font-semibold text-sm uppercase transition-colors duration-200 py-2"
              >
                Contact
              </a>
            </div>
          )}
        </nav>

        {/* Dark Overlay - 60% opacity */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 flex flex-col items-center justify-center text-center md:items-start md:text-left md:pl-16 lg:pl-24">
          <div className="max-w-2xl">
            {/* Headline - 2 Lines */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase leading-tight tracking-tight text-white mb-4 sm:mb-6">
              Transform Your <br className="hidden sm:block" />
              Body Today
            </h1>

            {/* Subtitle */}
            <p className="text-gray-300 text-base sm:text-lg mb-8 sm:mb-12 font-light">
              Join our premium gym and start your fitness journey
            </p>

            {/* CTA Button */}
            <motion.button 
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold uppercase px-8 sm:px-10 py-3 sm:py-4 rounded transition-colors duration-200 text-sm sm:text-base"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </div>

      {/* Our Programs Section */}
      <motion.section
        id="programs"
        className="bg-black py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: animOpacity, translateY: animTranslateY }}
        whileInView={{ opacity: 1, translateY: 0 }}
        transition={{ duration: animDuration }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-white mb-4">
              Our Programs
            </h2>
            <p className="text-gray-400 text-base sm:text-lg">
              Choose the perfect program for your fitness journey
            </p>
          </div>

          {/* Scroll Container with Navigation Arrows */}
          <div className="relative group">
            {/* Left Arrow - Desktop Only */}
            <button
              onClick={() => scroll("left")}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-20 items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-green-500 text-white transition-all duration-300 hover:scale-110"
              aria-label="Scroll left"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Right Arrow - Desktop Only */}
            <button
              onClick={() => scroll("right")}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-20 items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-green-500 text-white transition-all duration-300 hover:scale-110"
              aria-label="Scroll right"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Horizontal Scroll Container */}
            <div
              ref={scrollContainerRef}
              className="overflow-x-auto scrollbar-hide scroll-smooth"
            >
              <div className="flex gap-6 pb-4 min-w-min">
                {programs.map((program) => (
                  <div
                    key={program.id}
                    className="flex-shrink-0 w-64 sm:w-72 md:w-80 group cursor-pointer"
                  >
                    {/* Card */}
                    <div className="relative h-80 rounded-lg overflow-hidden bg-cover bg-center mb-4 shadow-lg transition-transform duration-300 group-hover:scale-105"
                      style={{
                        backgroundImage: `url("${program.image}")`,
                      }}
                    >
                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-300"></div>

                    {/* Title on Image */}
                    <div className="absolute inset-0 flex items-end p-4 sm:p-5">
                      <h3 className="text-white font-bold text-lg sm:text-xl uppercase">
                        {program.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="space-y-3">
                    {/* Description */}
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed line-clamp-2">
                      {program.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {program.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block bg-green-500/20 text-green-400 text-xs sm:text-sm px-3 py-1 rounded-full border border-green-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Our Achievements Section */}
      <motion.section
        id="achievements"
        className="bg-neutral-900 py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: animOpacity, translateY: animTranslateY }}
        whileInView={{ opacity: 1, translateY: 0 }}
        transition={{ duration: animDuration }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-white mb-4">
              Our Achievements
            </h2>
            <p className="text-gray-400 text-base sm:text-lg">
              Proven results from our community
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
            {/* Stat Card 1 */}
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-green-500 mb-3 sm:mb-4">
                10,000+
              </p>
              <p className="text-gray-300 text-sm sm:text-base font-light tracking-wide uppercase">
                Active Members
              </p>
            </div>

            {/* Stat Card 2 */}
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-green-500 mb-3 sm:mb-4">
                500+
              </p>
              <p className="text-gray-300 text-sm sm:text-base font-light tracking-wide uppercase">
                Classes Per Week
              </p>
            </div>

            {/* Stat Card 3 */}
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-green-500 mb-3 sm:mb-4">
                50+
              </p>
              <p className="text-gray-300 text-sm sm:text-base font-light tracking-wide uppercase">
                Expert Trainers
              </p>
            </div>

            {/* Stat Card 4 */}
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-green-500 mb-3 sm:mb-4">
                95%
              </p>
              <p className="text-gray-300 text-sm sm:text-base font-light tracking-wide uppercase">
                Satisfaction Rate
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Meet Our Trainers Section */}
      <motion.section
        id="trainers"
        className="bg-black py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: animOpacity, translateY: animTranslateY }}
        whileInView={{ opacity: 1, translateY: 0 }}
        transition={{ duration: animDuration }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-white mb-4">
              Meet Our Trainers
            </h2>
            <p className="text-gray-400 text-base sm:text-lg">
              Expert professionals dedicated to your success
            </p>
          </div>

          {/* Horizontal Scroll Container with Navigation Arrows */}
          <div className="relative group">
            {/* Left Arrow - Desktop Only */}
            <button
              onClick={() => scroll("left", trainersScrollRef)}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-20 items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-green-500 text-white transition-all duration-300 hover:scale-110"
              aria-label="Scroll left"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Right Arrow - Desktop Only */}
            <button
              onClick={() => scroll("right", trainersScrollRef)}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-20 items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-green-500 text-white transition-all duration-300 hover:scale-110"
              aria-label="Scroll right"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Horizontal Scroll Container */}
            <div
              ref={trainersScrollRef}
              className="overflow-x-auto scrollbar-hide scroll-smooth"
            >
              <div className="flex gap-6 pb-4 min-w-min">
                {/* Trainer Card 1 */}
                <div className="flex-shrink-0 w-64 sm:w-72 md:w-80 group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg mb-5 sm:mb-6 h-80 sm:h-96 transition-transform duration-300 group-hover:scale-105">
                    <img
                      src="/images/strength coach.webp"
                      alt="Marcus Johnson"
                      className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    Marcus Johnson
                  </h3>
                  <p className="text-green-500 text-xs sm:text-sm font-semibold mb-3 uppercase tracking-wide">
                    Strength Coach
                  </p>
                  <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed line-clamp-2">
                    15+ years of experience in powerlifting and muscle building.
                  </p>
                </div>

                {/* Trainer Card 2 */}
                <div className="flex-shrink-0 w-64 sm:w-72 md:w-80 group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg mb-5 sm:mb-6 h-80 sm:h-96 transition-transform duration-300 group-hover:scale-105">
                    <img
                      src="/images/cardio coach.jpg"
                      alt="Sarah Chen"
                      className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    Sarah Chen
                  </h3>
                  <p className="text-green-500 text-xs sm:text-sm font-semibold mb-3 uppercase tracking-wide">
                    Cardio Expert
                  </p>
                  <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed line-clamp-2">
                    Certified HIIT instructor with passion for high-energy workouts.
                  </p>
                </div>

                {/* Trainer Card 3 */}
                <div className="flex-shrink-0 w-64 sm:w-72 md:w-80 group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg mb-5 sm:mb-6 h-80 sm:h-96 transition-transform duration-300 group-hover:scale-105">
                    <img
                      src="/images/yoga coach.webp"
                      alt="David Rivera"
                      className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    David Rivera
                  </h3>
                  <p className="text-green-500 text-xs sm:text-sm font-semibold mb-3 uppercase tracking-wide">
                    Yoga Specialist
                  </p>
                  <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed line-clamp-2">
                    Mind-body wellness expert specializing in flexibility and balance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Membership Plans Section */}
      <motion.section
        id="plans"
        className="bg-neutral-900 py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: animOpacity, translateY: animTranslateY }}
        whileInView={{ opacity: 1, translateY: 0 }}
        transition={{ duration: animDuration }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-white mb-4">
              Membership Plans
            </h2>
            <p className="text-gray-400 text-base sm:text-lg">
              Choose the perfect plan for your fitness journey
            </p>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-6 max-w-6xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-black rounded-lg p-8 sm:p-10 border border-gray-800 hover:border-gray-700 transition-all duration-300 flex flex-col">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Basic
              </h3>
              <p className="text-gray-400 text-sm mb-6">Perfect for beginners</p>
              <div className="mb-8">
                <span className="text-4xl sm:text-5xl font-bold text-white">₹</span>
                <span className="text-5xl sm:text-6xl font-bold text-white ml-1">2,999</span>
                <p className="text-gray-400 text-sm mt-2">/month</p>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300 text-sm sm:text-base">Gym Access</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300 text-sm sm:text-base">Basic Equipment Access</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300 text-sm sm:text-base">2 Group Classes/Week</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300 text-sm sm:text-base">Mobile App Access</span>
                </li>
              </ul>

              {/* CTA Button */}
              <a
                href="https://wa.me/911111111111?text=Hi%20IRON%20PULSE%20FITNESS%2C%20I%20would%20like%20to%20know%20more%20about%20the%20Basic%20membership%20plan."
                target="_blank"
                rel="noopener noreferrer"
                className="text-center block w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold uppercase py-3 sm:py-4 rounded transition-colors duration-200 transition-all duration-300 hover:scale-105"
              >
                Join Now
              </a>
            </div>

            {/* Pro Plan - Highlighted */}
            <div className="bg-black rounded-lg p-8 sm:p-10 border-2 border-green-500 hover:border-green-400 transition-all duration-300 flex flex-col transform md:scale-105">
              <div className="inline-block bg-green-500 text-black font-bold text-xs sm:text-sm px-3 py-1 rounded-full mb-3 w-fit">
                MOST POPULAR
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Pro
              </h3>
              <p className="text-gray-400 text-sm mb-6">Recommended for results</p>
              <div className="mb-8">
                <span className="text-4xl sm:text-5xl font-bold text-green-500">₹</span>
                <span className="text-5xl sm:text-6xl font-bold text-white ml-1">5,999</span>
                <p className="text-gray-400 text-sm mt-2">/month</p>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300 text-sm sm:text-base">Unlimited Gym Access</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300 text-sm sm:text-base">Personal Training (4x/Month)</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300 text-sm sm:text-base">Unlimited Group Classes</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300 text-sm sm:text-base">Nutrition Coaching</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300 text-sm sm:text-base">Mobile App Access</span>
                </li>
              </ul>

              {/* CTA Button */}
              <a
                href="https://wa.me/911111111111?text=Hi%20IRON%20PULSE%20FITNESS%2C%20I%20would%20like%20to%20know%20more%20about%20the%20Pro%20membership%20plan."
                target="_blank"
                rel="noopener noreferrer"
                className="text-center block w-full bg-green-500 hover:bg-green-600 text-white font-semibold uppercase py-3 sm:py-4 rounded transition-colors duration-200 transition-all duration-300 hover:scale-105"
              >
                Join Now
              </a>
            </div>

            {/* Elite Plan */}
            <div className="bg-black rounded-lg p-8 sm:p-10 border border-gray-800 hover:border-gray-700 transition-all duration-300 flex flex-col">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Elite
              </h3>
              <p className="text-gray-400 text-sm mb-6">Ultimate fitness experience</p>
              <div className="mb-8">
                <span className="text-4xl sm:text-5xl font-bold text-white">₹</span>
                <span className="text-5xl sm:text-6xl font-bold text-white ml-1">9,999</span>
                <p className="text-gray-400 text-sm mt-2">/month</p>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300 text-sm sm:text-base">24/7 Gym Access</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300 text-sm sm:text-base">Unlimited Personal Training</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300 text-sm sm:text-base">Priority Class Booking</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300 text-sm sm:text-base">Premium Nutrition Plans</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300 text-sm sm:text-base">VIP Locker & Guest Pass</span>
                </li>
              </ul>

              {/* CTA Button */}
              <a
                href="https://wa.me/911111111111?text=Hi%20IRON%20PULSE%20FITNESS%2C%20I%20would%20like%20to%20know%20more%20about%20the%20Elite%20membership%20plan."
                target="_blank"
                rel="noopener noreferrer"
                className="text-center block w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold uppercase py-3 sm:py-4 rounded transition-colors duration-200 transition-all duration-300 hover:scale-105"
              >
                Join Now
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Us Section */}
      <motion.section
        id="contact"
        className="bg-black py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: animOpacity, translateY: animTranslateY }}
        whileInView={{ opacity: 1, translateY: 0 }}
        transition={{ duration: animDuration }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-white mb-4">
              Contact Us
            </h2>
            <p className="text-gray-400 text-base sm:text-lg">
              Get in touch with our team
            </p>
          </div>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Contact Information */}
            <div className="flex flex-col justify-start">
              {/* Gym Name */}
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8">
                IRON PULSE FITNESS
              </h3>

              {/* Contact Details */}
              <div className="space-y-6">
                {/* Address */}
                <div>
                  <p className="text-gray-400 text-sm font-semibold uppercase tracking-wide mb-2">
                    Address
                  </p>
                  <p className="text-gray-300 text-base sm:text-lg">
                    123 Fitness Street<br />
                    Gym District, Metro City<br />
                    State 560001, India
                  </p>
                </div>

                {/* Phone */}
                <div>
                  <p className="text-gray-400 text-sm font-semibold uppercase tracking-wide mb-2">
                    Phone
                  </p>
                  <a href="tel:+919876543210" className="text-green-500 hover:text-green-400 text-base sm:text-lg font-semibold transition-colors duration-200">
                    +91 98765 43210
                  </a>
                </div>

                {/* Email */}
                <div>
                  <p className="text-gray-400 text-sm font-semibold uppercase tracking-wide mb-2">
                    Email
                  </p>
                  <a href="mailto:info@ironpulsefitness.com" className="text-green-500 hover:text-green-400 text-base sm:text-lg font-semibold transition-colors duration-200">
                    info@ironpulsefitness.com
                  </a>
                </div>

                {/* Social Links */}
                <div className="pt-4 flex gap-6">
                  {/* WhatsApp Button */}
                  <a
                    href="https://wa.me/911111111111?text=Hi%20IRON%20PULSE%20FITNESS%2C%20I%20would%20like%20to%20know%20more%20about%20your%20memberships."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg hover:bg-neutral-800 hover:opacity-80 transition-all duration-200"
                  >
                    <img
                      src="https://cdn.simpleicons.org/whatsapp/25D366"
                      alt="WhatsApp"
                      className="w-9 h-9"
                    />
                  </a>

                  {/* Instagram Link */}
                  <a
                    href="https://instagram.com/ironpulsefitness"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg hover:bg-neutral-800 hover:opacity-80 transition-all duration-200"
                  >
                    <img
                      src="https://cdn.simpleicons.org/instagram/ffffff"
                      alt="Instagram"
                      className="w-9 h-9"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Google Map */}
            <div className="flex items-center justify-center">
              <div className="w-full rounded-lg overflow-hidden shadow-lg h-80 sm:h-96 md:h-[500px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.8725259827157!2d77.59453!3d12.9352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1508827e3485%3A0xfb962e4982e35a7!2sGym%20District%2C%20Bangalore!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
