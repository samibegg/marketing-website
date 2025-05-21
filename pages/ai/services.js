// pages/ai.js
import Head from 'next/head';
import Link from 'next/link';

export default function AIServicePage() {
  return (
    <div className="text-gray-900 bg-white scroll-smooth">
      <Head>
        <title>AI Services for Small Tech Firms</title>
        <meta name="description" content="Agentic AI workflows, RAG, self-hosted models and more for small web/software companies." />
      </Head>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-gray-900 to-gray-700 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Don’t just use AI — <span className="text-blue-400">own</span> your AI workflows.</h1>
        <p className="text-lg md:text-xl max-w-xl mb-6">
          We help technology businesses like yours go from AI-curious to AI-operational with real workflows, agents, and private models.
        </p>
        <Link href="#journey" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all">
          See How It Works
        </Link>
      </section>

      {/* The Shift Section */}
      <section className="py-20 px-6 bg-white text-gray-800" id="journey">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">From Tools to Transformation</h2>
          <p className="text-lg mb-8">
            Your clients are asking about AI. Bolt-on tools won’t cut it. You need systems that integrate deeply and deliver results.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-xl bg-gray-50">
              <h3 className="font-semibold mb-2">❌ ChatGPT Experiments</h3>
              <ul className="list-disc list-inside text-left">
                <li>Unstable, no ownership</li>
                <li>No integration with workflows</li>
                <li>Compliance and data risks</li>
              </ul>
            </div>
            <div className="p-6 border rounded-xl bg-blue-50">
              <h3 className="font-semibold mb-2">✅ Agentic Systems</h3>
              <ul className="list-disc list-inside text-left">
                <li>Custom agents for real tasks</li>
                <li>Private RAG & model hosting</li>
                <li>Owned data + control</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="py-20 px-6 bg-gray-50 text-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Problems We Solve</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="p-6 bg-white rounded-xl shadow">
              <p>❌ You’ve tried integrating APIs but nothing’s sticky.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow">
              <p>❌ Your team lacks GPU infra or LLM experience.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow">
              <p>❌ You can’t justify high SaaS AI costs to your clients.</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-xl">
              <p>✅ On-device and self-hosted AI solutions.</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-xl">
              <p>✅ Agent workflows for support, onboarding, data processing.</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-xl">
              <p>✅ Full AI pipelines with your own data and models.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Large Image Section */}
      <section className="py-20 px-6 bg-white text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">See It in Action</h2>
          <p className="mb-8 text-lg text-gray-700">Visualize how agentic workflows and RAG systems integrate seamlessly into your business processes.</p>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img src="/images/automation-workflow.png" alt="AI Workflow System" className="w-full h-auto object-cover" />
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section className="py-20 px-6 bg-white text-gray-900">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Solution: AI Built For You</h2>
          <p className="mb-12 text-lg">From architecture to implementation — we do the hard parts. You own the outcomes.</p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="p-6 border rounded-xl">
              <h3 className="text-xl font-semibold mb-2">🔍 Understand</h3>
              <p>We audit your workflows and identify AI opportunities that truly fit.</p>
            </div>
            <div className="p-6 border rounded-xl">
              <h3 className="text-xl font-semibold mb-2">⚙️ Build</h3>
              <p>We create agentic workflows, implement RAG, and integrate self-hosted or tuned models.</p>
            </div>
            <div className="p-6 border rounded-xl">
              <h3 className="text-xl font-semibold mb-2">🚀 Deploy</h3>
              <p>We deploy, monitor, and train your team on AI systems you own and understand.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Tech We Work With</h2>
          <p className="mb-8">We integrate the best open and private tools to fit your needs.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['LangChain', 'LlamaIndex', 'Ollama', 'OpenAI', 'Anthropic', 'Weaviate', 'Qdrant', 'FastAPI', 'Node.js', 'Python'].map((tech) => (
              <span key={tech} className="px-4 py-2 bg-blue-500 rounded-xl text-white text-sm font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-white text-center text-gray-900">
        <h2 className="text-3xl font-bold mb-6">Ready to stop experimenting and start implementing?</h2>
        <p className="mb-6 text-lg">Let’s explore your AI roadmap together.</p>
        <a
          href="/contact"
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-bold transition-all"
        >
          Book a Free AI Strategy Call
        </a>
      </section>
    </div>
  );
}
