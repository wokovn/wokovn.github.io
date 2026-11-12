import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AudioWaveform,
  ExternalLink,
  Layers,
  Pause,
  Play,
  Volume2
} from 'lucide-react';
import { GithubIcon } from '../Icons';
import { SpotlightBentoCard } from '../MotionPrimitives';
import { sfx } from '../../utils/sfx';

const STAGES = [
  {
    id: 0,
    step: '01. CRAWLER',
    title: 'Multi-Source News Scraping',
    tech: 'Brave Search API + Puppeteer',
    latency: '~1.1s',
    payload: '{ "source": "vnexpress.net", "domClean": true, "tokens": 1420 }',
    desc: 'Fetches live articles cleanly via Brave Search + headless Puppeteer fallback, stripping ads and navigation boilerplate.'
  },
  {
    id: 1,
    step: '02. LLM SUMMARY',
    title: 'Context-Aware Structuring',
    tech: 'Gemini API (Structured JSON)',
    latency: '~0.9s',
    payload: '{ "summary": "3 concise sentences", "normalizedNumbers": true }',
    desc: 'Produces concise structured briefs and normalizes dates, units, and abbreviations prior to Vietnamese speech inference.'
  },
  {
    id: 2,
    step: '03. NEURAL TTS',
    title: 'VieNeu-TTS Dialect Synthesis',
    tech: 'Async Job Polling · CUDA GPU',
    latency: 'Non-blocking',
    payload: '{ "model": "VieNeu-TTS phase3_best", "corpusHours": 27.1, "pairs": 14475 }',
    desc: 'Trained across 27.1h Vietnamese speech (14,475 audio-text pairs). Uses job-based polling so Node.js HTTP requests never time out.'
  },
  {
    id: 3,
    step: '04. EDGE CDN',
    title: 'FFmpeg Transcode & Delivery',
    tech: 'WAV → MP3 64kbps + Supabase',
    latency: '-78% bandwidth',
    payload: '{ "codec": "mp3", "bitrate": "64kbps", "bucket": "tts_audio" }',
    desc: 'Compresses raw neural WAV output via FFmpeg into 64kbps MP3 and streams directly from Supabase Storage.'
  }
];

const REAL_AUDIO_SAMPLES = [
  {
    id: '10_0237_s237',
    label: 'Test Sample #10_0237',
    phase: 'VieNeu-TTS phase3_best',
    generatedSrc: '/audio/phase3_gen_10_0237.wav',
    referenceSrc: '/audio/phase3_ref_10_0237.wav',
    genDuration: '4.28s',
    refDuration: '2.79s'
  },
  {
    id: 'audio_08435',
    label: 'Test Sample #08435',
    phase: 'VieNeu-TTS phase3_best',
    generatedSrc: '/audio/phase3_gen_08435.wav',
    referenceSrc: '/audio/phase3_ref_08435.wav',
    genDuration: '4.30s',
    refDuration: '4.27s'
  }
];

