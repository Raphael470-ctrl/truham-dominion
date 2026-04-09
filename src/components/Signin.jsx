import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaUser, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa'


const Signin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const data = new FormData()
      data.append("email", email.trim())
      data.append("password", password)

      const response = await axios.post(
        "https://raphaeltruham.alwaysdata.net/api/signin", 
        data,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )

      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user))
        navigate('/')
      } else {
        setError(response.data.message || "Login failed")
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Network error. Please try again."
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signin-page">
      <div className="signin-container">
        <div className="glass-card">
          {/* Header with Icon */}
          <div className="card-header">
            <div className="header-icon">
              <FaUser className="main-icon" />
            </div>
            <h2 className="card-title">Welcome Back</h2>
            <p className="card-subtitle">Sign in to continue to your account</p>
          </div>

          <form onSubmit={submit} className="signin-form">
            {error && (
              <div className="error-alert">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            {/* Email Input */}
            <div className="input-group">
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  id="email"
                  type="email"
                  className="form-input form-fill"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="input-group">
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="form-input form-fill"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button 
              className="submit-btn"
              type="submit"
              disabled={loading || !email || !password}
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>

            <div className="form-footer">
              <p>
                Don't have an account?{' '}
                <Link to="/signup" className="signup-link">
                  Create one
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signin