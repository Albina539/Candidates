export interface SkillsMatrixItem {
  id: string;
  skill: string;
  category: string;
  currentLevel: number;
  targetLevel: number;
  description: string;
}

export interface SkillsMatrixResponse {
  matrix: SkillsMatrixItem[];
  lastUpdated: string;
}
