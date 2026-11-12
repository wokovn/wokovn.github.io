// Lightweight Web Audio API micro-interaction synthesizer (zero external assets)

class SoundEngine {
  constructor() {
    this.enabled = false;
    this.ctx = null;
  }

  setEnabled(val) {
    this.enabled = Boolean(val);
    if (this.enabled) {
      this.playSwitch(true);
    }
  }

  getContext() {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  playTick(freq = 680, duration = 0.025) {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.6, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.035, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  }

  playSwitch(on = true) {
    if (!this.enabled && !on) return;
    const ctx = this.getContext();
    if (!ctx) return;
    const base = on ? 520 : 360;
    const end = on ? 880 : 240;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(base, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(end, ctx.currentTime + 0.045);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  }

  playSuccess() {
    if (!this.enabled) return;
    this.playTick(587.33, 0.06);
    setTimeout(() => this.playTick(880, 0.09), 55);
  }
}

export const sfx = new SoundEngine();

