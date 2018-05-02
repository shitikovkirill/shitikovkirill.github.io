import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | modules/ember-power-select', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:modules/ember-power-select');
    assert.ok(controller);
  });
});
