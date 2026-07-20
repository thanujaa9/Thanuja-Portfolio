"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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

type ExhibitCard = { tag: string; title: string; copy: string; meta: string; images?: string[]; imageAlt?: string; tags?: string[]; github?: string; live?: string; certificateImage?: string; certificateHref?: string };

const destinationCopy: Record<string, { eyebrow: string; title: string; intro: string; cards: ExhibitCard[] }> = {
  EDU: {
    eyebrow: "ARRIVALS · EDUCATION HUB",
    title: "Education",
    intro: "My academic path—from Andhra Pradesh to a semester in Malaysia.",
    cards: [
      { tag: "EDU-A · 2022—2026", title: "SRM University, AP", copy: "B.Tech in Computer Science & Engineering", meta: "CGPA 8.92 / 10", images: ["https://www.srmap.edu.in/wp-content/uploads/2025/06/infra11.png", "https://www.srmap.edu.in/wp-content/uploads/2025/06/infra12.png", "https://www.srmap.edu.in/wp-content/uploads/2025/06/infra14.png"], imageAlt: "SRM University, Andhra Pradesh campus" },
      { tag: "EDU-B · 2025", title: "INTI International University", copy: "Semester abroad in Malaysia", meta: "SGPA 3.5 / 4", images: ["/portfolio-assets/inti-presentation.jpeg", "/portfolio-assets/inti-certificate.png", "/portfolio-assets/inti-campus.jpeg", "/portfolio-assets/malaysia-friends.jpeg", "/portfolio-assets/kuala-lumpur.jpeg"], imageAlt: "Thanuja's semester at INTI International University, Malaysia" },
      { tag: "EDU-C · 2020—2022", title: "Narayana Junior College", copy: "Intermediate · Mathematics, Physics & Chemistry", meta: "90%" },
      { tag: "EDU-D · SCHOOL", title: "Bhashyam Public School", copy: "Secondary School Education", meta: "98%" },
    ],
  },
  SKL: {
    eyebrow: "ARRIVALS · SKILLS TERMINAL",
    title: "Technical skills",
    intro: "The tools and fundamentals I use to build software.",
    cards: [
      { tag: "ZONE A · LANGUAGES", title: "Languages", copy: "C++ · Java · JavaScript", meta: "CORE" },
      { tag: "ZONE B · FRONTEND", title: "Frontend", copy: "React.js · HTML5 · CSS3 · Tailwind CSS", meta: "INTERFACES" },
      { tag: "ZONE C · BACKEND", title: "Backend", copy: "Node.js · Express.js · REST APIs", meta: "SYSTEMS" },
      { tag: "ZONE D · DATABASES", title: "Databases", copy: "MongoDB · MySQL", meta: "DATA" },
      { tag: "ZONE E · CLOUD & TOOLS", title: "Cloud & Tools", copy: "AWS Basics · Postman · VS Code · Git · GitHub", meta: "WORKFLOW" },
      { tag: "ZONE F · CS FUNDAMENTALS", title: "CS Fundamentals", copy: "Data Structures & Algorithms · OOP · DBMS · Operating Systems", meta: "FOUNDATIONS" },
    ],
  },
  PRJ: {
    eyebrow: "ARRIVALS · PROJECTS HANGAR",
    title: "Projects",
    intro: "Systems I designed, built, tested, and shipped.",
    cards: [
      { tag: "PROJECT 01 · DISTRIBUTED SYSTEMS", title: "Pipeline Orchestrator", copy: "Routes high-throughput events between Kafka and RabbitMQ with cached rules, controlled offsets, retries, and dead-letter recovery. It is built to keep critical messages moving even when part of the pipeline fails.", meta: "<1MS RULES · <100MS CRITICAL", tags: ["TypeScript", "Kafka", "RabbitMQ", "Redis", "Docker"], github: "https://github.com/thanujaa9/pipeline-orchestrator" },
      { tag: "PROJECT 02 · APPLIED AI", title: "Legal Document Analyzer", copy: "Turns long legal documents into clause-level summaries and clear risk classifications. Background jobs and caching keep large uploads responsive while reviewers focus on the clauses that need attention.", meta: "LOW → CRITICAL RISK", tags: ["React.js", "Node.js", "GPT-4", "Bull Queue", "MongoDB"], github: "https://github.com/thanujaa9/Legal-Document-Analyzer", live: "https://legal-document-analyzer-main.onrender.com" },
      { tag: "PROJECT 03 · FULL STACK", title: "NeoConnect", copy: "A complaint-management platform with anonymous reporting, role-based access, evidence uploads, status tracking, and automatic escalation when cases remain unresolved.", meta: "JWT · CLOUDINARY · NEXT.JS", tags: ["Next.js", "Express.js", "MongoDB", "JWT", "Cloudinary"], github: "https://github.com/thanujaa9/neoconnect", live: "https://neoconnect-mu.vercel.app/" },
    ],
  },
  EXP: {
    eyebrow: "ARRIVALS · EXPERIENCE LOUNGE",
    title: "Experience",
    intro: "Hands-on work across Android development and a real business workflow.",
    cards: [
      { tag: "GOOGLE DEVELOPER PROGRAM", title: "Android App Developer", copy: "Built modular Android apps using Kotlin and Jetpack Compose, translating product requirements into maintainable mobile UI architecture.", meta: "OCT—DEC 2024", tags: ["Kotlin", "Jetpack Compose", "Room", "DataStore"] },
      { tag: "FAMILY BUSINESS · 2026", title: "Thanuja Motors Digital System", copy: "Built a progressive web app for a bike dealership with inventory management, PDF billing, and a bilingual Telugu/English interface using React.js and Firebase.", meta: "FAMILY BUSINESS · 2026", tags: ["React.js", "Firebase", "PWA", "PDF Billing", "Bilingual UI"] },
    ],
  },
  ACH: {
    eyebrow: "ARRIVALS · ACHIEVEMENT HALL",
    title: "Highlights & certificates",
    intro: "Research, competitions, and certifications I’m proud of.",
    cards: [
      { tag: "RESEARCH PAPER · PRESENTER", title: "AICCoNS 2026", copy: "Presented “Secure Luxury Product Authentication Using Batch NFTs and Zero-Knowledge Proofs” at the University of Wollongong in Dubai, April 28–30, 2026.", meta: "INTERNATIONAL CONFERENCE", certificateImage: "/portfolio-assets/aiccons-certificate.png", certificateHref: "/portfolio-assets/aiccons-certificate.pdf" },
      { tag: "NATIONAL LEVEL · WINNER", title: "Technocrats Hackathon", copy: "Won the national-level hackathon after building and presenting a working solution under tight time constraints.", meta: "WINNER" },
      { tag: "HACKATHON · FINALIST", title: "Golden Goals Hackathon", copy: "Selected as a finalist for developing and pitching a solution around measurable real-world impact.", meta: "FINALIST" },
      { tag: "CERTIFICATION", title: "MongoDB Associate Developer", copy: "Certified in MongoDB development, including CRUD, indexing, aggregation pipelines, and schema design.", meta: "CERTIFIED · NOV 2025", certificateImage: "/portfolio-assets/mongodb-certificate.png", certificateHref: "/portfolio-assets/mongodb-certificate.png" },
      { tag: "CERTIFICATION", title: "Oracle Cloud Infrastructure", copy: "Oracle Cloud Infrastructure 2025 Certified Foundations Associate.", meta: "CERTIFIED · SEP 2025", certificateImage: "/portfolio-assets/oracle-certificate.png", certificateHref: "/portfolio-assets/oracle-certificate.pdf" },
    ],
  },
  CTX: {
    eyebrow: "ARRIVALS · CONTACT HUB",
    title: "Let’s connect",
    intro: "I’m open to software engineering roles across backend, full stack, distributed systems, and applied AI.",
    cards: [
      { tag: "EMAIL", title: "Start a conversation", copy: "thanujasekuri000@gmail.com", meta: "AVAILABLE" },
      { tag: "GITHUB", title: "Inspect the source", copy: "github.com/thanujaa9", meta: "OPEN PROFILE" },
      { tag: "LINKEDIN", title: "Connect professionally", copy: "linkedin.com/in/thanujasekuri", meta: "LET'S CONNECT" },
    ],
  },
};

