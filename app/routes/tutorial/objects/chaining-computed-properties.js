import Route from '@ember/routing/route';
import class_instance from './object/chaining-computed-properties';
import class_instance2 from './object/computed-properties';

export default Route.extend({
  beforeModel: function () {
    class_instance();
    class_instance2();
  }
});
