"use client"

import { useState } from "react"
import { useLoginMutation, useRegisterMutation } from "@/lib/redux/services/authApi"

const AuthModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState("login")

  // RTK Query Hooks
  const [login, { isLoading: isLoginLoading, error: loginError }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading, error: registerError }] = useRegisterMutation();

  // Combine loading and error states for UI
  const isLoading = isLoginLoading || isRegisterLoading;
  // RTK Query errors can be objects, so we need to parse them
  const apiError = loginError || registerError;
  const errorMessage = apiError
    ? (() => {
      const validationErrors = apiError.data?.errors;
      if (validationErrors && typeof validationErrors === "object") {
        return Object.values(validationErrors).flat().join(" ");
      }
      return apiError.data?.message || apiError.message || "An unexpected error occurred";
    })()
    : "";

  const [localError, setLocalError] = useState("")
  const [form, setForm] = useState({})

  if (!isOpen) return null

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError("")

    const ensureCsrfCookie = async () => {
      try {
        await fetch("/api/proxy/sanctum/csrf-cookie", {
          credentials: "include",
        });
      } catch (error) {
        console.warn("Failed to fetch CSRF cookie", error);
      }
    };

    try {
      if (mode === "login") {
        await ensureCsrfCookie();
        const result = await login({
          email: form.email,
          password: form.password
        }).unwrap();

        // On success, close modal. State is updated via matchers in userSlice
        if (result.success !== false) {
          onClose();
        }

      } else if (mode === "forgot") {
        // Mock sending reset link - typically would be another mutation
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert("Reset link sent to your email!");
        setMode("login");
        return;
      } else {
        await ensureCsrfCookie();
        if (form.password !== form.password_confirmation) {
          setLocalError("Passwords do not match")
          return
        }

        // Split full name
        const fullName = form.full_name || form.name || "";
        const nameParts = fullName.trim().split(/\s+/);
        const firstName = nameParts[0];
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : firstName;

        const registerData = {
          ...form,
          first_name: firstName,
          last_name: lastName,
          // Ensure we send what API expects
          full_name: fullName
        }
        console.log("rgister data",registerData)

        const result = await register(registerData).unwrap();

        if (result.success !== false) {
       
          if (result.token) {
            onClose();
          } else {
            alert("Registration successful! Please login.");
            setMode('login');
          }
        }
      }
    } catch (err) {
  
      console.error("Auth failed:", err);

      if (!apiError) {
        setLocalError(err.message || "Operation failed");
      }
    }
  }

  const inputClass =
    "w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-[#1d81b3] focus:outline-none focus:ring-1 focus:ring-[#1d81b3]"

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white px-6 py-7 shadow-2xl"
      >
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            {mode === "login" ? "Welcome Back" : mode === "forgot" ? "Reset Password" : "Create Account"}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {mode === "login"
              ? "Login to continue ordering medicines"
              : mode === "forgot"
                ? "Enter your email to receive a reset link"
                : "Register to buy medicines safely online"}
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => setMode("login")}
            className={`w-1/2 rounded-md py-2 text-sm font-medium transition cursor-pointer ${mode === "login"
              ? "bg-white text-[#1d81b3] shadow"
              : "text-gray-500"
              }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode("register")}
            className={`w-1/2 rounded-md py-2 text-sm font-medium transition cursor-pointer ${mode === "register"
              ? "bg-white text-[#1d81b3] shadow"
              : "text-gray-500"
              }`}
          >
            Register
          </button>
        </div>

        {/* Error */}
        {(localError || errorMessage) && (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
            {localError || errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <>
              <input
                name="name"
                placeholder="Full name"
                className={inputClass}
                onChange={handleChange}
                required
              />
              <input
                name="phone"
                placeholder="Phone number"
                className={inputClass}
                onChange={handleChange}
                required
              />
            </>
          )}

          <input
            name="email"
            type="email"
            placeholder="Email address"
            className={inputClass}
            onChange={handleChange}
            required
          />

          {mode !== "forgot" && (
            <input
              name="password"
              type="password"
              placeholder="Password"
              className={inputClass}
              onChange={handleChange}
              required
            />
          )}

          {mode === "register" && (
            <input
              name="password_confirmation"
              type="password"
              placeholder="Confirm password"
              className={inputClass}
              onChange={handleChange}
              required
            />
          )}

          {mode === "login" && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setMode("forgot")}
                className="text-xs font-semibold text-[#1d81b3] hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          {mode === "forgot" ? (
            <button
              disabled={isLoading}
              className="mt-2 w-full rounded-lg bg-[#1d81b3] py-3 text-sm font-medium text-white transition hover:bg-[#166a94] disabled:opacity-60"
            >
              {isLoading ? "Please wait..." : "Send Reset Link"}
            </button>
          ) : (
            <button
              disabled={isLoading}
              className="mt-2 w-full rounded-lg bg-[#1d81b3] py-3 text-sm font-medium text-white transition hover:bg-[#166a94] disabled:opacity-60"
            >
              {isLoading
                ? "Please wait..."
                : mode === "login"
                  ? "Login"
                  : "Create account"}
            </button>
          )}
        </form>

        {mode === "forgot" && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setMode("login")}
              className="text-sm font-medium text-gray-500 hover:text-[#1d81b3] transition"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AuthModal
