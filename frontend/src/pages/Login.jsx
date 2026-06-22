import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    const endpoint = isRegister ? "/auth/register" : "/auth/login";
    const { data } = await API.post(endpoint, form);

    localStorage.setItem("user", JSON.stringify(data));
    window.dispatchEvent(new Event("authChange"));
    navigate("/");
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <span className="eyebrow">{t("brand")}</span>
        <h1>{isRegister ? t("register") : t("login")}</h1>
        <p>{t("authSubtitle")}</p>

        <form className="form" onSubmit={submitHandler}>
          {isRegister && (
            <label className="field">
              <span>{t("name")}</span>
              <input
                placeholder={t("name")}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>
          )}

          <label className="field">
            <span>{t("email")}</span>
            <input
              placeholder={t("email")}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>

          <label className="field">
            <span>{t("password")}</span>
            <input
              placeholder={t("password")}
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </label>

          <button className="btn btn-primary wide" type="submit">
            {isRegister ? t("register") : t("login")}
          </button>
        </form>

        <button
          className="btn btn-ghost wide"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? t("alreadyHaveAccount") : t("createAccount")}
        </button>
      </section>
    </main>
  );
}

export default Login;
