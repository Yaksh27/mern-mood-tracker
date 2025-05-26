import { useState } from 'react';
import './Auth.css';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '', name: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const endpoint = isLogin ? 'login' : 'signup';

  try {
    const res = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || 'Authentication failed');
      return;
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    window.location.href = '/'; // Redirect to homepage
  } catch (err) {
    alert('Server error. Please try again later.');
  }
};


  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>{isLogin ? 'Welcome Back 🌱' : 'Create Your Account 🌼'}</h1>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="submit-btn">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="toggle-text">
          {isLogin ? (
            <p>
              Don’t have an account?{' '}
              <span onClick={() => setIsLogin(false)}>Sign up</span>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <span onClick={() => setIsLogin(true)}>Log in</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
