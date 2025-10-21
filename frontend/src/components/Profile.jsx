import React, { useState } from 'react';

const Profile = ({ user, open, onClose, onSave }) => {
  const [form, setForm] = useState({
    fullName: user.fullName || '',
    email: user.email || '',
    language: user.language || '',    // Add other fields as needed, e.g.:
    // phone: user.phone || '',
  });
  const [photoPreview, setPhotoPreview] = useState(user.profilePhoto || '/default-profile.png');
  const [photoFile, setPhotoFile] = useState(null);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setForm({ ...form, [e.target.language]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // onSave should handle API call, accepting (form, photoFile)
    onSave(form, photoFile);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-[95vw] max-w-md relative">
        <button className="absolute top-2 right-3 text-xl" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4 text-center">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Photo */}
          <div className="flex flex-col items-center">
            <label htmlFor="photo-upload" className="cursor-pointer">
              <img
                src={photoPreview}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border"
              />
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
              <div className="text-blue-700 text-xs mt-1 underline">Change Photo</div>
            </label>
          </div>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>
          {/* Email (not editable) */}
          <div>
            <label className="block text-sm font-medium mb-1">Language</label>
            <input
              type="text"
              name="language"
              value={form.language}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1 bg-gray-100 text-gray-500"
              required
            />
          </div>
          {/* If you want more fields (e.g. phone), add them here */}
          <div className="flex gap-2 justify-end mt-4">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
