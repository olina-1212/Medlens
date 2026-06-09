import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

export default function Auth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please fill all fields.");
      return;
    }

    if (!isLogin) {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      if (password.length < 6) {
        setError(
          "Password must be at least 6 characters."
        );
        return;
      }
    }

    try {
      setLoading(true);

      if (isLogin) {
        const res = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email,
            password,
          }
        );

        localStorage.setItem(
          "token",
          res.data.token
        );

        navigate("/");
      } else {
        await axios.post(
          "http://localhost:5000/api/auth/register",
          {
            email,
            password,
          }
        );

        setIsLogin(true);

        setPassword("");
        setConfirmPassword("");

        alert(
          "Account created successfully. Please login."
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700">
            MedLens
          </h1>

          <p className="text-gray-500 mt-2">
            AI Prescription Assistant
          </p>
        </div>

        <div className="flex mb-6 rounded-xl overflow-hidden border">

          <button
            onClick={() => {
              setIsLogin(true);
              setError("");
            }}
            className={`flex-1 py-3 font-medium ${
              isLogin
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => {
              setIsLogin(false);
              setError("");
            }}
            className={`flex-1 py-3 font-medium ${
              !isLogin
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            Register
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />

            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-xl pl-10 p-3"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />

            <input
              type={
                showPassword ? "text" : "password"
              }
              placeholder="Password"
              className="w-full border rounded-xl pl-10 pr-10 p-3"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-3 top-3"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border rounded-xl p-3"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
            />
          )}

          {error && (
            <div className="bg-red-100 text-red-600 rounded-xl p-3 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold"
          >
            {loading ? (
              <span className="flex justify-center items-center gap-2">
                <Loader2 className="animate-spin h-4 w-4" />
                Please wait...
              </span>
            ) : isLogin ? (
              "Login"
            ) : (
              "Create Account"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}