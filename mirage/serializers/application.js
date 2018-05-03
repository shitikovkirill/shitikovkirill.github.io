import { JSONAPISerializer } from 'ember-cli-mirage';
import { dasherize } from '@ember/string';

export default JSONAPISerializer.extend({
  keyForAttribute(attr) {
    return dasherize(attr);
  },

  keyForRelationship(attr) {
    return dasherize(attr);
  },
});
