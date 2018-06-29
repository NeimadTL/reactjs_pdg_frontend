import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
      name: props.name,
      status: props.status,
      price: props.price,
      shiftsCount: props.shiftsCount,
      shiftsDates: props.shiftsDates,
    };
  }

  formatShiftsDates = () => {
    let formattedShifts = '';
    for (let i=0; i<this.state.shiftsDates.length; i++) {
      formattedShifts = formattedShifts.concat(this.state.shiftsDates[i]);
      if (i < this.state.shiftsDates.length -1) {
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
        <p>{this.state.name}</p>
        <p>Status: {this.state.status}</p>
        <p>Price: {this.state.price} €</p>
        <p>Number of shifts: {this.state.shiftsCount}</p>
        <p>Dates of shifts: {this.formatShiftsDates()}</p>
      </div>
    );
  }
}


class WorkersList extends React.Component {

  renderWorker(name, status, price, shiftsCount, shiftsDates) {
    return (
      <div key={name}>
        <Worker name={name} status={status} price={price} shiftsCount={shiftsCount}
          shiftsDates={shiftsDates} />
      </div>
    )
  }

  render() {
    return (
      <div className="container">
        {this.renderWorker('Julie', 'medic', 540, 1, ['2017-1-1'])}
        {this.renderWorker('Marc', 'medic', 810, 3, ['2017-1-2', '2017-1-6', '2017-1-10'])}
        {this.renderWorker('Antoine', 'intern', 126, 1, ['2017-01-03'])}
        {this.renderWorker('Emilie', 'medic', 810, 2, ['2017-01-04','2017-01-08'])}
        {this.renderWorker('Lea', 'cover', 1920, 3, ['2017-01-05', '2017-01-07', '2017-01-09'])}
      </div>
    );
  }
}


export default App;
