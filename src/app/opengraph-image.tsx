import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social sharing image generated at build time. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "radial-gradient(circle at 80% 20%, #4b1590 0%, #07050D 55%)",
          color: "#F8F7FC",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            padding: "10px 24px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.18)",
            fontSize: 28,
            color: "#B9B2C8",
          }}
        >
          {profile.role}
        </div>
        <div style={{ display: "flex", fontSize: 96, fontWeight: 800, marginTop: 36, letterSpacing: -3 }}>
          {profile.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 44,
            marginTop: 12,
            backgroundImage: "linear-gradient(90deg, #8B2CFF, #C026FF, #3478FF)",
            backgroundClip: "text",
            color: "transparent",
            fontWeight: 700,
          }}
        >
          {`${profile.headline.lead} ${profile.headline.middle} ${profile.headline.accent}`}
        </div>
      </div>
    ),
    size,
  );
}
