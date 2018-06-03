import Ember from 'ember';
import Route from '@ember/routing/route';
import { later } from '@ember/runloop';

export default Route.extend ({
  actions: {
    willTransition(transition) {

      //decalring the self variable
      var self = this;

      //checking whether self variable is false or not
      if (!this.get('allowTransition')) {

        //display the message
        let result = confirm('Allow transition');
        Ember.Logger.log("transition abort");
        transition.abort();  //calling abort function

        later(function () {
          //setting the self variable to true
          if(result){
            self.set('allowTransition', true);
            //display the message
            Ember.Logger.log("transition retry");
            transition.retry();  //calling retry function
          }
        }, 500);
      }
    }
  }
});
