    // pages/api/contact.js
    import nodemailer from 'nodemailer';

    export default async function handler(req, res) {
      // Only allow POST requests
      if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
      }

      const { name, email, subject, message } = req.body;

      // Basic validation
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
      }

      // Validate email format (simple check)
      if (!/\S+@\S+\.\S+/.test(email)) {
         return res.status(400).json({ message: 'Invalid email format.' });
      }

      // --- Nodemailer Configuration ---
      // IMPORTANT: Use environment variables for sensitive data
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: parseInt(process.env.EMAIL_SERVER_PORT || '465', 10), // Default to 465 if not set
        secure: parseInt(process.env.EMAIL_SERVER_PORT || '465', 10) === 465, // true for 465, false for other ports like 587
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD, // Use App Password for Gmail
        },
        // Optional: Add TLS options if needed, e.g., for self-signed certs (not recommended for production)
        // tls: {
        //   rejectUnauthorized: false // Use only for testing with local servers
        // }
      });

      // --- Email Content ---
      const mailOptions = {
        from: `"${name}" <${process.env.EMAIL_SERVER_USER}>`, // Sender address (shows your configured email)
        replyTo: email, // Set reply-to to the user's email
        to: process.env.EMAIL_TO_ADDRESS, // List of receivers (comes from .env.local)
        subject: `Contact Form Submission: ${subject}`, // Subject line
        text: `You have received a new message from your website contact form.\n\n` +
              `Name: ${name}\n` +
              `Email: ${email}\n` +
              `Subject: ${subject}\n` +
              `Message:\n${message}`, // Plain text body
        html: `<p>You have received a new message from your website contact form.</p>` +
              `<h2>Details:</h2>` +
              `<ul>` +
              `  <li><strong>Name:</strong> ${name}</li>` +
              `  <li><strong>Email:</strong> ${email}</li>` +
              `  <li><strong>Subject:</strong> ${subject}</li>` +
              `</ul>` +
              `<h2>Message:</h2>` +
              `<p>${message.replace(/\n/g, '<br>')}</p>`, // HTML body
      };

      // --- Send Email ---
      try {
        // Verify transporter connection (optional, good for debugging)
        // await transporter.verify();
        // console.log('Server is ready to take our messages');

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        return res.status(200).json({ message: 'Message sent successfully!' });

      } catch (error) {
        console.error('Error sending email:', error);
        // Log the specific error for debugging on the server
        // Avoid sending detailed internal errors back to the client
        return res.status(500).json({ message: 'Failed to send message. Please try again later.' });
      }
    }
    
