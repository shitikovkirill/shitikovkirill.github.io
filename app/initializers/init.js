export function initialize(app) {
  //injecting the 'start' property into the component
  app.inject('component', 'start', 'service:message');
}

export default {
  //initializer name
  name: 'init',
  initialize: initialize
};
