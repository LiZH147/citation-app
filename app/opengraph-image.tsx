import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ConvertGB 参考文献格式转换器";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #6366f1 100%)",
          fontFamily: '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif',
          padding: "80px",
        }}
      >
        {/* Logo area */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "32px",
              fontWeight: 900,
            }}
          >
            ¶
          </div>
          <span
            style={{
              fontSize: "50px",
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.5px",
            }}
          >
            ConvertGB
          </span>
        </div>

        {/* 主标题 */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 900,
            color: "#ffffff",
            textAlign: "center",
            marginBottom: "30px",
            lineHeight: 1.1,
            letterSpacing: "-1px",
          }}
        >
          参考文献格式转换器
        </div>

        {/* 副标题 */}
        <div
          style={{
            fontSize: "32px",
            color: "rgba(255,255,255,0.85)",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.4,
          }}
        >
          BibTeX &middot; APA &middot; DOI → GB/T 7714‑2015 国标
        </div>

        {/* 底部 URL */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "60px",
            fontSize: "22px",
            color: "rgba(255,255,255,0.5)",
            fontFamily: "monospace",
          }}
        >
          www.convertgb.shop
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}