import { useState } from 'react';
import Head from 'next/head';
import { Search, Sparkles, AlertTriangle, HelpCircle, BookLock, Clock, Lightbulb, LockKeyhole, Rocket, ChevronRight } from 'lucide-react';

// Sub-component for the problem cards for better readability
const ProblemCard = ({ icon, title, children }) => (
    <div className="transform transition-transform duration-300 hover:-translate-y-2">
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl h-full">
            <div className="flex justify-center mb-4">
                <div className="bg-red-100 p-3 rounded-full">
                    {icon}
                </div>
            </div>
            <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">{title}</h3>
            <p className="text-center text-gray-600">{children}</p>
        </div>
    </div>
);

// Sub-component for the value proposition cards
const ValueCard = ({ icon, title, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500 flex items-start space-x-4">
        <div className="flex-shrink-0 text-green-500 mt-1">{icon}</div>
        <div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-gray-600">{children}</p>
        </div>
    </div>
);


export default function RagDemoPage() {
    // State for the "Old Way" search simulation
    const [isOldWaySearching, setIsOldWaySearching] = useState(false);
    const [oldWayResults, setOldWayResults] = useState([]);

    // State for the "New Way" (RAG) simulation
    const [isGenerating, setIsGenerating] = useState(false);
    const [ragAnswer, setRagAnswer] = useState(null);
    const [ragPrompt, setRagPrompt] = useState("Summarize the key contractual obligations and renewal dates for our top five vendors from the last two years.");

    const handleOldWaySearch = () => {
        setIsOldWaySearching(true);
        setOldWayResults([]); // Clear previous results
        setTimeout(() => {
            setOldWayResults([
                { type: 'doc', name: 'FY23_Vendor_Contracts_Master.docx' },
                { type: 'ppt', name: 'Vendor_Spend_Analysis_Q4.pptx' },
                { type: 'pdf', name: 'Legal_Review_Vendor_MSA_Templates.pdf' },
                { type: 'mail', name: 'Fwd: Contract renewal dates.msg' },
                { type: 'doc', name: 'Notes_from_Vendor_QBR.docx' },
            ]);
            setIsOldWaySearching(false);
        }, 1500);
    };

    const handleRagSearch = () => {
        if (!ragPrompt.trim()) return;
        setIsGenerating(true);
        setRagAnswer(null); // Clear previous answer
        setTimeout(() => {
            setRagAnswer({
                summary: [
                    { vendor: "Innovate Solutions Inc.", details: "Key obligations include a 99.9% uptime guarantee and 24/7 technical support. The contract auto-renews annually on August 15, 2025." },
                    { vendor: "DataCorp LLC", details: "Obligations focus on data privacy compliance (GDPR & CCPA) and providing quarterly performance reports. The renewal date is October 1, 2025." },
                    { vendor: "Global Logistics Co.", details: "Required to meet specific delivery timelines and maintain insurance coverage. Their 3-year contract is up for renewal on December 5, 2025." },
                    { vendor: "Creative Minds Agency", details: "Responsible for delivering monthly marketing campaign assets. This is a retainer contract with a renewal decision needed by July 31, 2025." },
                    { vendor: "SecureNet Hosting", details: "Key obligations are around cybersecurity protocols and incident response times. Their contract renews on September 22, 2025." },
                ],
                sources: [
                    { name: 'Innovate_Solutions_MSA_2023.pdf (Page 12)', type: 'pdf' },
                    { name: 'DataCorp_LLC_Contract_Signed.docx (Section 4.2)', type: 'doc' },
                    { name: 'Global_Logistics_Agreement_Final.pdf (Page 8)', type: 'pdf' },
                    { name: 'Email: Confirmation of Creative Minds Retainer.msg', type: 'mail' },
                ]
            });
            setIsGenerating(false);
        }, 3500);
    };

    return (
        <>
            <Head>
                <title>RAG Demo: From Maze to Insight</title>
                <meta name="description" content="A demonstration of Retrieval-Augmented Generation (RAG) on a knowledge base." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="bg-gray-50 text-gray-800">
                {/* Header */}
                <header className="bg-gradient-to-r from-blue-700 to-blue-500 text-white text-center py-16 px-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">From Information Maze to Instant Insight</h1>
                    <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-blue-100">
                        Discover how Retrieval-Augmented Generation (RAG) transforms your SharePoint knowledge base into an intelligent, active partner.
                    </p>
                </header>

                <main className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section 1: The Problem */}
                    <section className="py-20">
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800">The All-Too-Familiar Problem</h2>
                        <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto mt-4 mb-12">
                            Your company's knowledge is its greatest asset, but it's locked away. Finding precise answers to complex questions is a daily struggle.
                        </p>
                        <div className="grid md:grid-cols-3 gap-8">
                            <ProblemCard icon={<Clock size={32} className="text-red-500" />} title="Wasted Time">
                                Employees spend hours hunting through folders and irrelevant search results instead of focusing on high-value work.
                            </ProblemCard>
                            <ProblemCard icon={<HelpCircle size={32} className="text-red-500" />} title="Incomplete Answers">
                                Critical decisions are often made with fragmented information because the full context is too difficult to piece together.
                            </ProblemCard>
                            <ProblemCard icon={<BookLock size={32} className="text-red-500" />} title="Lost Knowledge">
                                Valuable insights from past projects and reports remain buried, leading to repeated mistakes and missed opportunities.
                            </ProblemCard>
                        </div>
                    </section>
                    
                    <hr className="border-t border-gray-200" />

                    {/* Section 2: The Live Demo */}
                    <section className="py-20">
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800">Let's Answer a Question</h2>
                        <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mt-4 mb-12">
                            <strong>Your task:</strong> "{ragPrompt}"
                        </p>
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                            {/* The "Old Way" */}
                            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                                <h3 className="text-2xl font-semibold flex items-center mb-4"><AlertTriangle className="text-red-500 mr-3" />The "Old Way": Keyword Search</h3>
                                <p className="text-gray-600 mb-6">Let's try using traditional SharePoint search. You might search for "vendor contracts," "renewal dates," etc.</p>
                                <div className="flex">
                                    <input type="text" placeholder="Search SharePoint..." className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500" />
                                    <button onClick={handleOldWaySearch} className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 font-semibold flex items-center">
                                        <Search size={20} />
                                    </button>
                                </div>
                                <div className="mt-6 bg-gray-50 p-4 rounded-md min-h-[250px] border">
                                    {isOldWaySearching && <p className="text-center text-gray-500">Searching...</p>}
                                    {oldWayResults.length > 0 && (
                                        <>
                                            <ul className="space-y-2">
                                                {oldWayResults.map((item, index) => (
                                                    <li key={index} className="bg-white p-3 rounded border flex items-center animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                                                        <span className="text-gray-500 mr-3">📄</span> {item.name}
                                                    </li>
                                                ))}
                                            </ul>
                                            <p className="mt-4 text-sm text-center italic text-gray-500">Result: A list of files. Now, you must open each one and piece the information together manually.</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* The "New Way" */}
                             <div className="bg-white p-8 rounded-xl shadow-lg border border-green-300">
                                <h3 className="text-2xl font-semibold flex items-center mb-4"><Sparkles className="text-green-500 mr-3" />The "New Way": Ask with RAG</h3>
                                <p className="text-gray-600 mb-6">Now, let's ask our new AI-powered system the exact same question in plain English.</p>
                                <textarea
                                    value={ragPrompt}
                                    onChange={(e) => setRagPrompt(e.target.value)}
                                    rows="3"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                ></textarea>
                                <button onClick={handleRagSearch} disabled={isGenerating} className="mt-4 w-full bg-green-600 text-white px-4 py-3 rounded-md hover:bg-green-700 font-semibold disabled:bg-green-300 disabled:cursor-not-allowed">
                                    {isGenerating ? 'Generating Answer...' : 'Get Your Answer'}
                                </button>
                                <div className="mt-6 bg-gray-50 p-4 rounded-md min-h-[250px] border">
                                    {isGenerating && (
                                        <div className="text-center text-gray-500 animate-pulse">
                                            <p>🧠 Accessing knowledge base...</p>
                                            <p>Synthesizing information...</p>
                                        </div>
                                    )}
                                    {ragAnswer && (
                                        <div className="animate-fade-in-up">
                                            <strong className="text-gray-900 block mb-3">Here is a summary based on your documents:</strong>
                                            <ul className="space-y-3">
                                                {ragAnswer.summary.map((item, index) => (
                                                    <li key={index}><strong className="font-semibold text-gray-700">{item.vendor}:</strong> {item.details}</li>
                                                ))}
                                            </ul>
                                            <div className="mt-6 pt-4 border-t">
                                                <h4 className="font-semibold text-sm text-gray-600 mb-2">Sources from your SharePoint:</h4>
                                                <div className="space-y-1">
                                                {ragAnswer.sources.map((src, index) => (
                                                    <a key={index} href="#" onClick={(e) => e.preventDefault()} className="text-sm text-blue-600 hover:underline flex items-center">
                                                        <span className="text-gray-500 mr-2">📄</span> {src.name}
                                                    </a>
                                                ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <hr className="border-t border-gray-200" />

                    {/* Section 3: The Business Value */}
                    <section className="py-20">
                         <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800">The RAG Advantage: Tangible Business Value</h2>
                        <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto mt-4 mb-12">
                            This isn't just a better search. It's a new way of working that drives efficiency, better decisions, and competitive advantage.
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                            <ValueCard icon={<Clock size={28}/>} title="Drastic Time Savings">Move from hours of searching to seconds of waiting. Free up your team to innovate and execute, not hunt for data.</ValueCard>
                            <ValueCard icon={<Lightbulb size={28}/>} title="Smarter, Faster Decisions">Get complete, synthesized answers based on all relevant data, reducing risk and ensuring you're acting on the full picture.</ValueCard>
                            <ValueCard icon={<LockKeyhole size={28}/>} title="Unlock Institutional Knowledge">Turn your passive archive into an active, intelligent expert that any employee can consult for immediate insights.</ValueCard>
                            <ValueCard icon={<Rocket size={28}/>} title="Boost Employee Productivity">Empower your workforce with tools that eliminate friction, reduce frustration, and allow them to perform at their best.</ValueCard>
                        </div>
                    </section>

                    {/* Section 4: Call to Action */}
                    <section className="bg-white my-20 p-12 rounded-xl shadow-xl text-center">
                        <h2 className="text-3xl font-bold text-gray-800">Ready to Unlock Your Organization's Knowledge?</h2>
                        <p className="mt-3 mb-6 max-w-xl mx-auto text-gray-600">Let's schedule a pilot project and demonstrate the power of RAG on your specific data.</p>
                        <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 flex items-center mx-auto">
                            Initiate a Pilot Project <ChevronRight className="ml-2" />
                        </button>
                    </section>
                </main>

                <footer className="text-center py-8 bg-gray-200 text-gray-600">
                    <p>&copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.</p>
                </footer>
            </div>
        </>
    );
}
