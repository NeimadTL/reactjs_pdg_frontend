import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <WorkersList />

      </div>
    );
  }
}


class Worker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: props.first_name,
      status: props.status,
      price: props.price,
      shifts_count: props.shifts_count,
      shifts_dates: props.shifts_dates,
    };
  }

  formatShiftsDates = () => {
    let formattedShifts = '';
    for (let i=0; i<this.state.shifts_dates.length; i++) {
      formattedShifts = formattedShifts.concat(this.state.shifts_dates[i]);
      if (i < this.state.shifts_dates.length -1) {
        formattedShifts = formattedShifts.concat(' ');
        formattedShifts = formattedShifts.concat('|');
        formattedShifts = formattedShifts.concat(' ');
      }
    }
    return formattedShifts;
  }

  render() {
    return (
      <div className="worker pt-4 pr-4 pl-4 pb-4 mb-4 text-left">
        <p>{this.state.first_name}</p>
        <p>Status: {this.state.status}</p>
        <p>Price: {this.state.price} €</p>
        <p>Number of shifts: {this.state.shifts_count}</p>
        <p>Dates of shifts: {this.formatShiftsDates()}</p>
      </div>
    );
  }
}


class WorkersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workers: [],
    };
    this.loadData();
  }

  renderWorker(first_name, status, price, shifts_count, shifts_dates) {
    return (
      <div key={first_name}>
        <Worker first_name={first_name} status={status} price={price} shifts_count={shifts_count}
          shifts_dates={shifts_dates} />
      </div>
    )
  }

  loadData = () => {
    // WARNING please use the chrome extension -> allow-control-allow-origi to allow this request
    // https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi
    // WARNING
    
    axios.get('http://localhost:3000/workers.json')
      .then(response => this.setState({ workers: response.data.workers }))
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="container">
        {this.state.workers.map(worker => this.renderWorker(worker.first_name, worker.status, worker.price,
          worker.shifts_count, worker.shifts_dates))}
      </div>
    );
  }
}


export default App;
