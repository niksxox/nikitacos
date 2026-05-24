import { useState, useEffect } from "react";
import "./Desktop.css";

const WINDOWS = {
  about: {
    id: "about", title: "about.me", icon: "🧙‍♀️",
    defaultPos: { x: 80, y: 60 }, defaultSize: { w: 520, h: 420 },
  },
  projects: {
    id: "projects", title: "quests.exe", icon: "📋",
    defaultPos: { x: 120, y: 50 }, defaultSize: { w: 620, h: 460 },
  },
  skills: {
    id: "skills", title: "inventory.sys", icon: "🎒",
    defaultPos: { x: 100, y: 70 }, defaultSize: { w: 500, h: 400 },
  },
  github: {
    id: "github", title: "github.url", icon: "🐙",
    defaultPos: { x: 140, y: 80 }, defaultSize: { w: 380, h: 200 },
  },
  contact: {
    id: "contact", title: "summon.me", icon: "📬",
    defaultPos: { x: 110, y: 90 }, defaultSize: { w: 440, h: 360 },
  },
};

export default function Desktop({ onClose }) {
  const [openWindows, setOpenWindows] = useState([]);
  const [focused,     setFocused]     = useState(null);
  const [positions,   setPositions]   = useState({});
  const [clock,       setClock]       = useState("");

  useEffect(() => {
    function tick() {
      const d = new Date();
      let h = d.getHours(), m = d.getMinutes();
      const ap = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      setClock(`${h}:${String(m).padStart(2,"0")} ${ap}`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  function openWindow(key) {
    if (!openWindows.includes(key)) {
      setOpenWindows(prev => [...prev, key]);
      const base = WINDOWS[key].defaultPos;
      setPositions(prev => ({
        ...prev,
        [key]: { x: base.x + openWindows.length * 20, y: base.y + openWindows.length * 16 },
      }));
    }
    setFocused(key);
  }

  function closeWindow(key) {
    setOpenWindows(prev => prev.filter(k => k !== key));
    setFocused(null);
  }

  function handleGitHub() {
    window.open("https://github.com/niksxox", "_blank");
  }

  return (
    <div className="dt-overlay">
      <div className="dt-shell">
        
        <img className="dt-wallpaper" src="/Desktop.png" alt="wallpaper"
          onError={e => { e.target.style.display = "none"; e.target.parentElement.style.background = "linear-gradient(135deg,#4a9c6f,#87ceeb)"; }}
        />

        <div className="dt-hotspots">
      
          <button className="dt-hs" style={{left:"1%", top:"4%",  width:"12%", height:"23%"}} onClick={() => openWindow("projects")} />
       
          <button className="dt-hs" style={{left:"1%", top:"29%", width:"12%", height:"23%"}} onClick={handleGitHub} />
          
          <button className="dt-hs" style={{left:"1%", top:"54%", width:"12%", height:"23%"}} onClick={() => openWindow("skills")} />
        </div>

     
        <a
          className="dt-resume-icon"
          href="/resume.pdf"
          download="Nikita_Singh_Resume.pdf"
        >
          <div className="dt-resume-img">📄</div>
          <div className="dt-resume-label">Resume</div>
        </a>

        {openWindows.map(key => (
          <PixelWindow
            key={key}
            winKey={key}
            isFocused={focused === key}
            position={positions[key] || WINDOWS[key].defaultPos}
            size={WINDOWS[key].defaultSize}
            onFocus={() => setFocused(key)}
            onClose={() => closeWindow(key)}
            onMove={pos => setPositions(prev => ({ ...prev, [key]: pos }))}
          />
        ))}

        <div className="dt-taskbar">
          <button className="dt-start-btn">
            <span className="dt-start-icon">⊞</span> Start
          </button>
          <div className="dt-taskbar-divider" />
          {openWindows.map(key => (
            <button
              key={key}
              className={`dt-taskbar-btn${focused === key ? " active" : ""}`}
              onClick={() => setFocused(key)}
            >
              {WINDOWS[key].icon} {WINDOWS[key].title}
            </button>
          ))}
          <div className="dt-taskbar-spacer" />
          <div className="dt-taskbar-tray">
            <span>🔊</span>
            <span>🌐</span>
            <span className="dt-clock">{clock}</span>
          </div>
        </div>

        <button className="dt-close-btn" onClick={onClose}>✕ Exit PC</button>
      </div>
    </div>
  );
}

function PixelWindow({ winKey, isFocused, position, size, onFocus, onClose, onMove }) {
  const win = WINDOWS[winKey];

  function startDrag(e) {
    onFocus();
    const ox = e.clientX - position.x;
    const oy = e.clientY - position.y;
    function move(ev) { onMove({ x: ev.clientX - ox, y: ev.clientY - oy }); }
    function up() { document.removeEventListener("mousemove", move); document.removeEventListener("mouseup", up); }
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  }

  return (
    <div
      className={`pw${isFocused ? " pw-focused" : ""}`}
      style={{ left: position.x, top: position.y, width: size.w, maxHeight: size.h, zIndex: isFocused ? 30 : 20 }}
      onMouseDown={onFocus}
    >
      <div className="pw-titlebar" onMouseDown={startDrag}>
        <span className="pw-title">{win.icon} {win.title}</span>
        <div className="pw-controls">
          <button className="pw-btn pw-min">─</button>
          <button className="pw-btn pw-max">□</button>
          <button className="pw-btn pw-close" onClick={e => { e.stopPropagation(); onClose(); }}>✕</button>
        </div>
      </div>
      <div className="pw-menubar">
        {["File","Edit","View","Help"].map(m => <span key={m} className="pw-menu-item">{m}</span>)}
      </div>
      <div className="pw-body">
        <WindowContent winKey={winKey} />
      </div>
    </div>
  );
}

function WindowContent({ winKey }) {
  switch (winKey) {
    case "about":    return <AboutContent />;
    case "projects": return <ProjectsContent />;
    case "skills":   return <SkillsContent />;
    case "contact":  return <ContactContent />;
    case "github":   return null;
    default: return null;
  }
}


function AboutContent() {
  return (
    <div className="wc-about">
      <div className="wc-about-left">
        <img src="/avatar.png" className="wc-avatar" alt="Nikita" />
        <div className="wc-badges">
          {["ENFJ","VIT-AP","CSE Core","she/her"].map(b => (
            <span key={b} className="wc-badge">{b}</span>
          ))}
        </div>
      </div>
      <div className="wc-about-right">
        <div className="wc-name">NIKITA SINGH</div>
        <div className="wc-role">Full Stack Developer in Training</div>
        {[
          ["CLASS",  "Full Stack Developer"],
          ["LEVEL",  "3rd Year Engineering"],
          ["BRANCH", "CSE Core @ VIT-AP"],
          ["MBTI",   "ENFJ"],
          ["STATUS", "Intern @ RailTel Corporation ⚡"],
          ["CONTRIB","GSSoC '26 Open Source"],
          ["QUEST",  "Building meaningful digital experiences"],
        ].map(([k,v]) => (
          <div key={k} className="wc-stat-row">
            <span className="wc-stat-key">{k}</span>
            <span className="wc-stat-val">{v}</span>
          </div>
        ))}
        <div className="wc-bio">
          <p>🎓 Engineering student who ended up loving both code and data.</p>
          <p>🫖 Outside of code: pilates, green tea, and reading.</p>
          <p>🦢 Figuring it out one bug at a time.</p>
        </div>
      </div>
    </div>
  );
}


const PROJECTS = [
  { emoji:"📊", title:"Netflix Data Pipeline",       tech:["Python","MySQL","ETL"],          desc:"Automated Netflix-style ETL workflow, data ingestion, transformation & dashboard.", link:"https://github.com/niksxox/Netflix-data-pipeline-project" },
  { emoji:"🎵", title:"Music Player (DLL)",           tech:["Java","DLL"],                    desc:"Retro-inspired modular music player built with Java DLL architecture.",              link:"https://github.com/niksxox/Music-Player" },
  { emoji:"⏱", title:"Study Timer",                  tech:["JavaScript","HTML","CSS"],        desc:"Productivity timer with session tracking and focus modes.",                          link:"https://github.com/niksxox/study-timer" },
  { emoji:"📈", title:"Data Dashboard",               tech:["Java","Python","HTML"],           desc:"Interactive analytics dashboard with real data and charts.",                         link:"https://github.com/niksxox/data-dashboard" },
  { emoji:"🗂", title:"GitHub Intelligence Dashboard",tech:["MongoDB","Express","React","Node"],desc:"Full MERN stack platform — transforms GitHub repos into insights.",               link:"https://github.com/niksxox" },
  { emoji:"🤖", title:"Automation Project",           tech:["Python"],                         desc:"Utility scripts that automate repetitive workflows.",                                link:"https://github.com/niksxox/Automation_project" },
];

function ProjectsContent() {
  return (
    <div className="wc-projects">
      {PROJECTS.map(p => (
        <div key={p.title} className="wc-project-card">
          <div className="wc-project-header">
            <span className="wc-project-emoji">{p.emoji}</span>
            <span className="wc-project-title">{p.title}</span>
          </div>
          <p className="wc-project-desc">{p.desc}</p>
          <div className="wc-project-footer">
            <div className="wc-tech-tags">
              {p.tech.map(t => <span key={t} className="wc-tag">{t}</span>)}
            </div>
            <a className="wc-project-link" href={p.link} target="_blank" rel="noreferrer">→ GitHub</a>
          </div>
        </div>
      ))}
    </div>
  );
}


const SKILL_CATEGORIES = [
  {
    label: "📝 Languages",
    color: "#7ab8a4",
    items: [
      { n: "Python",     i: "🐍" },
      { n: "Java",       i: "☕" },
      { n: "C",          i: "⚙"  },
      { n: "R",          i: "📊" },
      { n: "SQL",        i: "🗃"  },
      { n: "HTML",       i: "🌐" },
      { n: "CSS",        i: "🎨" },
      { n: "JavaScript", i: "⚡" },
    ],
  },
  {
    label: "🧩 Frameworks & Libraries",
    color: "#a58aa3",
    items: [
      { n: "React",       i: "⚛"  },
      { n: "Spring Boot", i: "🍃" },
      { n: "Tailwind",    i: "💨" },
      { n: "NumPy",       i: "🔢" },
      { n: "Pandas",      i: "🐼" },
    ],
  },
  {
    label: "🗄 Databases",
    color: "#c9a96e",
    items: [
      { n: "MySQL", i: "🐬" },
    ],
  },
  {
    label: "🔧 Tools & Platforms",
    color: "#b67a84",
    items: [
      { n: "Git",    i: "🌿" },
      { n: "GitHub", i: "🐙" },
      { n: "Vercel", i: "▲"  },
      { n: "Render", i: "🚀" },
    ],
  },
];

function SkillsContent() {
  return (
    <div className="wc-skills">
      {SKILL_CATEGORIES.map(cat => (
        <div key={cat.label} className="wc-skill-cat">
          <div className="wc-skill-cat-label" style={{ color: cat.color }}>{cat.label}</div>
          <div className="wc-inv-grid">
            {cat.items.map(item => (
              <div key={item.n} className="wc-inv-slot">
                <span className="wc-inv-icon">{item.i}</span>
                <span className="wc-inv-name">{item.n}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const CONTACTS = [
  { icon:"📧", label:"Email",     val:"nikitas.7927@gmail.com",              href:"mailto:nikitas.7927@gmail.com" },
  { icon:"🐙", label:"GitHub",    val:"github.com/niksxox",                   href:"https://github.com/niksxox" },
  { icon:"💼", label:"LinkedIn",  val:"nikita-singh-912777342",               href:"https://www.linkedin.com/in/nikita-singh-912777342/" },
  { icon:"📸", label:"Instagram", val:"@3xp3ll1armus",                        href:"https://www.instagram.com/3xp3ll1armus/" },
];

function ContactContent() {
  return (
    <div className="wc-contact">
      {CONTACTS.map(c => (
        <a key={c.label} className="wc-contact-row" href={c.href} target="_blank" rel="noreferrer">
          <span className="wc-contact-icon">{c.icon}</span>
          <div>
            <div className="wc-contact-label">{c.label}</div>
            <div className="wc-contact-val">{c.val}</div>
          </div>
          <span className="wc-contact-arrow">→</span>
        </a>
      ))}
      <div className="wc-contact-note">
        Currently open to internship &amp; collaboration opportunities ✦
      </div>
    </div>
  );
}