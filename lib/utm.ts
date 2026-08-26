export type UTMData = Partial<{
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
}>;

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;

const STORAGE_KEY = 'loomie_psico_utm';

export function readUtm(params: URLSearchParams): UTMData {
  return UTM_KEYS.reduce<UTMData>((result, key) => {
    const value = params.get(key)?.trim();
    if (value) result[key] = value;
    return result;
  }, {});
}

export function persistUtm(data: UTMData) {
  if (typeof window === 'undefined' || Object.keys(data).length === 0) return;
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function readPersistedUtm(): UTMData {
  if (typeof window === 'undefined') return {};
  const raw = window.sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as UTMData;
  } catch {
    return {};
  }
}
