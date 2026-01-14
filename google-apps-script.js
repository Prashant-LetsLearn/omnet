// ============================================
// GOOGLE APPS SCRIPT - Form Handler
// ============================================
// Deploy this as a Web App in Google Apps Script
// 
// SETUP INSTRUCTIONS:
// 1. Go to: https://script.google.com
// 2. Create a new project
// 3. Paste this code
// 4. Update the SHEET_ID below
// 5. Deploy as Web App (Execute as: Me, Access: Anyone)
// 6. Copy the Web App URL and use it in your form
// ============================================

// ========== CONFIGURATION ==========
const CONFIG = {
  // Your Google Sheet ID (from the URL)
  SHEET_ID: '1P0zJqOlrZgwUXAuTM4ussv_o_eLmNMQcOAj9UoYMFt0',
  
  // Sheet name (tab name)
  SHEET_NAME: 'Form Responses',
  
  // WhatsApp Configuration (CallMeBot - FREE!)
  WHATSAPP: {
    enabled: true,
    phone: '919717270865',  // Country code + number (no + sign)
    apiKey: 'YOUR_CALLMEBOT_API_KEY'  // Get from CallMeBot setup
  },
  
  // Email notification (backup)
  EMAIL: {
    enabled: true,
    recipient: 'your-email@example.com'
  }
};

// ========== MAIN HANDLER ==========
function doPost(e) {
  try {
    // Parse incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Save to Google Sheet
    const result = saveToSheet(data);
    
    // Send WhatsApp notification
    if (CONFIG.WHATSAPP.enabled) {
      sendWhatsAppNotification(data);
    }
    
    // Send Email notification (backup)
    if (CONFIG.EMAIL.enabled) {
      sendEmailNotification(data);
    }
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Form submitted successfully!',
        row: result.row
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'active',
      message: 'Form handler is running!'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ========== SAVE TO GOOGLE SHEET ==========
function saveToSheet(data) {
  const spreadsheet = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  let sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
  
  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = spreadsheet.insertSheet(CONFIG.SHEET_NAME);
    // Add headers
    const headers = [
      'Timestamp',
      'First Name',
      'Last Name',
      'Email',
      'Phone',
      'Company',
      'Company Size',
      'Service',
      'Budget',
      'Message',
      'Status'
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  
  // Prepare row data
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
  
  // Append row
  sheet.appendRow(rowData);
  const lastRow = sheet.getLastRow();
  
  return { row: lastRow };
}

// ========== WHATSAPP NOTIFICATION (CallMeBot) ==========
function sendWhatsAppNotification(data) {
  // Format message
  const message = `🔔 *New Contact Form Submission*

👤 *Name:* ${data.firstName} ${data.lastName}
📧 *Email:* ${data.email}
📱 *Phone:* ${data.phone}
🏢 *Company:* ${data.company || 'Not specified'}
👥 *Size:* ${data.employees || 'Not specified'}
🎯 *Service:* ${data.service}
💰 *Budget:* ${data.budget || 'Not specified'}

📝 *Message:*
${data.message}

⏰ ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

  // CallMeBot API URL
  const url = `https://api.callmebot.com/whatsapp.php?phone=${CONFIG.WHATSAPP.phone}&text=${encodeURIComponent(message)}&apikey=${CONFIG.WHATSAPP.apiKey}`;
  
  try {
    const response = UrlFetchApp.fetch(url, {
      method: 'GET',
      muteHttpExceptions: true
    });
    Logger.log('WhatsApp sent: ' + response.getContentText());
  } catch (error) {
    Logger.log('WhatsApp error: ' + error.toString());
  }
}

// ========== EMAIL NOTIFICATION (Backup) ==========
function sendEmailNotification(data) {
  const subject = `🔔 New Contact Form: ${data.firstName} ${data.lastName} - ${data.service}`;
  
  const body = `
New Contact Form Submission
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
Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
`;

  try {
    MailApp.sendEmail({
      to: CONFIG.EMAIL.recipient,
      subject: subject,
      body: body
    });
    Logger.log('Email sent successfully');
  } catch (error) {
    Logger.log('Email error: ' + error.toString());
  }
}

// ========== TEST FUNCTION ==========
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
    message: 'This is a test submission'
  };
  
  saveToSheet(testData);
  Logger.log('Test data saved to sheet');
}
