import { Factory, association } from 'ember-cli-mirage';

export default Factory.extend({
  name(i) {
    return `Post ${i}`;
  },
  //author: association(),
});
