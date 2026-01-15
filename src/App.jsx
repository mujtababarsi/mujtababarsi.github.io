import React, { useState, useEffect, useRef } from 'react';
import { 
  Dna, 
  Terminal, 
  Database, 
  BookOpen, 
  Github, 
  Mail, 
  ExternalLink, 
  ChevronRight, 
  Code2, 
  Award, 
  FlaskConical, 
  Microscope, 
  Cpu, 
  Download, 
  Menu, 
  X, 
  MapPin, 
  Phone, 
  CheckCircle2,
  Sparkles,
  Send,
  Loader2,
  BrainCircuit,
  Volume2,
  User
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

// --- USER CONFIGURATION ---
// Path to your profile image. 
// For mujtababarsi.github.io, placing it in the 'public' folder makes it accessible at '/profile.png'
const PROFILE_IMAGE_URL = "/profile.png"; 

// --- GEMINI API CONFIGURATION ---
const apiKey = ""; 

async function callGemini(prompt, systemInstruction = "") {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] }
  };

  let delay = 1000;
  for (let i = 0; i < 5; i++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('API Error');
      const result = await response.json();
      return result.candidates?.[0]?.content?.parts?.[0]?.text;
    } catch (err) {
      if (i === 4) throw err;
      await new Promise(res => setTimeout(res, delay));
      delay *= 2;
    }
  }
}

async function callGeminiTTS(text, voice = "Kore") {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text: `Say naturally: ${text}` }] }],
    generationConfig: { 
      responseModalities: ["AUDIO"],
      speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } } }
    }
  };

  try {
    const response = await fetch(url, { method: 'POST', body: JSON.stringify(payload) });
    const result = await response.json();
    return result.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  } catch (err) {
    console.error("TTS Error", err);
  }
}

// --- DATA SECTION ---

const SKILLS = [
  { 
    category: "Programming & Scripting", 
    icon: <Code2 className="w-5 h-5" />, 
    items: ["Python", "R Language", "Bash Scripting", "Linux (CLI)"] 
  },
  { 
    category: "Bioinformatics Frameworks", 
    icon: <Dna className="w-5 h-5" />, 
    items: ["Scanpy", "Scarf", "Nextflow (Pipeline Development)"] 
  },
  { 
    category: "Data Environments", 
    icon: <Database className="w-5 h-5" />, 
    items: ["Jupyter Notebook", "RStudio", "Conda", "Git | GitHub"] 
  },
  { 
    category: "Pharmaceutical Expertise", 
    icon: <FlaskConical className="w-5 h-5" />, 
    items: ["Clinical Pharmacology", "Drug Discovery", "GMP Standards", "Precision Medicine"] 
  }
];

const PROJECTS = [
  {
    title: "Covid-19 Single-Cell Analysis",
    tools: "Python, Scanpy, Jupyter Notebook",
    desc: "Performed scRNA-seq downstream analysis on six PBMC samples, comparing transcriptomic profiles between COVID-19 patients and healthy controls. Implemented QC, dimensionality reduction, and cell-type prediction.",
    tags: ["scRNA-seq", "Scanpy", "COVID-19"],
    link: "https://github.com/mujtababarsi"
  },
  {
    title: "Data Visualisation with ggplot2",
    tools: "R, RStudio, ggplot2, Tidyverse",
    desc: "Developed publication-quality visualizations using the 'Grammar of Graphics' framework. Implemented EDA techniques including distribution plots and complex faceted layouts.",
    tags: ["R", "ggplot2", "EDA"],
    link: "https://github.com/mujtababarsi"
  },
  {
    title: "Memory-Efficient scRNA-seq (Scarf)",
    tools: "Python, Scarf, Zarr, Dask",
    desc: "Analysed 10x Genomics 5K PBMC dataset utilizing Zarr and Dask for low-memory data chunking. Performed KNN mapping and cross-dataset cluster similarity inspection.",
    tags: ["Memory Optimization", "Dask", "Zarr"],
    link: "https://github.com/mujtababarsi"
  },
  {
    title: "Spatial Transcriptomics Integration",
    tools: "Python, Scanpy, Scanorama",
    desc: "Integrated spatial datasets with single-cell RNA-seq references using the Scanorama algorithm to achieve accurate batch correction and cell-type mapping.",
    tags: ["Spatial", "Integration", "Scanorama"],
    link: "https://github.com/mujtababarsi"
  }
];

