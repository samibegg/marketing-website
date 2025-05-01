import Image from 'next/image';
import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LangChainOpenAIArticle() {
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
               Building Agentic AI Workflows with LangChain and OpenAI
             </h1>
             <p className="text-lg text-gray-600">
               Agentic AI workflows, powered by LangChain and OpenAI, allow for the creation of dynamic, multi-step processes that autonomously handle complex tasks. This article will guide you through how to design and implement these workflows to solve real-world problems.
             </p>
          </div>


          {/* LangChain and OpenAI Workflow Diagram */}
          <div className="my-8">
            <Image src="/images/agentic-workflow.png" alt="Agentic AI Workflow" width={800} height={400} className="rounded-lg shadow-md mx-auto" />
          </div>

          {/* Apply prose classes for article styling */}
          {/* Ensure you have @tailwindcss/typography installed and configured */}
          <article className="prose prose-lg lg:prose-xl max-w-none text-gray-700">

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 1: Understanding Agentic AI Workflows</h2>
            <p>
              An agentic AI workflow consists of several components that work together autonomously to complete tasks. LangChain is a framework designed to help orchestrate these tasks, allowing multiple agents or processes to interact with OpenAI’s models and other external tools.
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2"> {/* Adjusted list styling */}
              <li><strong>Agents:</strong> These are the autonomous actors responsible for carrying out specific tasks. For example, an agent might gather data from a database or query an API.</li>
              <li><strong>Tools:</strong> Tools are used by agents to interact with external systems or databases, including search engines, APIs, or internal services.</li>
              <li><strong>Memory:</strong> Agents can store context from previous tasks, which allows them to maintain state and handle multi-step workflows more efficiently.</li>
            </ul>
            <p>
              LangChain helps orchestrate these workflows by managing the interactions between multiple agents and their tools, and OpenAI’s models are used to perform the core AI tasks, such as language generation and natural language understanding.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 2: Building an Agentic AI Workflow with LangChain</h2>
            <p>
              Let’s dive into how you can create an agentic AI workflow using LangChain and OpenAI. The basic structure involves defining agents, specifying their actions, and enabling them to interact with tools.
            </p>

            <h3 className="text-xl font-semibold mt-6">Step 2.1: Define Your Agent</h3>
            <p>
              To begin, you need to define an agent that performs a specific task. For example, let's say you want an agent to generate marketing copy based on user inputs.
            </p>
            {/* Keep user's preferred code block style */}
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm my-4">
{`from langchain.agents import initialize_agent
from langchain.agents import Tool
# If using newer Langchain versions, imports might change, e.g.:
# from langchain_openai import OpenAI
# from langchain.agents import AgentExecutor, create_react_agent
# from langchain_core.prompts import PromptTemplate

# Example using older initialize_agent syntax
from langchain.llms import OpenAI # Older import

# Define a placeholder function for the tool
def generate_marketing_copy(input_str):
    # In a real scenario, this would call an LLM or use a specific logic
    return f"Generated marketing copy for: {input_str}"

# Define the agent
tools = [Tool(name="Marketing Copy Generator", func=generate_marketing_copy, description="Generates marketing copy based on input")]
# Ensure OPENAI_API_KEY is set in your environment
llm = OpenAI(temperature=0)
agent = initialize_agent(
    tools,
    llm,
    agent="zero-shot-react-description", # Check agent types in Langchain docs
    verbose=True # Good for debugging
)

# Define agent behavior
input_text = "Create an engaging ad for a new e-commerce platform."
try:
    response = agent.run(input_text) # agent.run might be deprecated, use agent.invoke
    print(response)
except Exception as e:
    print(f"Error running agent: {e}")
    print("Note: agent.run() might be deprecated. Consider using agent.invoke({'input': input_text}) with newer Langchain versions.")
`}
            </pre>
            <p>
              In this example, the agent generates marketing copy based on a user input. The core of the agent’s task is driven by OpenAI’s model, and LangChain ensures the agent uses the correct tools for each step. <em>(Note: LangChain's API evolves; check their documentation for the latest recommended syntax for agent initialization and execution.)</em>
            </p>

            <h3 className="text-xl font-semibold mt-6">Step 2.2: Integrating External Tools</h3>
            <p>
              Agents in LangChain can interact with external tools to enhance their capabilities. These tools might include web scrapers, databases, or APIs. Below, we’ll show how to integrate a simple tool for fetching weather data from an API.
            </p>
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm my-4">
{`import requests
import os

# It's best practice to load API keys from environment variables
WEATHER_API_KEY = os.environ.get("WEATHER_API_KEY", "YOUR_API_KEY") # Replace YOUR_API_KEY only if not using env vars

def fetch_weather(city: str) -> str:
    """Fetches current Celsius temperature for a given city."""
    if WEATHER_API_KEY == "YOUR_API_KEY":
        return "Error: Weather API key not configured."
    api_url = f"http://api.weatherapi.com/v1/current.json?key={WEATHER_API_KEY}&q={city}"
    try:
        response = requests.get(api_url)
        response.raise_for_status() # Raise an exception for bad status codes
        data = response.json()
        temp_c = data.get("current", {}).get("temp_c")
        if temp_c is not None:
            return f"The current temperature in {city} is {temp_c}°C."
        else:
            return f"Could not retrieve temperature for {city}."
    except requests.exceptions.RequestException as e:
        return f"Error fetching weather for {city}: {e}"
    except Exception as e:
        return f"An unexpected error occurred: {e}"

# Assuming 'tools' list exists from previous step
weather_tool = Tool(
    name="Weather Fetcher",
    func=fetch_weather,
    description="Useful for fetching the current weather temperature in Celsius for a specific city."
)
# tools.append(weather_tool) # Add this tool to your agent's tool list
`}
            </pre>
            <p>
              In this code snippet, we’ve added a tool that fetches weather data based on a city. This tool can now be used by the agent to enhance the workflow, such as generating a marketing campaign based on current weather conditions.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 3: Managing State with Memory</h2>
            <p>
              For complex workflows, memory management is crucial. LangChain allows agents to maintain state across interactions. This helps agents recall past actions and make decisions based on that context. Let’s look at an example using `ConversationBufferMemory`:
            </p>
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm my-4">
{`from langchain.memory import ConversationBufferMemory
# Newer Langchain might use: from langchain.memory import ConversationBufferMemory

# Initialize memory for the agent
# This memory typically needs to be passed into the agent during initialization
# or used within a chain that includes the agent.
memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

# Example of how memory might be integrated (syntax varies based on agent type/Langchain version):
# agent_executor = initialize_agent(
#    tools,
#    llm,
#    agent="conversational-react-description", # Agent type supporting memory
#    memory=memory,
#    verbose=True
# )
# response = agent_executor.run("What was the first thing I asked you?")
# print(response)
`}
            </pre>
            <p>
              In this example, the agent keeps track of the conversation history (when configured correctly with an agent type that supports memory) and can reference previous interactions, making the workflow more efficient and context-aware.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 4: Testing and Deploying Your Agentic Workflow</h2>
            <p>
              Once your agentic AI workflow is set up, it’s important to test it thoroughly before deployment. Ensure that each agent performs its task correctly, that external tools interact seamlessly, and that memory is handled properly. LangChain’s modular architecture makes it easy to test individual components of your workflow.
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2"> {/* Adjusted list styling */}
              <li><strong>Unit Testing:</strong> Test each tool function independently to ensure it returns the expected output or handles errors correctly.</li>
              <li><strong>Integration Testing:</strong> Test the agent's ability to correctly choose and use tools based on different inputs. Verify interactions with external APIs or databases mocked during testing.</li>
              <li><strong>End-to-End Testing:</strong> Simulate real-world multi-turn conversations or complex task sequences to ensure the workflow delivers accurate, coherent, and context-aware outputs. Test edge cases and failure modes.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 5: Real-World Applications of Agentic AI Workflows</h2>
            <p>
              Agentic AI workflows powered by LangChain and OpenAI have many real-world applications across various industries:
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2"> {/* Adjusted list styling */}
              <li><strong>Customer Support Automation:</strong> Create agents that can understand user queries, search knowledge bases (using a Retrieval tool), interact with order databases (using a SQL or API tool), and escalate complex issues to human agents.</li>
              <li><strong>Automated Research & Reporting:</strong> Build agents that can browse the web (using search tools), extract key information, synthesize findings, and generate summary reports.</li>
              <li><strong>Personalized Trip Planning:</strong> Design agents that ask users for preferences, search for flights and hotels (using API tools), check weather forecasts, and create customized itineraries.</li>
              <li><strong>Code Generation & Debugging:</strong> Develop agents that can understand programming tasks, write code snippets, interact with linters or testing frameworks (as tools), and help debug errors.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Conclusion</h2>
            <p>
              Building agentic AI workflows with LangChain and OpenAI opens up new possibilities for creating autonomous, scalable systems that solve complex problems. By defining agents, integrating multiple tools, and managing conversation history with memory, you can create powerful workflows that are highly flexible and efficient. The potential applications for these intelligent, autonomous systems are vast and continue to expand.
            </p>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
