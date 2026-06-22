import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

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

    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{isRegister ? "Register" : "Login"}</h2>

      <form onSubmit={submitHandler}>
        {isRegister && (
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        )}

        <br />
        <br />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <br />
        <br />

        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <br />
        <br />

        <button type="submit">
          {isRegister ? "Register" : "Login"}
        </button>
      </form>

      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Already have account? Login" : "Create new account"}
      </button>
    </div>
  );
}

export default Login;