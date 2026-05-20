import { useState, useEffect } from "react";
import Desktop from "./components/Desktop";

import "./App.css";

const DIALOGUE = [
  "Hey, I'm Nikita 🌸",
  "The kettle is warm, and lamp is on.",
  "Feel free to look around ✦",
];

export default function App() {
  const [screen, setScreen]             = useState("loading");
  const [loadReady, setLoadReady]       = useState(false);
  const [typedText, setTypedText]       = useState("");
  const [dialogueDone, setDialogueDone] = useState(false);
  const [showDesktop, setShowDesktop]   = useState(false);
  const [showDiary, setShowDiary]       = useState(false);
  const [showGuest, setShowGuest]       = useState(false);
  const [diaryTab, setDiaryTab]         = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setLoadReady(true), 3200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (screen !== "intro") return;
    let li = 0, ci = 0, built = "";
    const tick = setInterval(() => {
      if (li >= DIALOGUE.length) { clearInterval(tick); setDialogueDone(true); return; }
      const line = DIALOGUE[li];
      if (ci < line.length) { built += line[ci]; ci++; }
      else { built += "\n"; li++; ci = 0; }
      setTypedText(built);
    }, 65);
    return () => clearInterval(tick);
  }, [screen]);

  return (
    <main className="app-root">

      {/* ── STARS ── */}
      {(screen === "loading" || screen === "intro") && (
        <div className="starfield" aria-hidden="true">
          {Array.from({ length: 80 }).map((_, i) => (
            <span key={i} className="star" style={{
              width:  `${Math.random() * 2.5 + 1}px`,
              height: `${Math.random() * 2.5 + 1}px`,
              top:    `${Math.random() * 100}%`,
              left:   `${Math.random() * 100}%`,
              animationDelay:    `${Math.random() * 3}s`,
              animationDuration: `${1.5 + Math.random() * 2}s`,
            }} />
          ))}
        </div>
      )}

      {/* ══════════ LOADING ══════════ */}
      {screen === "loading" && (
        <section className="screen loading-screen">
          <div className="load-box">
            <div className="load-title">NikiTacos.exe</div>
            <div className="load-sub">✦ initializing portfolio... ✦</div>
            <div className="load-bar-wrap"><div className="load-bar" /></div>
            <button
              className={`press-start${loadReady ? " ready" : ""}`}
              disabled={!loadReady}
              onClick={() => setScreen("intro")}
            >[ PRESS START ]</button>
          </div>
        </section>
      )}

      {/* ══════════ INTRO ══════════ */}
      {screen === "intro" && (
        <section className="screen intro-screen">
          <div className="glow glow-tl" aria-hidden="true" />
          <div className="glow glow-br" aria-hidden="true" />
          <div className="intro-layout">

            <div className="avatar-frame">
              <div className="pixel-titlebar">
                <span className="dot dot-r"/><span className="dot dot-y"/><span className="dot dot-g"/>
                <span className="pixel-titlebar-text">nikitacos.exe ♥</span>
              </div>
              <div className="avatar-img-wrap">
                <img src="/avatar.png" alt="Nikita pixel avatar" />
              </div>
              <div className="avatar-footer"><p>still figuring it out ◡</p></div>
            </div>

            <div className="dialogue-box">
              <div className="pixel-titlebar">
                <span className="dot dot-r"/><span className="dot dot-y"/><span className="dot dot-g"/>
                <span className="pixel-titlebar-text">nikita.dialogue</span>
              </div>
              <div className="dialogue-text">
                {typedText.split("\n").map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
                <span className="blink-cursor">▌</span>
              </div>
              <div className="dialogue-footer">
                <button
                  className={`pixel-btn${dialogueDone ? " visible" : ""}`}
                  disabled={!dialogueDone}
                  onClick={() => setScreen("room")}
                >[ Enter World ]</button>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* ══════════ ROOM ══════════ */}
      {screen === "room" && (
        <section className="screen room-screen">
          <img className="room-bg" src="/room-bg.png" alt="cozy room" />
          <div className="room-overlay" aria-hidden="true" />

          {/* Glowing dot — PC */}
          <button className="hotspot hotspot-pc" onClick={() => setShowDesktop(true)}>
            <span className="hotspot-dot" />
            <span className="hotspot-label">🖥 Open PC</span>
          </button>

          {/* Glowing dot — Diary */}
          <button className="hotspot hotspot-journal" onClick={() => setShowDiary(true)}>
            <span className="hotspot-dot" />
            <span className="hotspot-label">📔 Open Diary</span>
          </button>

          {/* Glowing dot — Guestbook */}
          <button className="hotspot hotspot-guest" onClick={() => setShowGuest(true)}>
            <span className="hotspot-dot" />
            <span className="hotspot-label">✍️ Guestbook</span>
          </button>
        </section>
      )}

      {/* ══════════ PC DESKTOP ══════════ */}
      {showDesktop && <Desktop onClose={() => setShowDesktop(false)} />}

      {/* ══════════ DIARY ══════════ */}
      {showDiary && (
        <Diary
          initialTab={diaryTab}
          onClose={() => { setShowDiary(false); setDiaryTab(0); }}
        />
      )}

      {/* ══════════ GUESTBOOK POPUP ══════════ */}
      {showGuest && <GuestbookPopup onClose={() => setShowGuest(false)} />}

    </main>
  );
}

/* ══════════════════════════════════════════
   GUESTBOOK POPUP — styled like your screenshot
══════════════════════════════════════════ */
function GuestbookPopup({ onClose }) {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [note, setNote]       = useState("");
  const [sent, setSent]       = useState(false);
  const [notes, setNotes]     = useState([]);
  const [loading, setLoading] = useState(true);

  /* load existing notes on mount */
  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get("guestbook-notes", true);
        setNotes(r ? JSON.parse(r.value) : []);
      } catch { setNotes([]); }
      setLoading(false);
    })();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !note.trim()) return;
    const entry = { name: name.trim(), email: email.trim(), note: note.trim(), ts: Date.now() };
    const updated = [...notes, entry];
    try { await window.storage.set("guestbook-notes", JSON.stringify(updated), true); } catch {}
    setNotes(updated);
    setSent(true);
    setName(""); setEmail(""); setNote("");
    setTimeout(() => setSent(false), 3000);
  }

  const NOTE_COLORS = ["#fef3a0","#ffd6e0","#d4f0c0","#dce8ff","#f3e5f5","#ffe0cc"];
  const NOTE_ROTS   = [-3, 2, -1, 3, -2, 1.5];

  return (
    <div className="gb-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="gb-popup">

        {/* tape strip at top */}
        <div className="gb-tape" />

        {/* close */}
        <button className="gb-close" onClick={onClose}>✕</button>

        {/* header */}
        <div className="gb-header">
          <p className="gb-eyebrow">LEAVE · A · NOTE</p>
          <h2 className="gb-title">Drop me a sticky note</h2>
          <p className="gb-subtitle">I'll find it on my desk by morning ✨</p>
        </div>

        {/* form */}
        <form className="gb-form" onSubmit={handleSubmit}>
          <div className="gb-field">
            <label className="gb-label">YOUR NAME</label>
            <input className="gb-input" value={name} onChange={e => setName(e.target.value)} maxLength={40} required />
          </div>
          <div className="gb-field">
            <label className="gb-label">YOUR EMAIL</label>
            <input className="gb-input" type="email" value={email} onChange={e => setEmail(e.target.value)} maxLength={80} />
          </div>
          <div className="gb-field">
            <label className="gb-label">YOUR NOTE</label>
            <textarea className="gb-textarea" value={note} onChange={e => setNote(e.target.value)} maxLength={200} required />
          </div>
          <button className="gb-submit" type="submit">
            <span>✈</span> SEND NOTE
          </button>
          {sent && <p className="gb-success">Note pinned! ✦ Thank you for visiting~</p>}
        </form>

        {/* divider */}
        <div className="gb-divider">
          <span className="gb-divider-label">OR FIND ME AT</span>
        </div>

        {/* socials */}
        <div className="gb-socials">
          {[
            { icon: "🐙", href: "https://github.com/niksxox" },
            { icon: "💼", href: "https://www.linkedin.com/in/nikita-singh-912777342/" },
            { icon: "📸", href: "https://www.instagram.com/3xp3ll1armus/" },
            { icon: "📧", href: "mailto:nikitas.7927@gmail.com" },
          ].map(s => (
            <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="gb-social-btn">
              {s.icon}
            </a>
          ))}
        </div>

        {/* existing notes wall */}
        {!loading && notes.length > 0 && (
          <div className="gb-notes-section">
            <p className="gb-notes-heading">✦ notes on my wall</p>
            <div className="gb-notes-wall">
              {notes.slice(-12).map((n, i) => (
                <div
                  key={n.ts}
                  className="gb-wall-note"
                  style={{
                    background: NOTE_COLORS[i % NOTE_COLORS.length],
                    transform: `rotate(${NOTE_ROTS[i % NOTE_ROTS.length]}deg)`,
                  }}
                >
                  <div className="gb-wall-pin" />
                  <p className="gb-wall-name">{n.name}</p>
                  <p className="gb-wall-text">{n.note}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}