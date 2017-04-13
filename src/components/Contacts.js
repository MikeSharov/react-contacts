import React, { Component } from 'react';
import contacts from '../data/contacts.js';
import ContactsTable from './ContactsTable';
import EditContact from './EditContact';
import format from '../services/format';

export default class Contacts extends Component {
	state = {
		contacts: contacts.map(contact => ({
			id: contact.id,
			name: format.name(contact.name),
			phone: format.phone(contact.phone),
			email: format.email(contact.email)
		})),
		editingContact: {},
		sortBy: '', 
		sortAsc: true, 
		editMode: false
	}

	async saveContact(contact) {
		await this.setState(state => {
			let contacts = state.contacts;
			if (contact.id) {
				contacts[this.findContactIndex(contact.id)] = contact;
			}
			else {
				contact.id = Date.now().toString();
				contacts.push(contact);
			}
			return {contacts}
		});
		this.state.sortBy && this.sort();
		this.cancelEdit();
	}

	async editContact(contact) {
		await this.setState({ editingContact: contact });
		this.toggleEditMode();
	}

	deleteContact(id) {
		this.setState(state => {
			let contacts = state.contacts;
			contacts.splice(this.findContactIndex(id), 1);
			return {contacts};
		});
	}

	cancelEdit() {
		this.setState({ editMode: false, editingContact: {} });
	}

	findContactIndex(id) {
		return this.state.contacts.findIndex(contact => contact.id === id);
	}

	async changeSort(col) {
		if (this.state.sortBy === col) {
			await this.setState(state => ({ sortAsc: !state.sortAsc, contacts: state.contacts.reverse() }));
		}
		else {
			await this.setState({ sortBy: col, sortAsc: true });
			this.sort();
		}
	}

	sort() {
		this.setState({contacts: this.state.contacts.sort((a,b) => {
			let sortBy = this.state.sortBy;
			if (a[sortBy] > b[sortBy]) 			return this.state.sortAsc ? 1 : -1;
			else if (a[sortBy] < b[sortBy]) return this.state.sortAsc ? -1 : 1;
			else 														return 0;
		})});
	}

	toggleEditMode() {
		this.setState(state => ({ editMode: !state.editMode }));
	}

  render() {
    return (
    	<div className="Contacts">
    		{this.state.editMode && 
    			<EditContact contact={this.state.editingContact} 
    									 addContact={contact => this.addContact(contact)} 
    									 cancel={this.cancelEdit.bind(this)} 
    									 saveContact={this.saveContact.bind(this)} 
    			/>
    		}
    		{!this.state.editMode && 
    			<button className="btn btn-success" 
    							onClick={this.toggleEditMode.bind(this)}>
    				<i className="fa fa-plus"></i> Add Contact
    			</button>
    		}
	      <ContactsTable 
	      	contacts={this.state.contacts} 
	      	sortBy={this.state.sortBy} 
	      	sortAsc={this.state.sortAsc} 
	      	changeSort={col => this.changeSort(col)}
	      	deleteItem={id => this.deleteContact(id)}
	      	editContact={id => this.editContact(id)} />
	    </div>
    );
  }
}