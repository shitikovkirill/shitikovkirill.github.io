import Component from '@ember/component';
import Ember from 'ember';
import {computed} from '@ember/object';
import { later } from '@ember/runloop';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';
import Pac from '../models/pac-man';
import SharedStuff from '../mixins/shared-stuff';

export default Component.extend(KeyboardShortcuts, SharedStuff, {
  didInsertElement(){
    let pac = Pac.create();
    this.set('pac', pac);
    this.movementLoop();
  },

  score: 0,
  levelNumber: 1,
  isMoving: false,

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

  drawPallet(x, y){
    let radiusDivisor = 6;
    this.drawCircle(x, y, radiusDivisor, 'stopped');
  },

  clearScreen(){
    let ctx = this.get('ctx');
    ctx.clearRect(0, 0, this.get('screenPixelWidth'), this.get('screenPixelHeight'));
  },

  movementLoop(){
    Ember.Logger.info('movementLoop');
    if(this.get('pac.frameCycle') == this.get('pac.framesPerMovement')){
      let direction = this.get('pac.direction');
      this.set('pac.x', this.get('pac').nextCoordinate('x', direction));
      this.set('pac.y', this.get('pac').nextCoordinate('y', direction));

      this.set('pac.frameCycle', 1);

      this.processAnyPellets();
      this.get('pac').changeDirection();
    } else if(this.get('pac.direction')==='stopped') {
      this.get('pac').changeDirection();
    } else {
      this.incrementProperty('pac.frameCycle');
    }

    this.clearScreen();
    this.drawGrid();
    this.get('pac').draw();
    later(this, this.movementLoop, 1000/60);
  },


  processAnyPellets(){
    let x = this.get('pac.x');
    let y = this.get('pac.y');
    let grid = this.get('grid');

    if(grid[y][x] === 2){
      grid[y][x] = 0;
      this.incrementProperty('score');

      if(this.levelComplete()){
        this.incrementProperty('levelNumber');
        this.restartLevel();
      }
    }
  },

  restartLevel(){
    this.set('pac.x',0);
    this.set('pac.y',0);

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
      this.set('pac.intent', 'up');
    },
    down()  {
      Ember.Logger.log('down');
      this.set('pac.intent', 'down');
    },
    left()  {
      Ember.Logger.log('left');
      this.set('pac.intent', 'left');
    },
    right() {
      Ember.Logger.log('right');
      this.set('pac.intent', 'right')
    }
  },

  collidedWithBorder(){
    let x = this.get('pac.x');
    let y = this.get('pac.y');
    let screenHeight = this.get('screenHeight');
    let screenWidth = this.get('screenWidth');

    let pacOutOfBounds = x < 0 || y < 0 || x >= screenWidth || y >= screenHeight;

    return pacOutOfBounds;
  },

  collidedWithWall(){
    let x = this.get('pac.x');
    let y = this.get('pac.y');
    let grid = this.get('pac.grid');

    return grid[y][x] === 1;
  }
});