const EXPERIENCE = [
  {
    role: "Scientific Engagement Officer",
    org: "Salmawit Co. Ltd",
    period: "2021 - 2022",
    desc: "Synthesised complex clinical trial data and molecular studies. Evaluated genomic-related clinical studies to provide technical insights on drug efficacy and safety profiles."
  },
  {
    role: "Production Supervisor",
    org: "Blue Nile Pharmaceutical Factory",
    period: "2019 - 2021",
    desc: "Engineered a 4x increase in manufacturing throughput by optimising production cycles and implementing data-driven workflow improvements."
  },
  {
    role: "Medical Representative",
    org: "Aurobindo Pharma",
    period: "2017 - 2018",
    desc: "Communicated technical product features and molecular clinical benefits. Interpreted multidimensional clinical studies to resolve complex medical inquiries."
  },
  {
    role: "Medical Representative",
    org: "ADIL MAHGOUB INTERNATIONAL (Bioderma)",
    period: "2017 - 2018",
    desc: "Managed territory performance by cultivating relationships with key clinical opinion leaders and monitored emerging market trends."
  },
  {
    role: "Pharmacist",
    org: "Wenji Pharmacy",
    period: "2016",
    desc: "Processed medications with 100% accuracy while verifying dosage and providing clinical counseling regarding medication use."
  },
  {
    role: "Pharmacist",
    org: "Sudan Military Hospital",
    period: "2016",
    desc: "Monitored pharmaceutical inventory and controlled substances in accordance with legal and regulatory standards."
  }
];

const EDUCATION = [
  {
    degree: "Bachelor of science: Pharmacy",
    school: "NATIONAL RIBAT UNIVERSITY",
    location: "Khartoum, Sudan",
    period: "2010 - 2015",
    details: "Pharmacology, Clinical Pharmacology, Biochemistry, Pharmacognosy, Microbiology, Analytical Chemistry."
  }
];

const CERTIFICATES = [
  "Bioinformatics for Biologists: Linux, BASH Scripting, and R",
  "Kaggle Python Certification: Data science syntax and structures",
  "Introduction to Bioinformatics: Genomic analysis and sequence processing",
  "NBIS Workshops Training (National Bioinformatics Infrastructure Sweden)",
  "Total Quality Management: Process Optimisation",
  "Drug Information Resources: Evidence-based research",
  "Basic Pharmaceutical Marketing"
];

const GENOMIC_DATA = [
  { pos: 0, depth: 45 }, { pos: 100, depth: 52 }, { pos: 200, depth: 89 },
  { pos: 300, depth: 120 }, { pos: 400, depth: 40 }, { pos: 500, depth: 65 },
  { pos: 600, depth: 150 }, { pos: 700, depth: 95 }, { pos: 800, depth: 30 }
];

// --- COMPONENTS ---

