/**
 * Types for Archie Viterbo's Interactive Portfolio
 */

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  technologies: string[];
  category: "AI" | "Cybersecurity" | "Web Development";
  featured: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  skillsGained: string[];
}

export interface CertificationItem {
  name: string;
  issuer: string;
  year: string;
  iconName: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number }[];
}
