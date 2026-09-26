import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function UserPage(props) {

  function checkLogin(event) {

    event.preventDefault();

    var email = event.target.elements.email.value;
    var password = event.target.elements.password.value;

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {

        alert(data.message);

        if (data.message === "Login successful") {

          console.log("Welcome " + data.name);

          props.history.push({
            pathname: "/subscription",
            state: {
              email: email
            }
          });

        }

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


      <div className="user-page">

        <div className="login-card">

          <h1>User Login</h1>

          <p>Login to manage your expenses</p>

          <form onSubmit={checkLogin}>

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
              required
            />


            <button type="submit">
              Login
            </button>

          </form>


          <p className="login-text">
            Don't have an account?
          </p>

          <Link className="register-link" to="/register">
            Register
          </Link>


          <Link className="back-link" to="/">
            Back to Home
          </Link>

        </div>

      </div>


      <footer>
        <p>Expense Tracker | React.js Practical</p>
      </footer>

    </div>
  );
}

export default UserPage;