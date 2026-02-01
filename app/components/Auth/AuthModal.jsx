"use client"

import { useState } from "react"
import { mockLogin, mockRegister } from "@/lib/AuthApi"

const AuthModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState("login")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({})

  if (!isOpen) return null

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (mode === "login") {
        await mockLogin(form)
      } else {
        if (form.password !== form.password_confirmation) {
          throw { message: "Passwords do not match" }
        }
        await mockRegister(form)
      }
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
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
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {mode === "login"
              ? "Login to continue ordering medicines"
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
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
            {error}
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

          <input
            name="password"
            type="password"
            placeholder="Password"
            className={inputClass}
            onChange={handleChange}
            required
          />

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

          <button
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-[#1d81b3] py-3 text-sm font-medium text-white transition hover:bg-[#166a94] disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
                ? "Login"
                : "Create account"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AuthModal
