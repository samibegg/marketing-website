import Image from 'next/image';
import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function KafkaEOSArticle() {
  return (
    // Add the main page wrapper with flex-col and min-h-screen
    <div className="bg-white min-h-screen flex flex-col">
      <Header />

      {/* Add flex-grow and container styling for the main content */}
      <main className="flex-grow py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Back button using modern Link syntax */}
          <div className="mb-8">
            <Link href="/knowledge-base" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition"> {/* Adjust href as needed */}
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Knowledge Base
            </Link>
          </div>

          {/* Article Header */}
          <div className="mb-10 border-b border-gray-200 pb-8">
             <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
               Improving Data Consistency in Kafka Streams with Exactly-Once Semantics
             </h1>
             <p className="text-lg text-gray-600">
               Kafka Streams provides powerful real-time stream processing, but ensuring data consistency can be challenging in highly distributed systems. This article covers how to achieve exactly-once semantics (EOS) in Kafka Streams and how it improves data consistency in your pipeline.
             </p>
          </div>


          {/* Image: Kafka Streams */}
          <div className="my-8">
            <Image src="/images/kafka-exactly-once.png" alt="Kafka Streams with Exactly-Once Semantics" width={800} height={400} className="rounded-lg shadow-md mx-auto" />
          </div>

          {/* Apply prose classes for article styling */}
          {/* Ensure you have @tailwindcss/typography installed and configured */}
          <article className="prose prose-lg lg:prose-xl max-w-none text-gray-700">

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">What is Exactly-Once Semantics?</h2>
            <p>
              Exactly-once semantics (EOS) is a processing guarantee ensuring that each record read from an input topic is processed and written to output topics (and state stores) precisely one time, even if failures occur within the system (like broker restarts, network issues, or application crashes/rebalances). It prevents both data loss (at-least-once avoids this too) and data duplication (at-most-once avoids this). EOS provides the strongest level of processing guarantee in Kafka.
            </p>

            <h3 className="text-xl font-semibold mt-4">Why is EOS Important?</h3>
            <p>
              In many stream processing applications, maintaining data integrity and correctness is paramount. Consider these scenarios:
            </p>
             <ul className="list-disc list-outside pl-5 mt-4 space-y-2">
                <li><strong>Financial Transactions:</strong> Processing a payment transfer exactly once is non-negotiable to avoid double charges or missed payments.</li>
                <li><strong>Data Aggregations:</strong> When counting events or summing values (e.g., real-time dashboards, billing systems), processing duplicates would lead to incorrect totals.</li>
                <li><strong>Stateful Operations:</strong> In applications maintaining state (e.g., tracking user sessions, inventory levels), duplicate processing can lead to inconsistent state.</li>
                <li><strong>Event-Driven Microservices:</strong> Ensuring commands or events between services are processed exactly once prevents unintended side effects.</li>
             </ul>
             <p>Without EOS, applications might need complex application-level logic (deduplication, idempotent operations) to handle potential duplicates or data loss inherent in at-least-once or at-most-once processing, increasing complexity and potential for errors.</p>


            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">How to Achieve Exactly-Once Semantics in Kafka Streams</h2>
            <p>
              Kafka Streams (version 0.11 and later) simplifies achieving EOS through configuration. It leverages Kafka's transactional producer capabilities and coordinated consumer offset commits.
            </p>

            <h3 className="text-xl font-semibold mt-4">Step 1: Configure Kafka Brokers</h3>
             <p>
               Ensure your Kafka brokers (version 0.11+) are configured correctly to support transactions. Key settings include appropriate replication factors for transaction-related internal topics (`transaction.state.log.replication.factor`, `transaction.state.log.min.isr`) and potentially adjusting transaction timeouts.
             </p>


            <h3 className="text-xl font-semibold mt-4">Step 2: Configure Kafka Streams Application</h3>
            <p>
              The primary step within your Kafka Streams application is setting the processing guarantee configuration parameter:
            </p>
            {/* Keep user's preferred code block style, corrected background */}
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm my-4">
{`import org.apache.kafka.streams.StreamsConfig;
import java.util.Properties;

// Kafka Streams Configuration Properties
Properties props = new Properties();
props.put(StreamsConfig.APPLICATION_ID_CONFIG, "my-eos-streams-app");
props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, "your_kafka_brokers:9092");
// Enable Exactly-Once Semantics (v1)
props.put(StreamsConfig.PROCESSING_GUARANTEE_CONFIG, StreamsConfig.EXACTLY_ONCE);
// For Kafka Streams 2.5+ (Kafka Clients 2.5+), EXACTLY_ONCE_V2 is preferred
// props.put(StreamsConfig.PROCESSING_GUARANTEE_CONFIG, StreamsConfig.EXACTLY_ONCE_V2);

// Other necessary configurations (serde, state dir, etc.)
// props.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.String().getClass());
// props.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.String().getClass());
// props.put(StreamsConfig.STATE_DIR_CONFIG, "/path/to/state-store");

// Optional: Increase commit interval if needed, but default is usually fine for EOS
// props.put(StreamsConfig.COMMIT_INTERVAL_MS_CONFIG, 100); // Default is 100ms for EOS
`}
            </pre>
            <p>
                Setting `processing.guarantee` to `exactly_once` (or `exactly_once_v2` for newer versions, which offers performance improvements) instructs Kafka Streams to use atomic transactions. This means that for each input record processed:
            </p>
             <ul className="list-disc list-outside pl-5 mt-4 space-y-2">
                <li>Reading the input record's offset.</li>
                <li>Updating any state stores associated with the processing topology.</li>
                <li>Writing any resulting output records to downstream Kafka topics.</li>
             </ul>
             <p>...are all committed together as a single atomic transaction. If any part fails, the entire transaction is aborted, and processing is retried after recovery, ensuring no partial updates or duplicates are committed.</p>


            <h3 className="text-xl font-semibold mt-4">Step 3: Understanding State Store Handling</h3>
            <p>
              Kafka Streams manages state locally (e.g., for aggregations, joins) using state stores, which are backed by fault-tolerant changelog topics in Kafka. When EOS is enabled, updates to local state stores and writes to their corresponding changelog topics are included within the atomic transaction. This guarantees that the state reflected in your application is always consistent with the processed offsets and output records.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Considerations and Limitations</h2>
            <p>
              While powerful, EOS comes with considerations:
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2"> {/* Adjusted list styling */}
              <li><strong>Performance Overhead:</strong> Transaction coordination adds latency compared to at-least-once processing. Throughput might be slightly lower due to the transactional guarantees. Measure performance for your specific workload.</li>
              <li><strong>Increased End-to-End Latency:</strong> Consumers reading from output topics produced by an EOS Streams app might experience slightly higher latency, as they typically need to read only *committed* transactional data (`isolation.level="read_committed"` is the default for consumers).</li>
              <li><strong>Broker Resource Usage:</strong> Transactions require more resources on the Kafka brokers (CPU, memory, disk I/O for transaction logs).</li>
              <li><strong>External System Interactions:</strong> EOS guarantees apply *within* the Kafka ecosystem (consuming from Kafka, processing, writing to Kafka, updating state stores). If your Streams application interacts with external systems (e.g., calling an external API, writing to an external database) within its processing logic, ensuring end-to-end exactly-once delivery requires additional mechanisms (e.g., idempotent external writes, two-phase commit protocols if supported by the external system), which Kafka Streams itself doesn't manage automatically for non-Kafka systems.</li>
              <li><strong>Broker Compatibility:</strong> Requires Kafka brokers version 0.11 or later.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Practical Use Cases for Exactly-Once Semantics</h2>
            <p>
              EOS is particularly valuable in scenarios where correctness outweighs maximum throughput or minimum latency:
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2">
                <li><strong>Financial Ledgers & Transactions:</strong> Ensuring every debit and credit is processed exactly once.</li>
                <li><strong>Critical Event Counting/Aggregation:</strong> Accurate real-time counts for monitoring, billing, or analytics where duplicates are unacceptable.</li>
                <li><strong>Data Pipeline Synchronization:</strong> Replicating data between Kafka topics or systems where consistency is key.</li>
                <li><strong>Stateful Alerting Systems:</strong> Ensuring alerts based on state transitions are triggered precisely once per condition met.</li>
            </ul>


            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Conclusion</h2>
            <p>
              Achieving exactly-once semantics in Kafka Streams, primarily through the `processing.guarantee` configuration, provides the highest level of data processing assurance within the Kafka ecosystem. It significantly simplifies the development of applications requiring strong data consistency by handling transactional atomicity across reads, state updates, and writes. While it introduces some performance considerations, EOS is indispensable for critical applications where data accuracy and reliability cannot be compromised.
            </p>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
