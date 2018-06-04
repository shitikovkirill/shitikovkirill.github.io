import Ember from 'ember';

export default Ember.Route.extend ({
  model() {
    //model will display these records when you execute the code
    return [{
      id: 1,
      name: 'Category One'
    }, {
      id: 2,
      name: 'Category Two'
    }];
  },

  actions: {
    //it adds records to model
    addNewCategory(id, name) {
      this.controller.get('model').pushObject({id,name});
    },

    //it removes the records from model
    deleteCategory(category) {
      this.controller.get('model').removeObject(category);
    }
  }
});
