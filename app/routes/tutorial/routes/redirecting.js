import Ember from 'ember';

export default Ember.Route.extend ({
  beforeModel() {
    //open the beforemodel.hbs page to display the data
    this.transitionTo('tutorial.routes.redirecting.target');
  }
});
