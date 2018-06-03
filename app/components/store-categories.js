import Component from '@ember/component';

export default Component.extend({
  willRender() {
    this.set('typesOfvehicles', {
      'Cars': ['Ferrari', 'Audi', 'BMW'],
      'Motor bikes': ['Harley-Davidson', 'Yamaha','Honda']
    });
  }
});
