import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  HashRouter
} from "react-router-dom";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MonitoringPage from './pages/MonitoringPage';
import ControlPage from './pages/ControlPage';
import WorkloadPage from './pages/Workload';
import './scss/main.scss';

const App = () => {
  return (
    <HashRouter>
      <Header />
      <div className="App__main">
        <Sidebar />
        <Switch>
          <Redirect exact from="/" to="/monitoring" />
          <Route path="/monitoring">
            <MonitoringPage />
          </Route>
          <Route path="/control">
            <ControlPage />
          </Route>
          <Route path="/workload">
            <WorkloadPage />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
