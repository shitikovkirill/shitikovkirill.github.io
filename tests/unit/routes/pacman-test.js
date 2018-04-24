import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | pacman', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:pacman');
    assert.ok(route);
  });
});
