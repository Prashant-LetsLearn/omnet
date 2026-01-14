// ============================================
// FORM SUBMISSION HANDLER - JavaScript
// ============================================
// Add this to your website's JavaScript file
// or include it in a <script> tag
// ============================================

// ========== CONFIGURATION ==========
const FORM_CONFIG = {
  // Replace with your Google Apps Script Web App URL after deployment
  GOOGLE_SCRIPT_URL: 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL',
  
  // Enable/disable console logging
  DEBUG: true
};

// ========== FORM HANDLER ==========
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
});

async function handleFormSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.innerHTML;
  
  // Show loading state
  submitButton.disabled = true;
  submitButton.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Sending...';
  
  // Collect form data
  const formData = {
    firstName: document.getElementById('firstName').value.trim(),
    lastName: document.getElementById('lastName').value.trim(),
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    company: document.getElementById('company').value.trim(),
    employees: document.getElementById('employees').value,
    service: document.getElementById('service').value,
    budget: document.getElementById('budget').value,
    message: document.getElementById('message').value.trim(),
    timestamp: new Date().toISOString()
  };
  
  if (FORM_CONFIG.DEBUG) {
    console.log('Submitting form data:', formData);
  }
  
  try {
    // Send to Google Apps Script
    const response = await fetch(FORM_CONFIG.GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Required for Google Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    
    // Note: With 'no-cors', we can't read the response
    // So we assume success if no error is thrown
    
    if (FORM_CONFIG.DEBUG) {
      console.log('Form submitted successfully');
    }
    
    // Show success message
    showSuccess();
    
  } catch (error) {
    console.error('Form submission error:', error);
    
    // Show error to user
    showError('Something went wrong. Please try again or contact us directly.');
    
    // Reset button
    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonText;
  }
}

// ========== SUCCESS HANDLER ==========
function showSuccess() {
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  
  // Hide form, show success message
  contactForm.style.display = 'none';
  formSuccess.style.display = 'block';
  
  // Scroll to success message
  formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ========== ERROR HANDLER ==========
function showError(message) {
  // You can customize this - create a toast, alert, or inline message
  alert(message);
}

// ========== RESET FORM ==========
function resetForm() {
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const submitButton = contactForm.querySelector('button[type="submit"]');
  
  // Reset form fields
  contactForm.reset();
  
  // Reset button state
  submitButton.disabled = false;
  submitButton.innerHTML = '<i class="ri-send-plane-fill"></i> Send Message';
  
  // Show form, hide success message
  formSuccess.style.display = 'none';
  contactForm.style.display = 'block';
  
  // Scroll to form
  contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}


// ============================================
// ALTERNATIVE: Direct WhatsApp + Google Sheets
// (Without Google Apps Script backend)
// ============================================

/*
// If you want a simpler approach that opens WhatsApp directly:

async function handleFormSubmitAlternative(event) {
  event.preventDefault();
  
  const formData = {
    firstName: document.getElementById('firstName').value.trim(),
    lastName: document.getElementById('lastName').value.trim(),
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    company: document.getElementById('company').value.trim(),
    employees: document.getElementById('employees').value,
    service: document.getElementById('service').value,
    budget: document.getElementById('budget').value,
    message: document.getElementById('message').value.trim()
  };
  
  // Create WhatsApp message
  const whatsappMessage = `🔔 New Contact Form

👤 Name: ${formData.firstName} ${formData.lastName}
📧 Email: ${formData.email}
📱 Phone: ${formData.phone}
🏢 Company: ${formData.company || 'Not specified'}
👥 Size: ${formData.employees || 'Not specified'}
🎯 Service: ${formData.service}
💰 Budget: ${formData.budget || 'Not specified'}

📝 Message:
${formData.message}`;

  // Open WhatsApp with pre-filled message
  const whatsappURL = `https://wa.me/919717270865?text=${encodeURIComponent(whatsappMessage)}`;
  window.open(whatsappURL, '_blank');
  
  // Show success
  showSuccess();
}
*/
