"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOrder } from "@/lib/OrderContext";
import { sounds } from "@/lib/soundEffects";

export default function OrderTray() {
  const { selectedItems, addItem, removeItem, clearTray, getTotalQuantity, getTotalPrice } = useOrder();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const totalQty = getTotalQuantity();
  const totalPrice = getTotalPrice();

  const handleOpenDrawer = () => {
    sounds.playChime();
    setIsDrawerOpen(true);
  };

  if (totalQty === 0) return null;

  return (
    <>
      {/* Floating Bottom Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        style={{
          position: "fixed",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 90,
          width: "calc(100% - 32px)",
          maxWidth: 500,
        }}
      >
        <div
          onClick={handleOpenDrawer}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 20px",
            borderRadius: "16px",
            background: "linear-gradient(145deg, rgba(25, 16, 2, 0.96) 0%, rgba(15, 9, 0, 0.98) 100%)",
            border: "1px solid rgba(212, 168, 67, 0.45)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.8), 0 0 20px rgba(212,168,67,0.15)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "rgba(212, 168, 67, 0.15)",
              color: "#d4a843",
            }}>
              {/* Order board list SVG */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 18, height: 18 }}>
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{
                position: "absolute",
                top: -5,
                right: -5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 18,
                height: 18,
                borderRadius: 9,
                background: "#d4a843",
                color: "#080400",
                fontSize: "0.68rem",
                fontWeight: 800,
                padding: "0 4px",
              }}>
                {totalQty}
              </span>
            </div>
            <div>
              <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#f2e8d5", margin: 0 }}>
                {totalQty} Item{totalQty > 1 ? "s" : ""} Selected
              </p>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.68rem", color: "#8a6c2a", margin: 0 }}>
                Tap to view &amp; show waiter
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "1.05rem",
              fontWeight: 800,
              color: "#f0c96a",
            }}>
              ₹{totalPrice}
            </span>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "6px 14px",
              borderRadius: "999px",
              background: "linear-gradient(135deg, #d4a843 0%, #f0c96a 100%)",
              color: "#080400",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}>
              VIEW ORDER ↑
            </span>
          </div>
        </div>
      </motion.div>

      {/* Drawer Overlay & Content */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                sounds.playDown();
                setIsDrawerOpen(false);
              }}
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                zIndex: 100,
              }}
            />

            {/* Bottom Drawer */}
            <motion.div
              initial={{ y: "100%", x: "-50%" }}
              animate={{ y: 0, x: "-50%" }}
              exit={{ y: "100%", x: "-50%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              style={{
                position: "fixed",
                bottom: 0,
                left: "50%",
                zIndex: 101,
                backgroundColor: "#0b0601",
                borderTop: "1px solid rgba(212, 168, 67, 0.4)",
                borderTopLeftRadius: "28px",
                borderTopRightRadius: "28px",
                width: "100%",
                maxWidth: 600,
                maxHeight: "92vh",
                overflowY: "auto",
                boxShadow: "0 -20px 40px rgba(0,0,0,0.9)",
                padding: "24px 20px 40px",
              }}
            >
              {/* Drag Handle Indicator */}
              <div
                style={{
                  width: 48,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: "rgba(212, 168, 67, 0.25)",
                  margin: "0 auto 20px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  sounds.playDown();
                  setIsDrawerOpen(false);
                }}
              />

              {/* Header */}
              <div style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: 20,
              }}>
                <div>
                  <h3 style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "1.35rem",
                    fontWeight: 800,
                    color: "#f0c96a",
                    margin: 0,
                  }}>
                    🛎️ Order Assistant
                  </h3>
                  <p style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontStyle: "italic",
                    fontSize: "0.85rem",
                    color: "#8a6c2a",
                    marginTop: 4,
                  }}>
                    Show this list to the waiter when they arrive to take your order.
                  </p>
                </div>
                
                {/* Action buttons */}
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <button
                    onClick={() => {
                      clearTray();
                      setIsDrawerOpen(false);
                    }}
                    style={{
                      background: "rgba(248, 113, 113, 0.08)",
                      border: "1px solid rgba(248, 113, 113, 0.3)",
                      borderRadius: "10px",
                      color: "#f87171",
                      padding: "8px 14px",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    Clear All
                  </button>
                  
                  <button
                    onClick={() => {
                      sounds.playDown();
                      setIsDrawerOpen(false);
                    }}
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(212, 168, 67, 0.25)",
                      borderRadius: "50%",
                      color: "#d4a843",
                      width: 36,
                      height: 36,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Item List */}
              <div style={{
                maxHeight: "280px",
                overflowY: "auto",
                marginBottom: 20,
                paddingRight: 4,
              }}>
                {selectedItems.map((item) => {
                  return (
                    <div
                      key={item.name}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "14px 0",
                        borderBottom: "1px solid rgba(212, 168, 67, 0.12)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0, flex: 1 }}>
                        <span style={{
                          fontFamily: "'Syne', sans-serif",
                          fontSize: "1rem",
                          fontWeight: 800,
                          color: "#d4a843",
                        }}>
                          {item.quantity}x
                        </span>
                        
                        <div>
                          <span style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "0.95rem",
                            color: "#e8d5b0",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            display: "block",
                          }}>
                            {item.name}
                          </span>
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <span style={{
                          fontFamily: "'Syne', sans-serif",
                          fontSize: "0.95rem",
                          fontWeight: 700,
                          color: "#f2e8d5",
                        }}>
                          ₹{item.price * item.quantity}
                        </span>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "2px 6px",
                          borderRadius: "6px",
                          border: "1px solid rgba(212, 168, 67, 0.4)",
                          background: "rgba(212, 168, 67, 0.04)",
                        }}>
                          <button
                            onClick={() => {
                              sounds.playDown();
                              removeItem(item);
                            }}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#d4a843",
                              fontSize: "0.95rem",
                              fontWeight: "bold",
                              cursor: "pointer",
                              width: 20,
                              height: 20,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            —
                          </button>
                          <span style={{
                            fontFamily: "'Syne', sans-serif",
                            fontSize: "0.8rem",
                            fontWeight: 700,
                            color: "#fff",
                            minWidth: 12,
                            textAlign: "center",
                          }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => {
                              sounds.playTick();
                              addItem(item);
                            }}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#d4a843",
                              fontSize: "0.95rem",
                              fontWeight: "bold",
                              cursor: "pointer",
                              width: 20,
                              height: 20,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Customization Note */}
              <div style={{
                padding: "12px 16px",
                background: "rgba(212, 168, 67, 0.06)",
                border: "1px dashed rgba(212, 168, 67, 0.3)",
                borderRadius: "14px",
                marginBottom: 24,
                textAlign: "center",
              }}>
                <p style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.82rem",
                  color: "#f0c96a",
                  margin: 0,
                  lineHeight: 1.4,
                }}>
                  💡 <strong>For any additions or customizations</strong> (sweetness, ice, cheese, etc.), please tell your waiter!
                </p>
              </div>

              {/* Waiter Presentation Mode (Giant Readable View) */}
              <div style={{
                background: "radial-gradient(circle at 50% 50%, rgba(212, 168, 67, 0.08) 0%, rgba(212, 168, 67, 0.02) 100%)",
                border: "2px dashed rgba(212, 168, 67, 0.45)",
                borderRadius: "20px",
                padding: "24px 20px",
                marginBottom: 28,
                boxShadow: "inset 0 0 20px rgba(0,0,0,0.6)",
              }}>
                <p style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.68rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#d4a843",
                  fontWeight: 700,
                  marginBottom: 16,
                  textAlign: "center",
                }}>
                  📢 Please let your waiter know what do you want
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {selectedItems.map((item) => {
                    return (
                      <div key={item.name} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                          <span style={{
                            fontFamily: "'Syne', sans-serif",
                            fontSize: "1.45rem",
                            fontWeight: 800,
                            color: "#f0c96a",
                            textShadow: "0 0 10px rgba(212,168,67,0.3)",
                          }}>
                            {item.quantity}
                          </span>
                          <span style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "0.8rem",
                            color: "#8a6c2a",
                            textTransform: "uppercase",
                            fontWeight: 700,
                          }}>
                            ×
                          </span>
                          <span style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "1.35rem",
                            fontWeight: 700,
                            color: "#f2e8d5",
                            letterSpacing: "-0.01em",
                          }}>
                            {item.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Summary Bar */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: 20,
                borderTop: "1px solid rgba(212, 168, 67, 0.25)",
              }}>
                <div>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.72rem", color: "#8a6c2a", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Total Amount
                  </p>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.8rem", fontWeight: 800, color: "#f0c96a", margin: 0 }}>
                    ₹{totalPrice}
                  </p>
                </div>
                <button
                  onClick={() => {
                    sounds.playDown();
                    setIsDrawerOpen(false);
                  }}
                  style={{
                    padding: "14px 32px",
                    borderRadius: "999px",
                    background: "linear-gradient(135deg, #d4a843 0%, #f0c96a 100%)",
                    color: "#080400",
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "0.82rem",
                    letterSpacing: "0.1em",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 10px 24px rgba(212,168,67,0.45)",
                  }}
                >
                  KEEP BROWSING
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
