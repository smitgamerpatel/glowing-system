import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  BookOpen, 
  User, 
  Award, 
  Calendar, 
  Trash2, 
  PlayCircle 
} from 'lucide-react';
import { 
  Teacher, 
  Lecture, 
  Result, 
  formatYouTubeUrl 
} from '@/lib/index';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

/**
 * TeacherCard displays teacher profile details with a premium hover effect.
 */
export function TeacherCard({ teacher }: { teacher: Teacher }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative overflow-hidden rounded-2xl bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={teacher.photo}
          alt={teacher.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <p className="text-white/90 text-sm font-medium">{teacher.qualification}</p>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
            {teacher.subject}
          </Badge>
        </div>
        <h3 className="text-xl font-bold text-foreground">{teacher.name}</h3>
        <div className="mt-3 flex items-center gap-2 text-muted-foreground text-sm">
          <Calendar className="h-4 w-4 text-primary" />
          <span>{teacher.experience} Experience</span>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * FeatureCard highlights key institute benefits with icons.
 */
export function FeatureCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-8 rounded-2xl bg-card border border-border shadow-sm hover:border-primary/50 hover:bg-primary/[0.02] transition-colors group"
    >
      <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

/**
 * ResultCard showcases student achievements and percentages.
 */
export function ResultCard({ result }: { result: Result }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative flex flex-col items-center p-6 rounded-2xl bg-white border border-border shadow-md text-center"
    >
      <div className="absolute -top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
        {result.year}
      </div>
      <div className="h-24 w-24 rounded-full border-4 border-primary/20 overflow-hidden mb-4 shadow-inner">
        <img
          src={result.photo || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1000'}
          alt={result.studentName}
          className="h-full w-full object-cover"
        />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-1">{result.studentName}</h3>
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
        <GraduationCap className="h-4 w-4" />
        <span>Std {result.standard}</span>
      </div>
      <div className="w-full pt-4 border-t border-border flex flex-col">
        <span className="text-3xl font-black text-primary">{result.percentage}%</span>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Aggregate Score</span>
      </div>
    </motion.div>
  );
}

/**
 * LectureCard embeds YouTube videos and provides management controls for admins.
 */
export function LectureCard({ lecture, onDelete }: { lecture: Lecture; onDelete?: () => void }) {
  const embedUrl = formatYouTubeUrl(lecture.youtubeLink);

  return (
    <motion.div
      layout
      className="group overflow-hidden rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-video bg-muted flex items-center justify-center overflow-hidden">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={lecture.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <PlayCircle className="h-12 w-12 opacity-20" />
            <span className="text-xs">Invalid Video Link</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge variant="outline" className="mb-2 text-[10px] uppercase font-bold tracking-tighter border-primary/30 text-primary">
              {lecture.category}
            </Badge>
            <h3 className="font-bold text-foreground line-clamp-2 leading-tight">{lecture.title}</h3>
          </div>
          {onDelete && (
            <Button
              variant="destructive"
              size="icon"
              onClick={onDelete}
              className="h-8 w-8 rounded-full shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
