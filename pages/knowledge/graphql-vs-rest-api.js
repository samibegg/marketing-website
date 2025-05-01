import Image from 'next/image';
import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function GraphQLVsRestArticle() {
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
               GraphQL vs REST for Modern App Architectures: When to Choose What
             </h1>
             <p className="text-lg text-gray-600">
               In modern app development, choosing the right approach for your API is critical to ensure performance, flexibility, and scalability. This article dives into the differences between GraphQL and REST APIs and provides insights on when to choose each one.
             </p>
          </div>


          {/* GraphQL vs REST Diagram */}
          <div className="my-8">
            <Image src="/images/graphql-vs-rest.png" alt="GraphQL vs REST" width={800} height={400} className="rounded-lg shadow-md mx-auto" />
          </div>

          {/* Apply prose classes for article styling */}
          {/* Ensure you have @tailwindcss/typography installed and configured */}
          <article className="prose prose-lg lg:prose-xl max-w-none text-gray-700">

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Understanding REST API</h2>
            <p>
              REST (Representational State Transfer) is a widely adopted architectural style for building web services, particularly APIs. It relies on standard HTTP methods (GET, POST, PUT, DELETE, PATCH) to interact with resources identified by URLs. REST APIs are stateless, meaning each request from a client must contain all the information needed to understand and process it. They are known for their simplicity, scalability, and broad compatibility across platforms.
            </p>
            <p>
              However, a common challenge with REST, especially for complex applications with diverse client needs (e.g., web and mobile apps needing different data subsets), is data fetching efficiency. Clients might receive more data than needed from an endpoint (over-fetching) or need to make multiple requests to different endpoints to gather all required information (under-fetching).
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">GraphQL: A Modern Approach to APIs</h2>
            <p>
              GraphQL is a query language specifically designed for APIs and a server-side runtime for executing those queries using a strongly-typed schema you define for your data. Developed by Facebook and open-sourced in 2015, GraphQL allows clients to request exactly the data they need, and nothing more, in a single request.
            </p>
            <p>
              Instead of multiple endpoints for different resources like REST, GraphQL typically exposes a single endpoint. Clients send POST requests containing a query that specifies the exact fields and related data they require. The server then processes this query and returns a JSON response matching the query structure. This eliminates over-fetching and under-fetching issues and empowers frontend developers to get data efficiently.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">GraphQL vs REST: Key Differences</h2>
             {/* Table - Note: Prose styling might affect custom table styles. Adjust if needed. */}
            <div className="my-6 overflow-x-auto"> {/* Added margin and overflow handling */}
              <table className="w-full border-collapse text-left"> {/* Removed table-auto for potentially better prose integration */}
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 p-3 text-sm font-semibold text-gray-700">Feature</th>
                    <th className="border border-gray-300 p-3 text-sm font-semibold text-gray-700">REST</th>
                    <th className="border border-gray-300 p-3 text-sm font-semibold text-gray-700">GraphQL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3 text-sm">Endpoints</td>
                    <td className="border border-gray-300 p-3 text-sm">Multiple endpoints (e.g., /users, /posts/:id)</td>
                    <td className="border border-gray-300 p-3 text-sm">Typically a single endpoint (e.g., /graphql)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3 text-sm">Data Fetching</td>
                    <td className="border border-gray-300 p-3 text-sm">Server defines response structure; can lead to over/under-fetching</td>
                    <td className="border border-gray-300 p-3 text-sm">Client specifies required data; fetches exactly what's needed</td>
                  </tr>
                   <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3 text-sm">HTTP Methods</td>
                    <td className="border border-gray-300 p-3 text-sm">Uses multiple methods (GET, POST, PUT, DELETE, etc.)</td>
                    <td className="border border-gray-300 p-3 text-sm">Typically uses POST for queries and mutations (GET possible for queries)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3 text-sm">Schema & Typing</td>
                    <td className="border border-gray-300 p-3 text-sm">No built-in schema standard (OpenAPI/Swagger often used)</td>
                    <td className="border border-gray-300 p-3 text-sm">Strongly typed schema defines the API capabilities</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3 text-sm">Versioning</td>
                    <td className="border border-gray-300 p-3 text-sm">Commonly versioned via URL (e.g., /v1/, /v2/)</td>
                    <td className="border border-gray-300 p-3 text-sm">Avoids explicit versioning; evolve schema by adding fields (deprecate old ones)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3 text-sm">Caching</td>
                    <td className="border border-gray-300 p-3 text-sm">Leverages standard HTTP caching mechanisms effectively</td>
                    <td className="border border-gray-300 p-3 text-sm">More complex caching; often requires client-side libraries (e.g., Apollo Client, Relay)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3 text-sm">Complexity</td>
                    <td className="border border-gray-300 p-3 text-sm">Conceptually simpler, widely understood</td>
                    <td className="border border-gray-300 p-3 text-sm">Steeper learning curve initially (schema, resolvers, tooling)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">When to Choose REST?</h2>
            <p>
              REST remains an excellent choice in many scenarios:
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2"> {/* Adjusted list styling */}
              <li><strong>Simple APIs:</strong> When dealing with straightforward resource structures and limited client data needs.</li>
              <li><strong>Resource-Oriented Services:</strong> Ideal for APIs primarily focused on CRUD (Create, Read, Update, Delete) operations on well-defined resources.</li>
              <li><strong>Public APIs & Broad Compatibility:</strong> When maximum interoperability is needed, as REST relies only on standard HTTP understood by virtually all clients.</li>
              <li><strong>Leveraging HTTP Caching:</strong> When you want to heavily utilize standard HTTP caching mechanisms provided by browsers and intermediaries.</li>
              <li><strong>Mature Tooling & Ecosystem:</strong> When you prefer leveraging the vast and mature ecosystem of tools built around REST and HTTP.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">When to Choose GraphQL?</h2>
            <p>
              GraphQL offers compelling advantages when:
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2"> {/* Adjusted list styling */}
              <li><strong>Diverse Client Needs:</strong> Supporting multiple clients (e.g., web, iOS, Android) that require different data views from the same backend.</li>
              <li><strong>Complex Data Relationships:</strong> Your application involves fetching deeply nested or related data across multiple resources in a single request.</li>
              <li><strong>Network Efficiency is Critical:</strong> Minimizing the amount of data transferred over the network is crucial, especially for mobile applications.</li>
              <li><strong>Frontend Empowerment:</strong> You want to give frontend teams more control over the data they fetch without requiring backend changes for every new data requirement.</li>
              <li><strong>API Evolution without Versioning:</strong> You prefer evolving your API by adding new fields and types rather than maintaining multiple versions.</li>
              <li><strong>Microservices Aggregation:</strong> Acting as a data aggregation layer (gateway) in front of multiple downstream microservices.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Conclusion</h2>
            <p>
              Neither GraphQL nor REST is universally superior; the optimal choice depends heavily on the specific requirements and context of your application and team. REST provides simplicity, broad compatibility, and leverages standard HTTP mechanisms effectively. GraphQL offers powerful flexibility, network efficiency, and frontend empowerment for complex data-fetching scenarios. Carefully evaluate your application's data patterns, client diversity, performance needs, and team expertise to make an informed decision that best supports your architectural goals. Sometimes, a hybrid approach, using both REST and GraphQL for different parts of an application, can also be a viable strategy.
            </p>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
