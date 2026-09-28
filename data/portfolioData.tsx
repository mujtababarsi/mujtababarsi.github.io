import React from 'react';
import {
  Dna, FlaskConical, Cloud, Code2, Microscope, Workflow
} from 'lucide-react';
import { AreaOfExpertise, Skill, Project, Experience, Education, CertificatePart, GenomicDataPoint } from '../types';

export const PROFILE_IMAGE_URL = "/me.jpg";

export const GENOMIC_DATA: GenomicDataPoint[] = [
  { pos: 0, depth: 45 }, { pos: 100, depth: 52 }, { pos: 200, depth: 89 },
  { pos: 300, depth: 120 }, { pos: 400, depth: 40 }, { pos: 500, depth: 65 },
  { pos: 600, depth: 150 }, { pos: 700, depth: 95 }, { pos: 800, depth: 30 }
];

export const summaryFull = (
  <>
    Pharmacist with <span className="font-bold">over 7 years</span> across clinical practice, GMP-certified pharmaceutical manufacturing (4× increase in production throughput), and scientific engagement, now working in bioinformatics.
    <br /><br />
    I build <span className="font-bold">reproducible NGS pipelines in Nextflow DSL2</span>, including a CI-tested GATK germline variant calling and joint genotyping pipeline, alongside RNA-seq, single-cell, and spatial transcriptomics analysis. My pharmacy background gives me a practical sense of <span className="font-bold">why a genetic variant matters clinically</span>, not just how to call it. I'm looking to contribute to precision medicine and genomics work here in Saudi Arabia.
  </>
);

export const AREAS_OF_EXPERTISE: AreaOfExpertise[] = [
  {
    id: "exp1",
    title: "Genomic data science",
    description: "Reproducible NGS pipelines, from germline variant calling to single-cell and spatial transcriptomics, each framed around a biological question.",
    items: ["Germline Variant Calling", "Bulk RNA-seq", "Single-Cell RNA-seq", "Spatial Transcriptomics"],
    icon: <Dna className="w-6 h-6" />,
    gradient: "from-blue-50 to-white",
    accent: "text-[#0071e3]"
  },
  {
    id: "exp2",
    title: "Precision pharmacology",
    description: "Bridging the gap between molecular mechanisms and therapeutic outcomes to accelerate the discovery of safer, more effective drugs.",
    items: ["Clinical Pharmacology", "Precision Medicine", "Mechanism of Action", "Drug Efficacy & Safety"],
    icon: <FlaskConical className="w-6 h-6" />,
    gradient: "from-blue-50 to-white",
    accent: "text-[#0071e3]"
  },
  {
    id: "exp3",
    title: "Digital infrastructure",
    description: "Architecting scalable, secure computational environments that drive digital transformation and ensure reproducibility in research.",
    items: ["Digital Transformation", "Process Optimisation", "Data Governance", "AI/ML Innovation"],
    icon: <Cloud className="w-6 h-6" />,
    gradient: "from-blue-50 to-white",
    accent: "text-[#0071e3]"
  }
];

