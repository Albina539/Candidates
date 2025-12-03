// src/pages/__tests__/SkillsMatrix.test.tsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SkillsMatrix from "./pages/SkillsMatrix";

describe("SkillsMatrix Component", () => {
  const mockLocalStorage = window.localStorage as any;

  beforeEach(() => {
    jest.clearAllMocks();

    mockLocalStorage.getItem.mockImplementation((key: string) => {
      if (key === "authState") {
        return JSON.stringify({
          isAuthenticated: true,
          userEmail: "test@example.com",
        });
      }
      if (key === "userRole") {
        return "Frontend junior";
      }
      return null;
    });

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        matrix: [
          {
            id: "1",
            skill: "JavaScript",
            category: "Frontend",
            currentLevel: 3,
            targetLevel: 5,
            description: "Основы языка программирования",
          },
          {
            id: "2",
            skill: "React",
            category: "Frontend",
            currentLevel: 2,
            targetLevel: 5,
            description: "Библиотека для создания пользовательских интерфейсов",
          },
          {
            id: "3",
            skill: "TypeScript",
            category: "Frontend",
            currentLevel: 4,
            targetLevel: 5,
            description: "Статическая типизация для JavaScript",
          },
          {
            id: "4",
            skill: "HTML/CSS",
            category: "Frontend",
            currentLevel: 4,
            targetLevel: 5,
            description: "Верстка и стилизация веб-страниц",
          },
          {
            id: "5",
            skill: "Node.js",
            category: "Backend",
            currentLevel: 2,
            targetLevel: 4,
            description: "Серверная платформа на JavaScript",
          },
        ],
      }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("рендерит заголовок 'Матрица навыков'", async () => {
    render(<SkillsMatrix />);
    expect(screen.getByText("Матрица навыков")).toBeInTheDocument();
  });

  test("отображает 5 строк навыков", async () => {
    render(<SkillsMatrix />);

    await waitFor(() => {
      expect(screen.getByText("React")).toBeInTheDocument();
    });

    const skills = ["JavaScript", "React", "TypeScript", "HTML/CSS", "Node.js"];
    skills.forEach((skill) => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
  });
});
