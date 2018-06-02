import Ember from 'ember';

export default Ember.Controller.extend ({
  queryParams: [{

    //mapping the string 'querystring' of the 'query's' query parameter
    query: "query-string"
  }],

  //initialy query's 'query parameter' will be null
  query: null,
  queryParam: Ember.computed.oneWay('query'),
  actions: {

    addQuery: function () {
      this.set('query', this.get('queryParam'));
    }
  }
});
