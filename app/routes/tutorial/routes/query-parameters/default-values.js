import Ember from 'ember';

export default Ember.Route.extend ({
  model(params){
    Ember.Logger.log('Running model hook');
    Ember.Logger.log(params);
  },
});
