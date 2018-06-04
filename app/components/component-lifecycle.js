import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({

  didUpdateAttrs(options) {
    Ember.Logger.log('didUpdateAttrs', options);
  },

  willUpdate(options) {
    Ember.Logger.log('willUpdate', options);
  },

  didReceiveAttrs(options) {
    Ember.Logger.log('didReceiveAttrs', options);
  },

  willRender() {
    Ember.Logger.log('willRender');
  },

  didRender() {
    Ember.Logger.log('didRender');
  },

  didInsertElement() {
    Ember.Logger.log('didInsertElement');
  },

  didUpdate(options) {
    Ember.Logger.log('didUpdate', options);
  },
});
