export function classifyWord(setup, currInput){

    /* Colors the word text based on correctness */
    if(setup.wordList[setup.currWordIndex] === currInput){
        $($(".word")[setup.currWordIndex]).addClass('correct');
        setup.correctWords++;
    }else{
        $($(".word")[setup.currWordIndex]).addClass('incorrect');
        setup.incorrectWords++;
    }

    setup.totalLetters += setup.wordList[setup.currWordIndex].length;

} 

export default { classifyWord };
