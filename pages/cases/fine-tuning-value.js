import { useState } from 'react';
import Head from 'next/head';
import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed

// Data for the interactive demonstration section
const demoData = {
    questions: [
        { id: 1, text: 'Question 1: Simple domain question' },
        { id: 2, text: 'Question 2: Tricky contextual question' },
        { id: 3, text: 'Question 3: Customer-facing query' }
    ],
    answers: {
        generic: {
            '1': 'Provides a general, textbook definition of the concept, lacking specific company context.',
            '2': 'Responds with, "I am unable to process that request as it requires specific contextual knowledge I do not have."',
            '3': 'Offers a generic reply like, "Our company offers a variety of solutions. Please visit our website for more information."'
        },
        finetuned: {
            '1': 'Delivers a nuanced answer that correctly incorporates your company\'s specific terminology and business context.',
            '2': 'Accurately interprets the complex, nuanced question and provides a precise, actionable response based on your proprietary data.',
            '3': 'Replies in your unique brand voice, offering a personalized and genuinely helpful response to the customer.'
        }
    }
};

// Sub-components for better organization

const Section = ({ id, children }) => (
    <section id={id} className="py-16 sm:py-24">
        {children}
    </section>
);

const SectionTitle = ({ children }) => (
    <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-600 mb-16 relative">
        {children}
        <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-blue-600 rounded"></span>
    </h2>
);

const ValueCard = ({ icon, title, children }) => (
     <div className="bg-white rounded-xl shadow-lg p-8 text-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600">{children}</p>
    </div>
);

const TimelineItem = ({ phase, title, description, alignment }) => {
    const isLeft = alignment === 'left';
    return (
        <div className="mb-8 flex justify-between items-center w-full">
            {isLeft && <div className="order-1 w-5/12"></div>}
            <div className="z-20 flex items-center order-1 bg-blue-600 shadow-xl w-12 h-12 rounded-full">
                <h3 className="mx-auto font-semibold text-lg text-white">{phase}</h3>
            </div>
            <div className={`order-1 ${isLeft ? 'text-right' : 'text-left'} bg-white rounded-lg shadow-xl w-5/12 px-6 py-4`}>
                <h4 className="font-bold text-blue-700 text-lg mb-1">{title}</h4>
                <p className="text-sm leading-snug tracking-wide text-gray-600">{description}</p>
            </div>
            {!isLeft && <div className="order-1 w-5/12"></div>}
        </div>
    );
}

