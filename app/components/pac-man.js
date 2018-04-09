import Component from '@ember/component';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component'

export default Component.extend(KeyboardShortcuts, {
  x: 50,
  y: 100,
  squareSize: 40,
  didInsertElement: function () {
    this.drawCircle();
  },
  drawCircle: function () {
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    let x = this.get('x');
    let y = this.get('y');
    let radius = this.get('squareSize')/2;

    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
  },
  keyboardShortcuts: {
    up: function () {
      console.log('up');
      this.decrementProperty('y', this.get('squareSize'));
      this.drawCircle();

    },
    down: function () {
      console.log('down');
      this.incrementProperty('y', this.get('squareSize'));
      this.drawCircle();

    },
    left: function () {
      console.log('left');
      this.decrementProperty('x', this.get('squareSize'))
      this.drawCircle();

    },
    right: function () {
      console.log('right');
      this.incrementProperty('x', this.get('squareSize'));
      this.drawCircle();
    }
  }
});