export default function RealTtsAudioLab({ tts }) {
  const [activeStage, setActiveStage] = useState(2);
  const [autoStage, setAutoStage] = useState(true);
  const [sampleIdx, setSampleIdx] = useState(0);
  const [trackMode, setTrackMode] = useState('generated'); // 'generated' | 'reference'
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!autoStage) return undefined;
    const id = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % STAGES.length);
    }, 2500);
    return () => clearInterval(id);
  }, [autoStage]);

  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const rafRef = useRef(null);

  const currentSample = REAL_AUDIO_SAMPLES[sampleIdx];
  const currentSrc =
    trackMode === 'generated' ? currentSample.generatedSrc : currentSample.referenceSrc;

  // Draw live Web Audio FFT frequency spectrum when playing, or clean idle bars
  const drawSpectrum = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const barCount = 32;
    const gap = 3;
    const barW = (w - gap * (barCount - 1)) / barCount;

    if (analyserRef.current && isPlaying) {
      const data = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(data);

      for (let i = 0; i < barCount; i++) {
        const val = data[i * 2] || 0;
        const barH = Math.max(4, (val / 255) * (h - 6));
        ctx.fillStyle = i % 6 === 2 ? '#FF3B00' : 'currentColor';
        ctx.fillRect(i * (barW + gap), h - barH, barW, barH);
      }
      rafRef.current = requestAnimationFrame(drawSpectrum);
    } else {
      for (let i = 0; i < barCount; i++) {
        const idleH = 5 + ((i * 7) % 10);
        ctx.fillStyle = 'rgba(128,128,140,0.35)';
        ctx.fillRect(i * (barW + gap), h - idleH, barW, idleH);
      }
    }
  };

  useEffect(() => {
    drawSpectrum();
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlaying, trackMode, sampleIdx]);

  useEffect(() => {
    // Pause and reset when switching sample or A/B track
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setProgress(0);
  }, [sampleIdx, trackMode]);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      if (!audioCtxRef.current) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (Ctx) {
          audioCtxRef.current = new Ctx();
          analyserRef.current = audioCtxRef.current.createAnalyser();
          analyserRef.current.fftSize = 128;
          sourceRef.current = audioCtxRef.current.createMediaElementSource(audio);
          sourceRef.current.connect(analyserRef.current);
          analyserRef.current.connect(audioCtxRef.current.destination);
        }
      }
      if (audioCtxRef.current?.state === 'suspended') {
        await audioCtxRef.current.resume();
      }
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const currentStage = STAGES[activeStage];

  return (
    <SpotlightBentoCard className="p-4 sm:p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-[var(--border-hairline)]">
        <div className="space-y-1">
          <span className="text-[10px] font-mono font-bold text-[var(--signal)]">
            05 // NEWS INTELLIGENCE &amp; VIENEU-TTS AUDIO
          </span>
          <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight">
            {tts?.title || 'News Summary & Vietnamese Regional TTS'}
          </h3>
        </div>

        {tts?.repo && (
          <a
            href={tts.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="swiss-btn-secondary py-1.5 px-3 self-start sm:self-auto"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>Repo</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      {/* Real Model Output Audio Player (from VieNeu-TTS phase3_best) */}
      <div className="bento-well p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[10px] font-mono font-bold flex items-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5 text-[var(--signal)]" />
            <span>REAL VIENEU-TTS PHASE 3 TESTSET AUDIO (WAV)</span>
          </span>

          <div className="flex flex-wrap gap-1.5">
            {REAL_AUDIO_SAMPLES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  sfx.playTick(700);
                  setSampleIdx(idx);
                }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold ${
                  sampleIdx === idx
                    ? 'tactile-chip-active'
                    : 'tactile-chip text-[var(--text-muted)]'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* A/B Track Switch: Model Generated vs Reference */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex p-0.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] font-mono text-[10px]">
            <button
              onClick={() => {
                sfx.playTick(760);
                setTrackMode('generated');
              }}
              className={`px-2.5 py-1 rounded-md font-bold transition-colors ${
                trackMode === 'generated'
                  ? 'bg-[var(--signal)] text-white'
                  : 'text-[var(--text-muted)]'
              }`}
            >
              AI Generated ({currentSample.genDuration})
            </button>
            <button
              onClick={() => {
                sfx.playTick(680);
                setTrackMode('reference');
              }}
              className={`px-2.5 py-1 rounded-md font-bold transition-colors ${
                trackMode === 'reference'
                  ? 'bg-[var(--text-primary)] text-[var(--bg-canvas)]'
                  : 'text-[var(--text-muted)]'
              }`}
            >
              Human Reference ({currentSample.refDuration})
            </button>
          </div>

          <span className="text-[10px] font-mono text-[var(--text-muted)]">
            {currentSample.phase}
          </span>
        </div>

        {/* Live Web Audio Spectrum + Play Control */}
        <div className="p-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlayback}
            className="px-3.5 h-10 rounded-xl bg-[var(--signal)] text-white shadow-sm hover:opacity-90 active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5 font-mono text-[11px] font-bold shrink-0 cursor-pointer"
            aria-label={isPlaying ? 'Pause real TTS audio sample' : 'Play real TTS audio sample'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'PAUSE' : 'PLAY WAV'}</span>
          </button>

          <div className="flex-1 min-w-0 space-y-1.5">
            <canvas
              ref={canvasRef}
              width={280}
              height={34}
              className="w-full h-8 text-[var(--text-primary)]"
            />
            <div className="w-full h-1 rounded-full bg-[var(--bg-well)] overflow-hidden">
              <div
                className="h-full bg-[var(--signal)] transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <audio
          ref={audioRef}
          src={currentSrc}
          preload="metadata"
          onTimeUpdate={(e) => {
            const el = e.currentTarget;
            if (el.duration) setProgress((el.currentTime / el.duration) * 100);
          }}
          onEnded={() => {
            setIsPlaying(false);
            setProgress(0);
          }}
        />
      </div>

      {/* Interactive 4-Stage Pipeline */}
      <div className="flex items-center justify-between text-[9px] font-mono text-[var(--text-muted)] -mb-2">
        <span>TAP PIPELINE STAGE TO INSPECT PAYLOAD ↓</span>
        <span className="text-[var(--signal)] font-bold">4 STAGES</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {STAGES.map((st, idx) => {
          const active = activeStage === idx;
          return (
            <button
              key={st.id}
              onClick={() => {
                setAutoStage(false);
                sfx.playTick(680 + idx * 50);
                setActiveStage(idx);
              }}
              className={`p-2 rounded-xl text-left ${
                active ? 'tactile-chip-active' : 'tactile-chip'
              }`}
            >
              <div className={`text-[9px] font-mono ${active ? 'opacity-75' : 'text-[var(--text-muted)]'}`}>{st.step}</div>
              <div className="text-xs font-bold mt-0.5 truncate">{st.title}</div>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          className="p-3 rounded-xl border border-[var(--border-hairline)] space-y-2 text-xs"
        >
          <div className="flex items-center justify-between font-mono text-[10px]">
            <span className="font-bold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[var(--signal)]" />
              <span>{currentStage.title}</span>
            </span>
            <span className="text-[var(--text-muted)]">{currentStage.tech}</span>
          </div>
          <p className="text-[var(--text-muted)] leading-relaxed">{currentStage.desc}</p>
          <div className="rounded-lg bg-[#0D0D10] text-emerald-400 px-3 py-2 font-mono text-[10px] overflow-x-auto">
            {currentStage.payload}
          </div>
        </motion.div>
      </AnimatePresence>
    </SpotlightBentoCard>
  );
}

