import DS from 'ember-data';
import Model from "ember-data/model";
import attr from "ember-data/attr";

//defines one-to-one and one-to-many relationship between models
import { belongsTo, hasMany } from "ember-data/relationships";

export default DS.Model.extend({
  //when async is 'true', it will fetch related entries
  firstVal: belongsTo('staff', {async: true}),
  secondVal: belongsTo('staff', {async: true})
});
