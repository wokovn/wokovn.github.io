import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Cpu, 
  Zap, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { GithubIcon } from '../Icons';

export default function NewsAiPipeline({ tts }) {
  const [activeAiStep, setActiveAiStep] = useState(1);

  const pipelineSteps = [
    {
      step: "01. CRAWLER",
      title: "Thu thập tin tức đa nguồn",
      tech: "Brave Search API + Puppeteer Headless",
      desc: "Trích xuất bài viết thời sự, kinh tế tự động, làm sạch HTML rác và loại bỏ quảng cáo trong <1.2s."
    },
    {
      step: "02. LLM SUMMARY",
      title: "Tóm tắt ngữ cảnh chuẩn xác",
      tech: "Google Gemini API (Structured JSON)",
      desc: "Sinh bản tin cô đọng 3-4 câu, chuẩn hóa dấu câu tiếng Việt và định dạng ngữ điệu trước khi đưa vào mô hình giọng nói."
    },
    {
      step: "03. GPU INFERENCE",
      title: "Tổng hợp giọng nói Neural vnTTS",
      tech: "PyTorch (CUDA) + FastAPI",
      desc: "Mô hình TTS xử lý mel-spectrogram và vocoder trên GPU, tạo luồng âm thanh tự nhiên chuẩn âm sắc vùng miền."
    },
    {
      step: "04. EDGE DELIVERY",
      title: "Chuyển mã & Phân phối âm thanh",
      tech: "FFmpeg Pipeline + Supabase CDN",
      desc: "Nén WAV sang MP3 (64kbit/s) giảm 78% dung lượng truyền tải, lưu trữ và streaming tức thì qua CDN public bucket."
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="neo-card p-5 sm:p-7 bg-white shadow-neo-xl border-2 border-[#121316] space-y-6"
    >
      {/* Titlebar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b-2 border-[#121316]">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl border-2 border-[#121316] bg-neo-cyan shadow-neo-sm flex items-center justify-center">
            <Bot className="w-5 h-5 text-[#121316]" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg sm:text-xl font-black text-[#121316] tracking-tight">
                Automated News Intelligence &amp; Neural Voice Pipeline
              </h3>
              <span className="px-2 py-0.5 rounded border border-[#121316] bg-neo-purple/30 font-mono text-[10px] font-black">
                GPU ACCELERATED
              </span>
            </div>
            <p className="text-xs font-mono font-bold text-slate-600">
              Puppeteer • Gemini API • FastAPI • PyTorch CUDA • FFmpeg Transcoder
            </p>
          </div>
        </div>

        {tts?.repo && (
          <a
            href={tts.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn-secondary text-xs py-1.5 px-3 self-start sm:self-auto"
          >
            <GithubIcon className="w-4 h-4" />
            <span>MÃ NGUỒN</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      {/* Pipeline Description Box */}
      <div className="p-3.5 rounded-xl border-2 border-[#121316] bg-neo-cyan/10 space-y-1">
        <span className="text-[10px] font-mono font-black text-[#121316] uppercase block">
          KIẾN TRÚC TỰ ĐỘNG HÓA TẬN DỤNG GPU:
        </span>
        <p className="text-xs text-slate-800 font-medium leading-relaxed">
          Tự động hóa toàn diện quy trình từ bóc tách báo điện tử, tóm tắt ngữ cảnh bằng Gemini AI đến tổng hợp giọng đọc tiếng Việt trên hạ tầng CUDA. Triển khai cơ chế <strong>Job-based polling trên FastAPI</strong> để xử lý bất đồng bộ các đoạn audio dài mà không gây block luồng Node.js chính.
        </p>
      </div>

      {/* Interactive 4-Step Pipeline Flow */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono font-bold">
          <span className="flex items-center gap-1.5 text-[#121316]">
            <Layers className="w-4 h-4 text-neo-pink" />
            <span>4 GIAI ĐOẠN XỬ LÝ (CHỌN TỪNG BƯỚC ĐỂ XEM THÔNG SỐ)</span>
          </span>
          <span className="text-slate-500 hidden sm:inline">Decoupled FastAPI Architecture</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {pipelineSteps.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveAiStep(idx)}
              className={`p-3 rounded-xl border-2 border-[#121316] text-left transition-all ${
                activeAiStep === idx
                  ? 'bg-neo-yellow shadow-neo scale-[1.02] font-black'
                  : 'bg-[#FFFDF7] shadow-neo-sm hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 font-bold">
                <span>{item.step}</span>
                {activeAiStep === idx && <span className="w-2 h-2 rounded-full bg-[#121316]" />}
              </div>
              <span className="text-xs sm:text-sm font-black text-[#121316] block mt-1">
                {item.title}
              </span>
              <span className="text-[10px] font-mono text-slate-700 block mt-0.5">
                {item.tech}
              </span>
              <p className="text-[11px] text-slate-600 font-medium mt-1 leading-snug">
                {item.desc}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Key Operational Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
        <div className="p-3 rounded-xl border-2 border-[#121316] bg-white shadow-neo-sm flex items-center justify-between">
          <span className="text-slate-600 font-bold text-[11px]">DATASET TIẾNG VIỆT:</span>
          <span className="bg-neo-green px-2 py-0.5 rounded border border-[#121316] font-black text-[11px]">
            27.1h (14,475 mẫu)
          </span>
        </div>
        <div className="p-3 rounded-xl border-2 border-[#121316] bg-white shadow-neo-sm flex items-center justify-between">
          <span className="text-slate-600 font-bold text-[11px]">XỬ LÝ ĐA NHIỆM:</span>
          <span className="bg-neo-cyan px-2 py-0.5 rounded border border-[#121316] font-black text-[11px]">
            Job-based Polling (Tránh Timeout)
          </span>
        </div>
        <div className="p-3 rounded-xl border-2 border-[#121316] bg-white shadow-neo-sm flex items-center justify-between">
          <span className="text-slate-600 font-bold text-[11px]">GPU INFERENCE:</span>
          <span className="bg-neo-purple/30 px-2 py-0.5 rounded border border-[#121316] font-black text-[11px]">
            CUDA Accelerated
          </span>
        </div>
      </div>

      {/* Tags */}
      <div className="pt-2 border-t-2 border-[#121316] flex flex-wrap gap-2">
        {tts?.tags?.slice(0, 8).map((tag, i) => (
          <span key={i} className="neo-tag text-[11px]">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

