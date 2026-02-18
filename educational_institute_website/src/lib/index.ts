import { useState, useEffect } from 'react';

/**
 * Application route constants for centralized navigation management
 */
export const ROUTE_PATHS = {
  HOME: '/',
  LECTURES: '/lectures',
  NOTES: '/notes',
  TEACHERS: '/teachers',
  RESULTS: '/results',
  CONTACT: '/contact',
  ADMIN_LOGIN: '/admin-login',
  ADMIN_PANEL: '/admin-panel',
} as const;

/**
 * Teacher interface for staff profiles
 */
export interface Teacher {
  id: string;
  name: string;
  photo: string;
  subject: string;
  qualification: string;
  experience: string;
}

/**
 * Lecture interface for video content added by admin
 */
export interface Lecture {
  id: string;
  title: string;
  youtubeLink: string;
  category: 'Std 9 English' | 'Std 10 English' | 'Std 12 English' | 'English Grammar';
}

/**
 * Note interface for downloadable study materials
 */
export interface Note {
  id: string;
  title: string;
  standard: string;
  medium: 'English' | 'Gujarati';
  subject: string;
  fileUrl: string;
  fileName: string;
  fileType: string;
}

/**
 * Result interface for student achievements and toppers
 */
export interface Result {
  id: string;
  studentName: string;
  percentage: number;
  standard: string;
  year: string;
  photo?: string;
}

/**
 * Secret admin credentials for institute management
 */
export const ADMIN_CREDENTIALS = {
  username: 'khansir786',
  password: 'login_786',
} as const;

/**
 * Global contact and institute configuration
 */
export const INSTITUTE_CONFIG = {
  name: 'Genius Classes',
  slogan: 'Come With Confidence And Go With Trust',
  tagline: 'Building Strong Foundation from Std 1 to 10',
  phone: '9712843679',
  whatsapp: '9712843679',
  admissionFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScyuQ7WdPgahcyX5yKFwGvg9CFgJckSq6_gFOtUY25YUXIExA/viewform',
  mapsUrl: 'https://maps.app.goo.gl/r4gYu96VpmaRh8bW9',
  currentYear: 2026,
} as const;

/**
 * Custom hook for persistent storage of admin-managed content (Lectures, Notes)
 * ensuring the site works 'offline' or on local storage for this demonstration.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}

/**
 * Formats a standard YouTube URL into an embeddable iframe URL
 * Supports both watch?v= format and youtu.be/ short links
 */
export const formatYouTubeUrl = (url: string): string | null => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = (match && match[2].length === 11) ? match[2] : null;
  
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
};

/**
 * Helper to determine file icon based on extension
 */
export const getFileTypeIcon = (fileName: string) => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'pdf': return 'pdf';
    case 'ppt':
    case 'pptx': return 'ppt';
    case 'doc':
    case 'docx': return 'doc';
    case 'jpg':
    case 'jpeg':
    case 'png': return 'image';
    default: return 'file';
  }
};
