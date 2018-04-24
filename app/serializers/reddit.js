import DS from 'ember-data';
import Ember from 'ember'

export default DS.JSONAPISerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    Ember.Logger.log('store');
    Ember.Logger.log(store);
    Ember.Logger.log('primaryModelClass');
    Ember.Logger.log(primaryModelClass);
    Ember.Logger.log('payload');
    Ember.Logger.log(payload);
    Ember.Logger.log('id');
    Ember.Logger.log(id);
    Ember.Logger.log('requestType');
    Ember.Logger.log(requestType);

    return {
      data: payload.data.children.map((info) => {
        return {
          id: info.data.id,
          type: 'reddit',
          attributes: info.data,
        }
      })
    }
  }
});
