import Component from '@ember/component';

export default Component.extend({
  number: 100,
  click(){
    this.attrs.sendlog();
    this.sendAction()
  }
});
