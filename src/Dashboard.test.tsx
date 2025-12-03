// src/Dashboard.test.tsx - упрощенный вариант
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Простой мок localStorage
const mockLocalStorage = {
  store: {} as Record<string, string>,
  getItem: function (key: string) {
    return this.store[key] || null;
  },
  setItem: function (key: string, value: string) {
    this.store[key] = value;
  },
  removeItem: function (key: string) {
    delete this.store[key];
  },
  clear: function () {
    this.store = {};
  },
};

// Настраиваем перед тестами
beforeAll(() => {
  // Сохраняем оригинальный localStorage
  (global as any).originalLocalStorage = window.localStorage;

  // Заменяем на наш мок
  Object.defineProperty(window, "localStorage", {
    value: mockLocalStorage,
    writable: true,
  });

  // Настраиваем тестовые данные
  mockLocalStorage.setItem(
    "authState",
    JSON.stringify({
      isAuthenticated: true,
      userEmail: "test@example.com",
    })
  );
  mockLocalStorage.setItem("userRole", "Frontend junior");
});

// Восстанавливаем после тестов
afterAll(() => {
  Object.defineProperty(window, "localStorage", {
    value: (global as any).originalLocalStorage,
    writable: true,
  });
});

// Функция для ожидания без использования waitFor
const waitForLoad = async (ms = 100) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};

// Импортируем после настройки моков
import Dashboard from "./pages/Dashboard";

describe("Dashboard Component - Basic Tests", () => {
  test("Компонент рендерится без ошибок", async () => {
    // Просто проверяем что можем отрендерить
    expect(() => {
      render(<Dashboard />);
    }).not.toThrow();
  });

  test("Содержит основные текстовые элементы", async () => {
    render(<Dashboard />);

    // Даем время на начальный рендер
    await waitForLoad(50);

    // Проверяем наличие основных текстов
    const dashboardElements = screen.getAllByText(/dashboard/i);
    expect(dashboardElements.length).toBeGreaterThan(0);

    expect(screen.getByText(/добро пожаловать/i)).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  test("Содержит навигационные элементы", async () => {
    render(<Dashboard />);
    await waitForLoad(50);

    expect(screen.getByText("Матрица навыков")).toBeInTheDocument();
    expect(screen.getByText("Выйти")).toBeInTheDocument();
  });

  test("Содержит элементы управления", async () => {
    render(<Dashboard />);
    await waitForLoad(50);

    // Проверяем элементы формы
    expect(screen.getByText("Моя роль")).toBeInTheDocument();
    expect(screen.getByText("Сохранить")).toBeInTheDocument();
    expect(screen.getByText("Мои интервью")).toBeInTheDocument();
  });
});

// Минимальный тест для проверки что все работает
describe("Dashboard - Smoke Test", () => {
  test("Минимальная проверка рендеринга", () => {
    // Очищаем localStorage для чистого теста
    mockLocalStorage.clear();
    mockLocalStorage.setItem(
      "authState",
      JSON.stringify({
        isAuthenticated: true,
        userEmail: "user@test.com",
      })
    );

    render(<Dashboard />);

    // Простейшие проверки
    const hasDashboardText = screen.queryAllByText(/dashboard/i).length > 0;
    expect(hasDashboardText).toBe(true);

    const hasWelcomeText = screen.queryByText(/добро пожаловать/i) !== null;
    expect(hasWelcomeText).toBe(true);
  });
});
