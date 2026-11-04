import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { 
  Server, 
  Cpu, 
  AlertCircle, 
  CheckCircle2, 
  Zap, 
  Layers, 
  Activity, 
  ExternalLink, 
  Globe, 
  Terminal,
  Clock
} from 'lucide-react';
import { GithubIcon } from '../Icons';

export default function ArkNetStressLab({ arknet }) {
  const trackRef = useRef(null);
  const [arkStage, setArkStage] = useState(0); // 0: Fixed 2 Pods, 1: K8s HPA (10 Pods), 2: BullMQ Decoupled
  const [activeStep, setActiveStep] = useState(0);

  // Framer Motion scroll tracking for desktop scrollytelling
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.33) {
      setArkStage(0);
    } else if (latest < 0.66) {
      setArkStage(1);
    } else {
      setArkStage(2);
    }
  });

  const stages = [
    {
      id: 0,
      badge: "GIAI ĐOẠN 01",
      title: "Fixed Replicas (2 Pods)",
      statusLabel: "NGHẼN TÀI NGUYÊN • 28.4% LỖI",
      statusColor: "bg-rose-500 text-white",
      incidentTitle: "Quá tải đồng thời (350 VUs)",
      problem: "2 pod API cố định bị nghẽn CPU ở mức 100% khi nhận 350 người dùng đồng thời. 28.4% requests bị drop kết nối do tràn hàng đợi.",
      resolution: "Hệ thống thiếu cơ chế co giãn tức thời, cần mở rộng ngang tự động theo chỉ số CPU/RAM thực tế."
    },
    {
      id: 1,
      badge: "GIAI ĐOẠN 02",
      title: "Kubernetes HPA (10 Pods)",
      statusLabel: "TỰ ĐỘNG BUNG 10 PODS • TĂNG 242%",
      statusColor: "bg-neo-green text-[#121316]",
      incidentTitle: "Tự động co giãn theo tải thực tế",
      problem: "Cấu hình Horizontal Pod Autoscaler (HPA) giám sát CPU/RAM qua Metrics Server, kích hoạt mở rộng từ 2 lên 10 pods trong vài giây.",
      resolution: "Thông lượng tăng 2.42x (87.2 RPS), tỷ lệ lỗi triệt tiêu về 0.8%, xử lý an toàn hơn 158,000 lượt requests."
    },
    {
      id: 2,
      badge: "GIAI ĐOẠN 03",
      title: "BullMQ + Redis Lua",
      statusLabel: "PHÂN TÁCH XỬ LÝ NỀN",
      statusColor: "bg-neo-yellow text-[#121316]",
      incidentTitle: "Phân tách tác vụ nặng khỏi luồng chính",
      problem: "Tác vụ đồng bộ bài viết, like/comment, và xử lý media nếu xử lý trực tiếp trên HTTP thread sẽ gây block event-loop.",
      resolution: "Tách sang 9 worker queues độc lập qua BullMQ; tính điểm xu hướng suy giảm theo thời gian qua Redis Lua nguyên tử (<1ms)."
    }
  ];

  const handleStageSelect = (idx) => {
    setArkStage(idx);
    if (trackRef.current && window.innerWidth >= 1024) {
      const el = trackRef.current;
      const rect = el.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetY = scrollTop + rect.top + (idx * (rect.height / 3.05));
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  const springTransition = {
    type: "spring",
    stiffness: 380,
    damping: 24,
    mass: 0.8
  };

  return (
    <div className="space-y-6">
      
      {/* Container: Desktop uses tall track for smooth scrollytelling; Mobile uses clean natural height */}
      <div 
        ref={trackRef} 
        className="relative lg:h-[240vh] scroll-mt-20"
      >
        {/* Sticky viewport pinned on desktop, natural flow on mobile */}
        <div className="lg:sticky lg:top-20 z-20">
          <div className="neo-card p-4 sm:p-6 bg-white shadow-neo-2xl border-2 border-[#121316] space-y-4">
            
            {/* Titlebar with Repo Link & Specs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-[#121316]">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl border-2 border-[#121316] bg-neo-yellow shadow-neo-sm flex items-center justify-center">
                  <Globe className="w-5 h-5 text-[#121316]" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base sm:text-lg font-black text-[#121316] tracking-tight">
                      ArkNet: High-Concurrency Stress Benchmark (350 VUs)
                    </h3>
                    <span className="px-2 py-0.5 rounded border border-[#121316] bg-neo-green font-mono text-[10px] font-black">
                      BENCHMARKED
                    </span>
                  </div>
                  <p className="text-xs font-mono text-slate-600 font-bold">
                    Node.js (Express 5) • Redis Lua • 9 BullMQ Queues • Kubernetes HPA
                  </p>
                </div>
              </div>

              {arknet?.repo && (
                <a
                  href={arknet.repo}
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

            {/* Stepper Stage Tabs */}
            <div className="space-y-1.5">
              <div className="grid grid-cols-3 gap-2">
                {stages.map((st, idx) => {
                  const isActive = arkStage === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleStageSelect(idx)}
                      className={`p-2 rounded-xl border-2 border-[#121316] text-left transition-all ${
                        isActive
                          ? 'bg-[#121316] text-white shadow-neo scale-[1.01]'
                          : 'bg-[#FFFDF7] text-slate-800 hover:bg-slate-100 shadow-neo-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono font-black">
                        <span className={isActive ? 'text-neo-yellow' : 'text-slate-500'}>
                          {st.badge}
                        </span>
                        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-neo-yellow animate-ping' : 'bg-transparent'}`} />
                      </div>
                      <span className="text-xs font-black block truncate mt-0.5">
                        {st.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Live Desktop Scroll Progress Bar */}
              <div className="hidden lg:block w-full h-1 rounded-full border border-[#121316] bg-slate-100 overflow-hidden">
                <motion.div 
                  className="h-full bg-neo-yellow"
                  style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-500 px-0.5">
                <span className="flex items-center gap-1.5 text-[#121316]">
                  <Activity className="w-3.5 h-3.5 text-neo-pink" />
                  <span>TIẾN TRÌNH KHẢO SÁT HỆ THỐNG: GIAI ĐOẠN 0{arkStage + 1} / 03</span>
                </span>
                <span>{stages[arkStage].statusLabel}</span>
              </div>
            </div>

            {/* Compact 2-Column Split Layout: Height stays under 440px on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
              
              {/* LEFT COLUMN (lg:col-span-5): Operational Incident Analysis */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`incident-${arkStage}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={springTransition}
                    className={`h-full p-3.5 rounded-xl border-2 border-[#121316] shadow-neo-sm flex flex-col justify-between space-y-3 ${
                      arkStage === 0 
                        ? 'bg-rose-50 border-rose-900' 
                        : arkStage === 1 
                        ? 'bg-emerald-50 border-emerald-900' 
                        : 'bg-amber-50 border-amber-900'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2 border-b border-[#121316]/20 pb-1.5">
                        <span className="text-[9px] font-mono font-black text-slate-600 uppercase">
                          BÁO CÁO PHÂN TÍCH SỰ CỐ
                        </span>
                        <span className={`px-2 py-0.5 rounded border border-[#121316] font-mono text-[9px] font-black shadow-neo-xs ${stages[arkStage].statusColor}`}>
                          {stages[arkStage].badge}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-black text-[#121316]">
                        {stages[arkStage].incidentTitle}
                      </h4>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-white border border-[#121316]">
                        <span className="font-mono text-[9px] font-black text-slate-500 block uppercase">
                          HIỆN TRẠNG / NGUYÊN NHÂN
                        </span>
                        <p className="text-slate-800 font-medium text-[11px] mt-0.5 leading-relaxed">
                          {stages[arkStage].problem}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-white border border-[#121316]">
                        <span className="font-mono text-[9px] font-black text-slate-500 block uppercase">
                          GIẢI PHÁP &amp; KẾT QUẢ ĐO LƯỜNG
                        </span>
                        <p className="text-slate-900 font-bold text-[11px] mt-0.5 leading-relaxed">
                          {stages[arkStage].resolution}
                        </p>
                      </div>
                    </div>

                    <div className="pt-1 text-[10px] font-mono text-slate-500 flex items-center justify-between">
                      <span>Target: Express 5 + K8s Metrics</span>
                      <span className="font-bold text-[#121316]">ArkNet Benchmark Suite</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* RIGHT COLUMN (lg:col-span-7): Live Visual Canvas (Pods / Workers / Gauges) */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  
                  {/* STAGE 0: FIXED 2 PODS OVERLOADED */}
                  {arkStage === 0 && (
                    <motion.div
                      key="stage-0-visual"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={springTransition}
                      className="space-y-3"
                    >
                      {/* Pod Visualizer */}
                      <div className="p-3 rounded-xl border-2 border-[#121316] bg-[#FFFDF7] space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono font-bold">
                          <span className="text-rose-700 flex items-center gap-1.5 font-black text-[11px]">
                            <AlertCircle className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
                            <span>2 MÁY CHỦ CỐ ĐỊNH (CPU 100% QUÁ TẢI)</span>
                          </span>
                          <span className="px-1.5 py-0.5 rounded border border-rose-600 bg-rose-100 text-rose-800 font-bold text-[9px]">
                            HPA: DISABLED
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 font-mono">
                          <motion.div 
                            animate={{ scale: [1, 1.015, 1] }} 
                            transition={{ repeat: Infinity, duration: 1.2 }}
                            className="p-2 rounded-lg border border-rose-600 bg-rose-100 shadow-neo-xs space-y-1"
                          >
                            <div className="flex justify-between items-center font-black text-rose-900 text-[11px]">
                              <span>pod-api-1</span>
                              <span className="px-1.5 py-0.2 rounded bg-rose-600 text-white text-[9px]">CPU: 100%</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-rose-200 overflow-hidden">
                              <div className="w-full h-full bg-rose-600" />
                            </div>
                            <span className="text-[9px] text-rose-700 block font-bold truncate">Tràn kết nối (Dropped)</span>
                          </motion.div>

                          <motion.div 
                            animate={{ scale: [1, 1.015, 1] }} 
                            transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}
                            className="p-2 rounded-lg border border-rose-600 bg-rose-100 shadow-neo-xs space-y-1"
                          >
                            <div className="flex justify-between items-center font-black text-rose-900 text-[11px]">
                              <span>pod-api-2</span>
                              <span className="px-1.5 py-0.2 rounded bg-rose-600 text-white text-[9px]">RAM: 512MB MAX</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-rose-200 overflow-hidden">
                              <div className="w-full h-full bg-rose-600" />
                            </div>
                            <span className="text-[9px] text-rose-700 block font-bold truncate">Độ trễ 3s - 12s</span>
                          </motion.div>
                        </div>
                      </div>

                      {/* 3 Metric Gauges */}
                      <div className="grid grid-cols-3 gap-2 font-mono">
                        <div className="p-2.5 rounded-xl border-2 border-[#121316] bg-white shadow-neo-sm space-y-1">
                          <div className="flex justify-between text-[10px] font-bold text-slate-600">
                            <span>THROUGHPUT</span>
                          </div>
                          <div className="text-xl font-black text-[#121316]">36.0 RPS</div>
                          <div className="w-full h-1.5 rounded-full bg-slate-100 border border-[#121316] overflow-hidden">
                            <div className="w-[36%] h-full bg-slate-400" />
                          </div>
                          <span className="text-[9px] text-rose-700 font-bold block truncate">Chạm trần CPU</span>
                        </div>

                        <div className="p-2.5 rounded-xl border-2 border-[#121316] bg-white shadow-neo-sm space-y-1">
                          <div className="flex justify-between text-[10px] font-bold text-slate-600">
                            <span>LỖI API</span>
                            <span className="text-rose-600 font-black text-[9px]">CRITICAL</span>
                          </div>
                          <div className="text-xl font-black text-rose-600">28.4%</div>
                          <div className="w-full h-1.5 rounded-full bg-slate-100 border border-[#121316] overflow-hidden">
                            <div className="w-[84%] h-full bg-rose-500" />
                          </div>
                          <span className="text-[9px] text-rose-700 font-bold block truncate">Drop 1/3 requests</span>
                        </div>

                        <div className="p-2.5 rounded-xl border-2 border-[#121316] bg-white shadow-neo-sm space-y-1">
                          <div className="flex justify-between text-[10px] font-bold text-slate-600">
                            <span>MEDIA JOB</span>
                          </div>
                          <div className="text-xl font-black text-amber-600">34.5%</div>
                          <div className="w-full h-1.5 rounded-full bg-slate-100 border border-[#121316] overflow-hidden">
                            <div className="w-[35%] h-full bg-amber-400" />
                          </div>
                          <span className="text-[9px] text-slate-600 font-bold block truncate">Nghẽn hàng đợi</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STAGE 1: KUBERNETES AUTOSCALED (10 PODS) */}
                  {arkStage === 1 && (
                    <motion.div
                      key="stage-1-visual"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={springTransition}
                      className="space-y-3"
                    >
                      {/* 10 Pods Compact Grid (5x2) */}
                      <div className="p-3 rounded-xl border-2 border-[#121316] bg-neo-green/10 space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-mono font-bold">
                          <span className="text-emerald-900 flex items-center gap-1.5 font-black text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>K8S HPA TỰ ĐỘNG BUNG 10 REPLICAS</span>
                          </span>
                          <span className="px-1.5 py-0.5 rounded border border-[#121316] bg-neo-green text-[9px] font-black">
                            10 REPLICAS ACTIVE
                          </span>
                        </div>

                        <div className="grid grid-cols-5 gap-1.5 font-mono text-[9px]">
                          {Array.from({ length: 10 }).map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0, y: 10 }}
                              animate={{ scale: 1, y: 0 }}
                              transition={{ 
                                type: "spring", 
                                stiffness: 450, 
                                damping: 18, 
                                delay: i * 0.03 
                              }}
                              className="p-1.5 rounded-lg border border-[#121316] bg-white text-center shadow-neo-xs"
                            >
                              <div className="font-bold text-[#121316] flex items-center justify-between">
                                <span>p-{i + 1}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-neo-green" />
                              </div>
                              <span className="text-[8px] text-emerald-700 font-bold block mt-0.5">42% CPU</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* 3 Metric Gauges (Optimized) */}
                      <div className="grid grid-cols-3 gap-2 font-mono">
                        <motion.div 
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          className="p-2.5 rounded-xl border-2 border-[#121316] bg-white shadow-neo-sm space-y-1"
                        >
                          <div className="flex justify-between text-[10px] font-bold text-slate-600">
                            <span>THROUGHPUT</span>
                            <span className="text-emerald-700 font-black text-[9px]">+242%</span>
                          </div>
                          <div className="text-xl font-black text-[#121316]">87.2 RPS</div>
                          <div className="w-full h-1.5 rounded-full bg-slate-100 border border-[#121316] overflow-hidden">
                            <motion.div 
                              initial={{ width: '36%' }}
                              animate={{ width: '88%' }}
                              transition={{ duration: 0.6 }}
                              className="h-full bg-neo-green" 
                            />
                          </div>
                          <span className="text-[9px] text-emerald-700 font-bold block truncate">158K+ reqs mượt mà</span>
                        </motion.div>

                        <motion.div 
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.05 }}
                          className="p-2.5 rounded-xl border-2 border-[#121316] bg-white shadow-neo-sm space-y-1"
                        >
                          <div className="flex justify-between text-[10px] font-bold text-slate-600">
                            <span>LỖI API</span>
                            <span className="bg-neo-green px-1 rounded text-[8px] font-black">MINIMAL</span>
                          </div>
                          <div className="text-xl font-black text-emerald-600">0.8%</div>
                          <div className="w-full h-1.5 rounded-full bg-slate-100 border border-[#121316] overflow-hidden">
                            <motion.div 
                              initial={{ width: '84%' }}
                              animate={{ width: '8%' }}
                              transition={{ duration: 0.6 }}
                              className="h-full bg-emerald-500" 
                            />
                          </div>
                          <span className="text-[9px] text-emerald-700 font-bold block truncate">Giảm lỗi hơn 35x</span>
                        </motion.div>

                        <motion.div 
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1 }}
                          className="p-2.5 rounded-xl border-2 border-[#121316] bg-white shadow-neo-sm space-y-1"
                        >
                          <div className="flex justify-between text-[10px] font-bold text-slate-600">
                            <span>MEDIA JOB</span>
                            <span className="text-neo-cyan font-black text-[9px]">STABLE</span>
                          </div>
                          <div className="text-xl font-black text-[#121316]">86.2%</div>
                          <div className="w-full h-1.5 rounded-full bg-slate-100 border border-[#121316] overflow-hidden">
                            <motion.div 
                              initial={{ width: '35%' }}
                              animate={{ width: '86%' }}
                              transition={{ duration: 0.6 }}
                              className="h-full bg-neo-cyan" 
                            />
                          </div>
                          <span className="text-[9px] text-slate-700 font-bold block truncate">Worker xử lý chuẩn</span>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {/* STAGE 2: DECOUPLED ARCHITECTURE (BULLMQ + REDIS LUA) */}
                  {arkStage === 2 && (
                    <motion.div
                      key="stage-2-visual"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={springTransition}
                      className="space-y-3"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-mono font-bold">
                          <span className="text-[#121316] flex items-center gap-1.5 text-[11px]">
                            <Layers className="w-3.5 h-3.5 text-neo-pink" />
                            <span>9 QUEUES NỀN TÁCH BIỆT (CLICK TỪNG BƯỚC)</span>
                          </span>
                          <span className="text-slate-500 text-[10px] hidden sm:inline">Non-blocking Event Loop</span>
                        </div>

                        {arknet?.architecture && (
                          <>
                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                              {arknet.architecture.map((item, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setActiveStep(idx)}
                                  className={`p-1.5 rounded-lg border border-[#121316] text-left transition-all ${
                                    activeStep === idx
                                      ? 'bg-neo-yellow shadow-neo-xs font-bold scale-[1.02]'
                                      : 'bg-[#FFFDF7] hover:bg-slate-100 shadow-neo-xs'
                                  }`}
                                >
                                  <span className="text-[8px] font-mono font-bold block text-slate-500">
                                    0{idx + 1}
                                  </span>
                                  <span className="text-[10px] font-black text-[#121316] truncate block">
                                    {item.step}
                                  </span>
                                </button>
                              ))}
                            </div>

                            <div className="p-2 rounded-lg border border-[#121316] bg-neo-cyan/20 flex items-center justify-between gap-2 shadow-neo-xs">
                              <div className="flex items-center gap-2 truncate">
                                <span className="px-1.5 py-0.5 rounded bg-neo-cyan border border-[#121316] font-mono text-[9px] font-black">
                                  {arknet.architecture[activeStep].step}
                                </span>
                                <span className="text-[11px] font-bold text-[#121316] truncate">
                                  {arknet.architecture[activeStep].desc}
                                </span>
                              </div>
                              <span className="text-[9px] font-mono font-bold text-slate-600 flex-shrink-0">
                                ASYNC WORKER
                              </span>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Redis Lua Snippet Box */}
                      <div className="p-2.5 rounded-xl border-2 border-[#121316] bg-[#121316] text-white font-mono shadow-neo-sm space-y-1">
                        <div className="flex justify-between items-center text-[9px] text-slate-400 pb-1 border-b border-slate-800">
                          <span className="flex items-center gap-1.5 text-slate-300 font-bold">
                            <Terminal className="w-3 h-3 text-neo-yellow" />
                            <span>ATOMIC REDIS LUA (TIME-DECAY TRENDING SCORE)</span>
                          </span>
                          <span className="text-neo-green font-bold">&lt;1ms EXECUTION</span>
                        </div>
                        <pre className="text-emerald-400 text-[10px] overflow-x-auto leading-relaxed pt-0.5">
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
        </div>
      </div>

    </div>
  );
}

