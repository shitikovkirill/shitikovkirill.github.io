import Component from '@ember/component';
import Ember from 'ember';
import {computed} from '@ember/object';
import { isEmpty } from '@ember/utils';
import { later } from '@ember/runloop';
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
  directions: {
    up:   {x: 0, y:-1},
    down: {x: 0, y: 1},
    left: {x:-1, y: 0},
    right:{x: 1, y: 0},
    stopped: {x: 0, y: 0}
  },
  isMoving: false,
  direction: 'down',
  intent: 'down',
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

  drawPac(){
    let x = this.get('x');
    let y = this.get('y');
    let radiusDivisor = 2;
    this.drawCircle(x, y, radiusDivisor, this.get('direction'));
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

  movePacMan(direction){
    let inputBlocked = this.get('isMoving') || this.pathBlockedInDirection(direction);
    Ember.Logger.info(`inputBlocked: ${inputBlocked}`);
    if(!inputBlocked){
      this.set('direction', direction);
      this.set('isMoving', true);
      this.movementLoop();
    }
  },

  frameCycle: 1,
  framesPerMovement: 30,

  movementLoop(){
    if(this.get('frameCycle') == this.get('framesPerMovement')){
      let direction = this.get('direction');
      this.set('x', this.nextCoordinate('x', direction));
      this.set('y', this.nextCoordinate('y', direction));

      this.set('isMoving', false);
      this.set('frameCycle', 1);

      this.processAnyPellets();
    } else {
      this.incrementProperty('frameCycle');
      later(this, this.movementLoop, 1000/60);
    }

    this.clearScreen();
    this.drawGrid();
    this.drawPac();
  },

  nextCoordinate(coordinate, direction){
    return this.get(coordinate) + this.get(`directions.${direction}.${coordinate}`);
  },

  pathBlockedInDirection(direction){
    let cellTypeInDirection = this.cellTypeInDirection(direction);
    Ember.Logger.info(`cellTypeInDirection: ${cellTypeInDirection}`);
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
    up()    { this.set('intent', 'up') },
    down()  { this.set('intent', 'down') },
    left()  { this.set('intent', 'left') },
    right() { this.set('intent', 'right') }
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
