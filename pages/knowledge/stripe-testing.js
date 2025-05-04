import Image from 'next/image';
import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import { BuyReportButton } from '@/components/BuyReportButton';

const TestStripePage = () => {
  // State for collapsible sections (A, B, C)
  const [sectionsOpen, setSectionsOpen] = useState({ A: false, B: false, C: false });
  const contentRef = useRef(null); // Ref for copy tracking
  const scrollMilestonesReached = useRef(new Set()); // Ref for scroll tracking
  const activeTimeStart = useRef(Date.now()); // Ref for active time tracking
  const totalActiveTime = useRef(0); // Ref for active time tracking

  const reportIdentifier = 'unique-report-id-abc'; // Get this dynamically if needed

  return (
    <>
      <div className="bg-white min-h-screen flex flex-col">
        <Header />
          {/* Main content area with ref for copy tracking */}
          <div ref={contentRef} className="max-w-5xl mx-auto bg-white p-8 sm:p-10 lg:p-12 rounded-lg shadow-lg flex-grow">

            {/* Report Title (Consistent with overall report) */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-10 border-b-2 border-gray-200 pb-5">
              Testing Stripe
            </h1>

            {/* Navigation Buttons Container */}
            <div className="mt-12 pt-6 border-t border-gray-200 flex justify-between items-center">
              <BuyReportButton reportId={reportIdentifier} />

            </div>

          </div> {/* End of content card */}
        <Footer />
      </div>
    </>
  );
};

export default TestStripePage; 
