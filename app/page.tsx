"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Flight = {
  code: string;
  gate: string;
  seat: string;
  destination: string;
  short: string;
  icon: string;
  tagline: string;
  color: string;
};

const flights: Flight[] = [
  { code: "TJ-001", gate: "G1", seat: "1A", destination: "Education Hub", short: "EDU", icon: "🎓", tagline: "Where knowledge takes flight", color: "#d2a24c" },
  { code: "TJ-002", gate: "G2", seat: "2A", destination: "Skills Terminal", short: "SKL", icon: "⌘", tagline: "Fuelled by code & caffeine", color: "#6fd2b6" },
  { code: "TJ-003", gate: "G3", seat: "3A", destination: "Projects Hangar", short: "PRJ", icon: "✦", tagline: "Where ideas become engines", color: "#e17b5a" },
  { code: "TJ-004", gate: "G4", seat: "4A", destination: "Experience Lounge", short: "EXP", icon: "◆", tagline: "Miles logged on real runways", color: "#7c9bd6" },
  { code: "TJ-005", gate: "G5", seat: "5A", destination: "Achievement Hall", short: "ACH", icon: "🏆", tagline: "Every trophy deserves altitude", color: "#e6b94f" },
  { code: "TJ-006", gate: "G6", seat: "6A", destination: "Contact Hub", short: "CTX", icon: "◉", tagline: "Let's connect at cruising speed", color: "#e76767" },
];

const destinationCopy: Record<string, { eyebrow: string; title: string; intro: string; cards: { tag: string; title: string; copy: string; meta: string }[] }> = {
  EDU: {
    eyebrow: "ARRIVALS · EDUCATION HUB",
    title: "A foundation built for altitude.",
    intro: "Computer science, international perspective, and a habit of learning by building.",
    cards: [
      { tag: "EDU-A · 2022—2026", title: "SRM University, AP", copy: "B.Tech in Computer Science & Engineering", meta: "CGPA 8.8 / 10" },
      { tag: "EDU-B · 2025", title: "INTI International University", copy: "Semester abroad in Malaysia", meta: "SGPA 3.5 / 4" },
      { tag: "EDU-C · FOUNDATION", title: "Narayana Junior College", copy: "Intermediate, Mathematics · Physics · Chemistry", meta: "90%" },
    ],
  },
  SKL: {
    eyebrow: "ARRIVALS · SKILLS TERMINAL",
    title: "The systems behind the experience.",
    intro: "A practical engineering toolkit spanning interfaces, APIs, async infrastructure, and data.",
    cards: [
      { tag: "ZONE A · LANGUAGES", title: "JavaScript · C++ · Java", copy: "Strong fundamentals, problem solving, and modern ES6+ development.", meta: "CORE" },
      { tag: "ZONE B · SYSTEMS", title: "Node · Express · REST", copy: "API design, JWT, RBAC, background processing, debugging.", meta: "BACKEND" },
      { tag: "ZONE C · DATA", title: "MongoDB · MySQL · PostgreSQL", copy: "Schema design, indexing, aggregation, and reliable persistence.", meta: "DATABASES" },
    ],
  },
  PRJ: {
    eyebrow: "ARRIVALS · PROJECTS HANGAR",
    title: "Three machines. Real engineering.",
    intro: "Each project began with a difficult operational problem—not a technology checklist.",
    cards: [
      { tag: "AIRCRAFT 01 · FLAGSHIP", title: "Pipeline Orchestrator", copy: "Content-based routing between Kafka and RabbitMQ with Redis-cached rules, retries, and dead-letter queues.", meta: "<1MS RULES · <100MS CRITICAL" },
      { tag: "AIRCRAFT 02 · AI", title: "Legal Document Analyzer", copy: "GPT-4 clause analysis with structured risk levels, Redis caching, and Bull background jobs.", meta: "LOW → CRITICAL RISK" },
      { tag: "AIRCRAFT 03 · PLATFORM", title: "NeoConnect", copy: "Role-based complaint management with anonymous tracking, media, and scheduled escalation.", meta: "JWT · CLOUDINARY · NEXT.JS" },
    ],
  },
  EXP: {
    eyebrow: "ARRIVALS · EXPERIENCE LOUNGE",
    title: "Shipping beyond the classroom.",
    intro: "Product thinking and implementation experience from Google’s developer ecosystem.",
    cards: [
      { tag: "GOOGLE DEVELOPER PROGRAM", title: "Android App Developer", copy: "Built modular Android applications using Kotlin and Jetpack Compose.", meta: "OCT—DEC 2024" },
      { tag: "OFFLINE-FIRST", title: "Reliable data flows", copy: "Integrated REST APIs, Room, and DataStore for offline and real-time experiences.", meta: "KOTLIN · COMPOSE" },
      { tag: "ENGINEERING PRACTICE", title: "From interface to storage", copy: "Turned product requirements into maintainable UI architecture and working applications.", meta: "MOBILE SYSTEMS" },
    ],
  },
  ACH: {
    eyebrow: "ARRIVALS · ACHIEVEMENT HALL",
    title: "Recognition at full throttle.",
    intro: "Evidence of resourcefulness, teamwork, and delivery under pressure.",
    cards: [
      { tag: "NATIONAL LEVEL · WINNER", title: "Technocrats Hackathon", copy: "Built an innovative solution in a competitive, time-constrained environment.", meta: "WINNER" },
      { tag: "SPECIAL PRIZE", title: "ETHIndia Prize", copy: "Recognized for technical ambition and execution during the hackathon.", meta: "AWARDED" },
      { tag: "CERTIFICATION", title: "MongoDB", copy: "CRUD, indexing, aggregation pipelines, and applied schema design.", meta: "CERTIFIED" },
    ],
  },
  CTX: {
    eyebrow: "ARRIVALS · CONTACT HUB",
    title: "Open channel. Clear signal.",
    intro: "Looking for software engineering opportunities across backend, full-stack, distributed systems, and applied AI.",
    cards: [
      { tag: "EMAIL", title: "Start a conversation", copy: "thanuja_sekuri@srmap.edu.in", meta: "AVAILABLE" },
      { tag: "GITHUB", title: "Inspect the source", copy: "github.com/thanujaa9", meta: "OPEN PROFILE" },
      { tag: "LINKEDIN", title: "Connect professionally", copy: "linkedin.com/in/thanuja-sekuri", meta: "LET'S CONNECT" },
    ],
  },
};

