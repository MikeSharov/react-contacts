import React from 'react';
import Row from './Row';

export default function ContactsTable(props) {
	let columns = [
		{ display: 'Name',	value: 'name' }, 
		{ display: 'Phone',	value: 'phone' }, 
		{ display: 'Email',	value: 'email' }
	];

	return (
		<div className="ContactsTable">
      <table className='table table-striped'>
      	<thead className='text-primary'>
      		<tr>
      			<th/><th/>
      			{columns.map((col, i) => 
      				<th key={col.value} 
      						onClick={() => props.changeSort(col.value)} 
      						className={props.sortBy === col.value ? (props.sortAsc ? 'asc' : 'desc') : ''} >
      					{col.display}
      				</th>
      			)}
      		</tr>
      	</thead>
      	<tbody>
      		{props.contacts.map(contact => 
      			<Row key={contact.id} 
      					 name={contact.name} 
      					 phone={contact.phone} 
      					 email={contact.email} 
      					 delete={() => props.deleteItem(contact.id)} 
      					 edit={() => props.editContact(contact)} />
      		)}
      	</tbody>
      </table>
    </div>
	);
}