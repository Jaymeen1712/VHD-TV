import { SITE_NAME } from "@/utils";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE_NAME} — Stream Movies & TV Series`;

const PRIMARY = "rgb(103, 232, 249)";

const OpengraphImage = () => {
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
          backgroundColor: "#171717",
        }}
      >
        <div style={{ display: "flex", fontSize: 140, fontWeight: 900 }}>
          <span style={{ color: PRIMARY }}>V</span>
          <span style={{ color: "#ffffff", marginLeft: 8 }}>HD</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 36,
            fontWeight: 600,
            color: "#a3a3a3",
          }}
        >
          Stream Movies &amp; TV Series
        </div>
      </div>
    ),
    { ...size },
  );
};

export default OpengraphImage;
