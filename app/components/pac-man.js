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
  clearScreen: function () {
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    let screenWidth = 800;
    let screenHeight = 600;

    ctx.clearRect(0, 0, screenWidth, screenHeight);
  },
  movePacMan: function (direction, amount) {
    this.incrementProperty(direction, amount);
    this.clearScreen();
    this.drawCircle();
  },
  keyboardShortcuts: {
    up: function () {
      console.log('up');
      this.movePacMan('y', -1 * this.get('squareSize'));
    },
    down: function () {
      console.log('down');
      this.movePacMan('y', this.get('squareSize'));
    },
    left: function () {
      console.log('left');
      this.movePacMan('x', -1 * this.get('squareSize'));
    },
    right: function () {
      console.log('right');
      this.movePacMan('x', this.get('squareSize'));
    }
  }
});
