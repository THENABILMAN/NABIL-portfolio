import { ImageResponse } from "next/og";

export const alt = "Mohammad Ali Nabil, AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        color: "#ffffff",
        backgroundColor: "#000000",
        backgroundImage: "radial-gradient(ellipse at 20% 0%, rgba(128,0,32,0.55), rgba(0,0,0,0) 60%)",
      }}
    >
      <div style={{ fontSize: 26, letterSpacing: 6, color: "#ff4d6d", marginBottom: 28 }}>THENABILMAN</div>
      <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.08 }}>Mohammad Ali Nabil</div>
      <div style={{ fontSize: 36, color: "#d4d4d8", marginTop: 28 }}>
        AI Engineer: RAG systems, LLM automation, Python backends
      </div>
    </div>,
    size
  );
}
