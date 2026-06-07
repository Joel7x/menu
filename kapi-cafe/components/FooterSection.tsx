"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const INSTAGRAM_URL = "https://www.instagram.com/kapicafe.ravet/";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export default function FooterSection() {
  return (
    <footer style={{ position: "relative", padding: "80px 24px 48px", overflow: "hidden" }}>

      {/* Top gold line */}
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
        background: "linear-gradient(90deg, transparent, #d4a843, transparent)",
      }} />

      {/* BG glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 110%, rgba(212,168,67,0.06) 0%, transparent 65%)",
      }} />

      <div style={{
        maxWidth: 540, margin: "0 auto", textAlign: "center",
        position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column", alignItems: "center",
      }}>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, type: "spring", stiffness: 90 }}
          style={{ position: "relative", marginBottom: 22 }}
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.08, 0.35] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            style={{
              position: "absolute", inset: -14, borderRadius: "50%",
              border: "1px solid rgba(212,168,67,0.4)",
            }}
          />
          <Image
            src="/logo.png"
            alt="Kapi Cafe"
            width={100}
            height={100}
            style={{
              borderRadius: "50%", display: "block", position: "relative", zIndex: 1,
              boxShadow: "0 0 0 2px rgba(212,168,67,0.25), 0 0 40px rgba(212,168,67,0.2), 0 8px 32px rgba(0,0,0,0.6)",
            }}
          />
        </motion.div>

        {/* Brand */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="gold-text"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
            fontWeight: 800, letterSpacing: "-0.01em", marginBottom: 4,
          }}
        >
          Kapi Cafe
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.7 }}
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontStyle: "italic", fontSize: "0.9rem",
            color: "#7a6040", marginBottom: 24,
          }}
        >
          ✦ Eat · Sip · Vibe ✦
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.9 }}
          style={{
            height: 1, width: 64, marginBottom: 28,
            background: "linear-gradient(90deg, transparent, #d4a843, transparent)",
            transformOrigin: "center",
          }}
        />

        {/* Follow text */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
          style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 700,
            fontSize: "clamp(1.1rem, 3.5vw, 1.4rem)",
            color: "#f2e8d5", marginBottom: 8,
          }}
        >
          Follow{" "}
          <span className="gold-text">Kapi Cafe</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontStyle: "italic", fontSize: "0.92rem",
            color: "#7a6040", marginBottom: 28, lineHeight: 1.6,
          }}
        >
          Coffee stories, new launches &amp; café moments
        </motion.p>

        {/* Instagram */}
        <motion.a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.7 }}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.96 }}
          className="insta-btn"
          style={{
            display: "inline-flex", alignItems: "center", gap: 9,
            padding: "11px 26px", borderRadius: 999,
            color: "#fff",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600, fontSize: "0.85rem",
            letterSpacing: "0.03em", textDecoration: "none",
            marginBottom: 48,
          }}
        >
          <InstagramIcon />
          <span>@kapicafe.ravet</span>
        </motion.a>

        {/* Divider */}
        <div style={{
          width: "100%", height: 1, marginBottom: 22,
          background: "linear-gradient(90deg, transparent, rgba(212,168,67,0.15), transparent)",
        }} />

        {/* Contact row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.7 }}
          style={{
            display: "flex", flexWrap: "wrap", justifyContent: "center",
            gap: "6px 18px",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.72rem", color: "#7a6040",
            marginBottom: 14,
          }}
        >
          <span>📍 Dmart Road, Ravet, Pune</span>
          <span>📞 9888203103 / 8806579540</span>
        </motion.div>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.7 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.67rem",
            color: "rgba(122,96,64,0.35)",
          }}
        >
          © {new Date().getFullYear()} Kapi Cafe Ravet · All rights reserved
        </motion.p>

      </div>
    </footer>
  );
}
