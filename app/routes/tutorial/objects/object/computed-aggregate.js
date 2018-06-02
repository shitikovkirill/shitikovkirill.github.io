import Ember from 'ember';

export default function() {
  var Person = Ember.Object.extend ({

    //todos is an array which holds the boolean values
    todos: [
      Ember.Object.create ({
        isDone: false
      }),
      Ember.Object.create ({
        isDone: false
      }),
      Ember.Object.create ({
        isDone: true
      })
    ],

    //dispaly the remaining values of todos
    remaining: Ember.computed('todos.@each.isDone', function() {
      var todos = this.get('todos');

      //return the todos array
      return todos.filterBy('isDone', false).get('length');
    }),
  });

  var car_obj = Person.create();
  Ember.Logger.log("The remaining number of cars in todo list: " + car_obj.get('remaining'));

  Ember.Logger.log('-------------------------------------');
}
