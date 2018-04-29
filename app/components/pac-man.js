import Component from '@ember/component';
import Ember from 'ember';
import { later } from '@ember/runloop';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';
import Pac from '../models/pac-man';
import Level from '../models/level';
import SharedStuff from '../mixins/shared-stuff';

export default Component.extend(KeyboardShortcuts, SharedStuff, {
  score: 0,
  levelNumber: 1,
  isMoving: false,

  didInsertElement(){
    let level = Level.create();
    this.set('level', level);

    let pac = Pac.create({
      level: level,
      x: level.get('startingPac.x'),
      y: level.get('startingPac.y'),
    });
    this.set('pac', pac);
    this.loop();
  },

  loop(){
    Ember.Logger.info('loop');
    this.get('pac').move();

    this.processAnyPellets();

    this.clearScreen();
    this.drawGrid();
    this.get('pac').draw();

    later(this, this.loop, 1000/60);
  },

  drawGrid(){
    let grid = this.get('level.grid');
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

  drawWalls(x, y){
    let squareSize = this.get('level.squareSize');
    let ctx = this.get('ctx');
    ctx.fillStyle = '#000';

    ctx.fillRect(
      x * squareSize,
      y * squareSize,
      squareSize,
      squareSize
    );
  },

  drawPallet(x, y){
    let radiusDivisor = 6;
    this.drawCircle(x, y, radiusDivisor, 'stopped');
  },

  clearScreen(){
    let ctx = this.get('ctx');
    ctx.clearRect(0, 0, this.get('level.pixelWidth'), this.get('level.pixelHeight'));
  },

  processAnyPellets(){
    let x = this.get('pac.x');
    let y = this.get('pac.y');
    let grid = this.get('level.grid');

    if(grid[y][x] === 2){
      grid[y][x] = 0;
      this.incrementProperty('score');

      if(this.get('level').isComplete()){
        this.incrementProperty('levelNumber');
        this.restart();
      }
    }
  },

  restart(){
    this.get('pac').restart();
    this.get('level').restart();
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
    let grid = this.get('level.grid');

    return grid[y][x] === 1;
  }
});
