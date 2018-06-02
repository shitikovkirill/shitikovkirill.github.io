import Route from '@ember/routing/route';
import class_instance from './object/computed-aggregate';

export default Route.extend({
  beforeModel: function () {
    class_instance();
  }
});
