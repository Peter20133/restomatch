import React from "react";
import { Heart, MapPin, Clock } from "lucide-react";
import { C, BODY, DISPLAY, MOODS, Restaurant } from "@/data/constants";
import { Card, Stars } from "./ui";

export function RestaurantCard({ r, onOpen, saved, onToggleSave }: { r: Restaurant & { score?: number }; onOpen: () => void; saved: boolean; onToggleSave: () => void }) {
  return (
    <Card hover onClick={onOpen} style={{ overflow: "hidden" }}>
      <div style={{ position: "relative" }}>
        <img src={r.image} alt={r.name} style={{ width: "100%", height: 190, objectFit: "cover" }} />
        <span style={{ position: "absolute", top: 12, left: 12, background: "rgba(255,255,255,0.95)", color: C.ink, fontFamily: BODY, fontWeight: 600, fontSize: 12, padding: "5px 10px", borderRadius: 999, backdropFilter: "blur(4px)" }}>{r.score ?? 90}% match</span>
        <button onClick={(e) => { e.stopPropagation(); onToggleSave(); }} style={{ position: "absolute", top: 10, right: 10, width: 32, height: 32, borderRadius: 999, background: "rgba(255,255,255,0.95)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Heart size={15} color={saved ? C.accent : C.inkSoft} fill={saved ? C.accent : "none"} />
        </button>
      </div>
      <div style={{ padding: "16px 18px 18px" }}>
        <div className="flex items-center justify-between"><p style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 17, color: C.ink }}>{r.name}</p><Stars rating={r.rating} /></div>
        <p style={{ fontFamily: BODY, color: C.inkSoft, fontSize: 13, marginTop: 5 }}>{r.cuisineLabel} • {MOODS.find((m) => m.id === r.mood)?.label}</p>
        <div className="flex items-center justify-between" style={{ marginTop: 12 }}>
          <span style={{ fontFamily: BODY, fontWeight: 600, fontSize: 13, color: C.ink }}>{r.price}</span>
          <span style={{ fontFamily: BODY, fontSize: 12.5, color: C.inkSoft, display: "flex", alignItems: "center", gap: 3 }}><MapPin size={12} /> {r.distance}</span>
        </div>
        <p style={{ fontFamily: BODY, fontSize: 12, color: C.inkSoft, marginTop: 8, display: "flex", alignItems: "center", gap: 4 }}><Clock size={11} /> Deschis până la {r.openUntil}</p>
      </div>
    </Card>
  );
}
