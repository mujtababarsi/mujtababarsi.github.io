import React from 'react';
import {
  Dna, FlaskConical, ShieldCheck, Code2, Microscope, Workflow
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
    Pharmacist with <span className="font-bold">6+ years</span> across pharmacy practice, GMP-regulated pharmaceutical manufacturing (monthly output roughly quadrupled), and medical and scientific sales, retrained in bioinformatics.
    <br /><br />
    I build <span className="font-bold">reproducible NGS pipelines in Nextflow DSL2</span>, including a CI-tested GATK germline pipeline with ClinVar and SnpEff annotation and trio-based filtering, alongside RNA-seq, single-cell, and spatial transcriptomics analysis. My pharmacy background gives me a practical sense of <span className="font-bold">why a genetic variant matters clinically</span>, not just how to call it. I'm looking to contribute to genomics and NGS data analysis in a research or clinical setting, and I'm open to relocation.
  </>
);

export const AREAS_OF_EXPERTISE: AreaOfExpertise[] = [
  {
    id: "exp1",
    title: "Genomic data science",
    description: "Reproducible NGS pipelines, from germline variant calling and annotation to single-cell and spatial analysis.",
    items: ["Variant Calling & Annotation", "Trio Analysis", "Bulk RNA-seq", "Single-Cell & Spatial"],
    icon: <Dna className="w-6 h-6" />,
    gradient: "from-blue-50 to-white",
    accent: "text-[#0071e3]"
  },
  {
    id: "exp2",
    title: "Clinical and pharmaceutical science",
    description: "A pharmacist's grounding in how drugs act, interact and are judged on evidence, which shapes how I read genomic results.",
    items: ["Clinical Pharmacology", "Drug Interactions", "Drug Efficacy & Safety", "Evidence Communication"],
    icon: <FlaskConical className="w-6 h-6" />,
    gradient: "from-blue-50 to-white",
    accent: "text-[#0071e3]"
  },
  {
    id: "exp3",
    title: "Quality and reproducibility",
    description: "GMP documentation habits carried into analysis: versioned code, automated tests, containerised runs and records you can trace.",
    items: ["GMP & SOPs", "Version Control", "Automated Testing (CI)", "Containerisation"],
    icon: <ShieldCheck className="w-6 h-6" />,
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
    category: "NGS and variant analysis",
    description: "Alignment, QC, variant calling and annotation.",
    icon: <Dna className="w-5 h-5" />,
    items: ["GATK4", "bcftools", "SnpEff", "ClinVar", "SAMtools", "STAR", "FeatureCounts", "FastQC", "fastp", "MultiQC"],
    color: "bg-blue-50 text-[#0071e3]"
  },
  {
    id: "skill4",
    category: "Pipelines and practices",
    description: "Reproducible, tested workflows.",
    icon: <Workflow className="w-5 h-5" />,
    items: ["Nextflow DSL2", "nf-test", "nf-schema", "nf-core (training)", "Docker", "Conda", "Git / GitHub", "GitHub Actions CI"],
    color: "bg-blue-50 text-[#0071e3]"
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Germline Variant Calling & Annotation",
    tools: "Nextflow DSL2 | GATK4 | bcftools | SnpEff | ClinVar | nf-test",
    desc: "Calls germline SNPs and indels in a chr20 family trio with GATK4 joint genotyping, then annotates them with ClinVar and SnpEff and filters for protein-altering and de novo variants. The coordinate, ClinVar and filter steps are tested with positive and negative controls in nf-test, run in GitHub Actions. Built on Seqera's Nextflow for Science: Genomics course; I added annotation and filtering.",
    tags: ["Nextflow", "Variant Calling", "Variant Annotation"],
    features: ["HaplotypeCaller → GenomicsDBImport → GenotypeGVCFs", "ClinVar + SnpEff annotation, protein-altering and de novo filters", "18 nf-tests, run in GitHub Actions"],
    kind: "pipeline",
    cover: "variants",
    stats: ["chr20 trio", "ClinVar + SnpEff", "CI passing"],
    link: "https://github.com/mujtababarsi/Human-DNAseq-chr20-nf-dsl2"
  },
  {
    title: "Reproducible Human RNA-seq Pipeline",
    tools: "Nextflow DSL2 | STAR | fastp | Docker",
    desc: "Automates raw FASTQ to BAM and count matrix, with tools run in Docker containers for reproducibility. Validated on human chr22 on a local machine. Containerised so it can move to HPC or cloud later; it has not been run there yet.",
    tags: ["Nextflow", "RNA-seq", "Reproducibility"],
    features: ["FastQC → fastp → STAR → FeatureCounts → MultiQC", "Docker containers; Conda environment files included", "Fail-fast input validation"],
    kind: "pipeline",
    cover: "pipeline",
    stats: ["FASTQ → counts", "Docker · local", "chr22 validated"],
    link: "https://github.com/mujtababarsi/Human-RNAseq-nf-dsl2"
  },
  {
    title: "COVID-19 PBMC Single-Cell Analysis",
    tools: "Python | Scanpy | AnnData | Jupyter",
    desc: "Compared PBMCs from COVID-19 patients and healthy controls across 9,000 cells from six 10x Genomics samples (5,589 after QC). Clustered the cells, annotated them by reference label transfer and marker enrichment, and compared COVID-19 with control cells within clusters. Built following an NBIS project-based workshop.",
    tags: ["scRNA-seq", "COVID-19", "Scanpy"],
    features: ["QC, doublet removal, normalisation, PCA and UMAP", "Louvain and Leiden clustering, annotation by label transfer", "Wilcoxon differential expression, per cluster and COVID-19 vs control"],
    kind: "analysis",
    cover: "umap",
    stats: ["9,000 cells", "5,589 after QC", "6 samples"],
    link: "https://github.com/mujtababarsi/Covid-19-single-cell-analysis-Scanpy"
  },
  {
    title: "Spatial Transcriptomics & scRNA-seq Integration",
    tools: "Python | Scanpy | Scanorama | AnnData | SpatialDE",
    desc: "Integrated mouse-brain Visium sections with a Smart-seq cortex single-cell reference using Scanorama, then transferred cell-type labels onto spatial coordinates to keep anatomical context. Follows the Scanpy spatial tutorials; also includes a human lymph node Visium analysis with spatially variable genes (SpatialDE).",
    tags: ["Spatial", "Integration", "Scanorama"],
    features: ["Scanorama integration of Visium sections and scRNA-seq", "Cosine-similarity label transfer onto tissue", "Human lymph node Visium: QC, clustering, SpatialDE"],
    kind: "analysis",
    cover: "spatial",
    stats: ["scRNA-seq → spatial", "Label transfer"],
    link: "https://github.com/mujtababarsi/Scanpy-scRNA-seq-Analysis"
  },
  {
    title: "Single-Cell Analysis with Scarf",
    tools: "Python | Scarf | Zarr | Dask",
    desc: "Worked through the Scarf workflow: analysed a 10x Genomics 5K PBMC dataset stored in Zarr and processed in chunks, then projected 14K interferon-β-stimulated PBMCs onto a 15K control reference.",
    tags: ["Zarr", "Dask", "Label transfer"],
    features: ["Zarr chunked storage", "KNN Mapping", "Reference Projection"],
    kind: "analysis",
    cover: "chunks",
    stats: ["5K PBMCs", "15K / 14K projection"],
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
    period: "2022 – 2024 · 2025 – Present",
    summary: "After relocating from Sudan during a period of regional instability, I used the transition for a deliberate move into computational biology: self-funded, and built without institutional lab access or supervision.",
    highlights: [
      "Built bioinformatics projects on GitHub: single-cell and spatial analyses (2022), and Nextflow RNA-seq and germline variant-calling pipelines (2026)",
      "Coursework: Python (Kaggle, Feb 2022); Linux, Bash scripting and R for biologists (Wellcome Connecting Science, 100%, Jul 2023)",
      "Feb 2026: Seqera Nextflow Training Week (5 certificates), including Nextflow for Genomics, the course my GATK germline variant-calling pipeline follows; extended it with variant annotation and trio filtering (Oct 2026)",
      "In progress: Integrating Generative AI into Data Workflows (BigQuery ML, predictive modelling)"
    ]
  },
  {
    role: "Key Account & Operations Coordinator",
    org: "Dukhan Group",
    period: "May 2024 – Jul 2025",
    location: "Doha, Qatar",
    highlights: [
      "Designed and maintained structured operational datasets tracking contract status, SLA compliance and recovery outcomes, applying systematic data verification across business units",
      "Resolved cross-departmental workflow bottlenecks through root-cause analysis, coordinating multi-stakeholder processes to keep services running"
    ]
  },
  {
    role: "Scientific Sales Officer",
    org: "Salmawit Co. Ltd",
    period: "Feb 2021 – Nov 2022",
    location: "Khartoum, Sudan",
    highlights: [
      "Promoted a GIT/IBS portfolio to healthcare professionals through science-based selling, running a structured call cycle of 120 physicians segmented into A, B and C classes",
      "Planned and delivered CME events and clinical seminars in gastroenterology, at least once a quarter",
      "Turned published clinical study data into evidence-based communication on efficacy, safety and appropriate prescribing"
    ]
  },
  {
    role: "Production Pharmacist",
    org: "Blue Nile Pharmaceutical Factory",
    period: "Sep 2019 – Dec 2020",
    location: "Khartoum, Sudan",
    highlights: [
      "Supervised end-to-end production and a 90-person team; monthly output roughly quadrupled, from 15–17M to 60–65M tablets/month",
      "Reviewed and approved batch production and manufacturing records before release, with 100% GMP compliance on every product release",
      "Coordinated QA, QC and maintenance to clear bottlenecks during the scale-up; wrote SOPs and kept deviation reports and traceability logs"
    ]
  },
  {
    role: "Medical Representative, Territory Lead",
    org: "Aurobindo Pharma",
    period: "Jan 2017 – Oct 2018",
    location: "Khartoum, Sudan",
    highlights: [
      "Led the launch of a new antibiotic brand in a high-priority territory, running the territory independently and mapping its key accounts",
      "Secured a government formulary listing, putting the product into active dispensing under the national government insurance scheme",
      "Gave scientific presentations and ran roundtables for KOLs"
    ]
  },
  {
    role: "Medical Representative",
    org: "Bioderma",
    period: "Feb 2016 – Jan 2017",
    location: "Khartoum, Sudan",
    highlights: [
      "Promoted an OTC dermatology and skincare portfolio across pharmacy and clinic channels",
      "Built relationships with pharmacy buyers and dermatology KOLs, and trained pharmacy staff on the products",
      "Met sales targets through structured call-cycle management"
    ]
  },
  {
    role: "Pharmacist",
    org: "Sudan Military Hospital & Wenji Pharmacy",
    period: "May 2015 – Feb 2016",
    location: "Khartoum, Sudan",
    highlights: [
      "Dispensing, dose verification and drug-interaction screening; patient counselling on adherence and side effects; controlled-substance management"
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
      "Nextflow Training Week 2026-Q1, 5 certificates (Hello Nextflow, Nextflow Run, Hello nf-core, Nextflow for RNAseq, Nextflow for Genomics) · Seqera · Feb 2026",
      "Google Cloud Digital Leader (badge) · Google Skills · Jan 2026"
    ]
  },
  {
    title: "Bioinformatics",
    items: [
      "Bioinformatics for Biologists: An Introduction to Linux, Bash Scripting, and R · Wellcome Connecting Science / FutureLearn · Jul 2023 · 100%",
      "NBIS Workshop: scRNA-seq · National Bioinformatics Infrastructure Sweden",
      "Bioinformatics Under Spotlight: Introduction to genomic analysis and sequence processing · 7VISION · Dec 2015"
    ]
  },
  {
    title: "Data science",
    items: [
      "Python · Kaggle · Feb 2022",
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
