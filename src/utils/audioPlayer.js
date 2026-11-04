// Real Web Speech API + Web Audio Synthesizer for Vietnamese Regional TTS
let currentUtterance = null;
let audioContext = null;
let synthOscillator = null;
let synthGain = null;

export function playDialectAudio(text, dialectConfig, onStart, onEnd, onError) {
  // Cancel any ongoing audio
  stopDialectAudio();

  let speechStarted = false;

  // 1. Web Speech API (Native Speech Synthesis in Browser)
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      utterance.rate = dialectConfig.rate || 1.0;
      utterance.pitch = dialectConfig.pitch || 1.0;

      // Find Vietnamese voice if available in OS/browser
      const voices = window.speechSynthesis.getVoices();
      const viVoice = voices.find(v => 
        v.lang === 'vi-VN' || 
        v.lang === 'vi_VN' || 
        v.lang.startsWith('vi') || 
        v.name.toLowerCase().includes('vietnam') ||
        v.name.toLowerCase().includes('hoaimy') ||
        v.name.toLowerCase().includes('linh')
      );
      if (viVoice) {
        utterance.voice = viVoice;
      }

      utterance.onstart = () => {
        speechStarted = true;
        if (onStart) onStart();
      };

      utterance.onend = () => {
        stopSynthTone();
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        console.warn('SpeechSynthesis error:', e);
        stopSynthTone();
        if (onEnd) onEnd();
      };

      currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('SpeechSynthesis failed to initialize:', err);
    }
  }

  // 2. Audible Web Audio Synth Accompaniment (Ensures sound is heard even if OS lacks vi-VN voice)
  playSynthTone(dialectConfig.pitch || 1.0);

  if (!speechStarted && onStart) {
    onStart();
  }

  // Fallback safety timeout if speech doesn't trigger onend
  const words = text.split(' ').length;
  const estimatedDurationMs = Math.max(3500, words * 380);
  const timeoutId = setTimeout(() => {
    stopDialectAudio();
    if (onEnd) onEnd();
  }, estimatedDurationMs);

  return timeoutId;
}

export function stopDialectAudio() {
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }
  stopSynthTone();
  currentUtterance = null;
}

function playSynthTone(pitchFactor = 1.0) {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioContext) {
      audioContext = new AudioContextClass();
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    stopSynthTone();

    // Gentle melodious carrier tone for acoustic speech preview
    const baseFreq = 220 * pitchFactor;
    synthOscillator = audioContext.createOscillator();
    synthGain = audioContext.createGain();

    synthOscillator.type = 'triangle';
    synthOscillator.frequency.setValueAtTime(baseFreq, audioContext.currentTime);

    // Subtle pitch vibrato
    synthOscillator.frequency.linearRampToValueAtTime(baseFreq * 1.05, audioContext.currentTime + 0.3);
    synthOscillator.frequency.linearRampToValueAtTime(baseFreq * 0.98, audioContext.currentTime + 0.8);

    synthGain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    synthGain.gain.exponentialRampToValueAtTime(0.04, audioContext.currentTime + 0.1);
    synthGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 2.5);

    synthOscillator.connect(synthGain);
    synthGain.connect(audioContext.destination);

    synthOscillator.start();
    synthOscillator.stop(audioContext.currentTime + 3.0);
  } catch (err) {
    // AudioContext not allowed or muted
  }
}

function stopSynthTone() {
  try {
    if (synthOscillator) {
      synthOscillator.stop();
      synthOscillator.disconnect();
      synthOscillator = null;
    }
    if (synthGain) {
      synthGain.disconnect();
      synthGain = null;
    }
  } catch (e) {}
}
