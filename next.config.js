/** @type {import('next').NextConfig} */

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https://*.google.com https://*.googleapis.com https://*.gstatic.com",
      "frame-src https://www.google.com",
      "connect-src 'self' https://formspree.io",
      "form-action 'self' https://formspree.io",
      "upgrade-insecure-requests",
      "block-all-mixed-content",
    ].join("; "),
  },
];

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,

  // Static hosts use public/_headers; this also protects server-mode previews.
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

module.exports = nextConfig;
