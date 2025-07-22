import { useState } from 'react';

const JobForm = ({ onSubmit, initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [location, setLocation] = useState(initialData.location || '');
  const [salary, setSalary] = useState(initialData.salary || '');
  const [logoFile, setLogoFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('description', description.trim());
    formData.append('location', location.trim());

    if (salary && salary.toString().trim() !== '') {
      formData.append('salary', salary.toString().trim());
    }

    if (logoFile) {
      formData.append('logo', logoFile);
    }

    await onSubmit(formData);

    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Job Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full border p-2"
        required
      />

      <textarea
        placeholder="Job Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="w-full border p-2"
        rows="6"
        required
      />

      <input
        type="text"
        placeholder="Location (e.g. Remote, Nairobi)"
        value={location}
        onChange={e => setLocation(e.target.value)}
        className="w-full border p-2"
        required
      />

      <input
        type="text"
        placeholder="Salary Range (optional)"
        value={salary}
        onChange={e => setSalary(e.target.value)}
        className="w-full border p-2"
      />

      <input
        type="file"
        onChange={e => setLogoFile(e.target.files[0])}
        className="w-full border p-2"
        accept="image/png, image/jpeg, image/jpg"
      />

      <button
        type="submit"
        className={`bg-blue-600 text-white px-4 py-2 rounded ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={submitting}
      >
        {initialData._id ? 'Update Job' : 'Post Job'}
      </button>
    </form>
  );
};

export default JobForm;
