import React, { useState, useEffect } from 'react';

export default function Login() {
  const [mounted, setMounted] = useState(false);
  const [slide, setSlide] = useState(0);

  const slides = [
    { title: "Smart Campus Operations Hub", desc: "The centralized platform for managing university facility bookings and operations." },
    { title: "Book Facilities & Resources", desc: "Reserve lecture halls, labs, meeting rooms and equipment with ease." },
    { title: "Track & Manage Incidents", desc: "Report and track maintenance issues with real-time status updates." },
  ];

  useEffect(() => {
    setTimeout(() => setMounted(true), 60);
    const t = setInterval(() => setSlide(s => (s + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  return (
    <div style={s.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        @keyframes cardIn   { from{opacity:0;transform:translateY(28px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes orbDrift { 0%,100%{transform:translate(0,0)} 50%{transform:translate(12px,-10px)} }
        @keyframes iconBob  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes ripple   { 0%{transform:scale(1);opacity:0.35} 100%{transform:scale(2.4);opacity:0} }
        @keyframes textFade { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin     { to{transform:rotate(360deg)} }
        .google-btn { transition:all 0.2s ease !important; }
        .google-btn:hover { transform:translateY(-2px) !important; box-shadow:0 8px 24px rgba(30,58,138,0.2) !important; }
        .google-btn:active { transform:translateY(0) !important; }
        .sc-dot { cursor:pointer; }
      `}</style>

      <div style={s.pageBg} />

      <div style={{
        ...s.card,
        opacity: mounted ? 1 : 0,
        animation: mounted ? "cardIn 0.65s cubic-bezier(0.16,1,0.3,1) both" : "none",
      }}>

        {/* LEFT PANEL */}
        <div style={s.illustSide}>
          <div style={{ position:"absolute", width:380, height:380, borderRadius:"50%", background:"rgba(255,255,255,0.05)", top:-100, left:-100, animation:"orbDrift 14s ease-in-out infinite" }} />
          <div style={{ position:"absolute", width:220, height:220, borderRadius:"50%", background:"rgba(255,255,255,0.04)", bottom:-30, right:-60, animation:"orbDrift 10s ease-in-out infinite reverse" }} />
          <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize:"28px 28px", zIndex:0 }} />

          {/* Rings */}
          {[300,210,130].map((size,i) => (
            <div key={i} style={{ position:"absolute", width:size, height:size, borderRadius:"50%", border:`1px solid rgba(255,255,255,${0.08+i*0.05})`, top:"50%", left:"50%", transform:"translate(-50%,-50%)" }} />
          ))}
          <div style={{ position:"absolute", width:300, height:300, borderRadius:"50%", border:"1.5px solid rgba(255,255,255,0.15)", top:"50%", left:"50%", transform:"translate(-50%,-50%)", animation:"ripple 3.5s ease-out infinite" }} />

          {/* Center Logo Badge */}
          <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:90, height:90, borderRadius:"50%", background:"rgba(255,255,255,0.15)", border:"2px solid rgba(255,255,255,0.3)", backdropFilter:"blur(12px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:3, boxShadow:"0 8px 32px rgba(0,0,0,0.15)" }}>
            {/* Lightbulb + Graduation Cap SVG */}
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <ellipse cx="24" cy="30" rx="8" ry="10" fill="#f97316"/>
              <path d="M18 30 Q18 38 24 40 Q30 38 30 30" fill="#ea580c"/>
              <line x1="21" y1="40" x2="27" y2="40" stroke="#1e3a8a" strokeWidth="2"/>
              <line x1="22" y1="43" x2="26" y2="43" stroke="#1e3a8a" strokeWidth="2"/>
              <path d="M10 20 L24 14 L38 20 L24 26 Z" fill="#1e3a8a"/>
              <rect x="35" y="20" width="2" height="8" fill="#1e3a8a"/>
              <ellipse cx="36" cy="29" rx="2.5" ry="1.5" fill="#1e3a8a"/>
              <line x1="10" y1="20" x2="10" y2="27" stroke="#dc2626" strokeWidth="1.5"/>
              <ellipse cx="10" cy="28" rx="2" ry="1" fill="#dc2626"/>
            </svg>
          </div>

          {/* Top bubbles */}
          <div style={{ display:"flex", gap:16, justifyContent:"center", zIndex:4, position:"relative", width:"100%", paddingTop:8 }}>
            {[
              { emoji:"📅", label:"Book" },
              { emoji:"🏛️", label:"Facilities" },
              { emoji:"🔧", label:"Maintenance" },
              { emoji:"📊", label:"Reports" },
            ].map((b, i) => (
              <div key={i} style={{ width:62, height:62, borderRadius:"50%", background:"rgba(255,255,255,0.15)", border:"1.5px solid rgba(255,255,255,0.28)", backdropFilter:"blur(10px)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:2, flexShrink:0, animation:`iconBob ${3.8+i*0.5}s ease-in-out infinite`, animationDelay:`${i*0.3}s`, boxShadow:"0 4px 16px rgba(0,0,0,0.12)" }}>
                <span style={{ fontSize:22 }}>{b.emoji}</span>
                <span style={{ fontSize:9, fontWeight:700, color:"rgba(255,255,255,0.9)", letterSpacing:"0.04em" }}>{b.label}</span>
              </div>
            ))}
          </div>

          <div style={{ flex:1 }} />

          {/* Slide text */}
          <div style={{ width:"100%", zIndex:3, position:"relative", paddingBottom:8 }}>
            <div key={slide} style={{ textAlign:"center", padding:"0 20px", marginBottom:14, animation:"textFade 0.4s ease both" }}>
              <h2 style={{ fontSize:17, fontWeight:800, color:"#fff", marginBottom:7, letterSpacing:"-0.2px", lineHeight:1.4 }}>{slides[slide].title}</h2>
              <p style={{ fontSize:13, color:"rgba(255,255,255,0.65)", lineHeight:1.7 }}>{slides[slide].desc}</p>
            </div>
            <div style={{ display:"flex", gap:6, justifyContent:"center", marginBottom:14 }}>
              {slides.map((_, i) => (
                <div key={i} className="sc-dot" onClick={() => setSlide(i)} style={{ height:6, borderRadius:3, width: i === slide ? 24 : 6, background: i === slide ? "#fff" : "rgba(255,255,255,0.32)", transition:"all 0.35s cubic-bezier(0.34,1.56,0.64,1)" }} />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={s.formSide}>
          {/* Logo */}
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:36 }}>
            <div style={{ width:52, height:52, borderRadius:14, background:"linear-gradient(135deg,#1e3a8a,#2563eb)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 14px rgba(30,58,138,0.35)" }}>
              <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
                <ellipse cx="24" cy="30" rx="8" ry="10" fill="#f97316"/>
                <path d="M10 20 L24 14 L38 20 L24 26 Z" fill="white"/>
                <rect x="35" y="20" width="2" height="8" fill="white"/>
                <line x1="10" y1="20" x2="10" y2="27" stroke="#fca5a5" strokeWidth="1.5"/>
              </svg>
            </div>
            <div>
              <p style={{ fontSize:17, fontWeight:800, color:"#0f172a", lineHeight:1.2 }}>Smart Campus</p>
              <p style={{ fontSize:11, color:"#64748b", fontWeight:500 }}>Education Group · SLIIT</p>
            </div>
          </div>

          <h1 style={{ fontSize:26, fontWeight:800, color:"#0f172a", lineHeight:1.3, marginBottom:6 }}>
            Welcome Back 👋
          </h1>
          <p style={{ fontSize:13, color:"#64748b", marginBottom:32 }}>
            Sign in to access the Smart Campus Operations Hub
          </p>

          {/* Google Login Button */}
          <button onClick={handleGoogleLogin} className="google-btn" style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:12, padding:"13px 16px", background:"#fff", border:"1.5px solid #e2e8f0", borderRadius:12, fontSize:15, fontWeight:600, color:"#0f172a", cursor:"pointer", boxShadow:"0 2px 8px rgba(0,0,0,0.06)", marginBottom:20 }}>
            <svg width="20" height="20" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"/>
            </svg>
            Continue with Google
          </button>

          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
            <div style={{ flex:1, height:1, background:"#e2e8f0" }} />
            <span style={{ fontSize:12, color:"#94a3b8", fontWeight:500 }}>Secured by OAuth 2.0</span>
            <div style={{ flex:1, height:1, background:"#e2e8f0" }} />
          </div>

          <div style={{ background:"#f8fafc", borderRadius:12, padding:"14px 16px", marginBottom:24 }}>
            <p style={{ fontSize:12, color:"#64748b", lineHeight:1.7 }}>
              🔒 Your account is protected with Google's secure authentication. No password required.
            </p>
          </div>

          <div style={{ display:"flex", justifyContent:"center", gap:20 }}>
            {["🔒 Secure", "🎓 SLIIT Official", "✅ Verified"].map(b => (
              <span key={b} style={{ fontSize:11, color:"#94a3b8", fontWeight:500 }}>{b}</span>
            ))}
          </div>

          <p style={{ textAlign:"center", fontSize:12, color:"#94a3b8", marginTop:24, lineHeight:1.6 }}>
            By signing in you agree to our{" "}
            <span style={{ color:"#1e40af", cursor:"pointer" }}>Terms of Service</span>
            {" "}and{" "}
            <span style={{ color:"#1e40af", cursor:"pointer" }}>Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}

const s = {
  page: { minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Plus Jakarta Sans', sans-serif", padding:"20px", position:"relative" },
  pageBg: { position:"fixed", inset:0, background:"linear-gradient(135deg, #dbeafe 0%, #eff6ff 45%, #e0f2fe 100%)", zIndex:0 },
  card: { display:"flex", width:"100%", maxWidth:920, minHeight:560, borderRadius:22, overflow:"hidden", boxShadow:"0 32px 80px rgba(30,58,138,0.18), 0 8px 24px rgba(30,58,138,0.1)", position:"relative", zIndex:1 },
  illustSide: { flex:1, background:"linear-gradient(160deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-between", padding:"28px 24px 28px", position:"relative", overflow:"hidden" },
  formSide: { flex:"0 0 440px", background:"#fff", padding:"44px 48px", display:"flex", flexDirection:"column", justifyContent:"center", overflowY:"auto" },
};