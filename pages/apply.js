    import { useState, useEffect } from 'react';
    import { useRouter } from 'next/router';
    import Header from '../components/Header'; // Adjust path if needed
    import Footer from '../components/Footer'; // Adjust path if needed
    import { UploadCloud, User, Mail, Phone, FileText } from 'lucide-react'; // Icons

    export default function ApplyPage() {
      const router = useRouter();
      const { jobTitle: queryJobTitle, jobId: queryJobId } = router.query; // Get job title from URL query

      // State for form fields
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [phone, setPhone] = useState('');
      const [coverLetter, setCoverLetter] = useState('');
      const [resume, setResume] = useState(null); // State for the file object
      const [resumeName, setResumeName] = useState(''); // State for displaying file name
      const [jobTitle, setJobTitle] = useState(''); // State for the job title being applied for

      // State for submission status
      const [status, setStatus] = useState(''); // '', 'loading', 'success', 'error'
      const [statusMessage, setStatusMessage] = useState('');

      // Set job title from query parameter when component mounts
      useEffect(() => {
        if (queryJobTitle) {
          setJobTitle(decodeURIComponent(queryJobTitle)); // Decode URL component
        }
      }, [queryJobTitle]);

      // Handle file input change
      const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setResume(file);
          setResumeName(file.name);
        } else {
          setResume(null);
          setResumeName('');
        }
      };

      // Handle form submission
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!resume) {
          setStatus('error');
          setStatusMessage('Please upload your resume.');
          return;
        }

        setStatus('loading');
        setStatusMessage('Submitting application...');

        // Use FormData to send multipart data (including file)
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('coverLetter', coverLetter);
        formData.append('resume', resume); // Append the file object
        formData.append('jobTitle', jobTitle || 'General Application'); // Send job title
        formData.append('jobId', queryJobId || ''); // Send job ID if available


        try {
          const response = await fetch('/api/apply', {
            method: 'POST',
            body: formData, // Send FormData directly, browser sets Content-Type
          });

          const result = await response.json();

          if (response.ok) {
            setStatus('success');
            setStatusMessage('Application submitted successfully! We will review it and be in touch if appropriate.');
            // Clear form fields on success
            setName('');
            setEmail('');
            setPhone('');
            setCoverLetter('');
            setResume(null);
            setResumeName('');
            // Optionally redirect or clear job title
            // setJobTitle(''); // Keep job title displayed or clear it
          } else {
            setStatus('error');
            setStatusMessage(result.message || 'An error occurred. Please try again.');
          }
        } catch (error) {
          console.error('Submission error:', error);
          setStatus('error');
          setStatusMessage('An error occurred while submitting the application. Please check your connection and try again.');
        }
      };

      return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
          <Header />

          <main className="flex-grow container mx-auto px-4 sm:px-6 py-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-4">
              Apply Now
            </h1>
            {/* Display the job title if available */}
            {jobTitle && (
              <p className="text-xl text-center text-blue-700 font-medium mb-10">
                For: {jobTitle}
              </p>
            )}
            <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Please complete the form below to apply for this position. We look forward to reviewing your application.
            </p>

            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    <User className="w-4 h-4 inline-block mr-1 mb-0.5" /> Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Your Full Name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                     <Mail className="w-4 h-4 inline-block mr-1 mb-0.5" /> Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Phone Field (Optional) */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                     <Phone className="w-4 h-4 inline-block mr-1 mb-0.5" /> Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="(555) 123-4567"
                  />
                </div>

                {/* Cover Letter Field (Optional) */}
                 <div>
                   <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                     <FileText className="w-4 h-4 inline-block mr-1 mb-0.5" /> Cover Letter (Optional)
                   </label>
                   <textarea
                     id="coverLetter"
                     name="coverLetter"
                     rows={6}
                     value={coverLetter}
                     onChange={(e) => setCoverLetter(e.target.value)}
                     className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
                     placeholder="Tell us why you're a great fit for this role..."
                   />
                 </div>

                {/* Resume Upload Field */}
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">
                     <UploadCloud className="w-4 h-4 inline-block mr-1 mb-0.5" /> Upload Resume <span className="text-red-600">*</span>
                   </label>
                   <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                     <div className="space-y-1 text-center">
                       <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                         <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                       </svg>
                       <div className="flex text-sm text-gray-600">
                         <label
                           htmlFor="resume-upload"
                           className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                         >
                           <span>Upload a file</span>
                           <input id="resume-upload" name="resume" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.doc,.docx,.txt" required />
                         </label>
                         <p className="pl-1">or drag and drop</p>
                       </div>
                       <p className="text-xs text-gray-500">PDF, DOC, DOCX, TXT up to 10MB</p>
                       {resumeName && (
                         <p className="text-sm font-medium text-green-600 pt-2">Selected: {resumeName}</p>
                       )}
                     </div>
                   </div>
                 </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={`w-full py-3 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      status === 'loading'
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {status === 'loading' ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>

                {/* Status Message Display */}
                {status && (
                  <div
                    className={`mt-4 p-3 rounded-md text-sm text-center ${
                      status === 'success' ? 'bg-green-100 text-green-800' : ''
                    } ${
                      status === 'error' ? 'bg-red-100 text-red-800' : ''
                    } ${
                      status === 'loading' ? 'bg-blue-100 text-blue-800' : ''
                    }`}
                  >
                    {statusMessage}
                  </div>
                )}
              </form>
            </div>
          </main>

          <Footer />
        </div>
      );
    }
    
