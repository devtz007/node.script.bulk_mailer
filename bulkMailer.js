const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Load and validate emails
const recipients = fs
  .readFileSync(path.join(__dirname, "emails.txt"), "utf-8")
  .split(/\r?\n/)
  .map((email) => email.trim())
  .filter((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

if (recipients.length === 0) {
  console.error("❌ No valid emails found in emails.txt");
  process.exit(1);
}

// Setup transporter for secure Gmail
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // use SSL for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Subject and plain text body
const subject = "🚀 Web Developer for WordPress, React, and PHP Projects";

const plainText = `👋 Hi there,
I’m Tazim, a passionate Full-Stack Web Developer with expertise in modern technologies. I specialize in building modern, responsive, and SEO-optimized websites that deliver real results.

🚀 What I Can Do for You:
🔹 Custom Websites – Built for your brand & goals
🔹 Mobile-First Design – Responsive & user-friendly
🔹 Speed Optimization – Lightning-fast performance
🔹 Secure Development – Clean, best-practice code
🔹 Tech Stack – WordPress, React, PHP, CMS
🔹 Bug Fixes – Fast & clean resolutions
🔹 eCommerce Setup – Online store + payments
🔹 Site Redesigns – Fresh, modern upgrades
🔹 Unlimited Revisions – Until you're satisfied

📬 Let’s Build Something Great Together in Fiverr!
🔗 View my Fiverr gig: "fiverr.com/s/gDqVep9"

To stop receiving emails, just reply with "unsubscribe".
`;

// Send single email
async function sendEmail(to) {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to,
      subject,
      text: plainText,
    });
    console.log(`✅ Sent to ${to} | Message ID: ${info.messageId}`);
  } catch (err) {
    console.error(`❌ Failed to send to ${to}:`, err.message);
  }
}

// Main runner
(async () => {
  console.log(`📨 Sending ${recipients.length} emails...\n`);

  for (let i = 0; i < recipients.length; i++) {
    const email = recipients[i];
    console.log(`[${i + 1}/${recipients.length}] Sending to: ${email}`);
    await sendEmail(email);
    await new Promise((res) => setTimeout(res, 1500)); // wait 1.5s
  }

  console.log(`\n✅ Finished sending to ${recipients.length} recipients.`);
})();
