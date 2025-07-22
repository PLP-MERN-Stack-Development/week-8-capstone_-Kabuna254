import { useEffect, useState } from 'react';
import { jobService } from '../api/jobService';

export const useJobs = (page = 1, limit = 10, category = null) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await jobService.getAllJobs(page, limit, category);
        setJobs(data.jobs || data); // Adjust based on backend response shape
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [page, limit, category]);

  return { jobs, loading };
};

export default useJobs;
