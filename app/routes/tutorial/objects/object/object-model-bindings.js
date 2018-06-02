import Ember from 'ember';

export default function() {
  var CarOne = Ember.Object.create ({
    //primary value
    TotalPrice: 860600
  });

  var Car = Ember.Object.extend ({
    //creates property which is an alias for another property
    TotalPrice: Ember.computed.alias('CarOne.TotalPrice')
  });

  var CarTwo = Car.create ({
    CarOne: CarOne
  });
  Ember.Logger.log('Value of car before updating: ' + CarTwo.get('TotalPrice'));

  //sets the car price
  CarTwo.set('TotalPrice', 930000);

  //above car price effects the CarOne
  Ember.Logger.log('Value of car after updating: ' + CarOne.get('TotalPrice'));
  Ember.Logger.log('-------------------------------------');
}
