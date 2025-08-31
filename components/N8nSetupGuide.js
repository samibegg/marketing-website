import React, { useState, useRef } from 'react';

// --- SVG Icon Components ---
const CopyIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
  </svg>
);

const CheckIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 6 9 17l-5-5"></path>
  </svg>
);

const ExternalLinkIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
);


// --- Reusable CodeBlock Component ---
const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-800 text-white rounded-lg my-4 relative">
      <pre className="p-4 overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-xs flex items-center"
      >
        {copied ? (
          <>
            <CheckIcon className="h-4 w-4 mr-1 text-green-400" /> Copied!
          </>
        ) : (
          <>
            <CopyIcon className="h-4 w-4 mr-1" /> Copy
          </>
        )}
      </button>
    </div>
  );
};

// --- Main Guide Component ---
export default function N8nSetupGuide() {
  const [currentStep, setCurrentStep] = useState(0);
  const [domain, setDomain] = useState('');
  const [email, setEmail] = useState('');
  const [n8nPath, setN8nPath] = useState('/usr/bin/n8n'); // A common default

  const topOfPageRef = useRef(null);
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      topOfPageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      topOfPageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const steps = [
    // --- Prerequisite 1: DNS ---
    {
      title: 'Prerequisite 1: Configure Your DNS',
      content: (
        <>
          <p className="text-red-500 font-bold bg-red-100 p-3 rounded-lg">
            IMPORTANT: This is the most critical step. The installation will fail later if your domain does not point to your server's public IP address.
          </p>
          <ol className="list-decimal list-inside space-y-2 mt-4">
            <li>Find the <strong>External IP address</strong> of your Google Compute instance.</li>
            <li>Go to your DNS provider's control panel (e.g., Google Domains, Cloudflare, GoDaddy).</li>
            <li>Create an <strong>`A` record</strong> for the domain you will use.</li>
            <li>Point this `A` record to the <strong>External IP address</strong> of your server.</li>
          </ol>
          <a href="https://whatsmydns.net/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center text-blue-500 hover:underline">
            Check DNS propagation here <ExternalLinkIcon className="h-4 w-4 ml-1" />
          </a>
        </>
      ),
    },
    // --- Prerequisite 2: GCP Firewall ---
    {
        title: 'Prerequisite 2: Configure Google Cloud Firewall',
        content: (
            <>
                <p className="text-amber-600 font-bold bg-amber-100 p-3 rounded-lg">
                    CRITICAL: You must allow HTTP and HTTPS traffic to your instance through the Google Cloud firewall.
                </p>
                <ol className="list-decimal list-inside space-y-2 mt-4">
                    <li>Go to the <a href="https://console.cloud.google.com/vpc/firewalls" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">VPC network -&gt; Firewall</a> page in the Google Cloud Console.</li>
                    <li>Click <strong>CREATE FIREWALL RULE</strong>.</li>
                    <li><strong>Name:</strong> Give it a memorable name, like <code>allow-http-https</code>.</li>
                    <li><strong>Targets:</strong> Apply it using a <strong>network tag</strong> (e.g., <code>webserver</code>) and ensure your VM has this tag.</li>
                    <li><strong>Source IPv4 ranges:</strong> Enter <code>0.0.0.0/0</code>.</li>
                    <li><strong>Protocols and ports:</strong> Check <code>tcp</code> and enter ports <code>80, 443</code>.</li>
                    <li>Click <strong>Create</strong>.</li>
                </ol>
            </>
        )
    },
    // --- Prerequisite 3: Set Domain and Email ---
    {
      title: 'Prerequisite 3: Set Your Domain and Email',
      content: (
        <>
          <p>Enter your domain and email below. They will be used to automatically generate the commands in the following steps.</p>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="domain" className="block text-sm font-medium text-gray-700">Your Domain</label>
              <input
                type="text"
                id="domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="n8n.example.com"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email (for SSL Certificate)</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600">Once you've entered your details, the following command block will be ready to copy. This sets shell variables in your terminal for the current session.</p>
          <CodeBlock code={`DOMAIN="${domain || 'your_domain.com'}"\nEMAIL="${email || 'you@example.com'}"\n\n# Sanity check:\necho "My domain is: $DOMAIN"\necho "My email is: $EMAIL"`} />
        </>
      ),
      isNextDisabled: !domain || !email,
    },
    // --- Step 1: System Update ---
    {
        title: 'Step 1: Update System and Install Prerequisites',
        content: (
            <>
                <p>Run the following command to update your server's package lists and install some essential tools.</p>
                <CodeBlock code={`sudo apt-get update && sudo apt-get upgrade -y\nsudo apt-get install -y curl wget gnupg`} />
            </>
        )
    },
    // --- Step 2: Install Node.js ---
    {
        title: 'Step 2: Install Node.js v20',
        content: (
            <>
                <p>These commands will add the official NodeSource repository and install the recommended Node.js version for n8n.</p>
                <CodeBlock code={`curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -\nsudo apt-get install -y nodejs`} />
            </>
        )
    },
    // --- Step 3: Install n8n and pm2 ---
    {
        title: 'Step 3: Install n8n and pm2',
        content: (
            <>
                <p>Next, install n8n and the process manager `pm2` globally using `npm`.</p>
                <CodeBlock code={`sudo npm install n8n -g\nsudo npm install pm2 -g`} />
            </>
        )
    },
    // --- Step 4: Create pm2 Config ---
    {
        title: 'Step 4: Create pm2 Config and Start n8n',
        content: (
            <>
                <p>Using a `pm2` ecosystem file is the best way to manage n8n's environment variables, like the `WEBHOOK_URL`.</p>
                <h3 className="font-bold mt-4">4.1. Find the n8n executable path:</h3>
                <p>Run this command and copy the output path (e.g., <code>/usr/bin/n8n</code>).</p>
                <CodeBlock code={`which n8n`} />
                
                <h3 className="font-bold mt-4">4.2. Update the path here:</h3>
                 <input
                    type="text"
                    value={n8nPath}
                    onChange={(e) => setN8nPath(e.target.value)}
                    placeholder="/usr/bin/n8n"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />

                <h3 className="font-bold mt-4">4.3. Create the ecosystem configuration file:</h3>
                <p>This command creates a file named <code>ecosystem.config.js</code> with the correct webhook URL.</p>
                <CodeBlock code={`nano ecosystem.config.js`} />
                <p>Paste the following content into the nano editor:</p>
                <CodeBlock code={
`module.exports = {
  apps: [
    {
      name: 'n8n',
      script: '${n8nPath}',
      env: {
        WEBHOOK_URL: 'https://${domain}',
      },
    },
  ],
};`
                } />

                <h3 className="font-bold mt-4">4.4. Start n8n and configure for auto-startup:</h3>
                <CodeBlock code={
`# Start n8n using the ecosystem file
pm2 start ecosystem.config.js

# Save the process list
pm2 save

# Generate and configure the startup script
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp /home/$USER`
                } />
            </>
        )
    },
    // --- Step 5: Install Nginx ---
    {
        title: 'Step 5: Install Nginx Web Server',
        content: (
            <>
                <p>Install the Nginx web server, which will act as our reverse proxy.</p>
                <CodeBlock code={`sudo apt-get install -y nginx`} />
            </>
        )
    },
    // --- Step 6: Configure Nginx ---
    {
        title: 'Step 6: Configure Nginx for Your Domain',
        content: (
            <>
                <p>This command creates the Nginx configuration file, including settings for WebSocket support to prevent connection errors in the n8n UI. Your domain is automatically included.</p>
                <CodeBlock code={
`sudo tee /etc/nginx/sites-available/n8n > /dev/null <<EOF
server {
    listen 80;
    server_name ${domain};

    location / {
        proxy_pass http://localhost:5678;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \\$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \\$host;
        proxy_set_header X-Real-IP \\$remote_addr;
        proxy_set_header X-Forwarded-For \\$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \\$scheme;
        proxy_buffering off;
    }
}
EOF`
                } />
            </>
        )
    },
    // --- Step 7: Enable Nginx Site ---
    {
        title: 'Step 7: Enable the Nginx Site and Restart',
        content: (
            <>
                <p>Enable the new site configuration by creating a symbolic link, test the configuration for errors, and then restart Nginx.</p>
                <CodeBlock code={
`sudo ln -s -f /etc/nginx/sites-available/n8n /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx`
                } />
            </>
        )
    },
    // --- Step 8: Configure Firewall ---
    {
        title: 'Step 8: Configure Local Firewall (UFW)',
        content: (
            <>
                <p>Configure the Uncomplicated Firewall (UFW) on the server to only allow SSH and Nginx traffic.</p>
                <CodeBlock code={
`sudo apt-get install -y ufw
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
yes | sudo ufw enable`
                } />
            </>
        )
    },
     // --- Step 9: Install Certbot ---
    {
        title: 'Step 9: Install Certbot and Obtain SSL Certificate',
        content: (
            <>
                <p>Finally, install Certbot and run it to automatically obtain and install a free Let's Encrypt SSL certificate. Your domain and email are used automatically.</p>
                <CodeBlock code={
`sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d ${domain} --agree-tos --email ${email} --redirect --non-interactive`
                } />
            </>
        )
    },
    // --- Final Step: Complete ---
    {
        title: '✅ Installation Complete!',
        content: (
            <div className="text-center p-8 bg-green-50 rounded-lg">
                <h2 className="text-2xl font-bold text-green-700">Congratulations!</h2>
                <p className="mt-2">Your n8n instance is now installed, running, and accessible securely at:</p>
                <a href={`https://${domain}`} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block font-bold text-lg text-indigo-600 hover:underline">
                    https://{domain}
                </a>
                <p className="mt-4 text-sm text-gray-600">Certbot will automatically handle SSL certificate renewals for you.</p>
            </div>
        )
    }
  ];

  const currentStepData = steps[currentStep];

  return (
    <div ref={topOfPageRef} className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200">
             <h1 className="text-3xl font-bold text-gray-800">n8n Installation Guide for Debian 12</h1>
             <p className="text-gray-600 mt-1">An interactive guide to setting up n8n with Nginx and HTTPS.</p>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-700">{currentStepData.title}</h2>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    Step {currentStep + 1} of {steps.length}
                </span>
            </div>

            <div className="prose prose-indigo max-w-none text-gray-700">
                {currentStepData.content}
            </div>
          </div>
          
          <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {currentStep < steps.length - 1 ? (
                <button
                onClick={handleNext}
                disabled={currentStepData.isNextDisabled}
                className="px-6 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed"
                >
                Next
                </button>
            ) : (
                <a href={`https://${domain}`} target="_blank" rel="noopener noreferrer" 
                   className="px-6 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700">
                    Visit Your n8n Instance
                </a>
            )}
          </div>
        </div>
        <footer className="text-center mt-6 text-sm text-gray-500">
            <p>A guided installation experience.</p>
        </footer>
      </div>
    </div>
  );
}

