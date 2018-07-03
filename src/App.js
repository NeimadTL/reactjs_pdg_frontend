import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom'
import Welcome from './components/Welcome';
import WorkersList from './components/workers/WorkersList';
import WorkerForm from './components/workers/WorkerForm';
import ShiftsList from './components/shifts/ShiftsList';
import ShiftForm from './components/shifts/ShiftForm';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header mb-4">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to PDG APP</h1>
          </header>

          <div className="mb-4">
            <Link to={"/workers/new"} className='btn btn-primary'>New worker</Link>
            <Link to={"/workers"} className='btn btn-primary'>All workers</Link>
            <Link to={"/shifts"} className='btn btn-primary'>All shifts</Link>
            <Link to={"/shifts/new"} className='btn btn-primary'>New shift</Link>
          </div>

          <div className="App-intro">
            <Route exact={true} path="/" component={Welcome}/>
            <Route exact={true} path="/workers" component={WorkersList}/>
            <Route exact={true} path="/workers/new" render={() =>(<WorkerForm mode='create' />)}/>
            <Route exact={true} path="/shifts" component={ShiftsList}/>
            <Route exact={true} path="/shifts/new" render={() =>(<ShiftForm mode='create' />)}/>
            <Redirect to="/" />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
