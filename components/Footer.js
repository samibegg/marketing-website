// /components/Footer.js
import Link from 'next/link';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t py-12 text-sm text-gray-600">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Links */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">Company</h4>
          <ul className="space-y-2">
            <li><Link href="/knowledge-base" className="hover:underline">Knowledge Base</Link></li>
            <li><Link href="/case-studies" className="hover:underline">Case Studies</Link></li>
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            <li><Link href="/careers" className="hover:underline">Careers</Link></li>
            <li><Link href="/process" className="hover:underline">Our Process</Link></li>
            <li><Link href="/ai-cost-estimator" className="hover:underline">AI Cost Estimator <sup>Beta</sup></Link></li>
            <li><Link href="https://orchestrator.forgemission.com/" className="hover:underline">**NEW Model Orchestrator <sup>Beta</sup></Link></li>
          </ul>
        </div>

        {/* Social / Connect */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">Connect</h4>
          <div className="flex space-x-6 text-gray-500">
            <a href="https://www.linkedin.com/company/forgemission" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              <FaLinkedin size={20} />
            </a>
            <a href="https://x.com/forgemissioncom" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FaTwitter size={20} />
            </a>
            <a href="https://github.com/forgemission" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
              <FaGithub size={20} />
            </a>
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">Certifications</h4>
          <ul className="space-y-2">
            <li>ISO/IEC 27001:2022</li>
            <li>CMMI Level 3 (Services & Development)</li>
            <li>AWS Select Tier Partner</li>
            <li>Microsoft Solutions Partner</li>
            <li>Google Cloud Partner</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center text-gray-400">
        &copy; {new Date().getFullYear()} ForgeMission. All rights reserved.
      </div>
    </footer>
  );
}
