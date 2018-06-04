import Ember from 'ember';
import Route from '@ember/routing/route';
import Object from '@ember/object';

export default Route.extend ({
  model: function () {
    //initializing the variable 'name' as null by using create method
    Ember.Logger.log('Run model.');
    return Object.create ({
      name: null,
      checkMe: false,
    });
  }
});
