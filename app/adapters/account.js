import DS from 'ember-data';

//created an "account" array to store relationship data
const account = {
  "data": {
    "type": "account",
    "id": "100",

    "relationships": {
      "secondVal": {
        "data": {
          "type": "staff",
          "id": "2"
        }
      },
      "firstVal": {
        "data": {
          "type": "staff",
          "id": "1"
        }
      }
    }
  }
};

export default DS.JSONAPIAdapter.extend({
  findRecord() {
    //returns the data from array
    return account;
  }
});
