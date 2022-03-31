import { concludeTest } from './test.js';
import { calcWPM } from './utility.js';
import { showReport } from '../view/report.js';
import { compStringLetterByLetter } from './utility.js';

export function timeCheck(setup){
    let initialTime = new Date();
    setup.timer = setInterval(() => {
        const time = setup.testTime - Math.round((new Date() - initialTime)/1000)

        if(!(time%2)) setup.wpmList.push(calcWPM(setup, setup.testTime - time));

        $('#timer').text(time);
        if(time <= 0){
            concludeTest(setup);
            showReport(setup);
        } 
    }, 1000)
}

export function instantSpellCheck(currInput, setup){

    // If letter incresed, it gets counted as keyStroke. 
    // It isn't right keyStrokes but total keyStrokes. Hence not inside of the if statement bound.
    if(setup.prevInput.length < currInput.length) setup.keyStrokes++;

    if(currInput === setup.wordList[setup.currWordIndex].slice(0, currInput.length)){
        $($('.word')[setup.currWordIndex]).removeClass('currentlyWrong');
    }else{
        $($('.word')[setup.currWordIndex]).addClass('currentlyWrong');
        if(setup.prevInput.length < currInput.length) setup.wrongKeyStrokes += 1;
    } 

    setup.prevInput = currInput; 
}

export function lineBreakCheck({ currWordIndex }){
    // finding the next word that will be heighlighted. If it exists in the next line, next row comes on top
    let nextHighlight = document.getElementsByClassName('word')[currWordIndex + 1];

    // text-wrapper's top will be compare with the next 
    // words top to find out if the next word lies on the next line 
    let textWrapper = document.getElementsByClassName('text-wrapper')[0];

    // finding both tops
    let textWrapperTop = textWrapper.getBoundingClientRect().top;
    let nextHighlightTop = nextHighlight.getBoundingClientRect().top;


    // if next word lies on next line, whole text is pushed to top a certein ammount
    // to emulate a new line
    if(nextHighlightTop - textWrapperTop > 5){
        let top = parseInt($('#text').css('top'));
        $('#text').css('top', `${top - 36}px`);
        console.log("new line..");
    }
}

export function uncorrectedLettersCheck(input, setup){
    let [rightLettersCount, wrongLettersCount] = compStringLetterByLetter(input, setup.wordList[setup.currWordIndex])
    setup.correctLetters += rightLettersCount;
    setup.incorrectLetters += wrongLettersCount;
}

export default { timeCheck, instantSpellCheck, lineBreakCheck, uncorrectedLettersCheck };
