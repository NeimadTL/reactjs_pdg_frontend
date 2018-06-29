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

        <WorkerForm />
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



class WorkerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      status: '',
      succesMessage: '',
      errors: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();

    const worker = {
      first_name: this.state.first_name,
      status: this.state.status,
    };

    axios.post('http://localhost:3000/workers.json', { worker })
      .then(response => {
        this.setState({ succesMessage : response.data.message })
        console.log(response)
      })
      .catch(error => {
        this.setState({ errors : error.response.data.workers })
        console.log(error.response)
      })
  }

  renderSuccessMessage() {
    if (this.state.succesMessage !== ''){
      return (
        <div className="p-3 mb-2 bg-success text-white rounded">
          {this.state.succesMessage}
        </div>
      )
    }
  }

  renderErrors() {
    if (this.state.errors.length > 0){
      return (
        <div className="p-3 mb-2 bg-danger text-white rounded">
          {this.state.errors.map(error => error + ' ')}
        </div>
      )
    }
  }

  render() {
    return (
      <div className="container mb-4">
        {this.renderSuccessMessage()}
        {this.renderErrors()}
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col">
              <input name="first_name" className="form-control" type="text" placeholder="Worker firstname"
              value={this.state.first_name}  onChange={this.handleChange} />
            </div>
            <div className="col">
              <select name="status" className="custom-select" value={this.state.status} onChange={this.handleChange}>
                <option selected>Select status</option>
                <option key={0} value={'medic'}>medic</option>
                <option key={1} value={'intern'}>intern</option>
                <option key={2} value={'cover'}>cover</option>
              </select>
            </div>
            <div className="col">
              <input className="btn btn-primary" type="submit" value="Add worker" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}



export default App;
