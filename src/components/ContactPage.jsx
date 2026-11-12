import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Check,
  Copy,
  Mail,
  MapPin,
  Send,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';
import { MagneticButton, SpotlightBentoCard } from './MotionPrimitives';
import { sfx } from '../utils/sfx';

export default function ContactPage({ onBack }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);

  const [senderName, setSenderName] = useState('');
  const [company, setCompany] = useState('');
  const [topic, setTopic] = useState('Interview / Role');
  const [message, setMessage] = useState(
    'Hi Khoa, we reviewed your portfolio and would like to schedule an introductory call regarding a Software Engineer opportunity.'
  );

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    sfx.playSuccess();
    setCopiedEmail(true);
    confetti({
      particleCount: 55,
      spread: 65,
      origin: { y: 0.7 },
      colors: ['#FF3B00', '#0C0C0E', '#00B86B']
    });
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const composedSubject = encodeURIComponent(
    `[Portfolio Contact] ${topic}${company ? ` (${company})` : ''}`
  );
  const composedBody = encodeURIComponent(
    `From: ${senderName || '(Your Name)'}\nCompany: ${company || '(Company / Team)'}\nTopic: ${topic}\n\n${message}\n\n(Note: Feel free to share a calendar link or request my direct phone number via reply.)`
  );
  const mailtoUrl = `mailto:${personalInfo.email}?subject=${composedSubject}&body=${composedBody}`;

  const handleCopyDraft = () => {
    const plain = `To: ${personalInfo.email}\nSubject: [Portfolio Contact] ${topic}${
      company ? ` (${company})` : ''
    }\nFrom: ${senderName || '(Your Name)'} (${company || 'Team'})\n\n${message}`;
    navigator.clipboard.writeText(plain);
    sfx.playSuccess();
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2400);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="pt-24 pb-20 min-h-[85vh]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Button + Page Header */}
        <div className="space-y-4 pb-6 border-b border-[var(--border-hairline)]">
          <button
            type="button"
            onClick={() => {
              sfx.playTick(680);
              onBack();
            }}
            className="swiss-btn-secondary py-1.5 px-3 text-[11px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO PORTFOLIO</span>
          </button>

          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold text-[var(--signal)] tracking-wider uppercase block">
              DIRECT CONTACT &amp; INTERVIEW REQUEST
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-[-0.03em]">
              Get in Touch with Khoa<span className="text-[var(--signal)]">.</span>
            </h1>
            <p className="text-sm text-[var(--text-muted)] max-w-xl">
              Direct phone numbers are shared privately upon email or LinkedIn inquiry. Replies typically within 24h.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Direct Channels & Hiring Readiness */}
          <div className="lg:col-span-5 space-y-4">
            <SpotlightBentoCard className="p-5 space-y-4" accentGlow>
              <div className="text-[10px] font-mono font-bold text-[var(--signal)]">
                DIRECT CHANNELS
              </div>

              <div className="bento-well p-3.5 space-y-2">
                <div className="text-[10px] font-mono text-[var(--text-muted)]">PRIMARY EMAIL</div>
                <div className="text-sm font-mono font-bold break-all">{personalInfo.email}</div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button onClick={handleCopyEmail} className="swiss-btn-primary py-1.5 px-3">
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>COPY EMAIL</span>
                      </>
                    )}
                  </button>
                  <a href={`mailto:${personalInfo.email}`} className="swiss-btn-secondary py-1.5 px-3">
                    <Mail className="w-3.5 h-3.5" />
                    <span>OPEN MAIL APP</span>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tactile-chip p-3 rounded-xl flex items-center justify-between text-xs font-mono font-bold"
                >
                  <span className="flex items-center gap-2">
                    <LinkedinIcon className="w-4 h-4 text-[var(--signal)]" />
                    <span>LinkedIn</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tactile-chip p-3 rounded-xl flex items-center justify-between text-xs font-mono font-bold"
                >
                  <span className="flex items-center gap-2">
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </SpotlightBentoCard>

            <SpotlightBentoCard className="p-5 space-y-3 text-xs">
              <div className="flex items-center gap-2 font-mono font-bold text-[10px] text-[var(--text-muted)]">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>HIRING READINESS CHECKLIST</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[var(--signal)] shrink-0" />
                  <span>Ho Chi Minh City, Vietnam (On-site / Hybrid / Remote)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[var(--signal)] shrink-0" />
                  <span>Available immediately for Full-Stack / Software Engineer roles</span>
                </div>
              </div>
            </SpotlightBentoCard>
          </div>

          {/* Right: Interactive Recruiter Call / Email Request Builder */}
          <div className="lg:col-span-7">
            <SpotlightBentoCard className="p-5 sm:p-6 space-y-5">
              <div className="pb-3 border-b border-[var(--border-hairline)]">
                <span className="text-[10px] font-mono font-bold text-[var(--signal)]">
                  REQUEST INTERVIEW OR PHONE NUMBER
                </span>
                <h2 className="font-display text-xl font-bold tracking-tight mt-0.5">
                  Send a Quick Note
                </h2>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="font-mono text-[10px] font-bold text-[var(--text-muted)] block"
                    >
                      YOUR NAME
                    </label>
                    <input
                      id="contact-name"
                      name="senderName"
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Minh Anh (HR)"
                      className="w-full px-3 py-2 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-well)]/50 outline-none focus:border-[var(--signal)]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-company"
                      className="font-mono text-[10px] font-bold text-[var(--text-muted)] block"
                    >
                      COMPANY / TEAM
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Product Engineering Team"
                      className="w-full px-3 py-2 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-well)]/50 outline-none focus:border-[var(--signal)]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="font-mono text-[10px] font-bold text-[var(--text-muted)] block">
                    TOPIC
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      'Interview / Role',
                      'Phone & Full CV',
                      'Project Inquiry'
                    ].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          sfx.playTick(700);
                          setTopic(opt);
                        }}
                        className={`px-2.5 py-2 rounded-xl font-mono text-[10px] font-bold text-center whitespace-nowrap ${
                          topic === opt
                            ? 'tactile-chip-active'
                            : 'tactile-chip text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="font-mono text-[10px] font-bold text-[var(--text-muted)] block"
                  >
                    MESSAGE
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-well)]/50 outline-none focus:border-[var(--signal)] resize-none leading-relaxed"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <MagneticButton>
                    <a
                      href={mailtoUrl}
                      onClick={() => sfx.playSuccess()}
                      className="swiss-btn-primary"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>OPEN IN EMAIL CLIENT</span>
                    </a>
                  </MagneticButton>

                  <button
                    type="button"
                    onClick={handleCopyDraft}
                    className="swiss-btn-secondary"
                  >
                    {copiedDraft ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span>COPIED MESSAGE DRAFT</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>COPY DRAFT</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </SpotlightBentoCard>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

