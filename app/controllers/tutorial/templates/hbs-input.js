import Ember from 'ember';

export default Ember.Controller.extend ({
  isNamed: false,

  actions: {
    //this actions get the name from the text field
    send: function () {
      Ember.Logger.log('Name is: ' + this.get('name'));
      this.set('isNamed', true);
    },
    send2: function () {
      Ember.Logger.log('checkbox value: ' + this.get('checkMe'));
    },
  }
});
