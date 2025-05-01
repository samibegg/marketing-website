'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm py-4 px-6 flex items-center justify-between">
  <div className="flex items-center space-x-2">
    <img src="/images/logo.png" alt="ForgeMission" className="h-11" />
    <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition">
      ForgeMission
    </Link>
  </div>
      <nav className="space-x-6 text-sm sm:text-base">
        <Link href="/knowledge-base" className="text-gray-700 hover:text-blue-600 transition">
          Knowledge Base
        </Link>
        <Link href="/process" className="text-gray-700 hover:text-blue-600 transition">
          Our Process
        </Link>
        <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">
          About Us
        </Link>
      </nav>
    </header>
  );
}
