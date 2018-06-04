import Ember from 'ember';
import Route from '@ember/routing/route';
import { Promise } from 'rsvp';


export default Route.extend ({
  model() {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve({});
      }, 1500);
    });
  }
});
