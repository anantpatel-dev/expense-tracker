import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function DashboardPage(props) {

  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [expenses, setExpenses] = useState([]);

  const [editId, setEditId] = useState("");

  var email = props.location.state.email;

  function loadExpenses() {

    fetch("http://localhost:5000/expenses/" + email)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        setExpenses(data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  React.useEffect(function() {
    loadExpenses();
  }, []);


  // Add Expense
  function addExpense(event) {

    event.preventDefault();

    if (expenseName === "" || amount === "") {
      alert("Please enter expense name and amount.");
      return;
    }

    fetch("http://localhost:5000/add-expense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userEmail: email,
        name: expenseName,
        amount: Number(amount),
        category: category
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {

        alert(data.message);

        setExpenseName("");
        setAmount("");
        setCategory("Food");

        loadExpenses();

      })
      .catch(function(error) {

        console.log(error);
        alert("Unable to save expense.");

      });
  }


  // Start Editing
  function startEdit(expense) {

    setEditId(expense._id);
    setExpenseName(expense.name);
    setAmount(expense.amount);
    setCategory(expense.category);

  }


  // Update Expense
  function updateExpense(event) {

    event.preventDefault();

    if (expenseName === "" || amount === "") {
      alert("Please enter expense name and amount.");
      return;
    }

    fetch("http://localhost:5000/update-expense/" + editId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: expenseName,
        amount: Number(amount),
        category: category
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {

        alert(data.message);

        setEditId("");
        setExpenseName("");
        setAmount("");
        setCategory("Food");

        loadExpenses();

      })
      .catch(function(error) {

        console.log(error);
        alert("Unable to update expense.");

      });
  }


  // Delete Expense
  function deleteExpense(id) {

    if (!window.confirm("Are you sure you want to delete this expense?")) {
      return;
    }

    fetch("http://localhost:5000/delete-expense/" + id, {
      method: "DELETE"
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {

        alert(data.message);

        loadExpenses();

      })
      .catch(function(error) {

        console.log(error);
        alert("Unable to delete expense.");

      });
  }


  var totalExpenses = expenses.reduce(function(total, expense) {
    return total + Number(expense.amount);
  }, 0);


  return (
    <div className="dashboard">

      <header className="dashboard-header">

        <h2>Expense Tracker</h2>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/user/101">Logout</Link>
        </nav>

      </header>


      <main className="dashboard-container">

        <div className="dashboard-welcome">

          <div>
            <h1>Welcome Back 👋</h1>

            <p>
              Manage your expenses and keep track of your spending.
            </p>
          </div>

          <div className="subscription-status">
            ✓ Subscription Active
          </div>

        </div>


        {/* Summary */}

        <div className="summary-cards">

          <div className="summary-card">
            <p>Total Expenses</p>
            <h2>₹{totalExpenses}</h2>
          </div>

          <div className="summary-card">
            <p>Number of Expenses</p>
            <h2>{expenses.length}</h2>
          </div>

          <div className="summary-card">
            <p>Monthly Spending</p>
            <h2>₹{totalExpenses}</h2>
          </div>

        </div>


        {/* Add / Edit Expense */}

        <div className="dashboard-section">

          <h2>
            {editId ? "Edit Expense" : "Add New Expense"}
          </h2>

          <form
            className="expense-form"
            onSubmit={editId ? updateExpense : addExpense}
          >

            <div className="form-group">

              <label>Expense Name</label>

              <input
                type="text"
                placeholder="e.g. Lunch"
                value={expenseName}
                onChange={function(event) {
                  setExpenseName(event.target.value);
                }}
              />

            </div>


            <div className="form-group">

              <label>Amount</label>

              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={function(event) {
                  setAmount(event.target.value);
                }}
              />

            </div>


            <div className="form-group">

              <label>Category</label>

              <select
                value={category}
                onChange={function(event) {
                  setCategory(event.target.value);
                }}
              >

                <option>Food</option>
                <option>Travel</option>
                <option>Shopping</option>
                <option>Entertainment</option>
                <option>Bills</option>
                <option>Other</option>

              </select>

            </div>


            <button
              className="add-expense-button"
              type="submit"
            >
              {editId ? "Update Expense" : "+ Add Expense"}
            </button>

          </form>


          {editId && (

            <button
              className="cancel-edit-button"
              onClick={function() {

                setEditId("");
                setExpenseName("");
                setAmount("");
                setCategory("Food");

              }}
            >
              Cancel Edit
            </button>

          )}

        </div>


        {/* Recent Expenses */}

        <div className="dashboard-section">

          <div className="section-heading">

            <h2>Recent Expenses</h2>

            <p>Your saved expenses</p>

          </div>


          {expenses.length === 0 ? (

            <div className="no-expenses">

              <h3>No expenses yet</h3>

              <p>
                Add your first expense using the form above.
              </p>

            </div>

          ) : (

            <div className="expense-list">

              {expenses.map(function(expense) {

                return (

                  <div
                    className="expense-item"
                    key={expense._id}
                  >

                    <div className="expense-info">

                      <div className="expense-icon">
                        ₹
                      </div>

                      <div>

                        <h3>{expense.name}</h3>

                        <p>{expense.category}</p>

                      </div>

                    </div>


                    <div className="expense-right">

                      <strong>
                        ₹{expense.amount}
                      </strong>

                      <button
                        className="edit-button"
                        onClick={function() {
                          startEdit(expense);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={function() {
                          deleteExpense(expense._id);
                        }}
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                );

              })}

            </div>

          )}

        </div>

      </main>


      <footer>
        <p>Expense Tracker | Dashboard</p>
      </footer>

    </div>
  );
}

export default DashboardPage;