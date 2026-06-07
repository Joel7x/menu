"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { menuCategories, MenuCategory, MenuItem as MenuItemType } from "@/lib/menuData";
import { useOrder } from "@/lib/OrderContext";
import { sounds } from "@/lib/soundEffects";

/* ── Tab pill ── */
function TabPill({ cat, active, onClick }: { cat: MenuCategory; active: boolean; onClick: () => void }) {
  return (
    <motion.button
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      className={active ? "tab-active" : "tab-inactive"}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "7px 14px", borderRadius: 999,
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "0.75rem", fontWeight: 600,
        whiteSpace: "nowrap", cursor: "pointer", flexShrink: 0,
        letterSpacing: "0.01em",
      }}
    >
      <span style={{ fontSize: "0.9rem", lineHeight: 1 }}>{cat.icon}</span>
      <span>{cat.name}</span>
    </motion.button>
  );
}

/* ── Diet badge ── */
function DietBadge({ tag }: { tag?: string }) {
  if (tag === "veg")
    return (
      <span title="Veg" style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 14, height: 14, borderRadius: 3,
        border: "1.5px solid #4ade80", color: "#4ade80",
        fontSize: "0.42rem", flexShrink: 0,
      }}>●</span>
    );
  if (tag === "non-veg")
    return (
      <span title="Non-Veg" style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 14, height: 14, borderRadius: 3,
        border: "1.5px solid #f87171", color: "#f87171",
        fontSize: "0.42rem", flexShrink: 0,
      }}>●</span>
    );
  if (tag === "special")
    return (
      <span style={{
        display: "inline-block", padding: "1px 6px", borderRadius: 999,
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.08em",
        background: "rgba(212,168,67,0.12)",
        border: "1px solid rgba(212,168,67,0.3)",
        color: "#d4a843", flexShrink: 0,
      }}>★ SPL</span>
    );
  return null;
}

/* ── Menu row ── */
function MenuRow({ item, index }: { item: MenuItemType; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8px" });
  const { getItemQuantity, addItem, removeItem } = useOrder();
  
  const qty = getItemQuantity(item.name);

  const handleRemove = () => {
    removeItem(item);
    sounds.playDown();
  };

  const handleAdd = () => {
    addItem(item);
    sounds.playChime();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.03, duration: 0.4, ease: "easeOut" }}
    >
      <div className="menu-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0, flex: 1 }}>
          <DietBadge tag={item.tag} />
          <span
            className="item-name"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.875rem",
              color: qty > 0 ? "#f0c96a" : "#e8d5b0",
              fontWeight: qty > 0 ? 600 : 400,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              transition: "color 0.2s",
            }}
          >
            {item.name}
          </span>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 1 }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.7rem", color: "#8a6c2a", fontWeight: 500 }}>₹</span>
            <span className="gold-price" style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "1.05rem", fontWeight: 700,
            }}>
              {item.price}
            </span>
          </div>

          {/* ADD / Quantity Counter */}
          {qty === 0 ? (
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(212,168,67,0.15)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdd}
              style={{
                padding: "4px 10px",
                borderRadius: "6px",
                border: "1px solid rgba(212,168,67,0.4)",
                background: "transparent",
                color: "#f0c96a",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.68rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              + ADD
            </motion.button>
          ) : (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "2px 6px",
              borderRadius: "6px",
              border: "1px solid #d4a843",
              background: "rgba(212,168,67,0.08)",
            }}>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={handleRemove}
                style={{
                  background: "none",
                  border: "none",
                  color: "#d4a843",
                  fontSize: "0.95rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  width: 16,
                  height: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                —
              </motion.button>
              <span style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#fff",
                minWidth: 12,
                textAlign: "center",
              }}>
                {qty}
              </span>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={handleAdd}
                style={{
                  background: "none",
                  border: "none",
                  color: "#d4a843",
                  fontSize: "0.95rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  width: 16,
                  height: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                +
              </motion.button>
            </div>
          )}
        </div>
      </div>
      <div className="row-line" />
    </motion.div>
  );
}

