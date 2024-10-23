import { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosInstance';

export default function useQuery(queryString) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance(queryString)
      .then((res) => {
        setData(res.data);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [queryString]);

  return { data, loading, error, setData };
}
