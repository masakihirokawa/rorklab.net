import { ImageResponse } from "next/og";

export const alt = "Rork Lab — Rork Max 日本語ナレッジベース";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const brand  = "#E8B44C";
  const bgFrom = "#080e0b";
  const bgMid  = "#0a1210";
  const bgTo   = "#0e1a14";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200, height: 630, display: "flex", position: "relative",
          background: `linear-gradient(135deg, ${bgFrom} 0%, ${bgMid} 50%, ${bgTo} 100%)`,
          overflow: "hidden", fontFamily: "sans-serif",
        }}
      >
        {/* Top accent */}
        <div style={{ position:"absolute", top:0, left:0, width:1200, height:3, background:brand, opacity:0.75, display:"flex" }} />
        {/* Right dot grid */}
        <div style={{ position:"absolute", left:580, top:0, width:620, height:630,
          backgroundImage:`radial-gradient(circle, ${brand}42 1.5px, transparent 1.5px)`,
          backgroundSize:"26px 26px", display:"flex" }} />
        {/* Glow */}
        <div style={{ position:"absolute", left:620, top:65, width:560, height:500,
          borderRadius:"50%", background:`radial-gradient(ellipse, ${brand}18 0%, transparent 65%)`, display:"flex" }} />
        {/* Letter fill */}
        <div style={{ position:"absolute", left:720, top:60, fontSize:420, fontWeight:800,
          color:brand, opacity:0.10, lineHeight:1, display:"flex" }}>R</div>
        {/* Letter outline */}
        <div style={{ position:"absolute", left:720, top:60, fontSize:420, fontWeight:800,
          color:"transparent", WebkitTextStroke:`3px ${brand}68`, lineHeight:1, display:"flex" }}>R</div>
        {/* Content */}
        <div style={{ position:"absolute", left:80, top:138, display:"flex", flexDirection:"column" }}>
          <div style={{ display:"flex", alignItems:"center", backgroundColor:`${brand}22`,
            border:`1px solid ${brand}44`, borderRadius:4, padding:"5px 14px", marginBottom:38 }}>
            <span style={{ fontSize:12, fontWeight:700, letterSpacing:"1.8px", color:brand }}>RORK AI KNOWLEDGE BASE</span>
          </div>
          <div style={{ display:"flex", flexDirection:"column", marginBottom:28 }}>
            <span style={{ fontSize:84, fontWeight:800, color:"#ffffff", letterSpacing:"-2px", lineHeight:1 }}>Rork</span>
            <span style={{ fontSize:84, fontWeight:300, color:"#ffffff", opacity:0.78, letterSpacing:"-2px", lineHeight:1 }}>Lab</span>
          </div>
          <span style={{ fontSize:22, color:brand, opacity:0.88, letterSpacing:"1px", marginBottom:22 }}>rorklab.net</span>
          <div style={{ width:440, height:1, backgroundColor:`${brand}38`, display:"flex" }} />
        </div>
        {/* Credit */}
        <div style={{ position:"absolute", left:80, bottom:34, fontSize:13, letterSpacing:"2.5px", color:"#ffffff", opacity:0.28, display:"flex" }}>DOLICE LABS</div>
        {/* Bottom accent */}
        <div style={{ position:"absolute", bottom:0, left:0, width:1200, height:3, background:brand, opacity:0.4, display:"flex" }} />
      </div>
    ),
    { ...size }
  );
}
