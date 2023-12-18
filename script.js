const selectTags   = document.querySelectorAll('select');
const translateBtn = document.querySelector('#translateBtn')
const speakBtn = document.querySelector('#speakBtn')

selectTags.forEach((tag,id) => {
    for(let country_code in countries) {
        let selected = id === 0 ? (country_code === "en" ? "selected" : "") : (country_code === "es" ? "selected" : "");

        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`

        tag.insertAdjacentHTML("beforeend", option)
    }
})

translateBtn.addEventListener('click',translatePhrase)

function translatePhrase() {
    const text          = document.querySelector('#inputText')
    const translateFrom = document.querySelector('#translateFrom')
    const translateTo   = document.querySelector('#translateTo')

    translateText(text,translateFrom,translateTo)
}

function translateText(text,translateFrom,translateTo) {
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.value)}&langpair=${translateFrom.value}|${translateTo.value}`;
    let outputText = document.querySelector('#outputText')

fetch(apiUrl).then(response => response.json()).then(data=> {
    if(data.responseData) {

        const translatedText = data.responseData.translatedText; 
        const formattedText  = removeQuestionMarks(translatedText)

        outputText.innerText = formattedText
        
    } else {
        outputText.innerText = "Error: Could Not Translate!"
    }
}).catch(error => {
    console.error('Error:', error)
    outputText.innerText = "Error: An error occured while translating!"
})

}

function removeQuestionMarks(text) {
    return text.replace(/^¿+|¿+$/g, '');
}

function speakText(text) {
    const translateTo   = document.querySelector('#translateTo')

    const speechSynthesis = window.speechSynthesis;
    const speechUtterance = new SpeechSynthesisUtterance(text)
    speechUtterance.lang = translateTo.value

    speechSynthesis.speak(speechUtterance)
}
speakBtn.addEventListener('click',speakFuntionality)


function speakFuntionality() {
    const translatedText = document.querySelector('#outputText').innerText


    speakText(translatedText)
}