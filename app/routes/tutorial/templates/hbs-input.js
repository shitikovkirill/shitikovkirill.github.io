import Ember from 'ember';

export default Ember.Route.extend ({
  model: function () {
    //initializing the variable 'name' as null by using create method
    Ember.Logger.log('Run model.');
    return Ember.Object.create ({
      name: null,
      checkMe: false,
    });
  }
});
