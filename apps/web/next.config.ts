import type { NextConfig } from "next";

// Render/Railway-style platforms hand out an internal "host:port" via fromService wiring,
// with no protocol — add one so this stays a valid rewrite destination.
const rawApiUrl = process.env.API_URL ?? "http://localhost:4000";
const API_URL = /^https?:\/\//.test(rawApiUrl)
  ? rawApiUrl
  : `http://${rawApiUrl}`;

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["127.0.0.1"],
  reactStrictMode: true,
  poweredByHeader: false,
  async rewrites() {
    return [
      { source: "/api/:path*", destination: `${API_URL}/api/:path*` },
      { source: "/uploads/:path*", destination: `${API_URL}/uploads/:path*` },
    ];
  },
};

export default nextConfig;
