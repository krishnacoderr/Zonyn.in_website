import express from "express";
import path from "path";
import { Resend } from "resend";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON bodies
  app.use(express.json());

  // API Route: Send Booking Email
  app.post("/api/booking", async (req, res) => {
    const { name, businessName, email, phoneNumber, preferredDate, preferredTime, projectDetails } = req.body;

    // Basic Validation
    if (!name || !businessName || !phoneNumber || !preferredDate || !preferredTime || !projectDetails) {
      return res.status(400).json({ error: "Missing required booking details" });
    }

    try {
      const apiKey = process.env.RESEND_API_KEY;
      const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
      const receiverEmail = process.env.NOTIFICATION_RECEIVER_EMAIL;

      // Handle missing email configuration gracefully
      if (!apiKey || !receiverEmail) {
        console.warn("⚠️ Resend credentials are not configured. Logging the booking details instead:");
        console.log(`
=========================================
[MOCK EMAIL NOTIFICATION - RESEND NOT CONFIGURED]
To: ${receiverEmail || "Not Specified (Configure NOTIFICATION_RECEIVER_EMAIL)"}
From: ${fromEmail}
Subject: New Consultation Request: ${businessName} (by ${name})
-----------------------------------------
Client Name:    ${name}
Business:       ${businessName}
Client Email:   ${email || "Not provided"}
Phone Number:   ${phoneNumber}
Preferred Date: ${preferredDate}
Preferred Time: ${preferredTime}
Project Goals:  ${projectDetails}
=========================================
        `);

        // Return success to the client so the UI works gracefully during testing
        return res.json({
          success: true,
          message: "Booking received (Resend not configured. Details logged to server console. To receive live emails, configure RESEND_API_KEY and NOTIFICATION_RECEIVER_EMAIL in Settings -> Secrets)",
          simulated: true
        });
      }

      // Lazy instantiation of Resend client
      const resend = new Resend(apiKey);

      // Send email using Resend
      const { data, error } = await resend.emails.send({
        from: `Booking Engine <${fromEmail}>`,
        to: receiverEmail,
        replyTo: email || undefined,
        subject: `📈 New Consultation Request: ${businessName}`,
        text: `
New Consultation Request Received!

Client Details:
- Name: ${name}
- Business Name: ${businessName}
- Email: ${email || "Not provided"}
- Phone Number: ${phoneNumber}

Preferred Consultation Slot:
- Date: ${preferredDate}
- Time: ${preferredTime}

Project Goals & Details:
${projectDetails}

---
Sent from your Premium Website consultation booking engine.
        `,
        html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #E5E5E5; border-radius: 16px; background-color: #FFFFFF;">
  <div style="text-align: center; border-bottom: 1px solid #F1F1F1; padding-bottom: 20px; margin-bottom: 24px;">
    <span style="font-size: 24px; font-weight: bold; color: #171717;">Consultation Request</span>
    <p style="font-size: 14px; color: #737373; margin: 4px 0 0 0;">A new client has requested a free consultation</p>
  </div>
  
  <div style="margin-bottom: 24px;">
    <h3 style="font-size: 16px; font-weight: 600; color: #171717; margin: 0 0 12px 0;">Client Information</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; font-size: 14px; color: #737373; width: 120px;">Name:</td>
        <td style="padding: 8px 0; font-size: 14px; font-weight: 500; color: #171717;">${name}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-size: 14px; color: #737373;">Business:</td>
        <td style="padding: 8px 0; font-size: 14px; font-weight: 500; color: #171717;">${businessName}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-size: 14px; color: #737373;">Email:</td>
        <td style="padding: 8px 0; font-size: 14px; font-weight: 500; color: #171717;">${email ? `<a href="mailto:${email}" style="color: #EA580C; text-decoration: none;">${email}</a>` : "Not provided"}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-size: 14px; color: #737373;">Phone:</td>
        <td style="padding: 8px 0; font-size: 14px; font-weight: 500; color: #171717;">${phoneNumber}</td>
      </tr>
    </table>
  </div>

  <div style="margin-bottom: 24px; padding: 16px; background-color: #F8F7F3; border-radius: 12px; border: 1px solid #E5E5E5;">
    <h3 style="font-size: 14px; font-weight: 600; color: #171717; margin: 0 0 8px 0;">
      📅 Proposed Slot
    </h3>
    <p style="font-size: 14px; color: #171717; margin: 4px 0;"><strong>Date:</strong> ${preferredDate}</p>
    <p style="font-size: 14px; color: #171717; margin: 4px 0;"><strong>Time:</strong> ${preferredTime}</p>
  </div>

  <div style="margin-bottom: 24px;">
    <h3 style="font-size: 16px; font-weight: 600; color: #171717; margin: 0 0 12px 0;">Project Details & Goals</h3>
    <div style="font-size: 14px; line-height: 1.6; color: #404040; background-color: #FAFAFA; padding: 16px; border-radius: 12px; border: 1px solid #E5E5E5; white-space: pre-wrap;">${projectDetails}</div>
  </div>

  <div style="border-top: 1px solid #F1F1F1; padding-top: 20px; font-size: 12px; color: #A3A3A3; text-align: center;">
    This request was securely routed from your website booking engine via Resend.
  </div>
</div>
        `,
      });

      if (error) {
        throw new Error(error.message);
      }

      console.log(`📧 Notification email sent successfully via Resend. ID: ${data?.id}`);

      return res.json({
        success: true,
        message: "Booking submitted successfully and email notification sent via Resend!"
      });
    } catch (error: any) {
      console.error("❌ Error sending booking notification email:", error);
      return res.status(500).json({
        error: "Failed to send email notification",
        details: error?.message || String(error)
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
