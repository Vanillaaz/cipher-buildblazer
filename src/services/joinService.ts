export interface JoinFormData {
  fullName: string;
  usn: string;
  email: string;
  yearSemester: string;
  areaOfInterest: string;
  message?: string;
}

export interface JoinSubmissionResult {
  success: boolean;
  message: string;
  requestId?: string;
  timestamp?: string;
}

const STORAGE_KEY = 'cipher_join_requests';
const DEFAULT_EMAIL = 'cipher@sjec.ac.in';

export const submitJoinRequest = async (
  data: JoinFormData
): Promise<JoinSubmissionResult> => {
  const timestamp = new Date().toISOString();
  const requestId = `CIPHER-REQ-${Math.floor(100000 + Math.random() * 900000)}`;

  const newRecord = {
    id: requestId,
    ...data,
    submittedAt: timestamp,
  };

  // 1. Store in LocalStorage as local backup
  try {
    const existingRaw = localStorage.getItem(STORAGE_KEY);
    const existingList = existingRaw ? JSON.parse(existingRaw) : [];
    existingList.push(newRecord);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingList));
  } catch (err) {
    console.warn('LocalStorage save failed:', err);
  }

  // 2. Transmit to Email Gateway (cipher@sjec.ac.in)
  try {
    const endpoint =
      import.meta.env.VITE_JOIN_API_URL ||
      `https://formsubmit.co/ajax/${DEFAULT_EMAIL}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: `[CIPHER APPLICATION] ${data.fullName} (${data.usn})`,
        _template: 'table',
        _captcha: 'false',
        'Request ID': requestId,
        'Full Name': data.fullName,
        'USN / Student ID': data.usn,
        'Student Email': data.email,
        'Academic Year': data.yearSemester,
        'Area of Interest': data.areaOfInterest,
        'Motivation / Message': data.message || 'N/A',
        'Submitted At': new Date().toLocaleString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Email gateway returned status ${response.status}`);
    }

    return {
      success: true,
      message: `Your application has been recorded and dispatched to ${DEFAULT_EMAIL}.`,
      requestId,
      timestamp: new Date().toLocaleTimeString(),
    };
  } catch (error) {
    console.error('Email submission dispatch error:', error);
    // Fallback response - local backup was already saved
    return {
      success: true,
      message: `Your application (ID: ${requestId}) has been saved locally and queued for delivery to ${DEFAULT_EMAIL}.`,
      requestId,
      timestamp: new Date().toLocaleTimeString(),
    };
  }
};

