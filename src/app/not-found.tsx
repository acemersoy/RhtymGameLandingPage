import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="tr" className="dark">
      <body className="flex min-h-screen items-center justify-center bg-[#0a0b14] text-[#f0ece4] font-sans">
        <div className="text-center px-6">
          <div className="text-7xl mb-4">♪</div>
          <h1 className="text-6xl font-bold mb-2 bg-gradient-to-r from-[#c084fc] via-[#818cf8] to-[#67e8f9] bg-clip-text text-transparent">
            404
          </h1>
          <p className="text-xl text-[#9ca3af] mb-8">
            Bu nota kayboldu...
          </p>
          <Link
            href="/tr"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#EA580C] px-6 py-3 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-[#FB923C]/20"
          >
            Ana Sayfaya Don
          </Link>
        </div>
      </body>
    </html>
  );
}
