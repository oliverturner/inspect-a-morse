function Recorder(stream) {
  const chunks = [];
  const mr = new MediaRecorder(stream);

  mr.ondataavailable = function(evt) {
    console.log("mediaRecorder.ondataavailable:", evt);

    // push each chunk (blobs) in an array
    chunks.push(evt.data);
  };

  mr.onstop = function(evt) {
    // Make blob out of our blobs, and open it.
    var blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
    console.log("blob", blob);

    // document.querySelector("audio").src = URL.createObjectURL(blob);
  };

  return mr;
}

/**
 * Loop over the output of toMorse, reading level and duration values from tuples
 * @param {[number, number][]} morse
 */
export const playAudio = (morse, rate) => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const ac = new AudioContext();
  const gainNode = ac.createGain();
  const oscillator = ac.createOscillator();
  const dest = ac.createMediaStreamDestination();
  const mr = new Recorder(dest.stream);

  gainNode.connect(ac.destination);
  oscillator.connect(gainNode);
  oscillator.onended = () => {
    console.log("ended!");
    mr.stop();
  };

  let t = 0;
  morse.forEach(([vol, tx]) =>
    gainNode.gain.setValueAtTime(vol, (t += tx / +rate))
  );

  mr.start();
  oscillator.start(0);
  oscillator.stop(ac.currentTime + t);
};
