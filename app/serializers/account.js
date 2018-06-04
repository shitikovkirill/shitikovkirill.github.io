import DS from 'ember-data';
import Ember from 'ember'

export default DS.JSONAPISerializer.extend({
  keyForRelationship: function(key, relationship, method) {
    Ember.Logger.log('Run account serializer');
    Ember.Logger.log(key);
    Ember.Logger.log(relationship);
    Ember.Logger.log(method);
    return Ember.String.camelize(key);  //returns the lowerCamelCase form of a string
  }
});
