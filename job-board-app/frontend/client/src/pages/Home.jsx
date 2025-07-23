import React, { useState, useEffect } from 'react';
import { jobService } from '../api/api';
import JobList from '../components/JobList';

const Home = () => {
  const [page, setPage] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await jobService.getAllJobs(page);
        
        // Handle different response structures
        const jobsData = response.data?.jobs || response.jobs || response;
        const pagesData = response.data?.totalPages || response.totalPages || 1;
        
        setJobs(jobsData);
        setTotalPages(pagesData);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
        setError(err.response?.data?.message || 'Failed to load jobs');
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [page]);

  if (loading && jobs.length === 0) return <p className="text-center py-8">Loading jobs...</p>;
  if (error) return <p className="text-center py-8 text-red-500">{error}</p>;
  if (jobs.length === 0) return <p className="text-center py-8">No jobs found</p>;

  return (
    <div className="flex-1"> {/* Remove container class here */}
      <div className="max-w-4xl mx-auto px-4 py-8"> {/* Single container */}
        <h1 className="text-2xl font-bold mb-6">Available Jobs</h1>
        
        <JobList jobs={jobs} />
        
        {/* Pagination - improved styling */}
        <div className="flex justify-center mt-8 space-x-4">
          <button
            className={`px-4 py-2 rounded-md border ${
              page === 1 
                ? 'bg-gray-700 border-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 border-blue-500 text-white hover:bg-blue-700'
            }`}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          
          <span className="px-4 py-2 text-gray-300">
            Page {page} of {totalPages}
          </span>
          
          <button
            className={`px-4 py-2 rounded-md border ${
              page >= totalPages 
                ? 'bg-gray-700 border-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 border-blue-500 text-white hover:bg-blue-700'
            }`}
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;