import React, { Component } from 'react';
import validate from '../services/validate';
import format from '../services/format';

export default class EditContact extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...props.contact,
      isNameValid: validate.name(props.contact.name),
      isPhoneValid: validate.phone(props.contact.phone),
      isEmailValid: validate.email(props.contact.email)
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  nameChanged(e) {
    this.setState({ name: e.target.value, isNameValid: validate.name(e.target.value) });
  }

  phoneChanged(e) {
    this.setState({ phone: e.target.value, isPhoneValid: validate.phone(e.target.value) });
  }

  emailChanged(e) {
    this.setState({ email: e.target.value, isEmailValid: validate.email(e.target.value) });
  }

  save() {
    this.props.saveContact({
      id: this.state.id,
      name: format.name(this.state.name),
      phone: format.phone(this.state.phone),
      email: format.email(this.state.email)
    });
  }

  render() {
    return (
        <div className="EditContact">
          <div className="row">
            <div className={'form-group col-sm-3 ' + (this.state.isNameValid ? 'has-success' : 'has-error')}>
              <input type="text" placeholder="Name" className="form-control" name="name" value={this.state.name} onChange={this.nameChanged.bind(this)} />
            </div>
            <div className={'form-group col-sm-2 ' + (this.state.isPhoneValid ? 'has-success' : 'has-error')}>
              <input type="text" placeholder="Phone" className="form-control" name="phone" value={this.state.phone} onChange={this.phoneChanged.bind(this)} />
            </div>
            <div className={'form-group col-sm-3 ' + (this.state.isEmailValid ? 'has-success' : 'has-error')}>
              <input type="email" placeholder="Email" className="form-control" name="email" value={this.state.email} onChange={this.emailChanged.bind(this)} />
            </div>
            <div className="form-group col-sm-2">
              <button className="btn btn-success btn-block" onClick={this.save.bind(this)} disabled={!this.state.isNameValid || !this.state.isPhoneValid || !this.state.isEmailValid} ><i className="fa fa-save"></i> Save</button>
            </div>
            <div className="form-group col-sm-2">
              <button className="btn btn-default btn-block" onClick={() => this.props.cancel()}><i className="fa fa-close"></i> Cancel</button>
            </div>
          </div>
        </div>
    );
  }
}
