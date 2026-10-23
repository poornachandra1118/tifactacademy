/**
 * useHeroAboutData — Custom React hook
 *
 * Fetches Hero & About section image data from the
 * heroAboutData "API" (swap `fetchHeroAboutData` with
 * a real fetch() call when a backend is ready).
 *
 * Returns: { data, loading, error }
 */

import { useState, useEffect } from 'react';
import { fetchHeroAboutData } from '../data/heroAboutData';

export function useHeroAboutData() {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchHeroAboutData()
      .then((res) => {
        if (!cancelled) {
          setData(res);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('[useHeroAboutData] fetch failed:', err);
          setError(err.message || 'Failed to load images');
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
