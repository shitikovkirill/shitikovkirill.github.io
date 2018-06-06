import Ember from 'ember';

//it is an application initializer that run as your application boots
export function initialize(application) {
  let Logger = Ember.Object.extend({
    log(m) {
      console.log(m);
    }
  });

  //Registration key includes two parts; one is factory type and second is name of factory
  application.register('logger:main', Logger);

  //Once a factory is registered, it can be injected by using 'application.inject'
  // along with 'logger' property
  //and value for this property will come from 'logger:main'factory
  application.inject('component:dependency-inject', 'logger', 'logger:main');
}

export default {
  name: 'logger',
  initialize: initialize
};
