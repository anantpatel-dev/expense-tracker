import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function HomePage() {
  return (
    <div>

      <header className="header">

        <h2>Expense Tracker</h2>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/user/101">User</Link>
        </nav>

      </header>


      <div className="hero">

        <div className="hero-text">

          <h1>Track Your Money</h1>

          <p>
            Manage your daily expenses and keep your spending
            organized in one place.
          </p>

          <Link className="button" to="/user/101">
            Go to User Page
          </Link>

        </div>

      </div>


      <div className="features">

        <h2>What You Can Do</h2>

        <div className="feature-container">

          <div className="feature-box">
            <h3>Track Expenses</h3>

            <p>
              Keep a record of your daily expenses
              and know where your money goes.
            </p>
          </div>


          <div className="feature-box">
            <h3>Manage Spending</h3>

            <p>
              Organize your spending and maintain
              better control over your money.
            </p>
          </div>


          <div className="feature-box">
            <h3>Save Money</h3>

            <p>
              Understand your spending habits and
              plan your expenses better.
            </p>
          </div>

        </div>

      </div>


      <div className="about">

        <h2>Why Expense Tracker?</h2>

        <p>
          Expense Tracker is a simple application that helps
          users keep track of their daily spending. It provides
          an easy way to organize expenses and manage money.
        </p>

      </div>


      <footer>
        <p>Expense Tracker | React.js Practical</p>
      </footer>

    </div>
  );
}

export default HomePage;