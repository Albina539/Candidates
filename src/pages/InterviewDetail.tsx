import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { InterviewDetail } from "../types/interview";
import { AuthState } from "../types/auth";
import "../styles/InterviewDetail.css";

const mockInterviewDetails: InterviewDetail[] = [
  {
    id: "1",
    title: "Frontend Junior Interview",
    date: "2025-01-15",
    status: "завершено",
    totalScore: 85,
    blocks: [
      {
        id: "1",
        name: "JavaScript Basics",
        score: 8,
        maxScore: 10,
        recommendations: [
          "Изучить асинхронные функции более детально",
          "Практиковаться с методами массивов",
          "Разобраться с контекстом this",
        ],
      },
      {
        id: "2",
        name: "React & Hooks",
        score: 9,
        maxScore: 10,
        recommendations: [
          "Изучить оптимизацию ререндеров",
          "Попрактиковаться с кастомными хуками",
          "Разобрать React.memo и useMemo",
        ],
      },
      {
        id: "3",
        name: "HTML/CSS",
        score: 7,
        maxScore: 10,
        recommendations: [
          "Повторить Flexbox и Grid",
          "Изучить современные CSS-методики",
          "Попрактиковаться в адаптивной верстке",
        ],
      },
      {
        id: "4",
        name: "Алгоритмы",
        score: 6,
        maxScore: 10,
        recommendations: [
          "Решать задачи на LeetCode",
          "Изучить основные алгоритмы сортировки",
          "Практиковаться в анализе сложности",
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Technical Screening",
    date: "2025-02-20",
    status: "завершено",
    totalScore: 72,
    blocks: [
      {
        id: "1",
        name: "ООП",
        score: 8,
        maxScore: 10,
        recommendations: [
          "Углубить знания по наследованию и полиморфизму",
          "Изучить паттерны проектирования (Singleton, Factory)",
          "Практиковаться в принципах SOLID",
        ],
      },
      {
        id: "2",
        name: "SQL",
        score: 6,
        maxScore: 10,
        recommendations: [
          "Повторить сложные JOIN операции",
          "Изучить оптимизацию индексов",
          "Попрактиковаться в написании подзапросов",
        ],
      },
      {
        id: "3",
        name: "Алгоритмы",
        score: 7,
        maxScore: 10,
        recommendations: [
          "Улучшить понимание Big O нотации",
          "Практиковаться в рекурсивных алгоритмах",
          "Изучить алгоритмы поиска и сортировки",
        ],
      },
      {
        id: "4",
        name: "Архитектура",
        score: 5,
        maxScore: 10,
        recommendations: [
          "Изучить микросервисную архитектуру",
          "Разобраться с принципами REST API",
          "Понять различия между монолитом и микросервисами",
        ],
      },
    ],
  },
  {
    id: "3",
    title: "HR Interview",
    date: "2025-01-10",
    status: "завершено",
    totalScore: 88,
    blocks: [
      {
        id: "1",
        name: "Коммуникация",
        score: 9,
        maxScore: 10,
        recommendations: [
          "Продолжать развивать навыки презентации",
          "Работать над невербальной коммуникацией",
          "Практиковаться в публичных выступлениях",
        ],
      },
      {
        id: "2",
        name: "Командная работа",
        score: 8,
        maxScore: 10,
        recommendations: [
          "Участвовать в кросс-функциональных проектах",
          "Развивать навыки разрешения конфликтов",
          "Практиковаться в предоставлении конструктивной обратной связи",
        ],
      },
      {
        id: "3",
        name: "Мотивация",
        score: 9,
        maxScore: 10,
        recommendations: [
          "Определить четкие карьерные цели",
          "Разработать план профессионального развития",
          "Найти ментора в желаемой области",
        ],
      },
      {
        id: "4",
        name: "Адаптивность",
        score: 7,
        maxScore: 10,
        recommendations: [
          "Работать над стрессоустойчивостью",
          "Изучить техники тайм-менеджмента",
          "Практиковаться в работе с неопределенностью",
        ],
      },
    ],
  },
  {
    id: "4",
    title: "System Design Interview",
    date: "2025-03-01",
    status: "запланировано",
    totalScore: 0,
    blocks: [
      {
        id: "1",
        name: "Архитектура системы",
        score: 0,
        maxScore: 10,
        recommendations: [],
      },
      {
        id: "2",
        name: "Масштабирование",
        score: 0,
        maxScore: 10,
        recommendations: [],
      },
      {
        id: "3",
        name: "Базы данных и кэширование",
        score: 0,
        maxScore: 10,
        recommendations: [],
      },
      {
        id: "4",
        name: "Безопасность",
        score: 0,
        maxScore: 10,
        recommendations: [],
      },
      {
        id: "5",
        name: "Мониторинг",
        score: 0,
        maxScore: 10,
        recommendations: [],
      },
    ],
  },
];

const InterviewDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const storedAuth = localStorage.getItem("authState");
  const authState: AuthState = storedAuth
    ? JSON.parse(storedAuth)
    : { isAuthenticated: false, userEmail: "" };

  const [interview, setInterview] = useState<InterviewDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInterview = async () => {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 800));

      const foundInterview = mockInterviewDetails.find(
        (item) => item.id === id
      );

      if (foundInterview) {
        setInterview(foundInterview);
      } else {
        navigate("/dashboard");
      }

      setIsLoading(false);
    };

    loadInterview();
  }, [id, navigate]);

  const handleBack = () => {
    navigate("/dashboard");
  };

  const formDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU");
  };

  const calculatePercantage = (score: number, maxScore: number) => {
    return Math.round((score / maxScore) * 100);
  };

  if (isLoading) {
    return (
      <div className="interview-detail-container">
        <div className="loading">Загрузка деталей интервью...</div>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="interview-detail-container">
        <div className="not-found">
          <h2>Интервью не найдено</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="interview-detail-container">
      <div className="left-panel-interview">
        <div className="user-interview">
          <div className="avatar">
            <img src={`${process.env.PUBLIC_URL}/user.png`} alt="avatar" />
          </div>
          <div className="user-greeting-interview">
            <p>Добро пожаловать!</p>
            <span className="user-name-interview">{authState.userEmail}</span>
          </div>
        </div>
        <button onClick={handleBack} className="back-btn-interview">
          Назад к списку
        </button>
      </div>

      <div className="main-content-interview">
        <header className="interview-header">
          <div className="header-info">
            <h1>{interview.title}</h1>
            <div className="interview-meta">
              <span className="date">Дата: {formDate(interview.date)}</span>
              <span className={`status ${interview.status}`}>
                {interview.status}
              </span>
              {interview.totalScore > 0 && (
                <span className="total-score">
                  Итоговый балл: {interview.totalScore}%
                </span>
              )}
            </div>
          </div>
        </header>

        <div className="interview-content">
          <div className="blocks-section">
            <h2>Блок интервью</h2>

            <div className="blocks-grid">
              {interview.blocks.map((block) => (
                <div key={block.id} className="block-card">
                  <div className="block-header">
                    <h3>{block.name}</h3>
                    <div className="block score">
                      <span className="score-value">
                        {block.score}/{block.maxScore}
                      </span>
                      <span className="score-percentage">
                        ({calculatePercantage(block.score, block.maxScore)}%)
                      </span>
                    </div>
                  </div>

                  {block.score > 0 && block.recommendations.length > 0 && (
                    <div className="recommendations">
                      <h4>Рекомендации:</h4>
                      <ul>
                        {block.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {block.score === 0 && (
                    <div className="upcoming">
                      <p>Этот блок будет оценен после проведения интервью</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="summary-section">
            <h2>Итоги</h2>
            <div className="summary-card">
              <div className="summary-item">
                <span className="label">Общий результат:</span>
                <span className="value">{interview.totalScore}%</span>
              </div>
              <div className="summary-item">
                <span className="label">Количество блоков:</span>
                <span className="value">{interview.blocks.length}</span>
              </div>
              <div className="summary-item">
                <span className="label">Статус:</span>
                <span className={`value status ${interview.status}`}>
                  {interview.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewDetails;
