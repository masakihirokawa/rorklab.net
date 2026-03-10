import { ImageResponse } from "next/og";

export const alt = "Rork Lab — Rork Max 日本語ナレッジベース";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0c0c14 0%, #16162a 60%, #1a1a32 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo mark — matches favicon */}
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 20,
            background: "linear-gradient(135deg, #E8967D, #D4785E)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 56,
            fontWeight: 700,
            color: "#0c0c14",
            marginBottom: 36,
            boxShadow: "0 8px 32px rgba(232, 150, 125, 0.3)",
          }}
        >
          R
        </div>

        {/* Site name */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#f0f0f0",
            letterSpacing: "-0.02em",
            marginBottom: 12,
          }}
        >
          Rork Lab
        </div>

        {/* URL */}
        <div
          style={{
            fontSize: 20,
            color: "#777",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          rorklab.net
        </div>

        {/* Accent line */}
        <div
          style={{
            width: 80,
            height: 3,
            borderRadius: 2,
            background: "linear-gradient(90deg, #E8967D, transparent)",
            marginTop: 32,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
