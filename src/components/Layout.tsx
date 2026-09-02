import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { C, BODY } from "@/data/constants";
import { Logo, BtnPrimary } from "./ui";

export function Header({ view, setView, loggedIn }: { view: string; setView: (v: string) => void; loggedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const items = [{ id: "home", label: "Acasă" }, { id: "results", label: "Explorează" }, { id: "how", label: "Cum funcționează" }, { id: "for-restaurants", label: "Prețuri" }];
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(250,248,245,0.85)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.line}` }}>
      <div className="mx-auto flex items-center justify-between" style={{ maxWidth: 1200, padding: "14px 24px" }}>
        <Logo onClick={() => { setView("home"); setOpen(false); }} />
        <nav className="hidden md:flex items-center" style={{ gap: 32 }}>
          {items.map((it) => (
            <button key={it.id} onClick={() => setView(it.id)} style={{
              background: "none", border: "none", cursor: "pointer", fontFamily: BODY, fontWeight: 500, fontSize: 14,
              color: view === it.id ? C.ink : C.inkSoft, transition: "color .2s",
            }} onMouseEnter={(e) => (e.currentTarget.style.color = C.ink)} onMouseLeave={(e) => (e.currentTarget.style.color = view === it.id ? C.ink : C.inkSoft)}>{it.label}</button>
          ))}
        </nav>
        <div className="hidden md:flex items-center" style={{ gap: 14 }}>
          <button onClick={() => setView(loggedIn ? "dashboard" : "login")} style={{
            background: "none", border: "none", cursor: "pointer", fontFamily: BODY, fontWeight: 500, fontSize: 14, color: C.inkSoft,
          }}>{loggedIn ? "Contul meu" : "Login"}</button>
          <BtnPrimary onClick={() => setView("search")} style={{ padding: "10px 20px", fontSize: 14, borderRadius: 10 }}>Găsește un restaurant</BtnPrimary>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ background: "none", border: "none" }}>
          {open ? <X size={24} color={C.ink} /> : <Menu size={24} color={C.ink} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden" style={{ borderTop: `1px solid ${C.line}`, padding: "12px 24px", display: "flex", flexDirection: "column", gap: 2, background: C.surface }}>
          {items.map((it) => (
            <button key={it.id} onClick={() => { setView(it.id); setOpen(false); }} style={{ textAlign: "left", padding: "12px 0", background: "none", border: "none", fontFamily: BODY, fontWeight: 500, fontSize: 15, color: view === it.id ? C.ink : C.inkSoft }}>{it.label}</button>
          ))}
          <button onClick={() => { setView(loggedIn ? "dashboard" : "login"); setOpen(false); }} style={{ textAlign: "left", padding: "12px 0", background: "none", border: "none", fontFamily: BODY, fontWeight: 500, fontSize: 15, color: C.inkSoft }}>{loggedIn ? "Contul meu" : "Login"}</button>
          <BtnPrimary onClick={() => { setView("search"); setOpen(false); }} full style={{ marginTop: 8 }}>Găsește un restaurant</BtnPrimary>
        </div>
      )}
    </header>
  );
}

export function Footer({ setView }: { setView: (v: string) => void }) {
  return (
    <footer style={{ borderTop: `1px solid ${C.line}`, marginTop: 100, background: C.surface }}>
      <div className="mx-auto" style={{ maxWidth: 1200, padding: "56px 24px 32px" }}>
        <div className="flex flex-col md:flex-row md:justify-between" style={{ gap: 32 }}>
          <div style={{ maxWidth: 320 }}>
            <Logo onClick={() => setView("home")} />
            <p style={{ fontFamily: BODY, color: C.inkSoft, fontSize: 14, marginTop: 14, lineHeight: 1.6 }}>Restaurantul potrivit, găsit pentru tine. Fără compromisuri.</p>
          </div>
          <div className="flex flex-wrap" style={{ gap: 48 }}>
            <div>
              <p style={{ fontFamily: BODY, fontWeight: 600, fontSize: 13, color: C.ink, marginBottom: 12, letterSpacing: 0.3 }}>Platformă</p>
              {[["home","Acasă"],["results","Explorează"],["how","Cum funcționează"],["surprise","Surprinde-mă"]].map(([v,l]) => (
                <button key={v} onClick={() => setView(v)} style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontFamily: BODY, fontSize: 14, color: C.inkSoft, padding: "5px 0" }}>{l}</button>
              ))}
            </div>
            <div>
              <p style={{ fontFamily: BODY, fontWeight: 600, fontSize: 13, color: C.ink, marginBottom: 12, letterSpacing: 0.3 }}>Cont</p>
              {[["login","Login"],["dashboard","Dashboard"],["for-restaurants","Pentru restaurante"]].map(([v,l]) => (
                <button key={v} onClick={() => setView(v)} style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontFamily: BODY, fontSize: 14, color: C.inkSoft, padding: "5px 0" }}>{l}</button>
              ))}
            </div>
          </div>
        </div>
        <p style={{ fontFamily: BODY, color: C.inkSoft, fontSize: 12, marginTop: 44 }}>Prototip demonstrativ. Restaurantele și datele afișate sunt fictive.</p>
      </div>
    </footer>
  );
}
