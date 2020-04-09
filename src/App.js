import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/home'
import MovieDetail from './components/movieDetail'
// import logo from './logo.svg';
import './App.css';

function App() {
  // return <Home />;
  return (
    <Router>
      <Switch>
        <Route path="/movieDetail">
          <MovieDetail />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
