const audioCount = 6;
let lastPlayedIndex = -1;

function playFreeFlagsAudio() {
    const audio = document.getElementById("free-flags-audio");
    audio.play();
    audio.removeEventListener("ended", changeAudioSrc);
    audio.addEventListener("ended", changeAudioSrc);
}

function changeAudioSrc() {
    const audio = document.getElementById("free-flags-audio");
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * (audioCount - 1)) + 1;
    } while (newIndex === lastPlayedIndex);
    lastPlayedIndex = newIndex;
    audio.src = `sounds/freeflags${newIndex}.mp3`;
}

document.addEventListener("mousedown", playFreeFlagsAudio);
document.addEventListener("keydown", playFreeFlagsAudio);
