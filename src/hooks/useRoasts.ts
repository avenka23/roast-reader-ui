import { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../config/api';
import type { RoastResponse, RoastItem } from '../types/api';

interface UseRoastsResult {
  roasts: RoastItem[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useRoasts(): UseRoastsResult {
  const [roasts, setRoasts] = useState<RoastItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoasts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/roasts/recent`);

      if (!response.ok) {
        throw new Error(`Failed to fetch roasts: ${response.status}`);
      }

      const data: RoastResponse = await response.json();
      setRoasts(data.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoasts();
  }, [fetchRoasts]);

  return { roasts, loading, error, refetch: fetchRoasts };
}