function Ava({ moving }: { moving: boolean }) {
  return (
    <div className={`ava ${moving ? "walking" : ""}`} aria-label="Ava, your airport guide">
      <div className="bag"><span /></div>
      <div className="ava-head"><span className="hair" /></div>
      <div className="ava-body"><span className="lanyard">TS</span></div>
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
  const [flying, setFlying] = useState(false);
  const [clock, setClock] = useState("--:--:-- IST");
  const [avaPosition, setAvaPosition] = useState({ x: 0, y: 0 });
  const [photoGallery, setPhotoGallery] = useState<ExhibitCard | null>(null);
  const ambientAudio = useRef<HTMLAudioElement | null>(null);

  const current = active ? destinationCopy[active.short] : null;
  const progress = Math.round((visited.length / flights.length) * 100);
  const nextFlight = useMemo(() => flights.find((flight) => !visited.includes(flight.short)), [visited]);

  const openGate = useCallback((flight: Flight) => {
    if (visited.includes(flight.short)) {
      setActive(flight);
      window.requestAnimationFrame(() => document.querySelector(".arrival")?.scrollIntoView({ behavior: "smooth", block: "start" }));
      return;
    }
    setSelected(flight);
    setMoving(true);
    window.setTimeout(() => setMoving(false), 700);
  }, [visited]);

  const toggleSound = useCallback(async () => {
    const audio = ambientAudio.current;
    if (!audio) return;
    if (sound) {
      audio.pause();
      setSound(false);
      return;
    }
    audio.volume = 0.3;
    try { await audio.play(); setSound(true); } catch { setSound(false); }
  }, [sound]);

  const flyTo = useCallback((flight: Flight) => {
    if (flying) return;
    setSelected(null); setFlying(true);
    window.setTimeout(() => {
      setActive(flight);
      setVisited((old) => old.includes(flight.short) ? old : [...old, flight.short]);
      setFlying(false);
      window.requestAnimationFrame(() => document.querySelector(".arrival")?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }, 1000);
  }, [flying]);

  const moveAva = useCallback((dx: number, dy: number) => {
    setAvaPosition((position) => ({ x: Math.max(-180, Math.min(300, position.x + dx)), y: Math.max(-70, Math.min(80, position.y + dy)) }));
    setMoving(true); window.setTimeout(() => setMoving(false), 340);
  }, []);

  const board = () => {
    if (!selected) return;
    flyTo(selected);
  };

  useEffect(() => {
    const updateClock = () => setClock(`${new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(new Date())} IST`);
    updateClock(); const timer = window.setInterval(updateClock, 1000); return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setActive(null); setSelected(null); setPassport(false); setPhotoGallery(null); }
      if ((event.key === "e" || event.key === "E") && !selected && !active) openGate(nextFlight || flights[0]);
      if (["ArrowUp", "w", "W"].includes(event.key)) { event.preventDefault(); moveAva(0, -16); }
      if (["ArrowDown", "s", "S"].includes(event.key)) { event.preventDefault(); moveAva(0, 16); }
      if (["ArrowLeft", "a", "A"].includes(event.key)) { event.preventDefault(); moveAva(-22, 0); }
      if (["ArrowRight", "d", "D"].includes(event.key)) { event.preventDefault(); moveAva(22, 0); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, moveAva, nextFlight, openGate, selected]);

  return (
    <main className={active ? `airport destination destination-${active.short.toLowerCase()}` : "airport"}>
      <header className="topbar">
        <button className="brand" onClick={() => setActive(null)} aria-label="Return to main terminal">
          <span>THANUJA'S PORTFOLIO<br/><small>AIRPORT EXPERIENCE</small></span>
        </button>
        <div className="header-actions">
          <time className="ist-clock" dateTime={new Date().toISOString()}>{clock}</time>
          <button className="sound" onClick={toggleSound} aria-label="Toggle airplane ambient sound">{sound ? "◉ SOUND ON" : "○ SOUND OFF"}</button>
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
              <h1><span>Boarding all ideas.</span><em>Destination: production.</em></h1>
              <p><span>Every flight I've taken was a problem worth solving.</span><strong>— Thanuja</strong></p>
            </div>

            <div className="fids-wrap">
              <div className="fids-header"><span>PORTFOLIO AIRPORT</span><b>DEPARTURES / उड़ानें</b><time>{clock}</time></div>
              <div className="fids-labels"><span>FLIGHT</span><span>DESTINATION</span><span>GATE</span><span>STATUS</span></div>
              <div className="flight-list">
                {flights.map((flight) => (
                  <button key={flight.code} onClick={() => openGate(flight)} className={visited.includes(flight.short) ? "visited" : ""} disabled={flying}>
                    <span>{flight.code}</span><strong>{flight.destination}</strong><span>{flight.gate}</span><span className="status"><i/>{visited.includes(flight.short) ? "ARRIVED" : "BOARDING"}</span>
                  </button>
                ))}
              </div>
              <div className="fids-footer"><span>SELECT A FLIGHT TO BOARD</span><span>◉ 27 RECRUITERS VISITED TODAY</span><span>ALL GATES OPEN · NO DELAYS</span></div>
            </div>

            <div className="floor">
              <div className="gate-row">
                {flights.map((flight) => <button key={flight.gate} onClick={() => openGate(flight)} aria-label={`Open ${flight.destination}`}><span>{flight.gate}</span><small>{flight.short}</small></button>)}
              </div>
              <div className="ava-zone" style={{ transform: `translate(${avaPosition.x}px, ${avaPosition.y}px)` }}><Ava moving={moving}/><div className="guide-bubble"><small>YOUR GUIDE</small><b>AVA</b><span>Use the controls to explore</span></div></div>
              <div className="controls"><span><kbd>WASD</kbd> WALK</span><span><kbd>E</kbd> INTERACT</span><span><kbd>ESC</kbd> TERMINAL</span></div>
              <div className="dpad" aria-label="Movement controls"><button aria-label="Move up" onClick={() => moveAva(0,-16)}>↑</button><button aria-label="Move left" onClick={() => moveAva(-22,0)}>←</button><button aria-label="Move down" onClick={() => moveAva(0,16)}>↓</button><button aria-label="Move right" onClick={() => moveAva(22,0)}>→</button></div>
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
          <div className={`exhibit-grid ${active.short === "PRJ" ? "project-grid" : ""} ${active.short === "EDU" ? "education-grid" : ""}`}>
            {current.cards.map((card, index) => (
              <article key={card.title} style={{ "--delay": `${index * 90}ms` } as React.CSSProperties}>
                {card.images && <div className="campus-gallery">{card.images.slice(0, 3).map((image, imageIndex) => <img key={image} src={image} alt={`${card.imageAlt || card.title} - view ${imageIndex + 1}`}/>) }<button onClick={() => setPhotoGallery(card)}>VIEW ALL PHOTOS ↗</button></div>}
                {card.certificateImage && <a className="certificate-preview" href={card.certificateHref} target="_blank" rel="noreferrer"><img src={card.certificateImage} alt={`${card.title} certificate`}/><span>VIEW CERTIFICATE ↗</span></a>}
                <div className="exhibit-number">0{index + 1}</div>
                <p>{card.tag}</p><h2>{card.title}</h2><div className="exhibit-rule"/><span>{card.copy}</span>
                {card.tags && <div className="tech-tags">{card.tags.map((tag) => <small key={tag}>{tag}</small>)}</div>}
                {active.short === "PRJ" && <div className="project-actions">{card.github && <a href={card.github} target="_blank" rel="noreferrer">GitHub ↗</a>}{card.live && <a href={card.live} target="_blank" rel="noreferrer">Live Demo ↗</a>}</div>}
                <b className={`${active.short === "EDU" ? "grade" : ""} ${active.short === "EXP" && index === 1 ? "family-business" : ""}`}>{card.meta}</b>
              </article>
            ))}
          </div>
          {active.short === "CTX" && <>
            <div className="contact-strip"><a href="mailto:thanujasekuri000@gmail.com">EMAIL THANUJA ↗</a><a href="https://github.com/thanujaa9" target="_blank" rel="noreferrer">GITHUB ↗</a><a href="https://www.linkedin.com/in/thanujasekuri/" target="_blank" rel="noreferrer">LINKEDIN ↗</a></div>
            <article className="contact-boarding-pass">
              <div className="contact-ticket-head"><span>✈</span><div><small>PORTFOLIO AIRPORT</small><h2>LET'S BUILD THE NEXT JOURNEY.</h2></div><b>FIRST CLASS</b></div>
              <div className="contact-ticket-fields"><div><small>PASSENGER</small><b>THANUJA SEKURI</b></div><div><small>EMAIL</small><a href="mailto:thanujasekuri000@gmail.com">thanujasekuri000@gmail.com</a></div><div><small>GITHUB</small><a href="https://github.com/thanujaa9" target="_blank" rel="noreferrer">github.com/thanujaa9</a></div><div><small>LINKEDIN</small><a href="https://www.linkedin.com/in/thanujasekuri/" target="_blank" rel="noreferrer">linkedin.com/in/thanujasekuri</a></div></div>
              <div className="contact-barcode">|||| || | ||||| ||| || ||||||</div>
            </article>
          </>}
          <div className="arrival-footer"><button onClick={() => setActive(null)}>← RETURN TO DEPARTURES</button><span>PASSPORT STAMPED · {active.short} ✓</span></div>
        </section>
      ) : null}

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <article className="boarding-pass" onClick={(e) => e.stopPropagation()}>
            <div className="ticket-main">
              <div className="ticket-brand"><span>✈</span><b>PORTFOLIO AIRPORT</b><small>BOARDING PASS / बोर्डिंग पास</small></div>
              <p className="ticket-tagline">{selected.tagline}</p>
              <div className="ticket-route"><div><small>FROM</small><b>TERMINAL T1</b><span>T1</span></div><i>✈</i><div><small>TO</small><b>{selected.destination}</b><span>{selected.short}</span></div></div>
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
            <div className="passport-cover"><span>✦</span><p>TRAVELER'S</p><h2>PASSPORT</h2><div>✈</div><small>VISITOR EDITION</small></div>
            <div className="passport-page"><button onClick={() => setPassport(false)}>×</button><p>PORTFOLIO JOURNEY</p><h2>Destination stamps</h2><div className="stamps">{flights.map((flight) => <span key={flight.short} className={visited.includes(flight.short) ? "stamped" : ""} style={{"--stamp": flight.color} as React.CSSProperties}><b>{flight.short}</b><small>{visited.includes(flight.short) ? "VISITED" : "OPEN"}</small></span>)}</div><div className="passport-progress"><span style={{width: `${progress}%`}}/><p>{progress}% COMPLETE</p></div>{progress === 100 ? <h3>FREQUENT FLYER UNLOCKED ✦</h3> : <small>Visit all 6 destinations to unlock Frequent Flyer status.</small>}</div>
          </article>
        </div>
      )}

      {flying && <div className="flight-transition" role="status" aria-live="polite"><div className="transition-trail"/><span className="transition-plane">✈</span><p>NOW DEPARTING · PLEASE STAND BY</p></div>}

      {photoGallery?.images && <div className="modal-backdrop photo-backdrop" onClick={() => setPhotoGallery(null)}><section className="photo-lightbox" onClick={(event) => event.stopPropagation()}><header><div><small>EDUCATION HUB · PHOTO LOG</small><h2>{photoGallery.title}</h2></div><button onClick={() => setPhotoGallery(null)} aria-label="Close photo gallery">×</button></header><div>{photoGallery.images.map((image, index) => <figure key={image}><img src={image} alt={`${photoGallery.imageAlt || photoGallery.title} - photo ${index + 1}`}/><figcaption>PHOTO {String(index + 1).padStart(2, "0")}</figcaption></figure>)}</div></section></div>}

      {intro && (
        <div className="intro-screen">
          <div className="intro-plane">✈</div><p>YOU HAVE ARRIVED AT</p><h1>PORTFOLIO<br/><em>AIRPORT</em></h1><span>THANUJA SEKURI · SOFTWARE ENGINEER</span><button onClick={() => setIntro(false)}>ENTER TERMINAL <b>→</b></button><small>BEST EXPERIENCED WITH CURIOSITY</small>
        </div>
      )}
      <audio ref={ambientAudio} src="/portfolio-assets/airplane-ambient.mp3" loop preload="metadata" />
    </main>
  );
}
