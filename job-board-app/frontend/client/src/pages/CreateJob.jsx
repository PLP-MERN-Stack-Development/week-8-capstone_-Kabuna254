import { useNavigate } from 'react-router-dom';
import { jobService } from '../api/jobService'; // renamed from postService
import JobForm from '../components/JobForm';

const CreateJob = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    await jobService.createJob(formData); // assuming jobService exists
    navigate('/');
  };

  return <JobForm onSubmit={handleSubmit} />;
};

export default CreateJob;
