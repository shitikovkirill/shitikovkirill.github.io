import DS from 'ember-data';
import {hasMany} from "ember-cli-mirage";

export default DS.Model.extend({
  name: DS.attr(),
  age: DS.attr(),
  admin: DS.attr(),
  avatar: DS.attr(),
  blogPosts: hasMany(),
});
