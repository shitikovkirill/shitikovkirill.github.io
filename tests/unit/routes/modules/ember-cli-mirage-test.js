import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | module/ember-cli-mirage', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:module/ember-cli-mirage');
    assert.ok(route);
  });
});