export const SKILLS: Skill[] = [
  {
    id: "skill1",
    category: "Languages",
    description: "The syntax of discovery.",
    icon: <Code2 className="w-5 h-5" />,
    items: ["Python", "R", "Bash", "Linux CLI"],
    color: "bg-blue-50 text-[#0071e3]"
  },
  {
    id: "skill2",
    category: "scRNA-seq and spatial",
    description: "Single-cell and spatial analysis.",
    icon: <Microscope className="w-5 h-5" />,
    items: ["Scanpy", "Scarf", "Scanorama", "AnnData", "Zarr / Dask"],
    color: "bg-blue-50 text-[#0071e3]"
  },
  {
    id: "skill3",
    category: "Bulk RNA-seq and NGS",
    description: "Alignment, QC and variant calling.",
    icon: <Dna className="w-5 h-5" />,
    items: ["GATK4", "STAR", "HISAT2", "SAMtools", "bcftools", "FeatureCounts", "FastQC", "fastp", "MultiQC"],
    color: "bg-blue-50 text-[#0071e3]"
  },
  {
    id: "skill4",
    category: "Pipelines and cloud",
    description: "Reproducible, portable workflows.",
    icon: <Workflow className="w-5 h-5" />,
    items: ["Nextflow DSL2", "nf-core", "nf-test", "Docker", "Conda", "Git / GitHub", "GCP"],
    color: "bg-blue-50 text-[#0071e3]"
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Germline Variant Calling & Joint Genotyping",
    tools: "Nextflow DSL2 | GATK4 | bcftools | nf-test | CI",
    desc: "Cohort-level joint genotyping on a chr20 trio (mother, father, son), starting from aligned BAMs and following the GATK best-practices workflow. Fully automated and CI-tested, with every GitHub Actions run passing.",
    tags: ["Nextflow", "Variant Calling", "GATK4"],
    features: ["HaplotypeCaller → GenomicsDBImport → GenotypeGVCFs", "nf-test suite with GitHub Actions CI", "Docker, Singularity and Conda profiles"],
    kind: "pipeline",
    cover: "variants",
    stats: ["chr20 trio", "GATK best practices", "CI-tested"],
    link: "https://github.com/mujtababarsi/Human-DNAseq-chr20-nf-dsl2"
  },
  {
    title: "Reproducible Human RNA-seq Pipeline",
    tools: "Nextflow DSL2 | STAR | fastp | Docker",
    desc: "Automates raw FASTQ to BAM and count matrix with full reproducibility. Validated on human chr22 across local, HPC and cloud environments, and designed for full-genome scale.",
    tags: ["Nextflow", "RNA-seq", "Reproducibility"],
    features: ["FastQC → fastp → STAR → FeatureCounts → MultiQC", "Docker and Conda dual execution", "Fail-fast input validation"],
    kind: "pipeline",
    cover: "pipeline",
    stats: ["FASTQ → counts", "Local · HPC · cloud", "chr22 validated"],
    link: "https://github.com/mujtababarsi/Human-RNAseq-nf-dsl2"
  },
  {
    title: "COVID-19 Single-Cell Immune Atlas",
    tools: "Python | Scanpy | AnnData | Jupyter",
    desc: "Compared PBMCs from COVID-19 patients and healthy controls across 9,000 cells from six 10x Genomics samples. Identified 12 immune populations and disease-specific transcriptomic signatures. Built in an NBIS project-based workshop.",
    tags: ["scRNA-seq", "COVID-19", "Scanpy"],
    features: ["QC, normalisation, PCA and UMAP", "Leiden clustering and marker-based annotation", "Wilcoxon differential expression with BH correction"],
    kind: "analysis",
    cover: "umap",
    stats: ["9,000 cells", "6 samples", "12 immune populations"],
    link: "https://github.com/mujtababarsi/Covid-19-single-cell-analysis-Scanpy"
  },
  {
    title: "Spatial Transcriptomics & scRNA-seq Integration",
    tools: "Python | Scanpy | Scanorama | AnnData",
    desc: "Mapped single-cell references onto spatial tissue sections to keep anatomical context. Batch-corrected integration aligned the datasets, and cell-type identities were projected onto spatial coordinates, preserving tissue architecture.",
    tags: ["Spatial", "Integration", "Scanorama"],
    features: ["Scanorama batch correction", "KNN mapping and majority-vote label transfer", "Unified UMAP embedding"],
    kind: "analysis",
    cover: "spatial",
    stats: ["scRNA-seq → spatial", "Label transfer"],
    link: "https://github.com/mujtababarsi/spatial-omics"
  },
  {
    title: "Memory-Efficient scRNA-seq (Scarf)",
    tools: "Python | Scarf | Zarr | Dask",
    desc: "Analysed a 10x Genomics 5K PBMC dataset with the Scarf package, using Zarr and Dask chunking to keep memory use low at scale.",
    tags: ["Big Data", "Dask", "Zarr"],
    features: ["Low-Memory Chunking", "KNN Mapping", "Reference Projection"],
    kind: "analysis",
    cover: "chunks",
    stats: ["5K PBMCs", "Out-of-core"],
    link: "https://github.com/mujtababarsi/Scarf-workflow-PBMC"
  },
  {
    title: "Data Visualisation with ggplot2",
    tools: "R | RStudio | ggplot2 | Tidyverse",
    desc: "Distribution plots, correlation analysis and faceted layouts built with the Grammar of Graphics, turning raw data into clear graphical summaries.",
    tags: ["R", "ggplot2", "EDA"],
    features: ["Distribution Plots", "Correlation Analysis", "Faceted Layouts"],
    kind: "analysis",
    cover: "facets",
    stats: ["Grammar of Graphics", "Faceted layouts"],
    link: "https://github.com/mujtababarsi/R-and-rstudio-Data-visualisation-with-ggplot2"
  }
];

