import Ember from 'ember';   //import ember module
import Object from '@ember/object';

export default function() {
  var Person = Object.extend ({
    firstName: null,
    lastName: null,
    age: null,
    mobno: null,

    //Defining the Details1 and Details2 computed property function
    Details1: Ember.computed('firstName', 'lastName', function() {
      return this.get('firstName') + ' ' + this.get('lastName');
    }),

    Details2: Ember.computed('age', 'mobno', function() {
      return 'Name: ' + this.get('Details1') + ' ' + ' Age: ' + this.get('age') +
        ' ' + ' Mob No: ' + this.get('mobno');
    }),
  });

  var person_details = Person.create ({
    //initializing the values for variables
    firstName: 'Jhon',
    lastName: 'Smith',
    age: 26,
    mobno: '1234512345'
  });

  Ember.Logger.log("Details of the Person:");
  //displaying the values by get() method
  Ember.Logger.log(person_details.get('Details2'));

  //updating the value for 'firstName' using set() method
  person_details.set('firstName', 'Steve');
  Ember.Logger.log("Dynamic updating: ");
  Ember.Logger.log(person_details.get('firstName'));
  Ember.Logger.log(person_details.get('Details2'));
  Ember.Logger.log('-------------------------------------');
}
