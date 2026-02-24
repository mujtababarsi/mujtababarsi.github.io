import React from 'react';
import { 
  Dna, FlaskConical, Cloud, Code2, Microscope, Database
} from 'lucide-react';
import { AreaOfExpertise, Skill, Project, Experience, Education, CertificatePart, GenomicDataPoint } from '../types';

export const PROFILE_IMAGE_URL = "/me.png"; 

export const GENOMIC_DATA: GenomicDataPoint[] = [
  { pos: 0, depth: 45 }, { pos: 100, depth: 52 }, { pos: 200, depth: 89 },
  { pos: 300, depth: 120 }, { pos: 400, depth: 40 }, { pos: 500, depth: 65 },
  { pos: 600, depth: 150 }, { pos: 700, depth: 95 }, { pos: 800, depth: 30 }
];

export const summaryBrief = (
  <>
    <span className="font-semibold text-black">Bioinformatics Professional & Pharmacist</span> bridging clinical science and computational data. I aim to redefine the frontier of discovery using <span className="font-semibold text-black">pharmaceutical insight</span> to frame the essential biological questions and <span className="font-semibold text-black">computational innovation</span> to manifest the data-driven answers that make <span className="font-semibold text-black">precision medicine a reality</span>.
  </>
);

export const summaryFull = (
  <>
    I am a <span className="font-bold">Bioinformatics Professional and Pharmacist</span> bridging clinical science and computational data. My career is built on a unique feedback loop: leveraging <span className="font-bold">pharmaceutical expertise</span> to frame critical biological questions and utilising <span className="font-bold">advanced bioinformatics</span> to manifest the data-driven answers that make <span className="font-bold">precision medicine a reality</span>.
    <br /><br />
    I specialise in the development of <span className="font-bold">scalable Single-Cell and NGS workflows</span>, with a focus on transforming complex genomic datasets into <span className="font-bold">actionable therapeutic insights</span>. My goal is to stay at the leading edge of <span className="font-bold">global computational trends</span>—harnessing tools like <span className="font-bold">Nextflow</span> and high-performance pipelines to accelerate discovery and drive the future of personalised healthcare.
  </>
);

export const AREAS_OF_EXPERTISE: AreaOfExpertise[] = [
  {
    id: "exp1",
    title: "Genomic Data Science",
    description: "Unraveling cellular heterogeneity through high-dimensional single-cell and spatial transcriptomics to map the fundamental architecture of disease.",
    items: ["Single-Cell RNA-seq", "NGS Workflows", "Spatial Transcriptomics", "Multi-omic Analysis"],
    icon: <Dna className="w-6 h-6" />,
    gradient: "from-blue-50 to-indigo-50",
    accent: "text-blue-600"
  },
  {
    id: "exp2",
    title: "Precision Pharmacology",
    description: "Bridging the gap between molecular mechanisms and therapeutic outcomes to accelerate the discovery of safer, more effective drugs.",
    items: ["Clinical Pharmacology", "Precision Medicine", "Mechanism of Action", "Drug Efficacy & Safety"],
    icon: <FlaskConical className="w-6 h-6" />,
    gradient: "from-emerald-50 to-teal-50",
    accent: "text-emerald-600"
  },
  {
    id: "exp3",
    title: "Digital Infrastructure",
    description: "Architecting scalable, secure computational environments that drive digital transformation and ensure reproducibility in research.",
    items: ["Digital Transformation", "Process Optimisation", "Data Governance", "AI/ML Innovation"],
    icon: <Cloud className="w-6 h-6" />,
    gradient: "from-purple-50 to-fuchsia-50",
    accent: "text-purple-600"
  }
];

