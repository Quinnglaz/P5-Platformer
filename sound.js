let sound;
let button;

function preload() {
  soundFormats('ogg'); // Specify the format of the sound file
  sound = loadSound('Jump.ogg'); // Load the sound file
}

function keyPressed() {
  playSound();
  // Check if the "Arrow Up" key is pressed and the button is selected
  if (keyCode === UP_ARROW) {
    playSound(); // Call playSound function when the "Arrow Up" key is pressed and the button is selected
  }
}

function playSound() {
  if (sound.isPlaying()) { // Check if the sound is already playing
    sound.stop(); // If it's playing, stop it
  }
  sound.play(); // Play the sound
}




