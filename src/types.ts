export interface EducationalConcept {
  id: string;
  title: string;
  content: string;
}

export interface PlanetQuest {
  question: string;
  options: string[];
  correctOptionIndex: number;
}

export interface PlanetLevel {
  id: number;
  name: string;
  englishName: string;
  icon: string;
  colorPalette: {
    primary: string;
    accent: string;
  };
  threeConcepts: EducationalConcept[];
  finalQuest: PlanetQuest | null;
}
