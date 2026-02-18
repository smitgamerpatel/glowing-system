import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Filter, Search } from 'lucide-react';
import { 
  useLocalStorage, 
  Lecture, 
  INSTITUTE_CONFIG 
} from '@/lib/index';
import { LectureCard } from '@/components/Cards';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CATEGORIES = [
  'All',
  'Std 9 English',
  'Std 10 English',
  'Std 12 English',
  'English Grammar'
] as const;

type CategoryType = typeof CATEGORIES[number];

export default function Lectures() {
  // Fetch lectures from local storage (managed by Admin Panel)
  const [lectures] = useLocalStorage<Lecture[]>('genius_lectures', []);
  
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering logic
  const filteredLectures = useMemo(() => {
    return lectures.filter((lecture) => {
      const matchesCategory = selectedCategory === 'All' || lecture.category === selectedCategory;
      const matchesSearch = lecture.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [lectures, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full">
              Video Library
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              E-Learning Lectures
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto italic">
              "{INSTITUTE_CONFIG.slogan}"
            </p>
          </motion.div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full transition-all duration-300 ${
                  selectedCategory === cat 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "hover:bg-accent"
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search lectures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-full border-border focus:ring-primary"
            />
          </div>
        </div>

        {/* Lectures Grid */}
        <AnimatePresence mode="popLayout">
          {filteredLectures.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredLectures.map((lecture) => (
                <motion.div
                  key={lecture.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <LectureCard lecture={lecture} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                <Video className="w-10 h-10 text-muted-foreground/50" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No Lectures Found</h3>
              <p className="text-muted-foreground max-w-sm">
                {lectures.length === 0 
                  ? "Our teachers are currently preparing video content. Please check back later!" 
                  : "No lectures match your current search or filter criteria."}
              </p>
              {lectures.length > 0 && (
                <Button 
                  variant="link" 
                  onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                  className="mt-4 text-primary"
                >
                  Clear all filters
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Learning Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-3xl bg-primary/5 border border-primary/10 text-center"
        >
          <h4 className="text-xl font-bold text-primary mb-2">Need More Help?</h4>
          <p className="text-muted-foreground mb-6">
            Our teachers are available for doubt-solving sessions every weekend. 
            Join our offline batches for personalized attention.
          </p>
          <Button 
            onClick={() => window.open(INSTITUTE_CONFIG.admissionFormUrl, '_blank')}
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-8"
          >
            Inquire Now
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
