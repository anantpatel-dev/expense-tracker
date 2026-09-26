import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import RegisterPage from "./pages/RegisterPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <Switch>

      <Route exact path="/" component={HomePage} />

      <Route exact path="/user/101" component={UserPage} />

      <Route exact path="/register" component={RegisterPage} />

      <Route exact path="/subscription" component={SubscriptionPage} />

      <Route exact path="/dashboard" component={DashboardPage} />

    </Switch>
  );
}

export default App;