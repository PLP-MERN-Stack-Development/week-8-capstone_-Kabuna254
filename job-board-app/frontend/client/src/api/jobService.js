import api from './api';

export const jobService = {
  // Get all jobs with optional pagination and category filtering
  getAllJobs: async (page = 1, limit = 10, category = null) => {
    let url = `/jobs?page=${page}&limit=${limit}`;
    if (category) url += `&category=${category}`;
    const response = await api.get(url);
    return response.data;
  },

  // Get single job by ID or slug
  getJob: async (idOrSlug) => {
    const response = await api.get(`/jobs/${idOrSlug}`);
    return response.data;
  },

  // Create a job (only allowed for verified employers)
  createJob: async (jobData) => {
    const response = await api.post('/jobs', jobData);
    return response.data;
  },

  // Update a job
  updateJob: async (id, jobData) => {
    const response = await api.put(`/jobs/${id}`, jobData);
    return response.data;
  },

  // Delete a job
  deleteJob: async (id) => {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
  },

  // Apply for a job (new endpoint)
  applyForJob: async (jobId, applicationData) => {
    const response = await api.post(`/jobs/${jobId}/apply`, applicationData);
    return response.data;
  },

  // Search jobs by keyword
  searchJobs: async (query) => {
    const response = await api.get(`/jobs/search?q=${query}`);
    return response.data;
  },
};

