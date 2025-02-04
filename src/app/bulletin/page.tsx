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

export default function BulletinPage() {
  const [password, setPassword] = useState('');
  const { isAuthenticated, login, logout } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(password);
    if (!success) {
      alert('Incorrect password');
    }
    setPassword('');
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <div className="bg-gray-50 p-6 mb-6 rounded-lg shadow">
        <h1 className="text-3xl text-center font-bold">Monthly Bulletin</h1>
      </div>
      
      {/* PDF Viewer */}
      <PDFViewer />

      {/* Admin Section */}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Admin Section</h2>
        
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
            
            {/* File Upload - we'll implement this next */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <p>Upload functionality coming soon</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}