/* ── Category card ── */
function CategoryCard({ cat, index }: { cat: MenuCategory; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      id={cat.id}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1, ease: [0.33, 1, 0.68, 1] }}
      className="bento-card"
      style={{
        padding: "24px 24px 18px",
      }}
    >
      {/* Card header */}
      <div style={{ marginBottom: 16, position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: "1.8rem", lineHeight: 1, filter: "drop-shadow(0 0 6px rgba(212,168,67,0.3))" }}>
              {cat.icon}
            </span>
            <div>
              <h2 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(1rem, 2.8vw, 1.25rem)",
                fontWeight: 700, color: "#f0c96a", lineHeight: 1.1,
              }}>
                {cat.name}
              </h2>
              <p style={{
                fontFamily: "'DM Serif Display', serif",
                fontStyle: "italic", fontSize: "0.8rem",
                color: "#8a6c2a", marginTop: 2,
              }}>
                {cat.tagline}
              </p>
            </div>
          </div>
          <span className="count-badge">{cat.items.length}</span>
        </div>
        <div className="gold-bar" style={{ width: "100%" }} />
      </div>

      {/* Items */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {cat.items.map((item, i) => (
          <MenuRow key={item.name} item={item} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

/* ── Main ── */
export default function MenuSection() {
  const [activeTab, setActiveTab] = useState(menuCategories[0].id);

  const scrollToCategory = (id: string) => {
    sounds.playTick();
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="menu" style={{ position: "relative", padding: "72px 16px 80px" }}>

      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{ textAlign: "center", marginBottom: 52, maxWidth: 600, margin: "0 auto 52px" }}
      >
        <motion.p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.65rem", letterSpacing: "0.45em",
            textTransform: "uppercase", color: "#d4a843",
            marginBottom: 14,
          }}
        >
          ✦ &nbsp; What We Serve &nbsp; ✦
        </motion.p>

        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(2rem, 6vw, 3.5rem)",
          fontWeight: 800, lineHeight: 1.05,
          color: "#f2e8d5", marginBottom: 14,
          letterSpacing: "-0.02em",
        }}>
          The Full{" "}
          <span className="gold-text" style={{ fontStyle: "italic" }}>
            Menu
          </span>
        </h1>

        <p style={{
          fontFamily: "'DM Serif Display', serif",
          fontStyle: "italic", fontSize: "1rem",
          color: "#8a6c2a", lineHeight: 1.5,
        }}>
          Handcrafted with care — every sip tells a story
        </p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
          style={{
            height: 1, marginTop: 22,
            background: "linear-gradient(90deg, transparent, #d4a843, transparent)",
            transformOrigin: "center",
          }}
        />
      </motion.div>

      {/* Sticky tab bar */}
      <div style={{
        position: "sticky", top: 0, zIndex: 50,
        padding: "10px 0 8px",
        background: "linear-gradient(to bottom, #080400 78%, transparent)",
      }}>
        <div 
          className="scroll-tabs"
          style={{
            maxWidth: 900, margin: "0 auto",
            display: "flex", flexWrap: "nowrap",
            overflowX: "auto",
            gap: "7px 8px", padding: "6px 8px 10px",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {menuCategories.map((cat) => (
            <TabPill
              key={cat.id}
              cat={cat}
              active={activeTab === cat.id}
              onClick={() => scrollToCategory(cat.id)}
            />
          ))}
        </div>
      </div>

      {/* Freebie banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="freebie-banner"
        style={{
          maxWidth: 900, margin: "24px auto",
          padding: "14px 22px",
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 12, flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: "1.3rem" }}>🎁</span>
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "0.88rem", color: "#c8a855",
          fontWeight: 500, textAlign: "center",
        }}>
          Free gift on orders above{" "}
          <strong style={{ color: "#f0c96a", fontFamily: "'Syne', sans-serif", fontSize: "1rem" }}>₹1500</strong>
        </p>
        <span style={{ fontSize: "1.3rem" }}>🎁</span>
      </motion.div>

      {/* Bento grid */}
      <div style={{
        maxWidth: 900, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 410px), 1fr))",
        gap: 20,
      }}>
        {menuCategories.map((cat, i) => (
          <CategoryCard key={cat.id} cat={cat} index={i} />
        ))}
      </div>

    </section>
  );
}
