import { ReactNode } from 'react';

export interface AreaOfExpertise {
  id: string;
  title: string;
  description: string;
  items: string[];
  icon: ReactNode;
  gradient: string;
  accent: string;
}

export interface Skill {
  id: string;
  category: string;
  description: string;
  icon: ReactNode;
  items: string[];
  color: string;
}

export interface Project {
  title: string;
  tools: string;
  desc: string;
  tags: string[];
  features: string[];
  image: string;
  link: string;
}

export interface Experience {
  role: string;
  org: string;
  period: string;
  description: string;
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  period: string;
  details: string;
}

export interface CertificatePart {
  title: string;
  items: string[];
}

export interface GenomicDataPoint {
  pos: number;
  depth: number;
}