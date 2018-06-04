import Ember from 'ember';
import Route from '@ember/routing/route';

export default Route.extend ({
  queryParams: {
    query: {
      //opting into full transition
      // if set false model hook do not by run
      refreshModel: true
    }
  },

  model(params){
    Ember.Logger.log('Running model hook');
    Ember.Logger.log(params);
  },

  setupController(){
    Ember.Logger.log('Running setupController hook');
  }
});
