// Auth Utility & Webhook Client for Puppetify

export const N8N_REQUEST_OTP_URL = 
  import.meta.env.VITE_N8N_WEBHOOK_URL_REQUEST_OTP || 
  import.meta.env.VITE_N8N_WEBHOOK_REQUEST_OTP || 
  'https://puppet.app.n8n.cloud/webhook/request-otp';

export const N8N_VERIFY_OTP_URL = 
  import.meta.env.VITE_N8N_WEBHOOK_URL_VERIFY_OTP || 
  import.meta.env.VITE_N8N_WEBHOOK_VERIFY_OTP || 
  'https://puppet.app.n8n.cloud/webhook/verify-otp';

// Session Token Management
export function getSessionToken() {
  return localStorage.getItem('session_token');
}

export function setSessionToken(token) {
  if (token) {
    localStorage.setItem('session_token', token);
    window.dispatchEvent(new CustomEvent('auth:change'));
  }
}

export function clearSessionToken() {
  localStorage.removeItem('session_token');
  localStorage.removeItem('user_email');
  window.dispatchEvent(new CustomEvent('auth:change'));
}

export function getUserEmail() {
  return localStorage.getItem('user_email') || '';
}

export function setUserEmail(email) {
  if (email) {
    localStorage.setItem('user_email', email);
    window.dispatchEvent(new CustomEvent('auth:change'));
  }
}

export function isAuthenticated() {
  const token = getSessionToken();
  return Boolean(token && token.trim().length > 0);
}

// Generate or retrieve Idempotency Key from sessionStorage
export function getIdempotencyKey(keyName) {
  let key = sessionStorage.getItem(keyName);
  if (!key) {
    key = (typeof crypto !== 'undefined' && crypto.randomUUID) 
      ? crypto.randomUUID() 
      : `idemp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem(keyName, key);
  }
  return key;
}

export function clearIdempotencyKey(keyName) {
  sessionStorage.removeItem(keyName);
}

// Protected fetch helper with Authorization header and 401 handling
export async function apiFetch(url, options = {}) {
  const token = getSessionToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      clearSessionToken();
      // Dispatch custom event so UI components (e.g. AuthModal/Navbar) update
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
      throw new Error('Session expired or invalid. Please sign in again.');
    }

    return response;
  } catch (err) {
    throw err;
  }
}

// Step 1: Request OTP
export async function requestOTP(email) {
  const idempotencyKey = getIdempotencyKey('otp_request_idempotency_key');
  
  try {
    const res = await apiFetch(N8N_REQUEST_OTP_URL, {
      method: 'POST',
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        idempotencyKey,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      // Check if already submitted/processed (idempotency handling)
      if (res.status === 409 || data.status === 'already_submitted' || data.alreadySubmitted) {
        clearIdempotencyKey('otp_request_idempotency_key');
        return { success: true, alreadySubmitted: true, message: 'OTP already requested.' };
      }
      throw new Error(data.message || data.error || `Failed to send OTP (${res.status})`);
    }

    if (data.success === false || data.error) {
      throw new Error(data.reason || data.message || data.error || 'Failed to request OTP. Please try again.');
    }

    // Clear idempotency key on success
    clearIdempotencyKey('otp_request_idempotency_key');
    return { success: true, message: data.message || 'OTP sent successfully!' };
  } catch (err) {
    if (err.message && err.message.includes('already')) {
      clearIdempotencyKey('otp_request_idempotency_key');
      return { success: true, alreadySubmitted: true };
    }
    throw err;
  }
}

// Step 2: Verify OTP
export async function verifyOTP(email, otp) {
  const idempotencyKey = getIdempotencyKey('otp_verify_idempotency_key');

  try {
    const res = await apiFetch(N8N_VERIFY_OTP_URL, {
      method: 'POST',
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
        idempotencyKey,
      }),
    });

    const data = await res.json().catch(() => ({}));

    // Handle error HTTP status
    if (!res.ok) {
      if (res.status === 409 || data.status === 'already_submitted' || data.alreadySubmitted) {
        clearIdempotencyKey('otp_verify_idempotency_key');
        const token = data.token || data.session_token || data.jwt || data.sessionToken || `pup_sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        setSessionToken(token);
        setUserEmail(email);
        return { success: true, alreadySubmitted: true, token };
      }

      const errorReason = data.reason || data.message || data.error || 'Invalid or expired OTP code. Please check your inbox and try again.';
      throw new Error(errorReason);
    }

    // Handle explicit failure payload from n8n
    if (data.success === false || data.status === 'error' || data.status === 'failed' || data.error) {
      const errorReason = data.reason || data.message || data.error || 'Verification failed. Invalid or expired OTP.';
      throw new Error(errorReason);
    }

    // Extract or generate session token for successful HTTP 200 from n8n webhook
    const token = data.token || data.session_token || data.jwt || data.sessionToken || data.session_id || `pup_sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // Store session token & email on success
    setSessionToken(token);
    setUserEmail(email);
    clearIdempotencyKey('otp_verify_idempotency_key');

    return { success: true, token, userEmail: email };
  } catch (err) {
    if (err.message && err.message.includes('already')) {
      clearIdempotencyKey('otp_verify_idempotency_key');
      return { success: true, alreadySubmitted: true };
    }
    throw err;
  }
}
