import React from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom'
import ShiftForm from './ShiftForm';
import DestroyModal from './DestroyModal';


class Shift extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      start_date: props.start_date,
      worker_firstname: props.worker_firstname,
      worker_id: props.worker_id,
    };
  }

  render() {
    return (
      <Router>
        <div className="worker pt-4 pr-4 pl-4 pb-4 mb-4 text-left">
          <p>#{this.state.id}</p>
          <p>Start date: {this.state.start_date}</p>
          <p>Assigned to: {this.state.worker_firstname}</p>
          <Link className="mr-2" to={`/shifts/${this.state.id}/edit`}>Edit</Link>
          <Link to={`/shifts/${this.state.id}`}>Destroy</Link>
          <Route exact={true} path="/shifts/:id/edit" render={() =>(
            <ShiftForm start_date={this.state.start_date} worker_id={this.state.worker_id}
              mode='edit' idShift={this.state.id}/>
          )}/>
          <Route exact={true} path="/shifts/:id" render={() =>(<DestroyModal open={true}
            idShift={this.state.id} />)}/>
        </div>
      </Router>
    );
  }
}

export default Shift;
