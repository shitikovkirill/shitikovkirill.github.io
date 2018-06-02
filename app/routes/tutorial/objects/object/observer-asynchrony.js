import Ember from 'ember';

export default function() {
  var Person = Ember.Object.extend ({
    fName: null,
    lName: null,

    //Defining the Details1 and Details2 computed property function
    Details1: Ember.computed('fName', 'lName',function() {
      return this.get('fName')+' '+this.get('lName');
    }),

    Details2: Ember.observer('Details1', function() {
      this.set('fName','Will');
      this.set('lName','Smith');
      Ember.Logger.log('fName changed from internal observer!!!!');
    })
  });

  //initializing the Person details
  var person = Person.create ({

    //initial value of fName and lName varialble
    fName: 'Mark',
    lName:'Waugh'
  });

  person.addObserver('fName', function() {
    Ember.Logger.log('fName changed from external observer!!!!');
  });

  //updating the value for 'fName and lName' using set() method
  Ember.Logger.log('The updated name : ' + person.get('Details1'));
  person.set('fName', 'XXXXX');
  Ember.Logger.log('The updated name : ' + person.get('Details1'));
  Ember.Logger.log('-------------------------------------');
}
