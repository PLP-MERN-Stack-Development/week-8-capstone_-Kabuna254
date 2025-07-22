import { Link } from 'react-router-dom';

const JobList = ({ jobs }) => {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="h-full flex items-center justify-center py-10">
        <p className="text-gray-500">No jobs found.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-4 px-4">
      {jobs.map((job) => (
        <li
          key={job._id}
          className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold">{job.title}</h2>
          <p className="text-gray-600">{job.companyName}</p>
          <p className="text-sm text-gray-500">{job.location}</p>

          <div className="mt-4">
            <Link
              to={`/jobs/${job._id}`}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              View Details
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default JobList;
