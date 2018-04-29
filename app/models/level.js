import {computed} from '@ember/object';
import Object from '@ember/object';

export default Object.extend({
  grid: [
    [2,2,2,2,],
    [2,2,2,2,],
    [2,2,2,2,],
    [2,2,2,1,],
  ],

  squareSize: 40,

  startingPac:{
    x: 2,
    y: 1,
  },

  width: computed(function () {
    return this.get('grid.firstObject.length');
  }),
  height: computed(function () {
    return this.get('grid.length');
  }),
  pixelWidth: computed(function () {
    return this.get('width') * this.get('squareSize');
  }),
  pixelHeight: computed(function () {
    return this.get('height') * this.get('squareSize');
  }),

  isComplete(){
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

  restart(){
    let grid = this.get('grid');
    grid.forEach((row, rowIndex)=>{
      row.forEach((cell, columnIndex)=>{
        if(cell===0){
          grid[rowIndex][columnIndex] = 2;
        }
      })
    })
  },
})
