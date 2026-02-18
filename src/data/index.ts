import { Teacher, Result } from '@/lib/index';
import { IMAGES } from '@/assets/images';

/**
 * Static teacher data for the institute profiles
 */
export const TEACHERS_DATA: Teacher[] = [
  {
    id: 't1',
    name: 'Mr. Khan Sir',
    photo: IMAGES.TEACHERS_6,
    subject: 'English & Grammar',
    qualification: 'M.A., B.Ed.',
    experience: '12+ Years'
  },
  {
    id: 't2',
    name: 'Mrs. Anita Shah',
    photo: IMAGES.TEACHERS_9,
    subject: 'Mathematics & Science',
    qualification: 'M.Sc., M.Ed.',
    experience: '10+ Years'
  },
  {
    id: 't3',
    name: 'Mr. Deepak Prajapati',
    photo: IMAGES.TEACHERS_4,
    subject: 'Gujarati & Social Science',
    qualification: 'M.A. (Gujarati)',
    experience: '8+ Years'
  },
  {
    id: 't4',
    name: 'Ms. Priya Mehta',
    photo: IMAGES.TEACHERS_2,
    subject: 'Primary Foundation (Std 1-5)',
    qualification: 'B.A., B.Ed.',
    experience: '5+ Years'
  }
];

/**
 * Static results data for student achievements
 */
export const SAMPLE_RESULTS: Result[] = [
  {
    id: 'res1',
    studentName: 'Aarav Patel',
    percentage: 98.4,
    standard: 'Std 10',
    year: '2025',
    photo: IMAGES.SUCCESS_RESULTS_1
  },
  {
    id: 'res2',
    studentName: 'Diya Mistri',
    percentage: 96.2,
    standard: 'Std 10',
    year: '2025',
    photo: IMAGES.SUCCESS_RESULTS_2
  },
  {
    id: 'res3',
    studentName: 'Siddharth Dave',
    percentage: 95.8,
    standard: 'Std 10',
    year: '2025',
    photo: IMAGES.SUCCESS_RESULTS_3
  },
  {
    id: 'res4',
    studentName: 'Ishani Shah',
    percentage: 94.0,
    standard: 'Std 10',
    year: '2024',
    photo: IMAGES.SUCCESS_RESULTS_4
  },
  {
    id: 'res5',
    studentName: 'Rohan Mehta',
    percentage: 93.5,
    standard: 'Std 10',
    year: '2024',
    photo: IMAGES.SUCCESS_RESULTS_5
  }
];

/**
 * Features of the institute for the homepage features section
 */
export const FEATURES_DATA = [
  {
    title: 'Personal Attention',
    description: 'We believe every student is unique. Our mentors provide personalized guidance to help students overcome their individual challenges.'
  },
  {
    title: 'Small Batch Size',
    description: 'Optimized batch sizes ensure better interaction between teachers and students, creating an ideal learning environment.'
  },
  {
    title: 'Weekly Tests',
    description: 'Regular evaluation through weekly chapter-wise tests helps students identify gaps in their understanding and build confidence.'
  },
  {
    title: 'Monthly PTM',
    description: 'We keep parents in the loop with monthly Parent Teacher Meetings to discuss progress, attendance, and areas of improvement.'
  },
  {
    title: 'Progress Tracking',
    description: 'Scientific performance analysis and digital progress reports shared with parents to monitor growth throughout the academic year.'
  }
];

/**
 * Medium selections for categorization
 */
export const MEDIUM_DATA = [
  {
    title: 'English Medium',
    description: 'Comprehensive coaching for English medium students from Std 1 to 10 with expert faculty and high-quality study materials.'
  },
  {
    title: 'Gujarati Medium',
    description: 'Dedicated batches for Gujarati medium students ensuring clarity of concepts in their native language for better academic results.'
  }
];