import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import NewNote from "./pages/NewTrip";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/trips/new">
        <NewNote />
      </Route>
      {/* Finally, catch all unmatched routes */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}