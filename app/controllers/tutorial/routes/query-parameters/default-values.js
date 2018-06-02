import Ember from 'ember';

export default Ember.Controller.extend ({
  //assigning query parameter name as 'query'
  queryParams: 'query',
  //assigning the query param to a default value as 1
  query: 1,
  queryParam: Ember.computed.oneWay('query'),
  actions: {

    addQuery: function () {
      this.set('query', this.get('queryParam'));
      document.write(this.get('query'));
    }
  }
});
