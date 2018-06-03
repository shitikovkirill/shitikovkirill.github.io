import {helper} from '@ember/component/helper';

export function writinghelper([value]) {
    let var1 = Math.floor(value * 100);
    let cents = value % 100;
    let var3 = '$';
    if (cents.toString().length === 1)
    return `${var3}${var1}`;
}

export default helper(writinghelper);
