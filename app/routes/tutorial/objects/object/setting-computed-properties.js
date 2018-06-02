import Ember from 'ember';

export default function() {
  var Person = Ember.Object.extend ({
    firstName: null,
    lastName: null,
    fullName: Ember.computed('firstName', 'lastName', function() {
      return this.get('firstName') + this.get('lastName');
    })
  });

  var nameDetails = Person.create();
  nameDetails.set('fullName', "Steve Smith");

  Ember.Logger.log("firstName = " + nameDetails.get('firstName'));
  Ember.Logger.log("lastName = " + nameDetails.get('lastName'));
  Ember.Logger.log("Full Name of the Person: " + nameDetails.get('fullName'));

  nameDetails.set('firstName', 'XXXX');
  nameDetails.set('lastName', 'ZZZZ');
  Ember.Logger.log("Full Name of the Person2: " + nameDetails.get('fullName'));
  Ember.Logger.log('-------------------------------------');
}
