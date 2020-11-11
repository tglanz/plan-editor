import React from 'react';
import './App.css';

import {
  Router,
  NavLink,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import { createBrowserHistory } from 'history';

import Graph from '../Graph/Graph';

const browserHistory = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Router history={browserHistory}>
          <header>
            <nav>
              <NavLink to="/graph" exact={true} className="button" activeClassName="active">Graph</NavLink>
              <NavLink to="/redux" exact={true} className="button" activeClassName="active">Redux</NavLink>
              <NavLink to="/help" exact={true}  className="button" activeClassName="active">Help</NavLink>
            </nav>
          </header>

          <div className="content">
            <Route exact={true} path="/graph" component={Graph} />
            <Switch>
              <Redirect from="/" to="/graph" />
            </Switch>
          </div>
      </Router>
    </div>
  );
}

export default App;
