# 🚀 OMNET Contact Form - Quick Setup

## Your Current Issue
The form shows "success" but data is not being saved because:
1. ❌ Form handler is NOT connected to Google Apps Script
2. ❌ Google Apps Script URL is a placeholder
3. ❌ CallMeBot API key not configured
4. ❌ Email not configured

---

## ✅ STEP 1: Setup CallMeBot (FREE WhatsApp)

1. **Save this number** on your phone: `+34 644 71 99 43`
2. **Send this message** via WhatsApp to that number:
   ```
   I allow callmebot to send me messages
   ```
3. **Wait** - You'll receive an **API Key** (e.g., `789123`)
4. **Save this key** for Step 2

---

## ✅ STEP 2: Deploy Google Apps Script

1. Go to **https://script.google.com**
2. Click **New Project**
3. Delete existing code
4. **Copy-paste** code from `google-apps-script.js` (attached)
5. **Update CONFIG** at the top:
   ```javascript
   WHATSAPP: {
     apiKey: 'YOUR_KEY_FROM_STEP_1'  // Replace with actual key
   },
   EMAIL: {
     recipient: 'your-email@gmail.com'  // Your email
   }
   ```
6. Click **Deploy** → **New deployment**
7. Click ⚙️ gear → Select **Web app**
8. Set:
   - Execute as: **Me**
   - Who has access: **Anyone**
9. Click **Deploy** → **Authorize** (allow all permissions)
10. **COPY the Web App URL** (looks like: `https://script.google.com/macros/s/XXXXX/exec`)

---

## ✅ STEP 3: Update contact.html

1. Open `contact.html`
2. Find this line near the bottom:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';
   ```
3. Replace with your URL from Step 2:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ACTUAL_ID/exec';
   ```
4. **Upload** the updated `contact.html` to your website

---

## ✅ STEP 4: Test It!

### Test 1: Google Apps Script
1. In Google Apps Script, click **Run** → **testSubmission**
2. Check your Google Sheet - should see test row
3. Check WhatsApp - should receive message

### Test 2: Website Form
1. Go to your contact page
2. Fill form and submit
3. Verify:
   - ✅ Success message shows
   - ✅ Row appears in Google Sheet
   - ✅ WhatsApp notification received
   - ✅ Email received

---

## 📊 Your Google Sheet
**URL:** https://docs.google.com/spreadsheets/d/1P0zJqOlrZgwUXAuTM4ussv_o_eLmNMQcOAj9UoYMFt0

---

## ❓ Troubleshooting

| Problem | Solution |
|---------|----------|
| No WhatsApp | Check API key is correct, no extra spaces |
| No Sheet entry | Verify Sheet ID, run testSubmission |
| Form error | Check browser console (F12), verify Script URL |
| "Authorization" error | Re-deploy and allow all permissions |

---

## 📋 Quick Checklist

- [ ] CallMeBot activated and API key received
- [ ] Google Apps Script created with updated CONFIG
- [ ] Script deployed as Web App
- [ ] Web App URL copied
- [ ] contact.html updated with Web App URL
- [ ] contact.html uploaded to website
- [ ] Test submission successful
