import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('reddit', {path: 'reddit/:subreddit'});
  this.route('pacman');

  this.route('modules', function() {
    this.route('ember-power-select');
  });
});

export default Router;
