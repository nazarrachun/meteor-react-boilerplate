import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import classNames from 'classnames';

import { People } from '/imports/api/people/people';
import { addHuman } from '/imports/api/people/methods';

class Home extends React.Component {
  constructor() {
    super();
    
    this.state = {};
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    
    addHuman.call({
      name: this.name.value,
      age: parseInt(this.age.value),
      sex: this.sex.value,
      street: this.street.value
    }, () => {
      this.name.value = '';
      this.age.value = '';
      this.sex.value = '';
      this.street.value = '';
    });
  }
  render() {
    return (
      <div>
        <h1>Home</h1>
        <h3>Add human</h3>
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref={(elem) => { this.name = elem; }} placeholder="name" />
          <input type="text" ref={(elem) => { this.age = elem; }} placeholder="age" minLength="1" maxLength="2"/>
          <input type="text" ref={(elem) => { this.sex = elem; }} placeholder="sex" />
          <input type="text" ref={(elem) => { this.street = elem; }} placeholder="street" />
          <input type="submit" value="Add human" />
        </form>
        {this.props.people.length ? <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Sex</th>
              <th>Street</th>
            </tr>
          </thead>
          <tbody>
            {this.props.people.map(human => <tr key={human._id}>
              <td>{human.name}</td>
              <td>{human.age}</td>
              <td>{human.sex}</td>
              <td>{human.street}</td>
            </tr>)}
          </tbody>
        </table> : null}
      </div>
    );
  }
}

export default createContainer(() => {
  const peopleHandle = Meteor.subscribe('people');
  const people = peopleHandle.ready() ? People.find().fetch() : [];

  return {
    people
  };
}, Home);