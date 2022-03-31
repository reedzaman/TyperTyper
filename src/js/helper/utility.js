export function calcWPM({ correctLetters, incorrectLetters, wrongKeyStrokes }, time){

    let timeComp = time/60;
    let corrLettersPerMin = (correctLetters / 5) / timeComp;
    let incorrLettersPerMin = (incorrectLetters / 5) / timeComp;
    let wrongKeyStrokesPenalty = ((wrongKeyStrokes - incorrectLetters)/8) / timeComp;

    return Math.round(corrLettersPerMin - incorrLettersPerMin - wrongKeyStrokesPenalty);

}


export function calcAccuracy({ correctLetters, incorrectLetters, wrongKeyStrokes }){
    let totalLetters = correctLetters + incorrectLetters + (wrongKeyStrokes / 3);
    return Number.parseFloat(correctLetters/totalLetters * 100).toFixed(2);
}


export function compStringLetterByLetter(word1, word2){
    let wrongLettersCount = 0;
    let rightLettersCount = 0;
    wrongLettersCount += Math.abs(word1.length - word2.length);

    let searchableLength = (word1.length < word2.length)? word1.length : word2.length;

    for(let i = 0; i < searchableLength; i++){
        if(word1[i] != word2[i]) wrongLettersCount++;
        else rightLettersCount++;
    }

    return [rightLettersCount+1, wrongLettersCount];
}

export default { compStringLetterByLetter, calcWPM, calcAccuracy };
