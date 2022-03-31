const textBox = document.getElementById('text');

export function clearText(){
    $(textBox).html('');
}

export function renderText(text){
    let lettersCount = 0;
    text.forEach( word =>{
        const wordElement = document.createElement('span');
        wordElement.innerText = word;
        $(wordElement).addClass('word');

        if(lettersCount > 35){
            lettersCount = 0;
            wordElement.innerText = wordElement.innerText + ' ';
        }else{
            lettersCount += wordElement.innerText.length + 1;
        }
        textBox.appendChild(wordElement);
    });
}

export default { clearText, renderText }
