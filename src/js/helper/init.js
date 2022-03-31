import { timeCheck } from './checkFunctions.js';

export function init(setup){

    if(setup.testRunning) return ;
    setup.testRunning = true;
    timeCheck(setup);
    $('#inp').attr('placeholder', '');

}

export default { init };
