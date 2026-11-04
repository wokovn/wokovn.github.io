import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { 
  Server, 
  Cpu, 
  Database, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck, 
  Zap, 
  Activity, 
  Lock, 
  Layers,
  Globe,
  Bot,
  Sparkles,
  TrendingUp,
  UserCheck,
  RefreshCw,
  BarChart3,
  Clock,
  ArrowDown,
  Shield
} from 'lucide-react';
import { projects } from '../data/portfolioData';
import { GithubIcon } from './Icons';

export default function NeobrutalSystems() {
  const arknet = projects.find(p => p.id === 'arknet');
  const tts = projects.find(p => p.id === 'vietnamese-tts');
  const isb = projects.find(p => p.id === 'isb-systems');
  const petcarex = projects.find(p => p.id === 'petcarex');

  // Scrollytelling State for ArkNet Stress Test
  const [arkStage, setArkStage] = useState(0); // 0: Overload (Fixed 2 Pods), 1: K8s HPA (10 Pods), 2: Architecture Deep-Dive
  const scrollyRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  // Vault Security States
  const [isEncrypted, setIsEncrypted] = useState(true);

  // AI News Pipeline State
  const [activeAiStep, setActiveAiStep] = useState(1);

  // Framer Motion useScroll on the scrollytelling container
  const { scrollYProgress } = useScroll({
    target: scrollyRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.35) {
        setArkStage(0);
      } else if (latest < 0.7) {
        setArkStage(1);
      } else {
        setArkStage(2);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const stages = [
    {
      id: 0,
      title: "01. BÃO TRAFFIC (350 VUs)",
      short: "Fixed (2 Pods)",
      badge: "NGHẼN MẠNG & QUÁ TẢI",
      badgeColor: "bg-rose-500 text-white"
    },
    {
      id: 1,
      title: "02. K8S AUTOSCALING (HPA)",
      short: "HPA (10 Pods)",
      badge: "TỰ ĐỘNG MỞ RỘNG 2.42x",
      badgeColor: "bg-neo-green text-[#121316]"
    },
    {
      id: 2,
      title: "03. DECOUPLED ARCHITECTURE",
      short: "BullMQ + Redis Lua",
      badge: "KIẾN TRÚC BẤT ĐỒNG BỘ",
      badgeColor: "bg-neo-yellow text-[#121316]"
    }
  ];

  const handleStageClick = (idx) => {
    setArkStage(idx);
    if (scrollyRef.current) {
      const el = scrollyRef.current;
      const rect = el.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetY = scrollTop + rect.top + (idx * (rect.height / 3.2));
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  // Spring transition config for energetic non-linear pop-outs
  const springPop = {
    type: "spring",
    stiffness: 380,
    damping: 22,
    mass: 0.8
  };

  return (
    <section id="systems" className="py-20 relative z-10 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* =========================================================================
            HEADER: HR & TECH DUAL VALUE PROPOSITION
        ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b-2 border-[#121316]"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border-2 border-[#121316] bg-neo-cyan text-xs font-mono font-bold shadow-neo-sm uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#121316]" />
              <span>// 01. PRODUCTION SYSTEMS &amp; SCROLLYTELLING LAB</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#121316] mt-3 tracking-tight">
              SCROLL-DRIVEN ARCHITECTURE LAB
            </h2>
            <p className="text-sm sm:text-base text-slate-700 mt-2 max-w-3xl font-medium">
              Cuộn chuột để quan sát hệ thống tự phục hồi dưới tải nặng: Từ nghẽn mạng 28% đến tự động scale 10 Pods không gián đoạn.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-[#121316] bg-neo-yellow font-mono text-xs font-black shadow-neo-sm">
              <UserCheck className="w-4 h-4 text-[#121316]" />
              <span>HR &amp; TECH TESTED</span>
            </span>
          </div>
        </motion.div>

        {/* =========================================================================
            SYSTEM 1: SCROLLYTELLING STRESS LAB (ARKNET) - DEDICATED #telemetry TARGET
        ========================================================================= */}
        <div id="telemetry" ref={scrollyRef} className="relative min-h-[220vh] scroll-mt-24">
          
          {/* Pinned Sticky Stage */}
          <div className="sticky top-20 sm:top-24 z-20">
            <div className="neo-card p-6 sm:p-8 bg-white shadow-neo-2xl space-y-6">
              
              {/* Card Top Titlebar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#121316]">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="p-2.5 rounded-xl border-2 border-[#121316] bg-neo-yellow shadow-neo-sm flex items-center justify-center">
                      <Globe className="w-6 h-6 text-[#121316]" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl sm:text-2xl font-black text-[#121316] tracking-tight">
                          ArkNet: Distributed Platform Stress Benchmark
                        </h3>
                        <span className="hidden sm:inline-block px-2 py-0.5 rounded border border-[#121316] bg-neo-cyan font-mono text-[10px] font-black">
                          350 VUs
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-mono text-slate-600 font-bold">
                        Node.js (Express 5) • Redis Lua • 9 BullMQ Queues • Kubernetes HPA
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href={arknet.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn-secondary text-xs self-start sm:self-auto"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>VIEW REPO</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Scrollytelling Stepper Bar (Clickable & Scroll-Driven) */}
              <div className="flex items-center justify-between gap-2 p-1.5 rounded-xl border-2 border-[#121316] bg-[#FFFDF7] shadow-neo-sm overflow-x-auto">
                {stages.map((st, idx) => {
                  const isActive = arkStage === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleStageClick(idx)}
                      className={`flex-1 min-w-[130px] sm:min-w-0 px-3 py-2 rounded-lg border text-xs font-mono font-black transition-all flex items-center justify-center gap-1.5 ${
                        isActive
                          ? 'bg-[#121316] text-white border-[#121316] shadow-neo-sm scale-[1.02]'
                          : 'bg-white text-slate-700 border-transparent hover:border-[#121316] hover:bg-slate-50'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-neo-yellow animate-ping' : 'bg-slate-300'}`} />
                      <span className="truncate">{st.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Scroll Instruction Hint Pill */}
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 font-bold px-1">
                <span className="flex items-center gap-1 text-[#121316]">
                  <ArrowDown className="w-3.5 h-3.5 animate-bounce text-neo-pink" />
                  <span>CUỘN CHUỘT (SCROLL) ĐỂ TỰ ĐỘNG CHUYỂN TRẠNG THÁI</span>
                </span>
                <span className="hidden sm:inline">Trạng thái: Giai đoạn {arkStage + 1} / 3</span>
              </div>

              {/* =====================================================================
                  HR EXPLANATION BANNER (POPS OUT ON STAGE CHANGE)
              ===================================================================== */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={arkStage}
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={springPop}
                  className={`p-4 rounded-xl border-2 border-[#121316] shadow-neo-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    arkStage === 0 
                      ? 'bg-rose-50 border-rose-900' 
                      : arkStage === 1 
                      ? 'bg-emerald-50 border-emerald-900' 
                      : 'bg-amber-50 border-amber-900'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded border border-[#121316] bg-white font-mono text-[10px] font-black uppercase text-[#121316]">
                        {arkStage === 0 ? 'VẤN ĐỀ THỰC TẾ' : arkStage === 1 ? 'GIẢI PHÁP CỦA KHOA' : 'GIÁ TRỊ KỸ THUẬT NGẦM'}
                      </span>
                      <span className="font-black text-xs sm:text-sm text-[#121316]">
                        {arkStage === 0 && 'Server cố định bị bão tải 350 người dùng làm sập kết nối'}
                        {arkStage === 1 && 'Kubernetes tự động mở rộng từ 2 lên 10 Pods, xử lý 158,000+ request'}
                        {arkStage === 2 && 'Bóc tách tác vụ nặng vào 9 hàng đợi BullMQ, giao diện luôn mượt mà'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium">
                      {arkStage === 0 && 'Dành cho HR: Khi ứng dụng có lượng truy cập đột biến (viral), nếu chỉ dùng 2 máy chủ cố định, CPU sẽ tràn 100%, 28.4% người dùng gặp lỗi gián đoạn.'}
                      {arkStage === 1 && 'Dành cho HR: Khoa cấu hình hệ thống tự nhận diện CPU/RAM để đẻ thêm máy chủ tức thì. Tốc độ tăng 242%, lỗi tụt từ 28.4% xuống 0.8% (gần như 0 lỗi).'}
                      {arkStage === 2 && 'Dành cho HR: Tác vụ nặng như upload video và chấm điểm xu hướng được giải phóng sang hàng đợi chạy ngầm, không làm khóa dữ liệu chính.'}
                    </p>
                  </div>

                  <span className={`self-start sm:self-center px-3 py-1.5 rounded-lg border-2 border-[#121316] font-mono text-xs font-black shadow-neo-sm whitespace-nowrap ${stages[arkStage].badgeColor}`}>
                    {stages[arkStage].badge}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* =====================================================================
                  STAGE VISUALIZATION CANVAS (NON-LINEAR SPRING POP-OUTS)
              ===================================================================== */}
              <AnimatePresence mode="wait">
                {arkStage === 0 && (
                  <motion.div
                    key="stage-fixed"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={springPop}
                    className="space-y-6"
                  >
                    {/* Visual Pod Grid: Only 2 Overloaded Pods */}
                    <div className="p-4 rounded-xl border-2 border-[#121316] bg-[#FFFDF7] space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono font-bold">
                        <span className="text-rose-700 flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4 text-rose-600 animate-bounce" />
                          <span>MÁY CHỦ HIỆN TẠI: 2 PODS CỐ ĐỊNH (CPU 100% QUÁ TẢI)</span>
                        </span>
                        <span className="text-[11px] text-slate-500">K8s HPA: OFF</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <motion.div 
                          animate={{ scale: [1, 1.02, 1] }} 
                          transition={{ repeat: Infinity, duration: 1.2 }}
                          className="p-3.5 rounded-xl border-2 border-rose-600 bg-rose-100 shadow-neo-sm font-mono text-xs space-y-1.5"
                        >
                          <div className="flex justify-between items-center font-black text-rose-800">
                            <span>pod-core-api-1</span>
                            <span className="px-1.5 py-0.5 rounded bg-rose-600 text-white text-[10px]">CPU: 100%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-rose-200 overflow-hidden">
                            <div className="w-full h-full bg-rose-600" />
                          </div>
                          <span className="text-[10px] text-rose-700 block font-bold">Tràn hàng đợi kết nối (Drop requests)</span>
                        </motion.div>

                        <motion.div 
                          animate={{ scale: [1, 1.02, 1] }} 
                          transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}
                          className="p-3.5 rounded-xl border-2 border-rose-600 bg-rose-100 shadow-neo-sm font-mono text-xs space-y-1.5"
                        >
                          <div className="flex justify-between items-center font-black text-rose-800">
                            <span>pod-core-api-2</span>
                            <span className="px-1.5 py-0.5 rounded bg-rose-600 text-white text-[10px]">CPU: 100%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-rose-200 overflow-hidden">
                            <div className="w-full h-full bg-rose-600" />
                          </div>
                          <span className="text-[10px] text-rose-700 block font-bold">Bộ nhớ RAM chạm trần 512MB</span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Gauges for Stage 0 (Bottlenecked) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
                      <div className="p-4 rounded-xl border-2 border-[#121316] bg-white shadow-neo-sm space-y-2">
                        <div className="flex justify-between text-xs font-bold text-slate-600">
                          <span>THROUGHPUT</span>
                          <span className="text-rose-600 font-black">CHẠM TRẦN</span>
                        </div>
                        <div className="text-3xl font-black text-[#121316]">36.0 RPS</div>
                        <div className="w-full h-2.5 rounded-full bg-slate-100 border border-[#121316] overflow-hidden">
                          <div className="w-[36%] h-full bg-slate-400" />
                        </div>
                        <span className="text-[11px] text-rose-600 font-bold block">Nghẽn CPU không thể nhận thêm</span>
                      </div>

                      <div className="p-4 rounded-xl border-2 border-[#121316] bg-white shadow-neo-sm space-y-2">
                        <div className="flex justify-between text-xs font-bold text-slate-600">
                          <span>TỶ LỆ LỖI API</span>
                          <span className="bg-rose-600 text-white px-1.5 py-0.5 rounded text-[10px] font-black">NGUY CẤP</span>
                        </div>
                        <div className="text-3xl font-black text-rose-600">28.4%</div>
                        <div className="w-full h-2.5 rounded-full bg-slate-100 border border-[#121316] overflow-hidden">
                          <div className="w-[84%] h-full bg-rose-500" />
                        </div>
                        <span className="text-[11px] text-rose-700 font-bold block">1/4 người dùng bị văng kết nối</span>
                      </div>

                      <div className="p-4 rounded-xl border-2 border-[#121316] bg-white shadow-neo-sm space-y-2">
                        <div className="flex justify-between text-xs font-bold text-slate-600">
                          <span>MEDIA UPLOAD</span>
                          <span className="text-amber-600 font-black">QUÁ TẢI</span>
                        </div>
                        <div className="text-3xl font-black text-amber-600">34.5%</div>
                        <div className="w-full h-2.5 rounded-full bg-slate-100 border border-[#121316] overflow-hidden">
                          <div className="w-[35%] h-full bg-amber-400" />
                        </div>
                        <span className="text-[11px] text-slate-600 font-bold block">Worker nghẽn khi xử lý ảnh</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {arkStage === 1 && (
                  <motion.div
                    key="stage-hpa"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={springPop}
                    className="space-y-6"
                  >
                    {/* Visual Pod Grid: 10 Scaled Pods dynamically popping out */}
                    <div className="p-4 rounded-xl border-2 border-[#121316] bg-neo-green/10 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono font-bold">
                        <span className="text-emerald-800 flex items-center gap-1.5 font-black">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>KUBERNETES HPA ĐÃ TỰ ĐỘNG MỞ RỘNG LÊN 10 PODS</span>
                        </span>
                        <span className="px-2 py-0.5 rounded border border-[#121316] bg-neo-green text-[10px] font-black">
                          AUTONOMOUS HEALTHY
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0.4, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ ...springPop, delay: i * 0.04 }}
                            className="p-2.5 rounded-xl border-2 border-[#121316] bg-white shadow-neo-sm font-mono text-[11px] space-y-1"
                          >
                            <div className="flex justify-between items-center font-bold text-[#121316]">
                              <span>pod-{i + 1}</span>
                              <span className="w-2 h-2 rounded-full bg-neo-green animate-pulse" />
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                              <div className="w-[42%] h-full bg-neo-green" />
                            </div>
                            <span className="text-[10px] text-slate-500 block">CPU: 42% (Mượt)</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Gauges for Stage 1 (HPA Optimized) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
                      <div className="p-4 rounded-xl border-2 border-[#121316] bg-white shadow-neo-sm space-y-2">
                        <div className="flex justify-between text-xs font-bold text-slate-600">
                          <span>THROUGHPUT</span>
                          <span className="bg-neo-yellow px-1.5 py-0.5 rounded border border-[#121316] text-[10px] font-black">TĂNG 2.42x</span>
                        </div>
                        <div className="text-3xl font-black text-[#121316]">87.2 RPS</div>
                        <div className="w-full h-2.5 rounded-full bg-slate-100 border border-[#121316] overflow-hidden">
                          <div className="w-[88%] h-full bg-neo-green" />
                        </div>
                        <span className="text-[11px] text-emerald-700 font-bold block">158,000+ request xử lý trơn tru</span>
                      </div>

                      <div className="p-4 rounded-xl border-2 border-[#121316] bg-white shadow-neo-sm space-y-2">
                        <div className="flex justify-between text-xs font-bold text-slate-600">
                          <span>TỶ LỆ LỖI API</span>
                          <span className="bg-neo-green px-1.5 py-0.5 rounded border border-[#121316] text-[10px] font-black">TRIỆT TIÊU LỖI</span>
                        </div>
                        <div className="text-3xl font-black text-emerald-600">0.8%</div>
                        <div className="w-full h-2.5 rounded-full bg-slate-100 border border-[#121316] overflow-hidden">
                          <div className="w-[8%] h-full bg-emerald-500" />
                        </div>
                        <span className="text-[11px] text-emerald-700 font-bold block">Giảm lỗi hơn 35 lần (từ 28.4%)</span>
                      </div>

                      <div className="p-4 rounded-xl border-2 border-[#121316] bg-white shadow-neo-sm space-y-2">
                        <div className="flex justify-between text-xs font-bold text-slate-600">
                          <span>MEDIA UPLOAD</span>
                          <span className="bg-neo-cyan px-1.5 py-0.5 rounded border border-[#121316] text-[10px] font-black">ỔN ĐỊNH CAO</span>
                        </div>
                        <div className="text-3xl font-black text-[#121316]">86.2%</div>
                        <div className="w-full h-2.5 rounded-full bg-slate-100 border border-[#121316] overflow-hidden">
                          <div className="w-[86%] h-full bg-neo-cyan" />
                        </div>
                        <span className="text-[11px] text-slate-700 font-bold block">Upload ảnh tức thì qua BullMQ</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {arkStage === 2 && (
                  <motion.div
                    key="stage-arch"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={springPop}
                    className="space-y-4"
                  >
                    {/* Interactive Topology Nodes */}
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-mono font-bold">
                        <span className="text-[#121316] flex items-center gap-1.5">
                          <Layers className="w-4 h-4 text-neo-pink" />
                          <span>LUỒNG DỮ LIỆU ĐỘC LẬP (CLICK TỪNG BƯỚC ĐỂ SOI CHI TIẾT)</span>
                        </span>
                        <span className="text-slate-500 hidden sm:inline">Không nghẽn luồng chính</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                        {arknet.architecture.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveStep(idx)}
                            className={`p-2.5 rounded-xl border-2 border-[#121316] text-left transition-all ${
                              activeStep === idx
                                ? 'bg-neo-yellow shadow-neo font-bold scale-[1.02]'
                                : 'bg-[#FFFDF7] hover:bg-slate-100 shadow-neo-sm'
                            }`}
                          >
                            <span className="text-[10px] font-mono font-bold block text-slate-500">
                              BƯỚC 0{idx + 1}
                            </span>
                            <span className="text-xs font-black text-[#121316] truncate block mt-0.5">
                              {item.step}
                            </span>
                          </button>
                        ))}
                      </div>

                      <div className="p-3.5 rounded-xl border-2 border-[#121316] bg-neo-cyan/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-neo-sm">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-neo-cyan border border-[#121316] font-mono text-xs font-black">
                            {arknet.architecture[activeStep].step}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-[#121316]">
                            {arknet.architecture[activeStep].desc}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono font-bold text-slate-600">
                          KIẾN TRÚC VI DỊCH VỤ
                        </span>
                      </div>
                    </div>

                    {/* Redis Lua Snippet Box */}
                    <div className="p-3.5 rounded-xl border-2 border-[#121316] bg-[#121316] text-white font-mono text-xs shadow-neo-sm space-y-1">
                      <div className="flex justify-between items-center text-[10px] text-slate-400 pb-1 border-b border-slate-700">
                        <span>ATOMIC REDIS LUA (ĐIỂM XU HƯỚNG SUY GIẢM THỜI GIAN THẬT)</span>
                        <span className="text-neo-yellow">&lt;1ms EXECUTION</span>
                      </div>
                      <pre className="text-emerald-400 text-[11px] overflow-x-auto pt-1 leading-snug">
{`local score = redis.call('ZSCORE', KEYS[1], ARGV[1]) or 0
local new_score = (tonumber(score) * math.exp(-0.05 * tonumber(ARGV[2]))) + tonumber(ARGV[3])
redis.call('ZADD', KEYS[1], new_score, ARGV[1])
return new_score`}
                      </pre>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

        {/* =========================================================================
            SYSTEM 2: AI NEWS INTELLIGENCE PIPELINE (REPLACED DIALECT DECK)
        ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="neo-card p-6 sm:p-8 bg-white shadow-neo-xl space-y-6"
        >
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-[#121316]">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-xl border-2 border-[#121316] bg-neo-pink text-white shadow-neo-sm flex items-center justify-center">
                  <Bot className="w-6 h-6 text-[#121316]" />
                </span>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#121316] tracking-tight">
                    Vietnamese News AI &amp; Neural Pipeline
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-slate-600 font-bold">
                    FastAPI • PyTorch CUDA • Brave Scraper • Gemini LLM • Supabase S3
                  </p>
                </div>
              </div>
            </div>

            <a
              href={tts.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn-secondary text-xs self-start sm:self-auto"
            >
              <GithubIcon className="w-4 h-4" />
              <span>REPOSITORY</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* HR Takeaway Box */}
          <div className="p-4 rounded-xl border-2 border-[#121316] bg-neo-yellow/20 shadow-neo-sm space-y-1">
            <div className="flex items-center gap-2 font-mono text-xs font-black text-[#121316]">
              <UserCheck className="w-4 h-4 text-[#121316]" />
              <span>DÀNH CHO HR &amp; TECH LEAD:</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
              Tự động hóa hoàn toàn quy trình xử lý tin tức: Crawler tự động cào tin từ nhiều trang báo, Gemini AI làm sạch và tóm tắt sự kiện then chốt, đưa vào mô hình Neural vnTTS tổng hợp âm thanh trên GPU. Rút ngắn thời gian từ <strong>45 phút đọc thủ công</strong> xuống còn <strong>dưới 8 giây</strong>.
            </p>
          </div>

          {/* 4-Step Interactive Pipeline Flow */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-mono font-bold text-slate-700">
              <span>PIPELINE TỰ ĐỘNG HÓA 4 BƯỚC (CLICK ĐỂ XEM CHI TIẾT)</span>
              <span className="text-slate-500 hidden sm:inline">&lt;8s End-to-End Latency</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {[
                { step: "01. CRAWLER", title: "Brave & Puppeteer", desc: "Cào tự động tin tức đa nguồn, bóc tách nội dung chính, loại bỏ quảng cáo/rác." },
                { step: "02. AI LLM", title: "Gemini Structured", desc: "Trích xuất sự kiện cốt lõi, lọc tin giả và phân loại chủ đề kinh tế/xã hội." },
                { step: "03. GPU ENGINE", title: "PyTorch CUDA (vnTTS)", desc: "Mô hình âm thanh chuyên sâu tiếng Việt xử lý trên GPU Nvidia với dataset 27.1h." },
                { step: "04. STORAGE", title: "Supabase Streaming", desc: "Chuyển mã FFmpeg MP3 và phân phối luồng phát tức thì qua Cloud CDN." },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveAiStep(idx)}
                  className={`p-3.5 rounded-xl border-2 border-[#121316] text-left transition-all ${
                    activeAiStep === idx
                      ? 'bg-neo-yellow shadow-neo scale-[1.02] font-black'
                      : 'bg-[#FFFDF7] shadow-neo-sm hover:bg-slate-50'
                  }`}
                >
                  <span className="text-[10px] font-mono text-slate-500 font-bold block">{item.step}</span>
                  <span className="text-sm font-black text-[#121316] block mt-0.5">{item.title}</span>
                  <p className="text-[11px] text-slate-600 font-medium mt-1 leading-snug">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 rounded-xl border-2 border-[#121316] bg-white shadow-neo-sm flex items-center justify-between">
              <span className="text-slate-600 font-bold">DATASET TIẾNG VIỆT:</span>
              <span className="bg-neo-green px-2 py-0.5 rounded border border-[#121316] font-black">27.1h (14,475 pairs)</span>
            </div>
            <div className="p-3 rounded-xl border-2 border-[#121316] bg-white shadow-neo-sm flex items-center justify-between">
              <span className="text-slate-600 font-bold">TỔNG HỢP TIN TỨC:</span>
              <span className="bg-neo-cyan px-2 py-0.5 rounded border border-[#121316] font-black">45 Phút → &lt;8 Giây</span>
            </div>
            <div className="p-3 rounded-xl border-2 border-[#121316] bg-white shadow-neo-sm flex items-center justify-between">
              <span className="text-slate-600 font-bold">GPU INFERENCE:</span>
              <span className="bg-neo-purple/30 px-2 py-0.5 rounded border border-[#121316] font-black">CUDA Accelerated</span>
            </div>
          </div>

        </motion.div>

        {/* =========================================================================
            SYSTEM 3 & 4: ISB MULTI-AGENT & PETCAREX DATABASE LAB
        ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* ISB Vietnam Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="neo-card p-6 sm:p-8 bg-white shadow-neo-xl space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b-2 border-[#121316]">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-xl border-2 border-[#121316] bg-neo-purple/40 font-bold text-base flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-[#121316]" />
                  </span>
                  <div>
                    <h3 className="text-xl font-black text-[#121316]">
                      Multi-Agent &amp; Enterprise Security
                    </h3>
                    <p className="text-xs font-mono font-bold text-slate-600">ISB Vietnam Production Systems</p>
                  </div>
                </div>
                <span className="px-2 py-1 rounded-md border border-[#121316] bg-neo-green font-mono text-[10px] font-black">
                  ENTERPRISE
                </span>
              </div>

              {/* HR Summary Box */}
              <div className="p-3.5 rounded-xl border-2 border-[#121316] bg-neo-purple/10 space-y-1">
                <span className="text-[10px] font-mono font-black text-[#121316] uppercase block">DÀNH CHO HR:</span>
                <p className="text-xs text-slate-800 font-medium leading-relaxed">
                  Bảo vệ dữ liệu nhạy cảm cấp ngân hàng (PII) bằng mã hóa Vault DEK, đồng thời tối ưu hóa biểu thức chính quy (ReDoS fix) giúp thời gian phản hồi giảm từ <strong>3-18 giây xuống còn &lt;200ms</strong>.
                </p>
              </div>

              {/* Interactive Vault DEK Sandbox */}
              <div className="p-4 rounded-xl border-2 border-[#121316] bg-[#FFFDF7] shadow-neo-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#121316]">
                    <Lock className="w-4 h-4 text-neo-pink" />
                    <span>HASHICORP VAULT DEK &amp; BLIND INDEX</span>
                  </div>
                  <button
                    onClick={() => setIsEncrypted(!isEncrypted)}
                    className="px-2.5 py-1 rounded-lg border border-[#121316] bg-neo-yellow text-[11px] font-mono font-bold shadow-neo-sm"
                  >
                    {isEncrypted ? 'Show Plaintext' : 'Encrypt Data'}
                  </button>
                </div>

                <div className="p-3 rounded-lg border border-[#121316] bg-white font-mono text-xs space-y-1">
                  <div className="text-slate-500 text-[10px]">DATABASE ROW STORAGE:</div>
                  <div className="font-bold text-[#121316] break-all">
                    {isEncrypted ? 'vault:v1:7kX9q2pL0m... (Wrapped DEK)' : 'email: "khoa@isb.com", ssn: "079205..."'}
                  </div>
                  <div className="text-[10px] text-emerald-700 font-bold pt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Tìm kiếm trực tiếp trên HMAC Blind Index không cần giải mã database.</span>
                  </div>
                </div>
              </div>

              {/* Performance Badges */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl border-2 border-[#121316] bg-white shadow-neo-sm">
                  <span className="text-[10px] text-slate-500 font-bold block">TỐC ĐỘ PHÂN TÍCH</span>
                  <span className="text-base font-black text-[#121316] block mt-0.5">Tăng 5.8x Row Volume</span>
                  <span className="text-[10px] text-slate-600">Từ vài tiếng xuống ~5 phút</span>
                </div>

                <div className="p-3 rounded-xl border-2 border-[#121316] bg-white shadow-neo-sm">
                  <span className="text-[10px] text-slate-500 font-bold block">TỐI ƯU HIỆU NĂNG</span>
                  <span className="text-base font-black text-[#121316] block mt-0.5">3-18s → &lt;200ms</span>
                  <span className="text-[10px] text-slate-600">Sửa triệt để lỗi nghẽn ReDoS</span>
                </div>
              </div>

            </div>

            <div className="pt-4 border-t-2 border-[#121316] flex flex-wrap gap-2">
              {['TypeScript', 'Next.js 15', 'Java 21', 'Spring Boot 4', 'Vault', 'n8n'].map((t, i) => (
                <span key={i} className="neo-tag text-[11px]">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* PetCareX Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="neo-card p-6 sm:p-8 bg-white shadow-neo-xl space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b-2 border-[#121316]">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-xl border-2 border-[#121316] bg-neo-green font-bold text-base flex items-center justify-center">
                    <Database className="w-5 h-5 text-[#121316]" />
                  </span>
                  <div>
                    <h3 className="text-xl font-black text-[#121316]">
                      Database Architecture &amp; CI Suite
                    </h3>
                    <p className="text-xs font-mono font-bold text-slate-600">MSSQL 3NF • Vitest • Docker CI</p>
                  </div>
                </div>

                <a
                  href={petcarex.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn-secondary text-xs"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              </div>

              {/* HR Summary Box */}
              <div className="p-3.5 rounded-xl border-2 border-[#121316] bg-neo-green/10 space-y-1">
                <span className="text-[10px] font-mono font-black text-[#121316] uppercase block">DÀNH CHO HR:</span>
                <p className="text-xs text-slate-800 font-medium leading-relaxed">
                  Thiết kế kiểm thử tự động toàn diện với hơn <strong>5,600+ test cases</strong>, cắt giảm 50% thời gian chạy CI pipeline (từ 352s xuống 162s) và tối ưu cấu trúc UUID triệt tiêu 100% phân mảnh đĩa.
                </p>
              </div>

              {/* B-Tree Fragmentation Visualizer */}
              <div className="p-4 rounded-xl border-2 border-[#121316] bg-[#FFFDF7] shadow-neo-sm space-y-3">
                <div className="font-mono text-xs font-bold text-[#121316]">
                  SEQUENTIAL COMB UUID vs RANDOM UUID
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>Sequential UUID (Khoa triển khai):</span>
                      <span className="font-bold text-emerald-600">0% Phân mảnh đĩa</span>
                    </div>
                    <div className="w-full h-3 rounded-full border border-[#121316] bg-slate-100 overflow-hidden">
                      <div className="h-full bg-neo-green w-[98%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>Random UUID (Truyền thống):</span>
                      <span className="font-bold text-rose-600">74% Lãng phí IOPS &amp; Ram</span>
                    </div>
                    <div className="w-full h-3 rounded-full border border-[#121316] bg-slate-100 overflow-hidden">
                      <div className="h-full bg-rose-500 w-[74%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Test Harness Stats */}
              <div className="p-4 rounded-xl border-2 border-[#121316] bg-neo-yellow/20 space-y-1 text-xs font-mono">
                <div className="font-bold text-[#121316] flex items-center justify-between">
                  <span>5,600+ BÀI KIỂM THỬ TỰ ĐỘNG</span>
                  <span className="text-emerald-700 font-black">2x SPEEDUP</span>
                </div>
                <p className="text-slate-700 text-[11px] pt-1">
                  Docker test containers chạy song song cô lập dữ liệu từng worker, cắt thời gian deploy từ 352s xuống 162s.
                </p>
              </div>

            </div>

            <div className="pt-4 border-t-2 border-[#121316] flex flex-wrap gap-2">
              {['SQL Server', 'Drizzle ORM', 'Vitest', 'Docker', 'Playwright'].map((t, i) => (
                <span key={i} className="neo-tag text-[11px]">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
