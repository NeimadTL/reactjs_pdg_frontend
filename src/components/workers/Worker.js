import React from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom'
import WorkerForm from './WorkerForm';


class Worker extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      id: props.id,
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
      <Router>
        <div className="worker pt-4 pr-4 pl-4 pb-4 mb-4 text-left">
          <p>{this.state.first_name}</p>
          <p>Status: {this.state.status}</p>
          <p>Price: {this.state.price} €</p>
          <p>Number of shifts: {this.state.shifts_count}</p>
          <p>Dates of shifts: {this.formatShiftsDates()}</p>
          <Link to={`/workers/${this.state.id}/edit`}>Edit</Link>
          <Route exact={true} path="/workers/:id/edit" render={() =>(
            <WorkerForm first_name={this.state.first_name} status={this.state.status}
              mode='edit' idWorker={this.state.id}/>
          )}/>
        </div>
      </Router>
    );
  }
}

export default Worker;
