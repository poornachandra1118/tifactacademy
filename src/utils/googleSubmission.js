/**
 * Google Apps Script Form Submission Service
 * Sends form data directly to the deployed Google Sheet and triggers email notifications.
 */

const DEFAULT_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwIZaBqo5rQNWzQDUJXb9GhCBRtmctPuznGI5gVBlExpcq4hwGesPAkwVWUhrRJ1gqJ/exec';

/**
 * Submits form data to the Google Apps Script Web App.
 *
 * @param {Object} payload - Object containing formType ('enquiry' | 'mentor' | 'newsletter') and form fields
 * @param {number} [timeoutMs=15000] - Request timeout in milliseconds
 * @returns {Promise<{ success: boolean, submissionId?: string, error?: string }>}
 */
export async function submitToGoogle(payload, timeoutMs = 15000) {
  const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL || DEFAULT_SCRIPT_URL;

  // Generate unique submission ID for duplicate prevention & traceability
  const submissionId = `${payload.formType || 'form'}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  const bodyData = JSON.stringify({
    ...payload,
    submissionId,
    clientTimestamp: new Date().toISOString()
  });

  // Offline check
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return {
      success: false,
      error: 'You are currently offline. Please check your internet connection.'
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    // We send Content-Type: text/plain to avoid CORS preflight (OPTIONS),
    // and mode: 'no-cors' so the browser smoothly accepts Google's 302 redirect.
    await fetch(scriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      signal: controller.signal,
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: bodyData
    });

    clearTimeout(timeoutId);
    return {
      success: true,
      submissionId
    };
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      return {
        success: false,
        error: 'Submission request timed out. Please try again.'
      };
    }

    console.error('Google submission network error:', error);
    return {
      success: false,
      error: error.message || 'Network error occurred while submitting.'
    };
  }
}
