import React, { createContext, useContext, useState, useEffect } from "react";
import { Project, ExperienceItem, CertificationItem, SkillCategory } from "../types";
import { personalInfo as defaultPersonalInfo, projectsData as defaultProjects, experienceData as defaultExperience, certificationsData as defaultCertifications, skillsData as defaultSkills } from "../data";

interface PortfolioContextType {
  personalInfo: typeof defaultPersonalInfo;
  projects: Project[];
  experience: ExperienceItem[];
  certifications: CertificationItem[];
  skills: SkillCategory[];
  
  // Update functions
  updatePersonalInfo: (info: Partial<typeof defaultPersonalInfo>) => void;
  updateEducation: (edu: Partial<typeof defaultPersonalInfo["education"]>) => void;
  
  // Project list modifiers
  addProject: (p: Project) => void;
  updateProject: (p: Project) => void;
  deleteProject: (id: string) => void;
  
  // Experience modifiers
  addExperience: (exp: ExperienceItem) => void;
  updateExperience: (exp: ExperienceItem) => void;
  deleteExperience: (id: string) => void;
  
  // Certification modifiers
  addCertification: (cert: CertificationItem) => void;
  deleteCertification: (name: string) => void;
  
  // Skill modifiers
  addSkill: (categoryIdx: number, sk: { name: string; level: number }) => void;
  deleteSkill: (categoryIdx: number, name: string) => void;
  
  // Soft skill modifiers
  addSoftSkill: (name: string) => void;
  deleteSoftSkill: (name: string) => void;
  
  // Additional info modifiers
  addAdditionalInfo: (text: string) => void;
  deleteAdditionalInfo: (text: string) => void;
  
  // Master reset
  resetToDefaults: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [personalInfo, setPersonalInfo] = useState<typeof defaultPersonalInfo>(() => {
    const saved = localStorage.getItem("portfolio_personal_info");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.title && (parsed.title.includes("Student") || parsed.title.includes("student"))) {
          parsed.title = parsed.title.replace(/BSIT Student/gi, "IT Specialist").replace(/Student/gi, "Specialist");
        }
        if (parsed.summary && (parsed.summary.includes("Student") || parsed.summary.includes("student"))) {
          parsed.summary = parsed.summary.replace(/BSIT student/gi, "BSIT Candidate").replace(/student/gi, "candidate");
        }
        return parsed;
      } catch (e) {
        return defaultPersonalInfo;
      }
    }
    return defaultPersonalInfo;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem("portfolio_projects");
    return saved ? JSON.parse(saved) : defaultProjects;
  });

  const [experience, setExperience] = useState<ExperienceItem[]>(() => {
    const saved = localStorage.getItem("portfolio_experience");
    return saved ? JSON.parse(saved) : defaultExperience;
  });

  const [certifications, setCertifications] = useState<CertificationItem[]>(() => {
    const saved = localStorage.getItem("portfolio_certifications");
    return saved ? JSON.parse(saved) : defaultCertifications;
  });

  const [skills, setSkills] = useState<SkillCategory[]>(() => {
    const saved = localStorage.getItem("portfolio_skills");
    return saved ? JSON.parse(saved) : defaultSkills;
  });

  // Sync to local storage on changes
  useEffect(() => {
    localStorage.setItem("portfolio_personal_info", JSON.stringify(personalInfo));
  }, [personalInfo]);

  useEffect(() => {
    localStorage.setItem("portfolio_projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("portfolio_experience", JSON.stringify(experience));
  }, [experience]);

  useEffect(() => {
    localStorage.setItem("portfolio_certifications", JSON.stringify(certifications));
  }, [certifications]);

  useEffect(() => {
    localStorage.setItem("portfolio_skills", JSON.stringify(skills));
  }, [skills]);

  // Update mechanisms
  const updatePersonalInfo = (info: Partial<typeof defaultPersonalInfo>) => {
    setPersonalInfo((prev) => ({ ...prev, ...info }));
  };

  const updateEducation = (edu: Partial<typeof defaultPersonalInfo["education"]>) => {
    setPersonalInfo((prev) => ({
      ...prev,
      education: { ...prev.education, ...edu }
    }));
  };

  const addProject = (p: Project) => {
    setProjects((prev) => [...prev, p]);
  };

  const updateProject = (p: Project) => {
    setProjects((prev) => prev.map((item) => (item.id === p.id ? p : item)));
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const addExperience = (exp: ExperienceItem) => {
    setExperience((prev) => [...prev, exp]);
  };

  const updateExperience = (exp: ExperienceItem) => {
    setExperience((prev) => prev.map((item) => (item.id === exp.id ? exp : item)));
  };

  const deleteExperience = (id: string) => {
    setExperience((prev) => prev.filter((exp) => exp.id !== id));
  };

  const addCertification = (cert: CertificationItem) => {
    setCertifications((prev) => [...prev, cert]);
  };

  const deleteCertification = (name: string) => {
    setCertifications((prev) => prev.filter((c) => c.name !== name));
  };

  const addSkill = (categoryIdx: number, sk: { name: string; level: number }) => {
    setSkills((prev) => {
      const copy = [...prev];
      if (copy[categoryIdx]) {
        // Prevent duplication
        const existsIdx = copy[categoryIdx].skills.findIndex(s => s.name.toLowerCase() === sk.name.toLowerCase());
        if (existsIdx > -1) {
          copy[categoryIdx].skills[existsIdx] = sk;
        } else {
          copy[categoryIdx].skills.push(sk);
        }
      }
      return copy;
    });
  };

  const deleteSkill = (categoryIdx: number, name: string) => {
    setSkills((prev) => {
      const copy = [...prev];
      if (copy[categoryIdx]) {
        copy[categoryIdx].skills = copy[categoryIdx].skills.filter(s => s.name !== name);
      }
      return copy;
    });
  };

  const addSoftSkill = (name: string) => {
    setPersonalInfo((prev) => {
      if (prev.softSkills.includes(name)) return prev;
      return {
        ...prev,
        softSkills: [...prev.softSkills, name]
      };
    });
  };

  const deleteSoftSkill = (name: string) => {
    setPersonalInfo((prev) => ({
      ...prev,
      softSkills: prev.softSkills.filter(s => s !== name)
    }));
  };

  const addAdditionalInfo = (text: string) => {
    setPersonalInfo((prev) => {
      if (prev.additionalInfo.includes(text)) return prev;
      return {
        ...prev,
        additionalInfo: [...prev.additionalInfo, text]
      };
    });
  };

  const deleteAdditionalInfo = (text: string) => {
    setPersonalInfo((prev) => ({
      ...prev,
      additionalInfo: prev.additionalInfo.filter(t => t !== text)
    }));
  };

  const resetToDefaults = () => {
    setPersonalInfo(defaultPersonalInfo);
    setProjects(defaultProjects);
    setExperience(defaultExperience);
    setCertifications(defaultCertifications);
    setSkills(defaultSkills);
    localStorage.removeItem("portfolio_personal_info");
    localStorage.removeItem("portfolio_projects");
    localStorage.removeItem("portfolio_experience");
    localStorage.removeItem("portfolio_certifications");
    localStorage.removeItem("portfolio_skills");
  };

  return (
    <PortfolioContext.Provider
      value={{
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
        resetToDefaults,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
