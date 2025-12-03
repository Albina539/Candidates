import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { UserLogin, AuthState } from "../types/auth";
import "../styles/AuthPages.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserLogin>({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem("authState");
    if (storedAuth) {
      const authState: AuthState = JSON.parse(storedAuth);
      if (authState.isAuthenticated) {
        navigate("/dashboard");
      }
    }
  }, [navigate]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    if (!formData.email) {
      alert("Email обязателен для заполнения");
      return false;
    } else if (!validateEmail(formData.email)) {
      alert("Введите корректный email адрес");
      return false;
    }

    if (!formData.password) {
      alert("Пароль обязателен для заполнения");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const storedUser = localStorage.getItem("registeredUser");

      if (!storedUser) {
        alert("Пользователь не зарегистрирован");
        return;
      }

      const registeredUser = JSON.parse(storedUser);

      if (registeredUser.email !== formData.email) {
        alert("Пользователь не зарегистрирован");
        return;
      }

      const authState: AuthState = {
        isAuthenticated: true,
        userEmail: formData.email,
      };

      localStorage.setItem("authState", JSON.stringify(authState));
      console.log("Вход успешен:", authState);
      navigate("/dashboard");
    } catch (error) {
      console.error("Ошибка входа:", error);
      alert("Произошла ошибка при входе");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof UserLogin) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Вход в аккаунт</h1>
        <p className="form-subtitle">Войдите в свой аккаунт</p>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            value={formData.email}
            onChange={(value) => handleInputChange("email")(value)}
            placeholder="Введите ваш email"
            required
          />

          <InputField
            label="Пароль"
            type="password"
            value={formData.password}
            onChange={(value) => handleInputChange("password")(value)}
            placeholder="Введите ваш пароль"
            required
          />

          <button
            type="submit"
            className={`submit-button ${isSubmitting ? "submitting" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="button-spinner"></span>
                Вход
              </>
            ) : (
              "Войти"
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
