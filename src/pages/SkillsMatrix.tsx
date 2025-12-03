import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthState } from "../types/auth";
import { SkillsMatrixItem } from "../types/skills";
import "../styles/SkillMatrix.css";

const SkillsMatrix: React.FC = () => {
  const storedAuth = localStorage.getItem("authState");
  const authState: AuthState = storedAuth
    ? JSON.parse(storedAuth)
    : { isAuthenticated: false, userEmail: "" };

  const navigate = useNavigate();

  const [skills, setSkills] = useState<SkillsMatrixItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Все");

  useEffect(() => {
    const fetchSkillsMatrix = async () => {
      setIsLoading(true);
      setError(null);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await fetch(
          process.env.PUBLIC_URL + "/api/skills-matrix.json"
        );

        if (!response.ok) {
          throw new Error("Не удалось загрузить данные");
        }

        const data = await response.json();
        setSkills(data.matrix);
      } catch (error) {
        console.error("Ошибка загрузки матрицы навыков: ", error);
        setError("Произошла ошибка при загрузке данных");

        const fallbackData: SkillsMatrixItem[] = [
          {
            id: "1",
            skill: "JavaScript",
            category: "Frontend",
            currentLevel: 3,
            targetLevel: 5,
            description: "Основы языка, работа с DOM",
          },
          {
            id: "2",
            skill: "React",
            category: "Frontend",
            currentLevel: 2,
            targetLevel: 5,
            description: "Компоненты, хуки, состояние",
          },
        ];
        setSkills(fallbackData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkillsMatrix();
  }, []);

  const calculateGap = (current: number, target: number): number => {
    return target - current;
  };

  const getGapClassName = (gap: number): string => {
    if (gap >= 2) return "gap-critical";
    return "gap-low";
  };

  const getLevelDescription = (level: number): string => {
    const descriptions = [
      "Нет опыта",
      "Начальный",
      "Базовый",
      "Средний",
      "Продвинутый",
      "Эксперт",
    ];
    return descriptions[level] || `Уровень ${level}`;
  };

  const handleLogout = () => {
    localStorage.removeItem("authState");
    navigate("/login");
  };

  const categories = [
    "Все",
    ...Array.from(new Set(skills.map((skill) => skill.category))),
  ];

  const filteredSkills =
    selectedCategory === "Все"
      ? skills
      : skills.filter((skill) => skill.category === selectedCategory);

  return (
    <div className="skills-matrix-container">
      <div className="left-panel-skills">
        <div className="user-skills">
          <div className="avatar-skills">
            <img src={`${process.env.PUBLIC_URL}/user.png`} alt="avatar" />
          </div>
          <div className="user-greeting-skills">
            <p>Добро пожаловать!</p>
            <span className="user-name-skills">{authState.userEmail}</span>
          </div>
        </div>

        <nav className="left-panel-nav-skills">
          <Link to="/dashboard" className="nav-item-skills">
            Dashboard
          </Link>
          <Link to="/skills-matrix" className="nav-item-skills active">
            Матрица навыков
          </Link>
        </nav>

        <button onClick={handleLogout} className="logout-btn-skills">
          Выйти
        </button>
      </div>

      <div className="main-content-skills">
        <header className="matrix-header">
          <h1>Матрица навыков</h1>
        </header>
        <div className="matrix-content">
          <div className="controls-section-skills">
            <div className="category-filter">
              <label htmlFor="category-select">Категория:</label>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="category-select"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {isLoading ? (
              <div className="loading">Загрузка матрицы навыков...</div>
            ) : error ? (
              <div className="error-message">
                <p>{error}</p>
                <p>Используются демо-дфнные</p>
              </div>
            ) : (
              <div className="matrix-table">
                <table>
                  <thead>
                    <tr>
                      <th className="th-skills">Навык</th>
                      <th className="th-skills">Категория</th>
                      <th className="th-skills">Текущий уровень</th>
                      <th className="th-skills">Целевой уровень</th>
                      <th className="th-skills">Описание</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSkills.map((skill) => {
                      const gap = calculateGap(
                        skill.currentLevel,
                        skill.targetLevel
                      );
                      const gapClass = getGapClassName(gap);

                      return (
                        <tr key={skill.id} className={gapClass}>
                          <td className="skill-name td-skills">
                            {skill.skill}
                          </td>
                          <td className="skill-category td-skills">
                            {skill.category}
                          </td>
                          <td className="td-skills">
                            <div className="level-info">
                              <span className="level-number">
                                {skill.currentLevel}
                              </span>
                              <span className="level-description">
                                {getLevelDescription(skill.currentLevel)}
                              </span>
                            </div>
                          </td>
                          <td className="td-skills">
                            <div className="level-info">
                              <span className="level-number">
                                {skill.targetLevel}
                              </span>
                              <span className="level-description">
                                {getLevelDescription(skill.targetLevel)}
                              </span>
                            </div>
                          </td>
                          <td className="skill-description td-skills">
                            {skill.description}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {filteredSkills.length === 0 && (
                  <div className="no-data">
                    Нет навыков в выбранной категории
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsMatrix;
