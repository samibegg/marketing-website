'use client';

import Link from 'next/link';
import Header from '../components/Header'; // Assuming Header is in ../components/
import Footer from '../components/Footer'; // Assuming Footer is in ../components/

import { useEffect, useState } from 'react';

// You can also import this from a separate file
const heroTexts = [
  ["Intelligence in Every Layer", "Forging AI That Drives Results"],
  ["Turning Data into Direction", "And Algorithms into Action"],
  ["Where AI Gets Practical", "And Data Powers the Mission"],
  ["Forged from Data", "Built to Learn, Scale, and Adapt"],
  ["Smarter Systems and Decisions", "Mission-Driven AI Starts Here"],
  ["Data-Rich, Mission-Ready", "AI Solutions That Deliver"],
  ["Raw Data to Real Impact", "Engineering Intelligence"],
  ["AI with Purpose", "Data with Direction"],
  ["Insights Into Action", "Where AI Powers Missions"],
  ["Strategic by Design", "AI and Data Aligned to Your Goals"]
];

export default function AboutPage() {

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade out

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % heroTexts.length);
        setFade(true); // Fade back in
      }, 500); // Wait for fade-out before changing
    }, 3100);

    return () => clearInterval(interval);
  }, []);

  const [line1, line2] = heroTexts[index];

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow px-6 py-16">
        {/* About Intro Section */}
        <section className="text-center max-w-4xl mx-auto mb-16">
          <h1
            className={`text-5xl font-extrabold text-gray-900 mb-6 transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
          >
            {line1} <br /> {line2}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Founded on the principle that technology should accelerate business growth, we partner with enterprises worldwide to navigate the complexities of digital transformation. We are dedicated to architecting robust, scalable, and intelligent solutions—from cloud migration and big data engineering to cutting-edge app development and AI strategy—that drive tangible results.
          </p>
        </section>

        {/* Core Values Section */}
        <section className="max-w-5xl mx-auto mb-16">
           <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Core Values</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
             <div className="text-center p-4">
                {/* Optional: Add an icon here */}
               <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
               <p className="text-gray-600">Constantly exploring new technologies to deliver cutting-edge, future-proof solutions.</p>
             </div>
             <div className="text-center p-4">
                {/* Optional: Add an icon here */}
               <h3 className="text-xl font-semibold text-gray-900 mb-2">Partnership</h3>
               <p className="text-gray-600">Building long-term relationships based on trust, transparency, and shared success.</p>
             </div>
             <div className="text-center p-4">
                {/* Optional: Add an icon here */}
               <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
               <p className="text-gray-600">Committing to the highest standards in strategy, execution, and client service.</p>
             </div>
             <div className="text-center p-4">
                {/* Optional: Add an icon here */}
               <h3 className="text-xl font-semibold text-gray-900 mb-2">Integrity</h3>
               <p className="text-gray-600">Operating with transparency and accountability in every engagement.</p>
             </div>
           </div>
        </section>

        {/* Our Approach Section */}
        <section className="bg-white py-16 px-6 shadow-sm border border-gray-200 rounded-xl max-w-5xl mx-auto mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Our Collaborative Approach
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Our methodology is built on collaboration and deep understanding. We don't just implement technology; we immerse ourselves in your business to understand your unique challenges and strategic goals.
            </p>
            <p className="text-lg text-gray-600">
              From strategic planning through seamless execution and ongoing support, we focus on delivering tailored solutions that align perfectly with your objectives and provide a clear return on investment. We believe in building partnerships, not just projects.
            </p>
          </div>
        </section>

       {/* Service Portfolio Section */}
        <section className="max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Public Sector Service Portfolio</h2>
            <p>
              Leveraging expertise across a wide spectrum of disciplines, we offer an integrated suite of services designed to meet the diverse needs of public sector enterprises and government agencies. Our capabilities encompass:
            </p>

            {/* Category 1: IT Services */}
            <h3 className="text-2xl font-semibold mt-6">1. Information Technology Services</h3>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2">
              <li><strong>Custom Software & Systems Design:</strong> Developing tailored software solutions and designing robust computer systems to meet unique client requirements (NAICS 541511, 541512).</li>
              <li><strong>IT Infrastructure & Facilities Management:</strong> Providing comprehensive management of computer facilities and related IT infrastructure (NAICS 541513).</li>
              <li><strong>Data Processing & Hosting:</strong> Offering secure data processing, web hosting, application hosting, and related data management services (NAICS 518210).</li>
              <li><strong>Computer Related Services:</strong> Delivering a broad range of other computer-related support and technical services (NAICS 541519).</li>
              <li><strong>IT Equipment Repair & Maintenance:</strong> Providing expert repair and maintenance for computers, office machines, and communication equipment (NAICS 811212, 811213, 811219).</li>
            </ul>

            {/* Category 2: Consulting */}
            <h3 className="text-2xl font-semibold mt-6">2. Consulting & Advisory Services</h3>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2">
              <li><strong>Management Consulting:</strong> Offering strategic advice in administrative management, general management, and other specialized management areas to improve organizational performance (NAICS 541611, 541618).</li>
              <li><strong>Scientific & Technical Consulting:</strong> Providing expert consulting services across various scientific and technical fields (NAICS 541690).</li>
              <li><strong>General Professional Services:</strong> Delivering other specialized professional, scientific, technical, and legal support services tailored to client needs (NAICS 541990, 541199).</li>
            </ul>

             {/* Category 3: Information & Design */}
             <h3 className="text-2xl font-semibold mt-6">3. Information & Design Services</h3>
             <ul className="list-disc list-outside pl-5 mt-4 space-y-2">
               <li><strong>Information Services:</strong> Including internet publishing, web search portals, and other information dissemination services (NAICS 519130, 519190).</li>
               <li><strong>Engineering Services:</strong> Providing expert engineering solutions across various disciplines (NAICS 541330).</li>
               <li><strong>Graphic Design:</strong> Offering creative graphic design services (NAICS 541430).</li>
             </ul>

             {/* Category 4: Training */}
             <h3 className="text-2xl font-semibold mt-6">4. Training & Educational Support</h3>
             <ul className="list-disc list-outside pl-5 mt-4 space-y-2">
               <li><strong>Computer & Management Training:</strong> Providing specialized computer training and professional/management development programs (NAICS 611420, 611430).</li>
               <li><strong>Educational Support:</strong> Offering various educational support services (NAICS 611710).</li>
             </ul>

             {/* Category 5: Business & Legal Support */}
             <h3 className="text-2xl font-semibold mt-6">5. Business & Legal Support</h3>
             <ul className="list-disc list-outside pl-5 mt-4 space-y-2">
               <li><strong>Office Administrative Services:</strong> Providing comprehensive office administrative support (NAICS 561110).</li>
               <li><strong>Legal Support:</strong> Offering integrated legal support services (NAICS 541199).</li>
             </ul>
        </section>

        {/* Call to Action Section */}
        <section className="text-center max-w-3xl mx-auto mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Transform Your Business?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Let's discuss how our expertise in cloud, data, AI, and application development can accelerate your digital journey and drive meaningful growth.
          </p>
          <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md text-lg transition inline-block">
            Get In Touch
          </Link>
        </section>

      </main>

      <Footer />
    </div>
  );
}