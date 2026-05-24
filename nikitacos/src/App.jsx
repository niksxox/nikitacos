import { useState, useEffect, useMemo } from "react";
import Desktop from "./components/Desktop";
import "./App.css";

const DIALOGUE = [
  "Hey, I'm Nikita 🌸",
  "The kettle is warm, and lamp is on.",
  "Feel free to look around ✦",
];


const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  width:  `${Math.random() * 2.5 + 1}px`,
  height: `${Math.random() * 2.5 + 1}px`,
  top:    `${Math.random() * 100}%`,
  left:   `${Math.random() * 100}%`,
  animationDelay:    `${Math.random() * 3}s`,
  animationDuration: `${1.5 + Math.random() * 2}s`,
}));

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

      
      {(screen === "loading" || screen === "intro") && (
        <div className="starfield" aria-hidden="true">
          {STARS.map(s => (
            <span key={s.id} className="star" style={{
              width:             s.width,
              height:            s.height,
              top:               s.top,
              left:              s.left,
              animationDelay:    s.animationDelay,
              animationDuration: s.animationDuration,
            }} />
          ))}
        </div>
      )}

      
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

      {screen === "intro" && (
        <section className="screen intro-screen">
          <div className="glow glow-tl" aria-hidden="true" />
          <div className="glow glow-br" aria-hidden="true" />
          <div className="intro-layout">

            <div className="photo-frame">
              <div className="photo-img-wrap">
                <img src="/photo.png" alt="Nikita" className="photo-img" />
              </div>
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
                >[ Enter 🌼]</button>
              </div>
            </div>

          </div>
        </section>
      )}

      
      {screen === "room" && (
        <section className="screen room-screen">
          <img className="room-bg" src="/room-bg.png" alt="cozy room" />
          <div className="room-overlay" aria-hidden="true" />

          <button className="hotspot hotspot-pc" onClick={() => setShowDesktop(true)}>
            <span className="hotspot-dot" />
            <span className="hotspot-label">🖥 Open PC</span>
          </button>

          <button className="hotspot hotspot-journal" onClick={() => setShowDiary(true)}>
            <span className="hotspot-dot" />
            <span className="hotspot-label">📔 Open Diary</span>
          </button>

          <button className="hotspot hotspot-guest" onClick={() => setShowGuest(true)}>
            <span className="hotspot-dot" />
            <span className="hotspot-label">✍️ Guestbook</span>
          </button>
        </section>
      )}

      
      {showDesktop && <Desktop onClose={() => setShowDesktop(false)} />}

      
      {showDiary && (
        <Diary
          initialTab={diaryTab}
          onClose={() => { setShowDiary(false); setDiaryTab(0); }}
        />
      )}

      
      {showGuest && <GuestbookPopup onClose={() => setShowGuest(false)} />}

    </main>
  );
}

const DIARY_PAGES = [
  { src: "/pg1.png", label: "meet me" },
  { src: "/pg2.png", label: "academics" },
  { src: "/pg3.png", label: "experiences" },
];

function Diary({ onClose }) {
  const [page, setPage]       = useState(0);
  const [turning, setTurning] = useState(false);
  const [dir, setDir]         = useState("next");

  function goTo(next) {
    if (turning || next === page) return;
    setDir(next > page ? "next" : "prev");
    setTurning(true);
    setTimeout(() => {
      setPage(next);
      setTurning(false);
    }, 380);
  }

  return (
    <div className="diary-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="diary-book">

        <div className="diary-spine">
          <span className="diary-spine-text">nikita's diary ♡</span>
        </div>

        <div className="diary-page-wrap">

          <div className="diary-dots">
            {DIARY_PAGES.map((_, i) => (
              <button
                key={i}
                className={`diary-dot${page === i ? " active" : ""}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>

          <div className={`diary-page-inner${turning ? ` turning-${dir}` : ""}`}>
            <img
              src={DIARY_PAGES[page].src}
              alt={DIARY_PAGES[page].label}
              className="diary-page-img"
            />
          </div>

          <button
            className="diary-arrow diary-arrow-left"
            onClick={() => goTo(page - 1)}
            disabled={page === 0}
          >‹</button>
          <button
            className="diary-arrow diary-arrow-right"
            onClick={() => goTo(page + 1)}
            disabled={page === DIARY_PAGES.length - 1}
          >›</button>

          <button className="diary-close-btn" onClick={onClose}>✕</button>

          <div className="diary-page-label">{DIARY_PAGES[page].label} · {page + 1} / {DIARY_PAGES.length}</div>
        </div>

      </div>
    </div>
  );
}

const EMAILJS_TEMPLATE_ID = "template_h44q5s3";

function GuestbookPopup({ onClose }) {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [note, setNote]       = useState("");
  const [sent, setSent]       = useState(false);
  const [sending, setSending] = useState(false);
  const [notes, setNotes]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get("guestbook-notes", true);
        setNotes(r ? JSON.parse(r.value) : []);
      } catch { setNotes([]); }
      setLoading(false);
    })();
  }, []);

  async function handleSubmit() {
    if (!name.trim() || !note.trim() || sending) return;
    setSending(true);

    // Send email via EmailJS
    try {
      await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          template_id: EMAILJS_TEMPLATE_ID,
          template_params: {
            from_name:  name.trim(),
            from_email: email.trim() || "not provided",
            message:    note.trim(),
          },
        }),
      });
    } catch (err) {
      console.error("EmailJS error:", err);
    }

   
    const entry = { name: name.trim(), email: email.trim(), note: note.trim(), ts: Date.now() };
    const updated = [...notes, entry];
    try { await window.storage.set("guestbook-notes", JSON.stringify(updated), true); } catch {}
    setNotes(updated);
    setSending(false);
    setSent(true);
    setName(""); setEmail(""); setNote("");
    setTimeout(() => setSent(false), 3500);
  }

  const NOTE_COLORS = ["#fef3a0","#ffd6e0","#d4f0c0","#dce8ff","#f3e5f5","#ffe0cc"];
  const NOTE_ROTS   = [-3, 2, -1, 3, -2, 1.5];

  return (
    <div className="gb-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="gb-popup">
        <div className="gb-tape" />
        <button className="gb-close" onClick={onClose}>✕</button>

        <div className="gb-header">
          <p className="gb-eyebrow">LEAVE · A · NOTE</p>
          <h2 className="gb-title">Drop me a sticky note</h2>
          <p className="gb-subtitle">I'll find it on my desk by morning ✨</p>
        </div>

        
        <div className="gb-form">
          <div className="gb-field">
            <label className="gb-label">YOUR NAME</label>
            <input className="gb-input" value={name} onChange={e => setName(e.target.value)} maxLength={40} />
          </div>
          <div className="gb-field">
            <label className="gb-label">YOUR EMAIL</label>
            <input className="gb-input" type="email" value={email} onChange={e => setEmail(e.target.value)} maxLength={80} />
          </div>
          <div className="gb-field">
            <label className="gb-label">YOUR NOTE</label>
            <textarea className="gb-textarea" value={note} onChange={e => setNote(e.target.value)} maxLength={200} />
          </div>
          <button
            className="gb-submit"
            onClick={handleSubmit}
            disabled={!name.trim() || !note.trim() || sending}
          >
            <span>{sending ? "..." : "✈"}</span> {sending ? "SENDING..." : "SEND NOTE"}
          </button>
          {sent && <p className="gb-success">Note pinned! ✦ Thank you for visiting~</p>}
        </div>

        <div className="gb-divider">
          <span className="gb-divider-label">OR FIND ME AT</span>
        </div>

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