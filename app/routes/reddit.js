import Route from '@ember/routing/route';
import Ember from 'ember'

export default Route.extend({
  model(params){
    Ember.Logger.log(params);
    return this.get('store').query('reddit', params)
  }
});
