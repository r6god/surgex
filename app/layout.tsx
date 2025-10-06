export const metadata = {
  title: "SurgeX — AI memecoin trading hub",
  description: "AI discovery, momentum signals, risk screens, alerts, and one‑click trade.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white antialiased">{children}</body>
    </html>
  );
}
