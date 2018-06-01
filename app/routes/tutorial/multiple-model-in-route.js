import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend ({
  model() {

    //The RSVP.hash methos is built with RSVP.js library that allows to load multiple JavaScript promises
    return hash ({

      //Find the records for the given type and returns all the records of this type present in the store
      rentals: this.store.findAll('rental'),
      reviews: this.store.findAll('review')
  });
  },
});