export const EXPERIENCE: Experience[] = [
  {
    role: "Self-directed retraining in computational biology",
    org: "Career transition",
    period: "2022 – Present",
    summary: "After relocating from Sudan during a period of regional instability, I used the transition for a deliberate move into computational biology: self-funded, and built without institutional lab access or supervision.",
    highlights: [
      "Built end-to-end bioinformatics projects on GitHub since June 2022, each framed around a distinct biological question",
      "Completed foundational and applied coursework in Linux, R, Python and pipeline engineering",
      "Since 2025: structured pipeline-engineering training, including a hands-on GATK germline variant-calling pipeline through Seqera's Nextflow for Genomics course",
      "In progress: Integrating Generative AI into Data Workflows (BigQuery ML, predictive modelling)"
    ]
  },
  {
    role: "Operations Coordinator",
    org: "Dukhan Group",
    period: "May 2024 – Jul 2025",
    location: "Doha, Qatar",
    highlights: [
      "Designed and maintained structured operational datasets tracking contract status, SLA compliance and recovery outcomes, applying systematic data verification across business units",
      "Resolved cross-departmental workflow bottlenecks through root-cause analysis, coordinating multi-stakeholder processes to keep services running"
    ]
  },
  {
    role: "Scientific Engagement Officer",
    org: "Salmawit Co. Ltd",
    period: "Feb 2021 – Nov 2022",
    location: "Khartoum, Sudan",
    highlights: [
      "Synthesised clinical trial data and molecular mechanism-of-action studies for healthcare professionals, translating biological findings into actionable clinical insights",
      "Evaluated peer-reviewed literature on genomics-related drug efficacy and safety to provide evidence-based scientific guidance",
      "Acted as a clinical-to-research liaison between experimental biology and therapeutic practice"
    ]
  },
  {
    role: "Production Supervisor",
    org: "Blue Nile Pharmaceutical Factory",
    period: "Sep 2019 – Dec 2020",
    location: "Khartoum, Sudan",
    highlights: [
      "Increased manufacturing throughput 4× (15K → 65K units/month) through data-driven process optimisation",
      "Managed GMP-compliant end-to-end pharmaceutical manufacturing, ensuring data integrity, batch traceability and regulatory compliance",
      "Led cross-functional technical teams in diagnosing production bottlenecks during high-volume scaling"
    ]
  },
  {
    role: "Medical Representative, Territory Lead",
    org: "Aurobindo Pharma and Bioderma",
    period: "Feb 2016 – Oct 2018",
    location: "Khartoum, Sudan",
    highlights: [
      "Secured a government formulary listing for Aurobindo's antibiotic product line through scientific KOL engagement and data-driven presentations",
      "Interpreted multidimensional clinical studies to answer complex medical inquiries and support evidence-based prescribing",
      "Promoted Bioderma's OTC dermatology and skincare portfolio across pharmacy and clinic channels, building relationships with pharmacy buyers and dermatology KOLs"
    ]
  },
  {
    role: "Pharmacist",
    org: "Sudan Military Hospital & Wenji Pharmacy",
    period: "May 2015 – Feb 2016",
    location: "Khartoum, Sudan",
    highlights: [
      "Clinical pharmacology practice across hospital and community settings: drug verification, patient counselling, controlled substance management and interaction screening"
    ]
  }
];

export const EDUCATION_DATA: Education[] = [
  {
    degree: "Bachelor of Science: Pharmacy",
    school: "National Ribat University",
    location: "Khartoum, Sudan",
    period: "2010 - 2015",
    details: "Pharmacology, Clinical Pharmacology, Biochemistry, Pharmacognosy, Pharmaceutics, Pharmaceutical Management, Microbiology, Organic Chemistry and Analytical Chemistry."
  }
];

export const CERTIFICATES_PARTS: CertificatePart[] = [
  {
    title: "Pipelines and cloud",
    items: [
      "Nextflow for RNA-seq & Genomics (5 certificates) · Seqera · Feb 2026",
      "Google Cloud Digital Leader · Google Cloud · Jan 2026"
    ]
  },
  {
    title: "Bioinformatics",
    items: [
      "Bioinformatics for Biologists: Linux, Bash and R · Wellcome / FutureLearn · Jul 2022",
      "NBIS Workshop: scRNA-seq · National Bioinformatics Infrastructure Sweden",
      "Bioinformatics Under Spotlight: Introduction to genomic analysis and sequence processing · 7VISION · Dec 2015"
    ]
  },
  {
    title: "Data science",
    items: [
      "Python Certification · Kaggle · Feb 2022",
      "Integrating Generative AI into Data Workflows: BigQuery ML, predictive modelling (in progress)"
    ]
  },
  {
    title: "Pharmaceutical operations and strategy",
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
