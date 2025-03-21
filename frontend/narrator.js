const audioCount = 5;

function playFreeFlagsAudio() {
    const audio = document.getElementById("free-flags-audio");
    audio.src = `sounds/freeflags${Math.round(Math.random() * audioCount) + 1}.mp3`;
    audio.play();
}

document.addEventListener("mousedown", playFreeFlagsAudio);
document.addEventListener("keydown", playFreeFlagsAudio);
