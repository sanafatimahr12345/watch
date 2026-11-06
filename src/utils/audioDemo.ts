/**
 * Audiophile Audio Signature Simulator
 * Uses Web Audio API to generate a warm, studio-grade harmonic chord
 * with spatial panning and smooth gain ramps.
 */

let audioCtx: AudioContext | null = null;

export function playAudiophileChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;
    const masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.exponentialRampToValueAtTime(0.18, now + 0.08);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);
    masterGain.connect(audioCtx.destination);

    // Warm pentatonic harmonic chord: F3, C4, F4, A4, C5 (432Hz harmonic tuned)
    const frequencies = [172.8, 259.2, 345.6, 432.0, 518.4];

    frequencies.forEach((freq, idx) => {
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const noteGain = audioCtx.createGain();

      // Sine wave with gentle warm harmonics
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Slight detune for spatial stereo warmth
      osc.detune.setValueAtTime((idx - 2) * 4, now);

      noteGain.gain.setValueAtTime(0.25 / frequencies.length, now);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8 + idx * 0.1);

      osc.connect(noteGain);
      noteGain.connect(masterGain);

      osc.start(now + idx * 0.04);
      osc.stop(now + 2.4);
    });
  } catch (e) {
    console.warn('Audio demo not supported or user gesture blocked:', e);
  }
}
