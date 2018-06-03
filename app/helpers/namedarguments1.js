import { helper } from '@ember/component/helper';
import Ember from 'ember';

export function namedarguments1(params, args) {
  Ember.Logger.log(args);
  if (args){
    return 'You get args: '+ args.option1 + ' ' + args.option2;
  }
  return 'You get params: '+params;
}

export default helper(namedarguments1);
