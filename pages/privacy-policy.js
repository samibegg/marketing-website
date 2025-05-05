// pages/privacy-policy.js
import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header'; // Adjust path if needed
import Footer from '@/components/Footer'; // Adjust path if needed

const PrivacyPolicyPage = () => {
  const companyName = "ForgeMission"; // Replace with your actual company name
  const websiteUrl = "https://forgemission.com"; // Replace with your website URL
  const contactEmail = "privacy@forgemission.com"; // Replace with your contact email
  const lastUpdated = "May 5, 2025"; // Replace with the date of last update

  return (
    <>
      <Head>
        <title>Privacy Policy - {companyName}</title>
        <meta name="description" content={`Privacy Policy for ${companyName}`} />
        <meta name="robots" content="noindex" /> {/* Usually good to noindex privacy pages */}
      </Head>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header /> {/* Ensure Header supports dark mode if applicable */}

        <main className="flex-grow container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 lg:p-10 rounded-lg shadow-md">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Last Updated: {lastUpdated}
            </p>

            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                1. Introduction
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Welcome to {companyName}. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, please contact us at {contactEmail}.
              </p>
              <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                This privacy notice describes how we might use your information if you visit our website at {websiteUrl}, or otherwise engage with us (the "Services").
              </p>
              <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                Please read this privacy notice carefully, as it will help you understand what we do with the information that we collect.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                2. Information We Collect
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and services, when you participate in activities on the Services, or otherwise when you contact us.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed ml-4 mb-2">
                <li>Names</li>
                <li>Email addresses</li>
                <li>Usernames</li>
                <li>Passwords (stored securely hashed)</li>
                <li>Contact preferences</li>
                <li>Billing information (processed by our payment processor, e.g., Stripe)</li>
                {/* Add other specific types of data you collect */}
              </ul>
               <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We also automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.
              </p>
            </section>

            {/* How We Use Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                3. How We Use Your Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                We use personal information collected via our Services for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed ml-4">
                 <li>To facilitate account creation and logon process.</li>
                 <li>To manage user accounts.</li>
                 <li>To send administrative information to you.</li>
                 <li>To fulfill and manage your orders/subscriptions.</li>
                 <li>To respond to user inquiries/offer support to users.</li>
                 <li>To send you marketing and promotional communications (if you opt-in).</li>
                 <li>For other business purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns, and to evaluate and improve our Services, products, marketing, and your experience.</li>
                 {/* Add/remove purposes specific to your use */}
              </ul>
            </section>

            {/* Sharing Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                4. Will Your Information Be Shared With Anyone?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:
              </p>
               <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed ml-4">
                    <li>**Consent:** We may process your data if you have given us specific consent to use your personal information for a specific purpose.</li>
                    <li>**Legitimate Interests:** We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
                    <li>**Performance of a Contract:** Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
                    <li>**Legal Obligations:** We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
                    <li>**Vital Interests:** We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.</li>
                    {/* Add specific third parties like payment processors (Stripe), analytics providers, email services, cloud hosting (Vercel/AWS etc.) */}
                     <li>**Service Providers:** We may share your data with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work. Examples include: payment processing, data analysis, email delivery, hosting services, customer service, and marketing efforts.</li>
              </ul>
            </section>

            {/* Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                5. Do We Use Cookies and Other Tracking Technologies?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice [Link to Cookie Notice/Policy if you have a separate one, otherwise detail here]. We use essential cookies for site functionality and session management (e.g., `next-auth.session-token`). We may use analytics cookies (e.g., Google Analytics) if you consent.
              </p>
              {/* Add more detail based on your actual cookie usage */}
            </section>

            {/* Data Retention */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                6. How Long Do We Keep Your Information?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us [Adjust based on your actual retention period, e.g., + X years after account closure for legal reasons].
              </p>
            </section>

             {/* Data Security */}
             <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                7. How Do We Keep Your Information Safe?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information.
              </p>
            </section>

            {/* Your Privacy Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                8. What Are Your Privacy Rights?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                In some regions (like the EEA, UK, and California), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability. In certain circumstances, you may also have the right to object to the processing of your personal information. To make such a request, please use the contact details provided below.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you would like to review or change the information in your account or terminate your account, you can log in to your account settings and update your user account [Or describe other methods]. Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases.
              </p>
               {/* Add details specific to GDPR, CCPA etc. if applicable */}
            </section>

            {/* Updates to Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                9. Do We Make Updates to This Notice?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may update this privacy notice from time to time. The updated version will be indicated by an updated "Last Updated" date and the updated version will be effective as soon as it is accessible. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.
              </p>
            </section>

            {/* Contact Us */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                10. How Can You Contact Us About This Notice?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you have questions or comments about this notice, you may email us at {contactEmail} or by post to:
              </p>
              <address className="mt-2 not-italic text-gray-700 dark:text-gray-300 leading-relaxed">
                {companyName} <br />
                Ashburn, VA 20147 <br />
                USA
              </address>
            </section>
          </div>
        </main>

        <Footer /> {/* Ensure Footer supports dark mode if applicable */}
      </div>
    </>
  );
};

export default PrivacyPolicyPage;

