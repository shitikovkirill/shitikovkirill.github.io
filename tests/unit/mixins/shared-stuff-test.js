import EmberObject from '@ember/object';
import SharedStuffMixin from 'shitikovkirill-github-io/mixins/shared-stuff';
import { module, test } from 'qunit';

module('Unit | Mixin | shared-stuff', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let SharedStuffObject = EmberObject.extend(SharedStuffMixin);
    let subject = SharedStuffObject.create();
    assert.ok(subject);
  });
});
