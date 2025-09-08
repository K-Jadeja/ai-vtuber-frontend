export const canvasStyles = {
  background: {
    container: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden",
      pointerEvents: "none",
      zIndex: -1,
    },
    image: {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: 1,
    },
    video: {
      position: "absolute" as const,
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      objectFit: "cover" as const,
      zIndex: 1,
      transform: "scaleX(-1)" as const,
    },
  },
  canvas: {
    container: {
      position: "relative",
      width: "100%",
      height: "100%",
      zIndex: "1",
      pointerEvents: "auto",
    },
  },
  subtitle: {
    container: {
      // More transparent glass effect for subtitles
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px) saturate(180%)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      boxShadow:
        "0 4px 20px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
      padding: "18px 32px",
      borderRadius: "20px",
      minWidth: "60%",
      maxWidth: "95%",
      position: "relative",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      _hover: {
        background: "rgba(255, 255, 255, 0.08)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow:
          "0 6px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
      },
    },
    text: {
      color: "rgba(255, 255, 255, 0.95)",
      fontSize: "1.5rem",
      textAlign: "center",
      lineHeight: "1.5",
      whiteSpace: "pre-wrap",
      textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
      position: "relative",
      zIndex: 1,
    },
  },
  wsStatus: {
    container: {
      position: "relative",
      zIndex: 2,
      padding: "10px 18px",
      borderRadius: "16px",
      fontSize: "14px",
      fontWeight: "500",
      color: "white",
      transition: "all 0.2s ease",
      cursor: "pointer",
      userSelect: "none",
      // Simple glass effect without complex animations
      backdropFilter: "blur(20px) saturate(180%)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      boxShadow:
        "0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      _hover: {
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.25)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      },
    },
  },
};
