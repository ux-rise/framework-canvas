/**
 * @author Johan R
 */

function startMusic() {
  const seleccion = musicRandom();
  document.getElementById('sounds').onclick = "";
  var audio = document.getElementById('sMusic');
  audio.volume = 0.1;
  var casete = document.getElementById("caseteSound");
  casete.volume = 0.2;
  casete.play();
  if (seleccion == 1) {
    audio.src = "src/sounds/Blue Sky Blues.mp3";
    audio.play();
  }
  if (seleccion == 2) {
    audio.src = "src/sounds/reCreation.mp3";
    audio.play();
  }
  if (seleccion == 3) {
    audio.src = "src/sounds/The Stars Look Different.mp3";
    audio.play();
  }
  if (seleccion == 4) {
    audio.src = "src/sounds/Between Worlds.mp3";
    audio.play();
  }
}

function musicGame() {
  const seleccion = musicRandom();
  document.getElementById('sounds').onclick = "";
  var audio = document.getElementById("sMusic");
  audio.volume = 0.1;
  var casete = document.getElementById("caseteSound");
  casete.volume = 0.2;
  casete.play();
  if (seleccion == 1) {
    audio.src = "sounds/yellow.mp3";
    audio.play();
  }
  if (seleccion == 2) {
    audio.src = "sounds/Millennials.mp3";
    audio.play();
  }
  if (seleccion == 3) {
    audio.src = "sounds/Spinnin.mp3";
    audio.play();
  }
  if (seleccion == 4) {
    audio.src = "sounds/Sudden Goodbye.mp3";
    audio.play();
  }
}

function buttonSound() {
  var aud = document.getElementById("bSound");
  aud.autoplay = true;
  aud.volume = 0.2;
  aud.load();
}

function lossOfLife() {
  var aud = document.getElementById("effects");
  aud.src = "sounds/lifes.mp3#t=,1";
  aud.autoplay = true;
  aud.volume = 0.1;
  aud.load();
}

function clockSound() {
  var aud = document.getElementById("effects");
  aud.src = "sounds/clock.mp3#t=,2.5";
  aud.autoplay = true;
  aud.volume = 0.1;
  aud.load();
}

function musicRandom() {
  return Math.floor((Math.random() * 4) + 1);
}

//En duda por posibles molestias
function crunchSound() {
  var aud = document.getElementById("effects");
  aud.src = "sounds/crunch.mp3";
  aud.autoplay = true;
  aud.volume = 0.1;
  aud.load();
}
//-------