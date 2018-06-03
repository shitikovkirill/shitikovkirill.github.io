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
      this.route('rendering-template');
      this.route('redirecting', function () {
        this.route('target');
      });
      this.route('will-transition');
      this.route('loading-page');
      this.route('query-parameters', function () {
        this.route('specify-query');
        this.route('replace-state');
        this.route('query-param-key');
        this.route('default-values');
        this.route('sticky-query-param');
      })
    });
    this.route('templates',function () {
      this.route('base');
      this.route('conditionals');
      this.route('list');
      this.route('list-in-object');
      this.route('hbs-links',function () {
        this.route('info');
        this.route('record', { path: 'records/:records_id' });
      });
      this.route('hbs-actions')
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
