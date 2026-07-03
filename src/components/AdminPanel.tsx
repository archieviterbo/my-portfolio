import React, { useState, useEffect } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { 
  Lock, Unlock, X, User, ShieldAlert, Sparkles, Plus, Trash2, 
  Save, CheckCircle, RotateCcw, Edit2, FileText, Award, 
  Code, BookOpen, Layers, Check, ArrowRight
} from "lucide-react";
import { Project, ExperienceItem, CertificationItem } from "../types";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type AdminSection = "general" | "education" | "projects" | "experience" | "skills" | "certifications";

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const {
    personalInfo,
    projects,
    experience,
    certifications,
    skills,
    updatePersonalInfo,
    updateEducation,
    addProject,
    updateProject,
    deleteProject,
    addExperience,
    updateExperience,
    deleteExperience,
    addCertification,
    deleteCertification,
    addSkill,
    deleteSkill,
    addSoftSkill,
    deleteSoftSkill,
    addAdditionalInfo,
    deleteAdditionalInfo,
    resetToDefaults
  } = usePortfolio();

  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // One-time login session cleanup: reset auth state when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setIsAuthenticated(false);
      setUsername("");
      setPassword("");
      setAuthError("");
    }
  }, [isOpen]);

  // Control state
  const [activeTab, setActiveTab] = useState<AdminSection>("general");
  const [savedFeedback, setSavedFeedback] = useState("");

  // Project item form state
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    title: "",
    subtitle: "",
    description: "",
    category: "AI",
    featured: true,
    bullets: [""],
    technologies: [""]
  });

  // Experience item form state
  const [experienceForm, setExperienceForm] = useState<Partial<ExperienceItem>>({
    role: "",
    company: "",
    location: "",
    period: "",
    bullets: [""],
    skillsGained: [""]
  });

  // Certification state
  const [certForm, setCertForm] = useState<Partial<CertificationItem>>({
    name: "",
    issuer: "",
    year: "Certified",
    iconName: "ShieldCheck"
  });

  // New Skill State
  const [newSkillCategory, setNewSkillCategory] = useState(0);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState(80);

  // General field state
  const [generalForm, setGeneralForm] = useState({
    title: personalInfo.title,
    summary: personalInfo.summary,
    location: personalInfo.location,
    phone: personalInfo.phone,
    email: personalInfo.email,
  });

  // Education fields
  const [educationForm, setEducationForm] = useState({
    degree: personalInfo.education.degree,
    institution: personalInfo.education.institution,
    graduation: personalInfo.education.graduation,
  });

  const [newHighlight, setNewHighlight] = useState("");
  const [newSoftSkill, setNewSoftSkill] = useState("");
  const [newAdditional, setNewAdditional] = useState("");

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().toLowerCase() === "admin" && password === "admin") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("INVALID CREDENTIAL GATE CODE. ACCESS DENIED.");
    }
  };

  const triggerSaveFeedback = (message: string) => {
    setSavedFeedback(message);
    setTimeout(() => setSavedFeedback(""), 3000);
  };

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonalInfo(generalForm);
    triggerSaveFeedback("General information updated successfully.");
  };

  const handleSaveEducation = (e: React.FormEvent) => {
    e.preventDefault();
    updateEducation(educationForm);
    triggerSaveFeedback("Education parameters saved.");
  };

  const handleAddHighlight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHighlight.trim()) return;
    updateEducation({
      highlights: [...personalInfo.education.highlights, newHighlight.trim()]
    });
    setNewHighlight("");
    triggerSaveFeedback("Education highlight added.");
  };

  const handleDeleteHighlight = (idx: number) => {
    const filtered = personalInfo.education.highlights.filter((_, i) => i !== idx);
    updateEducation({ highlights: filtered });
    triggerSaveFeedback("Education highlight deleted.");
  };

  // Projects Modifiers
  const startNewProject = () => {
    setEditingProjectId("new");
    setProjectForm({
      title: "",
      subtitle: "",
      description: "",
      category: "AI",
      featured: true,
      bullets: [""],
      technologies: [""]
    });
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.description) return;

    const bullets = (projectForm.bullets || []).filter(b => b.trim() !== "");
    const technologies = (projectForm.technologies || []).filter(t => t.trim() !== "");

    if (editingProjectId === "new") {
      const newProj: Project = {
        id: "proj-" + Date.now(),
        title: projectForm.title,
        subtitle: projectForm.subtitle || "",
        description: projectForm.description,
        category: projectForm.category || "AI",
        featured: projectForm.featured ?? true,
        bullets: bullets.length > 0 ? bullets : ["Project completed successfully"],
        technologies: technologies.length > 0 ? technologies : ["React.js", "Tailwind CSS"]
      };
      addProject(newProj);
      triggerSaveFeedback("New project added.");
    } else if (editingProjectId) {
      const updatedProj: Project = {
        id: editingProjectId,
        title: projectForm.title,
        subtitle: projectForm.subtitle || "",
        description: projectForm.description,
        category: projectForm.category || "AI",
        featured: projectForm.featured ?? true,
        bullets: bullets.length > 0 ? bullets : ["Project updated"],
        technologies: technologies.length > 0 ? technologies : ["React.js"]
      };
      updateProject(updatedProj);
      triggerSaveFeedback("Project updated successfully.");
    }
    setEditingProjectId(null);
  };

  const handleAddProjectBullet = () => {
    setProjectForm(prev => ({
      ...prev,
      bullets: [...(prev.bullets || []), ""]
    }));
  };

  const handleRemoveProjectBullet = (idx: number) => {
    setProjectForm(prev => ({
      ...prev,
      bullets: (prev.bullets || []).filter((_, i) => i !== idx)
    }));
  };

  const handleAddProjectTech = () => {
    setProjectForm(prev => ({
      ...prev,
      technologies: [...(prev.technologies || []), ""]
    }));
  };

  const handleRemoveProjectTech = (idx: number) => {
    setProjectForm(prev => ({
      ...prev,
      technologies: (prev.technologies || []).filter((_, i) => i !== idx)
    }));
  };

  // Experience Modifiers
  const startNewExperience = () => {
    setExperienceForm({
      role: "",
      company: "",
      location: "",
      period: "",
      bullets: [""],
      skillsGained: [""]
    });
  };

  const handleExperienceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!experienceForm.role || !experienceForm.company) return;

    const bullets = (experienceForm.bullets || []).filter(b => b.trim() !== "");
    const skillsGained = (experienceForm.skillsGained || []).filter(s => s.trim() !== "");

    const newExp: ExperienceItem = {
      id: "exp-" + Date.now(),
      role: experienceForm.role,
      company: experienceForm.company,
      location: experienceForm.location || "Remote",
      period: experienceForm.period || "Ongoing",
      bullets: bullets.length > 0 ? bullets : ["Role duties conducted professionally"],
      skillsGained: skillsGained.length > 0 ? skillsGained : ["Professionalism"]
    };

    addExperience(newExp);
    triggerSaveFeedback("Work experience timeline entry created.");
    startNewExperience();
  };

  // Skill Adders
  const handleSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    addSkill(newSkillCategory, {
      name: newSkillName.trim(),
      level: newSkillLevel
    });
    setNewSkillName("");
    triggerSaveFeedback("Skill parameter added/updated successfully.");
  };

  // Cert Submit
  const handleCertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certForm.name || !certForm.issuer) return;
    addCertification({
      name: certForm.name,
      issuer: certForm.issuer,
      year: certForm.year || "Certified",
      iconName: certForm.iconName || "ShieldCheck"
    });
    setCertForm({ name: "", issuer: "", year: "Certified", iconName: "ShieldCheck" });
    triggerSaveFeedback("Certification logged successfully.");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden shadow-2xl flex flex-col font-sans">
        
        {/* Modal Title bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-900 bg-zinc-900/40 font-mono text-xs">
          <div className="flex items-center gap-2">
            <Lock size={14} className="text-cyber-yellow" />
            <span className="text-white uppercase tracking-widest font-black">
              ARCHIE-VITERBO LAB ADMINISTRATOR CONSOLE
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded text-zinc-500 hover:text-white hover:bg-zinc-800/50 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* LOGIN GATE SCREEN */}
        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col items-center justify-center py-12 px-6 max-w-md mx-auto text-center space-y-6">
            <div className="h-14 w-14 rounded-full bg-cyber-yellow/5 border border-cyber-yellow/20 flex items-center justify-center text-cyber-yellow animate-pulse">
              <Lock size={24} />
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wide">SECURE KEYHOLE PORTAL</h3>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Enter your administrative clearance codes to toggle developer configurations and make instant modifications.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-4 text-left font-mono text-xs">
              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-500 uppercase">Clearance Username</label>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-3 text-zinc-500" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter clearance login"
                    className="w-full pl-9 pr-3 py-2.5 rounded bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-cyber-yellow/60 transition-all font-sans text-xs"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-500 uppercase">Clearance Password</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-3 text-zinc-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter clearance password"
                    className="w-full pl-9 pr-3 py-2.5 rounded bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-cyber-yellow/60 transition-all font-sans text-xs"
                  />
                </div>
              </div>

              {authError && (
                <div className="p-3 border border-red-500/30 bg-red-500/5 text-red-500 rounded text-[10px] flex items-center gap-2">
                  <ShieldAlert size={14} className="shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-cyber-yellow border border-cyber-yellow text-black font-semibold font-sans rounded hover:bg-transparent hover:text-cyber-yellow transition-all cursor-pointer"
              >
                <span>VALIDATE CODES</span>
                <ArrowRight size={14} />
              </button>
            </form>
            
            <p className="text-[9px] text-zinc-600 font-mono">
              * Authorized personnel only. System activity is logged under standard BSIT compliance directives.
            </p>
          </div>
        ) : (
          /* MAIN ADMIN CONTROL HUB PANEL */
          <div className="flex-1 flex overflow-hidden">
            
            {/* Sidebar navigation tabs */}
            <div className="w-48 border-r border-zinc-900 bg-zinc-950/80 p-3 flex flex-col justify-between font-mono text-[10px] tracking-wide">
              <div className="space-y-1">
                <div className="px-3 py-2 text-[9px] uppercase text-zinc-500 font-bold">CONFIG CATEGORIES</div>
                
                <button
                  onClick={() => { setActiveTab("general"); setEditingProjectId(null); }}
                  className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 transition-colors ${
                    activeTab === "general" ? "bg-cyber-yellow/10 text-cyber-yellow font-bold border border-cyber-yellow/20" : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  <FileText size={12} />
                  <span>[01] GENERAL</span>
                </button>

                <button
                  onClick={() => { setActiveTab("education"); setEditingProjectId(null); }}
                  className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 transition-colors ${
                    activeTab === "education" ? "bg-cyber-yellow/10 text-cyber-yellow font-bold border border-cyber-yellow/20" : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  <BookOpen size={12} />
                  <span>[02] ACADEMICS</span>
                </button>

                <button
                  onClick={() => { setActiveTab("projects"); setEditingProjectId(null); }}
                  className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 transition-colors ${
                    activeTab === "projects" ? "bg-cyber-yellow/10 text-cyber-yellow font-bold border border-cyber-yellow/20" : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  <Code size={12} />
                  <span>[03] PROJECTS</span>
                </button>

                <button
                  onClick={() => { setActiveTab("skills"); setEditingProjectId(null); }}
                  className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 transition-colors ${
                    activeTab === "skills" ? "bg-cyber-yellow/10 text-cyber-yellow font-bold border border-cyber-yellow/20" : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  <Layers size={12} />
                  <span>[04] SKILLS_SET</span>
                </button>

                <button
                  onClick={() => { setActiveTab("experience"); setEditingProjectId(null); }}
                  className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 transition-colors ${
                    activeTab === "experience" ? "bg-cyber-yellow/10 text-cyber-yellow font-bold border border-cyber-yellow/20" : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  <Award size={12} />
                  <span>[05] WORK_HISTORY</span>
                </button>

                <button
                  onClick={() => { setActiveTab("certifications"); setEditingProjectId(null); }}
                  className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 transition-colors ${
                    activeTab === "certifications" ? "bg-cyber-yellow/10 text-cyber-yellow font-bold border border-cyber-yellow/20" : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  <Check size={12} />
                  <span>[06] CERTS_LIST</span>
                </button>
              </div>

              {/* Reset Default State */}
              <div className="pt-4 border-t border-zinc-900">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("ARE YOU SURE YOU WANT TO MASTER PURGE CONFIGURATIONS? ALL LOCAL CHANGES WILL BE LOST AND RESTORED TO ORIGIN RESUME STATE.")) {
                      resetToDefaults();
                      triggerSaveFeedback("All settings purge completed successfully.");
                      setIsAuthenticated(false);
                      onClose();
                    }
                  }}
                  className="w-full flex items-center justify-center gap-1.5 px-2.5 py-2 border border-zinc-800 text-zinc-500 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/5 transition-all rounded cursor-pointer uppercase text-[9px]"
                >
                  <RotateCcw size={10} />
                  <span>MASTER_RESET</span>
                </button>
              </div>
            </div>

            {/* Editing Work area */}
            <div className="flex-1 overflow-y-auto p-6 bg-zinc-950/40">
              
              {savedFeedback && (
                <div className="mb-4 p-3 border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 rounded text-xs flex items-center gap-2 font-mono">
                  <CheckCircle size={14} className="shrink-0" />
                  <span>{savedFeedback}</span>
                </div>
              )}

              {/* TAB 1: General Info */}
              {activeTab === "general" && (
                <form onSubmit={handleSaveGeneral} className="space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-2 flex items-center gap-2 border-b border-zinc-900 pb-2">
                    <FileText size={14} className="text-cyber-yellow" />
                    <span>General Identity Metrics</span>
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase font-mono font-bold">Professional Title</label>
                      <input
                        type="text"
                        value={generalForm.title}
                        onChange={(e) => setGeneralForm({...generalForm, title: e.target.value})}
                        className="w-full p-2.5 rounded bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-cyber-yellow/40 transition-all text-xs"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase font-mono font-bold">Contact Email</label>
                      <input
                        type="email"
                        value={generalForm.email}
                        onChange={(e) => setGeneralForm({...generalForm, email: e.target.value})}
                        className="w-full p-2.5 rounded bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-cyber-yellow/40 transition-all text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase font-mono font-bold">Contact Phone Number</label>
                      <input
                        type="text"
                        value={generalForm.phone}
                        onChange={(e) => setGeneralForm({...generalForm, phone: e.target.value})}
                        className="w-full p-2.5 rounded bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-cyber-yellow/40 transition-all text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase font-mono font-bold">Current Physical Coordinates</label>
                      <input
                        type="text"
                        value={generalForm.location}
                        onChange={(e) => setGeneralForm({...generalForm, location: e.target.value})}
                        className="w-full p-2.5 rounded bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-cyber-yellow/40 transition-all text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase font-mono font-bold">Bio Professional Summary Statement</label>
                    <textarea
                      value={generalForm.summary}
                      onChange={(e) => setGeneralForm({...generalForm, summary: e.target.value})}
                      className="w-full h-24 p-2.5 rounded bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-cyber-yellow/40 transition-all text-xs resize-none leading-relaxed"
                    />
                  </div>

                  {/* Soft Skills Section */}
                  <div className="space-y-3 pt-3 border-t border-zinc-900">
                    <label className="text-[10px] text-zinc-500 uppercase font-mono font-bold block">Current Soft Skills Matrix</label>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {personalInfo.softSkills.map((sk, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300">
                          <span>{sk}</span>
                          <button
                            type="button"
                            onClick={() => deleteSoftSkill(sk)}
                            className="text-zinc-600 hover:text-red-400 transition-colors"
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newSoftSkill}
                        onChange={(e) => setNewSoftSkill(e.target.value)}
                        placeholder="e.g., Problem Solving, Teamwork"
                        className="flex-1 p-2 rounded bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-cyber-yellow/40 text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newSoftSkill.trim()) {
                            addSoftSkill(newSoftSkill.trim());
                            setNewSoftSkill("");
                          }
                        }}
                        className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-cyber-yellow hover:border-cyber-yellow/40 rounded transition-all text-xs font-mono uppercase"
                      >
                        Add Skill
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 bg-cyber-yellow text-black font-semibold rounded hover:bg-transparent hover:text-cyber-yellow border border-cyber-yellow transition-all text-xs uppercase cursor-pointer"
                  >
                    <Save size={13} />
                    <span>Save Identity Parameters</span>
                  </button>
                </form>
              )}

              {/* TAB 2: Academics */}
              {activeTab === "education" && (
                <div className="space-y-6">
                  <form onSubmit={handleSaveEducation} className="space-y-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2 border-b border-zinc-900 pb-2">
                      <BookOpen size={14} className="text-cyber-yellow" />
                      <span>Academic Credentials & Targets</span>
                    </h3>

                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase font-mono font-bold">Acquired / Targeting Degree</label>
                      <input
                        type="text"
                        value={educationForm.degree}
                        onChange={(e) => setEducationForm({...educationForm, degree: e.target.value})}
                        className="w-full p-2.5 rounded bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-cyber-yellow/40 text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-500 uppercase font-mono font-bold">Education Institution (College)</label>
                        <input
                          type="text"
                          value={educationForm.institution}
                          onChange={(e) => setEducationForm({...educationForm, institution: e.target.value})}
                          className="w-full p-2.5 rounded bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-cyber-yellow/40 text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-500 uppercase font-mono font-bold">Graduation Year / Status</label>
                        <input
                          type="text"
                          value={educationForm.graduation}
                          onChange={(e) => setEducationForm({...educationForm, graduation: e.target.value})}
                          className="w-full p-2.5 rounded bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-cyber-yellow/40 text-xs"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="flex items-center gap-2 px-4 py-2 bg-cyber-yellow text-black font-semibold rounded hover:bg-transparent hover:text-cyber-yellow border border-cyber-yellow transition-all text-xs uppercase cursor-pointer"
                    >
                      <Save size={13} />
                      <span>Update Academic Status</span>
                    </button>
                  </form>

                  {/* Honor Classifications list */}
                  <div className="space-y-3 pt-5 border-t border-zinc-900">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wide font-mono">Honor Classifications (President's Lister etc)</h4>
                    <ul className="space-y-2">
                      {personalInfo.education.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-center justify-between p-2.5 rounded bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                          <span className="flex items-center gap-2">
                            <CheckCircle size={12} className="text-cyber-yellow" />
                            <span>{h}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteHighlight(idx)}
                            className="text-zinc-600 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={13} />
                          </button>
                        </li>
                      ))}
                    </ul>

                    <form onSubmit={handleAddHighlight} className="flex gap-2 pt-2">
                      <input
                        type="text"
                        required
                        value={newHighlight}
                        onChange={(e) => setNewHighlight(e.target.value)}
                        placeholder="Add new honor designation (e.g. Dean's Lister - First Sem 2026)"
                        className="flex-1 p-2 rounded bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-cyber-yellow/40 text-xs"
                      />
                      <button
                        type="submit"
                        className="px-4 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-cyber-yellow hover:border-cyber-yellow/40 rounded transition-all text-xs uppercase font-mono"
                      >
                        Add Highlight
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* TAB 3: Projects */}
              {activeTab === "projects" && (
                <div className="space-y-6">
                  {editingProjectId === null ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2">
                          <Code size={14} className="text-cyber-yellow" />
                          <span>Projects Catalog</span>
                        </h3>
                        <button
                          onClick={startNewProject}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-cyber-yellow text-black font-semibold text-xs rounded hover:bg-transparent hover:text-cyber-yellow border border-cyber-yellow transition-all cursor-pointer font-sans"
                        >
                          <Plus size={12} />
                          <span>ADD NEW PROJECT</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        {projects.map((proj) => (
                          <div 
                            key={proj.id} 
                            className="p-3.5 rounded bg-zinc-900 border border-zinc-800 hover:border-cyber-yellow/20 flex justify-between items-start gap-4 transition-all"
                          >
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="px-1.5 py-0.5 rounded bg-black border border-zinc-800 text-[9px] font-mono uppercase text-cyber-yellow">
                                  {proj.category}
                                </span>
                                <h4 className="text-sm font-bold text-white">{proj.title}</h4>
                              </div>
                              <p className="text-xs text-zinc-400 font-mono italic mb-1.5">{proj.subtitle}</p>
                              <p className="text-[11px] text-zinc-500 line-clamp-1">{proj.description}</p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => {
                                  setEditingProjectId(proj.id);
                                  setProjectForm(proj);
                                }}
                                className="p-1.5 rounded border border-zinc-800 text-zinc-400 hover:text-cyber-yellow hover:border-cyber-yellow/30 transition-all"
                              >
                                <Edit2 size={12} />
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm(`Are you sure you want to delete "${proj.title}"?`)) {
                                    deleteProject(proj.id);
                                    triggerSaveFeedback("Project deleted.");
                                  }
                                }}
                                className="p-1.5 rounded border border-zinc-800 text-zinc-400 hover:text-red-400 hover:border-red-500/20 transition-all"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // Add/Edit Project Form
                    <form onSubmit={handleProjectSubmit} className="space-y-4">
                      <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                          {editingProjectId === "new" ? "Add New Project" : `Edit Project: ${projectForm.title}`}
                        </h3>
                        <button
                          type="button"
                          onClick={() => setEditingProjectId(null)}
                          className="text-xs font-mono text-zinc-500 hover:text-white"
                        >
                          [CANCEL]
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] text-zinc-500 uppercase font-mono font-bold">Project Title</label>
                          <input
                            type="text"
                            required
                            value={projectForm.title || ""}
                            onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                            placeholder="e.g. Project Solar"
                            className="w-full p-2.5 rounded bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-cyber-yellow/40 text-xs"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] text-zinc-500 uppercase font-mono font-bold">Sub-Heading / Tagline</label>
                          <input
                            type="text"
                            value={projectForm.subtitle || ""}
                            onChange={(e) => setProjectForm({...projectForm, subtitle: e.target.value})}
                            placeholder="e.g. AI Prompting Engine Concept"
                            className="w-full p-2.5 rounded bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-cyber-yellow/40 text-xs"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] text-zinc-500 uppercase font-mono font-bold">Project Category</label>
                          <select
                            value={projectForm.category || "AI"}
                            onChange={(e) => setProjectForm({...projectForm, category: e.target.value as any})}
                            className="w-full p-2.5 rounded bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-cyber-yellow/40 text-xs font-mono"
                          >
                            <option value="AI">AI</option>
                            <option value="Cybersecurity">Cybersecurity</option>
                            <option value="Web Development">Web Development</option>
                          </select>
                        </div>

                        <div className="space-y-1 flex items-center pt-5 pl-2">
                          <label className="flex items-center gap-2 text-xs font-mono text-zinc-400 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={projectForm.featured ?? true}
                              onChange={(e) => setProjectForm({...projectForm, featured: e.target.checked})}
                              className="accent-cyber-yellow h-4 w-4 rounded bg-zinc-900 border-zinc-800 focus:ring-0"
                            />
                            <span>Featured Profile Project</span>
                          </label>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-500 uppercase font-mono font-bold">Brief Description</label>
                        <textarea
                          required
                          value={projectForm.description || ""}
                          onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                          placeholder="Provide a clear, brief high-level concept statement..."
                          className="w-full h-16 p-2.5 rounded bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-cyber-yellow/40 text-xs resize-none"
                        />
                      </div>

                      {/* Project Tech Stack */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] text-zinc-500 uppercase font-mono font-bold">Technologies Used</label>
                          <button
                            type="button"
                            onClick={handleAddProjectTech}
                            className="text-[9px] font-mono text-cyber-yellow hover:underline uppercase"
                          >
                            + Add Tech
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {(projectForm.technologies || []).map((tech, idx) => (
                            <div key={idx} className="flex gap-1">
                              <input
                                type="text"
                                value={tech}
                                onChange={(e) => {
                                  const copy = [...(projectForm.technologies || [])];
                                  copy[idx] = e.target.value;
                                  setProjectForm({...projectForm, technologies: copy});
                                }}
                                placeholder="e.g. Python"
                                className="flex-1 p-1.5 rounded bg-zinc-900 border border-zinc-800 text-white text-[11px] outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveProjectTech(idx)}
                                className="text-zinc-600 hover:text-red-400 text-xs px-1"
                              >
                                &times;
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bullet Highlights */}
                      <div className="space-y-2 pt-2 border-t border-zinc-900">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] text-zinc-500 uppercase font-mono font-bold">Key Project Achievements (Bullets)</label>
                          <button
                            type="button"
                            onClick={handleAddProjectBullet}
                            className="text-[9px] font-mono text-cyber-yellow hover:underline uppercase"
                          >
                            + Add Achievement
                          </button>
                        </div>
                        <div className="space-y-2">
                          {(projectForm.bullets || []).map((bullet, idx) => (
                            <div key={idx} className="flex gap-2">
                              <input
                                type="text"
                                value={bullet}
                                onChange={(e) => {
                                  const copy = [...(projectForm.bullets || [])];
                                  copy[idx] = e.target.value;
                                  setProjectForm({...projectForm, bullets: copy});
                                }}
                                placeholder="e.g. Solved challenges involving cryptography and decoding"
                                className="flex-1 p-2 rounded bg-zinc-900 border border-zinc-800 text-white text-xs outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveProjectBullet(idx)}
                                className="text-zinc-600 hover:text-red-400 text-xs px-2"
                              >
                                &times;
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="flex items-center gap-2 px-5 py-2 bg-cyber-yellow text-black font-semibold rounded hover:bg-transparent hover:text-cyber-yellow border border-cyber-yellow transition-all text-xs uppercase cursor-pointer"
                      >
                        <Save size={13} />
                        <span>Save Project</span>
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* TAB 4: Skills Set */}
              {activeTab === "skills" && (
                <div className="space-y-6">
                  <form onSubmit={handleSkillSubmit} className="space-y-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2 border-b border-zinc-900 pb-2 font-mono">
                      <Layers size={14} className="text-cyber-yellow" />
                      <span>Adjust Skills Matrix Distribution</span>
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-500 uppercase font-mono font-bold">Skill Category</label>
                        <select
                          value={newSkillCategory}
                          onChange={(e) => setNewSkillCategory(Number(e.target.value))}
                          className="w-full p-2.5 rounded bg-zinc-900 border border-zinc-800 text-white outline-none text-xs font-mono"
                        >
                          {skills.map((cat, idx) => (
                            <option key={idx} value={idx}>{cat.title}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-500 uppercase font-mono font-bold">Skill / Language Name</label>
                        <input
                          type="text"
                          required
                          value={newSkillName}
                          onChange={(e) => setNewSkillName(e.target.value)}
                          placeholder="e.g. TypeScript, Docker, SQL"
                          className="w-full p-2.5 rounded bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-cyber-yellow/40 text-xs font-sans"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase font-bold">
                        <span>Proficiency Level Percentage</span>
                        <span className="text-cyber-yellow font-bold text-xs">{newSkillLevel}%</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={newSkillLevel}
                        onChange={(e) => setNewSkillLevel(Number(e.target.value))}
                        className="w-full accent-cyber-yellow bg-zinc-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-cyber-yellow text-black font-semibold rounded hover:bg-transparent hover:text-cyber-yellow border border-cyber-yellow transition-all text-xs uppercase cursor-pointer"
                    >
                      Add / Update Matrix Skill
                    </button>
                  </form>

                  {/* Skills lists by categories */}
                  <div className="space-y-4 pt-5 border-t border-zinc-900 font-mono text-xs">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Current Matrix Configuration</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {skills.map((category, cidx) => (
                        <div key={cidx} className="p-3 bg-zinc-900 rounded border border-zinc-800 space-y-2">
                          <h5 className="font-bold text-cyber-yellow text-[10px] uppercase border-b border-zinc-800 pb-1 mb-2">
                            {category.title}
                          </h5>
                          
                          <div className="space-y-2">
                            {category.skills.map((sk, sidx) => (
                              <div key={sidx} className="flex items-center justify-between text-[11px] bg-zinc-950 p-1.5 rounded">
                                <span className="text-zinc-300">{sk.name} ({sk.level}%)</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    deleteSkill(cidx, sk.name);
                                    triggerSaveFeedback("Skill deleted from " + category.title);
                                  }}
                                  className="text-zinc-500 hover:text-red-400 font-bold px-1"
                                >
                                  &times;
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: Work Experience */}
              {activeTab === "experience" && (
                <div className="space-y-6">
                  <form onSubmit={handleExperienceSubmit} className="space-y-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2 border-b border-zinc-900 pb-2">
                      <Award size={14} className="text-cyber-yellow" />
                      <span>Log Workplace Employment Entries</span>
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-500 uppercase font-mono font-bold">Role Title</label>
                        <input
                          type="text"
                          required
                          value={experienceForm.role || ""}
                          onChange={(e) => setExperienceForm({...experienceForm, role: e.target.value})}
                          placeholder="e.g. Technical Support Associate"
                          className="w-full p-2.5 rounded bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-cyber-yellow/40 text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-500 uppercase font-mono font-bold">Company / Employer</label>
                        <input
                          type="text"
                          required
                          value={experienceForm.company || ""}
                          onChange={(e) => setExperienceForm({...experienceForm, company: e.target.value})}
                          placeholder="e.g. pasig tech inc"
                          className="w-full p-2.5 rounded bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-cyber-yellow/40 text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-500 uppercase font-mono font-bold">Work Period / Dates</label>
                        <input
                          type="text"
                          value={experienceForm.period || ""}
                          onChange={(e) => setExperienceForm({...experienceForm, period: e.target.value})}
                          placeholder="e.g. Nov 2025 - Present"
                          className="w-full p-2.5 rounded bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-cyber-yellow/40 text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-500 uppercase font-mono font-bold">Job Coordinates (Location)</label>
                        <input
                          type="text"
                          value={experienceForm.location || ""}
                          onChange={(e) => setExperienceForm({...experienceForm, location: e.target.value})}
                          placeholder="e.g. Metro Manila, Philippines"
                          className="w-full p-2.5 rounded bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-cyber-yellow/40 text-xs"
                        />
                      </div>
                    </div>

                    {/* Skill tags */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase font-mono font-bold">Skills Gained (comma-separated)</label>
                      <input
                        type="text"
                        value={(experienceForm.skillsGained || []).join(", ")}
                        onChange={(e) => {
                          const list = e.target.value.split(",").map(s => s.trim());
                          setExperienceForm({...experienceForm, skillsGained: list});
                        }}
                        placeholder="Time Management, Customer Service, Tech"
                        className="w-full p-2.5 rounded bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-cyber-yellow/40 text-xs font-mono"
                      />
                    </div>

                    {/* Bullet Duties */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-zinc-500 uppercase font-mono font-bold">Responsibilities & Contributions (one per line)</label>
                      <textarea
                        value={(experienceForm.bullets || []).join("\n")}
                        onChange={(e) => {
                          const lines = e.target.value.split("\n");
                          setExperienceForm({...experienceForm, bullets: lines});
                        }}
                        placeholder="Provide details of contributions..."
                        className="w-full h-20 p-2.5 rounded bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-cyber-yellow/40 text-xs font-sans resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-cyber-yellow text-black font-semibold rounded hover:bg-transparent hover:text-cyber-yellow border border-cyber-yellow transition-all text-xs uppercase cursor-pointer"
                    >
                      Log Work Experience Entry
                    </button>
                  </form>

                  {/* List of current experiences */}
                  <div className="space-y-3 pt-5 border-t border-zinc-900">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Employment Ledger</h4>
                    <div className="space-y-2">
                      {experience.map((exp) => (
                        <div key={exp.id} className="p-3 bg-zinc-900 rounded border border-zinc-800 flex justify-between items-center text-xs">
                          <div>
                            <span className="font-bold text-white">{exp.role}</span>
                            <span className="text-zinc-500 font-mono"> @ {exp.company} ({exp.period})</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              deleteExperience(exp.id);
                              triggerSaveFeedback("Work history entry deleted.");
                            }}
                            className="text-zinc-500 hover:text-red-400 p-1.5 border border-zinc-800 bg-black rounded"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: Certifications */}
              {activeTab === "certifications" && (
                <div className="space-y-6">
                  <form onSubmit={handleCertSubmit} className="space-y-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2 border-b border-zinc-900 pb-2">
                      <Check size={14} className="text-cyber-yellow" />
                      <span>Issue / Log Professional Certifications</span>
                    </h3>

                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase font-mono font-bold">Certification Designation Title</label>
                      <input
                        type="text"
                        required
                        value={certForm.name || ""}
                        onChange={(e) => setCertForm({...certForm, name: e.target.value})}
                        placeholder="e.g. Introduction to Cybersecurity and Network Security"
                        className="w-full p-2.5 rounded bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-cyber-yellow/40 text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-500 uppercase font-mono font-bold">Issuing Authority (Authority)</label>
                        <input
                          type="text"
                          required
                          value={certForm.issuer || ""}
                          onChange={(e) => setCertForm({...certForm, issuer: e.target.value})}
                          placeholder="e.g. DICT, TESDA, DeepLearning.AI"
                          className="w-full p-2.5 rounded bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-cyber-yellow/40 text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-500 uppercase font-mono font-bold">Date Issued / Status</label>
                        <input
                          type="text"
                          value={certForm.year || ""}
                          onChange={(e) => setCertForm({...certForm, year: e.target.value})}
                          placeholder="e.g. Certified / 2026"
                          className="w-full p-2.5 rounded bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-cyber-yellow/40 text-xs"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-cyber-yellow text-black font-semibold rounded hover:bg-transparent hover:text-cyber-yellow border border-cyber-yellow transition-all text-xs uppercase cursor-pointer"
                    >
                      Log Certification Parameters
                    </button>
                  </form>

                  {/* list certifications */}
                  <div className="space-y-3 pt-5 border-t border-zinc-900">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Logged Certifications</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {certifications.map((cert, idx) => (
                        <div key={idx} className="p-3 rounded bg-zinc-900 border border-zinc-800 flex justify-between items-center">
                          <div className="overflow-hidden">
                            <span className="font-bold text-white block truncate">{cert.name}</span>
                            <span className="text-[10px] text-zinc-500">{cert.issuer} ({cert.year})</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              deleteCertification(cert.name);
                              triggerSaveFeedback("Certification removed.");
                            }}
                            className="text-zinc-500 hover:text-red-400 shrink-0 p-1 bg-black rounded border border-zinc-800"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
