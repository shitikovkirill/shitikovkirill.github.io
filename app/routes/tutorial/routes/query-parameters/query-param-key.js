import Ember from 'ember';
import Route from '@ember/routing/route';

export default Route.extend ({
  model(params){
    Ember.Logger.log('Running model hook');
    Ember.Logger.log(params);
  },
});
