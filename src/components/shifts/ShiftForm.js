import React from 'react';
import axios from 'axios';

class ShiftForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start_date: '',
      worker_id: '',
      succesMessage: '',
      workers: [],
      errors: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadData();
  }

  loadData = () => {
    axios.get('http://localhost:3000/workers.json')
      .then(response => this.setState({ workers: response.data.workers }))
      .catch(error => console.log(error))
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();

    const shift = {
      start_date: this.state.start_date,
      worker_id: this.state.worker_id,
    };

    axios.post('http://localhost:3000/shifts.json', { shift })
      .then(response => {
        this.setState({ succesMessage : response.data.message })
        console.log(response)
      })
      .catch(error => {
        this.setState({ errors : error.response.data.shifts })
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
      <div className="container">
        {this.renderSuccessMessage()}
        {this.renderErrors()}
        <form onSubmit={this.handleSubmit} className="ml-2 mr-2">
          <div className="row mb-4">
            <label htmlFor="start_date">Start date</label>
            <input name="start_date" className="form-control" type="date" value={this.state.start_date}
              onChange={this.handleChange} />
          </div>
          <div className="row mb-4">
            <select name="worker_id" className="custom-select" value={this.state.worker_id}
              onChange={this.handleChange}>
              <option selected>Select worker</option>
              {this.state.workers.map(worker =>
                <option key={worker.id} value={worker.id}>{worker.first_name}</option>
              )}
            </select>
          </div>
          <div className="row justify-content-center">
            <input className="btn btn-primary" type="submit" value="Add shift" />
          </div>
        </form>
      </div>
    );
  }
}

export default ShiftForm;
