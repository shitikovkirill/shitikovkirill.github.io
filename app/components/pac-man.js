import Component from '@ember/component';
import Ember from 'ember';
import {computed} from '@ember/object';
import { isEmpty } from '@ember/utils';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component'

export default Component.extend(KeyboardShortcuts, {
  score: 0,
  levelNumber: 1,
  x: 1,
  y: 2,
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
  didInsertElement: function () {
    this.drawGrid();
    this.drawPac();
  },
  drawPac(){
    let x = this.get('x');
    let y = this.get('y');
    let radiusDivisor = 2;
    this.drawCircle(x, y, radiusDivisor);
  },
  drawPallet(x, y) {
    let radiusDivisor = 6;
    this.drawCircle(x, y, radiusDivisor);
  },
  drawWalls(x, y) {
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
  drawCircle: function (x, y, radiusDivisor) {
    let ctx = this.get('ctx');

    let squareSize = this.get('squareSize');

    let pixelX = (x + 1 / 2) * squareSize;
    let pixelY = (y + 1 / 2) * squareSize;

    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(pixelX, pixelY, squareSize / radiusDivisor, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
  },
  drawGrid: function(){
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

  clearScreen: function () {
    let ctx = this.get('ctx');
    ctx.clearRect(0, 0, this.get('screenPixelWidth'), this.get('screenPixelHeight'));
  },

  movePacMan: function (direction) {
    if(!this.pathBlockedInDirection(direction)){
      this.set('x', this.nextCoordinate('x', direction));
      this.set('y', this.nextCoordinate('y', direction));

      this.processAnyPellets();
    }

    this.clearScreen();
    this.drawPac();
    this.drawGrid();
  },
  nextCoordinate(coordinate, direction){
    return this.get(coordinate) + this.get(`direction.${direction}.${coordinate}`);
  },
  pathBlockedInDirection(direction){
    let cellTypeInDirection = this.cellTypeInDirection(direction);
    return isEmpty(cellTypeInDirection) || cellTypeInDirection === 1;
  },
  cellTypeInDirection(direction){
    let nextY = this.nextCoordinate('y', direction);
    let nextX = this.nextCoordinate('x', direction);

    return this.get(`grid.${nextY}.${nextX}`);
  },
  processAnyPellets(){
    let x = this.get('x');
    let y = this.get('y');
    let grid = this.get('grid');

    if(grid[y][x] == 2){
      grid[y][x] = 0;
      this.incrementProperty('score')

      if(this.levelComplete()){
        this.incrementProperty('levelNumber');
        this.restartLevel();
      }
    }
  },
  restartLevel: function(){
    this.set('x',0);
    this.set('y',0);

    let grid = this.get('grid');
    grid.forEach((row, rowIndex)=>{
      row.forEach((cell, columnIndex)=>{
        if(cell==0){
          grid[rowIndex][columnIndex] = 2;
        }
      })
    })
  },
  levelComplete: function(){
    let hasPelletsLeft = false;
    let grid = this.get('grid');

    grid.forEach((row)=>{
        row.forEach((cell)=>{
          if(cell==2){
            hasPelletsLeft = true;
          }
        })
    });

    return !hasPelletsLeft;
  },
  direction: {
    up:   {x: 0, y:-1},
    down: {x: 0, y: 1},
    left: {x:-1, y: 0},
    right:{x: 1, y: 0},
    stopped: {x: 0, y: 0}
  },
  keyboardShortcuts: {
    up: function () {
      Ember.Logger.log('up');
      this.movePacMan('up');
    },
    down: function () {
      Ember.Logger.log('down');
      this.movePacMan('down');
    },
    left: function () {
      Ember.Logger.log('left');
      this.movePacMan('left');
    },
    right: function () {
      Ember.Logger.log('right');
      this.movePacMan('right');
    }
  },
  collidedWithBorder: function(){
    let x = this.get('x');
    let y = this.get('y');
    let screenHeight = this.get('screenHeight');
    let screenWidth = this.get('screenWidth');

    let pacOutOfBounds = x < 0 || y < 0 || x >= screenWidth || y >= screenHeight;

    return pacOutOfBounds;
  },
  collidedWithWall: function () {
    let x = this.get('x');
    let y = this.get('y');
    let grid = this.get('grid');

    return grid[y][x] == 1
  }
});
