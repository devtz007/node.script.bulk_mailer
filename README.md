# Bulk Mailer

A Node.js script for sending bulk emails efficiently using SMTP.

---

## Features

- Send bulk emails from a list of recipients
- Supports environment variables for sensitive data like SMTP credentials
- Uses `nodemailer` for reliable email delivery
- Easy to configure and extend

---

## Prerequisites

- Node.js (version 14 or above recommended)
- npm (comes with Node.js)
- An SMTP email account (e.g., Gmail, Outlook, or your own SMTP server)

---

## Installation

### Clone this repository or download the source code

```bash
git clone https://github.com/devtz007/node.script.bulk_mailer.git
cd node.script.bulk_mailer
```

### Install dependencies

```bash
npm install
```

### Create a .env file in the project root with your SMTP credentials and settings, for example:

```bash
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_email_password
FROM_EMAIL=your_email@example.com
```
