"use client"
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useAuthStore } from '@/store/auth';

const PDFViewer = dynamic(() => import('@/components/PFDViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 flex items-center justify-center">
      Loading PDF viewer...
    </div>
  ),
});

// function for uploading pdfs of the bulletin
const uploadBulletin = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Upload failed');
  }

  return response.json();
};

export default function BulletinPage() {
  const [password, setPassword] = useState('');
  const [uploading, setUploading] = useState(false);
  const { isAuthenticated, login, logout } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(password);
    if (!success) {
      alert('Incorrect password');
    }
    setPassword('');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('pdf')) {
      alert('Please upload a PDF file');
      return;
    }

    try {
      setUploading(true);
      await uploadBulletin(file);
      alert('Bulletin uploaded successfully');
      // Optionally refresh the page to show the new PDF, will log us out of the page
      window.location.reload();
    } catch (error) {
      alert('Failed to upload bulletin');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const uploadSection = (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
        className="hidden"
        id="bulletin-upload"
        disabled={uploading}
      />
      <label
        htmlFor="bulletin-upload"
        className="cursor-pointer inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {uploading ? 'Uploading...' : 'Select PDF to Upload'}
      </label>
    </div>
    );

  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <div className="bg-gray-50 p-2 sm:p-6 mb-6 rounded-lg">
        <h1 className="text-lg sm:text-3xl text-center font-bold">Monthly Bulletin</h1>
      </div>

      {/* PDF Viewer */}
      <div className="relative">
        <PDFViewer />
      </div>

      {/* Admin Section */}
      <div className="mt-12 p-4 sm:p-6 bg-gray-50 rounded-lg">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Admin Section</h2>

        {!isAuthenticated ? (
          <form onSubmit={handleLogin} className="max-w-sm">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-2 border rounded mb-2"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Upload New Bulletin</h3>
              <button
                onClick={logout}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Logout
              </button>
            </div>

            {/* File Upload */}
            {uploadSection}
          </div>
        )}
      </div>
    </main>
  );
}