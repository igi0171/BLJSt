let audioContext;
let samples;
const playNewWaveKit = document.querySelector(".play-new-wave-kit");
const playSynthOrgan = document.querySelector(".play-synth-organ");

const samplePaths = ["./audio/new-wave-kit.ogg", "./audio/synth-organ.ogg"];

audioContext = new AudioContext();
console.log("Audio Context Started");

setupSamples(samplePaths).then((response) => {
  samples = response;
  console.log(samples);
  playNewWaveKit.addEventListener("click", () => {
    audioContext.close();
    audioContext = new AudioContext();
    const playing = playSample(samples[0], 0);
    console.log(playing);
  });
  playSynthOrgan.addEventListener("click", () => {
    audioContext.close();
    audioContext = new AudioContext();
    const playing = playSample(samples[1], 0);
    console.log(playing);
  });
});

async function getFile(filePath) {
  const response = await fetch(filePath);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return audioBuffer;
}

async function setupSamples(paths) {
  console.log("Setting up samples");
  const audioBuffers = [];

  for (const path of paths) {
    const sample = await getFile(path);
    audioBuffers.push(sample);
  }
  console.log("Setting up done");
  return audioBuffers;
}

function playSample(audioBuffer, time) {
  const sampleSource = audioContext.createBufferSource();
  sampleSource.buffer = audioBuffer;
  sampleSource.connect(audioContext.destination);
  sampleSource.start(time);
  return sampleSource;
}
