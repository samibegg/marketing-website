    // pages/api/apply.js
    import nodemailer from 'nodemailer';
    import formidable from 'formidable'; // Use formidable for parsing multipart/form-data
    import fs from 'fs'; // Needed to read the file content for attachment

    // Disable Next.js body parsing for this route to handle multipart/form-data
    export const config = {
      api: {
        bodyParser: false,
      },
    };

    // Helper function to parse the form data using formidable v3+ syntax
    const parseForm = (req) => {
      return new Promise((resolve, reject) => {
        const form = formidable({
            multiples: false, // Allow only single file upload for resume
            keepExtensions: true, // Keep file extensions
            // Optional: Set upload directory and max file size
            // uploadDir: '/tmp', // Example temporary directory (ensure it exists and is writable)
            // maxFileSize: 10 * 1024 * 1024, // 10MB limit example
         });

        form.parse(req, (err, fields, files) => {
          if (err) {
            console.error('Form parsing error:', err);
            return reject(err);
          }

          // Normalize fields to ensure they are single strings
          const singleFields = {};
          for (const key in fields) {
            singleFields[key] = Array.isArray(fields[key]) ? fields[key][0] : fields[key];
          }

          // Normalize files object
          const singleFiles = {};
           for (const key in files) {
             singleFiles[key] = Array.isArray(files[key]) ? files[key][0] : files[key];
           }

          resolve({ fields: singleFields, files: singleFiles });
        });
      });
    };


    export default async function handler(req, res) {
      if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
      }

      let resumeFilePath = null; // To track file path for potential cleanup

      try {
        const { fields, files } = await parseForm(req);
        const { name, email, phone, coverLetter, jobTitle, jobId } = fields; // Extract text fields
        const resumeFile = files.resume; // Get the uploaded file object

        // --- Validation ---
        if (!name || !email || !resumeFile) {
          return res.status(400).json({ message: 'Name, Email, and Resume are required.' });
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
          return res.status(400).json({ message: 'Invalid email format.' });
        }
        // Check if file path exists (formidable provides filepath)
        if (!resumeFile.filepath) {
             console.error('Resume file path is missing:', resumeFile);
             return res.status(400).json({ message: 'Resume file upload failed or is missing.' });
        }
        resumeFilePath = resumeFile.filepath; // Store path for cleanup

        // Optional: Add validation for file type and size here if needed
        // console.log('Resume File Details:', resumeFile); // Debugging


        // --- Nodemailer Configuration ---
        // Ensure these are set in your .env.local file
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SERVER_HOST,
            port: parseInt(process.env.EMAIL_SERVER_PORT || '465', 10),
            secure: parseInt(process.env.EMAIL_SERVER_PORT || '465', 10) === 465, // true for 465, false for 587
            auth: {
              user: process.env.EMAIL_SERVER_USER,
              pass: process.env.EMAIL_SERVER_PASSWORD, // Use App Password for Gmail 2FA
            },
          });

        // --- Read File for Attachment ---
        const resumeContent = fs.readFileSync(resumeFilePath);


        // --- Email Content ---
        const mailOptions = {
          from: `"${name} (Job Application)" <${process.env.EMAIL_SERVER_USER}>`, // Indicate source in sender name
          replyTo: email, // Set reply-to to the applicant's email
          to: process.env.EMAIL_TO_ADDRESS, // Your receiving email address from .env.local
          subject: `Job Application: ${jobTitle || 'General Application'} - ${name}`, // Clear subject
          text: `New job application received:\n\n` +
                `Job Title: ${jobTitle || 'N/A'} (ID: ${jobId || 'N/A'})\n` +
                `Applicant Name: ${name}\n` +
                `Applicant Email: ${email}\n` +
                `Applicant Phone: ${phone || 'N/A'}\n\n` +
                `Cover Letter:\n${coverLetter || 'N/A'}\n\n` +
                `Resume is attached.`,
          html: `<p>New job application received:</p>` +
                `<h2>Applicant Details:</h2>` +
                `<ul>` +
                `  <li><strong>Job Title:</strong> ${jobTitle || 'N/A'} (ID: ${jobId || 'N/A'})</li>` +
                `  <li><strong>Name:</strong> ${name}</li>` +
                `  <li><strong>Email:</strong> ${email}</li>` +
                `  <li><strong>Phone:</strong> ${phone || 'N/A'}</li>` +
                `</ul>` +
                `<h2>Cover Letter:</h2>` +
                `<div>${coverLetter ? coverLetter.replace(/\n/g, '<br>') : 'N/A'}</div>` + // Use div for better structure
                `<p><strong>Resume is attached.</strong></p>`,
          attachments: [
            {
              filename: resumeFile.originalFilename || 'resume.pdf', // Use original filename or a default
              content: resumeContent, // The file buffer
              contentType: resumeFile.mimetype || 'application/octet-stream', // Use detected mime type
            },
          ],
        };

        // --- Send Email ---
        await transporter.sendMail(mailOptions);
        console.log('Application email sent successfully to:', process.env.EMAIL_TO_ADDRESS);
        // --- Cleanup ---
        // Delete the temporary file after successful email sending
        fs.unlink(resumeFilePath, (unlinkErr) => {
          if (unlinkErr) console.error("Error deleting temp resume file:", unlinkErr);
          else console.log("Temp resume file deleted:", resumeFilePath);
        });

        return res.status(200).json({ message: 'Application submitted successfully!' });

      } catch (error) {
        console.error('Error processing application:', error);
        // --- Cleanup on Error ---
        // Attempt to delete the temporary file if it exists and an error occurred
        if (resumeFilePath) {
          fs.unlink(resumeFilePath, (unlinkErr) => {
            if (unlinkErr) console.error("Error deleting temp resume file after error:", unlinkErr);
          });
        }
        return res.status(500).json({ message: 'Failed to submit application. Please try again later.' });
      }
    }
    
