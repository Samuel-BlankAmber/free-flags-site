function playFreeFlagsAudio() {
    const audio = document.getElementById("free-flags-audio");
    audio.play();
}

document.addEventListener("mousedown", playFreeFlagsAudio);
document.addEventListener("keydown", playFreeFlagsAudio);
