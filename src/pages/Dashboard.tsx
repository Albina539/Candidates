import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthState } from "../types/auth";
import { Interview, UserRole } from "../types/dashboard";
import "../styles/Dashboard.css";

const Roles: UserRole[] = [
  { id: "1", name: "NET junior" },
  { id: "2", name: "Frontend junior" },
  { id: "3", name: "QA junior" },
  { id: "4", name: "Backend junior" },
  { id: "5", name: "Fullstack junior" },
];

const mockInterviews: Interview[] = [
  {
    id: "1",
    date: "2025-01-15",
    title: "Frontend Junior Interview",
    status: "завершено",
    score: 85,
  },
  {
    id: "2",
    date: "2025-02-20",
    title: "Technical Screening",
    status: "завершено",
    score: 72,
  },
  {
    id: "3",
    date: "2025-01-10",
    title: "HR Interview",
    status: "завершено",
    score: 88,
  },
  {
    id: "4",
    date: "2025-03-01",
    title: "System Design Interview",
    status: "запланировано",
  },
];

const Dashboard: React.FC = () => {
  const storedAuth = localStorage.getItem("authState");
  const authState: AuthState = storedAuth
    ? JSON.parse(storedAuth)
    : { isAuthenticated: false, userEmail: "" };

  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState<string>("");
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) {
      setSelectedRole(savedRole);
    }

    const loadInterviews = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setInterviews(mockInterviews);
      setIsLoading(false);
    };

    loadInterviews();
  }, []);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value);
  };

  const handleSaveRole = () => {
    localStorage.setItem("userRole", selectedRole);
    alert("Роль успешно сохранена");
  };

  const handleLogout = () => {
    localStorage.removeItem("authState");
    navigate("/login");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU");
  };

  return (
    <div className="dashboard-container">
      <div className="left-panel">
        <div className="user">
          <div className="avatar">
            <img src={`${process.env.PUBLIC_URL}/user.png`} alt="avatar" />
          </div>
          <div className="user-greeting">
            <p>Добро пожаловать!</p>
            <span className="user-name">{authState.userEmail}</span>
          </div>
        </div>

        <nav className="left-panel-nav">
          <Link to="/dashboard" className="nav-item active">
            Dashboard
          </Link>
          <Link to="/skills-matrix" className="nav-item">
            Матрица навыков
          </Link>
        </nav>

        <button onClick={handleLogout} className="logout-btn">
          Выйти
        </button>
      </div>

      <div className="main-content">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
        </header>

        <div className="dashboard-content">
          <div className="role-section">
            <h2>Моя роль</h2>
            <div className="role-selector">
              <select
                value={selectedRole}
                onChange={handleRoleChange}
                className="role-dropdown"
              >
                <option value="">Выберите роль</option>
                {Roles.map((role) => (
                  <option key={role.id} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </select>

              <button
                onClick={handleSaveRole}
                className="save-role-btn"
                disabled={!selectedRole}
              >
                Сохранить
              </button>
            </div>
          </div>

          <div className="interviews-section">
            <h2>Мои интервью</h2>
            {isLoading ? (
              <div className="loading">Загрузка...</div>
            ) : (
              <div className="interview-table">
                <table>
                  <thead>
                    <tr>
                      <th className="th-dashboard">Дата</th>
                      <th className="th-dashboard">Название</th>
                      <th className="th-dashboard">Статус</th>
                      <th className="th-dashboard">Итоговый балл</th>
                    </tr>
                  </thead>

                  <tbody>
                    {interviews.map((interview) => (
                      <tr
                        key={interview.id}
                        className="interview-row"
                        onClick={() => navigate(`/interviews/${interview.id}`)}
                        style={{ cursor: "pointer" }}
                      >
                        <td className="td-dashboard">
                          {formatDate(interview.date)}
                        </td>
                        <td className="td-dashboard">{interview.title}</td>
                        <td className="td-dashboard">
                          <span className={`status ${interview.status}`}>
                            {interview.status}
                          </span>
                        </td>
                        <td className="td-dashboard">
                          {interview.score ? `${interview.score}` : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {interviews.length === 0 && (
                  <div className="no-interviews">
                    Нет запланированных интервью
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

export default Dashboard;
