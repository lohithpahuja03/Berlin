const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; error?: string }> {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('berlin_auth_token') : null;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    const json = await response.json();
    if (!response.ok) {
      return { success: false, error: json.error || 'Request failed' };
    }
    return { success: true, data: json };
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error' };
  }
}
