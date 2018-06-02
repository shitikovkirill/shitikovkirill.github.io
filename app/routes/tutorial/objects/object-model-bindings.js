import Route from '@ember/routing/route';
import class_instance from './object/object-model-bindings';

export default Route.extend({
  beforeModel: function () {
    class_instance();
  }
});