const AIProjectInsight = ({ project }) => {
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);

  const getInsight = async () => {
    setLoading(true);
    const prompt = `Given this project: "${project.title}. ${project.desc}". 
    Suggest one highly technical future research direction or therapeutic application combining Single-cell RNA-seq and Pharmacology. Brief sentences only.`;
    const sysPrompt = "You are a senior bioinformatics advisor.";
    try {
      const res = await callGemini(prompt, sysPrompt);
      setInsight(res);
    } catch (e) {
      setInsight("Error generating insight.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-slate-100">
      {!insight ? (
        <button 
          onClick={getInsight}
          disabled={loading}
          className="flex items-center gap-2 text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:text-blue-800 transition-colors"
        >
          {loading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
          ✨ Generate AI Insight
        </button>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[11px] text-slate-500 italic bg-blue-50/50 p-2 rounded-lg border border-blue-100">
          <span className="font-bold text-blue-700 not-italic block mb-1">AI Future Direction:</span>
          {insight}
        </motion.div>
      )}
    </div>
  );
};

const AICopilotModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hello! I am Mohamed's Digital Twin. Ask me how I can apply my bioinformatics and pharmacy background to your specific research problems." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const sysPrompt = `You are the digital twin of Mohamed Elmugtaba, a Bioinformatician and Pharmacist. 
    Your background: Sudan military hospital, Blue Nile Pharmacy, NBIS training, Scanpy, Scarf, Nextflow, Python, R.
    Explain how you would solve specific biological or clinical problems using your technical stack.`;

    try {
      const res = await callGemini(userMsg, sysPrompt);
      setMessages(prev => [...prev, { role: 'ai', text: res }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', text: "Connection error. Please try again!" }]);
    } finally {
      setLoading(false);
    }
  };

  const speakMessage = async (text) => {
    const audioData = await callGeminiTTS(text.slice(0, 300));
    if (audioData) {
      const audio = new Audio(`data:audio/wav;base64,${audioData}`);
      audio.play();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative flex flex-col h-[600px]"
      >
        <div className="bg-slate-900 p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl"><BrainCircuit className="text-white" size={24} /></div>
            <div>
              <h3 className="text-white font-bold">✨ Research Co-Pilot</h3>
              <p className="text-slate-400 text-xs">Mohamed's Digital Research Twin</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors"><X /></button>
        </div>

        <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-50">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none relative'
              }`}>
                {m.text}
                {m.role === 'ai' && (
                  <button onClick={() => speakMessage(m.text)} className="absolute -right-8 top-0 text-slate-300 hover:text-blue-500"><Volume2 size={16} /></button>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl rounded-tl-none flex items-center gap-2 shadow-sm">
                <Loader2 className="animate-spin text-blue-600" size={16} />
                <span className="text-xs text-slate-400 font-mono">Analyzing...</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-100 bg-white">
          <div className="relative">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a research question..."
              className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
            />
            <button 
              onClick={handleSend}
              className="absolute right-2 top-1.5 p-2 bg-slate-900 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- MAIN PAGE ---

const SectionHeading = ({ title, subtitle }) => (
  <div className="mb-12 text-center">
    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{title}</motion.h2>
    <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mb-4" />
    <p className="text-slate-600 max-w-2xl mx-auto">{subtitle}</p>
  </div>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', id: 'home' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Journey', id: 'experience' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-blue-200 shadow-lg"><Dna className="text-white w-5 h-5" /></div>
          <span className="font-bold text-xl tracking-tight text-slate-900 uppercase">M. ELMUGTABA</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a 
              key={l.name} 
              href={`#${l.id}`} 
              onClick={(e) => handleScroll(e, l.id)}
              className="text-slate-600 hover:text-blue-600 font-bold text-sm uppercase tracking-wide transition-colors cursor-pointer"
            >
              {l.name}
            </a>
          ))}
          <a href="mailto:Mujtababarsi@mail.com" className="bg-slate-900 text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-blue-700 transition-all shadow-lg">
            HIRE ME
          </a>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="md:hidden bg-white overflow-hidden border-t">
            <div className="flex flex-col p-6 gap-4">
              {links.map(l => (
                <a 
                  key={l.name} 
                  href={`#${l.id}`} 
                  onClick={(e) => handleScroll(e, l.id)}
                  className="font-bold text-slate-700 uppercase cursor-pointer"
                >
                  {l.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ProfilePicHolder = () => (
  <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto lg:mx-0 shrink-0">
    {/* Animated Genomic Scan Rings */}
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute inset-[-12px] rounded-full border-2 border-dashed border-blue-400/30"
    />
    <motion.div 
      animate={{ rotate: -360 }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute inset-[-6px] rounded-full border border-blue-600/20"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-600 rounded-full shadow-[0_0_12px_rgba(37,99,235,0.6)]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full" />
    </motion.div>

    {/* Main Holder Frame */}
    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl bg-white group">
      {PROFILE_IMAGE_URL ? (
        <img 
          src={PROFILE_IMAGE_URL} 
          alt="Mohamed Elmugtaba" 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center">
          <User className="w-24 h-24 text-slate-300 group-hover:scale-110 transition-transform duration-500" />
        </div>
      )}
      
      {/* Interactive Overlay */}
      <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/5 transition-colors duration-300" />
      
      {/* Scientific Scanning Animation */}
      <motion.div 
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[1px] bg-blue-400/40 shadow-[0_0_8px_rgba(37,99,235,0.4)] z-10 pointer-events-none"
      />
    </div>

    {/* Identity Verification Pulse */}
    <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-lg z-20">
      <div className="bg-green-500 w-3 h-3 rounded-full border-2 border-white animate-pulse" title="Profile Online" />
    </div>
  </div>
);

export default function App() {
  const [isAiOpen, setIsAiOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
      <Navbar />
      
      {/* Hero */}
      <section id="home" className="relative pt-32 pb-20 overflow-hidden bg-slate-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              {/* Profile Pic Integrated here */}
              <div className="flex flex-col md:flex-row items-center lg:items-start gap-8 mb-10">
                <ProfilePicHolder />
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                    <span className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">Bioinformatician | Pharmacist</span>
                  </div>
                  <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-4">Mohamed <br/><span className="text-blue-600">Elmugtaba</span></h1>
                </div>
              </div>

              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl text-center lg:text-left mx-auto lg:mx-0">
                Specialising in <strong>Single-Cell Analysis</strong> and <strong>NGS workflows</strong>. Leveraging years of pharmaceutical expertise to interpreted multi-omic data for precision medicine.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                <a href="#projects" className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all w-full sm:w-auto text-center">My Research</a>
                <a href="https://github.com/mujtababarsi" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2">
                  <Github size={30} />
                  <span className="text-xs font-bold uppercase tracking-widest">Mujtababarsi</span>
                </a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-8 rounded-3xl shadow-2xl relative border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-widest flex items-center gap-2">
                  <Terminal size={18} className="text-blue-600" /> Sequencing Analysis
                </h3>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-slate-100" />
                  <div className="w-2 h-2 rounded-full bg-slate-100" />
                  <div className="w-2 h-2 rounded-full bg-blue-500 shadow-sm" />
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={GENOMIC_DATA}>
                    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/><stop offset="95%" stopColor="#2563eb" stopOpacity={0}/></linearGradient></defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
                    <Area type="monotone" dataKey="depth" stroke="#2563eb" strokeWidth={3} fill="url(#g)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                <span>Ref: 10x Genomics 5k PBMC</span>
                <span>Visualisation via Scarf</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-24 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Technical Stack" subtitle="Interpretation of high-dimensional biological findings into actionable insights." />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILLS.map((skill, idx) => (
              <motion.div key={skill.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-500 hover:shadow-xl transition-all group">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">{skill.icon}</div>
                <h3 className="font-bold text-slate-900 mb-4 text-lg">{skill.category}</h3>
                <ul className="space-y-3">{skill.items.map(item => (<li key={item} className="flex items-center gap-2 text-slate-500 text-sm"><CheckCircle2 size={14} className="text-blue-500" />{item}</li>))}</ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 bg-slate-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Bioinformatics Projects" subtitle="Evidence-based research and clinical database analysis." />
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {PROJECTS.map((p, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col h-full hover:shadow-2xl transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors"><Cpu size={24} /></div>
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors">
                    <ExternalLink size={20} />
                  </a>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{p.title}</h3>
                <div className="text-[10px] font-bold text-blue-500 mb-4 uppercase tracking-widest">{p.tools}</div>
                <p className="text-slate-600 mb-6 flex-grow text-sm leading-relaxed">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tags.map(tag => (<span key={tag} className="px-2.5 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase rounded">{tag}</span>))}
                </div>
                <AIProjectInsight project={p} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-24 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading title="Professional Path" subtitle="Chronological journey from clinical practice to pharmaceutical data leadership." />
          <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-100">
            {EXPERIENCE.map((exp, idx) => (
              <div key={idx} className="relative flex gap-8 group">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full border-4 border-white bg-blue-600 text-white flex items-center justify-center shadow-md z-10 group-hover:scale-110 transition-transform"><Microscope size={18} /></div>
                </div>
                <div className="pb-8 border-b border-slate-100 flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                    <h4 className="text-xl font-bold text-slate-900">{exp.role}</h4>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{exp.period}</span>
                  </div>
                  <div className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-tighter">{exp.org}</div>
                  <p className="text-slate-600 text-sm leading-relaxed">{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 grid md:grid-cols-2 gap-12">
             <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 h-full">
                <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2"><Award className="text-blue-600" /> Education</h3>
                {EDUCATION.map((edu, idx) => (
                   <div key={idx} className="h-full">
                      <h4 className="font-bold text-slate-900 mb-1">{edu.degree}</h4>
                      <p className="text-sm text-slate-500 mb-4">{edu.school} • {edu.period}</p>
                      <div className="text-xs text-slate-500 leading-relaxed pt-4 border-t border-slate-200"><strong>Core Modules:</strong> {edu.details}</div>
                   </div>
                ))}
             </div>
             <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2"><CheckCircle2 className="text-blue-600" /> Certifications</h3>
                <div className="grid gap-3">
                   {CERTIFICATES.map((cert, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs text-slate-600 py-1"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 shrink-0" />{cert}</div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-slate-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-900 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Advancing Vision 2030 Healthcare.</h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-white">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center"><Mail size={20} className="text-blue-400" /></div>
                    <div><div className="text-xs text-slate-500 uppercase">Email</div><div className="text-lg font-medium">Mujtababarsi@mail.com</div></div>
                  </div>
                  <div className="flex items-center gap-4 text-white">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center"><Phone size={20} className="text-blue-400" /></div>
                    <div><div className="text-xs text-slate-500 uppercase">Phone</div><div className="text-lg font-medium">0536986581</div></div>
                  </div>
                  <div className="flex items-center gap-4 text-white">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center"><MapPin size={20} className="text-blue-400" /></div>
                    <div><div className="text-xs text-slate-500 uppercase">Location</div><div className="text-lg font-medium">Riyadh, Saudi Arabia</div></div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-10 rounded-3xl text-center border border-slate-100 shadow-sm">
                 <a href="https://github.com/mujtababarsi" target="_blank" rel="noopener noreferrer" className="block group mb-6">
                    <Github size={44} className="mx-auto text-slate-900 group-hover:text-blue-600 transition-colors duration-300" />
                 </a>
                 <h4 className="text-xl font-bold mb-2">Technical Repositories</h4>
                 <p className="text-sm text-slate-500 mb-8 uppercase tracking-widest font-bold">Mujtababarsi</p>
                 <a href="https://github.com/mujtababarsi" target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-blue-600 transition-all shadow-lg active:scale-95">Go to GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating AI */}
      <button onClick={() => setIsAiOpen(true)} className="fixed bottom-8 right-8 z-50 bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group flex items-center gap-2">
        <Sparkles size={24} />
        <span className="max-w-0 group-hover:max-w-xs transition-all duration-300 overflow-hidden whitespace-nowrap font-bold">✨ AI Research Twin</span>
      </button>

      <AICopilotModal isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
    </div>
  );
}

const Footer = () => (
  <footer className="py-12 bg-white border-t border-slate-100">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <div className="flex items-center justify-center gap-2 mb-6">
        <a href="#home">
          <Dna className="text-blue-600 w-6 h-6 hover:scale-110 transition-transform" />
        </a>
        <span className="font-bold text-lg tracking-tight text-slate-900 uppercase">M. ELMUGTABA</span>
      </div>
      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Bioinformatician | Pharmacist | Riyadh, KSA</p>
    </div>
  </footer>
);
