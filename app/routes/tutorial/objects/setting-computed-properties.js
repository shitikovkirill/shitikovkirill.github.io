import Route from '@ember/routing/route';
import class_instance from './object/setting-computed-properties';

export default Route.extend({
  beforeModel: function () {
    class_instance();
  }
});
