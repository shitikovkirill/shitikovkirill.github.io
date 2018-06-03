import Ember from 'ember';

export default Ember.Controller.extend ({
  bool: false,
  check: function () {
    //returning the boolean value to the called function
    return this.bool;
  }.property('content.check'),
});
