import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function SubscriptionPage(props) {

  function makePayment() {

    fetch("http://localhost:5000/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: 99
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(order) {

        var script = document.createElement("script");

        script.src = "https://checkout.razorpay.com/v1/checkout.js";

        script.onload = function() {

          var options = {

            key: "rzp_test_TgJOOo88BibS5n",

            amount: order.amount,

            currency: "INR",

            name: "Expense Tracker",

            description: "Monthly Subscription",

            order_id: order.id,

            handler: function(response) {

              alert("Payment Successful!");

              props.history.push({
                pathname: "/dashboard",
                state: {
                  email: props.location.state.email
                }
              });

            },

            theme: {
              color: "#2563eb"
            }

          };

          var razorpay = new window.Razorpay(options);

          razorpay.open();

        };

        script.onerror = function() {

          alert("Razorpay checkout could not be loaded.");

        };

        document.body.appendChild(script);

      })
      .catch(function(error) {

        console.log(error);

        alert("Unable to create payment order.");

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

          <h1>Premium Subscription</h1>

          <p>
            Subscribe to Expense Tracker and manage your expenses easily.
          </p>

          <h2>₹99 / Month</h2>

          <p>✓ Track your expenses</p>

          <p>✓ Manage your spending</p>

          <p>✓ View your expense records</p>

          <button onClick={makePayment}>
            Pay ₹99
          </button>

          <br />
          <br />

          <Link className="back-link" to="/user/101">
            Back to Login
          </Link>

        </div>

      </div>


      <footer>
        <p>Expense Tracker | Razorpay Test Payment</p>
      </footer>

    </div>
  );
}

export default SubscriptionPage;