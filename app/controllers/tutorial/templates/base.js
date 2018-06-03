import Ember from 'ember';
import Object from '@ember/object';

let Person = Object.extend({
  fName: null,
  lName: null,
  fullName: Ember.computed('fName', 'lName', function () {
    return this.get('fName') + ' ' + this.get('lName')
  })
});

export default Ember.Controller.extend ({
  //initializing values
  firstSentence: 'Welcome to',
  lastSentence: 'TutorialsPoint!',
  person: Person.create({
    fName: 'Kirill',
    lName: 'Shitikov',
  })
});
