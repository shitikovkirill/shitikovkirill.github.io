import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
  actions: {
    toggleBody() {
      this.toggleProperty('isShowingBody');
    },
    User: function (user) {
      Ember.Logger.log('User name: ');
      Ember.Logger.log(user);

      this.set('user', user)
    },
    toggleEvent: function () {
      this.toggleProperty('isShowing');
    },
    toggleAllowedKeys: function () {
      this.toggleProperty('isShowing2');
    },
    actionFirstParameter(newName) {
      Ember.Logger.log('Name is:'+' '+newName);
    }
  }
});
