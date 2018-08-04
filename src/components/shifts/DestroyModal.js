import React from 'react';
import Modal from 'react-responsive-modal';
import axios from 'axios';

class DestroyModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
      idShift: props.idShift,
      succesMessage: '',
    };
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  onDestroy = () => {
    console.log("on destroy")
    axios.delete(`http://localhost:3000/shifts/${this.state.idShift}`, { id: this.state.idShift })
      .then(response => {
        this.setState({ succesMessage : response.data.message })
        console.log(response)
      })
    this.onCloseModal();
  };

  renderSuccessMessage() {
    if (this.state.succesMessage !== ''){
      return (
        <div className="p-3 mb-2 bg-success text-white rounded">
          {this.state.succesMessage}
        </div>
      )
    }
  }

  render() {
    return (
      <div>
      {this.renderSuccessMessage()}
        <Modal open={this.state.open} onClose={this.onCloseModal} center>
          <div className="modal-dialog">
            <div className="mb-4"><h6> Are you sure ? </h6></div>
            <button type="button" className="btn btn-primary mr-4" onClick={this.onCloseModal}>NO</button>
            <button type="button" className="btn btn-danger" onClick={this.onDestroy}>YES</button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default DestroyModal;
