import { useState, useEffect } from 'react';

interface UseFetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

// UseFetch hook to handle data fetching
const useFetch = <T>(dataUrl: string) => {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(dataUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setState({ data: result, isLoading: false, error: null });
      } catch (error) {
        setState({ data: null, isLoading: false, error: error as Error });
      }
    };

    fetchData();
  }, [dataUrl]);

  return state;
};

export default useFetch;
