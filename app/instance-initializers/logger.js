//Application instance initializers run as an application instance is loaded
export function initialize(applicationInstance) {
  var logger = applicationInstance.lookup('logger:main');

  //it indicates that instance has booted at console log
  logger.log('Hello...This message is from an instance-initializer!');
}

export default {
  //it is an instance initializer name
  name: 'logger',
  initialize: initialize
};
