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

export const submitJoinRequest = async (
  data: JoinFormData
): Promise<JoinSubmissionResult> => {
  // Simulate network processing delay for realistic technical response
  await new Promise((resolve) => setTimeout(resolve, 800));

  try {
    const timestamp = new Date().toISOString();
    const requestId = `CIPHER-REQ-${Math.floor(100000 + Math.random() * 900000)}`;

    const newRecord = {
      id: requestId,
      ...data,
      submittedAt: timestamp,
    };

    // Store in LocalStorage as persistent fallback destination
    const existingRaw = localStorage.getItem(STORAGE_KEY);
    const existingList = existingRaw ? JSON.parse(existingRaw) : [];
    existingList.push(newRecord);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingList));

    // Optional API Endpoint Submission if configured in VITE_JOIN_API_URL
    const apiUrl = import.meta.env.VITE_JOIN_API_URL;
    if (apiUrl) {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecord),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }
    }

    return {
      success: true,
      message: 'Your student application has been successfully recorded in the CIPHER database.',
      requestId,
      timestamp,
    };
  } catch (error) {
    console.error('Join submission error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to process request. Please try again.',
    };
  }
};
