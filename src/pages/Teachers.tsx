import { motion } from 'framer-motion';
import { Users, GraduationCap, Award, Briefcase } from 'lucide-react';

import { INSTITUTE_CONFIG } from '@/lib/index';
import { TEACHERS_DATA } from '@/data/index';
import { TeacherCard } from '@/components/Cards';

/**
 * Teachers page displaying the faculty profiles of Genius Classes.
 * Features a responsive grid of teacher cards with professional details.
 */
export default function Teachers() {
  // Animation variants for the container and children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Header Section */}
      <section className="relative bg-primary py-20 text-primary-foreground">
        <div className="absolute inset-0 z-0 opacity-10 overflow-hidden">
          <Users className="w-96 h-96 -bottom-10 -right-10 absolute rotate-12" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Meet Our Expert Faculty
            </h1>
            <p className="text-xl md:text-2xl font-medium opacity-90">
              "{INSTITUTE_CONFIG.slogan}"
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <GraduationCap className="w-5 h-5" />
                <span className="text-sm font-semibold">Highly Qualified</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Award className="w-5 h-5" />
                <span className="text-sm font-semibold">Proven Track Record</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Briefcase className="w-5 h-5" />
                <span className="text-sm font-semibold">Industry Experts</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Teachers Grid Section */}
      <section className="container mx-auto px-4 -mt-10 relative z-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {TEACHERS_DATA.map((teacher) => (
            <motion.div key={teacher.id} variants={itemVariants}>
              <TeacherCard teacher={teacher} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Institutional Values Section */}
      <section className="container mx-auto px-4 mt-24">
        <div className="bg-accent/30 rounded-3xl p-8 md:p-12 border border-accent/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary mb-6">
              Our Teaching Philosophy
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              At {INSTITUTE_CONFIG.name}, we believe that teachers are the backbone of educational success. 
              Our faculty doesn't just teach subjects; they mentor students to build a strong foundation for their future. 
              From Standard 1 to 10, in both English and Gujarati Mediums, our educators use modern pedagogical 
              techniques combined with personal attention to ensure every student thrives.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
                <h3 className="font-bold text-primary mb-2">Concept Clarity</h3>
                <p className="text-sm text-muted-foreground">Deep diving into fundamental concepts before moving to complex problems.</p>
              </div>
              <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
                <h3 className="font-bold text-primary mb-2">Adaptive Style</h3>
                <p className="text-sm text-muted-foreground">Adjusting teaching methods to suit different learning speeds of students.</p>
              </div>
              <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
                <h3 className="font-bold text-primary mb-2">Ethics & Discipline</h3>
                <p className="text-sm text-muted-foreground">Inculcating moral values alongside academic excellence.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 mt-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Want to learn from the best?</h2>
        <p className="text-muted-foreground mb-8">Join Genius Classes today and start your journey towards excellence.</p>
        <a
          href={INSTITUTE_CONFIG.admissionFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-1 active:scale-95"
        >
          Apply for Admission
        </a>
      </section>
    </div>
  );
}
