import React from 'react';
import axios from 'axios';
import Shift from './Shift';


class ShiftsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shifts: [],
    };
    this.loadData();
  }

  renderShift(id, start_date, worker) {
    return (
      <div key={id}>
        <Shift id={id} start_date={start_date} worker={worker} />
      </div>
    )
  }

  loadData = () => {
    // WARNING please use the chrome extension -> allow-control-allow-origi to allow this request
    // https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi
    // WARNING

    axios.get('http://localhost:3000/shifts.json')
      .then(response => this.setState({ shifts: response.data.shifts }))
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="container">
        {this.state.shifts.map(shift => this.renderShift(shift.id, shift.start_date, shift.worker))}
      </div>
    );
  }
}

export default ShiftsList;
