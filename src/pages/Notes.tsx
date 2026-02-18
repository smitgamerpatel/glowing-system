import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Download, 
  FileText, 
  Filter, 
  BookOpen, 
  GraduationCap, 
  Languages, 
  FileArchive,
  FileCode,
  FileImage,
  FileVideo,
  File
} from 'lucide-react';
import { useLocalStorage, Note, INSTITUTE_CONFIG } from '@/lib/index';
import { IMAGES } from '@/assets/images';

const getIcon = (type: string) => {
  const t = type.toLowerCase();
  if (t.includes('pdf')) return <FileText className="w-8 h-8 text-destructive" />;
  if (t.includes('doc')) return <FileText className="w-8 h-8 text-blue-600" />;
  if (t.includes('ppt')) return <FileArchive className="w-8 h-8 text-orange-500" />;
  if (t.includes('jpg') || t.includes('png') || t.includes('image')) return <FileImage className="w-8 h-8 text-emerald-500" />;
  return <File className="w-8 h-8 text-muted-foreground" />;
};

export default function Notes() {
  const [notes] = useLocalStorage<Note[]>('genius_classes_notes', []);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStandard, setSelectedStandard] = useState<string>('All');
  const [selectedMedium, setSelectedMedium] = useState<'All' | 'English' | 'Gujarati'>('All');

  const standards = ['All', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesSearch = 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.subject.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStandard = selectedStandard === 'All' || note.standard === selectedStandard;
      const matchesMedium = selectedMedium === 'All' || note.medium === selectedMedium;
      
      return matchesSearch && matchesStandard && matchesMedium;
    });
  }, [notes, searchQuery, selectedStandard, selectedMedium]);

  const handleDownload = (fileUrl: string, fileName: string) => {
    // In a production app, this would trigger a download
    // For this demo, we'll open the link in a new tab
    window.open(fileUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
        <img 
          src={IMAGES.STUDY_MATERIALS_1} 
          alt="Study Materials" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background" />
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-primary mb-4"
          >
            Study Materials
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Access premium notes, practice papers, and educational resources designed for academic excellence.
          </motion.p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        {/* Filters Section */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Search className="w-4 h-4 text-primary" /> Search Subject or Title
              </label>
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            {/* Standard Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-primary" /> Standard
              </label>
              <select 
                value={selectedStandard}
                onChange={(e) => setSelectedStandard(e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              >
                {standards.map(std => (
                  <option key={std} value={std}>{std === 'All' ? 'All Standards' : `Std ${std}`}</option>
                ))}
              </select>
            </div>

            {/* Medium Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Languages className="w-4 h-4 text-primary" /> Medium
              </label>
              <div className="flex bg-muted rounded-lg p-1">
                {['All', 'English', 'Gujarati'].map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedMedium(m as any)}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
                      selectedMedium === m 
                        ? 'bg-card text-primary shadow-sm' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters Button (Optional) */}
            <div className="flex items-end">
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedStandard('All');
                  setSelectedMedium('All');
                }}
                className="w-full py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2"
              >
                <Filter className="w-4 h-4" /> Reset All Filters
              </button>
            </div>
          </div>
        </div>

        {/* Notes Grid */}
        <AnimatePresence mode="popLayout">
          {filteredNotes.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredNotes.map((note) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={note.id}
                  className="group bg-card border border-border hover:border-primary/30 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-muted rounded-xl group-hover:bg-primary/10 transition-colors">
                      {getIcon(note.fileType)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-primary transition-colors">
                        {note.title}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <BookOpen className="w-3 h-3" /> {note.subject}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-2 py-1 bg-secondary text-secondary-foreground text-[10px] font-bold uppercase tracking-wider rounded">
                      Std {note.standard}
                    </span>
                    <span className="px-2 py-1 bg-accent/20 text-accent-foreground text-[10px] font-bold uppercase tracking-wider rounded">
                      {note.medium} Medium
                    </span>
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-[10px] font-bold uppercase tracking-wider rounded ml-auto">
                      .{note.fileType.split('/').pop()}
                    </span>
                  </div>

                  <button 
                    onClick={() => handleDownload(note.fileUrl, note.fileName)}
                    className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-[0.98] transition-all shadow-md shadow-primary/20"
                  >
                    <Download className="w-4 h-4" /> Download Material
                  </button>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <div className="bg-muted w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No Materials Found</h2>
              <p className="text-muted-foreground">Try adjusting your filters or search query to find what you're looking for.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">"{INSTITUTE_CONFIG.slogan}"</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Join Genius Classes today and get access to our exclusive offline library and personalized mentoring.
          </p>
          <a 
            href={INSTITUTE_CONFIG.admissionFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all hover:scale-105"
          >
            Enroll Now <Download className="w-4 h-4 rotate-[-90deg]" />
          </a>
        </div>
      </section>
    </div>
  );
}
