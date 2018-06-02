import Ember from 'ember';

export default Ember.Controller.extend ({
  queryParams: ['showThing'],
  //showThing would be false, if only the route's model is changing
  showThing: false
});
