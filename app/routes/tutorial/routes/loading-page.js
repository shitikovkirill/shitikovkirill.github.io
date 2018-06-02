import Ember from 'ember';

export default Ember.Route.extend ({
  model() {
    return new Ember.RSVP.Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve({});
      }, 1500);
    });
  }
});