export default function FineTuningValuePage() {
    // State to manage the active question in the demo
    const [activeQuestion, setActiveQuestion] = useState(1);

    return (
        <>
            <Head>
                <title>The Value of Fine-Tuning: Llama 3 & NVIDIA NeMo</title>
                <meta name="description" content="Demonstrating the business value of fine-tuning a Large Language Model with Private Data." />
            </Head>

            <div className="bg-gray-50 text-gray-800">
                <Header />

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Section id="title-section">
                        <SectionTitle>Fine-Tuning Large Language Model with Private Data</SectionTitle>
                        <div className="text-center max-w-3xl mx-auto">
                          <p className="text-lg text-gray-700">
                            Generic models are a great starting point, but they lack the specific knowledge that makes your business unique. Fine-tuning an existing, powerful model with your own private data is the key to unlocking true AI-powered potential and creating a durable competitive advantage.
                          </p>
                        </div>
                    </Section>

                    {/* Problem & Solution Section */}
                    <Section id="problem-solution">
                        <SectionTitle>The Challenge & The Solution</SectionTitle>
                        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                            <div className="bg-white rounded-xl shadow-lg p-8 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
                                <h3 className="text-2xl font-bold text-red-500 mb-4">The Problem</h3>
                                <p className="text-gray-600">Off-the-shelf AI models lack the specialized knowledge for your domain, leading to inaccurate responses, generic interactions, and frustrated users. They simply don't speak your unique business language.</p>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg p-8 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
                                <h3 className="text-2xl font-bold text-green-500 mb-4">The Solution</h3>
                                <p className="text-gray-600">Combine the power of a state-of-the-art model with an modern, parameter efficient finetuning method. This creates a custom AI that understands your data and delivers unparalleled value.</p>
                            </div>
                        </div>
                    </Section>

                    {/* Interactive Demonstration Section */}
                    <Section id="demonstration">
                        <SectionTitle>A Tale of Two Models</SectionTitle>
                        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                            {/* Generic Model Column */}
                            <div>
                                <h3 className="text-2xl text-center mb-6">Original Pre-trained LLM (Llama, Mistral, Gemini, etc)</h3>
                                <div className="space-y-3 mb-6">
                                    {demoData.questions.map(q => (
                                        <div key={`gen-${q.id}`} onClick={() => setActiveQuestion(q.id)}
                                            className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 ${activeQuestion === q.id ? 'bg-blue-100 border-blue-500 shadow-md' : 'bg-white border-transparent hover:bg-gray-100'}`}>
                                            <p className="font-semibold">{q.text}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-inner min-h-[150px] border border-gray-200">
                                    <p className="font-semibold text-gray-500 mb-2">Response:</p>
                                    <p>{demoData.answers.generic[activeQuestion]}</p>
                                </div>
                            </div>

                            {/* Fine-Tuned Model Column */}
                            <div>
                                <h3 className="text-2xl text-center mb-6">The same LLM, Fine-Tuned with Private Data</h3>
                                <div className="space-y-3 mb-6">
                                    {demoData.questions.map(q => (
                                        <div key={`ft-${q.id}`} onClick={() => setActiveQuestion(q.id)}
                                            className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 ${activeQuestion === q.id ? 'bg-green-100 border-green-500 shadow-md' : 'bg-white border-transparent hover:bg-gray-100'}`}>
                                            <p className="font-semibold">{q.text}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-inner min-h-[150px] border border-gray-200">
                                     <p className="font-semibold text-gray-500 mb-2">Response:</p>
                                     <p>{demoData.answers.finetuned[activeQuestion]}</p>
                                </div>
                            </div>
                        </div>
                    </Section>

                    {/* Business Value Section */}
                    <Section id="value">
                        <SectionTitle>Tangible Business Value</SectionTitle>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            <ValueCard icon="🚀" title="Increased Efficiency & Productivity">Instantly get specific information, automating complex tasks and freeing up your team for high-value work.</ValueCard>
                            <ValueCard icon="😊" title="Enhanced Customer Experience">Deliver personalized, accurate, and helpful interactions that build brand loyalty and customer satisfaction.</ValueCard>
                            <ValueCard icon="🏆" title="Durable Competitive Advantage">Develop a proprietary AI asset, a moat around your business that competitors cannot easily replicate.</ValueCard>
                        </div>
                    </Section>

                    {/* Next Steps (Timeline) Section */}
                    <Section id="next-steps">
                        <SectionTitle>The Path Forward</SectionTitle>
                        <div className="relative wrap overflow-hidden p-10 h-full">
                            <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border" style={{left: '50%'}}></div>
                            <TimelineItem 
                                phase="1"
                                title="Proof of Concept"
                                description="A successful demonstration of the potential of fine-tuning with a small-scale model to validate the approach."
                                alignment="left"
                            />
                            <TimelineItem 
                                phase="2"
                                title="Pilot Program"
                                description="Fine-tune Llama 3 on your full dataset and deploy to a select group for real-world feedback and metric tracking."
                                alignment="right"
                            />
                             <TimelineItem 
                                phase="3"
                                title="Full-Scale Deployment & Iteration"
                                description="Roll out the fine-tuned model across the organization and establish a process for continuous improvement and data flywheel."
                                alignment="left"
                            />
                        </div>
                    </Section>
                </main>

                <Footer />
            </div>
        </>
    );
}
