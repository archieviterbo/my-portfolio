import { Project, ExperienceItem, CertificationItem, SkillCategory } from "./types";

export const personalInfo = {
  name: "Archie D. Viterbo",
  title: "IT Specialist & Cyber-AI Developer",
  location: "Pasig City, Philippines",
  phone: "09927673909",
  email: "archieviterbo0127@gmail.com",
  summary: "Motivated Bachelor of Science in Information Technology (BSIT) candidate at Pamantasan ng Lungsod ng Pasig, expected to graduate in June 2027. Passionate about software development, web technologies, cybersecurity, and AI-assisted development. Proficient in Python, HTML, PHP, JavaScript, and React.js, with hands-on experience building academic and personal projects. Recognized for strong problem-solving abilities, adaptability, and willingness to learn. Seeking an opportunity to contribute technical skills while gaining professional experience in the IT industry.",
  education: {
    degree: "Bachelor of Science in Information Technology (BSIT)",
    institution: "Pamantasan ng Lungsod ng Pasig",
    graduation: "Expected Graduation: June 2027",
    highlights: [
      "Consistent President's Lister (PL) and Dean's Lister (DL)",
      "With Honors, High School"
    ]
  },
  additionalInfo: [
    "Experienced in using AI tools to improve coding efficiency, project development, and research workflows",
    "Strong willingness to learn from mentors and experienced professionals",
    "Interested in software engineering, cybersecurity, web development, and emerging technologies"
  ],
  softSkills: [
    "Problem Solving",
    "Adaptability",
    "Communication",
    "Critical Thinking",
    "Team Collaboration",
    "Fast Learner",
    "Time Management",
    "Creativity",
    "Continuous Learning Mindset",
    "Customer Service"
  ]
};

export const projectsData: Project[] = [
  {
    id: "ay-ai",
    title: "AY.ai",
    subtitle: "AI Content Detection System",
    description: "An AI-powered system design capable of analyzing and detecting AI-generated multimedia content.",
    bullets: [
      "Developed a concept for an AI-powered system capable of detecting AI-generated multimedia content",
      "Designed features for analyzing text, images, audio, and video content",
      "Applied research and problem-solving skills in AI and content verification"
    ],
    technologies: ["React.js", "Python", "AI Content Analysis", "Prompt Engineering"],
    category: "AI",
    featured: true
  },
  {
    id: "marketing-assistant",
    title: "Content Marketing AI Assistant",
    subtitle: "AI Copywriter & Prompt Engineering Tool",
    description: "An AI-powered assistant that helps users generate high-quality optimized marketing and social media copy.",
    bullets: [
      "Created an AI-powered assistant to help users generate content for social media and marketing purposes",
      "Utilized AI prompting techniques to improve content quality and user productivity",
      "Focused on user-friendly interaction and content customization"
    ],
    technologies: ["React.js", "JavaScript", "Prompt Engineering", "OpenAI / Gemini Concept"],
    category: "AI",
    featured: true
  },
  {
    id: "ctf-jeopardy",
    title: "CTF Jeopardy Beginner Challenge",
    subtitle: "Cybersecurity Training & Exercises",
    description: "Participated in Capture The Flag (CTF) cybersecurity exercises involving logical analysis and problem-solving.",
    bullets: [
      "Participated in Capture The Flag (CTF) cybersecurity exercises",
      "Solved beginner-level challenges involving cybersecurity concepts, logical analysis, and problem-solving",
      "Gained exposure to security practices and ethical hacking fundamentals"
    ],
    technologies: ["Cybersecurity", "Network Security", "Cryptography", "Linux"],
    category: "Cybersecurity",
    featured: true
  }
];

export const experienceData: ExperienceItem[] = [
  {
    id: "panda",
    role: "Food Delivery Rider",
    company: "Foodpanda",
    location: "Philippines",
    period: "Ongoing Experience",
    bullets: [
      "Provided timely and accurate delivery services while maintaining excellent customer service",
      "Communicated effectively with customers regarding order updates and delivery concerns",
      "Demonstrated time management, reliability, and problem-solving skills in a fast-paced environment"
    ],
    skillsGained: ["Time Management", "Customer Service", "Reliability", "Problem Solving"]
  },
  {
    id: "spes",
    role: "Administrative Assistant (SPES)",
    company: "Pasig City Government",
    location: "Pasig City, Philippines",
    period: "3-Time Participant",
    bullets: [
      "Participated in the Special Program for Employment of Students (SPES) program on three separate occasions",
      "Assisted with administrative and office-related tasks",
      "Developed workplace professionalism, communication skills, and teamwork experience"
    ],
    skillsGained: ["Office Administration", "Professionalism", "Communication", "Teamwork"]
  }
];

export const certificationsData: CertificationItem[] = [
  {
    name: "NC II Computer Systems Servicing",
    issuer: "TESDA",
    year: "Certified",
    iconName: "MonitorCog"
  },
  {
    name: "Introduction to Cybersecurity and Network Security",
    issuer: "DICT",
    year: "Certified",
    iconName: "ShieldAlert"
  },
  {
    name: "AI Prompting for Everyone",
    issuer: "DeepLearning.AI",
    year: "Certified",
    iconName: "Sparkles"
  }
];

export const skillsData: SkillCategory[] = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Python", level: 85 },
      { name: "JavaScript", level: 80 },
      { name: "PHP", level: 75 },
      { name: "HTML / CSS", level: 90 }
    ]
  },
  {
    title: "Frameworks & Tech",
    skills: [
      { name: "React.js", level: 80 },
      { name: "Tailwind CSS", level: 85 },
      { name: "AI-Assisted Dev", level: 90 },
      { name: "Prompt Engineering", level: 95 }
    ]
  },
  {
    title: "Areas of Interest",
    skills: [
      { name: "Software Engineering", level: 85 },
      { name: "Cybersecurity", level: 80 },
      { name: "Artificial Intelligence", level: 85 },
      { name: "Network Security", level: 75 }
    ]
  }
];
