import getText from './text.js';
import { clearText, renderText } from '../view/textRenderer.js';

export let setup = {
    accuracy: 0.0,
    wordList: [],
    correctWords: 0,
    incorrectWords: 0,
    prevInput: '',
    keyStrokes: 0,
    totalLetters: 0,
    correctLetters: 0,
    incorrectLetters: 0,
    wrongKeyStrokes: 0,
    uncorrectedLetters: 0,
    currWordIndex: 0,
    lastTestResult: 0,  
    testRunning: false,
    timer: undefined,
    testTime: 30,
    wpm: 0,
    wpmList: []
}

function clearSetup(setup){

    clearTimeout(setup.timer);

    // Clearing the setup data
    setup.accuracy = 0.0;
    setup.wordList = [];
    setup.correctWords = 0;
    setup.incorrectWords = 0;
    setup.prevInput = '';
    setup.keyStrokes = 0;
    setup.totalLetters = 0;
    setup.correctLetters = 0;
    setup.incorrectLetters = 0;
    setup.wrongKeyStrokes = 0;
    setup.uncorrectedLetters = 0;
    setup.currWordIndex = 0;
    setup.testRunning = false;
    setup.timer = undefined;
    setup.testTime = 30;
    setup.wpmList = [];
     
}

export function newSetup(setup){

    const text = getText();

    clearSetup(setup);
    
    clearText();

    // Gets all the test words and puts it in the wordList array
    //text.split(' ').forEach(word => setup.wordList.push(word));
    text.forEach(word => setup.wordList.push(word));

    renderText(text);
    $($('.word')[0]).addClass('currWord');
    $('#text').css('top', '0px');
    $('#timer').html(setup.testTime);
    $('#inp').val(''); 
    $('#inp').removeAttr('disabled');
    $('#inp').attr('placeholder', 'Type to start');
    $('#inp').focus();
    $('#report').css('display', 'none');
    $('#text').css('display', 'block');


};

export default { newSetup, setup }
