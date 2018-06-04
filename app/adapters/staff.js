import DS from 'ember-data';
import Ember from 'ember';

//values given for type and id
const relval1 = {
  data: {
    type: "staff",
    id: "1",
    attributes: {
      name: 'JavaScript'
    }
  }
};

const relval2 = {
  data: {
    type: "staff",
    id: "2",
    attributes: {
      name: 'jQuery'
    }
  }
};

//the variable 'relval3' pushes the data to 'relval1' and 'relval2'
const relval3 = Ember.A();
relval3.pushObject(relval1);
relval3.pushObject(relval2);

export default DS.JSONAPIAdapter.extend({
  findRecord(store, type, id) {
    //finds the item id and returns to 'relval3' variable
    let valret = relval3.find(function (item) {
      return id === Ember.get(item, 'data.id');
    });
    //the searched item will passed to 'relval3' from 'valret' variable
    return valret;
  }
});
