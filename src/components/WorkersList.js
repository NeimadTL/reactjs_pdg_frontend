import React from 'react';
import axios from 'axios';
import Worker from './Worker';


class WorkersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workers: [],
    };
    this.loadData();
  }

  renderWorker(id, first_name, status, price, shifts_count, shifts_dates) {
    return (
      <div key={id}>
        <Worker id={id} first_name={first_name} status={status} price={price} shifts_count={shifts_count}
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
        {this.state.workers.map(worker => this.renderWorker(worker.id, worker.first_name, worker.status,
          worker.price, worker.shifts_count, worker.shifts_dates))}
      </div>
    );
  }
}

export default WorkersList;
