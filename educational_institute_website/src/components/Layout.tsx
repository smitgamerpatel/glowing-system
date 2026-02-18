import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle, ChevronRight, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiWhatsapp } from 'react-icons/si';
import { ROUTE_PATHS, INSTITUTE_CONFIG } from '@/lib/index';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [readyForSwipe, setReadyForSwipe] = useState(false);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: ROUTE_PATHS.HOME },
    { name: 'Lectures', path: ROUTE_PATHS.LECTURES },
    { name: 'Notes', path: ROUTE_PATHS.NOTES },
    { name: 'Teachers', path: ROUTE_PATHS.TEACHERS },
    { name: 'Results', path: ROUTE_PATHS.RESULTS },
    { name: 'Contact', path: ROUTE_PATHS.CONTACT },
  ];

  const handleSecretStart = () => {
    setIsHolding(true);
    setHoldProgress(0);
    
    // Start progress animation
    const startTime = Date.now();
    const duration = 5000; // 5 seconds
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setHoldProgress(progress * 100);
      
      if (progress < 1) {
        progressTimerRef.current = setTimeout(updateProgress, 16); // ~60fps
      } else {
  // Hold complete, enable swipe mode
  setIsHolding(false);
  setReadyForSwipe(true);
}
    };
    
    updateProgress();
    
    // Set timeout for hold completion
    holdTimerRef.current = setTimeout(() => {
      setIsHolding(false);
    }, duration);
  };
  
  const handleSecretEnd = () => {
  // Agar swipe ready nahi hua tabhi reset kare
  if (!readyForSwipe) {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
    }
    if (progressTimerRef.current) {
      clearTimeout(progressTimerRef.current);
    }
    setIsHolding(false);
    setHoldProgress(0);
  }
};
  
  const handleSecretDragEnd = (_: any, info: any) => {
    // If hold was completed (progress = 100) and dragged upward significantly
    if (readyForSwipe && info.offset.y < -80) {
  setReadyForSwipe(false);
  setHoldProgress(0);
  navigate(ROUTE_PATHS.ADMIN_LOGIN);
}
  };
  
  const handleSecretClick = () => {
    if (holdProgress < 100) {
      setShowThankYou(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Fixed Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-md shadow-md py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <NavLink to={ROUTE_PATHS.HOME} className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-foreground">
                Genius <span className="text-primary">Classes</span>
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest leading-none">
                Educational Excellence
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? 'text-primary' : 'text-foreground/70'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <a
              href={INSTITUTE_CONFIG.admissionFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md hover:bg-primary/90 transition-all active:scale-95"
            >
              Join Now
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-2xl font-bold ${isActive ? 'text-primary' : 'text-foreground'}`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <a
                href={INSTITUTE_CONFIG.admissionFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full bg-primary text-white py-4 rounded-2xl text-center font-bold text-lg shadow-xl"
              >
                Enroll Now
              </a>
              <div className="mt-8 pt-8 border-t border-border flex flex-col gap-4">
                <p className="text-muted-foreground font-medium">Quick Contact</p>
                <a href={`tel:${INSTITUTE_CONFIG.phone}`} className="flex items-center gap-3 text-lg font-semibold">
                  <Phone size={20} className="text-primary" />
                  {INSTITUTE_CONFIG.phone}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Info Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">G</span>
                </div>
                <span className="text-xl font-bold">Genius Classes</span>
              </div>
              <p className="text-muted-foreground italic">"{INSTITUTE_CONFIG.slogan}"</p>
            </div>

            {/* Quick Links Section */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg">Quick Links</h4>
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                  >
                    <ChevronRight size={14} />
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Contact Section */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg">Contact</h4>
              <div className="space-y-3">
                <a 
                  href={`tel:${INSTITUTE_CONFIG.phone}`} 
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Phone size={16} className="text-primary" />
                  </div>
                  {INSTITUTE_CONFIG.phone}
                </a>
                <a 
                  href={`https://wa.me/91${INSTITUTE_CONFIG.whatsapp}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-green-600 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                    <SiWhatsapp size={16} className="text-green-600" />
                  </div>
                  WhatsApp
                </a>
                <a 
                  href={INSTITUTE_CONFIG.mapsUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <MapPin size={16} className="text-primary" />
                  </div>
                  View on Map
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border/50 flex flex-col items-center gap-4">
            {/* Secret Admin Trigger */}
            <div className="relative">
              <motion.span
  drag="y"
  dragElastic={0.2}
  dragConstraints={{ top: -150, bottom: 0 }}
  onPointerDown={handleSecretStart}
  onPointerUp={handleSecretEnd}
  onPointerLeave={handleSecretEnd}
  onDragEnd={handleSecretDragEnd}
  onClick={handleSecretClick}
                className="text-xs text-muted-foreground/40 cursor-pointer select-none hover:text-muted-foreground transition-colors relative inline-block"
              >
                Thank you for visiting
                
                {/* Circular Progress Indicator */}
                {isHolding && (
                  <div className="absolute inset-0 -m-2">
                    <svg className="w-full h-full" viewBox="0 0 40 40">
                      <circle
                        cx="20"
                        cy="20"
                        r="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        opacity="0.2"
                      />
                      <circle
                        cx="20"
                        cy="20"
                        r="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={`${2 * Math.PI * 18}`}
                        strokeDashoffset={`${2 * Math.PI * 18 * (1 - holdProgress / 100)}`}
                        transform="rotate(-90 20 20)"
                        className="text-primary transition-all duration-75"
                      />
                    </svg>
                  </div>
                )}
              </motion.span>
              
              <AnimatePresence>
                {showThankYou && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-64 bg-card border border-border p-4 rounded-xl shadow-2xl z-50 text-center"
                  >
                    <p className="text-sm font-medium">Thank you for visiting Genius Classes</p>
                    <button 
                      onClick={() => setShowThankYou(false)}
                      className="mt-2 text-xs text-primary font-bold"
                    >
                      Close
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <p className="text-xs text-muted-foreground text-center">
              © {INSTITUTE_CONFIG.currentYear} Genius Classes — Developed by Smit Patel
            </p>
          </div>
        </div>
      </footer>

      {/* Global WhatsApp Float */}
      <a
        href={`https://wa.me/${INSTITUTE_CONFIG.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110 active:scale-95"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
}
