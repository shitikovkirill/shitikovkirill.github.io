import Service from '@ember/service';

export default Service.extend({
  isAuthenticated: true,
  //after clicking the button, 'thisistest()' triggers and display the below text
  thisistest: function () {
    return "Welcome to Tutorialspoint!!!";
  }
});
