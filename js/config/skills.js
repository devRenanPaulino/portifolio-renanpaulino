// Hard skills exibidas como luzes de troca. `level` é a autoavaliação em %.
export const SKILLS = [
  { name: "Figma", level: 85 },
  { name: "HTML", level: 80 },
  { name: "CSS", level: 75 },
  { name: "JavaScript", level: 72 },
  { name: "React", level: 65 },
  { name: "Next.js", level: 60 },
  { name: "FastAPI", level: 60 },
  { name: "Java", level: 60 },
  { name: "Oracle DB", level: 60 },
  { name: "MySQL", level: 40 },
];

export const METER_LIGHTS = 20;

// Cor das luzes por faixa (g = base, v = confortável, r = domínio, b = limite).
export const METER_BANDS = [
  { upTo: 8, tone: "g" },
  { upTo: 14, tone: "v" },
  { upTo: 18, tone: "r" },
  { upTo: METER_LIGHTS, tone: "b" },
];
