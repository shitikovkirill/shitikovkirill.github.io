import Ember from 'ember';

export default Ember.Route.extend ({
  queryParams: {
    query: {
      //assigning replace state as true
      replace: true
    }
  }
});
