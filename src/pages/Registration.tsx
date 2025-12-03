import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { UserRegistration, AuthState } from "../types/auth";
import "../styles/AuthPages.css";

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserRegistration>({
    email: "",
    password: "",
    confirmPassword: "",
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

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const validateForm = (): boolean => {
    if (!formData.email) {
      alert("Email обязателен для заполнения");
      return false;
    } else if (!validateEmail(formData.email)) {
      alert("Введите корректный Email");
      return false;
    }

    if (!formData.password) {
      alert("Пароль обязателен для заполнения");
      return false;
    } else if (!validatePassword(formData.password)) {
      alert("Пароль должен состоять минимум из 8 символов");
      return false;
    }

    if (!formData.confirmPassword) {
      alert("Подтвердите пароль");
      return false;
    } else if (formData.password !== formData.confirmPassword) {
      alert("Пароли не совпадают");
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

      const registeredUser = {
        email: formData.email,
        registeredAt: new Date().toISOString(),
      };

      localStorage.setItem("registeredUser", JSON.stringify(registeredUser));

      const authState: AuthState = {
        isAuthenticated: true,
        userEmail: formData.email,
      };

      localStorage.setItem("authState", JSON.stringify(authState));

      console.log("Регистрация прошла успешно: ", authState);
      navigate("/dashboard");
    } catch (error) {
      console.error("Ошибка при регистрации: ", error);
      alert("Произошла ошибка при регистрации. Попробуйте еще раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange =
    (field: keyof UserRegistration) => (value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Регистрация</h1>
        <p className="form-subtitle">Создайте аккаунт</p>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            value={formData.email}
            onChange={(value) => handleInputChange("email")(value)}
            placeholder="Введите email"
            required
          />

          <InputField
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleInputChange("password")}
            placeholder="Введите пароль"
            required
          />

          <InputField
            label="Your password again"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange("confirmPassword")}
            placeholder="Введите пароль еще раз"
            required
          />

          <button
            type="submit"
            className={"submit-button"}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="button-spinner"></span>
                Регистрация
              </>
            ) : (
              "Зарегистрироваться"
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Уже есть аккаунт? <Link to="/login">Войти</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
