"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const WORDS = ["KAPI", "CAFE"];

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY   = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const fade  = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);

  const [isOpen, setIsOpen] = useState(false);
  const [countdownText, setCountdownText] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateStatus = () => {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentSeconds = now.getSeconds();

      const openHour = 9;
      const closeHour = 23;

      let open = false;
      let targetHour = openHour;

      if (currentHours >= openHour && currentHours < closeHour) {
        open = true;
        targetHour = closeHour;
      } else {
        open = false;
        targetHour = openHour;
      }

      setIsOpen(open);

      // Compute exact millisecond differences
      const nowMs = now.getTime();
      const targetDate = new Date(now);
      targetDate.setHours(targetHour, 0, 0, 0);

      // If target time has already passed today (e.g. past 23:00, target is 9:00 AM next day)
      if (targetDate.getTime() < nowMs) {
        targetDate.setDate(targetDate.getDate() + 1);
      }

      const diffMs = targetDate.getTime() - nowMs;
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000);

      const parts = [];
      if (diffHrs > 0) parts.push(`${diffHrs}h`);
      if (diffMins > 0 || diffHrs > 0) parts.push(`${diffMins}m`);
      parts.push(`${diffSecs}s`);

      const countdownStr = parts.join(" ");

      if (open) {
        setCountdownText(` · Closes in ${countdownStr}`);
      } else {
        setCountdownText(` · Opens in ${countdownStr}`);
      }
    };

    updateStatus();
    const interval = setInterval(updateStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: seededRandom(i * 4) * 5 + 2,
      left: seededRandom(i * 4 + 1) * 100,
      delay: seededRandom(i * 4 + 2) * 10,
      duration: seededRandom(i * 4 + 3) * 12 + 14,
    })), []);

  const steamWisps = useMemo(() =>
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      left: 45 + i * 2.5,
      delay: i * 0.9,
      duration: 3.5 + seededRandom(i + 100) * 2,
      height: 45 + seededRandom(i + 200) * 35,
    })), []);

  const beans = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: seededRandom(i * 5) * 15 + 15, // 15px to 30px
      left: seededRandom(i * 5 + 1) * 90 + 5, // 5% to 95%
      delay: seededRandom(i * 5 + 2) * 15,
      duration: seededRandom(i * 5 + 3) * 20 + 20, // 20s to 40s
    })), []);

  return (
    <div
      ref={ref}
      className="hero-bg"
      style={{ position: "relative", minHeight: "100svh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}
    >
      {/* Parallax BG layers */}
      <motion.div style={{ y: bgY, position: "absolute", inset: 0, zIndex: 0 }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 25% 55%, #2a1400 0%, #0a0500 50%, #020100 100%)" }} />
        {/* Subtle dot grid */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.07,
          backgroundImage: "radial-gradient(circle, rgba(212,168,67,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />
        {/* Corner vignette */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(2,1,0,0.8) 100%)",
        }} />
      </motion.div>

      {/* Scanline */}
      <div className="scanline" style={{ zIndex: 1 }} />

      {/* Particles */}
      {mounted && particles.map((p) => (
        <div key={p.id} className="particle" style={{
          width: `${p.size}px`, height: `${p.size}px`,
          left: `${p.left}%`, bottom: "-10px",
          animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s`,
        }} />
      ))}

      {/* Steam */}
      {mounted && steamWisps.map((w) => (
        <div key={w.id} className="steam-wisp" style={{
          left: `${w.left}%`, bottom: "40%", height: `${w.height}px`,
          animationDelay: `${w.delay}s`, animationDuration: `${w.duration}s`,
        }} />
      ))}

      {/* Floating Coffee Beans */}
      {mounted && beans.map((b) => (
        <div
          key={b.id}
          className="floating-bean"
          style={{
            width: `${b.size}px`,
            height: `${b.size * 1.6}px`, // organic bean aspect ratio
            left: `${b.left}%`,
            bottom: "-40px",
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        >
          <svg viewBox="0 0 60 100" fill="currentColor" style={{ width: "100%", height: "100%" }}>
            <path d="M30,5 C45,5 55,25 55,50 C55,75 45,95 30,95 C15,95 5,75 5,50 C5,25 15,5 30,5 Z" />
            <path d="M30,10 C32,25 28,45 28,50 C28,55 32,75 30,90" fill="none" stroke="#080400" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>
      ))}

      {/* Main content */}
      <motion.div
        style={{ opacity: fade, scale, position: "relative", zIndex: 10, width: "100%", maxWidth: 760 }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "80px 24px 96px" }}>

          {/* Top status row */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36, flexWrap: "wrap", justifyContent: "center" }}
          >
            {/* Live Countdown Pill */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              padding: "6px 14px", borderRadius: 999,
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${mounted && isOpen ? "rgba(74,222,128,0.35)" : "rgba(248,113,113,0.35)"}`,
              fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.72rem", fontWeight: 500,
            }}>
              <span className="live-dot" style={{
                background: mounted && isOpen ? "#4ade80" : "#f87171",
                color: mounted && isOpen ? "#4ade80" : "#f87171",
                boxShadow: `0 0 8px ${mounted && isOpen ? "#4ade80" : "#f87171"}`,
              }} />
              <span style={{ color: mounted && isOpen ? "#4ade80" : "#f87171" }}>
                {mounted ? (isOpen ? "Open Now" : "Closed") : "Status"}
              </span>
              <span style={{ color: "#7a6040", minWidth: "90px", textAlign: "left" }}>
                {mounted ? countdownText : " · Loading..."}
              </span>
            </div>

            {/* Location pill */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "6px 14px", borderRadius: 999,
              background: "rgba(212,168,67,0.06)",
              border: "1px solid rgba(212,168,67,0.2)",
              fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.72rem", color: "#7a6040",
            }}>
              <span>📍</span>
              <span>Dmart Road, Ravet</span>
            </div>
          </motion.div>

          {/* Logo with rings */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: [0, -8, 0],
            }}
            transition={{
              scale: { delay: 0.4, duration: 1.1, type: "spring", stiffness: 70 },
              opacity: { delay: 0.4, duration: 1.1 },
              y: {
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 1.5,
              }
            }}
            style={{ position: "relative", marginBottom: 32 }}
          >
            {/* Glowing background blob */}
            <motion.div
              animate={{ opacity: [0.4, 0.75, 0.4] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: -25,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(212,168,67,0.65) 0%, transparent 65%)",
                filter: "blur(20px)",
                zIndex: 0,
                pointerEvents: "none",
              }}
            />
            {/* Outer pulse ring */}
            <motion.div
              animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.1, 0.4] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              style={{
                position: "absolute", inset: -18, borderRadius: "50%",
                border: "1px solid rgba(212,168,67,0.4)",
                zIndex: 1,
              }}
            />
            {/* Inner ring */}
            <motion.div
              animate={{ scale: [1, 1.07, 1], opacity: [0.6, 0.2, 0.6] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.5 }}
              style={{
                position: "absolute", inset: -8, borderRadius: "50%",
                border: "1px solid rgba(212,168,67,0.3)",
                zIndex: 1,
              }}
            />
            <Image
              src="/logo.png"
              alt="Kapi Cafe"
              width={148}
              height={148}
              priority
              style={{
                borderRadius: "50%",
                boxShadow: "0 0 0 3px rgba(212,168,67,0.2), 0 0 50px rgba(212,168,67,0.25), 0 16px 48px rgba(0,0,0,0.7)",
                display: "block", position: "relative", zIndex: 2,
              }}
            />
          </motion.div>

          {/* KAPI / CAFE stacked */}
          <div style={{ marginBottom: 6 }}>
            {WORDS.map((word, wi) => (
              <div key={word} style={{ display: "flex", justifyContent: "center", overflow: "hidden" }}>
                {word.split("").map((ch, ci) => (
                  <motion.span
                    key={ci}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{ delay: 0.7 + wi * 0.3 + ci * 0.06, duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                    className="gold-text"
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "clamp(3.5rem, 12vw, 8rem)",
                      fontWeight: 800,
                      letterSpacing: "-0.01em",
                      lineHeight: 0.95,
                      display: "inline-block",
                    }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </div>
            ))}
          </div>

          {/* CAFÉ sub-label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.7 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              marginBottom: 20, marginTop: 4,
            }}
          >
            <div style={{ width: 32, height: 1, background: "linear-gradient(to right, transparent, #d4a843)" }} />
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.7rem", fontWeight: 500,
              letterSpacing: "0.45em", textTransform: "uppercase", color: "#8a6c2a",
            }}>
              Ravet
            </span>
            <div style={{ width: 32, height: 1, background: "linear-gradient(to left, transparent, #d4a843)" }} />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.9 }}
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontStyle: "italic",
              fontSize: "clamp(1.05rem, 3vw, 1.4rem)",
              color: "#c8a855",
              marginBottom: 8,
              lineHeight: 1.4,
            }}
          >
            Crafted Coffee. Curated Experiences.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1, duration: 0.9 }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.68rem", letterSpacing: "0.3em",
              textTransform: "uppercase", color: "#5a4020",
              marginBottom: 40,
            }}
          >
            ✦ &nbsp; Eat &nbsp;·&nbsp; Sip &nbsp;·&nbsp; Vibe &nbsp; ✦
          </motion.p>

          {/* CTA */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 0.7, type: "spring" }}
            whileHover={{ scale: 1.06, y: -4 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              padding: "15px 44px",
              borderRadius: 999,
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "0.82rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              background: "linear-gradient(135deg, #d4a843 0%, #f0c96a 50%, #d4a843 100%)",
              backgroundSize: "200% auto",
              color: "#080400",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 0 30px rgba(212,168,67,0.4), 0 8px 24px rgba(0,0,0,0.5)",
              animation: "shimmer 3s linear infinite",
            }}
          >
            Explore Menu ↓
          </motion.button>

          {/* Phone */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6, duration: 0.8 }}
            style={{
              marginTop: 28,
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.7rem", letterSpacing: "0.06em", color: "#5a4020",
            }}
          >
            📞 9888203103 &nbsp;/&nbsp; 8806579540
          </motion.p>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
            style={{ marginTop: 52, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              style={{
                width: 1, height: 48,
                background: "linear-gradient(to bottom, #d4a843, transparent)",
              }}
            />
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.6rem", letterSpacing: "0.3em",
              textTransform: "uppercase", color: "#5a4020",
            }}>scroll</span>
          </motion.div>

        </div>
      </motion.div>

      {/* Bottom fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 140, zIndex: 11,
        background: "linear-gradient(to bottom, transparent, #080400)",
        pointerEvents: "none",
      }} />
    </div>
  );
}
