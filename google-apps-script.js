// ============================================
// GOOGLE APPS SCRIPT - Contact Form Handler
// ============================================
// 
// SETUP STEPS:
// 1. Go to https://script.google.com
// 2. Create new project, paste this code
// 3. Update CONFIG below with your details
// 4. Click Deploy → New deployment → Web app
// 5. Execute as: Me | Access: Anyone
// 6. Copy the Web App URL for your website
// ============================================

// ========== CONFIGURATION - UPDATE THESE! ==========
const CONFIG = {
  // Your Google Sheet ID (already set to your sheet)
  SHEET_ID: '1P0zJqOlrZgwUXAuTM4ussv_o_eLmNMQcOAj9UoYMFt0',
  
  // Sheet tab name
  SHEET_NAME: 'Form Responses',
  
  // WhatsApp via CallMeBot (FREE)
  // To get API key: Save +34 644 71 99 43 → Send "I allow callmebot to send me messages"
  WHATSAPP: {
    enabled: true,
    phone: '919717270865',  // Your number with country code (no + sign)
    apiKey: 'YOUR_CALLMEBOT_API_KEY'  // ⚠️ REPLACE THIS after getting from CallMeBot
  },
  
  // Email backup notification
  EMAIL: {
    enabled: true,
    recipient: 'YOUR_EMAIL@example.com'  // ⚠️ REPLACE with your email
  }
};

// ========== MAIN HANDLER (Don't modify) ==========
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const result = saveToSheet(data);
    
    if (CONFIG.WHATSAPP.enabled && CONFIG.WHATSAPP.apiKey !== 'YOUR_CALLMEBOT_API_KEY') {
      sendWhatsAppNotification(data);
    }
    
    if (CONFIG.EMAIL.enabled && CONFIG.EMAIL.recipient !== 'YOUR_EMAIL@example.com') {
      sendEmailNotification(data);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, row: result.row }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'active', message: 'Form handler is running!' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ========== SAVE TO GOOGLE SHEET ==========
function saveToSheet(data) {
  const spreadsheet = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  let sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(CONFIG.SHEET_NAME);
    const headers = ['Timestamp', 'First Name', 'Last Name', 'Email', 'Phone', 
                     'Company', 'Company Size', 'Service', 'Budget', 'Message', 'Status'];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  
  const rowData = [
    new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    data.firstName || '',
    data.lastName || '',
    data.email || '',
    data.phone || '',
    data.company || '',
    data.employees || '',
    data.service || '',
    data.budget || '',
    data.message || '',
    'New'
  ];
  
  sheet.appendRow(rowData);
  return { row: sheet.getLastRow() };
}

// ========== WHATSAPP NOTIFICATION ==========
function sendWhatsAppNotification(data) {
  const message = `🔔 *New Contact Form*

👤 *Name:* ${data.firstName} ${data.lastName}
📧 *Email:* ${data.email}
📱 *Phone:* ${data.phone}
🏢 *Company:* ${data.company || 'N/A'}
👥 *Size:* ${data.employees || 'N/A'}
🎯 *Service:* ${data.service}
💰 *Budget:* ${data.budget || 'N/A'}

📝 *Message:*
${data.message}

⏰ ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

  const url = `https://api.callmebot.com/whatsapp.php?phone=${CONFIG.WHATSAPP.phone}&text=${encodeURIComponent(message)}&apikey=${CONFIG.WHATSAPP.apiKey}`;
  
  try {
    UrlFetchApp.fetch(url, { method: 'GET', muteHttpExceptions: true });
    Logger.log('WhatsApp sent successfully');
  } catch (error) {
    Logger.log('WhatsApp error: ' + error.toString());
  }
}

// ========== EMAIL NOTIFICATION ==========
function sendEmailNotification(data) {
  const subject = `🔔 New Contact: ${data.firstName} ${data.lastName} - ${data.service}`;
  
  const body = `New Contact Form Submission
============================

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Company: ${data.company || 'Not specified'}
Company Size: ${data.employees || 'Not specified'}
Service: ${data.service}
Budget: ${data.budget || 'Not specified'}

Message:
${data.message}

---
Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

  try {
    MailApp.sendEmail({ to: CONFIG.EMAIL.recipient, subject: subject, body: body });
    Logger.log('Email sent successfully');
  } catch (error) {
    Logger.log('Email error: ' + error.toString());
  }
}

// ========== TEST FUNCTION - Run this to verify setup ==========
function testSubmission() {
  const testData = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phone: '+91 98765 43210',
    company: 'Test Company',
    employees: '11-50',
    service: 'cloud',
    budget: '50k-1l',
    message: 'This is a test submission from Google Apps Script'
  };
  
  saveToSheet(testData);
  Logger.log('✅ Test data saved to sheet!');
  
  if (CONFIG.WHATSAPP.apiKey !== 'YOUR_CALLMEBOT_API_KEY') {
    sendWhatsAppNotification(testData);
  } else {
    Logger.log('⚠️ WhatsApp not configured - update apiKey in CONFIG');
  }
  
  if (CONFIG.EMAIL.recipient !== 'YOUR_EMAIL@example.com') {
    sendEmailNotification(testData);
  } else {
    Logger.log('⚠️ Email not configured - update recipient in CONFIG');
  }
}
