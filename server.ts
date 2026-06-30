import express from "express";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON bodies
  app.use(express.json());

  // API Route: Log Booking and Return Success (Redirection is handled on frontend)
  app.post("/api/booking", async (req, res) => {
    const { name, businessName, email, phoneNumber, preferredDate, preferredTime, projectDetails } = req.body;

    // Basic Validation
    if (!name || !businessName || !phoneNumber || !preferredDate || !preferredTime || !projectDetails) {
      return res.status(400).json({ error: "Missing required booking details" });
    }

    try {
      console.log(`
=========================================
[NEW BOOKING RECEIVED]
Client Name:    ${name}
Business:       ${businessName}
Client Email:   ${email || "Not provided"}
Phone Number:   ${phoneNumber}
Preferred Date: ${preferredDate}
Preferred Time: ${preferredTime}
Project Goals:  ${projectDetails}
=========================================
      `);

      return res.json({
        success: true,
        message: "Booking details received. Redirecting to WhatsApp..."
      });
    } catch (error: any) {
      console.error("❌ Error processing booking request:", error);
      return res.status(500).json({
        error: "Failed to process booking request",
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
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
