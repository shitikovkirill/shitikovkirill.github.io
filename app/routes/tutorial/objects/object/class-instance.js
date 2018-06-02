import Ember from 'ember';   //import ember module
import Object from '@ember/object';

export default function() {

  //new ember object
  const Demo = Object.extend ({
    init() {
      Ember.Logger.log('The default property of stateOn is : ' + this.get('stateOn'));
    },
    stateOn: false
  });

  const state = Demo.create();   //new instance from object with create() method
  state.set('stateOn', true);
  Ember.Logger.log(state.get('stateOn'));
  Ember.Logger.log('-------------------------------------');
}
