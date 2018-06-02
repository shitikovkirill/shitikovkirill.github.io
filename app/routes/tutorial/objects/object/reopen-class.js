import Ember from 'ember';
import Object from '@ember/object';

export default function() {
  //reopen() method for instances
  var Person = Object.extend ({
    firstName: null,
    lastName:  null,
  });

  //adding new variable to the Person class
  Person.reopen ({
    middleName: 'Smith',
  });

  Ember.Logger.log('Middle Name: '+Person.create().get('middleName'));

  //reopenClass() method for classes
  Person.reopenClass ({
    //creating new function for class Person
    openClass: function() {
      return Person.create({isMan: true});
    }
  });

  Ember.Logger.log('isMan: '+Person.openClass().get('isMan'));
  Ember.Logger.log('-------------------------------------');
}
