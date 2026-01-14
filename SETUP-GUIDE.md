# Contact Form Integration Setup Guide

## 📋 Overview
This guide will help you set up:
1. ✅ **Google Sheets** - Auto-save form submissions
2. ✅ **WhatsApp Notifications** - Get instant alerts on 9717270865

---

## 🚀 STEP 1: Set Up CallMeBot for WhatsApp (FREE)

CallMeBot is a free service that sends WhatsApp messages via API.

### One-Time Setup:
1. **Save this contact** on your phone: `+34 644 71 99 43` (CallMeBot)
2. **Send this WhatsApp message** to that number:
   ```
   I allow callmebot to send me messages
   ```
3. **Wait for response** - You'll receive an **API Key** (looks like: `123456`)
4. **Save your API Key** - You'll need it in the next step

> ⚠️ **Important:** Use the phone number `9717270865` (with country code: `919717270865`) to send the activation message.

---

## 🚀 STEP 2: Set Up Google Apps Script

### 2.1 Create the Script
1. Go to **[Google Apps Script](https://script.google.com)**
2. Click **"New Project"**
3. Delete any existing code
4. Copy & paste the code from `google-apps-script.js`

### 2.2 Update Configuration
Find this section at the top of the code and update:

```javascript
const CONFIG = {
  SHEET_ID: '1P0zJqOlrZgwUXAuTM4ussv_o_eLmNMQcOAj9UoYMFt0',  // ✅ Already set
  SHEET_NAME: 'Form Responses',
  
  WHATSAPP: {
    enabled: true,
    phone: '919717270865',  // ✅ Already set (your number)
    apiKey: 'YOUR_CALLMEBOT_API_KEY'  // ⚠️ Replace with your key from Step 1
  },
  
  EMAIL: {
    enabled: true,
    recipient: 'your-email@example.com'  // ⚠️ Replace with your email
  }
};
```

### 2.3 Deploy as Web App
1. Click **"Deploy"** → **"New deployment"**
2. Click the ⚙️ gear icon → Select **"Web app"**
3. Configure:
   - **Description:** `Contact Form Handler`
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`
4. Click **"Deploy"**
5. **Authorize** when prompted (click through warnings - it's your own script)
6. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/xxxxx/exec`)

---

## 🚀 STEP 3: Update Your Website

### 3.1 Add the JavaScript
Add the `form-handler.js` code to your website, then update the configuration:

```javascript
const FORM_CONFIG = {
  GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',  // Paste your URL
  DEBUG: true
};
```

### 3.2 Include in Your HTML
Add this before the closing `</body>` tag:

```html
<script src="path/to/form-handler.js"></script>
```

Or add the JavaScript directly in a `<script>` tag.

---

## 🧪 STEP 4: Test Everything

### Test 1: Google Apps Script
1. In Google Apps Script, run the `testSubmission` function
2. Check your Google Sheet - a test row should appear
3. Check your WhatsApp - you should receive a message

### Test 2: Full Form
1. Open your website
2. Fill out the contact form
3. Submit
4. Verify:
   - ✅ Form shows success message
   - ✅ Data appears in Google Sheet
   - ✅ WhatsApp notification received

---

## 📊 Google Sheet Structure

Your sheet will have these columns:
| Column | Description |
|--------|-------------|
| Timestamp | When form was submitted |
| First Name | Customer's first name |
| Last Name | Customer's last name |
| Email | Customer's email |
| Phone | Customer's phone number |
| Company | Company name |
| Company Size | Number of employees |
| Service | Service interested in |
| Budget | Budget range |
| Message | Customer's message |
| Status | Lead status (starts as "New") |

---

## 🔧 Troubleshooting

### WhatsApp not working?
1. Make sure you sent the activation message to CallMeBot
2. Check the API key is correct
3. Phone number format: `919717270865` (no + or spaces)

### Form not submitting?
1. Check browser console for errors (F12 → Console)
2. Verify the Google Script URL is correct
3. Make sure the script is deployed as "Anyone"

### Data not appearing in sheet?
1. Check the Sheet ID is correct
2. Make sure you authorized the script
3. Run `testSubmission` in Apps Script to verify

---

## 🎯 Quick Reference

| Item | Value |
|------|-------|
| Your WhatsApp | 9717270865 |
| Google Sheet | [Link](https://docs.google.com/spreadsheets/d/1P0zJqOlrZgwUXAuTM4ussv_o_eLmNMQcOAj9UoYMFt0) |
| CallMeBot Number | +34 644 71 99 43 |
| Sheet ID | 1P0zJqOlrZgwUXAuTM4ussv_o_eLmNMQcOAj9UoYMFt0 |

---

## 📱 Sample WhatsApp Notification

When someone submits the form, you'll receive:

```
🔔 *New Contact Form Submission*

👤 *Name:* John Doe
📧 *Email:* john@company.com
📱 *Phone:* +91 98765 43210
🏢 *Company:* ABC Technologies
👥 *Size:* 11-50 employees
🎯 *Service:* Cloud Solutions
💰 *Budget:* ₹50,000 - ₹1,00,000/month

📝 *Message:*
We're looking for cloud migration services for our company...

⏰ 14/01/2026, 10:30:45 AM
```

---

## ✅ Checklist

- [ ] Saved CallMeBot contact
- [ ] Sent activation message
- [ ] Received API Key
- [ ] Created Google Apps Script
- [ ] Updated CONFIG with API Key
- [ ] Deployed as Web App
- [ ] Copied Web App URL
- [ ] Updated form-handler.js with URL
- [ ] Added JavaScript to website
- [ ] Tested form submission
- [ ] Verified Sheet entry
- [ ] Received WhatsApp notification

---

Need help? Let me know which step you're stuck on!
