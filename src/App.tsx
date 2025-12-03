import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./components/Routes";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import DashboardPage from "./pages/Dashboard";
import InterviewDetails from "./pages/InterviewDetail";
import SkillsMatrix from "./pages/SkillsMatrix";
import "../src/styles/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/skills-matrix"
            element={
              <ProtectedRoute>
                <SkillsMatrix />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route
            path="/interviews/:id"
            element={
              <ProtectedRoute>
                <InterviewDetails />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
