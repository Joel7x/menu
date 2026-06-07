"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sounds } from "@/lib/soundEffects";

const BOOT_LOGS = [
  "🔍 CONNECTING TO COFFEE CORE DIRECTIVE...",
  "⚙️ CALIBRATING STEAM PRESSURE GAUGES...",
  "📊 STEAM PRESSURE STEADY: 9.35 BAR",
  "🌡️ INFUSION TEMPERATURE STEADY: 92.4°C",
  "🌿 EXTRACTING AROMATIC FLAVOR LAYERS...",
  "🧁 TOASTED SUBSYSTEM INITIALIZATION: DONE",
  "🌈 SHAKE & SWEET COEXISTENCE FREQUENCIES ACTIVE...",
  "🛎️ KAPI CAFE ORDER SYSTEM ONLINE.",
];

export default function BootScreen() {
  const [percent, setPercent] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Percentage counter timer
    const timer = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoaded(true);
            sounds.playChime();
          }, 250);
          return 100;
        }

        // Play subtle click sound on progress updates
        if (Math.random() > 0.3) {
          sounds.playTick();
        }

        const increment = Math.floor(Math.random() * 10) + 5;
        return Math.min(prev + increment, 100);
      });
    }, 55);

    return () => clearInterval(timer);
  }, []);

  // Update logs based on progress
  useEffect(() => {
    const logIndex = Math.min(
      Math.floor((percent / 100) * BOOT_LOGS.length),
      BOOT_LOGS.length - 1
    );

    if (logs.length <= logIndex) {
      const newLogs = BOOT_LOGS.slice(0, logIndex + 1);
      setLogs(newLogs);
    }
  }, [percent, logs.length]);

  // Scroll terminal logs to bottom automatically
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const handleSkip = () => {
    sounds.playChime();
    setIsLoaded(true);
  };

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            background: "#080400",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "40px 24px",
            fontFamily: "'Space Grotesk', monospace",
            overflow: "hidden",
            color: "#e8d5b0",
          }}
        >
          {/* Holographic dot matrix background pattern */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.04,
              pointerEvents: "none",
              backgroundImage: "radial-gradient(circle, #d4a843 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* CRT scanline simulation */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 10001,
              pointerEvents: "none",
              background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
              backgroundSize: "100% 4px, 3px 100%",
            }}
          />

          {/* Top Header Row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid rgba(212, 168, 67, 0.15)",
              paddingBottom: 16,
              position: "relative",
              zIndex: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#d4a843",
                  display: "inline-block",
                  boxShadow: "0 0 8px #d4a843",
                }}
              />
              <span
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  color: "#d4a843",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                KAPI COFFEE CORE v5.0
              </span>
            </div>
            <span
              style={{
                fontSize: "0.7rem",
                color: "#8a6c2a",
                letterSpacing: "0.05em",
              }}
            >
              CALIBRATION STATUS: ACTIVE
            </span>
          </div>

          {/* Center Graphic & Progress */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              gap: 28,
              position: "relative",
              zIndex: 10,
            }}
          >
            {/* Logo/Shield with subtle glow */}
            <div
              style={{
                position: "relative",
                width: 90,
                height: 90,
                borderRadius: "50%",
                border: "2.5px solid rgba(212, 168, 67, 0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 30px rgba(212, 168, 67, 0.1)",
              }}
            >
              <span style={{ fontSize: "2.5rem" }}>☕</span>
            </div>

            {/* Large digital percentage */}
            <div style={{ textAlign: "center" }}>
              <h1
                style={{
                  fontSize: "4.5rem",
                  fontWeight: 800,
                  fontFamily: "'Syne', sans-serif",
                  color: "#f0c96a",
                  margin: 0,
                  lineHeight: 1,
                  textShadow: "0 0 20px rgba(212, 168, 67, 0.25)",
                }}
              >
                {percent}%
              </h1>
              <p
                style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.3em",
                  color: "#8a6c2a",
                  margin: "8px 0 0",
                  textTransform: "uppercase",
                }}
              >
                System Tuning Sequence
              </p>
            </div>

            {/* Custom styled amber progress bar */}
            <div
              style={{
                width: "100%",
                maxWidth: 320,
                height: 6,
                backgroundColor: "rgba(212, 168, 67, 0.08)",
                borderRadius: 4,
                overflow: "hidden",
                border: "1px solid rgba(212, 168, 67, 0.2)",
              }}
            >
              <div
                style={{
                  width: `${percent}%`,
                  height: "100%",
                  backgroundColor: "#d4a843",
                  boxShadow: "0 0 10px #d4a843",
                  transition: "width 0.1s ease-out",
                }}
              />
            </div>
          </div>

          {/* Bottom Console Terminal Rows & Skip Button */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              position: "relative",
              zIndex: 10,
            }}
          >
            {/* Terminal logs list */}
            <div
              style={{
                background: "rgba(10, 5, 1, 0.65)",
                border: "1px solid rgba(212, 168, 67, 0.15)",
                borderRadius: "12px",
                padding: "20px 24px",
                height: "150px",
                overflowY: "hidden",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                boxShadow: "inset 0 4px 20px rgba(0,0,0,0.6)",
              }}
            >
              {logs.map((log, index) => (
                <div
                  key={index}
                  style={{
                    fontSize: "0.76rem",
                    color: index === logs.length - 1 ? "#f0c96a" : "#8a6c2a",
                    transition: "color 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ color: "#d4a843" }}>&gt;</span>
                  <span>{log}</span>
                  {index === logs.length - 1 && percent < 100 && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      style={{
                        width: 6,
                        height: 12,
                        backgroundColor: "#f0c96a",
                        display: "inline-block",
                        marginLeft: 2,
                      }}
                    />
                  )}
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>

            {/* Skip Calibration bypass button */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 18px rgba(212, 168, 67, 0.35)" }}
                whileTap={{ scale: 0.96 }}
                onClick={handleSkip}
                style={{
                  background: "transparent",
                  border: "1.5px solid #d4a843",
                  color: "#d4a843",
                  borderRadius: "999px",
                  padding: "12px 28px",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: "0.15em",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "all 0.2s",
                  boxShadow: "0 0 8px rgba(212, 168, 67, 0.08)",
                }}
              >
                SKIP CALIBRATION ⚡
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}