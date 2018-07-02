import React from 'react';
import { Link } from 'react-router-dom'


class Shift extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      start_date: props.start_date,
      worker: props.worker,
    };
  }

  render() {
    return (
      <div className="worker pt-4 pr-4 pl-4 pb-4 mb-4 text-left">
        <p>#{this.state.id}</p>
        <p>Start date: {this.state.start_date}</p>
        <p>Assigned to: {this.state.worker}</p>
        <Link to={`/shifts/${this.state.id}/edit`}>Edit</Link>
      </div>
    );
  }
}

export default Shift;
