import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function RegisterPage() {

  function checkForm(event) {
    event.preventDefault();

    var name = event.target.elements.name.value;
    var email = event.target.elements.email.value;
    var password = event.target.elements.password.value;
    var confirmPassword = event.target.elements.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match.");
      return;
    }

    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        alert(data.message);
      })
      .catch(function(error) {
        alert("Unable to connect to server.");
        console.log(error);
      });
  }

  return (
    <div>
      <header className="header">
        <h2>Expense Tracker</h2>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/user/101">User</Link>
        </nav>
      </header>

      <div className="register-page">
        <div className="register-card">

          <Link className="back-button" to="/user/101">
            ← Back
          </Link>

          <h1>Create Account</h1>

          <p>
            Register to start tracking your expenses
          </p>

          <form onSubmit={checkForm}>

            <label>Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
            />

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              pattern="(?=.*[A-Z])(?=.*[0-9]).{8,}"
              title="Password must contain at least 8 characters, one capital letter and one number"
              required
            />

            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              required
            />

            <button type="submit">
              Register
            </button>

          </form>

          <p className="login-text">
            Already have an account?
          </p>

          <Link className="back-link" to="/user/101">
            Go to Login
          </Link>

        </div>
      </div>

      <footer>
        <p>Expense Tracker | React.js Practical</p>
      </footer>
    </div>
  );
}

export default RegisterPage;