import Ember from 'ember';

export default Ember.Route.extend ({
  model(){
    //returns the value of model() hook
    return this.get('store').findRecord('account', 100);  //retrieve a record for specific id
  }
});
