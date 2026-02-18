import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, TrendingUp, Award, Calendar } from 'lucide-react';
import { INSTITUTE_CONFIG } from '@/lib/index';
import { SAMPLE_RESULTS } from '@/data/index';
import { ResultCard } from '@/components/Cards';
import { IMAGES } from '@/assets/images';

const springPresets = {
  gentle: { stiffness: 300, damping: 35 },
  stagger: {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
};

export default function Results() {
  const [selectedYear, setSelectedYear] = useState<string>('All');

  // Get unique years for filtering
  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(SAMPLE_RESULTS.map((r) => r.year)));
    return ['All', ...uniqueYears.sort((a, b) => b.localeCompare(a))];
  }, []);

  // Filter results based on selected year
  const filteredResults = useMemo(() => {
    if (selectedYear === 'All') return SAMPLE_RESULTS;
    return SAMPLE_RESULTS.filter((r) => r.year === selectedYear);
  }, [selectedYear]);

  // Find the overall topper
  const topper = useMemo(() => {
    return [...SAMPLE_RESULTS].sort((a, b) => b.percentage - a.percentage)[0];
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={IMAGES.SUCCESS_RESULTS_1} 
            alt="Success Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/80 to-primary"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springPresets.gentle}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6">
              <Trophy className="w-4 h-4 text-yellow-400" />
              Celebrating Excellence
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Academic Results
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto italic font-medium">
              "{INSTITUTE_CONFIG.slogan}"
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Cards Section */}
      <section className="py-12 -mt-10 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-card p-6 rounded-2xl shadow-lg border border-border flex items-center gap-5"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Star className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Highest Score</p>
                <h3 className="text-3xl font-bold text-primary">{topper?.percentage}%</h3>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-card p-6 rounded-2xl shadow-lg border border-border flex items-center gap-5"
            >
              <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600">
                <TrendingUp className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Pass Rate</p>
                <h3 className="text-3xl font-bold text-foreground">100%</h3>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-card p-6 rounded-2xl shadow-lg border border-border flex items-center gap-5"
            >
              <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Toppers (90%+)</p>
                <h3 className="text-3xl font-bold text-foreground">50+ Students</h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Results Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">The Hall of Fame</h2>
              <p className="text-muted-foreground">Recognizing our brightest stars from {INSTITUTE_CONFIG.name}</p>
            </div>

            {/* Year Filters */}
            <div className="flex flex-wrap items-center gap-3 bg-muted p-1.5 rounded-xl">
              <div className="flex items-center gap-2 px-3 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">Year:</span>
              </div>
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    selectedYear === year
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'hover:bg-background text-muted-foreground'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* Results Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={springPresets.stagger}
            initial="hidden"
            animate="visible"
          >
            {filteredResults.length > 0 ? (
              filteredResults.map((result) => (
                <motion.div
                  key={result.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <ResultCard result={result} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                  <Award className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold">No results found</h3>
                <p className="text-muted-foreground">We couldn't find any results for the selected year.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-3xl p-10 md:p-16 shadow-2xl max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
              Want to see your name here next year?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join Genius Classes today and build a strong foundation for your academic success with our expert guidance and proven teaching methods.
            </p>
            <a
              href={INSTITUTE_CONFIG.admissionFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-95"
            >
              Secure Your Admission Now
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
