import { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed
import { ChevronRight } from 'lucide-react';

// NOTE: To enable animations, you need to install framer-motion
// npm install framer-motion

// Data for the interactive demonstration section with more specific examples
const demoData = {
    questions: [
        { 
            id: 1, 
            level: 'Simple Factual Recall',
            text: "What is the interest rate for a new 'Innovate' savings account?" 
        },
        { 
            id: 2,
            level: 'Complex Contextual Understanding', 
            text: "If my 'Momentum' checking balance dips below the minimum for three days due to a pending 'InvestNow' transfer, will I be charged a fee?"
        },
        { 
            id: 3,
            level: 'Brand Tone & Customer Interaction',
            text: "I'm a bit confused about setting up my portfolio. Can you help me feel more confident?"
        }
    ],
    answers: {
        generic: {
            '1': 'Interest rates for savings accounts vary depending on the bank and current market conditions. You should check with the specific financial institution for their current rates.',
            '2': 'Most checking accounts have minimum balance requirements and may charge fees if the balance falls below that threshold. You should review your account\'s terms and conditions or contact customer support.',
            '3': 'To set up a portfolio, you should determine your risk tolerance and financial goals. Then, you can allocate assets like stocks and bonds. Consulting a financial advisor is often recommended.'
        },
        finetuned: {
            '1': 'The current annual percentage yield (APY) for our \'Innovate\' savings account is 4.75% for new customers. This rate is variable and may change based on market conditions.',
            '2': 'No, you will not be charged a fee. Our policy includes a 5-day grace period for balances that dip below the minimum due to pending internal transfers from platforms like \'InvestNow\'. Your \'Momentum\' account is safe from fees in this scenario.',
            '3': 'We understand that getting started with investing can feel overwhelming, but we\'re here to help you build confidence! Our \'Pathfinder\' tool is designed to walk you through setting goals in a simple way. To start, what are you most excited about saving for?'
        }
    }
};

// Sub-components for better organization

const TitleSection = () => (
    <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white text-center py-20 px-4">
        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold tracking-tight">From Generic AI to Domain-Specific Expert
        </motion.h1>
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-blue-100">
            Discover how fine-tuning transforms a powerful, general model into a bespoke AI that understands your unique business context and drives real value.
        </motion.p>
    </section>
);

const Section = ({ id, children }) => (
    <motion.section 
        id={id} 
        className="py-16 sm:py-24"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
    >
        {children}
    </motion.section>
);

const SectionTitle = ({ children }) => (
    <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-16 relative">
        {children}
        <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-blue-600 rounded"></span>
    </h2>
);

const ValueCard = ({ icon, title, children }) => (
     <div className="bg-white rounded-xl shadow-lg p-8 text-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl h-full">
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600">{children}</p>
    </div>
);

const TimelineItem = ({ phase, title, description, alignment }) => {
    const isLeft = alignment === 'left';
    const variants = {
        hidden: { opacity: 0, x: isLeft ? -100 : 100 },
        visible: { opacity: 1, x: 0 }
    };
    return (
        <motion.div 
            className="mb-8 flex justify-between items-center w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            variants={variants}
        >
            {isLeft && <div className="order-1 w-5/12"></div>}
            <div className="z-20 flex items-center order-1 bg-blue-600 shadow-xl w-12 h-12 rounded-full">
                <h3 className="mx-auto font-semibold text-lg text-white">{phase}</h3>
            </div>
            <div className={`order-1 ${isLeft ? 'text-right' : 'text-left'} bg-white rounded-lg shadow-xl w-5/12 px-6 py-4`}>
                <h4 className="font-bold text-blue-700 text-lg mb-1">{title}</h4>
                <p className="text-sm leading-snug tracking-wide text-gray-600">{description}</p>
            </div>
            {!isLeft && <div className="order-1 w-5/12"></div>}
        </motion.div>
    );
}

export default function FineTuningValuePage() {
    const [activeQuestion, setActiveQuestion] = useState(1);

    return (
        <>
            <Head>
                <title>The Value of Fine-Tuning: Llama 3 & NVIDIA NeMo</title>
                <meta name="description" content="Demonstrating the business value of fine-tuning LLMs like Llama 3 with NVIDIA NeMo." />
            </Head>

            <div className="bg-gray-50 text-gray-800">
                <Header />
                <TitleSection />

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Section id="problem-solution">
                        <SectionTitle>The Challenge & The Solution</SectionTitle>
                        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-xl shadow-lg p-8">
                                <h3 className="text-2xl font-bold text-red-500 mb-4">The Problem</h3>
                                <p className="text-gray-600">Off-the-shelf AI models lack the specialized knowledge for your domain, leading to inaccurate responses, generic interactions, and frustrated users. They simply don't speak your unique business language.</p>
                            </motion.div>
                            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-xl shadow-lg p-8">
                                <h3 className="text-2xl font-bold text-green-500 mb-4">The Solution</h3>
                                <p className="text-gray-600">Combine the power of a state-of-the-art model like Meta's Llama 3 with an enterprise-grade framework like NVIDIA NeMo. This creates a custom AI that understands your data and delivers unparalleled value.</p>
                            </motion.div>
                        </div>
                    </Section>

                    <Section id="demonstration">
                        <SectionTitle>A Tale of Two Models</SectionTitle>
                        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                            {/* Generic Model Column */}
                            <div>
                                <h3 className="text-2xl font-bold text-center mb-6 text-gray-700">Generic Llama 3</h3>
                                <div className="space-y-4 mb-6">
                                    {demoData.questions.map(q => (
                                        <motion.div key={`gen-${q.id}`} onClick={() => setActiveQuestion(q.id)}
                                            className={`p-4 rounded-lg cursor-pointer transition-colors duration-200 border-2 ${activeQuestion === q.id ? 'bg-blue-100 border-blue-500 shadow-lg' : 'bg-white border-transparent hover:bg-gray-100'}`}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}>
                                            <p className="font-semibold text-blue-800">{q.level}</p>
                                            <p className="text-sm text-gray-600">{q.text}</p>
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-inner min-h-[220px] border border-gray-200 flex flex-col">
                                    <p className="font-semibold text-gray-500 mb-2">Response:</p>
                                    <AnimatePresence mode="wait">
                                        <motion.p
                                            key={activeQuestion}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="text-gray-700 flex-grow"
                                        >
                                            {demoData.answers.generic[activeQuestion]}
                                        </motion.p>
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Fine-Tuned Model Column */}
                            <div>
                                <h3 className="text-2xl font-bold text-center mb-6 text-gray-700">Fine-Tuned Llama 3</h3>
                                <div className="space-y-4 mb-6">
                                    {demoData.questions.map(q => (
                                        <motion.div key={`ft-${q.id}`} onClick={() => setActiveQuestion(q.id)}
                                            className={`p-4 rounded-lg cursor-pointer transition-colors duration-200 border-2 ${activeQuestion === q.id ? 'bg-green-100 border-green-500 shadow-lg' : 'bg-white border-transparent hover:bg-gray-100'}`}
                                             whileHover={{ scale: 1.03 }}
                                             whileTap={{ scale: 0.98 }}>
                                             <p className="font-semibold text-green-800">{q.level}</p>
                                             <p className="text-sm text-gray-600">{q.text}</p>
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-inner min-h-[220px] border border-gray-200 flex flex-col">
                                     <p className="font-semibold text-gray-500 mb-2">Response:</p>
                                     <AnimatePresence mode="wait">
                                        <motion.p
                                            key={activeQuestion}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="text-gray-700 flex-grow"
                                        >
                                            {demoData.answers.finetuned[activeQuestion]}
                                        </motion.p>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </Section>

                    <Section id="value">
                        <SectionTitle>Tangible Business Value</SectionTitle>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            <ValueCard icon="🚀" title="Increased Efficiency & Productivity">Instantly get specific information, automating complex tasks and freeing up your team for high-value work.</ValueCard>
                            <ValueCard icon="😊" title="Enhanced Customer Experience">Deliver personalized, accurate, and helpful interactions that build brand loyalty and customer satisfaction.</ValueCard>
                            <ValueCard icon="🏆" title="Durable Competitive Advantage">Develop a proprietary AI asset, a moat around your business that competitors cannot easily replicate.</ValueCard>
                        </div>
                    </Section>

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
                    
                    {/* Call to Action Section */}
                    <motion.section 
                        className="bg-white my-20 p-12 rounded-xl shadow-xl text-center"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold text-gray-800">Ready to Create Your Own AI Expert?</h2>
                        <p className="mt-3 mb-6 max-w-xl mx-auto text-gray-600">Let's schedule a pilot project and demonstrate the power of Fine-Tuning on your specific data.</p>
                        <motion.button 
                            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Initiate a Pilot Project <ChevronRight className="ml-2 h-5 w-5" />
                        </motion.button>
                    </motion.section>

                </main>

                <Footer />
            </div>
        </>
    );
}
