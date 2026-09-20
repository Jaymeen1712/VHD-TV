import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const PRIMARY = "rgb(103, 232, 249)";

const AppleIcon = () => {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#171717",
          fontSize: 84,
          fontWeight: 900,
        }}
      >
        <span style={{ color: PRIMARY }}>V</span>
        <span style={{ color: "#ffffff", marginLeft: 4 }}>HD</span>
      </div>
    ),
    { ...size },
  );
};

export default AppleIcon;
