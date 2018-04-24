import DS from 'ember-data';
import Ember from 'ember'

export default DS.JSONAPIAdapter.extend({
  host: 'https://www.reddit.com',
  urlForQuery (query, modelName) {
    Ember.Logger.log('query');
    Ember.Logger.log(query);
    Ember.Logger.log('modelName');
    Ember.Logger.log(modelName);

    switch(modelName) {
      case 'reddit':
        return `${this.host}/r/${query.subreddit}.json`;
      default:
        return this._super(...arguments);
    }
  }
});
