import nodemailer from "nodemailer";

/**
 * Email Service Utility
 * Handles sending contact form submissions via email using Nodemailer.
 */

interface ContactEmailData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export async function sendContactEmail(data: ContactEmailData) {
  // Create transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email to yourself
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.NEXT_PUBLIC_EMAIL,
    subject: `Portfolio Contact: ${data.subject || "New Message"}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        <div style="margin: 20px 0;">
          <p><strong>From:</strong> ${data.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${
      data.email
    }</a></p>
          ${
            data.subject
              ? `<p><strong>Subject:</strong> ${data.subject}</p>`
              : ""
          }
        </div>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 0;"><strong>Message:</strong></p>
          <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${
            data.message
          }</p>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          This email was sent from your portfolio contact form.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error };
  }
}
