/**
 * Loop over the output of toMorse, reading level and duration values from tuples
 * @param {[number, number][]]} morse
 */
export const playAudio = morse => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const ac = new AudioContext();
  const gainNode = ac.createGain();
  const oscillator = ac.createOscillator();


  /*
  const dest = ac.createMediaStreamDestination();
  const mediaRecorder = new MediaRecorder(dest.stream);

  const chunks = [];
  mediaRecorder.ondataavailable = function(evt) {
    console.log("evt", evt);

    // push each chunk (blobs) in an array
    chunks.push(evt.data);
  };

  mediaRecorder.onstop = function(evt) {
    // Make blob out of our blobs, and open it.
    var blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
    console.log("blob", blob);

    // document.querySelector("audio").src = URL.createObjectURL(blob);
  };
  */

  gainNode.connect(ac.destination);
  oscillator.connect(gainNode);

  let t = 0;
  morse.forEach(([vol, tx]) => gainNode.gain.setValueAtTime(vol, (t += tx)));

  // mediaRecorder.start();
  oscillator.onended = () => {
    console.log("ended!");
    // mediaRecorder.stop();
  };
  oscillator.start(0);
  oscillator.stop(ac.currentTime + t);
};