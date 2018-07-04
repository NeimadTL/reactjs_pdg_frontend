import React from 'react';
import axios from 'axios';

class WorkerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: props.first_name || '',
      status: props.status || '',
      succesMessage: '',
      errors: [],
      mode: props.mode,
      idWorker: props.idWorker
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

    if(this.state.mode === 'create'){
      axios.post('http://localhost:3000/workers.json', { worker })
        .then(response => {
          this.setState({ succesMessage : response.data.message })
          console.log(response)
        })
        .catch(error => {
          this.setState({ errors : error.response.data.errors })
          console.log(error.response)
        })
    }
    else{
      axios.put(`http://localhost:3000/workers/${this.state.idWorker}`, { worker })
        .then(response => {
          this.setState({ succesMessage : response.data.message })
          console.log(response)
        })
        .catch(error => {
          this.setState({ errors : error.response.data.errors })
          console.log(error.response)
        })
    }
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
            <input name="first_name" className="form-control" type="text" placeholder="Worker firstname"
            value={this.state.first_name}  onChange={this.handleChange} />
          </div>
          <div className="row mb-4">
            <select name="status" className="custom-select" value={this.state.status} onChange={this.handleChange}>
              <option selected>Select status</option>
              <option key={0} value={'medic'}>medic</option>
              <option key={1} value={'intern'}>intern</option>
              <option key={2} value={'cover'}>cover</option>
            </select>
          </div>
          <div className="row justify-content-center">
            <input className="btn btn-primary" type="submit"
              value={this.state.mode === 'create' ? "Add worker" : "Modify worker"} />
          </div>
        </form>
      </div>
    );
  }
}

export default WorkerForm;
