import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  UsersRound, 
  FileCheck, 
  CalendarCheck, 
  TrendingUp, 
  BookOpen, 
  GraduationCap, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { INSTITUTE_CONFIG } from '@/lib/index';
import { FEATURES_DATA } from '@/data/index';
import { FeatureCard } from '@/components/Cards';
import { IMAGES } from '@/assets/images';

/**
 * Mapping icons to features for the Features Section
 */
const FEATURE_ICONS = [
  <Users className="w-6 h-6" />,
  <UsersRound className="w-6 h-6" />,
  <FileCheck className="w-6 h-6" />,
  <CalendarCheck className="w-6 h-6" />,
  <TrendingUp className="w-6 h-6" />,
];

const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.HERO_EDUCATION_1} 
            alt="Genius Classes Hero" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/90" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full">
              Welcome to Genius Classes
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-foreground">
              {INSTITUTE_CONFIG.slogan}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 font-medium">
              {INSTITUTE_CONFIG.tagline}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href={INSTITUTE_CONFIG.admissionFormUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-primary-foreground bg-primary rounded-xl shadow-lg hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Apply for Admission
                <ChevronRight className="ml-2 w-5 h-5" />
              </a>
              <a 
                href="#features"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-foreground bg-white border border-border rounded-xl shadow-sm hover:bg-accent transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Why Choose Genius Classes?</h2>
            <p className="text-muted-foreground text-lg">
              We provide a nurturing environment where students are encouraged to reach their full potential through modern teaching methods.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES_DATA.map((feature, index) => (
              <FeatureCard 
                key={index} 
                title={feature.title} 
                description={feature.description} 
                icon={FEATURE_ICONS[index % FEATURE_ICONS.length]} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Medium Selection Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6 text-foreground">Available Mediums</h2>
              <p className="text-lg text-muted-foreground mb-8">
                At Genius Classes, we cater to a diverse group of students by offering education in both primary languages used in our region. Our faculty is highly proficient in delivering curriculum effectively in both mediums.
              </p>
              
              <div className="space-y-6">
                <div className="p-6 bg-white rounded-2xl border border-border shadow-sm flex items-start gap-4 hover:border-primary/50 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">English Medium</h3>
                    <p className="text-muted-foreground">Std 1 to 10. Comprehensive curriculum following NCERT/GSEB standards with expert communication skills focus.</p>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-2xl border border-border shadow-sm flex items-start gap-4 hover:border-primary/50 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Gujarati Medium</h3>
                    <p className="text-muted-foreground">Std 1 to 10. Specialized batches focusing on core concepts in the native language to ensure deep understanding.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src={IMAGES.HERO_EDUCATION_5} 
                alt="Classroom" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Admission CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-[2rem] p-8 md:p-16 text-center text-primary-foreground relative overflow-hidden">
            {/* Decorative background circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Shape Your Future With Us</h2>
              <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
                Admissions are now open for the academic year 2026-27. Secure your child's seat today at the most trusted coaching institute in the city.
              </p>
              <a 
                href={INSTITUTE_CONFIG.admissionFormUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-primary bg-white rounded-2xl shadow-xl hover:bg-muted transition-all hover:scale-[1.05] active:scale-[0.95] group"
              >
                Fill Admission Form
                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="mt-8 text-primary-foreground/60 font-medium">
                Questions? Call us at <span className="text-white underline">{INSTITUTE_CONFIG.phone}</span>
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;