export const SKILLS: Skill[] = [
  { 
    id: "skill1",
    category: "Languages & Scripting", 
    description: "The syntax of discovery.",
    icon: <Code2 className="w-5 h-5" />, 
    items: ["Python", "R Language", "Bash Scripting", "Linux CLI"],
    color: "bg-orange-500"
  },
  { 
    id: "skill2",
    category: "Bioinformatics Tools", 
    description: "Instruments of precision.",
    icon: <Microscope className="w-5 h-5" />, 
    items: ["Scanpy", "Scarf", "Scanorama", "Nextflow", "Zarr", "Dask"],
    color: "bg-blue-500"
  },
  { 
    id: "skill3",
    category: "Data Environments", 
    description: "Platforms for scale.",
    icon: <Database className="w-5 h-5" />, 
    items: ["Jupyter Notebook", "RStudio", "Conda", "GCP Foundations"],
    color: "bg-indigo-500"
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Human RNA-seq Pipeline (Nextflow DSL2)",
    tools: "Nextflow | DSL2 | Docker | Singularity",
    desc: "Developed a scalable, reproducible RNA-seq analysis pipeline using Nextflow DSL2, ensuring portability across HPC and cloud environments.",
    tags: ["Nextflow", "RNA-seq", "Reproducibility"],
    features: ["Modular Architecture", "Containerization", "Process Parallelization"],
    image: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?q=80&w=800&auto=format&fit=crop",
    link: "https://github.com/mujtababarsi/Human-RNAseq-nf-dsl2"
  },
  {
    title: "Scanpy Single-Cell Analysis",
    tools: "Python | Scanpy | Jupyter Notebook",
    desc: "Conducted scRNA-seq downstream analysis on six PBMC samples to identify transcriptomic differences between COVID-19 patients and healthy controls.",
    tags: ["scRNA-seq", "COVID-19", "Scanpy"],
    features: ["Quality Control Pipeline", "Dimensionality Reduction", "Cell-type Prediction"],
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop",
    link: "https://github.com/mujtababarsi/Scanpy-scRNA-seq-Analysis" 
  },
  {
    title: "Covid 19 scRNA-seq & Spatial Transcriptomics Integration",
    tools: "Python | Scanpy | Scanorama",
    desc: "Integrated spatial datasets with single-cell RNA-seq references using the Scanorama algorithm for accurate batch correction and cell-type mapping.",
    tags: ["Spatial", "Integration", "Scanorama"],
    features: ["Batch Correction", "Tissue Mapping", "High-Performance Vis"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    link: "https://github.com/mujtababarsi/Covid-19-single-cell-analysis-Scanpy"
  },
  {
    title: "Memory-Efficient scRNA-seq (Scarf)",
    tools: "Python | Scarf | Zarr | Dask",
    desc: "Optimised analysis for a 10x Genomics 5K PBMC dataset using the Scarf package, leveraging Zarr and Dask for low-memory data chunking.",
    tags: ["Big Data", "Dask", "Zarr"],
    features: ["Low-Memory Chunking", "KNN Mapping", "Reference Projection"],
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop",
    link: "https://github.com/mujtababarsi/Scarf-workflow-PBMC"
  },
  {
    title: "Data Visualisation with ggplot2",
    tools: "R | RStudio | ggplot2 | Tidyverse",
    desc: "Generated publication-quality visualisations using the \"Grammar of Graphics\" framework to translate raw data into insightful graphical representations.",
    tags: ["R", "ggplot2", "EDA"],
    features: ["Publication Quality", "Exploratory Analysis", "Complex Faceting"],
    image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?q=80&w=800&auto=format&fit=crop",
    link: "https://github.com/mujtababarsi/R-and-rstudio-Data-visualisation-with-ggplot2"
  }
];

export const EXPERIENCE: Experience[] = [
  {
    role: "Operations Coordinator",
    org: "Dukhan Group",
    period: "2024 - 2025",
    description: "Acted as a strategic liaison across business units, diagnosing and resolving operational bottlenecks to ensure seamless service delivery. Audited corporate contracts and operational data to ensure 100% accuracy, maintaining rigorous cross-departmental cycles. Led high-level initiatives to optimize workflows, applying risk assessments to secure contract renewals and elevate corporate standards."
  },
  {
    role: "Scientific Engagement Officer",
    org: "Salmawit Co. Ltd",
    period: "2021 - 2022",
    description: "Synthesised complex clinical trial data and mechanism-of-action studies for healthcare professionals. Evaluated peer-reviewed medical literature and genomic studies to provide technical insights on drug efficacy. Served as a technical liaison, translating biological findings into therapeutic insights for clinical practice."
  },
  {
    role: "Production Supervisor",
    org: "Blue Nile Pharmaceutical Factory",
    period: "2019 - 2021",
    description: "Engineered a 4x increase in manufacturing throughput by optimising production cycles and workflows. Led cross-functional teams to troubleshoot complex bottlenecks during high-volume scaling. Managed end-to-end manufacturing processes in strict adherence to GMP standards."
  },
  {
    role: "Medical Representative",
    org: "Aurobindo Pharma and Bioderma",
    period: "2016 - 2018",
    description: "Communicated technical product features and clinical benefits to healthcare professionals through scientific presentations. Interpreted multidimensional clinical studies to resolve complex medical inquiries regarding therapeutic data. Conducted systematic analysis of healthcare data to identify emerging clinical trends."
  },
  {
    role: "Clinical Pharmacist",
    org: "Sudan Military Hospital & Wenji Pharmacy",
    period: "2015 - 2016",
    description: "Processed and dispensed prescription medications with 100% accuracy, verifying dosages and interactions. Provided clinical counselling to patients on medication use and side effect management to ensure adherence. Monitored pharmaceutical inventory and controlled substances in coordination with medical professionals."
  }
];

export const EDUCATION_DATA: Education[] = [
  {
    degree: "Bachelor of science: Pharmacy",
    school: "NATIONAL RIBAT UNIVERSITY",
    location: "Khartoum, Sudan",
    period: "2010 - 2015",
    details: "Pharmacology, Clinical Pharmacology, Biochemistry, Pharmacognosy, Pharmaceutics, Pharmaceutical Management, Microbiology, Organic Chemistry and Analytical Chemistry."
  }
];

export const CERTIFICATES_PARTS: CertificatePart[] = [
  {
    title: "Bioinformatics & Computational Science",
    items: [
      "Bioinformatics for Biologists: Linux, BASH Scripting, and R",
      "Kaggle Python Certification: Data science syntax and structures",
      "Introduction to Bioinformatics: Genomic analysis and sequence processing",
      "Integrate Generative AI Into Data Workflow (In progress)",
      "Google Cloud Digital Leader (Badge): Foundational cloud transformation, infrastructure, and AI/ML innovation",
      "National Bioinformatics Infrastructure Sweden (NBIS): Workshops and Training",
      "Seqera Nextflow Training"
    ]
  },
  {
    title: "Pharmaceutical Operations & Strategy",
    items: [
      "Drug Information Resources: Evidence-based research and clinical databases",
      "Total Quality Management: Process optimisation and quality standards",
      "Basic Pharmaceutical Marketing: Strategic communication and product positioning"
    ]
  }
];

export const ADDITIONAL_INFO = {
  languages: "Arabic, English",
  location: "Riyadh, KSA",
  visa: "Transferable Iqama | Valid Driver license"
};