import Component from '@ember/component';
import { w } from '@ember/string';

export default Component.extend({
  tagName: 'span',
  classNames: ['my-class'],
  arrayOfFruits: ['apple', 'orange', 'grape'],
  init(){
    this._super(...arguments);
    this.arrayOfFruits2 = ['apple2', 'orange2', 'grape2'];

    if (this.attrs.addedparam) {
      this.params = w(this.attrs.addedparam)
    }
  },
  actions: {
    add(val){
      this.get('arrayOfFruits').pushObject(val);
      this.get('arrayOfFruits2').pushObject(val)
    },
  }
});
