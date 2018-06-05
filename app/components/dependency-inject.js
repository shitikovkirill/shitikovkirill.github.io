import Ember from 'ember';
var inject = Ember.inject;

export default Ember.Component.extend ({
  //load the service in the file /app/services/message.js
  message: inject.service(),
  message: 'Click the above button to change text!!!',
  actions: {
    pressMe: function () {

      //after clicking button, above message will get display at console
      var testText = this.get('start').thisistest();
      this.set('message', testText);
      //after clicking button, it will enter in the component page
      this.get('logger').log('Entered in component!');
    },

    scheduleTasks: function () {
      //scheduling work on specific queues like "sync" or "afterRender"
      Ember.run.schedule('afterRender', this, function () {
        console.log("CUSTOM: I'm in afterRender");
        Ember.run.schedule('sync', this, function () {
          console.log("CUSTOM: I'm back in sync");
        });
      });
    }
  }
});
