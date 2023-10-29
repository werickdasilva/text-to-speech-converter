const synth = window.speechSynthesis

const textArea = document.querySelector('#text')
const speakButton = document.querySelector('#speak-button')
const selectorSpeakVoice = document.querySelector('#selector-speak-voice')

let detector = detect.parse(navigator.userAgent)
if (detector.browser.family == 'Firefox') {
    alert('Firefox audio api  with a somewhat houarse voice')
}

const populateVoiceList = () => {
    const voices = synth.getVoices()
    let dataIndex = 0

    const formatName = (name) => name.replace('+', ' ')
    debugger
    for (voice of voices) {
        debugger
        dataIndex++
        if (dataIndex < 200) {
            const optionVoice = document.createElement('option')

            optionVoice.textContent = `${formatName(voice.name)}`

            optionVoice.setAttribute('data-name', voice.name)

            selectorSpeakVoice.appendChild(optionVoice)
        }
    }
}

populateVoiceList()
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoiceList
}

speakButton.addEventListener('click', () => {
    const voices = synth.getVoices()
    let text = textArea.value
    let utterance = new SpeechSynthesisUtterance(text)
    const selectedOption = selectorSpeakVoice.selectedOptions[0].getAttribute('data-name')

    for (voice of voices) {
        if (voice.name === selectedOption) {
            utterance.voice = voice
        }
    }


    // utterance.pitch = 1
    // utterance.rate = 0.7
    synth.speak(utterance)
    // const selectValue = Number(selectorSpeakVoice.value)
    // const voice = synth.getVoices()[selectValue]

    // utterance.text = text
    // utterance.voice = voice
    // utterance.volume = 0.2

    // synth.speak(utterance)
})