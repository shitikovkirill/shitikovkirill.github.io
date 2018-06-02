import Ember from 'ember';
var words = "tutorialspoint";

export default Ember.Controller.extend ({
  queryParams: ['query'],
  actions: {
    change: function() {

      //assigning value of variable 'words' to the 'query' i.e. query parameter
      this.set('query', words);
    }
  }
});
