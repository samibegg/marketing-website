import Image from 'next/image';
import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function KafkaScalingArticle() {
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
               Scaling Kafka Clusters for Millions of Messages per Second
             </h1>
             <p className="text-lg text-gray-600">
               Kafka has emerged as one of the most reliable and scalable messaging systems for handling real-time data pipelines. However, scaling Kafka clusters to handle millions of messages per second requires understanding its architecture, configuration, and the best practices for horizontal scaling. In this article, we'll walk through strategies for scaling Kafka clusters to support massive data throughput.
             </p>
          </div>


          {/* Kafka Scaling Diagram */}
          <div className="my-8">
            <Image src="/images/kafka-cluster.png" alt="Kafka Cluster Scaling" width={800} height={400} className="rounded-lg shadow-md mx-auto" />
          </div>

          {/* Apply prose classes for article styling */}
          {/* Ensure you have @tailwindcss/typography installed and configured */}
          <article className="prose prose-lg lg:prose-xl max-w-none text-gray-700">

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 1: Understanding Kafka's Architecture and Scaling Basics</h2>
            <p>
              Kafka's scalability stems from its distributed architecture. Understanding these core components is crucial before scaling:
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2"> {/* Adjusted list styling */}
              <li><strong>Topics:</strong> Logical categories for messages. Scalability starts here.</li>
              <li><strong>Partitions:</strong> Topics are divided into partitions. Each partition is an ordered, immutable log. <strong>Partitions are the fundamental unit of parallelism in Kafka.</strong> Data within a partition is ordered, but there's no global order across partitions in a topic.</li>
              <li><strong>Brokers:</strong> Servers forming the Kafka cluster. Each broker hosts a subset of partitions for various topics. Adding brokers increases storage capacity, network bandwidth, and processing power.</li>
              <li><strong>Producers:</strong> Write data to specific topic partitions. Can choose partition via key hashing or round-robin.</li>
              <li><strong>Consumers:</strong> Read data from partitions. Consumers within a <strong>Consumer Group</strong> divide the partitions among themselves, ensuring each partition is consumed by only one consumer instance in that group at a time.</li>
              <li><strong>Replication:</strong> Each partition typically has replicas distributed across different brokers for fault tolerance. One replica is the leader (handles reads/writes), others are followers (sync data).</li>
            </ul>
            <p>
              Scaling Kafka primarily involves increasing parallelism by adding partitions and distributing the load across more brokers.
            </p>

            {/* Kafka architecture diagram (Re-using image placeholder if applicable) */}
            {/*
            <div className="my-8">
              <Image src="/images/kafka-architecture.png" alt="Kafka Architecture" width={800} height={400} className="rounded-lg shadow-md mx-auto" />
            </div>
            */}


            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 2: Scaling Through Partitioning</h2>
            <p>
              Increasing the number of partitions for a topic is the primary way to increase write and read parallelism.
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2">
              <li><strong>Assess Throughput Needs:</strong> Determine the target produce/consume rate (messages/sec or MB/sec). Measure the maximum throughput a single partition can handle on your hardware/network (e.g., 10-50 MB/sec is common, but varies greatly). Divide target throughput by single-partition throughput to estimate the minimum required partitions.</li>
              <li><strong>Consider Consumer Parallelism:</strong> The number of partitions sets the <strong>maximum</strong> parallelism for a consumer group. If you need 20 consumers processing in parallel, you need at least 20 partitions.</li>
              <li><strong>Partitioning Strategy:</strong> If message order matters for related messages (e.g., events for the same user ID), use a consistent partitioning key (like user ID). Kafka's default hash partitioner will send messages with the same key to the same partition. If order doesn't matter, use round-robin (null key) for better load distribution.</li>
              <li><strong>Adding Partitions:</strong> You can increase the partition count for an existing topic (`kafka-topics.sh --alter`), but you <strong>cannot decrease it</strong>. Plan for future growth, but avoid excessive over-partitioning.</li>
              <li><strong>Impact of High Partition Count:</strong> Too many partitions (&gt thousands per broker) increase metadata overhead, leader election time during failures, and memory usage on brokers and clients. Find a balance.</li>
            </ul>
            <p>
              More partitions allow more producers to write in parallel (to different partitions) and more consumers within a group to read in parallel.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 3: Scaling Through Broker Addition (Horizontal Scaling)</h2>
            <p>
              Adding more broker nodes to the cluster increases overall capacity (CPU, RAM, disk I/O, network bandwidth) and allows partitions to be distributed across more machines.
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2">
              <li><strong>Distribute Load:</strong> When adding brokers, reassign partition replicas to the new brokers to balance the load (`kafka-reassign-partitions.sh`). Tools like Cruise Control can automate this.</li>
              <li><strong>Replication Factor:</strong> Maintain an adequate replication factor (typically 3) for fault tolerance as you add brokers. Ensure replicas are spread across different racks or availability zones.</li>
              <li><strong>Broker Capacity Planning:</strong> Monitor CPU, memory, disk I/O, and network usage on existing brokers to determine bottlenecks. Ensure new brokers have adequate resources. Consider instance types optimized for network or disk I/O depending on the workload.</li>
              <li><strong>Zookeeper/KRaft Considerations:</strong> Ensure your metadata management layer (Zookeeper or KRaft quorum) can handle the increased number of brokers and partitions. KRaft generally scales better for very large clusters.</li>
            </ul>
            <p>
              Adding brokers allows the cluster to handle more partitions, more replicas, and higher aggregate network/disk throughput.
            </p>

            {/* Kafka Producer-Consumer Flow Diagram */}
            <div className="my-8">
              <Image src="/images/kafka-producer-consumer.png" alt="Kafka Producer Consumer Flow" width={800} height={400} className="rounded-lg shadow-md mx-auto" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 4: Optimizing Producer and Consumer Configurations</h2>
            <p>
              Tuning client configurations is essential to leverage the scaled cluster effectively (refer to the previous article on Kafka Optimization for details on specific parameters like `acks`, `batch.size`, `linger.ms`, `compression.type`, `fetch.min.bytes`, etc.). Key considerations for high scale:
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2">
              <li><strong>Producer Optimization:</strong>
                <ul className="list-disc list-outside pl-5 mt-2 space-y-1">
                  <li>Use larger `batch.size` (e.g., 64KB-256KB+) and appropriate `linger.ms` (e.g., 10-100ms) to maximize throughput.</li>
                  <li>Enable efficient compression (`lz4`, `snappy`, `zstd`).</li>
                  <li>Increase `buffer.memory` significantly to handle high production rates.</li>
                  <li>Consider `acks=1` if some potential data loss on leader failure is acceptable for lower latency, or `acks=all` for maximum durability.</li>
                </ul>
              </li>
              <li><strong>Consumer Optimization:</strong>
                <ul className="list-disc list-outside pl-5 mt-2 space-y-1">
                  <li>Scale consumer instances within a group up to the number of partitions.</li>
                  <li>Increase `fetch.min.bytes` substantially (e.g., 1MB or more) to improve throughput by fetching larger batches. Adjust `fetch.max.wait.ms` accordingly.</li>
                  <li>Increase `max.poll.records` if processing logic is fast, allowing more records per poll loop.</li>
                  <li>Use manual offset commits (`enable.auto.commit=false`) for reliable processing.</li>
                  <li>Ensure consumer processing logic is highly optimized and potentially parallelized internally if needed.</li>
                </ul>
              </li>
            </ul>
            <p>
              Client tuning ensures they don't become the bottleneck preventing you from reaching millions of messages per second.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 5: Monitoring and Tuning the Kafka Cluster</h2>
            <p>
              At massive scale, continuous monitoring and iterative tuning are critical. Pay close attention to:
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2">
              <li><strong>Broker Resource Saturation:</strong> Monitor CPU (especially network processing threads and request handler threads), Network I/O (is it hitting NIC limits?), Disk I/O (latency, queue depth, throughput - are disks keeping up?), and JVM Heap usage.</li>
              <li><strong>Partition Skew:</strong> Ensure partitions are evenly distributed across brokers and that load (produce/consume rate) is balanced across partitions (check partition sizes and throughput metrics). Poor partitioning keys can cause hotspots.</li>
              <li><strong>Consumer Lag:</strong> Track `kafka.consumer.FetcherLagMetrics` (or similar JMX metrics) closely. High or constantly increasing lag indicates consumers cannot keep up.</li>
              <li><strong>Request Latency:</strong> Monitor Produce and Fetch request latencies (p95, p99) to ensure performance meets SLOs.</li>
              <li><strong>Replication Health:</strong> Monitor Under-Replicated Partitions and ISR (In-Sync Replica) shrink/expand rates.</li>
            </ul>
            <p>Use monitoring dashboards (Grafana/Prometheus, Datadog, etc.) and alerting to proactively identify issues. Be prepared to adjust partition counts, add brokers, or tune client/broker configurations based on observed performance.</p>

            {/* Kafka Monitoring Diagram */}
            <div className="my-8">
              <Image src="/images/kafka-monitoring.png" alt="Kafka Monitoring" width={800} height={400} className="rounded-lg shadow-md mx-auto" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Conclusion</h2>
            <p>
              Scaling Apache Kafka clusters to handle millions of messages per second is achievable through a combination of architectural understanding and systematic tuning. The core strategies involve increasing parallelism via topic partitioning, distributing load by adding brokers horizontally, and meticulously optimizing producer and consumer configurations for high throughput. Continuous monitoring and iterative tuning based on performance metrics are essential to identify bottlenecks and maintain optimal performance at massive scale.
            </p>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
