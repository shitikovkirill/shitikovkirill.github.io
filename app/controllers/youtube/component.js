import Ember from 'ember';

export default Ember.Controller.extend ({
  actions: {
    pressed() {
      alert('You pressed this');
    },
    log(){
      Ember.Logger.log('Wright log')
    }
  }
});
