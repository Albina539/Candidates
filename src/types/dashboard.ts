export interface Interview {
  id: string;
  date: string;
  title: string;
  status: "запланировано" | "завершено";
  score?: number;
}

export interface UserRole {
  id: string;
  name: string;
}
