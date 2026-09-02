import React from "react";
import { Star, Utensils, Check } from "lucide-react";
import { C, DISPLAY, BODY } from "@/data/constants";

export function Logo({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2.5" style={{ background: "none", border: "none", cursor: "pointer" }}>
      <span style={{ width: 34, height: 34, borderRadius: 10, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Utensils size={17} color="#fff" strokeWidth={2.2} />
      </span>
      <span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 22, color: C.ink, letterSpacing: -0.4 }}>RestoMatch</span>
    </button>
  );
}

export function Pill({ active, onClick, children, style }: { active?: boolean; onClick?: () => void; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <button onClick={onClick} className="transition-all" style={{
      padding: "9px 16px", borderRadius: 999, border: `1px solid ${active ? C.accent : C.line}`,
      background: active ? C.accent : "#fff", color: active ? "#fff" : C.ink,
      fontFamily: BODY, fontWeight: 500, fontSize: 13.5, cursor: "pointer", whiteSpace: "nowrap",
      transition: "all .2s ease", ...style,
    }}>{children}</button>
  );
}

export function BtnPrimary({ children, onClick, full, style, type = "button" }: { children: React.ReactNode; onClick?: () => void; full?: boolean; style?: React.CSSProperties; type?: "button" | "submit" }) {
  return (
    <button type={type} onClick={onClick} className="transition-all" style={{
      background: C.ink, color: "#fff", border: "none", padding: "14px 28px", borderRadius: 12,
      fontFamily: BODY, fontWeight: 600, fontSize: 14.5, cursor: "pointer",
      width: full ? "100%" : "auto", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
      transition: "all .2s ease", ...style,
    }} onMouseEnter={(e) => (e.currentTarget.style.background = "#000")}
      onMouseLeave={(e) => (e.currentTarget.style.background = C.ink)}>{children}</button>
  );
}

export function BtnOutline({ children, onClick, full, style }: { children: React.ReactNode; onClick?: () => void; full?: boolean; style?: React.CSSProperties }) {
  return (
    <button onClick={onClick} className="transition-all" style={{
      background: "transparent", color: C.ink, border: `1px solid ${C.line}`, padding: "14px 28px", borderRadius: 12,
      fontFamily: BODY, fontWeight: 600, fontSize: 14.5, cursor: "pointer",
      width: full ? "100%" : "auto", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
      transition: "all .2s ease", ...style,
    }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.ink; e.currentTarget.style.background = C.lineSoft; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.line; e.currentTarget.style.background = "transparent"; }}>{children}</button>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p style={{ fontFamily: BODY, color: C.accent, fontWeight: 600, fontSize: 13, marginBottom: 8, letterSpacing: 0.3 }}>{children}</p>;
}

export function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
      <Star size={13} color={C.gold} fill={C.gold} />
      <span style={{ fontFamily: BODY, fontWeight: 600, fontSize: 13, color: C.ink }}>{rating.toFixed(1)}</span>
    </span>
  );
}

export function Card({ children, style, onClick, hover }: { children: React.ReactNode; style?: React.CSSProperties; onClick?: () => void; hover?: boolean }) {
  return (
    <div onClick={onClick} className="transition-all" style={{
      background: C.surface, border: `1px solid ${C.line}`, borderRadius: 16, transition: "all .25s ease",
      ...(hover ? { cursor: "pointer" } : {}), ...style,
    }} onMouseEnter={hover ? (e) => { e.currentTarget.style.borderColor = "#D5CCBF"; e.currentTarget.style.boxShadow = C.shadow; } : undefined}
      onMouseLeave={hover ? (e) => { e.currentTarget.style.borderColor = C.line; e.currentTarget.style.boxShadow = "none"; } : undefined}>{children}</div>
  );
}

export { Check };
