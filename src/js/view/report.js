export function showReport(setup){

    $('#report-wpm').text(setup.wpm);
    $('#report-correct').text(setup.correctWords);
    $('#report-incorrect').text(setup.incorrectWords);
    $('#report-correctLetters').text(setup.correctLetters);
    $('#report-incorrectLetters').text(setup.incorrectLetters);
    $('#report-accuracy').text(setup.accuracy);
    $('#report-lastTest').text(setup.lastTestResult);

    $('#report').css('display', 'flex');
    $('#text').css('display', 'none');

}

export default { showReport };
