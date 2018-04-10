import Component from '@ember/component';
import Ember from 'ember';
import {computed} from '@ember/object';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component'

export default Component.extend(KeyboardShortcuts, {
  x: 1,
  y: 2,
  squareSize: 40,
  screenWidth: 20,
  screenHeight: 15,
  ctx: computed(function () {
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    return ctx;
  }),
  screenPixelWidht: computed(function () {
    return this.get('screenWidth') * this.get('squareSize');
  }),
  screenPixelHeight: computed(function () {
    return this.get('screenHeight') * this.get('squareSize');
  }),
  didInsertElement: function () {
    this.drawCircle();
  },
  drawCircle: function () {
    let ctx = this.get('ctx');
    let x = this.get('x');
    let y = this.get('y');
    let squareSize = this.get('squareSize');

    let pixelX = (x + 1 / 2) * squareSize;
    let pixelY = (y + 1 / 2) * squareSize;

    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(pixelX, pixelY, squareSize / 2, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
  },
  clearScreen: function () {
    let ctx = this.get('ctx');
    ctx.clearRect(0, 0, this.get('screenPixelWidth'), this.get('screenPixelHeight'));
  },
  movePacMan: function (direction, amount) {
    this.incrementProperty(direction, amount);

    if(this.collidedWithBorder()){
      this.decrementProperty(direction, amount);
    }

    this.clearScreen();
    this.drawCircle();
  },
  keyboardShortcuts: {
    up: function () {
      Ember.Logger.log('up');
      this.movePacMan('y', -1);
    },
    down: function () {
      Ember.Logger.log('down');
      this.movePacMan('y', 1);
    },
    left: function () {
      Ember.Logger.log('left');
      this.movePacMan('x', -1);
    },
    right: function () {
      Ember.Logger.log('right');
      this.movePacMan('x', 1);
    }
  },
  collidedWithBorder: function(){
    let x = this.get('x');
    let y = this.get('y');
    let screenHeight = this.get('screenHeight');
    let screenWidth = this.get('screenWidth');

    let pacOutOfBounds = x < 0 || y < 0 || x >= screenWidth || y >= screenHeight;

    return pacOutOfBounds;
  }
});
