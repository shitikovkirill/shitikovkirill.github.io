import Route from '@ember/routing/route';

export default Route.extend ({
  beforeModel() {
    //open the beforemodel.hbs page to display the data
    this.transitionTo('tutorial.routes.redirecting.target');
  }
});
