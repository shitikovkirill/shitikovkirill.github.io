import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('youtube', function () {
    this.route('reddit', {path: 'reddit/:subreddit'});
  });

  this.route('book', function () {
    this.route('pacman');
  });

  this.route('tutorial', function () {
    this.route('objects', function () {
      this.route('classes-and-instances');
      this.route('reopen');
      this.route('chaining-computed-properties');
      this.route('setting-computed-properties');
      this.route('computed-aggregate');
      this.route('observer-asynchrony');
      this.route('object-model-bindings');

    });
    this.route('routes', function () {
      this.route('multiple-model');
    });
  });

  this.route('modules', function () {
    this.route('ember-power-select');
    this.route('ember-cli-mirage', function () {
      this.route('authors');
    });
  });
});

export default Router;
