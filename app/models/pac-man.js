import Ember from 'ember';
import SharedStuff from '../mixins/shared-stuff';
import { isEmpty } from '@ember/utils';

export default Ember.Object.extend(SharedStuff, {
  direction: 'down',
  intent: 'down',

  x: 1,
  y: 2,

  draw(){
    let x = this.get('x');
    let y = this.get('y');
    let radiusDivisor = 2;
    this.drawCircle(x, y, radiusDivisor, this.get('direction'));
  },

  changeDirection(){
    let intent = this.get('intent');
    if(this.pathBlockedInDirection(intent)){
      this.set('direction', 'stopped');
    } else {
      this.set('direction', intent);
    }
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

  nextCoordinate(coordinate, direction){
    return this.get(coordinate) + this.get(`directions.${direction}.${coordinate}`);
  },
})
