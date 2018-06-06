import Ember from 'ember';
var inject = Ember.inject;

export default Ember.Component.extend ({
  //load the service in the file /app/services/message.js
  message: inject.service(),
  text: 'Click the above button to change text!!!',

  actions: {
    pressMe: function () {

      //after clicking button, above message will get display at console
      let testText = this.get('message').thisistest();
      this.set('text', testText);
      this.get('logger').log('Services load from /app/services/message.js (by property name)');
    },

    useAutoLoad: function() {

      let testText = this.get('start').thisistest();
      this.set('text', testText);
      this.get('logger').log('Start property load from init initialiser.');
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
