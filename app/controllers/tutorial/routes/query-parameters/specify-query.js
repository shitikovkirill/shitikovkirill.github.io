import Controller from '@ember/controller';

export default Controller.extend ({
  //specifying the 'query' as one of controller's query parameter
  queryParams: ['query'],

  //initialize the query value
  query: null,

  //defining a computed property queryParam
  queryParam: Ember.computed.oneWay('query'),
  actions: {
    addQuery: function () {

      //setting up the query parameters and displaying it
      this.set('query', this.get('queryParam'));
      document.write(this.get('query'));
    }
  }
});
