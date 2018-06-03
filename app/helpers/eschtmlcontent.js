import { helper } from '@ember/component/helper';

export function eschtmlcontent(param) {
  return Ember.String.htmlSafe(`<i><b>${param}</b></i>`);
}

export default helper(eschtmlcontent);
