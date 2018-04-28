import Component from '@ember/component';
import Ember from 'ember';
import {computed} from '@ember/object';
import { later } from '@ember/runloop';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';
import Pac from '../models/pac-man';
import SharedStuff from '../mixins/shared-stuff';

export default Component.extend(KeyboardShortcuts, SharedStuff, {
  score: 0,
  levelNumber: 1,
  squareSize: 40,
  grid: [
    [2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [1,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  ],
  directions: {
    up:   {x: 0, y:-1},
    down: {x: 0, y: 1},
    left: {x:-1, y: 0},
    right:{x: 1, y: 0},
    stopped: {x: 0, y: 0}
  },
  isMoving: false,
  ctx: computed(function () {
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    return ctx;
  }),
  screenWidth: computed(function () {
    return this.get('grid.firstObject.length');
  }),
  screenHeight: computed(function () {
    return this.get('grid.length');
  }),
  screenPixelWidth: computed(function () {
    return this.get('screenWidth') * this.get('squareSize');
  }),
  screenPixelHeight: computed(function () {
    return this.get('screenHeight') * this.get('squareSize');
  }),

  didInsertElement(){
    this.movementLoop();
  },

  drawPallet(x, y){
    let radiusDivisor = 6;
    this.drawCircle(x, y, radiusDivisor, 'stopped');
  },

  drawWalls(x, y){
    let squareSize = this.get('squareSize');
    let ctx = this.get('ctx');
    ctx.fillStyle = '#000';

    ctx.fillRect(
      x * squareSize,
      y * squareSize,
      squareSize,
      squareSize
    );
  },

  drawCircle(x, y, radiusDivisor, direction){
    let ctx = this.get('ctx');

    let squareSize = this.get('squareSize');

    let pixelX = (x + 1 / 2 + this.offsetFor('x', direction)) * squareSize;
    let pixelY = (y + 1 / 2 + this.offsetFor('y', direction)) * squareSize;

    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(pixelX, pixelY, squareSize / radiusDivisor, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
  },

  offsetFor(coordinate, direction){
    let frameRatio = this.get('frameCycle') / this.get('framesPerMovement');
    return this.get(`directions.${direction}.${coordinate}`) * frameRatio;
  },

  drawGrid(){
    let grid = this.get('grid');
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
          if(cell === 1){
            this.drawWalls(columnIndex, rowIndex);
          }
          if(cell === 2){
            this.drawPallet(columnIndex, rowIndex);
          }
        }
      );
    })
  },

  clearScreen(){
    let ctx = this.get('ctx');
    ctx.clearRect(0, 0, this.get('screenPixelWidth'), this.get('screenPixelHeight'));
  },

  frameCycle: 1,
  framesPerMovement: 30,

  movementLoop(){
    Ember.Logger.info('movementLoop');
    if(this.get('frameCycle') == this.get('framesPerMovement')){
      let direction = this.get('direction');
      this.set('x', this.nextCoordinate('x', direction));
      this.set('y', this.nextCoordinate('y', direction));

      this.set('frameCycle', 1);

      this.processAnyPellets();
      Pac.changeDirection();
    } else if(this.get('direction')==='stopped') {
      Pac.changeDirection();
    } else {
      this.incrementProperty('frameCycle');
    }

    this.clearScreen();
    this.drawGrid();
    Pac.draw();
    later(this, this.movementLoop, 1000/60);
  },


  processAnyPellets(){
    let x = this.get('x');
    let y = this.get('y');
    let grid = this.get('grid');

    if(grid[y][x] === 2){
      grid[y][x] = 0;
      this.incrementProperty('score')

      if(this.levelComplete()){
        this.incrementProperty('levelNumber');
        this.restartLevel();
      }
    }
  },

  restartLevel(){
    this.set('x',0);
    this.set('y',0);

    let grid = this.get('grid');
    grid.forEach((row, rowIndex)=>{
      row.forEach((cell, columnIndex)=>{
        if(cell===0){
          grid[rowIndex][columnIndex] = 2;
        }
      })
    })
  },

  levelComplete(){
    let hasPelletsLeft = false;
    let grid = this.get('grid');

    grid.forEach((row)=>{
        row.forEach((cell)=>{
          if(cell===2){
            hasPelletsLeft = true;
          }
        })
    });

    return !hasPelletsLeft;
  },

  keyboardShortcuts: {
    up()    {
      Ember.Logger.log('up');
      this.set('intent', 'up');
    },
    down()  {
      Ember.Logger.log('down');
      this.set('intent', 'down');
    },
    left()  {
      Ember.Logger.log('left');
      this.set('intent', 'left');
    },
    right() {
      Ember.Logger.log('right');
      this.set('intent', 'right')
    }
  },

  collidedWithBorder(){
    let x = this.get('x');
    let y = this.get('y');
    let screenHeight = this.get('screenHeight');
    let screenWidth = this.get('screenWidth');

    let pacOutOfBounds = x < 0 || y < 0 || x >= screenWidth || y >= screenHeight;

    return pacOutOfBounds;
  },

  collidedWithWall(){
    let x = this.get('x');
    let y = this.get('y');
    let grid = this.get('grid');

    return grid[y][x] === 1;
  }
});
