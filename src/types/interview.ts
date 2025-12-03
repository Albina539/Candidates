export interface InterviewDetail {
  id: string;
  title: string;
  date: string;
  status: "запланировано" | "завершено";
  totalScore: number;
  blocks: InterviewBlock[];
}

export interface InterviewBlock {
  id: string;
  name: string;
  score: number;
  maxScore: number;
  recommendations: string[];
}
