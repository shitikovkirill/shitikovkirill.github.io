import Ember from 'ember';

export default Ember.Controller.extend ({
  recoModel: function(){
    //return the records value to the called route
    return {records_id:1, name:'Docs List'};
  }.property()
});
