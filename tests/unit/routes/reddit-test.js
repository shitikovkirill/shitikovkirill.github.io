import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | reddit', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:reddit');
    assert.ok(route);
  });
});
