/* Removes any highlights from current word and highlights the next one */
export function shiftWordHighlight(wordIndex){

    $($('.word')[wordIndex]).removeClass('currentlyRight');
    $($('.word')[wordIndex]).removeClass('currentlyWrong');
    $($('.word')[wordIndex]).removeClass('currWord')
    $($('.word')[wordIndex + 1]).addClass('currWord')

}

export default { shiftWordHighlight };