function Ava({ moving }: { moving: boolean }) {
  return (
    <div className={`ava ${moving ? "walking" : ""}`} aria-label="Ava, your airport guide">
      <div className="bag"><span /></div>
      <div className="ava-head"><span className="hair" /></div>
      <div className="ava-body"><span className="lanyard">TJA</span></div>
      <div className="ava-legs"><span /><span /></div>
    </div>
  );
}

export default function Home() {
  const [selected, setSelected] = useState<Flight | null>(null);
  const [active, setActive] = useState<Flight | null>(null);
  const [visited, setVisited] = useState<string[]>([]);
  const [passport, setPassport] = useState(false);
  const [intro, setIntro] = useState(true);
  const [moving, setMoving] = useState(false);
  const [sound, setSound] = useState(false);

  const current = active ? destinationCopy[active.short] : null;
  const progress = Math.round((visited.length / flights.length) * 100);
  const nextFlight = useMemo(() => flights.find((flight) => !visited.includes(flight.short)), [visited]);

  const openGate = useCallback((flight: Flight) => {
    setSelected(flight);
    setMoving(true);
    window.setTimeout(() => setMoving(false), 700);
  }, []);

  const board = () => {
    if (!selected) return;
    setActive(selected);
    setVisited((old) => old.includes(selected.short) ? old : [...old, selected.short]);
    setSelected(null);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setActive(null); setSelected(null); setPassport(false); }
      if ((event.key === "e" || event.key === "E") && !selected && !active) openGate(nextFlight || flights[0]);
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d", "W", "A", "S", "D", " "].includes(event.key)) {
        setMoving(true); window.setTimeout(() => setMoving(false), 500);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, nextFlight, openGate, selected]);

  return (
    <main className={active ? `airport destination destination-${active.short.toLowerCase()}` : "airport"}>
      <header className="topbar">
        <button className="brand" onClick={() => setActive(null)} aria-label="Return to main terminal">
          <span className="brand-mark">TJA</span>
          <span>THANUJA INTERNATIONAL<br/><small>PORTFOLIO AIRPORT</small></span>
        </button>
        <div className="header-actions">
          <button className="sound" onClick={() => setSound(!sound)} aria-label="Toggle ambient sound">{sound ? "◉ SOUND ON" : "○ SOUND OFF"}</button>
          <button className="passport-button" onClick={() => setPassport(true)}>▣ PASSPORT <b>{visited.length}/6</b></button>
        </div>
      </header>

      {!active ? (
        <>
          <section className="terminal" aria-label="Main terminal">
            <div className="sky"><i className="sun"/><i className="plane plane-one">✈</i><i className="plane plane-two">✈</i></div>
            <div className="glass-lines" />
            <div className="terminal-heading">
              <p className="kicker">WELCOME TO TERMINAL T1 · GOLDEN HOUR</p>
              <h1>Engineering journeys<br/>begin <em>here.</em></h1>
              <p>Explore the systems, products, and milestones of<br className="desktop-only"/> Thanuja Sekuri—one destination at a time.</p>
            </div>

            <div className="fids-wrap">
              <div className="fids-header"><span>THANUJA INTERNATIONAL AIRPORT</span><b>DEPARTURES / उड़ानें</b><time>18:42 IST</time></div>
              <div className="fids-labels"><span>FLIGHT</span><span>DESTINATION</span><span>GATE</span><span>STATUS</span></div>
              <div className="flight-list">
                {flights.map((flight) => (
                  <button key={flight.code} onClick={() => openGate(flight)} className={visited.includes(flight.short) ? "visited" : ""}>
                    <span>{flight.code}</span><strong>{flight.destination}</strong><span>{flight.gate}</span><span className="status"><i/>{visited.includes(flight.short) ? "ARRIVED" : "BOARDING"}</span>
                  </button>
                ))}
              </div>
              <div className="fids-footer"><span>SELECT A FLIGHT TO BOARD</span><span>ALL GATES OPEN · NO DELAYS</span></div>
            </div>

            <div className="floor">
              <div className="gate-row">
                {flights.map((flight) => <button key={flight.gate} onClick={() => openGate(flight)} aria-label={`Open ${flight.destination}`}><span>{flight.gate}</span><small>{flight.short}</small></button>)}
              </div>
              <div className="ava-zone"><Ava moving={moving}/><div className="guide-bubble"><small>YOUR GUIDE</small><b>AVA</b><span>Choose any departure ↑</span></div></div>
              <div className="floor-logo"><b>TJA</b><span>✦</span></div>
              <div className="controls"><span><kbd>WASD</kbd> WALK</span><span><kbd>E</kbd> INTERACT</span><span><kbd>ESC</kbd> TERMINAL</span></div>
            </div>
          </section>
          <section className="manifesto">
            <p>NOW BOARDING · SOFTWARE ENGINEER</p>
            <h2>I build reliable systems<br/>for <em>real-world complexity.</em></h2>
            <div><span>EVENT-DRIVEN SYSTEMS</span><span>APPLIED AI</span><span>FULL-STACK PRODUCTS</span></div>
          </section>
        </>
      ) : current ? (
        <section className="arrival">
          <div className="arrival-sky"><span className="arrival-plane">✈</span></div>
          <button className="back-terminal" onClick={() => setActive(null)}>← TERMINAL T1</button>
          <div className="arrival-copy">
            <p>{current.eyebrow}</p>
            <h1>{current.title}</h1>
            <div className="arrival-intro"><span>{active.code} · GATE {active.gate}</span><p>{current.intro}</p></div>
          </div>
          <div className="exhibit-grid">
            {current.cards.map((card, index) => (
              <article key={card.title} style={{ "--delay": `${index * 90}ms` } as React.CSSProperties}>
                <div className="exhibit-number">0{index + 1}</div>
                <p>{card.tag}</p><h2>{card.title}</h2><div className="exhibit-rule"/><span>{card.copy}</span><b>{card.meta}</b>
              </article>
            ))}
          </div>
          {active.short === "CTX" && <div className="contact-strip"><a href="mailto:thanuja_sekuri@srmap.edu.in">EMAIL THANUJA ↗</a><a href="https://github.com/thanujaa9" target="_blank" rel="noreferrer">GITHUB ↗</a><a href="https://linkedin.com/in/thanuja-sekuri" target="_blank" rel="noreferrer">LINKEDIN ↗</a></div>}
          <div className="arrival-footer"><button onClick={() => setActive(null)}>← RETURN TO DEPARTURES</button><span>PASSPORT STAMPED · {active.short} ✓</span></div>
        </section>
      ) : null}

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <article className="boarding-pass" onClick={(e) => e.stopPropagation()}>
            <div className="ticket-main">
              <div className="ticket-brand"><span>TJA ✈</span><b>THANUJA INTERNATIONAL AIRPORT</b><small>BOARDING PASS / बोर्डिंग पास</small></div>
              <p className="ticket-tagline">{selected.tagline}</p>
              <div className="ticket-route"><div><small>FROM</small><b>TERMINAL T1</b><span>TJA</span></div><i>✈</i><div><small>TO</small><b>{selected.destination}</b><span>{selected.short}</span></div></div>
              <div className="ticket-data"><div><small>PASSENGER</small><b>VALUED VISITOR</b></div><div><small>FLIGHT</small><b>{selected.code}</b></div><div><small>GATE</small><b>{selected.gate}</b></div><div><small>SEAT</small><b>{selected.seat}</b></div></div>
              <button className="board-button" onClick={board}>BOARD FLIGHT — DEPART ✈</button>
            </div>
            <aside><span>FIRST CLASS</span><b>{selected.gate}</b><small>BOARDING NOW</small><div className="barcode">|||| ||| || ||||| || |</div><button onClick={() => setSelected(null)}>CLOSE</button></aside>
          </article>
        </div>
      )}

      {passport && (
        <div className="modal-backdrop" onClick={() => setPassport(false)}>
          <article className="passport" onClick={(e) => e.stopPropagation()}>
            <div className="passport-cover"><span>✦</span><p>TRAVELER'S</p><h2>PASSPORT</h2><div>✈</div><small>TJA · VISITOR EDITION</small></div>
            <div className="passport-page"><button onClick={() => setPassport(false)}>×</button><p>PORTFOLIO JOURNEY</p><h2>Destination stamps</h2><div className="stamps">{flights.map((flight) => <span key={flight.short} className={visited.includes(flight.short) ? "stamped" : ""} style={{"--stamp": flight.color} as React.CSSProperties}><b>{flight.short}</b><small>{visited.includes(flight.short) ? "VISITED" : "OPEN"}</small></span>)}</div><div className="passport-progress"><span style={{width: `${progress}%`}}/><p>{progress}% COMPLETE</p></div>{progress === 100 ? <h3>FREQUENT FLYER UNLOCKED ✦</h3> : <small>Visit all 6 destinations to unlock Frequent Flyer status.</small>}</div>
          </article>
        </div>
      )}

      {intro && (
        <div className="intro-screen">
          <div className="intro-plane">✈</div><p>YOU HAVE ARRIVED AT</p><h1>THANUJA<br/><em>INTERNATIONAL</em></h1><span>PORTFOLIO AIRPORT · TJA</span><button onClick={() => setIntro(false)}>ENTER TERMINAL <b>→</b></button><small>BEST EXPERIENCED WITH CURIOSITY</small>
        </div>
      )}
    </main>
  );
}
