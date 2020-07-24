import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./styles.scss";

//components 
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from './components/BubblePage'

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/login" component={Login} />
        <PrivateRoute path='/'>
          <BubblePage />
        </PrivateRoute>
      </div>
    </Router>
  );
}

export default App;
