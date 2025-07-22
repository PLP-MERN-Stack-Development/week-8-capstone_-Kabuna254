import React, { useState } from 'react';
import { jobService } from '../api/api';
import useApi from '../hooks/useAPI';
import JobList from '../components/JobList';

const Home = () => {
  const [page, setPage] = useState(1);

  const { data: jobs, loading } = useApi(() => jobService.getAllJobs(page));

  if (loading) return <p>Loading jobs...</p>;

  return (
    <>
      <JobList jobs={jobs} />

      <div className="flex justify-center mt-4 space-x-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Home;
