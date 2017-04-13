import React from 'react';

export default function Row(props) {
  let properties = ['name', 'phone', 'email'];

  return (
    <tr>
      <td onClick={() => props.delete()}><i className="fa fa-trash text-danger"></i></td>
      <td onClick={() => props.edit()}><i className="fa fa-pencil text-primary"></i></td>
      {properties.map(property => <td key={property}>{props[property]}</td>)}
    </tr>
  );
}