import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ArticlesListPage from "./pages/ArticlesListPage";
import ArticlesPage from "./pages/ArticlesPage";
import NavBar from "./NavBar";
import NotFoundPage from "./pages/NotFoundPage";
import Maps from "./pages/GoogleMaps";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div id="page-body">
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/about" component={AboutPage} />
            <Route path="/articles-list" component={ArticlesListPage} />
            <Route path="/article/:name" component={ArticlesPage} />
            <Route path="/maps" component={Maps} />
            <Route component={NotFoundPage} exact />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
