import { init } from './init.js';
import { drawReport } from '../view/draw.js';
import { calcWPM, calcAccuracy} from './utility.js';
import { newSetup, setup } from './setup.js';
import { classifyWord } from './wordClassifier.js';
import { shiftWordHighlight } from './wordHighlighter.js';
import { instantSpellCheck, lineBreakCheck, uncorrectedLettersCheck } from './checkFunctions.js';

export function resetTest(){
    newSetup(setup);
}

export function concludeTest(){

    clearTimeout(setup.timer);
    
    $("#info").slideDown();

    setup.wpm = calcWPM(setup, setup.testTime);
    setup.accuracy = calcAccuracy(setup);
    setup.lastTestResult = setup.wpm;

    $('#inp').val('');
    $('#inp').attr('disabled', '');
    
    //$('#reset').focus();
    $('#inp').attr('placeholder', 'Tab + ↵ or Reset To Start New Test');
    
    let canvas = document.getElementById("log");
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawReport(setup);
}

export function handleTest(currInput){

    // Initializes test. Takes care of the timer. Ends ( concludes ) the test automatically after certein amount of time.
    init(setup);
    
    $("#info").slideUp();

    // Empty spaces do not count
    if(currInput === ' ' || currInput === '\n') return $("#inp").val('');

    // If space bar was pressed ( Whole word is submitted )
    if(currInput[currInput.length - 1] === ' ' || currInput[currInput.length -1] === "\n"){

         console.log("space bar pressed")

        // Clears the prevInput
        setup.prevInput = '';

        // Checks if end of line is reached.
        // If so, words container is lifted by certein amount of pixels to bring the
        // new line to the top.
        lineBreakCheck(setup);

        // Removes current word highlight and puts it to the next ( new current word ) one
        shiftWordHighlight(setup.currWordIndex);

        currInput = currInput.trim();

        // Checks how many letters are in correct position
        uncorrectedLettersCheck(currInput, setup);

        // Classifies the word based on currectness
        classifyWord(setup, currInput);
   
        $("#inp").val('');
        setup.currWordIndex++;


        console.log(setup.wpmList);

    } else {
    
        // Instantaniously checks if till now the word is correct.
        // If not it makes the current word red. Indicating Currently input has some error.
        instantSpellCheck(currInput, setup);

    }

}

resetTest();

export default { handleTest, resetTest, concludeTest };
